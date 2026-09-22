import type { ChatSession } from "./types";

const STORAGE_KEY = "n1-support-chat";
const EXPIRY_MS = 60 * 60 * 1000;

export function generateTicketId(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `TCK-${datePart}-${randomPart}`.toUpperCase();
}

export function loadSession(): ChatSession | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as ChatSession;
    if (!session || typeof session.lastActivityAt !== "number") return null;
    if (Date.now() - session.lastActivityAt > EXPIRY_MS) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function saveSession(session: ChatSession): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {}
}

export function clearSession(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function touchSession(session: ChatSession): ChatSession {
  return { ...session, lastActivityAt: Date.now() };
}
