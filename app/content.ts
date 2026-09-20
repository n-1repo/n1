export const contact = {
  whatsapp: "6285691966199",
  whatsappDisplay: "+62 856-9196-6199",
  email: "contact@n-1labs.com",
};

export const identity = [
  { label: "Nama Perusahaan", value: "N-1 Labs" },
  { label: "Didirikan", value: "2 September 2026" },
  { label: "Lokasi", value: "Semarang, Jawa Tengah, Indonesia" },
  { label: "Industri", value: "Artificial Intelligence & Technology" },
  {
    label: "Arah Jangka Panjang",
    value: "AI Technology Company yang membangun teknologi AI secara mandiri",
  },
];

export const stats = [
  { value: "2026", label: "Founded" },
  { value: "Semarang", label: "Jawa Tengah, ID" },
  { value: "AI & Tech", label: "Industry" },
];

export const missionPillars = [
  {
    title: "1. Develop",
    body: "Mengembangkan Artificial Intelligence dan AI Agent yang dapat digunakan secara nyata untuk menyelesaikan kebutuhan bisnis dan operasional.",
  },
  {
    title: "2. Integrate",
    body: "Mengintegrasikan sistem AI ke dalam sistem bisnis, mulai dari komunikasi pelanggan hingga proses operasional internal.",
  },
  {
    title: "3. Automate",
    body: "Membangun automation untuk proses bisnis, layanan pelanggan, dan pengolahan data secara efisien dan konsisten.",
  },
  {
    title: "4. Research",
    body: "Melakukan riset dan pengembangan berkelanjutan terhadap teknologi AI, sebagai fondasi menuju kapabilitas yang lebih dalam.",
  },
  {
    title: "5. Build",
    body: "Membangun software dan infrastructure secara mandiri, dari sistem bisnis hingga fondasi AI infrastructure.",
  },
  {
    title: "6. Scale",
    body: "Mengembangkan kemampuan engineering dan computing agar siap digunakan pada skala industri dan nasional.",
  },
  {
    title: "7. Protect",
    body: "Membangun fondasi menuju LLM Indonesia, dan dalam jangka panjang mendukung teknologi strategis nasional yang menjaga kepentingan dan kedaulatan bangsa.",
    wide: true,
  },
];

export const techDomains = [
  {
    name: "Artificial Intelligence",
    items: [
      "AI Agent",
      "Large Language Model (LLM) application",
      "Natural Language Processing",
      "AI Automation",
      "AI Knowledge Systems",
    ],
  },
  {
    name: "AI Infrastructure",
    items: [
      "AI Agent infrastructure",
      "Model integration",
      "AI orchestration",
      "Data infrastructure",
      "AI communication infrastructure",
    ],
  },
  {
    name: "Software Engineering",
    items: ["Web applications", "Backend systems", "API", "Database systems", "ERP", "E-commerce"],
  },
  {
    name: "Automation",
    items: [
      "Business process automation",
      "Customer service automation",
      "Workflow automation",
      "Data processing",
    ],
  },
  {
    name: "Digital Products",
    items: ["SaaS", "E-commerce", "Game", "Business platforms"],
  },
  {
    name: "Future Research",
    vision: true,
    items: ["LLM", "AI infrastructure", "Intelligent systems", "National-scale AI technology"],
  },
];

export const buildAreas = [
  {
    title: "Intelligent Systems",
    body: "AI Agent yang bertindak sebagai lapisan cerdas antara pelanggan dan sistem bisnis — memahami konteks, bukan sekadar merespons kata kunci.",
  },
  {
    title: "Business Infrastructure",
    body: "Sistem backend, database, dan API yang menjadi tulang punggung operasional bisnis, dari ERP hingga e-commerce.",
  },
  {
    title: "Automation Layer",
    body: "Otomatisasi proses bisnis dan layanan pelanggan yang mengurangi beban kerja manual dan meningkatkan konsistensi operasional.",
  },
  {
    title: "Digital Products",
    body: "Produk digital lintas kategori — dari platform bisnis hingga game — sebagai eksplorasi kemampuan engineering dan desain sistem.",
  },
];

export type Project = {
  num: string;
  title: string;
  position: string;
  problem: string;
  solution: string;
  flow?: string;
  function: string[];
  impact: string[];
  learned: string;
};

