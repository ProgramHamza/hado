/**
 * Language-independent facts: numbers, names, photos, links.
 * All visible text lives in src/i18n/en.ts and src/i18n/sk.ts.
 * Figures must match the Hado positioning and the SBA grant form (Hado_v2, 22.11.2026).
 */
export const FACTS = {
  freezerC: -25,
  pcapGloveMm: 2,
  testErrorMm: 10,
  hmiMarketUsdB: 5.5,
  studyUrl: "https://yangzhang.dev/research/SkinTrack/SkinTrack.pdf",
  /**
   * Web3Forms access key for the pilot form. Public by design: it only delivers to the inbox it was
   * issued for and never reveals that address. Empty = the form shows a "not connected yet" note.
   */
  contactFormKey: "da901edf-3f50-4c24-ae5c-fcf6beb0921f",
} as const;

/** Stats in the intro, in the same order as `intro.stats` in the copy files. */
export const STAT_VALUES = [
  { to: FACTS.freezerC, decimals: 0 },
  { to: FACTS.pcapGloveMm, decimals: 0 },
  { to: FACTS.testErrorMm, decimals: 0 },
  { to: FACTS.hmiMarketUsdB, decimals: 1 },
] as const;

export type Person = {
  name: string;
  initials: string;
  /** Photo in /public, e.g. "/team/marek.jpg". Falls back to initials. */
  photo?: string;
  /** CSS object-position to keep the face in frame, e.g. "55% 45%". */
  photoPosition?: string;
};

/** Same order as `team.members` in the copy files. */
export const PEOPLE: Person[] = [
  { name: "Marek Hromada", initials: "MH", photo: "/team/marek.jpg", photoPosition: "55% 52%" },
  { name: "Adam Daniel Donoval", initials: "AD", photo: "/team/adam.jpg", photoPosition: "46% 28%" },
  { name: "Teo Višňovský", initials: "TV", photo: "/team/teo.jpg", photoPosition: "50% 45%" },
];

export const PROTOTYPE_PHOTO_SRC = "/prototype/proof-of-concept.jpg";
