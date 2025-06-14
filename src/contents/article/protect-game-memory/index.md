---
title: ゲームのメモリを改造から守る
tags: memory game-development security
---

> [!CAUTION]
> この記事では対策の前提として、ゲームチートの手法を解説しますが、**チート行為はオンラインゲームにおいて電子計算機損壊等業務妨害罪に該当する可能性があります。また、オフラインゲームでも著作権法の同一性保持権の侵害にあたる場合があります。**  
> **知識の悪用は絶対にやめてください。**

ゲームのチート手法のひとつに、メモリを書き換えて所持金やスコアなどの数値を不正に改ざんする方法があります。この記事では、こうした改ざんを防ぐための対策について考察します。

対象読者はメモリを意識したことはないが、コードを書いたことがある程度の方です。  
また、既存の対策手法については一切触れません。ご自身のゲーム等でこれらの対策を導入する際は既存の手法についても調べてみることをおすすめします。

# どのように改ざんされるか

まずゲームの数値がどのように攻撃者（チーター）から改ざんされるかを考えます。事前に警告しましたがここで解説する手法の悪用は絶対にやめてください。

ゲームの数値に限らず実行中のアプリケーションのデータは**メモリ**と呼ばれる、数値の格納庫に置かれます。よく `FF 00 ED 0A` のように0～255の数値の16進数が並んだもので表現されます。  
ここの数値を専用のソフトウェア[^debugger]を使って書き換えることでゲームの数値を改ざんします。ただ、メモリというのは数万個以上の数値が並んでいるだけでどこからどこまではどの用途のもので、などの目印もありません。用途はメモリに実際に数値を置いたプログラムのみが知っています。

攻撃者は所持金やスコアなど特定の用途の数値データがメモリ上のどこに置かれているのかを調べる必要があります。ここが対策の肝になります。

データの位置を知る方法として最も一般的なのは、たとえば所持金が3640だったときにメモリ上で3640 (`0E 38`[^endian])を検索することです。しかし、当然ながら `0E` と `38` が偶然並んでいる場所はいくつもあり、これだけでは位置を知るのに不十分です。  
そこで、所持金をゲーム内で増減させて1つ前は3640だが、今は3000になっている場所を検出することで特定します。

基本的なメモリ書き換えの流れは以上です。  
次に、こうした手法を踏まえた改ざん対策について考えていきます。

# 対策

いくつか方向性から対策方法を考えてみました。攻撃者はソースコードを知らないという前提です。

## 方法1: 難読化

メモリの改ざんには改ざんしたいデータがどこにあるかを知ることがもっとも重要です。メモリ上のどの数値がどのデータかわからなければ、どんなデータを置いて、いくらメモリを見られようが、基本的には安全[^safety]です。  
したがって位置を隠すのが対策の1つになります。

攻撃者は知っている数値を検索することで、メモリ上の数値と結びつけて未知の領域を解析します。メモリ上にそのまま数値を置かずに2倍したり、逆に2で割って2つの数値に分けたりなどをすることで検索にかからなくするのが有効です。  

### 安全性

難読化は検索避けに非常に有効ですが、2で割って2つに分けてもこことここがいつも同じ数値だな、所持金が増減するときにここがいつも増減するなといった観点から見つかる可能性があります。検索以外の特定手段に耐性を持たないため他の対策との併用がベストです。

## 方法2: バックアップ

データの位置を隠すことは有効な対策の1つですが、位置が特定されてしまえば防御効果は薄れてしまいます。
そこで発想を変え、「改変されても自動的に修復できる仕組み」を導入するのも有効な手段です。

具体的には、同じ内容のデータをメモリ上に2つ以上保存し、それぞれに対して CRC などの軽量な検査用データ（ハッシュ）を生成・保存します。データを利用する際には、保存されたデータ群のうち検査データと一致するものを選び、破損が見つかった場合は正常な値から復元することで処理を継続できます。

### コード例

以下は JavaScript でのコード例です。  
そのままでは使えません。あくまでコードでの説明です。

```ts
class SecureData {
  #data: [number, number, number];
  #hash: number;

  constructor(value: number) {
    this.set(value);
  }

  static #calcHash(value: number): number {
    // 簡易的なCRC風のダミー例（実運用では使わないこと）
    let hash = 0;
    const str = value.toString();

    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // 32bit化
    }

    return hash;
  }

  get(): number {
    const value = this.#data.find(v => SecureData.#calcHash(v) === this.#hash);

    if (value === undefined) {
      throw new Error("None of the hashes match");
    }

    // 自己修復: 正しい値で3つすべてを上書き
    this.#data.fill(value);

    return value;
  }

  set(value: number): void {
    this.#data.fill(value);
    this.#hash = SecureData.#calcHash(value);
  }
}
```

### 安全性と限界

この仕組みでは、検査用データが正しく、保存された値のうち少なくとも1つが無事であれば修復が可能です。
ただし以下のようなケースでは完全な保護は困難です。

 - 保存されたすべての値が書き換えられた場合
 - 検査用データ自体が書き換えられた場合
 - 保存データと検査データの両方が整合するように一緒に操作された場合

こうしたケースでは、整合性チェックはすり抜けられてしまいますが、検出できるだけでもセキュリティ上は大きな意味があります。
さらに、たとえばデータ1には +100、データ2には +200 のような処理を加えて保存することで、直接の一致を防ぐ「難読化」と併用すれば、より堅牢な対策となります（これは「方法1」で紹介した手法です）。

検査用データには CRC を例に挙げましたが、CRC は本来、インターネット通信などにおける偶発的なデータ破損を検出するための誤り検出符号であり、悪意ある改変の検出を目的としたものではありません。
この用途には、HMAC などの暗号学的ハッシュ関数を利用するのが理想的です。しかし、これらは処理負荷が高く、リアルタイム性が求められるゲームのような環境には向かないケースもあります。

とはいえ、今回のような簡易的な改変検出と自己修復を目的とする場合、CRC でも十分な効果が期待できるでしょう。

# おわりに

この記事ではゲームを念頭に考察しましたが、メモリの監視や書換えはパスワードマネージャなどのセキュリティが重視されるアプリケーションでも問題となっています。ゲーム以外の分野での対策も交えながら、ゲームのセキュリティの向上をぜひ考察してみてください。

[^debugger]: プロセスのメモリを編集できるソフトウェアはいくつかの種類がありますが、デバッグ用のものも多く、チートツールとは限りません。
[^endian]: `0E 38` は3640を単に16進数で表現したものですが、数値をどう並べるかというエンディアンと呼ばれる決まりにより、実際のメモリ上での並び方は異なる場合があります。
[^safety]: パスワードなどの機密情報が `secret-○○○` など決まった形式であるとわかっていれば `secret-` を検索することで機密漏洩する場合がありえます。
