"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { MessageSummary } from "@/types";
import Link from "next/link";

export function TopBar() {
  const { data } = useQuery<MessageSummary>({
    queryKey: queryKeys.summary,
    queryFn: () => fetch("/api/messages/summary").then((r) => r.json()),
  });

  return (
    <header className="topbar">
      <Link href="/" className="topbar-brand">
        MailBox
      </Link>
      <div className="topbar-right">
        {data && (
          <>
            <span className="topbar-user">{data.userName}</span>
            {data.unread > 0 && (
              <span className="topbar-badge">{data.unread}</span>
            )}
          </>
        )}
      </div>
    </header>
  );
}
