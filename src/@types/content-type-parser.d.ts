declare module 'content-type-parser' {
  type Parameter = Readonly<{
    separator: string,
    key?: string,
    value: string
  }>;
  type ParameterList = Parameter[];
  type ContentType = Readonly<{
    type: string,
    subtype: string,
    parameterList: ParameterList
  }>;

  function parseContentType(contentType: string): ContentType | null;

  export default parseContentType;
}
