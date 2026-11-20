/**
 * Single source for the figures and copy shown on the page.
 * Must match the Hado positioning and the SBA grant form (20.11.2026).
 */
export const FACTS = {
  ismBands: "13.56 or 40.68 MHz",
  calibrationMin: 5,
  touchZones: 3,
  prototypeBomEur: "200–300 €",
  seriesTargetEur: "under 150 €",
  panelEur: "590–790 €",
  insertEur: "25–40 €",
  freezerC: -25,
  pcapGloveMm: 2,
  hmiMarketUsdB: 5.5,
  hmiMarketSource: "Straits Research, 2025",
  testErrorMm: 10,
  studyUrl: "https://yangzhang.dev/research/SkinTrack/SkinTrack.pdf",
  /** Pilot contact. Leave empty until a real address is chosen; the CTA button hides itself. */
  contactEmail: "",
} as const;

export type Member = {
  name: string;
  role: string;
  initials: string;
  /** Optional photo in /public, e.g. "/team/marek.jpg". Falls back to initials. */
  photo?: string;
  /** CSS object-position to keep the face in frame, e.g. "55% 45%". */
  photoPosition?: string;
  photoAlt?: string;
  bio: string;
  highlights: string[];
};

export const TEAM: Member[] = [
  {
    name: "Marek Hromada",
    role: "Lead engineer and developer",
    initials: "MH",
    photo: "/team/marek.jpg",
    photoPosition: "55% 52%",
    photoAlt: "Marek Hromada at MILSET ESE 2026 with his bionic hand project",
    bio: "Builds the Hado hardware, the signal processing and the touch-detection algorithms.",
    highlights: [
      "Researcher at the National Centre of Robotics (COCOHRIP), building computer vision for robot arms in Python and ROS2",
      "Two-time winner of the National Centre of Robotics Prize at FVaT AMAVET, 2025 and 2026",
      "National Centre of Robotics and Nexttech awards for the Antromorph bionic joint design",
      "Represented Slovakia at MILSET ESE 2026 and qualified for ISEF 2027",
      "Research stay in Japan on ENMA, emotion-aware robot locomotion",
    ],
  },
  {
    name: "Adam Daniel Donoval",
    role: "Co-founder, sales",
    initials: "AD",
    photo: "/team/adam.jpg",
    photoPosition: "46% 28%",
    photoAlt: "Adam Daniel Donoval",
    bio: "Co-founder and managing director of Cassava s. r. o. Leads customer discovery with cold stores, logistics sites and machine builders, partnerships and investor conversations.",
    highlights: [],
  },
];

export const SITES = [
  {
    title: "Cold stores",
    when: "First",
    text: "Freezer warehouses at −25 °C. Operators wear thick insulated gloves, screens fog with condensation, and taking a glove off means cold hands and lost minutes.",
  },
  {
    title: "Yards and ports",
    when: "First",
    text: "Outdoor terminals in rain, frost and dirt. Heavy work gloves, wet surfaces, and many hands on the same panel.",
  },
  {
    title: "Food washdown",
    when: "Next",
    text: "Lines hosed down every shift. A sealed, glass-free surface with nothing to crack and nothing to collect dirt.",
  },
] as const;

/** Secondary, later consumer variant (the original SkinTrack idea). Industrial stays the main product. */
export const LATER_VARIANT = {
  title: "On your skin",
  when: "Later",
  text: "A ring sends the signal and the back of your hand becomes the touchpad, to control a smartwatch, smart glasses or earbuds without touching them. This is the original SkinTrack idea and a later consumer variant, not our first product.",
  note: "Rings stay out of industry: near rotating machinery they are a degloving hazard and usually banned, so the industrial emitter lives in the glove.",
} as const;

export const PROTOTYPE_PHOTO = {
  src: "/prototype/proof-of-concept.jpg",
  alt: "Hado proof of concept worn on the hand: an AD8302 gain and phase receiver board on the back of the hand, wired to sensor electrodes on a wristband",
  caption:
    "The lab proof of concept: a gain and phase receiver on the back of the hand, wired to sensor electrodes on a wristband. It is the original on-skin setup we use to test the principle, before the glove insert and the sealed panel.",
} as const;

