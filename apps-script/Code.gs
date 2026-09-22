const TICKETS_SHEET_NAME = "TICKETS";
const MESSAGES_SHEET_NAME = "MESSAGES";
const RATE_LIMIT_PER_MINUTE = 20;
const MAX_TEXT_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 200;
const MAX_PHONE_LENGTH = 30;
const MAX_REASON_LENGTH = 50;

function doPost(e) {
  const response = handleRequest(e);
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function handleRequest(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return { ok: false, error: "bad_request" };
  }

  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return { ok: false, error: "invalid_json" };
  }

  if (body.honeypot) {
    return { ok: true };
  }

  const ticketId = sanitizeText(body.ticketId, 64);
  if (!ticketId) {
    return { ok: false, error: "missing_ticket_id" };
  }

  if (!checkRateLimit(ticketId)) {
    return { ok: false, error: "rate_limited" };
  }

  switch (body.action) {
    case "create_ticket":
      return createTicket(ticketId, body);
    case "add_message":
      return addMessage(ticketId, body);
    case "heartbeat":
      return heartbeat(ticketId);
    case "close_ticket":
      return closeTicket(ticketId, body);
    default:
      return { ok: false, error: "unknown_action" };
  }
}

function checkRateLimit(ticketId) {
  const cache = CacheService.getScriptCache();
  const key = "rl_" + ticketId;
  const count = Number(cache.get(key) || 0);
  if (count >= RATE_LIMIT_PER_MINUTE) {
    return false;
  }
  cache.put(key, String(count + 1), 60);
  return true;
}

function sanitizeText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getSheet(name, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
    sheet.appendRow(headers);
  }
  return sheet;
}

function ticketsSheet() {
  return getSheet(TICKETS_SHEET_NAME, [
    "ticketId",
    "name",
    "email",
    "phone",
    "status",
    "createdAt",
    "lastActivityAt",
    "closedAt",
  ]);
}

function messagesSheet() {
  return getSheet(MESSAGES_SHEET_NAME, ["ticketId", "sender", "text", "timestamp"]);
}

function findTicketRow(sheet, ticketId) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === ticketId) {
      return i + 1;
    }
  }
  return -1;
}

function createTicket(ticketId, body) {
  const name = sanitizeText(body.name, MAX_NAME_LENGTH);
  const email = sanitizeText(body.email, MAX_EMAIL_LENGTH);
  const phone = sanitizeText(body.phone, MAX_PHONE_LENGTH);

  if (!name || !email || !phone || !isValidEmail(email)) {
    return { ok: false, error: "invalid_payload" };
  }

  const sheet = ticketsSheet();
  if (findTicketRow(sheet, ticketId) !== -1) {
    return { ok: true };
  }

  const now = new Date();
  sheet.appendRow([ticketId, name, email, phone, "open", now, now, ""]);
  return { ok: true };
}

function addMessage(ticketId, body) {
  const sender = sanitizeText(body.sender, 20);
  const text = sanitizeText(body.text, MAX_TEXT_LENGTH);
  if (!text || (sender !== "visitor" && sender !== "bot")) {
    return { ok: false, error: "invalid_payload" };
  }

  messagesSheet().appendRow([ticketId, sender, text, new Date()]);
  touchTicket(ticketId);
  return { ok: true };
}

function heartbeat(ticketId) {
  touchTicket(ticketId);
  return { ok: true };
}

function closeTicket(ticketId, body) {
  const reason = sanitizeText(body.reason, MAX_REASON_LENGTH) || "unspecified";
  const sheet = ticketsSheet();
  const row = findTicketRow(sheet, ticketId);
  if (row === -1) {
    return { ok: false, error: "not_found" };
  }

  const now = new Date();
  sheet.getRange(row, 5).setValue("closed:" + reason);
  sheet.getRange(row, 7).setValue(now);
  sheet.getRange(row, 8).setValue(now);
  return { ok: true };
}

function touchTicket(ticketId) {
  const sheet = ticketsSheet();
  const row = findTicketRow(sheet, ticketId);
  if (row === -1) return;
  sheet.getRange(row, 7).setValue(new Date());
}