export const projects: Project[] = [
  {
    num: "01",
    title: "AI Agent Customer Service",
    position: "AI Agent sebagai digital workforce, bukan sekadar chatbot.",
    problem:
      "Layanan pelanggan konvensional terbatas oleh jam operasional dan kapasitas human agent, sehingga respons terhadap pertanyaan berulang sering lambat dan tidak konsisten.",
    solution:
      "N-1 Labs mengembangkan AI Agent yang mampu menjawab pelanggan secara otomatis dengan memanfaatkan knowledge perusahaan, memahami konteks percakapan, serta menjawab pertanyaan umum (FAQ) sebelum diteruskan ke human agent bila diperlukan.",
    function: [
      "Menjawab pelanggan secara otomatis dan kontekstual",
      "Memanfaatkan knowledge base perusahaan",
      "Beroperasi 24/7 tanpa batasan jam kerja",
      "Menjadi lapisan cerdas antara pelanggan dan sistem bisnis",
    ],
    impact: [
      "Respons pelanggan lebih cepat dan konsisten",
      "Beban human agent berkurang untuk pertanyaan rutin",
      "Layanan tersedia tanpa henti, kapan pun dibutuhkan",
    ],
    learned:
      "Proyek ini menjadi fondasi awal kemampuan N-1 Labs dalam merancang AI Agent yang memahami konteks percakapan dan terintegrasi dengan sistem knowledge — kapabilitas yang menjadi dasar pengembangan AI Agent pada proyek-proyek berikutnya.",
  },
  {
    num: "02",
    title: "Voucher Management System",
    position: "Sistem voucher digital end-to-end: Create → Distribute → Claim → Validate → Redeem → Track.",
    problem:
      "Pengelolaan voucher secara manual rentan terhadap duplikasi klaim, sulit dilacak, dan menyulitkan proses validasi saat digunakan dalam kampanye berskala besar.",
    solution:
      "N-1 Labs membangun sistem voucher digital yang menangani seluruh siklus hidup voucher secara terintegrasi — mulai dari pembuatan, distribusi, klaim oleh pengguna, validasi, hingga redemption dan pelacakan transaksi.",
    function: [
      "Mendukung campaign dan promotion",
      "Mendukung customer acquisition",
      "Validasi voucher secara real-time",
      "Redemption tracking dan transaction linkage",
    ],
    impact: [
      "Mencegah klaim ganda (anti-duplicate claim)",
      "Meningkatkan keandalan program promosi",
      "Data transaksi tercatat dan terlacak dengan jelas",
    ],
    learned:
      "Proyek ini memperkuat kemampuan N-1 Labs dalam merancang sistem transaksional yang andal dan aman — dasar penting bagi sistem bisnis berskala yang dikembangkan pada proyek-proyek berikutnya.",
  },
  {
    num: "03",
    title: "WhatsApp Environment for AI Customer Service",
    position: "WhatsApp bukan sekadar channel, melainkan bagian dari AI Customer Service infrastructure.",
    problem:
      "Layanan pelanggan berbasis WhatsApp umumnya dikelola secara manual, sehingga sulit diintegrasikan dengan AI Agent, riwayat percakapan, dan sistem bisnis secara konsisten.",
    solution:
      "N-1 Labs membangun environment WhatsApp yang menjadi infrastruktur komunikasi bagi AI Customer Service.",
    flow: "Customer → WhatsApp → WhatsApp API → AI Agent → Knowledge / Business System → Response",
    function: [
      "Conversation dan contact management",
      "Chat history tersimpan dan terstruktur",
      "AI response dan human handover",
      "Customer follow-up dan status percakapan",
      "Pengelolaan 24-hour messaging window",
    ],
    impact: [
      "Layanan pelanggan lebih terstruktur di kanal WhatsApp",
      "Transisi mulus antara AI Agent dan human agent",
      "Percakapan pelanggan tercatat secara konsisten",
    ],
    learned:
      "Proyek ini memperkuat kemampuan N-1 Labs dalam membangun AI communication infrastructure — menjadikan WhatsApp bagian dari sistem AI Customer Service yang utuh, bukan sekadar saluran pesan.",
  },
  {
    num: "04",
    title: "E-Commerce",
    position: "End-to-end commerce system — dari frontend hingga backend.",
    problem:
      "Bisnis yang ingin berjualan secara digital membutuhkan sistem commerce yang menyatukan katalog produk, transaksi, pembayaran, dan pengelolaan operasional dalam satu platform yang andal.",
    solution:
      "N-1 Labs membangun sistem e-commerce end-to-end yang mencakup seluruh alur belanja — dari katalog produk hingga pengelolaan admin dan analitik bisnis.",
    function: [
      "Product catalog dan customer management",
      "Cart dan checkout",
      "Order management dan payment integration",
      "Transaction data dan admin management",
    ],
    impact: [
      "Proses jual-beli digital berjalan end-to-end",
      "Data transaksi tersedia untuk business analytics",
      "Operasional toko dapat dikelola secara terpusat",
    ],
    learned:
      "Proyek ini menegaskan kemampuan N-1 Labs dalam membangun sistem commerce secara utuh — dari frontend, backend, hingga integrasi pembayaran — sebagai bagian dari kapabilitas software engineering inti perusahaan.",
  },
  {
    num: "05",
    title: "Own a Dungeon",
    position: "Eksplorasi N-1 Labs dalam interactive digital products dan game technology.",
    problem:
      "N-1 Labs ingin mengeksplorasi kapabilitas engineering di luar sistem bisnis konvensional, melalui produk interaktif yang menuntut real-time interaction dan desain sistem yang kompleks.",
    solution:
      "Own a Dungeon adalah produk game digital yang dikembangkan N-1 Labs, mencakup game mechanics, sistem dungeon, interaksi pemain, digital assets/environment, antarmuka pengguna, backend logic, hingga pengelolaan data permainan.",
    function: [
      "Game mechanics dan sistem dungeon",
      "Interaksi pemain secara real-time",
      "Digital assets dan environment",
      "Backend logic dan pengelolaan data permainan",
    ],
    impact: [
      "Memperluas kapabilitas engineering di luar sistem bisnis",
      "Menguji real-time interaction dan system design pada skala berbeda",
    ],
    learned:
      "Meski berbeda kategori dari proyek bisnis lainnya, proyek ini tetap relevan dengan kapabilitas inti N-1 Labs: system design, backend engineering, real-time interaction, dan digital product development — kemampuan yang juga dibutuhkan dalam membangun sistem AI yang responsif dan interaktif.",
  },
  {
    num: "06",
    title: "ERP Management System for Swimming Club",
    position: "Membangun centralized management system untuk mengintegrasikan aktivitas operasional swimming club.",
    problem:
      "Operasional swimming club yang melibatkan banyak entitas — anggota, pelatih, kelas, dan jadwal — sulit dikelola tanpa satu sistem data yang terpusat.",
    solution:
      "N-1 Labs mengembangkan sistem ERP yang mencakup member management, student database, coach management, class management, penjadwalan, absensi, administrasi, manajemen operasional, hingga pelaporan — seluruhnya dalam satu sistem data yang terpusat.",
    function: [
      "Member dan student database management",
      "Coach dan class management",
      "Penjadwalan dan absensi",
      "Administrasi, operasional, dan pelaporan",
    ],
    impact: [
      "Operasional multi-entitas terkelola dalam satu sistem terpusat",
      "Struktur data relasional yang matang untuk skala enterprise",
    ],
    learned:
      "Proyek ini memperkuat kemampuan N-1 Labs dalam merancang sistem manajemen operasional multi-entitas yang membutuhkan struktur data relasional yang matang — kapabilitas penting bagi sistem enterprise ke depannya.",
  },
];

