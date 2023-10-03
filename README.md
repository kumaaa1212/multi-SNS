# TOKOTOKO=J
<img width="1457" alt="スクリーンショット 2023-09-30 2 49 45" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/e86e355e-2257-47c3-bcf2-0d98e6fe2117">

<br />

- 10年間国内サッカーリーグを応援し続けた私が、今後もっと**国内サッカーリーグを盛り上げるため**に作成したSNSアプリ。
- 制作期間約2~3か月

https://tokotokoj.vercel.app

**テストユーザー** 
+ 右上のユーザーアイコンからログインできます。
+ ログインすると**いいね機能、フォロー機能、そしてMYPAGE**が確認できます。
```
[email] test.user2023@gmail.com
[password] 123456
```
# TOKOTOKO=Jとは？
- **国内サッカーリーグ(Jリーグ)応援するSNSアプリです。**
- 国内サッカーリーグ(Jリーグ)と他の国内スポーツリーグの違いは**各地域に沢山のチームがあることだ(58チーム)**。そのため**地方に遠征に行くことが国内サッカーリーグ(Jリーグ)の醍醐味**とも言える。各地域にトコトコ足を運び、【思い出が投稿・共有できるよ様にしたい】、【もっとスタジアムに足を運んでほしい】言う願いから**TOKOTOKO=J**と命名した。
  
## きっかけ
- 国内サッカーリーグを10年間応援し続け、**サッカー専用**のSNSアプリがないと感じた。サッカーファンが使用しているSNSは特定のチーム専用の掲示板やX(旧 Twitter)やInstagramなど分散しているのが現状だ。そして **様々な種類の投稿機能(ブログ形式投稿、短文投稿、画像付き投稿)** 全てを備えているものがない。
- **サッカーを応援している人口は多い。これらの機能を一つにまとめたら最高のSNSアプリが作れる**、そしてもっと国内サッカーリーグ(Jリーグ)を活性化できると思った。

## 目指した課題解決
- チームの情報を共有しやすくする。それにより**応援の熱を活性化させ、チームを盛り上げる**。
- 情報を共有により、遠征先の情報を確認しやすくし、**試合を見に行くことの難易度を下げたい。**
- 他のチームの人々との繋がりを深めることを助け、**国内サッカーリーグ(Jリーグ)を盛り上げたい。**


## 技術選定・使用技術
技術選定を行った際の基準は、自分が【使いこなせるもの】だ。</br>
ここでの【使いこなせるもの】は、エラーや不明点があった際に**解決の糸口を自分で探すことができること**。</br>
歴が1年と短く、日々新たなものに触れる状況。その中で「新たに登場したライブラリだから」「人気と言われているから」などの**軽薄な理由での技術選定は開発を円滑に進めることは困難になる**と考えた。</br>
以上の理由で今回下記の技術選定を行った。現在参加している長期インターンシップで使用しているものを中心に選ぶことで、実務に沿ったプロダクト開発を行えると考えた。

<br />

### フロントエンド
 これまだ一番長く触れてきたReactをベースとしたNext.jsで作成した。Next.jsはページ遷移の速さ・pathの指定のし易さなど機能面での優位点がReact単体よりもあるほか、現在の長期インターンシップ先で使用していることから、実務に沿ったプロダクト開発を行えると考えた。

### バックエンド
バックエンド技術選定を行う際に選択肢として、Node.jsとRuby(Ruby on Rails)があった。しかし今回の技術選定の全体の軸として【使いこなせるもの】としていたため、フロント側でも使用しているTypeScriptを使用できるNode.jsを選択した。そして今回のプロダクトはフォルダ数、データベースともにこれまで自身で開発していたものと比べ、複雑になってしまうことが想定できた。これまでFirebaseなどのNoSQLを使用した開発を行っていたが、今回はプロダクトの大きさやデータベースの複雑性を予想し、RDBで設計を行うことにした。そしてこれまで使用経験が多いPrismaを使い、RDBを設計した。
+ 

|     言語・ライブラリ      | バージョン・用途                                   |
| ----------------- | --------------------------------------------------   |
| Typescript        | v 5.2.2             |
| React           　 | v 18.2.0                      |
| Redux    　　　　　 | v 8.1.2                     |
| react-hook-form   | v 7.45.4                 |
| react-markdown    | v 8.0.7              |
| axois          　　| 1.4.0                                           |
| Next.js        　　| v 13.4.7 (App Routerで作成していません。)                    |
|  Node.js          | v 18.14.0 (TypeScriptを使用しています。)                                            |
| Express.js        | v 4.18.2                                    |
| Prisma            | v 5.3.1                                   |
| JSON Web Token    | v 9.0.2                      |
| bcrypt            | v 5.1.1                     |
| EsLint            | v 8.48.0 (import orderなどの設定を行っています。)  |
| Scss              |v 1.63.6 |
| Material UI       |v 5.14.11  |
| Supabase          | supabaseを使用し、PostgreSQLでデータを管理 |
| Vercel            | フロントエンドのデプロイ先 |
| Render            |バックエンドのデプロイ先 |
| Jest, testing-library   |テストツール |

