import { type Emit, Trie } from "@tanishiking/aho-corasick";
import {
  type RefCallback,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface MarkBorder {
  marked: boolean;
  text: string;
  begin: number;
  end: number;
}

export class Marker {
  readonly #ah: Trie;

  constructor(terms: string[]) {
    this.#ah = new Trie(terms);
  }

  #match(text: string) {
    const matches = this.#ah
      .parseText(text.toLowerCase())
      .sort((a, b) => a.start - b.start);
    const marks: typeof matches = [];
    let best = matches[0];

    if (!best) return [];

    const matchesLen = matches.length;

    for (let i = 1; i < matchesLen; i++) {
      const curr = matches[i];

      if (!curr) continue;

      if (curr.start < best.end + 1) {
        if (curr.end + 1 - curr.start > best.end + 1 - best.start) {
          best = curr;
        }
      } else {
        marks.push(best);
        best = curr;
      }
    }

    marks.push(best);

    return marks.slice(0, 10);
  }

  #getBorders(text: string, marks: Emit[], round: number): MarkBorder[] {
    const borders: MarkBorder[] = [];
    let pos = 0;

    for (const [i, mark] of marks.entries()) {
      const prevEnd = marks[i - 1]?.end ?? Number.NEGATIVE_INFINITY;
      const beforeBegin = Math.max(0, mark.start - round, prevEnd);
      const beforeEnd = mark.start;

      if (beforeEnd - beforeBegin > 0) {
        if (mark.start - round < pos) {
          const last = borders.at(-1);

          if (last) {
            last.text += text.slice(pos, beforeEnd);
            last.end = beforeEnd;
          } else {
            borders.push({
              marked: false,
              text: text.slice(pos, beforeEnd),
              begin: pos,
              end: beforeEnd,
            });
          }
        } else {
          borders.push({
            marked: false,
            text: text.slice(beforeBegin, beforeEnd),
            begin: beforeBegin,
            end: beforeEnd,
          });
        }
      }

      borders.push({
        marked: true,
        text: text.slice(mark.start, mark.end + 1),
        begin: mark.start,
        end: mark.end + 1,
      });

      const nextBegin = marks[i + 1]?.start ?? Number.POSITIVE_INFINITY;
      const afterBegin = mark.end + 1;
      const afterEnd = Math.min(text.length, mark.end + 1 + round, nextBegin);

      if (afterEnd - afterBegin > 0) {
        borders.push({
          marked: false,
          text: text.slice(afterBegin, afterEnd),
          begin: afterBegin,
          end: afterEnd,
        });
      }

      pos = afterEnd;
    }

    return borders;
  }

  mark(text: string, round = 15): MarkBorder[] {
    const marks = this.#match(text);
    const borders = this.#getBorders(text, marks, round);

    for (const [i, border] of borders.entries()) {
      if (border.marked) continue;

      const prev = borders[i - 1];

      if (border.begin !== 0 && !prev?.marked) {
        border.text = ` …… ${border.text}`;
      }
    }

    const last = borders.at(-1);

    if (last && !last.marked && last.end !== text.length) {
      last.text += " ……";
    }

    return borders;
  }
}

export interface KeywordSearchResult {
  keyword: string;
  borders: MarkBorder[];
}

export const searchKeywords = (
  keywords: string[],
  term: string,
): KeywordSearchResult[] => {
  const termLen = term.length;
  const results: KeywordSearchResult[] = [];

  for (const kwd of keywords) {
    const kwdLen = kwd.length;
    const borders: MarkBorder[] = [];
    let pos = 0;

    while (pos < kwdLen) {
      const i = kwd.indexOf(term, pos);

      if (i === -1) break;

      const begin = i;
      const end = i + termLen;
      const lastEnd = borders.at(-1)?.end ?? 0;

      if (begin !== lastEnd) {
        borders.push({
          marked: false,
          text: kwd.slice(lastEnd, begin),
          begin: lastEnd,
          end: begin,
        });
      }

      borders.push({
        marked: true,
        text: kwd.slice(begin, end),
        begin,
        end,
      });
      pos = end;
    }

    if (borders.length < 1) continue;

    if (pos < kwdLen) {
      borders.push({
        marked: false,
        text: kwd.slice(pos, kwdLen),
        begin: pos,
        end: kwdLen,
      });
    }

    results.push({
      keyword: kwd,
      borders,
    });
  }

  return results;
};

export type AutocompleteInput = HTMLInputElement | HTMLTextAreaElement;

export interface AutocompleteOption {
  id: string;
  label: string;
}

export interface AutocompleteData {
  ref: RefCallback<AutocompleteInput>;
  options?: Record<keyof AutocompleteOption, MarkBorder>[];
}

export interface AutocompleteInit {
  options: AutocompleteOption[];
}

export const useAutocomplete = ({
  options: optionsProps,
}: AutocompleteInit): AutocompleteData => {
  const [input, setInput] = useState<AutocompleteInput>();
  const inputRef: AutocompleteData["ref"] = useCallback((elem) => {
    if (elem) {
      setInput(elem);
    }
  }, []);
  const data: AutocompleteData = useMemo(
    () => ({
      ref: inputRef,
    }),
    [inputRef],
  );

  useEffect(() => {
    if (!input) return;

    const controller = new AbortController();

    input.addEventListener(
      "change",
      () => {
        console.log(input);
      },
      {
        signal: controller.signal,
      },
    );

    return () => {
      controller.abort();
    };
  }, [input]);

  return data;
};
