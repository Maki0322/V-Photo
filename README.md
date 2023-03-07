# V-Photo
## Overview
VALORANT（PC上で遊ぶFPSゲーム）競技シーンのファンのための世界大会の写真検索アプリです。
チームや大会等でフィルターをかけて、素早く見たい写真を探すことができます。
また、写真掲載元であるFlickrの該当ページに遷移することもできます。

### PC版
|  Main  |  Favorite  |  Mypage  |
| ---- | ---- | ---- |
|![スクリーンショット (445)](https://user-images.githubusercontent.com/109948082/223426292-aa342420-a5a0-4670-91ae-b1903f222ba2.png)|![スクリーンショット (446)](https://user-images.githubusercontent.com/109948082/223426404-1df0394e-cfbf-4bcb-918c-c9f5c458c23c.png)|![スクリーンショット (447)](https://user-images.githubusercontent.com/109948082/223426477-a55e4f1c-2885-4990-8a21-514683ec35c1.png)|


## Demo
https://v-photo-maki0322.vercel.app

## Installation/Usage
`$ git clone https://github.com/Maki0322/V-Photo.git`
`$ npm run dev`
### テストアカウント
|  メールアドレス  |  パスワード  |
| ---- | ---- |
|example@example.com　|example　|

## Features
- 認証機能
- フィルタリング/ソートによる検索機能
- お気に入り機能
- プロフィール編集/写真トリミング・アップロード機能/

## 実装予定機能
- 検索結果が0件だった際の表示
- 各大会日程の一覧表とLiquipedia（Wikipediaのe-sport版のようなサイト）の該当ページへのリンク

## Technology
- typescript(v4.9.4)
- next.js(v13.0.7)
- react(v18.2.0)
- material ui(v5.11.0)
- firebase(v9.16.0)(Authentication / Cloud Firestore / Cloud Storage)

## Requirements
- Node.js(v16.17.0)

## Author
Maki0322
