"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { MessageSummary } from "@/types";
import Link from "next/link";

export default function HomePage() {
  const { data, isLoading, isError } = useQuery<MessageSummary>({
    queryKey: queryKeys.summary,
    queryFn: () => fetch("/api/messages/summary").then((r) => r.json()),
  });

  if (isLoading) return <p className="state-message">Loading...</p>;
  if (isError || !data)
    return <p className="state-message">Something went wrong.</p>;

  return (
    <div className="home-wrapper">
      <h1 className="home-greeting">Hello, {data.userName}</h1>
      <div className="home-divider" />
      <p className="home-stat">
        You have{" "}
        <strong>
          {data.unread} unread message{data.unread !== 1 ? "s" : ""}
        </strong>{" "}
        out of <strong>{data.total} total</strong>
      </p>
      <div className="home-divider" />
      <Link href="/inbox" className="btn-primary">
        View Messages
      </Link>
    </div>
  );
}
