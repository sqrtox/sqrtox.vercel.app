import { type Diff, diff as differ } from 'deep-diff';

type DiffKind = Diff<unknown>['kind'];
type Color = Readonly<{
  color: string,
  text: `${string}:`
}>;
type Colors = Readonly<Record<DiffKind, Color>>;

const COLORS: Colors = {
  A: {
    color: '#2196F3',
    text: 'ARRAY:'
  },
  D: {
    color: '#F44336',
    text: 'DELETED:'
  },
  E: {
    color: '#2196F3',
    text: 'CHANGED:'
  },
  N: {
    color: '#4CAF50',
    text: 'ADDED:'
  }
};

const style = (kind: DiffKind): string => (
  `color: ${COLORS[kind].color}; font-weight: bold`
);

const render = <LHS, RHS = LHS>(diff: Diff<LHS, RHS>): readonly (Diff<LHS, RHS> | LHS | RHS | string)[] => {
  const { kind } = diff;
  const path = diff.path ?? [];
  const pathName = path.join('.');

  switch (kind) {
    case 'E':
      return [pathName, diff.lhs, '→', diff.rhs];
    case 'N':
      return [pathName, diff.rhs];
    case 'D':
      return [pathName];
    case 'A': {
      return [`${pathName}[${diff.index}]`, diff.item];
    }
    default: {
      return [];
    }
  }
};

const filterPath = <T>(arr: readonly T[]): readonly T[] => (
  arr.filter((v, i) => (
    i !== 0 || v !== ''
  ))
);

const diffLogger = <T>(prev: T, next: T): void => {
  const diff = differ(prev, next);

  console.group('diff');

  if (diff) {
    diff.forEach(v => {
      const { kind } = v;
      const output = filterPath(render(v));

      console.log(`%c ${COLORS[kind].text}`, style(kind), ...output);
    });
  } else {
    console.log('—— no diff ——');
  }

  console.groupEnd();
};

export {
  COLORS,
  type Color,
  type Colors,
  type DiffKind,
  diffLogger,
  filterPath,
  render,
  style
};
