# AmirHossein Kashani — Personal CV / Portfolio

A single-page portfolio site built with **Vite + React 19 + TypeScript + Tailwind CSS**, deployed to GitHub Pages.

> Live site: **https://amkkashani.github.io/AmirHosseinKashaniCV/**
> (active after the first successful Actions run — see below)

## Sections

`Hero` → `About` → `Projects` (filterable AI / Software) → `Publications` → `Experience` → `Education` → `Skills` → `Contact`

All content lives in plain TypeScript modules under [`src/data/`](src/data/), so updating the CV is a code change, not a CMS round-trip.

## Local development

```bash
npm install
npm run dev      # http://127.0.0.1:3000 with HMR
npm run build    # tsc -b + vite build → dist/
npm run preview  # serve the built dist/ locally
npm run lint     # ESLint flat config
```

## Project layout

```
src/
  App.tsx              Page composition
  main.tsx             Vite entrypoint
  index.css            Tailwind + design tokens (CSS vars)
  components/          One file per page section
  data/                Content as typed TS data (profile, projects, …)
  utils/asset.ts       BASE_URL-aware helper for public/ asset paths
public/                Static assets (favicon, project images/videos)
.github/workflows/     deploy.yml — GitHub Actions Pages pipeline
```

## Deploying to GitHub Pages

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds on every push to `main` and publishes `dist/` via the official `actions/deploy-pages` flow.

One-time setup, in the GitHub UI:

1. **Settings → Pages → Build and deployment → Source = "GitHub Actions"**
2. Push to `main`. The Actions tab will show the build, and after it completes the live URL appears in the deploy job summary.

The Vite `base` is pinned to `/AmirHosseinKashaniCV/` so asset URLs resolve correctly on `https://<user>.github.io/AmirHosseinKashaniCV/`. If you fork or rename the repo, update `base` in [`vite.config.ts`](vite.config.ts) and the `<link rel="canonical">` / OG URLs in [`index.html`](index.html).

## Updating content

| What to change           | File                                  |
| ------------------------ | ------------------------------------- |
| Name, tagline, email     | `src/data/profile.ts`                 |
| Research interests       | `src/data/interests.ts`               |
| Projects (filter cards)  | `src/data/projects.ts`                |
| Publications             | `src/data/publications.ts`            |
| Education                | `src/data/education.ts`               |
| Experience               | `src/data/experience.ts`              |
| Skills                   | `src/data/skills.ts`                  |
| Project images / videos  | `public/projects/`                    |

Image and video paths use a leading slash (e.g. `/projects/foo.png`); the `asset()` helper in `src/utils/asset.ts` prepends the configured base at runtime, so they keep working under any deploy prefix.

## Tech notes

- TypeScript is split into project references (`tsconfig.app.json` for browser code, `tsconfig.node.json` for build tooling); new files must fall under the right `include`.
- ESLint uses the flat-config format. Type-aware rules are not enabled by default.
- The React Compiler is intentionally off to keep dev/build fast — no automatic memoization.
