export type FaqQuickReply = {
  label: string;
  targetId: string;
};

export type FaqEntry = {
  id: string;
  intent: string;
  keywords: string[];
  question: string;
  answer: string;
  quickReplies?: FaqQuickReply[];
};

export type Visitor = {
  name: string;
  email: string;
  phone: string;
};

export type ChatMessageSender = "visitor" | "bot" | "system";

export type ChatMessage = {
  id: string;
  sender: ChatMessageSender;
  text: string;
  timestamp: number;
  quickReplies?: FaqQuickReply[];
};

export type ChatSession = {
  ticketId: string;
  visitor: Visitor;
  messages: ChatMessage[];
  lastActivityAt: number;
};
