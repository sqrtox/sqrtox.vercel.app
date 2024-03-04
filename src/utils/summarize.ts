import { convert } from "html-to-text";

export type SummarizeOptions = {
  ellipsis?: string,
  maxLength: number
};

export const summarize = (html: string, {
  ellipsis = "…",
  maxLength
}: SummarizeOptions) => {
  let text = convert(html, {
    selectors: [
      {
        selector: "a",
        options: {
          ignoreHref: true
        }
      },
      {
        selector: "img",
        format: "skip"
      }
    ]
  });

  text = text.replaceAll(/\r?\n/g, "\n");

  const segmenter = new Intl.Segmenter(undefined, {
    granularity: "sentence"
  });

  let result = "";

  for (const { segment } of segmenter.segment(text)) {
    if (result.length > 0) {
      result += " ";
    }

    result += segment.trim().replace(/。$/, ".");
  }

  result = result
    .replaceAll("\n", " ")
    .replaceAll(/\s\s+/g, " ");

  if (result.length > maxLength) {
    result = `${result.slice(0, maxLength - ellipsis.length)}${ellipsis}`;
  }

  return result;
};
