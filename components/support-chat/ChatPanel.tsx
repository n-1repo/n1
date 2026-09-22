"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { ChatMessage, FaqQuickReply } from "@/lib/support-chat/types";

type ChatPanelProps = {
  ticketId: string;
  messages: ChatMessage[];
  isTyping: boolean;
  onSend: (text: string) => void;
  onQuickReply: (reply: FaqQuickReply) => void;
};

export default function ChatPanel({ ticketId, messages, isTyping, onSend, onQuickReply }: ChatPanelProps) {
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = listRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, isTyping]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || isTyping) return;
    onSend(trimmed);
    setDraft("");
  }

  const lastQuickReplies = isTyping
    ? undefined
    : [...messages].reverse().find((message) => message.quickReplies?.length)?.quickReplies;

  return (
    <div className="support-chat-panel-body">
      <p className="support-chat-ticket">Tiket: {ticketId}</p>
      <div className="support-chat-messages" ref={listRef} aria-live="polite">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`support-chat-bubble support-chat-bubble-${message.sender}`}
          >
            {message.text}
          </div>
        ))}
        {isTyping && (
          <div className="support-chat-bubble support-chat-bubble-bot support-chat-typing-bubble">
            <span className="support-chat-typing">
              <span />
              <span />
              <span />
            </span>
          </div>
        )}
      </div>
      {lastQuickReplies && lastQuickReplies.length > 0 && (
        <div className="support-chat-quick-replies">
          {lastQuickReplies.map((reply) => (
            <button
              key={reply.targetId}
              type="button"
              className="support-chat-chip"
              onClick={() => onQuickReply(reply)}
            >
              {reply.label}
            </button>
          ))}
        </div>
      )}
      <form className="support-chat-input-row" onSubmit={handleSubmit}>
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ketik pesan..."
          aria-label="Ketik pesan"
          maxLength={500}
          disabled={isTyping}
        />
        <button
          type="submit"
          className="btn btn-primary support-chat-send"
          disabled={!draft.trim() || isTyping}
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
