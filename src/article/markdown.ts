import rehypeSectionize from "@hbsnow/rehype-sectionize";
import type { Element, Root } from "hast";
import { select, selectAll } from "hast-util-select";
import { toString as hastToString } from "hast-util-to-string";
import { toText } from "hast-util-to-text";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeBudoux from "rehype-budoux";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkGithubAlerts from "remark-github-alerts";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { type Plugin, unified } from "unified";

const rehypeExternalLink: Plugin = () => (node) => {
  const processAnchor = (node: Element) => {
    const props = node.properties;
    const href = props?.href;

    if (typeof href !== "string") return;

    // internal link
    if (!(href.startsWith("http://") || href.startsWith("https://"))) return;

    props.className ??= [];

    if (Array.isArray(props.className)) {
      props.className.push("externalLink");
    } else if (typeof props.className === "string") {
      props.className += "externalLink";
    }

    props.target = "_blank";
    props.rel = "noopener noreferrer";

    node.children ??= [];
    node.children.push({
      type: "element",
      tagName: "i",
      properties: {
        className: ["markdownIcon"],
        style: '--iconSrc: url("/icons/open-in-new.svg")',
      },
      children: [],
    });
  };
  const process = <T extends Element | Root>(node: T) => {
    if (!Array.isArray(node.children)) return node;

    for (const [i, child] of node.children.entries()) {
      if (child.type !== "element") continue;

      node.children[i] = process(child);
    }

    if (node.type === "element" && node.tagName === "a") {
      processAnchor(node);
    }

    return node;
  };

  return process(node as Root);
};

const rehypeFixFootnotes: Plugin = () => (root) => {
  const label = select("#footnote-label", root as Root);

  if (label) {
    label.tagName = "h1";
  }

  const footnotes: Map<string, string> = new Map();

  for (const fn of selectAll("li[id^=user-content-fn-]", root as Root)) {
    const id = fn.properties.id;

    if (typeof id !== "string") continue;

    footnotes.set(id, toText(fn));
  }

  for (const fnref of selectAll("a[id^=user-content-fnref-]", root as Root)) {
    const fnId = fnref.properties.href;

    if (typeof fnId !== "string") continue;

    const fn = footnotes.get(fnId.slice(1));

    if (fn === undefined) continue;

    fnref.properties.title = fn;

    // expect `children: [ { type: 'text', value: '1' } ],`
    const first = fnref.children[0];

    if (first?.type === "text") {
      first.value = `[${first.value}]`;
    }
  }

  return root;
};

export interface CompileResult {
  html: string;
  text: string;
}

const rehypePlaintext: Plugin = function () {
  this.compiler = (tree) => hastToString(tree as Root);
};

export const compile = async (markdown: string): Promise<CompileResult> => {
  const flow = () =>
    unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkGithubAlerts)
      .use(remarkRehype)
      .use(rehypeFixFootnotes)
      .use(rehypePrettyCode, {
        defaultLang: "plaintext",
        theme: {
          dark: "material-theme-darker",
          light: "material-theme-lighter",
        },
      })
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, {
        // TODO: any
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        content: (element: any) => {
          if (!element.tagName.startsWith("h")) {
            return {
              type: "text",
              value: ":)",
            };
          }

          const level = Number(element.tagName.slice(1));

          return {
            type: "element",
            tagName: "span",
            properties: {
              className: ["headingLink"],
            },
            children: [
              {
                type: "text",
                value: "#".repeat(level),
              },
            ],
          };
        },
      })
      .use(rehypeExternalLink)
      .use(rehypeSectionize)
      .use(rehypeBudoux, {
        className: "budouxParagraph",
      });
  const html = await flow()
    .use(rehypeStringify)
    .process(markdown)
    .then((file) => file.toString());
  const text = await flow()
    .use(rehypePlaintext)
    .process(markdown)
    // @ts-expect-error
    .then((file) => file.value.replaceAll("\n", " "));

  return {
    html,
    text,
  };
};