export const journey = [
  { title: "Software Engineering", body: "Fondasi teknis: web, backend, API, dan database sebagai dasar seluruh sistem." },
  { title: "Business Systems", body: "Sistem bisnis seperti ERP dan e-commerce yang menjawab kebutuhan operasional nyata." },
  { title: "Automation", body: "Otomatisasi proses bisnis dan layanan pelanggan untuk efisiensi operasional." },
  { title: "AI Agent", body: "Lapisan kecerdasan yang memahami konteks dan menjadi digital workforce." },
  { title: "AI Infrastructure", body: "Orkestrasi model, integrasi, dan infrastruktur data untuk sistem AI berskala.", vision: true },
  { title: "AI Research", body: "Riset model dan computing sebagai fondasi menuju pengembangan model sendiri.", vision: true },
  { title: "LLM Development", body: "Kontribusi terhadap kemampuan Indonesia membangun LLM secara mandiri.", vision: true },
  { title: "Indonesian AI Technology", body: "Teknologi AI Indonesia yang mandiri, berdaulat, dan berskala nasional.", vision: true },
];

export const visionPoints = [
  "Pengembangan teknologi AI Indonesia yang dibangun dan dikuasai secara mandiri.",
  "Pengembangan kemampuan Large Language Model (LLM) sebagai fondasi teknologi masa depan.",
  "Membuka jalan bagi Indonesia untuk memiliki kemampuan membangun dan mengembangkan LLM sendiri.",
  "Pengembangan AI infrastructure dan AI engineering capability yang solid.",
  "Pengembangan teknologi yang relevan untuk kebutuhan industri maupun pemerintahan.",
  "Dalam jangka panjang, berkontribusi terhadap keamanan nasional melalui teknologi.",
  "Membuka kemungkinan kerja sama dengan institusi pertahanan dan militer Indonesia.",
];

