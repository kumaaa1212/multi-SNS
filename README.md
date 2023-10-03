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
# TOKOTOKO=Jとは？、
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


## 機能一覧・詳細
### HOME画面 (ホーム)

| 全体 |　ポイント　|
| ---- | ---- |
| ![スクリーンショット 2023-10-02 21 51 18](https://github.com/kumaaa1212/multi-SNS/assets/116778080/6c28a4ac-35ea-42b1-95e8-bc8b91e8c914) | ![スクリーンショット 2023-10-02 21 41 36](https://github.com/kumaaa1212/multi-SNS/assets/116778080/c5f6ef6a-ded8-43c6-a965-8faab07593a7) 
| TOKOTOKO=Jでは投稿には2つの種類があります。ホーム画面では、Tweet投稿とAlbum投稿が**いいねの多い順**に、そして投稿に設定できるラベルに付けられた**Labelが多いチーム**が表示されます。  | 一度全てのlabel情報を一つずつ取得し、labelの登場回数が多い順に並び替え、重複しているlabelを削除しています。**人気順に並べることで今話題のチームや情報を迅速に確認できます。** |

| その他 (UX) |　その他 (レスポンシブ) |
| ---- | ---- |
| ![スクリーンショット 2023-10-02 21 52 07](https://github.com/kumaaa1212/multi-SNS/assets/116778080/b960305a-16ba-42b2-91ca-d51720216673) |  <img width="912" alt="スクリーンショット 2023-10-03 9 12 44" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/095f0832-e35f-4cf0-a3e9-44227dc53be8">
|**情報量の多さはUXが下がると思いました。** Tweetの場合本文の一部を表示させ、詳細はModalで表示されます。 | **レスポンシブ対応(375px~)** もしており、スマートフォンなどの小さな画面でも快適に投稿された内容を確認できる様になっています。 |

### CHAT (チャット)

| 全体 |　詳細|
| ---- | ---- |
| <img width="1455" alt="スクリーンショット 2023-09-30 2 31 24" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/8d07b861-3615-4ce5-a36b-4935b537e0f4"> | <img width="1443" alt="スクリーンショット 2023-09-30 2 32 31" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/3d8e27d1-8cd3-4dad-8ec9-0558c6dc4662"> |
| サッカーにおいて**主要なSNSツールは掲示板**です。しかし現在ある掲示板はUIが悪く、UXが低いです。今回作成したBOARD(掲示板)はシンプルかつ使いやすい様にしました。| 現在のサッカーの掲示板では対戦相手のチームのファンによる荒らしが多く、本来の機能を果たしていません。この掲示板は**自身の登録したチームにのみアクセスできる様**になっています。 |

| その他(返信機能) |　その他(レスポンシブ) |
| ---- | ---- |
| <img width="1443" alt="スクリーンショット 2023-09-30 2 32 31" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/cabb809b-3d19-4742-825c-0f4b82f0718a"> | <img width="909" alt="スクリーンショット 2023-10-03 8 58 06" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/221a60b6-50bc-4d5a-a3a5-ff7aa297ebc3">|
| 一つの投稿に対して**話題を深掘りできる様**に、一つの投稿に対しても返信を行えるようにしています。 | **レスポンシブ対応(375px~)** もしており、スマートフォンなどの小さな画面でも快適に投稿された内容を確認できる様になっています。 |

### BOARD (掲示板)

| 全体 |　詳細|
| ---- | ---- |
| <img width="1455" alt="スクリーンショット 2023-09-30 2 31 24" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/8d07b861-3615-4ce5-a36b-4935b537e0f4"> | <img width="1443" alt="スクリーンショット 2023-09-30 2 32 31" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/3d8e27d1-8cd3-4dad-8ec9-0558c6dc4662"> |
| サッカーにおいて**主要なSNSツールは掲示板**です。しかし現在ある掲示板はUIが悪く、UXが低いです。今回作成したBOARD(掲示板)はシンプルかつ使いやすい様にしました。| 現在のサッカーの掲示板では対戦相手のチームのファンによる荒らしが多く、本来の機能を果たしていません。この掲示板は**自身の登録したチームにのみアクセスできる様**になっています。 |

| その他(返信機能) |　その他(レスポンシブ) |
| ---- | ---- |
| <img width="1443" alt="スクリーンショット 2023-09-30 2 32 31" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/cabb809b-3d19-4742-825c-0f4b82f0718a"> | <img width="909" alt="スクリーンショット 2023-10-03 8 58 06" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/221a60b6-50bc-4d5a-a3a5-ff7aa297ebc3">|
| 一つの投稿に対して**話題を深掘りできる様**に、一つの投稿に対しても返信を行えるようにしています。 | **レスポンシブ対応(375px~)** もしており、スマートフォンなどの小さな画面でも快適に投稿された内容を確認できる様になっています。 |




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


