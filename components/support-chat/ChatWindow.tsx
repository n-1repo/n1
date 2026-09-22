"use client";

import { useEffect, useRef, useState } from "react";
import { faqEntries, FALLBACK_MESSAGE, WELCOME_ENTRY_ID } from "@/data/faq";
import { matchFaq, findFaqById } from "@/lib/support-chat/matcher";
import {
  generateTicketId,
  loadSession,
  saveSession,
  clearSession,
  touchSession,
} from "@/lib/support-chat/session";
import { createTicket, addMessage, sendHeartbeat, closeTicket } from "@/lib/support-chat/api";
import type { ChatMessage, ChatSession, FaqQuickReply, Visitor } from "@/lib/support-chat/types";
import PreChatForm from "./PreChatForm";
import ChatPanel from "./ChatPanel";

const HEARTBEAT_INTERVAL_MS = 2 * 60 * 1000;
const EXPIRY_CHECK_INTERVAL_MS = 60 * 1000;
const EXPIRY_MS = 60 * 60 * 1000;
const BOT_REPLY_DELAY_MS = 5000;

function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createMessage(
  sender: ChatMessage["sender"],
  text: string,
  quickReplies?: FaqQuickReply[],
): ChatMessage {
  return { id: newId(), sender, text, timestamp: Date.now(), quickReplies };
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function EndIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 12h16M4 12l5-5M4 12l5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ChatWindowProps = {
  onClose: () => void;
};

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [session, setSession] = useState<ChatSession | null>(() =>
    typeof window === "undefined" ? null : loadSession(),
  );
  const [isTyping, setIsTyping] = useState(false);
  const sessionRef = useRef<ChatSession | null>(null);
  const replyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) window.clearTimeout(replyTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const current = sessionRef.current;
      if (!current) return;
      if (Date.now() - current.lastActivityAt > EXPIRY_MS) {
        clearPendingReply();
        closeTicket(current.ticketId, "expired");
        clearSession();
        setSession(null);
      }
    }, EXPIRY_CHECK_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, []);

  const ticketId = session?.ticketId;
  useEffect(() => {
    if (!ticketId) return;
    const interval = window.setInterval(() => sendHeartbeat(ticketId), HEARTBEAT_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [ticketId]);

  function appendMessages(...newMessages: ChatMessage[]) {
    setSession((prev) => {
      if (!prev) return prev;
      const updated = touchSession({ ...prev, messages: [...prev.messages, ...newMessages] });
      saveSession(updated);
      return updated;
    });
  }

  function clearPendingReply() {
    if (replyTimeoutRef.current) {
      window.clearTimeout(replyTimeoutRef.current);
      replyTimeoutRef.current = null;
    }
    setIsTyping(false);
  }

  function scheduleBotReply(ticketId: string, botMessage: ChatMessage) {
    clearPendingReply();
    setIsTyping(true);
    replyTimeoutRef.current = window.setTimeout(() => {
      replyTimeoutRef.current = null;
      setIsTyping(false);
      addMessage(ticketId, "bot", botMessage.text);
      appendMessages(botMessage);
    }, BOT_REPLY_DELAY_MS);
  }

  function handleStart(visitor: Visitor, honeypot: string) {
    const newTicketId = generateTicketId();
    const newSession = touchSession({
      ticketId: newTicketId,
      visitor,
      messages: [],
      lastActivityAt: Date.now(),
    });
    saveSession(newSession);
    setSession(newSession);
    createTicket(newTicketId, visitor.name, visitor.email, visitor.phone, honeypot);

    const welcomeEntry = findFaqById(faqEntries, WELCOME_ENTRY_ID);
    const welcomeMessage = createMessage(
      "bot",
      welcomeEntry?.answer ?? "Halo! Ada yang bisa kami bantu?",
      welcomeEntry?.quickReplies,
    );
    scheduleBotReply(newTicketId, welcomeMessage);
  }

  function handleSend(text: string) {
    const current = sessionRef.current;
    if (!current) return;
    const visitorMessage = createMessage("visitor", text);
    addMessage(current.ticketId, "visitor", text);
    appendMessages(visitorMessage);

    const match = matchFaq(text, faqEntries);
    const botMessage = match
      ? createMessage("bot", match.entry.answer, match.entry.quickReplies)
      : createMessage("bot", FALLBACK_MESSAGE, findFaqById(faqEntries, WELCOME_ENTRY_ID)?.quickReplies);
    scheduleBotReply(current.ticketId, botMessage);
  }

  function handleQuickReply(reply: FaqQuickReply) {
    const current = sessionRef.current;
    if (!current) return;
    const visitorMessage = createMessage("visitor", reply.label);
    addMessage(current.ticketId, "visitor", reply.label);
    appendMessages(visitorMessage);

    const entry = findFaqById(faqEntries, reply.targetId);
    const botMessage = entry
      ? createMessage("bot", entry.answer, entry.quickReplies)
      : createMessage("bot", FALLBACK_MESSAGE);
    scheduleBotReply(current.ticketId, botMessage);
  }

  function handleEndConversation() {
    const current = sessionRef.current;
    if (!current) return;
    clearPendingReply();
    closeTicket(current.ticketId, "visitor_closed");
    clearSession();
    setSession(null);
  }

  return (
    <div className="support-chat-window panel" id="support-chat-window" role="dialog" aria-label="Chat bantuan">
      <div className="support-chat-header">
        <span>Bantuan N⁻¹ Labs</span>
        <div className="support-chat-header-actions">
          {session && (
            <button
              type="button"
              className="icon-btn support-chat-icon-btn"
              onClick={handleEndConversation}
              aria-label="Akhiri percakapan"
            >
              <EndIcon />
            </button>
          )}
          <button
            type="button"
            className="icon-btn support-chat-icon-btn"
            onClick={onClose}
            aria-label="Tutup chat"
          >
            <CloseIcon />
          </button>
        </div>
      </div>
      {session ? (
        <ChatPanel
          ticketId={session.ticketId}
          messages={session.messages}
          isTyping={isTyping}
          onSend={handleSend}
          onQuickReply={handleQuickReply}
        />
      ) : (
        <PreChatForm onSubmit={handleStart} />
      )}
    </div>
  );
}
