---
title: FireFoxでごくまれにこのブログのメモリ使用量がやばい
tagIds:
  - mozilla-firefox
publishedAt: 2024-03-07 17:13:00+09:00
---

FireFoxでごくまれにこのブログのページのこの世の終わりみたいなメモリ使用量になる。具体的に言うと5～6GBくらいに増える。CPUも40%くらいに上がる。  
ごくまれにと書いたように再現性は今のところ得られていない。👿

もし同じことが起きたよという人や原因がわかったよという人が居たらこのブログのリポジトリの[issues](https://github.com/sqrtox/sqrtox.vercel.app/issues)に投げてほしい。投げてくれたらめっちゃ喜ぶ。

https://github.com/sqrtox/sqrtox.vercel.app/issues

# 原因の考察

現在の開発環境のlocalhostではもちろん、なんとブログをリニューアルする前の本番環境でも同じ現象が起きた。  
リニューアル前を作ったのは2年ほど前のことでその時はChromium系ブラウザ（BraveとかChromeとか）を使っていたが、当時開発してたときは一切そんなことはなかったので、おそらくFireFoxに固有の問題。


## React Developer Tools

まだ全く検証できていないが[React Developer Tools](https://ja.react.dev/learn/react-developer-tools)が原因の可能性がある。

[Redux DevTools](https://github.com/reduxjs/redux-devtools)に[メモリやCPUが大量に消費されるというissue](https://github.com/zalmoxisus/redux-devtools-extension/issues/455)があり、スクリーンショットを見ると**5.6GB**もメモリを消費している。これは自分のケースと非常に似ている。  
このissueは巨大な状態をシリアライズしていることが原因っぽい？

これはReduxの話だし、スクリーンショットから察するにこのissueの主はおそらくChromeで現象が起きているので一見関係なさそうに思える。

ただ、React Developer Toolsにもpropsやstateを追跡する機能があるし、Chromeで最近空白のタブしか開いていないのにReact Developer ToolsがCPUを20%ほど消費していたことがあるので、これが原因だと考えると納得がいくところもある。（FireFox🦊は関係なかったのかも）

# 結局

結局どうするかとなると放置するしかない。  
今までに3回程度この現象に遭遇したがほとんどがブログのタブを何も触っていない時に発生した。かといって放置しとけば発生するわけでもなく10時間以上放置してみても発生しなかった。全く再現できないので検証もできない。
