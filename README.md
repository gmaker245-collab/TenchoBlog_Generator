# TenchoBlog_Generator

店長ブログ向けの HTML ジェネレーターです。バニラ / cocoa の両対応で、画像の追加・Cloudinary へのアップロード・ボタンのカスタマイズ・生成した HTML のプレビューまで行えます。

## できること

- 店舗別のサイト設定に対応
  - Vanilla（バニラ）
  - cocoa（ここあJOB）
- 画像を複数追加して並び替え可能
- 画像URL入力または Cloudinary へのアップロードに対応
- キープボタンやリンクボタンの色・角丸・テキストをカスタマイズ可能
- 生成した HTML を即時プレビューできる

## 主要な構成

- [index.html](index.html)  
  静的な HTML 版ジェネレーター
- [app](app)  
  Next.js 版の実装
- [app/src/app/page.tsx](app/src/app/page.tsx)  
  画面全体のステップ遷移と状態管理
- [app/src/components](app/src/components)  
  各ステップの UI コンポーネント
- [app/src/utils/generateHtml.ts](app/src/utils/generateHtml.ts)  
  HTML 生成ロジック
- [app/src/utils/constants.ts](app/src/utils/constants.ts)  
  サイト設定・ボタンデフォルト・プリセット定義
- [app/src/utils/cloudinary.ts](app/src/utils/cloudinary.ts)  
  Cloudinary アップロード処理

## 起動方法

### 1. 静的版を使う

ブラウザで [index.html](index.html) を開くだけで利用できます。

### 2. Next.js 版を使う

```bash
cd app
npm install
npm run dev
```

その後、ブラウザで http://localhost:3000 を開いてください。

## 開発メモ

- Cloudinary のアップロード preset は [app/src/utils/constants.ts](app/src/utils/constants.ts) に設定されています。
- 生成された HTML は [app/src/utils/generateHtml.ts](app/src/utils/generateHtml.ts) で作成されます。
- 画像の並び替えにはドラッグ＆ドロップ対応の UI を利用しています。

## ライセンス

このプロジェクトは個人利用・開発用途を想定しています。