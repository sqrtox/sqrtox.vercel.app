---
title: Next.jsのカスタムDocumentは関数コンポーネントでも使える
tagIds:
  - programming
  - javascript
  - next-js
publishedAt: 2022-06-13 23:45:52+09:00
---

Next.jsではページの共通の文書を設定できる[_document](https://nextjs.org/docs/advanced-features/custom-document)というものがある。

```jsx
class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

ずっとNextDocumentを継承したクラスコンポーネントで書いていたが、関数コンポーネントでも書けるらしい。

```jsx
const Document = () => (
  <Html>
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);
```

_documentをいじっている際にふと思いついて調べて知った。

# 参考

- [Advanced Features: Custom `Document` | Next.js](https://nextjs.org/docs/advanced-features/custom-document)
- [reactjs - How to use function instead of class in Nextjs custom document for Styled Components? - Stack Overflow](https://stackoverflow.com/questions/66256825/how-to-use-function-instead-of-class-in-nextjs-custom-document-for-styled-compon)
