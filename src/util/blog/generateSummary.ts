import { convert } from 'html-to-text';

export type GenerateSummaryOptions = Readonly<Partial<{
  ellipsis: string,
  maxLength: number
}>>;

export const generateSummary = (
  html: string,
  {
    ellipsis = ' ...',
    maxLength = 100
  }: GenerateSummaryOptions = {}
): string => {
  const text = convert(html, {
    selectors: [
      { options: { ignoreHref: true }, selector: 'a' },
      { format: 'skip', selector: 'img' }
    ]
  });
  const segmenter = new Intl.Segmenter('ja', { granularity: 'sentence' });
  const segments: string[] = [];

  for (const { segment } of segmenter.segment(text.replace(/\r?\n/g, '\n'))) {
    segments.push(segment.trim().replace(/。$/, '.'));
  }

  const result = segments.join(' ').replaceAll('\n', ' ').replace(/\s\s+/g, ' ');
  const clamped = result.length < maxLength ? result : `${result.slice(0, maxLength - ellipsis.length)}${ellipsis}`;

  return clamped;
};