export const positioningFlow = ["AI Technology Company", "AI Infrastructure", "AI Research", "National Technology Capability"];

export const llmStages = [
  { title: "1. AI Application", body: "Membangun produk dan sistem berbasis AI untuk kebutuhan nyata." },
  { title: "2. AI Agent & Infrastructure", body: "Mengembangkan orkestrasi, integrasi model, dan infrastruktur data." },
  { title: "3. Data & Computing", body: "Membangun kapasitas data dan komputasi sebagai prasyarat riset model." },
  { title: "4. Model Engineering & LLM", body: "Riset dan rekayasa model menuju foundation model Indonesia." },
];

export const llmReasons = [
  "Kemandirian teknologi AI mengurangi ketergantungan terhadap model dan infrastruktur asing.",
  "LLM yang dibangun secara lokal dapat lebih memahami konteks bahasa, budaya, dan kebutuhan Indonesia.",
  "Kapabilitas ini menjadi fondasi bagi pengembangan teknologi strategis nasional di masa depan.",
];

export const securityAreas = [
  "National security",
  "Cyber defense",
  "Border security",
  "Intelligence analysis",
  "Information processing",
  "Situational awareness",
  "Decision-support systems",
  "Monitoring and early-warning systems",
];

export const values = [
  { title: "Build", body: "Kami membangun, bukan sekadar merencanakan — setiap ide diarahkan menjadi sistem yang nyata dan dapat digunakan." },
  { title: "Research", body: 'Kami menempatkan riset sebagai bagian dari proses kerja, bukan langkah tambahan — sesuai semangat "Labs" dalam nama kami.' },
  { title: "Precision", body: "Kami mengutamakan ketelitian dalam merancang sistem, karena kesalahan kecil dapat berdampak besar pada skala produksi." },
  { title: "Ownership", body: "Kami mengembangkan teknologi secara mandiri agar kapabilitas yang dibangun benar-benar menjadi milik dan kendali sendiri." },
  { title: "Innovation", body: "Kami terus mengeksplorasi pendekatan baru dalam merancang AI Agent, sistem, maupun produk digital." },
  { title: "Integrity", body: "Kami menjaga kejujuran dalam mengkomunikasikan kapabilitas — membedakan dengan jelas antara yang sudah ada dan yang masih menjadi visi." },
  { title: "Impact", body: "Kami mengukur keberhasilan dari dampak nyata yang dihasilkan bagi pengguna, industri, dan pada akhirnya, bangsa." },
];

export const roadmapPhases = [
  {
    phase: "Phase 1 — Foundation",
    year: "2026",
    items: ["Software systems", "AI Agent", "Automation", "Business systems", "Digital products"],
  },
  {
    phase: "Phase 2 — AI Infrastructure",
    year: "2027 – 2028",
    items: ["AI infrastructure", "Agent orchestration", "Data systems", "AI platform", "Advanced AI products"],
  },
  {
    phase: "Phase 3 — AI Research",
    year: "2028 – 2030",
    items: ["Model research", "AI infrastructure", "Computing", "Dataset engineering", "LLM research"],
  },
  {
    phase: "Phase 4 — Indonesian AI Technology",
    year: "2030+",
    items: ["Indonesian LLM", "AI infrastructure", "Strategic technology", "Government collaboration", "National security technology"],
  },
];

export const positioningCards = [
  { title: "Corporate", body: "N-1 Labs adalah mitra teknologi yang membangun sistem AI, automation, dan software untuk mendukung pertumbuhan bisnis secara berkelanjutan." },
  { title: "Investor", body: "N-1 Labs membangun kapabilitas secara bertahap — dari software engineering menuju AI infrastructure — dengan arah jangka panjang pada teknologi AI strategis Indonesia." },
  { title: "Government", body: "N-1 Labs adalah perusahaan teknologi Indonesia dengan visi mendukung kemandirian teknologi AI nasional, termasuk potensi kontribusi terhadap kebutuhan strategis pemerintahan." },
  { title: "Technology", body: "N-1 Labs merancang AI Agent, sistem orkestrasi, dan infrastruktur data sebagai fondasi menuju kapabilitas AI yang lebih dalam, termasuk riset model." },
  { title: "International", body: "N-1 Labs is an Indonesian AI technology company building intelligent systems today, with a long-term ambition to contribute to Indonesia's sovereign AI capability." },
];
