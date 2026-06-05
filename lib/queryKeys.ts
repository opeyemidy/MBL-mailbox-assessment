export const queryKeys = {
  messages: ["messages"] as const,
  message: (id: number) => ["messages", id] as const,
  summary: ["messages", "summary"] as const,
};
