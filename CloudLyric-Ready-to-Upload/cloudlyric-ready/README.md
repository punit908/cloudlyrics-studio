# CloudLyric Studio

React + Vite project package for the supplied CloudLyric Studio source.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

Vite outputs the production site to `dist/`. Deploy to Vercel with Framework Preset `Vite`, Build Command `npm run build`, and Output Directory `dist`.

## Project layout
- `src/App.tsx` — original CloudLyric Studio application source.
- `src/main.tsx` — React entry point.
- `src/styles.css` — Tailwind directives and responsive base styles.
- `QA-REVIEW.md` — source review, known risks and release checklist.

The supplied source is preserved; the package scaffold does not guarantee runtime correctness. Complete the QA checklist before announcing a public launch.
