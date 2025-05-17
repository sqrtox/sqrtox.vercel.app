import rehypeSectionize from "@hbsnow/rehype-sectionize";
import type { Element, Root } from "hast";
import { select, selectAll } from "hast-util-select";
import { toString as hastToString } from "hast-util-to-string";
import { toText } from "hast-util-to-text";
import type { JSX } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeBudoux from "rehype-budoux";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkGithubAlerts from "remark-github-alerts";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { type Plugin, unified } from "unified";

const rehypeExternalLink: Plugin = () => (node: Root) => {
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
        className: ["icon"],
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

  return process(node);
};

const rehypeFixFootnotes: Plugin =
  () =>
  (root: Root): Root => {
    const label = select("#footnote-label", root);

    if (label) {
      label.tagName = "h1";
    }

    const footnotes: Map<string, string> = new Map();

    for (const fn of selectAll("li[id^=user-content-fn-]", root)) {
      const id = fn.properties.id;

      if (typeof id !== "string") continue;

      footnotes.set(id, toText(fn));
    }

    for (const fnref of selectAll("a[id^=user-content-fnref-]", root)) {
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
  element: JSX.Element;
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
      .use(rehypeExternalLink)
      .use(rehypeSectionize)
      .use(rehypeBudoux, {
        className: "budouxParagraph",
      });
  const element = await flow()
    .use(rehypeReact, {
      Fragment,
      jsx,
      jsxs,
    })
    .process(markdown)
    // @ts-expect-error
    .then((file) => file.result);
  const text = await flow()
    .use(rehypePlaintext)
    .process(markdown)
    // @ts-expect-error
    .then((file) => file.value.replaceAll("\n", " "));

  return {
    element,
    text,
  };
};
