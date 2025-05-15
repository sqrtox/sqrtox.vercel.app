"use client";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import TagIcon from "@mui/icons-material/Tag";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { ArticleMetadata } from "#src/article/article";
import type { ArticleTag } from "#src/article/tag";
import tag from "#src/article/tag.json";
import { type MarkBorder, Marker } from "#src/search";
import styles from "./search.module.scss";

// TODO: 重複した型定義
interface PlainArticle {
  slug: string;
  metadata: ArticleMetadata;
  base: string;
  text: string;
}

export interface SearchProps {
  articles: PlainArticle[];
}

interface SearchResultItem {
  article: PlainArticle;
  borders: MarkBorder[];
  tags: ArticleTag[];
}

const colorHash = (input: string): string => {
  const len = input.length;
  let hash = 0;

  for (let i = 0; i < len; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }

  const hue = Math.abs(hash) % 360;

  // 彩度と輝度の生成（しきい値あり）
  const sat = 60 + (Math.abs(hash >> 2) % 30); // 彩度60〜89%
  const light = 50 + (Math.abs(hash >> 3) % 25); // 明度65〜89%

  return `hsla(${hue}, ${sat}%, ${light}%, 0.8)`;
};

const replaceUrl = (url: string): void => {
  history.replaceState(undefined, "", url);
};

const SPACES = /\s+/;

