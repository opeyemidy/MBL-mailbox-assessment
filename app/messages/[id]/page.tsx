"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { Message } from "@/types";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// A typed error so you can inspect the status code downstream
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

function formatDate(iso: string) {
  const date = new Date(iso);
  const datePart = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart} at ${timePart}`;
}

export default function MessagePage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const queryClient = useQueryClient();

  const { data: message, isLoading, isError, error } = useQuery<Message, ApiError>({
    queryKey: queryKeys.message(id),
    queryFn: async () => {
      const res = await fetch(`/api/messages/${id}`);
      if (!res.ok) {
        // Throw a typed error — React Query will catch it and set isError = true
        throw new ApiError(res.status, `Failed to fetch message: ${res.status}`);
      }
      return res.json();
    },
    enabled: !isNaN(id),
    retry: (failureCount, err) => {
      // Don't retry on 404 — it won't fix itself
      if (err.status === 404) return false;
      return failureCount < 2;
    },
  });

  const { mutate: markAsRead } = useMutation({
    mutationFn: () =>
      fetch(`/api/messages/${id}/read`, { method: "PATCH" }).then((r) => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.messages });
      queryClient.invalidateQueries({ queryKey: queryKeys.summary });
      queryClient.setQueryData<Message>(queryKeys.message(id), (old) =>
        old ? { ...old, isRead: true } : old
      );
    },
  });

  useEffect(() => {
    if (message && !message.isRead) {
      markAsRead();
    }
  }, [message, markAsRead]);

  if (isLoading) return <p className="state-message">Loading message...</p>;

  // Differentiate 404 from other errors
  if (isError) {
    if (error.status === 404) {
      return (
        <div className="message-page">
          <Link href="/inbox" className="back-link">← Back to Inbox</Link>
          <div className="message-card">
            <h1 className="message-card-subject">Message not found</h1>
            <p className="message-card-meta">
              This message doesn't exist or may have been deleted.
            </p>
          </div>
        </div>
      );
    }
    return <p className="state-message">Something went wrong. Please try again.</p>;
  }

  if (!message) return null;

  return (
    <div className="message-page">
      <Link href="/inbox" className="back-link">← Back to Inbox</Link>
      <div className="message-card">
        <h1 className="message-card-subject">{message.subject}</h1>
        <p className="message-card-meta">{formatDate(message.createdAt)}</p>
        <p className="message-card-body">{message.content}</p>
      </div>
    </div>
  );
}