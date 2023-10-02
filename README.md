# TOKOTOKO=J
![logo](https://github.com/kumaaa1212/multi-SNS/assets/116778080/5bea87ea-1a38-4e9b-a418-461c4e31f79a)

- 10年間国内サッカーリーグを応援し続けた私が、必要だと思った機能を詰め込んだSNSアプリ。
- 制作期間約2~3か月

https://tokotokoj.vercel.app/home

**テストユーザー**
```
[email] test.user2023@gmail.com
[password] 123456
```
# TOKOTOKO=Jとは？
- **国内サッカーリーグ(Jリーグ)応援するSNSアプリです。**
- 国内サッカーリーグ(Jリーグ)が他のスポーツの違うところは**各地域に沢山のチームがあります(58チーム)**。そして**地方に遠征に行くことも国内サッカーリーグ(Jリーグ)の醍醐味**です。J各地域にトコトコ足を運び、思い出を投稿してほしい。思い出を今後同じ場所にいく人の参考になってほしいと言う願いからTOKOTOKO=Jと命名しました。
  
### きっかけ
- 国内サッカーリーグを10年間応援し続け、**サッカー専用**のSNSアプリがないと感じた。特定のチーム専用の掲示板やX(旧 Twitter)やInstagramなど分散してしまっています。そして**様々な種類の投稿**をできるものはなかった。
  - **サッカーを応援している人口は多い。これらの機能を一つにまとめたら最高のSNSアプリが作れるのではないかと思った。**
- エンジニアを目指したきっかけが自分で自分の役に立つアプリを作ることだった。それを実現させるために作成した。
### 目指した課題解決
- チームの情報を共有しやすくする。それによりチームの活性化、そしてチームがある地域が活性化させたい。
- 他の人の前例を確認しやすくし、地方の試合を見に行くことの難易度を下げたい。
- 他のチームの人々との繋がりを深めることを助け、国内サッカーリーグ(Jリーグ)を盛り上げたい。


## 機能一覧
### HOME

| 全体 |　ポイント　|
| ---- | ---- |
| <img width="1457" alt="スクリーンショット 2023-09-30 2 49 45" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/82256745-8f2f-46d6-aa87-14ffe81773ee"> | <img width="1443" alt="スクリーンショット 2023-09-30 2 32 31" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/dc28dd72-6a3f-4988-88ca-c6a103ec4c3e">
| -  ホーム画面では、Tweet投稿とAlbum投稿がいいねの多い順に、そして投稿に付けられたLabelが多いチームが表示されます。  | 一度全てのlabel情報を一つずつ取得し、labelの登場回数が多い順に並び替え、重複しているlabelを削除しています。 |



| ログイン |　サインアップ |
| ---- | ---- |
| <img width="568" alt="スクリーンショット 2023-09-29 19 13 49" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/d199690c-9c73-4d18-9cea-e079ce598609">
 | ![　PDF出力画面](/docs/img/app-view/print-invoice_1.1.png) |
| 請求書データの表示機能を実装しました。 | PDFでの請求書発行機能を実装しました。 |

| 全てのチーム |　全てのTweet|
| ---- | ---- |
| ![請求書詳細画面](/docs/img/app-view/select-master_1.1.png) | ![　PDF出力画面](/docs/img/app-view/master-register-form_1.1.png) |
| 事業者情報と備考欄情報のマスタ登録機能を実装しました。 | マスタ情報の登録をすることで、請求書の作成時にデータを呼び出すことができます。 |

| 全ての記事 |　Tweet投稿 |
| ---- | ---- |
| ![請求書詳細画面](/docs/img/app-view/select-master_1.1.png) | ![　PDF出力画面](/docs/img/app-view/master-register-form_1.1.png) |
| 事業者情報と備考欄情報のマスタ登録機能を実装しました。 | マスタ情報の登録をすることで、請求書の作成時にデータを呼び出すことができます。 |

| Album投稿 |　その他(Album一時保存) |
| ---- | ---- |
| ![請求書詳細画面](/docs/img/app-view/select-master_1.1.png) | ![　PDF出力画面](/docs/img/app-view/master-register-form_1.1.png) |
| 事業者情報と備考欄情報のマスタ登録機能を実装しました。 | マスタ情報の登録をすることで、請求書の作成時にデータを呼び出すことができます。 |

| その他(未保存時エラー)  |　その他(サムネイルページ) |
| ---- | ---- |
| ![請求書詳細画面](/docs/img/app-view/select-master_1.1.png) | ![　PDF出力画面](/docs/img/app-view/master-register-form_1.1.png) |
| 事業者情報と備考欄情報のマスタ登録機能を実装しました。 | マスタ情報の登録をすることで、請求書の作成時にデータを呼び出すことができます。 |

| その他(リリースページ)  |　その他(チーム検索) |
| ---- | ---- |
| ![請求書詳細画面](/docs/img/app-view/select-master_1.1.png) | ![　PDF出力画面](/docs/img/app-view/master-register-form_1.1.png) |
| 事業者情報と備考欄情報のマスタ登録機能を実装しました。 | マスタ情報の登録をすることで、請求書の作成時にデータを呼び出すことができます。 |

<br />

## 使用技術

|     言語・ライブラリ      | バージョン・用途                                   |
| ----------------- | --------------------------------------------------   |
| Typescript        | TypeScript, Next.js, Storybook                       |
| React           　　| TypeScript, NestJS, Prisma                           |
| Redux    　　　　　　| Amazon Web Services, Vercel                          |
| axois          　　| PostgreSQL                                           |
| Next.js        　　| Sentry, UptimeRobot                                  |
|  Node.js          | Docker                                               |
| Express            | GitHub Actions                                       |
| Prisma            | Figma, Lucid                                         |
| EsLint              | Stylelint, ESLint, Prettier, Husky Jest, Git, GitHub |
| Material ui              | Stylelint, ESLint, Prettier, Husky Jest, Git, GitHub |
| Scss              | Stylelint, ESLint, Prettier, Husky Jest, Git, GitHub |
| Supabase              | Stylelint, ESLint, Prettier, Husky Jest, Git, GitHub |

<br />

## フォルダ構成
### フロントエンド
```
src/
├─ pages/               # ページ遷移用（fetch処理やSSRを含む）
├─ template/            # ページの主要部分
├─ widgets/             # ページの一部分の再利用可能コンポーネント
├─ part/                # 最小単位の再利用可能コンポーネント
├─ hooks/               # カスタムフック
├─ layout/              # ページ共通のレイアウト
├─ libs/                # ライブラリの初期設定
├─ utils/               # 便利関数
├─ style/               # レイアウトやMaterial UIのCSS
└─ types/               # Props以外の型定義

```
### バックエンド
```
src/
├─ pages/               # ページ遷移用（fetch処理やSSRを含む）
├─ template/            # ページの主要部分
├─ widgets/             # ページの一部分の再利用可能コンポーネント
├─ part/                # 最小単位の再利用可能コンポーネント
├─ hooks/               # カスタムフック
├─ layout/              # ページ共通のレイアウト
├─ libs/                # ライブラリの初期設定
├─ utils/               # 便利関数
├─ style/               # レイアウトやMaterial UIのCSS
└─ types/               # Props以外の型定義

```

# 力を入れたところ

### React-hooks-form
→ログイン、サインアップ画面で使っています。
→バリデーションチェックもReact-hooks-formで行っています。

### scss
<img width="676" alt="スクリーンショット 2023-09-29 19 12 10" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/d691510d-811c-4675-a23a-a096c7a0c036">
→global.scssで頻度の高いcssを記述し、使えるようにしています。

### MarkDown


