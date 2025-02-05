# 環境構築
## configファイルを作成
`config` ディレクトリに `develop.json` と `production.json` を作成してください。

- `develop.json`: 開発用のミニアプリの設定情報
```json
{
    "LIFF_ID": "開発用のLIFFID",
    "ENABLE_VCONSOLE": "true"
}
```

- `production.json`: 本番用のミニアプリの設定情報
```json
{
    "LIFF_ID": "本番用のLIFFID",
    "ENABLE_VCONSOLE": "false"
}
```

## 依存関係をインストール
```bash
npm install
```

## ローカルでの開発
```bash
npm run preview
```

## Cloudflareにデプロイ
```bash
npm run deploy
```
