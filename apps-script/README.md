# Support chat backend (Google Apps Script)

Free, credential-free ticket logging backend for the support chat widget.
No paid services, no database — writes to a Google Sheet.

## Setup

1. Create a new Google Sheet (any name). Open **Extensions → Apps Script**.
2. Delete the default `Code.gs` content and paste in this repo's
   `apps-script/Code.gs`.
3. **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the deployment's `/exec` URL.
5. `TICKETS` and `MESSAGES` sheets are created automatically on first
   request — no manual sheet setup needed.

## Wiring it to the site

The frontend never holds a Google credential — it only needs the public
`/exec` URL, set as a build-time env var:

```
NEXT_PUBLIC_SUPPORT_CHAT_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
```

For GitHub Pages, add it as a repository secret named `SUPPORT_CHAT_ENDPOINT`
and reference it in `.github/workflows/deploy.yml`'s build step. If left
unset, the chat widget still works fully (FAQ answers, quick replies) and
simply skips all network calls — nothing breaks.

## Behavior notes

- Requests are sent with `mode: "no-cors"` and `Content-Type:
  text/plain;charset=utf-8`. This sidesteps Apps Script's CORS-preflight and
  cross-origin response-reading limitations entirely. The tradeoff: the
  client never reads the response body. This is safe here because the
  browser already owns the ticket ID and local conversation state — the
  Sheet is a mirror/log for a human agent, not the source of truth for the
  UI. All calls are fire-and-forget and swallow network errors.
- Anti-spam: a hidden honeypot field (`honeypot`) is sent with every
  request; if it's non-empty, the request is silently accepted but
  discarded. A per-`ticketId` rate limit (`CacheService`, 20 requests per
  60s) blocks abusive bursts.
- All payload fields are sanitized server-side (HTML tags stripped, length
  capped, email format validated) before being written to the Sheet.
- Re-deploy (**Deploy → Manage deployments → Edit → New version**) after
  changing `Code.gs`; the `/exec` URL stays the same across versions.
