# Sticky Notes

Apple風のモダンなデザインで作られた付箋メモWebアプリです。
URL：https://sticky-note-ashen.vercel.app/
## 機能

| 機能 | 詳細 |
|------|------|
| 付箋の追加 | ヘッダーの「付箋を追加」ボタンから作成 |
| ドラッグ&ドロップ | マウス・タッチ操作で自由に配置 |
| カラーテーマ | 8種類のグラデーションカラーから選択 |
| 編集・削除 | 付箋上で直接テキスト編集、削除ボタンで削除 |
| ピン留め | 重要な付箋を最大3枚まで固定（バッジ表示） |
| データ永続化 | localStorage によりリロード後も内容・位置・状態を保持 |

## 技術スタック

- **React 19** + **TypeScript 6** (strict)
- **Vite 8** (ビルドツール)
- **Tailwind CSS v4** (Vite プラグイン経由)
- **lucide-react** (アイコン)
- **Vitest** + **@testing-library/react** (テスト)

## 開発コマンド

```bash
npm run dev        # 開発サーバー起動
npm run build      # プロダクションビルド
npm run test:run   # テスト実行（一回）
npm test           # テスト実行（ウォッチモード）
npm run lint       # ESLint チェック
npm run preview    # ビルド結果のプレビュー
```

## アーキテクチャ

```
src/
├── types/note.ts          # Note型・ColorValue型
├── constants/colors.ts    # カラー設定・ピン留め上限定数
├── hooks/
│   └── useNotes.ts        # 付箋のCRUD・localStorage永続化
├── components/
│   ├── Header.tsx         # 固定ヘッダー（追加ボタン・統計）
│   ├── StickyNote.tsx     # 付箋カード（ドラッグ・編集・色変更・ピン）
│   ├── ColorPicker.tsx    # カラー選択ポップオーバー
│   └── EmptyState.tsx     # 付箋ゼロ時のウェルカム画面
├── lib/utils.ts           # Tailwind クラスマージ用 cn()
└── App.tsx                # ルートコンポーネント
```

### 状態管理

`useNotes` フックが全付箋の状態を管理し、変更のたびに自動で `localStorage` へ保存します。`zIndex` を動的に割り当てることで、クリックした付箋が常に最前面に来るようにしています。

### ドラッグ&ドロップ

`mousedown`/`mousemove`/`mouseup` とタッチイベント (`touchstart`/`touchmove`/`touchend`) の両方に対応しています。イベントリスナーは `window` に登録し、付箋の外でポインターが離れてもドラッグが正しく終了します。

## デザイン仕様

- **テーマ**: Glassmorphism × Apple風 (ライトモードのみ)
- **カラー**: 8色グラデーションパレット（サンシャイン・スカイ・ミント・ローズ・ラベンダー・ピーチ・アクア・クリーム）
- **アニメーション**: duration-200ms 統一、GPUアクセラレーション優先
- **レスポンシブ**: モバイルファースト設計、タッチ操作対応
