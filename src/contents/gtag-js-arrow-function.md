---
title: gtag.jsはアロー関数では動かない
tagIds:
  - programming
  - javascript
  - google-analytics
publishedAt: 2022-06-02 18:04:30+09:00
---

# なぜこの問題に遭遇したか

```js
function gtag(){dataLayer.push(arguments);}
```

Google アナリティクスを導入したことがある人なら見たことがあるだろうコード。<br>
当然、このままなら普通に動く。<br>
だが、私は可能であれば絶対にfunctionを使いたくない。<br>
そこで、gtag.jsを以下のように書いたことでこの問題に遭遇した。

```js
const gtag = (...args) => dataLayer.push(args);
```

# 何が起きたか

collectのリクエストが送信されなかった。<br>
これが送信されないと計測ができない。

# 原因

これは推測でしかないが、dataLayerにpushするのはただの配列風オブジェクトではなく、Argumentsオブジェクトでないといけないのが原因。<br>
実際、functionでも下のコードでは動かなかった。

```js
const gtag = function (...args) {
  dataLayer.push(args);
};
```

# 解決方法

argumentsを使用できるfunctionを使わないといけないので、アロー関数は諦める。
