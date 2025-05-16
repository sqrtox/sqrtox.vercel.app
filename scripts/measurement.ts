import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import open from "open";
import treeKill from "tree-kill";
import waitOn from "wait-on";

const RELATIVE_TO_ROOT_DIR = "../";
const SERVER_COMMAND = ["bun", "run", "preview"];
const PREVIEW_ORIGIN = "http://localhost:3000";
const PAGES = [
  // Home page
  "/",

  // Not found page
  "/404",

  // About pages
  "/about",

  // Acknowledgments page
  "/acknowledgments",
  "/acknowledgments/history",

  // Article page
  "/article/blog-renewal-2024", // /article/[slug]
  "/article/blog-renewal-2024/history", // /article/[slug]/history
];

const rootDir = resolve(import.meta.dirname, RELATIVE_TO_ROOT_DIR);
const log = (message: string): void => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log(`${performance.now() / 1000}s - ${message}`);
};
const prepare = async <T extends string>(path: T): Promise<T> => {
  if (existsSync(path)) {
    await rm(path, {
      recursive: true,
    });
    log(`Remove ${path}`);
  }

  await mkdir(path);
  log(`Make ${path}`);

  return path;
};
const encodeFileName = (s: string): string =>
  Buffer.from(s, "utf8").toString("base64url");
const decodeFileName = (encoded: string): string =>
  Buffer.from(encoded, "base64url").toString("utf8");

const measurementDir = await prepare(join(rootDir, ".measurement"));
const reportsDir = await prepare(join(measurementDir, "reports"));

async function lighthouseMeasurement(): Promise<void> {
  log("Start lighthouse measurement");

  for (const pathname of PAGES) {
    const url = `${PREVIEW_ORIGIN}${pathname}`;

    log(`Start measurement ${pathname}`);

    const child = spawn("lighthouse", [
      url,
      "--output-path",
      join(reportsDir, `${encodeFileName(pathname)}.html`),
    ]);

    await new Promise((resolve) => child.on("close", resolve));
    log(`End measurement ${pathname}`);
  }

  log("End lighthouse measurement");
}

async function writeReport(): Promise<void> {
  let template = await readFile(
    join(import.meta.dirname, "measurement-report-template.html"),
    "utf-8",
  );
  const reportFile = join(measurementDir, "report.html");

  template = template.replace(
    "%REPORT_LIST%",
    await readdir(reportsDir).then((reports) =>
      reports
        .map((report) => {
          return `
        <label>
          <input type="radio" name="report" value="${report}" onclick="reportView.innerHTML = '&lt;iframe src=&quot;./reports/${report}&quot; width=&quot;100%&quot; height=&quot;100%&quot;&gt;&lt;/iframe&gt;'">
          ${decodeFileName(report.split(".").slice(0, -1).join("."))}
        </label>
        `;
        })
        .join("\n"),
    ),
  );

  await writeFile(reportFile, template, "utf8");
  await open(pathToFileURL(reportFile).href);
}

async function main(): Promise<void> {
  log("Start");

  const child = spawn(SERVER_COMMAND[0] as string, SERVER_COMMAND.slice(1));

  log(`Wait ${PREVIEW_ORIGIN}`);
  await waitOn({
    resources: [PREVIEW_ORIGIN],
  });
  log(`Done ${PREVIEW_ORIGIN}`);
  await lighthouseMeasurement();
  await writeReport();

  if (child.pid !== undefined) {
    treeKill(child.pid, "SIGTERM");
  }

  log("End");
}

await main();