export default function Search({ articles }: SearchProps) {
  const [result, setResult] = useState<SearchResultItem[]>();
  const [query, setQuery] = useState<string>();
  const [searchInput, setSearchInput] = useState<HTMLElement>();
  const [currentTerm, setCurrentTerm] = useState<string>();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");

    if (!q) {
      setQuery("");

      return;
    }

    setQuery(decodeURIComponent(q));
  }, []);

  const searchUpdate = useDebouncedCallback(() => {
    setResult(undefined);

    const params = new URLSearchParams(location.search);

    if (query) {
      params.set("q", query);
    }

    let newUrl = "/search";

    if (query) {
      newUrl += `?${params}`;
    }

    replaceUrl(newUrl);

    if (!query) return;

    const cacheJson = localStorage.getItem("cachedSearchResult");
    const cached = cacheJson && JSON.parse(cacheJson);

    if (cached && cached.query === query) {
      setResult(cached.result);

      return;
    }

    const terms = query.toLowerCase().split(SPACES);
    const words = [
      ...new Set(
        terms
          .filter((term) => term.length > 0)
          .filter((term) => !term.startsWith("#")),
      ),
    ];
    const tags = terms
      .filter((term) => term.startsWith("#"))
      .map((term) => {
        const id = term.slice(1);
        const label = tag[id as keyof typeof tag];

        if (label === undefined) return;

        return {
          id,
          label,
        };
      })
      .filter((tag) => tag !== undefined);
    const marker = new Marker(words);
    let result: SearchResultItem[] = articles
      .filter((a) =>
        tags.every((tag) => a.metadata.tags.find((t) => t.id === tag.id)),
      )
      .map((a) => ({
        article: a,
        borders: [],
        tags,
      }));

    for (const r of result) {
      r.borders = marker.mark(r.article.text);

      if (r.borders.length < 1) {
        const end = Math.min(100, r.article.text.length);
        let text = r.article.text.slice(0, end);

        if (end < r.article.text.length) {
          text += " ……";
        }

        r.borders.push({
          marked: false,
          text,
          begin: 0,
          end,
        });
      }
    }

    result = result.filter((r) => {
      if (r.borders.length < 1 && r.tags.length < 1) return false;

      const foundWords = new Set(
        r.borders.filter((v) => v.marked).map((v) => v.text),
      );

      return foundWords.size >= words.length;
    });

    localStorage.setItem(
      "cachedSearchResult",
      JSON.stringify({
        query,
        result,
      }),
    );

    setResult(result);
  }, 200);

  useEffect(() => {
    if (query === undefined) return;

    searchUpdate();
  }, [query, searchUpdate]);

  const matches = result?.reduce(
    (acc, r) => acc + r.borders.filter((b) => b.marked).length,
    0,
  );

  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  return (
    <Stack spacing={3} width="100%">
      <Typography component="h1" variant="h4">
        検索
      </Typography>
      <Typography>
        🏗️検索は実験的機能です。ローカルで処理するため、端末の性能によりページの動作が遅くなる可能性があります
      </Typography>
      {searchInput && (
        <Popper
          open={searchMenuOpen}
          anchorEl={searchInput}
          popperOptions={{ placement: "bottom-start" }}
        >
          <Paper>
            <Box minWidth="10rem">
              <MenuList>
                {Object.entries(tag)
                  .slice(0, 5)
                  .map(([id, label]) => (
                    <MenuItem
                      key={id}
                      onMouseDown={() => {
                        const input =
                          searchInput?.getElementsByTagName("input")?.[0];

                        if (!input) return;

                        const terms = [...input.value.matchAll(/(\S+)(\s*)/g)];
                        const caretPos = input.selectionStart;

                        if (caretPos === null) return;

                        const term = terms.find(
                          (m) =>
                            m.index <= caretPos &&
                            caretPos <= m.index + (m[1] as string).length,
                        );

                        let query: string;

                        if (term) {
                          term[1] = `#${id}`;
                          query = terms.flatMap((m) => m.slice(1)).join("");
                        } else {
                          query = `${input.value.slice(0, caretPos)}#${id}${input.value.slice(caretPos)}`;
                        }

                        setQuery(query);
                      }}
                    >
                      <Stack
                        width="100%"
                        direction="row"
                        spacing={3}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography>{label}</Typography>
                        <Typography color="textSecondary">{id}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
              </MenuList>
            </Box>
          </Paper>
        </Popper>
      )}
      <Stack height="5rem" alignItems="center">
        {query !== undefined && (
          <TextField
            onFocus={() => setSearchMenuOpen(true)}
            onBlur={() => setSearchMenuOpen(false)}
            ref={(elem) => {
              if (!elem) return;

              setSearchInput(elem);
            }}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    paddingRight={1}
                  >
                    <SearchIcon />
                  </Stack>
                ),
              },
            }}
            placeholder="`JavaScript` `CSS margin` などの空白区切りでクエリを入力"
            value={query}
            onChange={(event) => {
              const query = event.currentTarget.value;

              setQuery(query);

              const terms = [...query.matchAll(/\S+/g)];
              const caretPos = event.currentTarget.selectionStart;

              if (caretPos === null) return;

              const term = terms.find(
                (m) => m.index <= caretPos && caretPos <= m.index + m[0].length,
              );

              setCurrentTerm(term?.[0]);
            }}
          />
        )}
      </Stack>
      <Stack spacing={3}>
        {query && !result && (
          <Stack alignItems="center" direction="row" spacing={1}>
            <CircularProgress size="2em" />
            <Typography>検索中……</Typography>
          </Stack>
        )}
        {result !== undefined && result.length < 1 && (
          <Typography>一致する検索結果はありません</Typography>
        )}
        {!!result && result.length > 0 && (
          <>
            <Typography>
              {result.length}の記事
              {matches ? `に${matches}件` : ""}
              の一致
            </Typography>
            <Divider />
            <Stack spacing={3}>
              {result.map((r) => (
                <Card
                  component="article"
                  key={r.article.slug}
                  variant="outlined"
                >
                  <CardActionArea
                    component={NextLink}
                    href={`${r.article.base ? `/${r.article.base}` : ""}/${r.article.slug}`}
                  >
                    <CardContent>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Stack spacing={1} flex={1}>
                          <Typography component="h2" variant="subtitle1">
                            {r.article.metadata.title}
                          </Typography>
                          {r.article.metadata.tags.length > 0 && (
                            <Stack
                              direction="row"
                              flexWrap="wrap"
                              alignItems="center"
                              spacing={1}
                            >
                              {r.article.metadata.tags.map((tag) => (
                                <Chip
                                  size="small"
                                  icon={<TagIcon />}
                                  label={tag.label}
                                  key={tag.id}
                                  color={
                                    r.tags.find((t) => t.id === tag.id) !==
                                    undefined
                                      ? "primary"
                                      : "default"
                                  }
                                />
                              ))}
                            </Stack>
                          )}
                          <Typography color="textSecondary">
                            {r.borders.map((m) =>
                              m.marked ? (
                                <mark
                                  key={m.begin}
                                  className={styles.mark}
                                  style={{
                                    // @ts-expect-error
                                    "--color": colorHash(m.text.toLowerCase()),
                                  }}
                                >
                                  {m.text}
                                </mark>
                              ) : (
                                m.text
                              ),
                            )}
                          </Typography>
                        </Stack>
                        <Stack height="100%" padding={3}>
                          <ChevronRightIcon />
                        </Stack>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
}
