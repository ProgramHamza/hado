/** Single source for the figures shown on the page. Keep in sync with the pitch and grant texts. */
export const FACTS = {
  signalMHz: 80,
  chip: "AD8302",
  calibrationMin: 5,
  touchZones: 3,
  buildCostEur: 150,
  assemblyMin: 40,
  retailEur: [400, 500] as const,
  undercutPct: [40, 60] as const,
  ruggedMarketUsdB: 12,
  ruggedMarketSource: "The Business Research Company, 2025 estimate",
  studyUrl: "https://yangzhang.dev/research/SkinTrack/SkinTrack.pdf",
  studyAccuracyPct: 99,
  studyErrorMm: 7.6,
} as const;

export type PriceRow = {
  label: string;
  value: string;
  /** Position on a shared 0 to 3000 scale, as fractions. */
  from: number;
  to: number;
  highlight?: boolean;
};

export const PRICES: PriceRow[] = [
  { label: "Rugged tablet", value: "$800 to $3,000", from: 800 / 3000, to: 1 },
  { label: "Industrial PCAP screen", value: "$800 to $1,600", from: 800 / 3000, to: 1600 / 3000 },
  { label: "Industrial resistive screen", value: "$300 to $800", from: 300 / 3000, to: 800 / 3000 },
  { label: "Hado, target price", value: "€400 to €500", from: 400 / 3000, to: 500 / 3000, highlight: true },
];

export type Member = {
  name: string;
  role: string;
  initials: string;
  /** Optional photo in /public, e.g. "/team/marek.jpg". Falls back to initials. */
  photo?: string;
  bio: string;
  highlights: string[];
};

export const TEAM: Member[] = [
  {
    name: "Marek Hromada",
    role: "Lead engineer and developer",
    initials: "MH",
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
    bio: "Co-founder and managing director of Cassava s. r. o. Leads customer discovery with plants and machine builders, partnerships and investor conversations.",
    highlights: [],
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "How does it work?",
    a: "A ring or glove sends an 80 MHz signal. Sensors in a terminal pad or a bracelet measure its phase shift and magnitude difference. Those two values place the touch in two dimensions.",
  },
  {
    q: "Does it work with thick gloves?",
    a: "The signal comes from the emitter in the ring or glove, not from bare skin on glass, so glove thickness is not the limit it is for touchscreens. Testing in real gloves is our next step.",
  },
  {
    q: "Can someone trigger it by accident?",
    a: "A splash of water, a sleeve or a tool does not emit the signal, so it cannot press a button. Later, each ring can carry its own code, so the terminal also knows who is operating it.",
  },
  {
    q: "What does it cost?",
    a: "Build cost is about 150 euros per unit today, with around 40 minutes of assembly. The target retail price is 400 to 500 euros.",
  },
  {
    q: "Where is the project today?",
    a: "A working proof of concept that recognises three buttons after about five minutes of calibration, using one AD8302 chip.",
  },
  {
    q: "Where does the idea come from?",
    a: "SkinTrack, a 2016 study from Carnegie Mellon University. It showed 99% touch detection and a 7.6 mm mean error on skin. We turn the principle around for industry and improve the design and data analysis for dirty, wet conditions.",
  },
  {
    q: "Why the name Hado?",
    a: "波動 (hadō) is Japanese for wave, or wave motion. It nods to the 80 MHz radio waves that power the interface, and it is short and easy to say in any language.",
  },
];
