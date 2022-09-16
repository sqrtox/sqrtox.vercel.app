import { type Brand } from '~/util/types/Brand';

type KebabCase<T extends string = 'kebabCase'> = Brand<string, T>;

const isKebabCase = (value: unknown): value is KebabCase => {
  if (typeof value !== 'string') {
    return false;
  }

  if (/^[^a-z]$/.test(value[0])) {
    return false;
  }

  for (const token of value.split('-')) {
    if (!token.length) {
      return false;
    }

    if (/[^a-z\d]/.test(token)) {
      return false;
    }
  }

  return true;
};

export {
  type KebabCase,
  isKebabCase
};
