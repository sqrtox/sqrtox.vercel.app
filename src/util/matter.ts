import grayMatter from 'gray-matter';

type YamlPrimitive = string | number | null | Date;
type YamlArray = readonly YamlType[];
type YamlObject = Readonly<{
  [k: string]: YamlType
}>;
type YamlType = YamlPrimitive | YamlArray | YamlObject;

type MatterResult = Readonly<{
  content: string,
  data: YamlType
}>;

const isYamlArray = (value: unknown): value is YamlArray => Array.isArray(value);

const matter = (input: string): MatterResult => {
  const { content, data } = grayMatter(input);

  return {
    content,
    data
  };
};

export {
  type MatterResult,
  type YamlArray,
  type YamlObject,
  type YamlPrimitive,
  type YamlType,
  isYamlArray,
  matter
};
