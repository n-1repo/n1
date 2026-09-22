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

function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-4.4 3.3A.6.6 0 0 1 3.6 20V6a2 2 0 0 1 2-2z" />
    </svg>
  );
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

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(() =>
    typeof window === "undefined" ? null : loadSession(),
  );
  const sessionRef = useRef<ChatSession | null>(null);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const current = sessionRef.current;
      if (!current) return;
      if (Date.now() - current.lastActivityAt > EXPIRY_MS) {
        closeTicket(current.ticketId, "expired");
        clearSession();
        setSession(null);
      }
    }, EXPIRY_CHECK_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, []);

  const ticketId = session?.ticketId;
  useEffect(() => {
    if (!isOpen || !ticketId) return;
    const interval = window.setInterval(() => sendHeartbeat(ticketId), HEARTBEAT_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [isOpen, ticketId]);

  function appendMessages(...newMessages: ChatMessage[]) {
    setSession((prev) => {
      if (!prev) return prev;
      const updated = touchSession({ ...prev, messages: [...prev.messages, ...newMessages] });
      saveSession(updated);
      return updated;
    });
  }

  function handleStart(visitor: Visitor, honeypot: string) {
    const newTicketId = generateTicketId();
    const welcomeEntry = findFaqById(faqEntries, WELCOME_ENTRY_ID);
    const welcomeMessage = createMessage(
      "bot",
      welcomeEntry?.answer ?? "Halo! Ada yang bisa kami bantu?",
      welcomeEntry?.quickReplies,
    );
    const newSession = touchSession({
      ticketId: newTicketId,
      visitor,
      messages: [welcomeMessage],
      lastActivityAt: Date.now(),
    });
    saveSession(newSession);
    setSession(newSession);
    createTicket(newTicketId, visitor.name, visitor.email, visitor.phone, honeypot);
  }

  function handleSend(text: string) {
    const current = sessionRef.current;
    if (!current) return;
    const visitorMessage = createMessage("visitor", text);
    addMessage(current.ticketId, "visitor", text);

    const match = matchFaq(text, faqEntries);
    const botMessage = match
      ? createMessage("bot", match.entry.answer, match.entry.quickReplies)
      : createMessage("bot", FALLBACK_MESSAGE, findFaqById(faqEntries, WELCOME_ENTRY_ID)?.quickReplies);
    addMessage(current.ticketId, "bot", botMessage.text);

    appendMessages(visitorMessage, botMessage);
  }

  function handleQuickReply(reply: FaqQuickReply) {
    const current = sessionRef.current;
    if (!current) return;
    const visitorMessage = createMessage("visitor", reply.label);
    addMessage(current.ticketId, "visitor", reply.label);

    const entry = findFaqById(faqEntries, reply.targetId);
    const botMessage = entry
      ? createMessage("bot", entry.answer, entry.quickReplies)
      : createMessage("bot", FALLBACK_MESSAGE);
    addMessage(current.ticketId, "bot", botMessage.text);

    appendMessages(visitorMessage, botMessage);
  }

  function handleEndConversation() {
    const current = sessionRef.current;
    if (!current) return;
    closeTicket(current.ticketId, "visitor_closed");
    clearSession();
    setSession(null);
  }

  return (
    <>
      <button
        type="button"
        className="support-chat-float"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="support-chat-window"
        aria-label={isOpen ? "Tutup chat bantuan" : "Buka chat bantuan"}
      >
        <ChatIcon />
      </button>
      {isOpen && (
        <div
          className="support-chat-window panel"
          id="support-chat-window"
          role="dialog"
          aria-label="Chat bantuan"
        >
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
                onClick={() => setIsOpen(false)}
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
              onSend={handleSend}
              onQuickReply={handleQuickReply}
            />
          ) : (
            <PreChatForm onSubmit={handleStart} />
          )}
        </div>
      )}
    </>
  );
}
