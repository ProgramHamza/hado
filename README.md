# Hado landing page

Landing page for **Hado (波動)**, a radio frequency user interface for heavy industry.
React 19 + TypeScript + Tailwind CSS 4, built with Vite. The hero wave field uses three.js
(loaded lazily); the scroll story, try-it pad, cost bars and savings calculator are plain React/canvas.

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

- All figures (build cost, retail price, market size, study numbers) live in `src/content.ts`,
  together with the price bars and the FAQ.
- Colours and fonts are Tailwind theme tokens in `src/index.css` (`--color-ink`, `--color-sig`, ...).

## Structure

```
src/
  App.tsx                  page order
  content.ts               numbers, price rows, FAQ
  lib/motion.ts            reduced-motion + in-view hooks, easing helpers
  components/
    Hero.tsx               nav, hero, live sensor readout
    WaveField.tsx          three.js 80 MHz wave field (lazy)
    Intro.tsx              statements + animated stats
    SignalStory.tsx        scroll-driven canvas story (send, compare, wet, write)
    Explain.tsx            how it works, name meaning, two variants
    Interactive.tsx        try-it pad, cost bars, savings calculator
    Closing.tsx            status, FAQ, footer
```
