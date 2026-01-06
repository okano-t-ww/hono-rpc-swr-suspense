# Hono RPC + SWR Suspense Pattern

Hono RPC と SWR を組み合わせた型安全な API 統合パターンの最小実装。

## パターンの核心

- [fetcher.ts](client/src/lib/api/fetcher.ts) - Hono RPC 専用フェッチャー・型定義
- [use-hc.ts](client/src/lib/api/use-hc.ts) - SWR フック
- [use-hc-suspense.ts](client/src/lib/api/use-hc-suspense.ts) - Suspense 対応 SWR フック

## ディレクトリ構成

```text
├── client/
│   └── src/
│       ├── lib/api/          # fetcher, use-hc-suspense ←ここが核心
│       └── features/users/   # 使用例
└── server/
    └── src/
        ├── routes/           # API エンドポイント
        └── schemas/          # Zod スキーマ
```
