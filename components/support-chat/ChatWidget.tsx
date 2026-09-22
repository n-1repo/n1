"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ChatWindow = dynamic(() => import("./ChatWindow"), {
  ssr: false,
  loading: () => (
    <div className="support-chat-window panel support-chat-loading" role="status">
      Memuat chat...
    </div>
  ),
});

function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-4.4 3.3A.6.6 0 0 1 3.6 20V6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
}
