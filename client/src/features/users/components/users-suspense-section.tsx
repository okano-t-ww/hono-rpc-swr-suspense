import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components/error-fallback";
import { LoadingSkeleton } from "@/shared/components/loading-skeleton";
import { UsersContent } from "./users-content";

interface Props {
	page: number;
	limit: number;
}

export function UsersSuspenseSection({ page, limit }: Props) {
	return (
		<section>
			<h2>ユーザー一覧</h2>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<Suspense key={`users-${page}-${limit}`} fallback={<LoadingSkeleton />}>
					<UsersContent page={page} limit={limit} />
				</Suspense>
			</ErrorBoundary>
		</section>
	);
}