<br />

## フォルダ構成
### フロントエンド
```
src/
├─ componets
│    ├─ hooks             # カスタムフック
│    ├─ layout            # ページ共通のレイアウト
│    ├─ part              # 最小単位の再利用可能コンポーネント (Buttonなど)
│    ├─template           # ページの主要部分
│    ├─ widgets           # ページの一部分の再利用可能コンポーネント (同じデザインfooterなど)
│
├─ pages                  # ページ遷移用（componets配下のファイルをインポート。fetch処理やSSRを含む。）
│              
├─ features               # Reduxのsliceを各j機能ごとに記述。
│      ├─ chatSlice.ts
│      ├─ postSlice.ts
│      ├─ userSlice.ts
│
├─ store                  # Reduxのstoreを記述
├─ libs                   # ライブラリの初期設定
├─ utils                  # 再利用可能な関数 (時間のフォーマット形成など)
├─ style                  # レイアウトやMaterial UIのCSS
└─ types                  # Props以外の型定義

```
フォルダ構成の軸としたものが**機能ごとの分割**だ。
プロジェクト全体の見通しを良くすることで、**同じような機能の再実装を防げたり、修正の際の影響範囲を簡単に見積もること**ができるようにする。
+ pagesにSSRなどのレンダリング時のfetch処理を集約させた。 pagesにfetch処理以外を書かないことで、fetch処理と実際のページを分割している。
+ componets配下に機能ごとのフォルダを設置。(再利用が可能なものは、partとwidgetsに記述、実際のページの核となる部分はtemplateに記述。)
+ templateには書くpathごとのフォルダを設置。

### バックエンド
```
src/
├─ Prisma             
├─ src
│    ├─ server.ts          
│    ├─ middleware.ts
│    ├─ router            
│    │  ├─ article        
│    │  ├─ board  
│    │  ├─ chat  
│    │  ├─ post

```
```mermaid
erDiagram

  "User" {
    Int id "🗝️"
    String email 
    String name 
    String password 
    String team 
    String icon 
    String bio 
    String twitterURL 
    String teamURL 
    DateTime createdAt 
    }
  

  "Follow" {
    Int id "🗝️"
    String bio 
    String name 
    String icon 
    String team 
    String twitterURL 
    String teamURL 
    Int frendId 
    }
  

  "Follower" {
    Int id "🗝️"
    String bio 
    String name 
    String icon 
    String team 
    String twitterURL 
    String teamURL 
    Int frendId 
    }
  

  "Post" {
    Int id "🗝️"
    String content 
    String title 
    DateTime createdAt 
    String authorId "❓"
    String authorName 
    String authorAvatar 
    String thumbnailText 
    String thumbnailImg 
    }
  

  "Like" {
    Int id "🗝️"
    String authorId 
    }
  

  "Bookmark" {
    Int id "🗝️"
    String authorId 
    }
  

  "PostLabel" {
    Int id "🗝️"
    String label 
    String name 
    String league 
    String img 
    }
  

  "Tweet" {
    Int id "🗝️"
    String content 
    DateTime createdAt 
    String img "❓"
    String authorId "❓"
    String authorName 
    String authorAvatar 
    String label 
    }
  

  "TweetLike" {
    Int id "🗝️"
    String authorId 
    }
  

  "BoardRoom" {
    Int roomId "🗝️"
    String team 
    DateTime createdAt 
    }
  

  "Board" {
    Int id "🗝️"
    String content 
    DateTime createdAt 
    String authorId "❓"
    String authorName 
    String authorAvatar 
    }
  

  "BoardLike" {
    Int id "🗝️"
    String authorId 
    }
  

  "BoardMessage" {
    Int id "🗝️"
    String content 
    DateTime createdAt 
    String authorId "❓"
    String authorName 
    String authorAvatar 
    }
  

  "Room" {
    String id "🗝️"
    String user1Id 
    String user1Name 
    String user1Icon 
    String user2Id 
    String user2Icon 
    String user2Name 
    DateTime createdAt 
    }
  

  "Message" {
    Int id "🗝️"
    String content 
    DateTime createdAt 
    String authorId "❓"
    String senderId 
    }
  

  "KeepPost" {
    Int id "🗝️"
    String title 
    String content 
    String authorId 
    DateTime createdAt 
    }
  
    "User" o{--}o "Follower" : "followers"
    "User" o{--}o "Follow" : "follows"
    "Follow" o|--|| "User" : "user"
    "Follower" o|--|| "User" : "user"
    "Post" o{--}o "PostLabel" : "labels"
    "Post" o{--}o "Like" : "likes"
    "Post" o{--}o "Bookmark" : "bookmarks"
    "Like" o|--|| "Post" : "post"
    "Bookmark" o|--|| "Post" : "post"
    "PostLabel" o|--|| "Post" : "post"
    "Tweet" o{--}o "TweetLike" : "likes"
    "TweetLike" o|--|| "Tweet" : "tweet"
    "BoardRoom" o{--}o "Board" : "board"
    "Board" o{--}o "BoardLike" : "likes"
    "Board" o{--}o "BoardMessage" : "messages"
    "Board" o|--|| "BoardRoom" : "room"
    "BoardLike" o|--|| "Board" : "board"
    "BoardMessage" o|--|| "Board" : "board"
    "Room" o{--}o "Message" : "messages"
    "Message" o|--|o "Room" : "room"
```



