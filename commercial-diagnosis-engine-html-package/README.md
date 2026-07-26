# Commercial Diagnosis Engine — 30-Day OJT

公開版をGitHub／Cloudflare Pagesへ移せる静的HTMLパッケージです。30日カリキュラム、LP、実例と模範解答の横並び表示、回答・進捗のブラウザ保存、Portfolio出力を収録しています。サーバーやデータベースは不要です。

## GitHub → Cloudflare Pages

1. このZIPを展開し、中身をGitHubリポジトリのルートへpushします。
2. Cloudflare PagesでGitHubリポジトリを接続します。
3. Build commandを `npm run build`、Build output directoryを `dist` に設定します。
4. Production branchを `main` にしてデプロイします。

## Cloudflare Pagesへ直接アップロード

ZIP内の `dist` フォルダをCloudflare PagesのDirect Upload画面へドラッグ＆ドロップします。

## ローカル確認

Node.js 22.13以降で次を実行します。

```bash
npm ci
npm run dev
```

## データ保存

回答と進捗は閲覧端末の `localStorage` に保存されます。別端末・別ブラウザへは自動同期されません。Portfolio画面からMarkdownファイルとして回答を出力できます。

## 主なファイル

- `index.html`：HTMLエントリ
- `src/App.tsx`：画面と操作
- `src/curriculum.ts`：30日分の教材データ
- `src/styles.css`：PC／スマートフォン表示
- `dist/`：Cloudflare Pagesへそのままアップロードできる完成版
