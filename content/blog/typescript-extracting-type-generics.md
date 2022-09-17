---
title: TypeScriptでジェネリクスから型パラメータの型を取り出す
description: inferを使用してTypeScriptでジェネリクスから型パラメータの型を取り出す。
tagIds:
  - programming
  - typescript
  - generics
  - static-typing
publishedAt: 2022-05-27 17:21:38+09:00
modifiedAt: 2022-05-27 19:43:04+09:00
---

# はじめに

`string[]`（`Array<string>`と同じ）から`string`を取り出したいことがあった。<br>
しかし、静的型付け言語をあまりやっていない私にはどうやって取り出せばいいのか全くわからなかった。<br>
同じような人のために備忘録として残しておく。

# 結論

inferを使用する。

```ts
type ExtractTypeFromArray<T> = T extends Array<infer U> ? U : never;
```

# inferとは？

```ts
type ExtractTypeFromArray<T> = T extends Array<infer U> ? U : never;

// someArray is string[]
const someArray = ['a', 'b', 'c'];

// SomeArrayElementType is string
type SomeArrayElementType = ExtractTypeFromArray<typeof someArray>;
```

inferはTypeScriptによって推論された型を使うためのもので、上のコードのように型を取り出すことができる。<br>
高度な型を表現したいときに使える。

# 参考

 - [【TypeScript】 inferに詳しくなろう - Qiita](https://qiita.com/ehika/items/8f41d4a3c8f9df4af9c3)
 - [TypeScript: how to extract the generic parameter from a type? - Stack Overflow](https://stackoverflow.com/questions/44851268/typescript-how-to-extract-the-generic-parameter-from-a-type)