export const BENEFITS = [
  { h: "Works through thick gloves", p: "The signal comes from the glove insert, not from skin touching glass, so insulated and soaked gloves are not the limit." },
  { h: "Condensation does not press buttons", p: "Water, frost and a sleeve brushing the panel emit no code, so they cannot trigger a press." },
  { h: "Every press has a name", p: "Each glove carries its own code. The panel logs which operator pressed what, with no badge tap per action." },
  { h: "Software-defined layout", p: "Buttons and zones change with a software update, not a rewired keypad." },
  { h: "Never a safety circuit", p: "Hado is an operator input. Emergency stops stay hardwired, as EN 60204-1 and ISO 13850 require." },
  { h: "Fallback built in", p: "No glove insert or a flat battery? Visitors and maintenance log in with PIN and badge and keep working." },
] as const;

export const PRICING = [
  { name: "Hado panel", price: "590–790 €", note: "Sealed, glass-free control panel next to the existing screen. Target price." },
  { name: "Glove inserts", price: "25–40 € / pair", note: "Sewn into company-issued work gloves and replaced with them. Target ≥ 12 h battery, washable, works at −25 °C." },
  { name: "Site licence", price: "Per site", note: "Operator identification, press logs and audit trail, layout updates." },
] as const;

export const TEST_CRITERIA = [
  "Blind test with 10 people and 3 glove types: nitrile, 3 mm leather, 5 mm insulated",
  "No per-user calibration, targets under a 4 mm cover; pass at mean error under 10 mm and touch F1 above 97 %",
  "Repeat with a salt-water film and soaked gloves",
  "Paid EMC pre-scan: radiated immunity and glove emissions",
  "Head-to-head against an off-the-shelf glove-mode touchscreen with the same gloves and cover",
] as const;

export const FAQ: { q: string; a: string }[] = [
  {
    q: "How does it work?",
    a: "An insert sewn into the work glove sends a coded radio signal in a licence-free ISM band (13.56 or 40.68 MHz). Sensors in the panel measure its phase shift and magnitude difference to place the touch in two dimensions, and the code tells the panel which glove it is.",
  },
  {
    q: "Does it replace our touchscreen?",
    a: "No. Hado is a sealed, software-defined control panel that sits next to the existing screen and replaces the touch or keypad input. Your display and computer stay as they are.",
  },
  {
    q: "Does it really work in freezer gloves?",
    a: "That is exactly what our first test checks: 10 people, nitrile, 3 mm leather and 5 mm insulated gloves, no calibration, with a salt-water film. Today's glove-mode touchscreens are specified for gloves up to roughly 1.5 to 2 mm.",
  },
  {
    q: "Can it be used for safety functions?",
    a: "No. Hado is for operator input only. Emergency stops and other safety functions stay hardwired, as EN 60204-1 and ISO 13850 require.",
  },
  {
    q: "What if a glove insert is missing or flat?",
    a: "The panel falls back to PIN and badge login, so visitors and maintenance can still operate it. The insert is designed for at least a 12-hour shift.",
  },
  {
    q: "What will it cost?",
    a: "Target prices: about 590 to 790 € per panel, 25 to 40 € per pair of glove inserts, and a site software licence for operator identification and logs. The prototype bill of materials is about 200 to 300 € today; the series target is under 150 €.",
  },
  {
    q: "Why a glove insert and not a ring?",
    a: "Rings are usually banned near rotating machinery because they can catch and cause degloving injuries. Gloves are already managed protective equipment, so the industrial emitter is sewn into them. A ring is only planned for a later consumer variant, where the back of the hand controls a smartwatch, glasses or earbuds.",
  },
  {
    q: "Where is the project today?",
    a: "A lab proof of concept that tells three touch zones apart after about five minutes of calibration. The next step is a three-month go/no-go validation in Q1 2027.",
  },
  {
    q: "Where does the idea come from?",
    a: "SkinTrack, a 2016 study from Carnegie Mellon University, showed that the phase of a signal travelling through the body can locate a touch. We turn the principle around for industry: the emitter is in the glove, the sensors are in a sealed panel, and each glove carries its own code.",
  },
  {
    q: "Why the name Hado?",
    a: "波動 (hadō) is Japanese for wave, or wave motion: a nod to the radio waves that carry every press. It is short and easy to say in any language.",
  },
];
