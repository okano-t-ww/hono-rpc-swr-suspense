# useHcMutation 設計メモ

## 概要

`useSWRMutation` を Hono RPC client と統合する hook の設計・実装に関するメモ。

## 疑問点・懸念点

### 1. 引数の型推論

**問題**: Hono client の mutation メソッドは複数の引数パターンを持つ

```typescript
// パターン1: json のみ
client.users.$post({ json: { name: "Alice" } })

// パターン2: json + param
client.users[":id"].$put({ param: { id: "123" }, json: { name: "Bob" } })

// パターン3: json + query
client.users.$post({ json: {...}, query: { notify: true } })
```

**現状の方針**: 型推論は利用側に委ねる（シンプルに始める）

```typescript
// 利用側で引数型を明示
const { trigger } = useHcMutation(
  "createUser",
  (arg: { json: CreateUserInput }) => client.users.$post(arg),
);
```

**将来の改善案**:
- Hono client の型から引数型を推論するユーティリティ型を作成
- `InferRequestType` のような型ヘルパー

---

### 2. SWRMutation の fetcher シグネチャ

**問題**: SWRMutation の fetcher は `(key, { arg })` の形式

```typescript
useSWRMutation(key, (key, { arg }) => fetch(...))
```

**対応**: wrapper で吸収

```typescript
useSWRMutation(key, (_, { arg }) => honoFetcher(() => fetcher(arg)))
```

---

### 3. キャッシュキーの設計

**問題**: mutation 成功後、どのキャッシュを更新するか

```typescript
// GET のキャッシュキー
["users", page, limit]

// Mutation のキー
"createUser" // 別のキー？
["users"]    // 同じプレフィックス？
```

**現状の方針**: 利用側で `onSuccess` で明示的に `mutate()` を呼ぶ

```typescript
const { trigger } = useHcMutation("createUser", fetcher, {
  onSuccess: () => {
    mutate((key) => Array.isArray(key) && key[0] === "users");
  },
});
```

**将来の改善案**:
- `revalidateKeys` オプションを追加
- キャッシュキーの命名規則を策定

---

### 4. 既存の型定義との整合性

**問題**: `HonoClientFnGeneric` は引数なし前提

```typescript
// 現状
export type HonoClientFnGeneric = () => Promise<ClientResponse<...>>;
```

**対応**: Mutation 用の新しい型を追加

```typescript
// 追加
export type HonoMutationFn<TArg> = (arg: TArg) => Promise<ClientResponse<...>>;
```

---

### 5. Optimistic Update

**問題**: SWRMutation の `optimisticData` をどう扱うか

```typescript
useSWRMutation(key, fetcher, {
  optimisticData: (currentData) => ({ ...currentData, newItem }),
  rollbackOnError: true,
});
```

**現状の方針**: v1 では対応しない、config で渡せるようにしておく

---

### 6. エラーハンドリング

**問題**: `TypedDetailedError` で型付きエラーを返せるか

**対応**: 既存の `honoFetcher` をそのまま使えば OK

```typescript
const { error } = useHcMutation(...);
// error: TypedDetailedError<InferErrorResponse<T>> | undefined
```

---

## 実装ステータス

- [x] 基本実装
- [ ] 型推論の改善
- [ ] キャッシュ invalidation ヘルパー
- [ ] Optimistic update サポート
- [ ] テスト

## 参考リンク

- [SWR Mutation](https://swr.vercel.app/docs/mutation)
- [Hono RPC Client](https://hono.dev/docs/guides/rpc)
