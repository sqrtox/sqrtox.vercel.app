type HasByteLength = Readonly<Record<'byteLength', number>>;

const getByteLength = (value: Buffer | string): number => {
  if (typeof value === 'string') {
    return Buffer.byteLength(value);
  }

  return value.byteLength;
};

export {
  type HasByteLength,
  getByteLength
};
