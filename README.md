# Next.js OAuth App Example

書籍[Next.jsの考え方](https://zenn.dev/akfm/books/nextjs-basic-principle)における章の1つ、[_ユーザーの認証とデータアクセスの認可_](https://zenn.dev/akfm/books/nextjs-basic-principle/part_5_authorization_fetch)の参考実装です。

## Design

- 認証
  - GitHub OAuth Apps
- セッション管理
  - Redis
  - Session IDをJWT化してCookieに保存
- 認可
  - middlewareでJWTを検証、URLに対するアクセスの認可を楽観的チェック
  - データアクセス層において、セッションから認証状態をチェック

## Setup

```dotenv
# .env.local
GITHUB_CLIENT_ID={GITHUB_CLIENT_ID}
GITHUB_CLIENT_SECRET={GITHUB_CLIENT_SECRET}
SESSION_SECRET={SESSION_SECRET}
```

## Ref

https://zenn.dev/akfm/books/nextjs-basic-principle

