"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { withBasePath } from "./base-path";

const NAV_LINKS = [
  { href: "#philosophy", label: "Filosofi" },
  { href: "#about", label: "Tentang" },
  { href: "#technology", label: "Fokus Teknologi" },
  { href: "#portfolio", label: "Portofolio" },
  { href: "#vision", label: "Visi" },
  { href: "#contact", label: "Kontak" },
];

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Syncs with the data-theme the bootstrap script in layout.tsx set on
    // <html> before hydration, so the toggle icon matches the real theme.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("n1-theme", next);
    } catch {}
  }

  return (
    <header className="site-header">
      <div className="container">
        <a className="brand" href="#top">
          <Image src={withBasePath("/logo.png")} alt="N-1 Labs" width={34} height={34} priority />
          N-1&nbsp;LABS
        </a>

        <nav>
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn-primary header-cta" href="#portfolio">
          Lihat Portofolio
        </a>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label={theme === "light" ? "Aktifkan tema gelap" : "Aktifkan tema terang"}
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`mobile-nav-wrap${menuOpen ? " open" : ""}`}>
        <nav className="mobile-nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="btn btn-primary mobile-nav-cta" href="#portfolio" onClick={() => setMenuOpen(false)}>
            Lihat Portofolio
          </a>
        </nav>
      </div>
    </header>
  );
}
