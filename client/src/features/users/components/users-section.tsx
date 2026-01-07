import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components/error-fallback";
import { LoadingSkeleton } from "@/shared/components/loading-skeleton";
import { UsersContent } from "./users-content";

export function UsersSection() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);

	return (
		<div>
			<div style={{ marginBottom: "1rem" }}>
				<p
					style={{ color: "#666", fontSize: "0.9rem", marginBottom: "0.5rem" }}
				>
					Suspense + ErrorBoundary でユーザー一覧を取得します。
					<br />
					<strong>エラーテスト:</strong> page を 0 以下や limit を 101
					以上にするとバリデーションエラー (422) が発生します。
				</p>
				<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
					<label
						style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
					>
						page:
						<input
							type="number"
							value={page}
							onChange={(e) => setPage(Number(e.target.value))}
							style={{ width: "60px", padding: "0.25rem" }}
						/>
					</label>
					<label
						style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
					>
						limit:
						<input
							type="number"
							value={limit}
							onChange={(e) => setLimit(Number(e.target.value))}
							style={{ width: "60px", padding: "0.25rem" }}
						/>
					</label>
				</div>
			</div>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				resetKeys={[page, limit]}
			>
				<Suspense key={`users-${page}-${limit}`} fallback={<LoadingSkeleton />}>
					<UsersContent page={page} limit={limit} />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}
