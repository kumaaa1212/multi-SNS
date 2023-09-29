# TOKOTOKO=J
・10年間国内サッカーリーグを応援し続けた私が、必要だと思った機能を詰め込んだSNSアプリ。
・制作期間約2~3か月

## 使用技術
・Typescript
・React
・axois
・Redux
・Next.js
・Node.js
・Express
・Prisma
・EsLint
・Material ui
・Supabase

## 機能一覧

## きっかけ
国内サッカーリーグを10年間応援し続け、**サッカー専用**のSNSアプリがないと思っていました。特定のチーム専用の掲示板やX(旧 Twitter)やInstagramなど分散してしまっています。
**サッカーを応援している人口は多い。これらの機能を一つにまとめたら最高のSNSアプリが作れるのではないかと思いました。**

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
## 技術選定
### React-hooks-form
<img width="568" alt="スクリーンショット 2023-09-29 19 13 49" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/d199690c-9c73-4d18-9cea-e079ce598609">
→ログイン、サインアップ画面で使っています。
→バリデーションチェックもReact-hooks-formで行っています。

### scss
<img width="676" alt="スクリーンショット 2023-09-29 19 12 10" src="https://github.com/kumaaa1212/multi-SNS/assets/116778080/d691510d-811c-4675-a23a-a096c7a0c036">
→global.scssで頻度の高いcssを記述し、使えるようにしています。



