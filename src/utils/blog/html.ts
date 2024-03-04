import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkRehype from "remark-rehype";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeReact from "rehype-react";
import rehypePrettyCode from "rehype-pretty-code";
import { load } from "cheerio";
import MarkdownLink from "@/components/markdown-link";

export type Markdown = string;

export type Html = string;

export const markdownToHtml = async (markdown: Markdown): Promise<Html> => {
  const { renderToString } = await import("react-dom/server");

  const html = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, {
      allowDangerousHtml: true
    })
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
    .use(rehypeStringify, {
      allowDangerousHtml: true
    })
    .process(markdown)
    .then(result => result.toString());

  return await unified()
    .use(rehypeParse, {
      fragment: true
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
    } as unknown as boolean)
    .process(html)
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
