# Web Push Sample

## 環境構築

### backend

```
> cd backend
> docker-compose build
> docker-compose run web rails db:create
> docker-compose up
```

多分 ↑ で起動

FCM の秘密鍵をガンプからもらってください
`hogehoge.json` というファイルを受け取ったら `/app`配下に配置してください

### front

**先にバックエンド起動しておいたほうがよいかも**

```
> cd front
> yarn
> yarn start
```

http://localhost:8080 にアクセス
