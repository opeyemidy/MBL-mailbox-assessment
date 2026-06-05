"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { Message } from "@/types";
import Link from "next/link";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function InboxPage() {
  const { data: messages, isLoading, isError } = useQuery<Message[]>({
    queryKey: queryKeys.messages,
    queryFn: () => fetch("/api/messages").then((r) => r.json()),
  });

  if (isLoading) return <p className="state-message">Loading messages...</p>;
  if (isError || !messages)
    return <p className="state-message">Failed to load messages.</p>;

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <div className="inbox-header">
        <h1 className="inbox-title">Inbox</h1>
        {unreadCount > 0 && (
          <span className="inbox-count">{unreadCount} unread</span>
        )}
      </div>

      {messages.length === 0 ? (
        <p className="state-message">Your inbox is empty.</p>
      ) : (
        <div className="message-list">
          {messages.map((message) => (
            <Link
              key={message.id}
              href={`/messages/${message.id}`}
              className={`message-row ${!message.isRead ? "unread" : ""}`}
            >
              <div className="message-row-top">
                <span className="message-subject">
                  {!message.isRead && <span className="unread-dot" />}
                  {message.subject}
                </span>
                <span className="message-date">
                  {formatDate(message.createdAt)}
                </span>
              </div>
              <p className="message-preview">
                {message.content.slice(0, 80)}
                {message.content.length > 80 ? "..." : ""}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
