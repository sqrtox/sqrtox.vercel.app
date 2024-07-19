import { load } from "cheerio";
import { select as hastSelect, selectAll as hastSelectAll } from "hast-util-select";
import { toText } from "hast-util-to-text";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeBudoux from "rehype-budoux";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeReact from "rehype-react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { select as unistSelect } from "unist-util-select";

import MarkdownLink from "@/components/blog/markdown-link";

import type { Root } from "hast";
import type { Options as RehypeReactOptions } from "rehype-react";
import type { Plugin } from "unified";

export type Markdown = string;

export type Html = string;

export const rehypeFixFootnote: Plugin<[], Root> = () => root => {
  const heading = hastSelect("#footnote-label", root);

  if (heading) {
    // NOTE: Modify h1 to be h2 because the rehype-react lowers the level of the heading
    heading.tagName = "h1";
  }

  const text = unistSelect("text", heading);

  if (text && "value" in text) {
    text.value = "脚注";
  }
};

export const rehypeFootnoteTitle: Plugin<[], Root> = () => root => {
  for (const footnote of hastSelectAll("li:has([dataFootnoteBackref])", root)) {
    const link = hastSelect("a", footnote);
    const href = link?.properties.href;

    if (!link || typeof href !== "string" || !href.startsWith("#")) {
      continue;
    }

    const referenceLink = hastSelect(href, root);

    if (referenceLink) {
      referenceLink.properties.title = toText(footnote);
    }
  }
};

export const markdownToHtml = async (markdown: Markdown): Promise<Html> => {
  const { renderToString } = await import("react-dom/server");

  return await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, {
      allowDangerousHtml: true
    })
    .use(rehypeFootnoteTitle)
    .use(rehypeFixFootnote)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      content: {
        type: "element",
        tagName: "i",
        properties: {
          className: ["icon-link"]
        },
        children: []
      }
    })
    .use(rehypePrettyCode, {
      keepBackground: false,
      theme: "tokyo-night"
    })
    .use(rehypeReact, {
      Fragment,
      jsx,
      jsxs,
      components: {
        "h1": "h2",
        "h2": "h3",
        "h3": "h4",
        "h4": "h5",
        "h5": "h6",
        "h6": "p",
        "a": MarkdownLink
      }
    } as RehypeReactOptions)
    .use(rehypeBudoux, {
      className: "budoux-breaked"
    })
    .process(markdown)
    .then(({ result }) => renderToString(result));
};

export const HeadingLevel = {
  H1: 1,
  H2: 2,
  H3: 3,
  H4: 4,
  H5: 5,
  H6: 6
} as const;

export type HeadingLevel = typeof HeadingLevel[keyof typeof HeadingLevel];

export type Heading = {
  level: HeadingLevel,
  id: string,
  textContent: string
};

export const getHeadingLevel = (tagName: string): HeadingLevel => {
  switch (tagName) {
    case "h1": {
      return HeadingLevel.H1;
    }

    case "h2": {
      return HeadingLevel.H2;
    }

    case "h3": {
      return HeadingLevel.H3;
    }

    case "h4": {
      return HeadingLevel.H4;
    }

    case "h5": {
      return HeadingLevel.H5;
    }

    // h6 and other elements as h6
    default: {
      return HeadingLevel.H6;
    }
  }
};

export const getHeadings = (html: string): Heading[] => {
  const $ = load(html);
  const headings: Heading[] = [];
  const elements = $(":header");

  for (const element of elements) {
    headings.push({
      level: getHeadingLevel(element.tagName),
      id: $(element).attr("id") as string,
      textContent: $(element).text()
    });
  }

  return headings;
};
