import Image from "next/image";
import Header from "./Header";
import Portfolio from "./Portfolio";
import { withBasePath } from "./base-path";
import {
  contact,
  identity,
  stats,
  missionPillars,
  techDomains,
  buildAreas,
  projects,
  journey,
  visionPoints,
  positioningFlow,
  llmStages,
  llmReasons,
  securityAreas,
  values,
  roadmapPhases,
  positioningCards,
} from "./content";

const WHATSAPP_URL = `https://wa.me/${contact.whatsapp}`;
const MAILTO_URL = `mailto:${contact.email}`;

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.174-1.1-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.246c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.336-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
  );
}

function BrandIcon({ path, viewBox = "0 0 24 24" }: { path: string; viewBox?: string }) {
  return (
    <svg width={18} height={18} viewBox={viewBox} fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const ICON_PATHS = {
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  instagram:
    "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  tiktok:
    "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  youtube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
} as const;

function EmailIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/n-1repo", icon: <BrandIcon path={ICON_PATHS.github} />, external: true },
  { label: "Instagram", href: "https://instagram.com/", icon: <BrandIcon path={ICON_PATHS.instagram} />, external: true },
  { label: "TikTok", href: "https://tiktok.com/", icon: <BrandIcon path={ICON_PATHS.tiktok} />, external: true },
  { label: "YouTube", href: "https://youtube.com/", icon: <BrandIcon path={ICON_PATHS.youtube} />, external: true },
  { label: "WhatsApp", href: WHATSAPP_URL, icon: <BrandIcon path={ICON_PATHS.whatsapp} />, external: true },
  { label: "Email", href: MAILTO_URL, icon: <EmailIcon />, external: false },
];

export default function Home() {
  return (
    <>
      <div id="top" />
      <Header />

      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow">Company Profile · 2026</div>
          <div className="progress-badge" aria-hidden="true">
            <span className="progress-track">
              <span className="progress-fill" />
            </span>
            <span className="progress-label">N-1 · Always One Short</span>
          </div>
          <h1>
            Building Indonesia&apos;s Own <span>AI Technology</span> Capability
          </h1>
          <p>
            N-1 Labs adalah perusahaan teknologi AI asal Indonesia yang membangun AI Agent, software
            systems, automation, dan digital products — dengan arah jangka panjang menjadi AI technology
            company yang membangun teknologinya sendiri.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#portfolio">
              Lihat Portofolio
            </a>
            <a className="btn btn-ghost" href="#vision">
              Pelajari Visi Kami
            </a>
          </div>
          <div className="hero-stats">
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="hero-socials">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                className="hero-social-link"
                href={social.href}
                aria-label={social.label}
                {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="philosophy">
        <div className="container">
          <div className="kicker">00 · Filosofi</div>
          <h2 className="section-title">N-1: Selalu Satu Langkah Sebelum Selesai</h2>
          <div className="divider" />

          <p className="section-lead" style={{ maxWidth: 720 }}>
            Nama kami bukan kebetulan. Dalam matematika, N melambangkan bilangan penuh — hasil akhir,
            versi sempurna, titik selesai. Kami menamai diri <b>N-1</b> karena percaya titik itu tidak
            pernah benar-benar sampai: selalu ada satu hal yang kurang, satu hal yang bisa dibangun,
            diperbaiki, atau dikembangkan lagi.
          </p>

          <div className="manifesto">
            <p className="eq">
              <span className="no">N-1 = Selesai.</span>
              <br />
              <span className="yes">N-1 = Terus Bergerak.</span>
            </p>
          </div>

          <p>
            Perhatikan dua penanda yang muncul berulang di sepanjang halaman ini:
          </p>
          <div className="legend-pair">
            <span className="tag existing">Existing Capability</span>
            <span className="arrow">— apa yang sudah kami bangun dan pakai secara nyata</span>
          </div>
          <div className="legend-pair">
            <span className="tag vision">Future Vision</span>
            <span className="arrow">— satu langkah yang selalu menunggu di depan</span>
          </div>
          <p>
            Bagi kami, kedua penanda itu bukan sekadar label kategori — itu adalah N dan N-1: apa yang
            telah tercapai, dan satu hal yang sengaja kami biarkan belum selesai, karena di situlah kerja
            berikutnya dimulai.
          </p>

          <div className="subhead">Bukti, Bukan Sekadar Klaim</div>
          <div className="evidence-grid">
            <div className="evidence-card">
              <h4>Journey yang Berhenti di &ldquo;Vision&rdquo;</h4>
              <p>
                Technology Journey kami sengaja berakhir di tahap yang masih berlabel Vision — bukan
                karena belum selesai ditulis, tapi karena memang belum tercapai.
              </p>
              <a href="#journey">Lihat Technology Journey →</a>
            </div>
            <div className="evidence-card">
              <h4>Roadmap Menuju Horizon, Bukan Garis Akhir</h4>
              <p>
                Development Roadmap kami berakhir di &ldquo;2030+&rdquo; — sebuah horizon terbuka, bukan
                tenggat yang bisa dicoret selesai.
              </p>
              <a href="#roadmap">Lihat Roadmap →</a>
            </div>
            <div className="evidence-card">
              <h4>Enam Proyek, Enam Fondasi</h4>
              <p>
                Setiap proyek yang telah kami bangun bukan tujuan akhir, melainkan satu lapisan fondasi
                menuju kapabilitas berikutnya.
              </p>
              <a href="#portfolio">Lihat Project Portfolio →</a>
            </div>
          </div>

          <p className="philosophy-closing">
            Begitulah cara kami bekerja: N-1 hari ini, mendekati N esok — tanpa pernah benar-benar
            sampai.
          </p>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="kicker">01 · Tentang Kami</div>
          <h2 className="section-title">About N-1 Labs</h2>
          <div className="divider" />

          <p className="section-lead" style={{ maxWidth: 720 }}>
            N-1 Labs adalah perusahaan teknologi asal Semarang, Jawa Tengah, yang berfokus pada
            pengembangan Artificial Intelligence, AI Agent, software systems, automation, digital
            products, dan teknologi komputasi.
          </p>
          <p style={{ maxWidth: 720 }}>
            Didirikan pada 2 September 2026, N-1 Labs hadir bukan sebagai software house biasa,
            melainkan sebagai perusahaan yang membangun kapabilitasnya secara bertahap — dimulai dari
            software engineering, menuju sistem bisnis dan automation, hingga akhirnya pada pengembangan
            AI Agent dan AI Infrastructure. Setiap proyek yang dikerjakan N-1 Labs dirancang untuk
            memperkuat fondasi teknis menuju arah tersebut.
          </p>
          <p style={{ maxWidth: 720 }}>
            Dalam jangka panjang, N-1 Labs memiliki tujuan untuk berkembang menjadi{" "}
            <b>AI technology company</b> yang mampu membangun teknologi AI-nya sendiri — termasuk
            kontribusi terhadap kemampuan Indonesia dalam mengembangkan Large Language Model (LLM)
            secara mandiri.
          </p>

          <div className="subhead" style={{ marginTop: 32 }}>
            Ringkasan Identitas
          </div>
          <div className="panel">
            <table className="identity-table">
              <tbody>
                {identity.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="mission">
        <div className="container">
          <div className="kicker">02 · Cara Kami Mewujudkannya</div>
          <h2 className="section-title">Mission</h2>
          <div className="divider" />
          <p className="section-lead">
            Misi N-1 Labs disusun berdasarkan tujuh prinsip kerja: Develop, Integrate, Automate,
            Research, Build, Scale, dan Protect.
          </p>

          <div className="grid grid-2" style={{ marginTop: 16 }}>
            {missionPillars.map((pillar) => (
              <div
                className="panel"
                key={pillar.title}
                style={pillar.wide ? { gridColumn: "1 / -1" } : undefined}
              >
                <h4 style={{ margin: "0 0 8px 0", fontSize: 14.5 }}>{pillar.title}</h4>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--muted)" }}>{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="technology">
        <div className="container">
          <div className="kicker">03 · Kapabilitas Teknologi</div>
          <h2 className="section-title">Technology Focus</h2>
          <div className="divider" />
          <p className="section-lead">
            Kapabilitas N-1 Labs dikelompokkan ke dalam enam domain teknologi, dari sistem yang telah
            dibangun hingga arah riset masa depan.
          </p>

          <div className="grid grid-2" style={{ marginTop: 16 }}>
            {techDomains.map((domain) => (
              <div className={`panel domain-card${domain.vision ? " vision" : ""}`} key={domain.name}>
                <h3>
                  <span className="dot" />
                  {domain.name}
                  {domain.vision && <span className="tag vision" style={{ marginLeft: 6 }}>Vision</span>}
                </h3>
                <ul>
                  {domain.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="what-we-build">
        <div className="container">
          <div className="kicker">04 · Output Nyata</div>
          <h2 className="section-title">What We Build</h2>
          <div className="divider" />
          <p className="section-lead">
            N-1 Labs membangun sistem yang digunakan secara nyata — bukan sekadar prototipe atau konsep.
            Setiap produk dirancang untuk menjadi bagian dari infrastruktur bisnis penggunanya.
          </p>

          <div className="grid grid-2" style={{ marginTop: 16 }}>
            {buildAreas.map((area) => (
              <div className="panel" key={area.title}>
                <h4 style={{ margin: "0 0 8px 0", fontSize: 14.5 }}>{area.title}</h4>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--muted)" }}>{area.body}</p>
              </div>
            ))}
          </div>

          <div className="subhead" style={{ marginTop: 28 }}>
            Enam Proyek yang Telah Dibangun
          </div>
          <div className="panel">
            <ul className="clean project-list">
              {projects.map((project) => (
                <li key={project.num}>{project.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="portfolio">
        <div className="container">
          <div className="kicker">05 · Rekam Jejak</div>
          <h2 className="section-title">Project Portfolio</h2>
          <div className="divider" />
          <p className="section-lead">
            Enam proyek berikut menggambarkan perjalanan N-1 Labs dalam membangun kapabilitas — dari
            software engineering, sistem bisnis, automation, hingga AI Agent. Setiap proyek dijelaskan
            berdasarkan permasalahan, solusi, fungsi, dampak, dan hal yang dipelajari N-1 Labs.
          </p>
          <span className="tag existing">Existing Capability</span>

          <Portfolio projects={projects} />
        </div>
      </section>

      <section id="journey">
        <div className="container">
          <div className="kicker">06 · Perjalanan Kapabilitas</div>
          <h2 className="section-title">Technology Journey</h2>
          <div className="divider" />
          <p className="section-lead">
            Proyek-proyek yang telah dikerjakan N-1 Labs bukan kumpulan proyek yang berdiri sendiri,
            melainkan tahapan yang membangun kapabilitas perusahaan secara bertahap menuju teknologi AI
            berskala nasional.
          </p>

          <div className="timeline">
            {journey.map((step, i) => (
              <div className="tstep" key={step.title}>
                <div className="tline">
                  <div className={`tdot${step.vision ? " vision" : ""}`} />
                  {i < journey.length - 1 && <div className="tbar" />}
                </div>
                <div className="tbody">
                  <h4>
                    {step.title}
                    {step.vision && <span className="tag vision">Vision</span>}
                  </h4>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="philosophy-closing">
            Delapan tahap ini sengaja berhenti di sebuah Vision, bukan garis akhir — karena bagi N-1,
            tidak ada garis akhir.
          </p>
        </div>
      </section>

      <section id="vision">
        <div className="container">
          <div className="kicker">07 · Arah Perusahaan</div>
          <h2 className="section-title">Vision</h2>
          <div className="divider" />

          <div className="quote-block">
            <p>
              &ldquo;Membangun teknologi Artificial Intelligence Indonesia yang mandiri, berdaulat, dan
              mampu digunakan untuk kebutuhan masyarakat, industri, serta kepentingan strategis
              nasional.&rdquo;
            </p>
          </div>

          <p>
            Visi ini menjadi arah jangka panjang N-1 Labs, yang secara bertahap dijabarkan ke dalam
            beberapa fokus pengembangan:
          </p>
          <ul className="clean">
            {visionPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <div className="subhead">Positioning Arah Perusahaan</div>
          <div className="panel flow-chain">
            {positioningFlow.map((step, i) => (
              <div className="step" key={step} style={{ display: "flex", alignItems: "center", gap: 10, flex: "1 1 auto" }}>
                <span>{step}</span>
                {i < positioningFlow.length - 1 && <span className="arrow">→</span>}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 12 }}>
            N-1 Labs tidak memposisikan dirinya sebagai penyedia chatbot maupun software development
            semata, melainkan sebagai perusahaan yang membangun jenjang kapabilitas menuju teknologi AI
            berskala nasional.
          </p>
        </div>
      </section>

      <section id="long-term-vision">
        <div className="container">
          <div className="kicker">08 · Masa Depan</div>
          <h2 className="section-title">Long-Term Vision</h2>
          <div className="divider" />
          <span className="tag vision">Future Vision / Aspiration</span>

          <div className="quote-block" style={{ marginTop: 16 }}>
            <p>
              &ldquo;Today we build AI applications. Tomorrow we build AI infrastructure. Eventually, we
              aim to contribute to Indonesia&apos;s own AI foundation models.&rdquo;
            </p>
          </div>

          <p>
            N-1 Labs saat ini fokus membangun AI Agent dan sistem berbasis AI untuk kebutuhan bisnis.
            Namun, arah jangka panjang perusahaan mengarah pada kontribusi terhadap kapabilitas Indonesia
            dalam membangun teknologi AI-nya sendiri — termasuk Large Language Model (LLM). Tahapan
            konseptualnya dijelaskan lebih detail di bagian berikut.
          </p>
        </div>
      </section>

      <section id="llm">
        <div className="container">
          <div className="kicker">09 · Kedaulatan Teknologi</div>
          <h2 className="section-title">Building Indonesia&apos;s Own LLM</h2>
          <div className="divider" />
          <span className="tag vision">Future Vision / Aspiration</span>

          <p style={{ marginTop: 16 }}>
            Salah satu tujuan jangka panjang N-1 Labs adalah berkontribusi terhadap kemampuan Indonesia
            dalam membangun Large Language Model (LLM) sendiri — sebagai bagian dari kedaulatan teknologi
            bangsa di bidang kecerdasan buatan.
          </p>
          <p>
            <b>N-1 Labs saat ini belum memiliki LLM sendiri.</b> Kapabilitas yang dimiliki saat ini
            berada pada tahap membangun AI Agent dan aplikasi berbasis AI. Pengembangan menuju model
            engineering dan foundation model merupakan arah jangka panjang yang akan dibangun secara
            bertahap.
          </p>

          <div className="subhead">Mengapa Ini Penting</div>
          <ul className="clean">
            {llmReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>

          <div className="subhead">Tahapan Menuju Kemampuan LLM</div>
          <div className="grid grid-2">
            {llmStages.map((stage) => (
              <div className="panel" key={stage.title}>
                <h4 style={{ margin: "0 0 6px 0", fontSize: 13.5 }}>{stage.title}</h4>
                <p style={{ margin: 0, fontSize: 12.5, color: "var(--muted)" }}>{stage.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="national-security">
        <div className="container">
          <div className="kicker">10 · Kontribusi Strategis</div>
          <h2 className="section-title">National Security &amp; Defense Technology</h2>
          <div className="divider" />
          <span className="tag vision">Future Vision / Aspiration</span>

          <p style={{ marginTop: 16 }}>
            N-1 Labs memiliki aspirasi jangka panjang untuk bekerja sama dengan institusi pemerintah,
            pertahanan, dan militer Indonesia dalam mengembangkan teknologi AI yang dapat mendukung
            kebutuhan strategis nasional, di antaranya:
          </p>

          <div className="grid grid-2">
            {securityAreas.map((area) => (
              <div className="panel" key={area}>
                <p style={{ margin: 0, fontSize: 13.5 }}>{area}</p>
              </div>
            ))}
          </div>

          <div className="quote-block" style={{ marginTop: 20 }}>
            <p>
              &ldquo;Mengembangkan teknologi AI yang dapat menjadi bagian dari technological capability
              Indonesia dalam menjaga keamanan dan kedaulatan negara.&rdquo;
            </p>
          </div>

          <p style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 12 }}>
            <b style={{ color: "var(--ink)" }}>Catatan penting:</b> N-1 Labs bukan perusahaan militer, dan
            saat ini belum memiliki kerja sama resmi dengan institusi pertahanan atau militer mana pun.
            Bagian ini menggambarkan arah dan aspirasi jangka panjang perusahaan, bukan kemitraan yang
            sudah berjalan.
          </p>
        </div>
      </section>

      <section id="values">
        <div className="container">
          <div className="kicker">11 · Prinsip Kerja</div>
          <h2 className="section-title">Company Values</h2>
          <div className="divider" />
          <p className="section-lead">
            Ketujuh prinsip ini adalah cara kami menjaga filosofi N-1 tetap hidup dalam setiap keputusan
            — termasuk keputusan untuk tidak pernah menyebut sebuah sistem sebagai &ldquo;selesai&rdquo;.
          </p>

          <div className="panel">
            {values.map((value, i) => (
              <div className="value-row" key={value.title}>
                <div className="value-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="value-body">
                  <h4>{value.title}</h4>
                  <p>{value.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap">
        <div className="container">
          <div className="kicker">12 · Jalan ke Depan</div>
          <h2 className="section-title">Development Roadmap</h2>
          <div className="divider" />
          <p style={{ fontSize: 12.5, color: "var(--muted)", marginBottom: 20 }}>
            Roadmap berikut bersifat aspirasional — menggambarkan arah pengembangan, bukan janji atau
            kepastian waktu.
          </p>

          {roadmapPhases.map((phase) => (
            <div className="phase" key={phase.phase}>
              <div className="phase-head">
                <h4>{phase.phase}</h4>
                <span className="yr">{phase.year}</span>
              </div>
              <div className="phase-body">
                <ul>
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <p className="philosophy-closing">
            Fase terakhir berhenti di &ldquo;2030+&rdquo;, bukan tanggal — sebuah horizon yang terus
            bergerak seiring kami terus membangun.
          </p>
        </div>
      </section>

      <section id="positioning">
        <div className="container">
          <div className="kicker">13 · Cara Kami Diposisikan</div>
          <h2 className="section-title">Company Positioning</h2>
          <div className="divider" />

          <div className="quote-block">
            <p>
              &ldquo;An Indonesian AI Technology Company Building Intelligent Systems for Business,
              Industry, and the Future of National Technology.&rdquo;
            </p>
          </div>

          <p className="section-lead">
            Positioning inti ini konsisten di seluruh konteks komunikasi, dengan penekanan yang
            disesuaikan menurut audiens:
          </p>

          <div className="grid grid-2" style={{ marginTop: 8 }}>
            {positioningCards.map((card, i) => (
              <div
                className="pos-card"
                key={card.title}
                style={i === positioningCards.length - 1 ? { gridColumn: "1 / -1" } : undefined}
              >
                <h4>{card.title}</h4>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="closing">
        <div className="container">
          <div className="kicker">14 · Closing Statement</div>
          <h2>
            Dari sistem yang dibangun hari ini,
            <br />
            menuju teknologi bangsa di masa depan.
          </h2>
          <p>
            N-1 Labs adalah perusahaan teknologi AI asal Semarang yang membangun AI Agent, sistem bisnis,
            dan produk digital sebagai fondasi menuju kapabilitas yang lebih besar: AI infrastructure, AI
            research, dan pada akhirnya, teknologi AI Indonesia yang mandiri.
          </p>
          <p>
            Setiap proyek yang kami kerjakan adalah satu langkah dalam perjalanan panjang — bukan sekadar
            produk, tetapi bagian dari upaya membangun kedaulatan teknologi bangsa. Kami membangun apa
            yang dibutuhkan hari ini, sambil terus bergerak menuju apa yang akan dibutuhkan Indonesia di
            masa depan.
          </p>

          <div className="hero-ctas">
            <a className="btn btn-primary" href="#portfolio">
              Lihat Portofolio
            </a>
            <a className="btn btn-ghost" href="#top">
              Kembali ke Atas
            </a>
          </div>

          <div className="closing-contact">
            <div>
              <b>N-1 Labs</b>
              <span>Artificial Intelligence &amp; Technology Company</span>
            </div>
            <div>
              <b>Semarang, Jawa Tengah</b>
              <span>Indonesia</span>
            </div>
            <div>
              <b>Founded</b>
              <span>2 September 2026</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-contact">
          <span className="footer-contact-label">Hubungi Kami</span>
          <div className="footer-contact-links">
            <a
              className="btn btn-ghost footer-whatsapp"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={16} />
              {contact.whatsappDisplay}
            </a>
            <a className="footer-email" href={MAILTO_URL}>
              {contact.email}
            </a>
          </div>
        </div>
        <div className="container">
          <a className="brand" href="#top">
            <Image src={withBasePath("/logo.png")} alt="N-1 Labs" width={26} height={26} />
            N-1 LABS
          </a>
          <span className="footer-tagline">N-1 · always one step from finished.</span>
          <span>© 2026 N-1 Labs. All rights reserved.</span>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat via WhatsApp ke ${contact.whatsappDisplay}`}
      >
        <WhatsAppIcon size={28} />
      </a>
    </>
  );
}
