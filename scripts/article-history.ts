import { existsSync } from "node:fs";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { isAbsolute, join, parse, relative, resolve } from "node:path";
import { watch } from "chokidar";
import simpleGit from "simple-git";
import { getLogs } from "#src/article/history/history";
import { ARTICLE_HISTORY_DIR, CONTENTS_DIR, ROOT_DIR } from "#src/dir";

const buildHistory = async (file: string): Promise<void> => {
  const filePath = parse(file);
  const historyId = relative(CONTENTS_DIR, filePath.dir).replaceAll("\\", "_");
  const historyFile = join(ARTICLE_HISTORY_DIR, `${historyId}.json`);

  if (existsSync(historyFile)) {
    await rm(historyFile);
  }

  const dirs = historyId.split("_");
  const slug = dirs.at(-1) as string;
  const base = dirs.slice(0, -1).join("/");
  const logs = await getLogs(slug, base);

  await writeFile(historyFile, JSON.stringify(logs));
};

const buildHistoryAll = async (): Promise<void> => {
  if (existsSync(ARTICLE_HISTORY_DIR)) {
    await rm(ARTICLE_HISTORY_DIR, {
      recursive: true,
    });
  }

  await mkdir(ARTICLE_HISTORY_DIR, {
    recursive: true,
  });

  for (const dirent of await readdir(CONTENTS_DIR, {
    withFileTypes: true,
    recursive: true,
  })) {
    if (!dirent.isFile()) continue;
    if (dirent.name !== "index.md") continue;

    await buildHistory(join(dirent.parentPath, dirent.name));
  }
};

const args = process.argv.slice(1);

if (args.includes("--watch")) {
  watch(CONTENTS_DIR).on("add", (path) => {
    buildHistory(path);
  });
} else if (args.includes("--diff")) {
  const git = simpleGit();
  const result = await git.diffSummary(["HEAD~1", "HEAD"]);

  for (const { file } of result.files) {
    const full = resolve(ROOT_DIR, file);
    const rel = relative(CONTENTS_DIR, full);

    if (rel.startsWith("..") || isAbsolute(rel)) continue;

    await buildHistory(full);
  }
} else {
  await buildHistoryAll();
}
