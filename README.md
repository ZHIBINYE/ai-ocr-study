# ai-ocr-study

## 概要

スマホで撮影した写真を OCR で文字起こしし、音声データに変換して再生する

## 起動コマンド

### フロント

1. `front/src/App.tsx`にバックエンドの URL を書き換える
   ローカルで LAN で繋がる想定で、DHCP 設定する場合、「LAN IP」が変わるので、バックエンドの URL を修正する必要があります。

2. 起動

```shell
# 作業フォルダへ移動
cd front/
# パッケージインストール
npm i

# HTTPSで起動
npm run start_https
```

### バックエンド

```shell
# 作業フォルダへ移動
cd backend/
# パッケージインストール(M1 Macなので、conda-forge/miniforgeを利用しています。)
# pip install -r requriements.txt
conda install --file requriements.txt
# HTTPSで起動
python3 src/core/app.py
```

## トラブルシューティング

スマホのカメラにアクセスするため、HTTPS で通信が必要です。
ローカルで HTTPS を起動するには、次のコマンドで SSL を生成し、フロントとバックエンド起動時にそれぞれ当たる必要があります。

```shell
# CA用の秘密鍵を生成
openssl genrsa -out server.key 2048
# 秘密鍵と識別情報とから CSR (certificate signing request 証明書署名要求) を生成
openssl req -out server.csr -key server.key -new
# 公開鍵が入ったCSRを秘密鍵で自己署名してCA証明書を作成
openssl x509 -req -days 3650 -signkey server.key -in server.csr -out server.crt
```
