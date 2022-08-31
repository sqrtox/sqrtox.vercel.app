import { Fragment, createElement } from 'react';
import { renderToString } from 'react-dom/server';
import rehypeKatex from 'rehype-katex';
import rehypeParse from 'rehype-parse';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeReact from 'rehype-react';
import rehypeStringify from 'rehype-stringify';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import MarkdownLink from '~/components/MarkdownLink';

const markdownToHtml = async (markdown: string): Promise<string> => {
  const html = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypePrismPlus)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)
    .then(result => result.toString());

  return (
    unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeReact, {
        createElement,
        Fragment,
        components: {
          a: MarkdownLink,
          'h1': 'h2',
          'h2': 'h3',
          'h3': 'h4',
          'h4': 'h5',
          'h5': 'h6',
          'h6': 'p'
        }
      })
      .process(html)
      .then(({ result }) => renderToString(result))
  );
};

export { markdownToHtml };
