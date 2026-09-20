import type { Metadata } from "next";
import "./globals.css";
import { withBasePath } from "./base-path";

const TITLE = "N-1 Labs — Building Indonesia's Own AI Technology Capability";
const DESCRIPTION =
  "N-1 Labs adalah perusahaan teknologi AI asal Semarang, Indonesia yang membangun AI Agent, software systems, automation, dan digital products — dengan filosofi N-1: selalu satu langkah sebelum selesai.";

export const metadata: Metadata = {
  metadataBase: new URL("https://irwanasas.github.io/n1/"),
  title: TITLE,
  description: DESCRIPTION,
  icons: { icon: withBasePath("/logo.png") },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "N-1 Labs",
    images: [{ url: withBasePath("/logo.png"), width: 985, height: 985, alt: "N-1 Labs" }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: [withBasePath("/logo.png")],
  },
};

const THEME_INIT = `
(function () {
  try {
    var stored = localStorage.getItem("n1-theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
  // iOS Safari only triggers :active on elements if a touch listener
  // exists somewhere on the page - this unlocks tap/press feedback site-wide.
  document.addEventListener("touchstart", function () {}, { passive: true });
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
