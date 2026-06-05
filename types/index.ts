export interface Message {
  id: number;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface MessageSummary {
  userName: string;
  total: number;
  unread: number;
}
