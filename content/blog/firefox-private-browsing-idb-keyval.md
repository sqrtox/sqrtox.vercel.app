---
title: Firefoxのプライベートブラウジングでidb-keyvalが動かない
description: Firefoxのプライベートブラウジングでidb-keyvalは動かないので、idb-keyvalではなくlocalforageを使用する。
tagIds:
  - programming
  - javascript
  - mozilla-firefox
  - private-browsing
  - idb-keyval
  - localforage
publishedAt: 2022-05-27 02:28:15+09:00
---

# 結論

idb-keyvalではなくlocalforageを使用する。

# localforage

基本的にIndexedDBを使用するPromiseベースのキーバリューストア。

# idb-keyval

基本的にはlocalforageと同じだが古いブラウザをサポートしない分、軽量らしい。

# 概要

idb-keyvalで値を保存しようとすると

```js
import { set } from 'idb-keyval';

await set('key', 'value');
```

```
DOMException: A mutation operation was attempted on a database that did not allow mutations.
```

というエラーが発生して値が保存されない。

IndexedDBはまともに使ったことがないので原因はよくわからないが、エラーの内容的に特定の操作がFirefoxのプライベートブラウジングで許可されていないのが原因だろう。

Chromeではこの問題は発生しなかった。