フロント側と同じ様にフォルダ構成の軸としたはが**機能ごとの分割**だ。
APIを使用している部分ごとに分けることで、**APIの発見のしやすさ、修正の際の影響範囲を簡単に見積もること**を可能にする。
コードの質を上げるためにも、似たAPIをフォルダごとに集約することができる。
+ srcフォルダ配下に各機能ごとのsetrver.jsとrouterフォルダを設置。

# 機能詳細とポイント

+ 本プロダクトは主に**4つのページ**で構成されています。(HOME, CHAT, MYPAGE, BOARD)
+ ページごとの**概要**と**注力した点(ポイント)** と **その他の機能**を説明しています。
+ 4つの基本ページ以外のページは**その他**でまとめて紹介しています。

## HOME画面 (ホーム)

| 全体 |　ポイント　|
| ---- | ---- |
| ![スクリーンショット 2023-10-02 21 51 18](https://github.com/kumaaa1212/multi-SNS/assets/116778080/6c28a4ac-35ea-42b1-95e8-bc8b91e8c914) | ![スクリーンショット 2023-10-02 21 41 36](https://github.com/kumaaa1212/multi-SNS/assets/116778080/c5f6ef6a-ded8-43c6-a965-8faab07593a7) 
| TOKOTOKO=Jでは投稿には2つの種類があります。ホーム画面では、Tweet投稿とAlbum投稿が**いいねの多い順**に、そして投稿に設定できるラベルに付けられた**Labelが多いチーム**が表示されます。  | 一度全てのlabel情報を一つずつ取得し、labelの登場回数が多い順に並び替え、重複しているlabelを削除しています。**人気順に並べることで今話題のチームや情報を迅速に確認できます。** |

| その他 (UX) |　その他 (レスポンシブ) |
| ---- | ---- |
| ![スクリーンショット 2023-10-02 21 52 07](https://github.com/kumaaa1212/multi-SNS/assets/116778080/b960305a-16ba-42b2-91ca-d51720216673) |  <img width="912" alt="スクリーンショット 2023-10-03 9 12 44" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/095f0832-e35f-4cf0-a3e9-44227dc53be8">
|**情報量の多さはUXが下がると思いました。** Tweetの場合本文の一部を表示させ、詳細はModalで表示されます。 | **レスポンシブ対応(375px~)** もしており、スマートフォンなどの小さな画面でも快適に投稿された内容を確認できる様になっています。 |

## CHAT (チャット)

| 全体 |　詳細|
| ---- | ---- |
| <img width="1470" alt="スクリーンショット 2023-10-03 13 17 17" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/082614d1-ee10-4d45-bf92-bc8b5a0cc871"> | <img width="1470" alt="スクリーンショット 2023-10-03 13 15 43" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/bf7ac1d2-4ff8-4505-8731-64292b8fb81b"> |
| CHATページでは**同じチームを応援している人、違うチームだけど仲良くなりたい人**と繋がれることができます。**フォローしたユーザーに対してのみ**メッセージを送ることができます。 | 相互フォローしていない相手からメッセージが送られてきた先に、**通知される挙動**にしています。この部分は**全ページの中で特に苦戦した部分**となっています。相手のフォロー状態と自分のフォロー状態の確認、ボタンが押された際には相手のデータに反映させるなど様々な条件式を組み合わせて作成しています。 |

| その他(返信機能) |　その他(レスポンシブ) |
| ---- | ---- |
| <img width="1443" alt="スクリーンショット 2023-09-30 2 32 31" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/cabb809b-3d19-4742-825c-0f4b82f0718a"> | <img width="909" alt="スクリーンショット 2023-10-03 8 58 06" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/221a60b6-50bc-4d5a-a3a5-ff7aa297ebc3">|
| 一つの投稿に対して**話題を深掘りできる様**に、一つの投稿に対しても返信を行えるようにしています。 | **レスポンシブ対応(375px~)** もしており、スマートフォンなどの小さな画面でも快適に投稿された内容を確認できる様になっています。 |

## BOARD (掲示板)

| 全体 | ポイント　|
| ---- | ---- |
| <img width="1455" alt="スクリーンショット 2023-09-30 2 31 24" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/8d07b861-3615-4ce5-a36b-4935b537e0f4"> | <img width="1443" alt="スクリーンショット 2023-09-30 2 32 31" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/3d8e27d1-8cd3-4dad-8ec9-0558c6dc4662"> |
| サッカーにおいて**主要なSNSツールは掲示板**です。しかし現在ある掲示板はUIが悪く、UXが低いです。今回作成したBOARD(掲示板)はシンプルかつ使いやすい様にしました。| 現在のサッカーの掲示板では対戦相手のチームのファンによる荒らしが多く、本来の機能を果たしていません。この掲示板は**自身の登録したチームにのみアクセスできる様**になっています。 |

| その他(返信機能) |　その他(レスポンシブ) |
| ---- | ---- |
| <img width="1443" alt="スクリーンショット 2023-09-30 2 32 31" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/cabb809b-3d19-4742-825c-0f4b82f0718a"> | <img width="909" alt="スクリーンショット 2023-10-03 8 58 06" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/221a60b6-50bc-4d5a-a3a5-ff7aa297ebc3">|
 一つの投稿に対して**話題を深掘りできる様**に、一つの投稿に対しても返信を行えるようにしています。 | **レスポンシブ対応(375px~)** もしており、スマートフォンなどの小さな画面でも快適に投稿された内容を確認できる様になっています。 |

## MYPAGE (掲示板)

| 全体 | ポイント　|
| ---- | ---- |
| <img width="1457" alt="スクリーンショット 2023-09-30 2 49 45" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/c8f6104d-fc09-41e8-ad41-da068babffab"> | <img width="907" alt="スクリーンショット 2023-10-03 11 05 36" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/87f08c54-c3c1-4db9-a661-0a4a6f463b71"> |
| MYPAGEでは**二種類の投稿(TweetとAlbum)、自身のプロフィール編集、そして保存・いいね・自身が投稿した投稿を一覧**できます。*二種類の投稿(Tweet投稿とAlbum投稿)のうち、**Album投稿**しかMYPAGEのTabには掲載されません。| Tabでは保存・いいね・自身が投稿した投稿を切り替えできます。Tabを切り替えるごとに即座に反映される様に実装しています。 |

| その他(プロフィール編集機能) |　その他(投稿機能) |
| ---- | ---- |
| <img width="1455" alt="スクリーンショット 2023-10-03 11 11 12" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/17721d25-c909-4b88-a968-ad4933e1ade5"> | <img width="332" alt="スクリーンショット 2023-10-03 11 12 36" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/08eab715-6ae6-477c-aad7-30f1dc36526c">|
| 一つの投稿に対して**話題を深掘りできる様**に、一つの投稿に対しても返信を行えるようにしています。 | 右下のボタンをhoverすると二つのボタンが出現します。このボタンは**投稿ボタン**です。ここから投稿ページに遷移します。(本プロダクトでは二種類の投稿機能があります。Tweet投稿とAlbum投稿です。下記で詳細に説明しています。) |

## その他のページ
| Album投稿ページ | ポイント　|
| ---- | ---- |
| <img width="1466" alt="スクリーンショット 2023-10-03 11 20 38" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/bdff7e04-d7b5-4009-9769-ba677957198c"> |  <img width="1470" alt="スクリーンショット 2023-10-03 11 21 33" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/f011cb17-2376-4cdd-bc91-2617749e52b4"> |
|二つある投稿機能のうち**Album投稿**です。Album投稿はMarkDown形式で記入し、画像などの挿入の可能です。**Album投稿はBlogの様に書くことを想定**しています。例えば、地方に遠征に行った際の出発から帰宅までの一覧の流れを書く、最近話題になっているサッカーニュースについて自分の意見を詳細に書くことができます。| Album投稿ページには様々な機能があります。上記の画像は一時保存されていない状態で戻るボタンを押した際に**SaveBarが降りてくる様**になっています。他にも**一時保存機能**やマークダウン記述をその場で確認できる**プレビュー機能**などもついています。 |


| Tweet投稿ページ |　ポイント |
| ---- | ---- |
| <img width="1455" alt="スクリーンショット 2023-10-03 11 11 12" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/17721d25-c909-4b88-a968-ad4933e1ade5"> | <img width="1250" alt="スクリーンショット 2023-10-03 12 31 53" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/2b69c006-fbdd-4d0d-8d18-a8f68024d2bc"> |
| 二つある投稿機能のうち**Tweet投稿**です。Tweet投稿は短文と画像を投稿するのに適しています。Labelを設定することができ、検索の際にヒットしやすくすることができます。 | 本プロダクトの特徴はLabelを追加できることです。他のSNSアプリの場合、チームごとの検索が難しいと感じています。特に短文を投稿する場合などは簡単に投稿できることを重きをおいており、投稿の検索などは困難です。本プロダクトの **Tweet投稿**では簡単に投稿できることはもちろんのこと、Labelを追加できるため、**自分の興味を持った投稿を検索しやすくなっています。**|

| 投稿一覧ページ(Album・Tweet) |　ポイント |
| ---- | ---- |
| <img width="1470" alt="スクリーンショット 2023-10-03 12 36 47" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/53a1bab1-140e-493f-9045-c91d92c8d8a5"> | <img width="855" alt="スクリーンショット 2023-10-03 12 38 21" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/2c6547ff-ce4f-43e6-b8da-7562d1337439"> |
| 投稿されたAlbum・Tweetは一覧ページでそれぞれ確認することができます。表示方法には**文字検索・Label検索・投稿順・いいね順**に表示することができ、変更内容を即座に確認することができます。 |  **レスポンシブ対応(375px~)** もしており、スマートフォンなどの小さな画面でも快適に投稿された内容を確認できる様になっています。そして投稿が多い際には表示枚数を制限し、**ページネーションで次の投稿一覧を確認すること**ができます。 |

| チーム検索ページ |　ポイント |
| ---- | ---- |
| <img width="1470" alt="スクリーンショット 2023-10-03 12 36 47" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/53a1bab1-140e-493f-9045-c91d92c8d8a5"> | <img width="855" alt="スクリーンショット 2023-10-03 12 38 21" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/2c6547ff-ce4f-43e6-b8da-7562d1337439"> |
| 投稿されたAlbum・Tweetは一覧ページでそれぞれ確認することができます。表示方法には**文字検索・Label検索・投稿順・いいね順**に表示することができ、変更内容を即座に確認することができます。 |  **レスポンシブ対応(375px~)** もしており、スマートフォンなどの小さな画面でも快適に投稿された内容を確認できる様になっています。そして投稿が多い際には表示枚数を制限し、**ページネーションで次の投稿一覧を確認すること**ができます。 |

| チーム検索ページ |　ポイント |
| ---- | ---- |
| <img width="1465" alt="スクリーンショット 2023-10-03 12 50 40" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/5d752614-aa7e-4459-aa94-4d83922ac8d3"> | <img width="1469" alt="スクリーンショット 2023-10-03 13 05 52" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/232a0513-015b-4442-94df-4a4969211fcf" > | 
|  **チーム検索画面**です。現在は一つのカテゴリーに所属するチームしか登録していません。しかし今後、**国内サッカーリーグに所属する全チーム**を登録したいと考えています。| チーム数が多いため、検索機能をつけました。**検索したチームをロゴをクリックするとそのチームに関連したAlbum一覧ページに遷移します。** |

# 今回の反省と今後の展開
- フロントエンド、バックエンドともに**要件定義を疎かにしてしまった。**
  - フロントエンドではコンポーネント同士の依存関係が強くなってしまい、修正に時間がかかった。また共通のデザインをあらかじめ理解していなかったために、CSSでの不必要なデザインやMaterial UIからのimportが増えてしまい一貫したデザインにすることに時間を要した。
  - バックエンドでは上記のER図からも分かるように**正確にスキーマのリレーションが行われていない。** バックエンドの知識が乏しいことが再確認された。フロントを円滑に行うためにもバックエンドの知識の再確認が必要だ。
- 登録されているチームからチーム数を増やす。機能面絵はGoogle Maps API Keyなどを使用し、自分が行ったことがあるスタジアムなどを記録できるようにしたい。これらのアップデートを行うことでより自身が目指す **【目指した課題解決】** を達成できると考える。


