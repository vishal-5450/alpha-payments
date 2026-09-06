/**
 * Single source of truth for site-wide content.
 * Edit copy, stats, links and placeholders here.
 */

export const site = {
  name: "Alpha Payments",
  legalName: "Alpha Payments LLP",
  tagline: "Delivering Unmatched Quality in Every Transaction",
  description:
    "Alpha Payments is a Mumbai-based payments technology firm specialising in EFT switching (Base24, Postilion), banking automation, financial simulators and advisory for banks and financial institutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alphapay.co.in",
  email: "info@alphapay.co.in",
  hrEmail: "hr@alphapay.co.in",
  phone: "+91 22 3523 4280",
  phoneHref: "tel:+912235234280",
  address: {
    line1: "1st Floor, Damji Shamji Business 78",
    line2: "Off L.B.S. Road, Next to Huma Mall",
    line3: "Kanjurmarg (W), Mumbai – 400 078, India",
    mapsQuery: "Damji Shamji Business Park, LBS Road, Kanjurmarg West, Mumbai 400078",
  },
  hours: "Monday – Friday, 9:30 AM – 6:30 PM IST",
  social: {
    linkedin: "https://www.linkedin.com/company/alpha-payments-llp/",
    x: "https://twitter.com/alphapay2019",
  },
  founded: 2019,
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

/* ---------------------------------- Stats --------------------------------- */
/* Placeholder figures. Replace with real numbers before go-live. */
export const stats = [
  { value: 24, suffix: "×7", label: "Customer support coverage", decimals: 0 },
  { value: 50, suffix: "+", label: "Switch deployments & upgrades", decimals: 0 },
  { value: 99.99, suffix: "%", label: "Uptime targeted on monitored switches", decimals: 2 },
  { value: 4, suffix: "", label: "Platforms: Guardian, Linux, Unix, Windows", decimals: 0 },
] as const;

/* -------------------------------- Services -------------------------------- */
export const services = [
  {
    slug: "eft-switching",
    title: "EFT Switching Services",
    short: "End-to-end delivery on ACI Base24 Classic, Base24-eps and Postilion.",
    description:
      "Wide-ranging experience deploying EFT switch solutions and related services for financial institutions. Our expertise spans ACI Base24 Classic, Base24-eps, Postilion and related interfaces, from greenfield implementation to upgrades, certifications and 24×7 production support.",
    highlights: [
      "Base24 Classic & Base24-eps implementation and upgrades",
      "Postilion acquiring and issuing deployments",
      "EMV, contactless and tokenised card enablement",
      "Interchange & network certification (Visa, Mastercard, RuPay, NPCI)",
      "Performance tuning, capacity planning and DR drills",
      "L2 / L3 production support with defined SLAs",
    ],
    icon: "switch",
  },
  {
    slug: "banking-automation",
    title: "Banking Automation",
    short: "Test automation and financial simulators that shorten release cycles.",
    description:
      "Automation is the focus of the global banking industry. Alpha Payments helps deploy the latest automation technologies to deliver the next wave of productivity, cost saving and improved customer experience, backed by deep expertise in financial simulators such as FinSim, VISA Simulator, MDS and MAS.",
    highlights: [
      "Regression suites for switch, host and network interfaces",
      "FinSim, Visa VTS, Mastercard MDS / MAS simulator expertise",
      "Automated certification packs and evidence generation",
      "CI-integrated nightly transaction runs",
      "Synthetic data and key management for test environments",
      "Coverage dashboards and defect analytics",
    ],
    icon: "automation",
  },
  {
    slug: "advisory",
    title: "Advisory Services",
    short: "Strategy, architecture and programme leadership for payments transformation.",
    description:
      "As a digital transformation partner, Alpha Payments relentlessly pushes the envelope, developing innovative strategies and solutions that help clients extract maximum value from technology investments and build a lasting competitive advantage.",
    highlights: [
      "Payments platform assessment and modernisation roadmaps",
      "Requirements definition and solution architecture",
      "Vendor evaluation, RFP support and effort estimation",
      "Programme and project management for large-scale rollouts",
      "Regulatory and scheme-compliance guidance",
      "Operational cost-reduction and continuous improvement",
    ],
    icon: "advisory",
  },
] as const;

export type Service = (typeof services)[number];

/* -------------------------------- Products -------------------------------- */
export const products = [
  {
    slug: "insight",
    name: "Insight",
    kicker: "Real-time monitoring",
    tagline: "A unified, real-time view of every transaction and every system event on your BASE24-eps switch.",
    description:
      "Insight is a robust and dependable real-time transaction and system monitoring tool for BASE24-eps. It gives operations, business and risk teams one comprehensive view of system activity and transaction health so issues are caught before customers notice.",
    features: [
      { title: "Live transaction dashboards", text: "Approval rates, declines, response times and volumes by channel, issuer and acquirer, updated in real time." },
      { title: "Alert & notification engine", text: "Threshold and anomaly-based alerts delivered by e-mail, SMS or webhook to the right on-call team." },
      { title: "System activity monitoring", text: "Process, queue and interface health for the switch and its surrounding ecosystem." },
      { title: "Flexible data analysis", text: "Slice-and-dice explorer with saved views and scheduled exports for business users." },
    ],
    platforms: ["Guardian (Tandem / NonStop)", "Linux", "Unix (all flavours)", "Windows"],
  },
  {
    slug: "decipher",
    name: "Decipher",
    kicker: "Extracts & reporting",
    tagline: "Fast, reliable TLF and PTLF extract generation with visual comparison built in.",
    description:
      "Decipher is a highly robust and dependable report-generation tool that offers seamless, reliable access to information. It turns raw TLF and PTLF logs into clear, comparable insight for reconciliation, disputes and audit.",
    features: [
      { title: "TLF & PTLF extract generation", text: "Configurable field selection, filters and output formats (CSV, XLSX, JSON, fixed-width)." },
      { title: "Comparison with charts", text: "Compare transaction populations across dates, hosts or environments with visual diffs." },
      { title: "Scheduled & on-demand runs", text: "Automate daily extracts or run ad-hoc queries from a clean, modern UI." },
      { title: "Audit-ready output", text: "Immutable run logs, checksums and access control for compliance teams." },
    ],
    platforms: ["Guardian (Tandem / NonStop)", "Linux", "Unix", "Windows"],
  },
  {
    slug: "api-genie",
    name: "API Genie",
    kicker: "API simulation",
    tagline: "An outstanding real-time API simulator for JSON and XML payment interfaces.",
    description:
      "API Genie lets teams simulate, test and validate JSON/XML APIs against real-time data without waiting on partner sandboxes. Platform-independent, multi-threaded and SSL-ready, it is built for high-volume certification and regression runs.",
    features: [
      { title: "Real-time request simulation", text: "Drive thousands of concurrent JSON or XML transactions with scripted or randomised payloads." },
      { title: "Validation & assertions", text: "Schema, field and latency assertions with rich pass/fail reporting." },
      { title: "Platform independent", text: "Runs anywhere a JVM does. Multi-threaded and multitasking by design." },
      { title: "SSL / mTLS support", text: "Full TLS support including client certificates for secure partner endpoints." },
    ],
    platforms: ["Linux", "Unix", "Windows", "Container / Kubernetes"],
  },
] as const;

export type Product = (typeof products)[number];

/* --------------------------------- Process -------------------------------- */
export const processSteps = [
  { step: "01", title: "Discover & define", text: "We document system requirements, analyse your business needs and design the technical solution." },
  { step: "02", title: "Estimate & plan", text: "Transparent effort, budget and timeline estimation with a named project manager from day one." },
  { step: "03", title: "Build & implement", text: "Base24 Classic / EPS and EMV implementation by certified switch engineers." },
  { step: "04", title: "Test & certify", text: "Simulator-driven testing, scheme certification and automated regression before go-live." },
  { step: "05", title: "Support 24×7", text: "Client-centric production support delivered through deep technical expertise." },
] as const;

/* ---------------------------------- Values -------------------------------- */
export const values = [
  { title: "Quality service", text: "Quality is never an accident; it is always the result of intelligent effort." },
  { title: "Customer satisfaction", text: "A strong client-centric approach that starts with understanding exact business needs." },
  { title: "Timely delivery", text: "Every project finishes the line in a cost- and time-efficient manner." },
  { title: "Continuous improvement", text: "Delivery processes are constantly evaluated for efficiency, effectiveness and flexibility." },
  { title: "Safe environment", text: "Security, compliance and data protection are built in, not bolted on." },
  { title: "Exponential growth", text: "We grow with our clients, expanding capability as their payment volumes scale." },
] as const;

export const capabilities = [
  "Define and document system requirements",
  "Analysis and design of technical solutions for business requirements",
  "Provisioning, effort and budget estimation",
  "Base24 Classic & Base24-eps implementation",
  "EMV solution implementation",
  "Managing software projects of large, medium and small scale",
  "Strong customer relationship management",
  "Timely delivery",
  "Software testing & certifications",
  "24 × 7 customer support",
] as const;

/* -------------------------------- Partners -------------------------------- */
/* Placeholder partner / client tiles. Replace names and add logos to /public/partners. */
export const partnerCategories = [
  {
    title: "Switch & platform vendors",
    text: "Deep, certified expertise on the platforms that power the world's card transactions.",
    items: ["ACI Worldwide", "Base24-eps", "Postilion", "HPE NonStop"],
  },
  {
    title: "Card schemes & networks",
    text: "Certification-ready delivery for domestic and international schemes.",
    items: ["Visa", "Mastercard", "RuPay", "NPCI"],
  },
  {
    title: "Banks & processors",
    text: "Trusted by issuing and acquiring institutions across India and the Middle East.",
    items: ["Private-sector banks", "Public-sector banks", "Payment processors", "Fintech issuers"],
  },
] as const;

export const trustedBy = [
  "ACI Worldwide",
  "HPE NonStop",
  "Visa",
  "Mastercard",
  "RuPay",
  "NPCI",
  "Postilion",
  "Base24-eps",
] as const;

/* ------------------------------ Testimonials ------------------------------ */
/* Placeholder quotes. Replace with approved client statements. */
export const testimonials = [
  {
    quote:
      "Alpha Payments took our Base24-eps upgrade from a risky, multi-quarter programme to a clean, on-time cutover. Their switch engineers are among the best we have worked with.",
    name: "Head of Payments Technology",
    org: "Leading private-sector bank, India",
  },
  {
    quote:
      "Insight gave our operations team a single pane of glass on the switch. We now catch interface degradations minutes before they would have impacted customers.",
    name: "VP, Card Operations",
    org: "Payment processor, Middle East",
  },
  {
    quote:
      "Their simulator expertise cut our scheme certification cycle roughly in half. Crystal-clear communication throughout.",
    name: "Programme Director",
    org: "Public-sector bank, India",
  },
] as const;

/* --------------------------------- Careers -------------------------------- */
/* Default roles, used only until HR saves content from the console (/console). */
export const openRoles = [
  {
    title: "Base24-eps Developer",
    type: "Full-time",
    location: "Mumbai / Hybrid",
    team: "Switch Engineering",
    description:
      "Design, build and support Base24-eps components for issuing and acquiring flows at tier-1 banks. You will own features end to end, from requirement analysis through certification and production hand-over.\n\nYou will work alongside engineers who have delivered switch programmes for more than two decades, with a clear path towards technical leadership.",
    requirements: [
      "3+ years on Base24-eps or Base24 Classic (TAL / TACL / C on HPE NonStop)",
      "Hands-on ISO 8583 message handling, EMV and scheme certification experience",
      "Comfortable with production support rotations and incident analysis",
      "Strong written communication with client stakeholders",
    ],
  },
  {
    title: "Payments Test Automation Engineer",
    type: "Full-time",
    location: "Mumbai",
    team: "Quality & Automation",
    description:
      "Build the regression and certification automation that lets our clients release switch changes with confidence. You will script simulators, design test data and turn certification evidence into repeatable pipelines.",
    requirements: [
      "Experience with FinSim, Visa VTS or Mastercard MDS / MAS simulators",
      "Scripting in Python, Java or Groovy; CI experience (Jenkins, GitLab, GitHub Actions)",
      "Understanding of card transaction lifecycles and scheme mandates",
    ],
  },
  {
    title: "TAL / TACL Engineer (NonStop)",
    type: "Full-time",
    location: "Mumbai / Remote",
    team: "Switch Engineering",
    description:
      "Maintain and modernise HPE NonStop estates that run some of the region's highest-volume switches. Performance tuning, Pathway configuration and DR readiness are part of the day job.",
    requirements: [
      "Solid TAL / TACL and Guardian / OSS knowledge",
      "Pathway, Enscribe and SQL/MP exposure",
      "Experience supporting 24×7 mission-critical systems",
    ],
  },
  {
    title: "Project Manager – Payments",
    type: "Full-time",
    location: "Mumbai",
    team: "Delivery",
    description:
      "Lead multi-team switch implementation and upgrade programmes for banks in India and the Middle East, from estimation to go-live. You will be the single point of accountability for scope, schedule and client satisfaction.",
    requirements: [
      "6+ years of delivery experience, 3+ in cards or payments",
      "Comfortable presenting to CXO-level stakeholders",
      "PMP / PRINCE2 or equivalent is a plus",
    ],
  },
] as const;

export const perks = [
  { title: "Autonomy that matters", text: "Own your ideas from whiteboard to production on projects that ignite your passion." },
  { title: "Deep domain mastery", text: "Work on tier-1 switching platforms with mentors who have shipped them for decades." },
  { title: "Real impact", text: "Your code processes real money for real banks. Every release counts." },
  { title: "Growth path", text: "Structured certification, conference budgets and clear progression." },
] as const;
