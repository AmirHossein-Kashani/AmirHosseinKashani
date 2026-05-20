# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR on http://127.0.0.1:3000 (port and host pinned in [vite.config.ts](vite.config.ts))
- `npm run build` — type-check the project references (`tsc -b`) then produce a production build with Vite
- `npm run lint` — run ESLint across the repo
- `npm run preview` — serve the built `dist/` output locally

There is no test runner configured.

## Architecture

This is a Vite + React 19 + TypeScript single-page app scaffolded from the official Vite template. It currently renders the default Vite/React landing page from [src/App.tsx](src/App.tsx); there is no router, state library, or backend wired up yet.

Notable structural points worth knowing before editing:

- **TypeScript is split into project references.** [tsconfig.json](tsconfig.json) is just a router that points at [tsconfig.app.json](tsconfig.app.json) (browser-side source under `src/`) and [tsconfig.node.json](tsconfig.node.json) (build-time tooling like `vite.config.ts`). When adding new files, make sure they fall under the right project's `include` so `tsc -b` picks them up.
- **Static SVG sprite served from `/public`.** [src/App.tsx](src/App.tsx) references icons via `<use href="/icons.svg#icon-id">`, served directly from [public/icons.svg](public/icons.svg). When adding icons, extend that sprite rather than importing per-icon SVGs.
- **ESLint flat config.** [eslint.config.js](eslint.config.js) uses the new flat-config format with `typescript-eslint`, `react-hooks`, and `react-refresh`. Type-aware lint rules are **not** enabled — the README documents how to opt in if needed.
- **React Compiler is intentionally disabled** (per README) to keep dev/build fast. Don't assume auto-memoization.
