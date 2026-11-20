# Hado landing page

Landing page for **Hado (波動)**, a sealed, glass-free control panel operated through a coded signal from work-glove inserts.
React 19 + TypeScript + Tailwind CSS 4, built with Vite. The hero wave field uses three.js
(loaded lazily); the scroll story, try-it pad, pricing and savings calculator are plain React/canvas.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ on http://localhost:4173
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project**, import the repo. Vercel detects Vite automatically
   (build command `npm run build`, output directory `dist`). Click **Deploy**.

Or from the terminal: `npx vercel` (preview) and `npx vercel --prod`.

## Editing content

- All figures and copy blocks (prices, test criteria, sites, benefits, team, FAQ, pilot contact email)
  live in `src/content.ts`. Keep them in sync with the grant form and positioning.
- Colours and fonts are Tailwind theme tokens in `src/index.css` (`--color-ink`, `--color-sig`, ...).

## Structure

```
src/
  App.tsx                  page order
  content.ts               numbers, pricing, sites, test criteria, FAQ
  lib/motion.ts            reduced-motion + in-view hooks, easing helpers
  components/
    Hero.tsx               nav, hero, live sensor readout
    WaveField.tsx          three.js radio wave field (lazy)
    Intro.tsx              statements + animated stats
    SignalStory.tsx        scroll-driven canvas story (send, compare, cold & wet, identify)
    Explain.tsx            how it works, name meaning, target sites, benefits
    Interactive.tsx        try-it pad, savings calculator, pricing
    Team.tsx               team
    Closing.tsx            status + go/no-go test, pilot CTA, FAQ, footer
```
