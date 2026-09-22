const ENDPOINT = process.env.NEXT_PUBLIC_SUPPORT_CHAT_ENDPOINT ?? "";

type SupportChatAction = "create_ticket" | "add_message" | "heartbeat" | "close_ticket";

type SupportChatPayload = Record<string, string>;

function post(action: SupportChatAction, payload: SupportChatPayload): void {
  if (!ENDPOINT) return;
  try {
    fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, honeypot: "", ...payload }),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

export function createTicket(
  ticketId: string,
  name: string,
  email: string,
  phone: string,
  honeypot: string,
): void {
  post("create_ticket", { ticketId, name, email, phone, honeypot });
}

export function addMessage(ticketId: string, sender: string, text: string): void {
  post("add_message", { ticketId, sender, text });
}

export function sendHeartbeat(ticketId: string): void {
  post("heartbeat", { ticketId });
}

export function closeTicket(ticketId: string, reason: string): void {
  post("close_ticket", { ticketId, reason });
}
