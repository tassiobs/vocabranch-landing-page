# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

The repo root contains Mocha export artifacts (`d1_dump.sql`, `users.json`, `public_asset_links.json`, `.env`). All working code lives in `code/`. **Run all npm commands from `code/`.**

```
code/               # All source and build tooling
├── src/
│   ├── react-app/  # React SPA (the only active code)
│   ├── worker/     # Mocha legacy stub — not used in the current build
│   └── shared/     # Mocha legacy stub — not used in the current build
├── public/CNAME    # Custom domain: vocabranch.com
└── dist/           # Build output (committed, served by GitHub Pages)
```

## Commands

Run from the `code/` directory:

```bash
npm run dev    # Vite dev server
npm run build  # tsc -b && vite build && cp dist/index.html dist/404.html
npm run lint   # ESLint
```

No test suite is configured — ESLint is the primary code quality tool.

## Architecture

**VocaBranch** is a static landing page for a vocabulary learning app. It is deployed to GitHub Pages at `vocabranch.com` via the `deploy.yml` workflow (triggers on push to `main`, builds from `code/`, serves `code/dist/`).

The `dist/404.html` copy of `index.html` is how GitHub Pages handles SPA client-side routing — 404s fall back to the React app.

### Stack

- **Frontend:** React 19 + React Router 7 (BrowserRouter) + Tailwind CSS + Radix UI primitives
- **Build:** Vite 7 + `@vitejs/plugin-react`
- No backend, no Cloudflare Workers, no D1, no R2 in the current deployment.

### Styling conventions

- All styling uses Tailwind utility classes.
- Colors are CSS variables in HSL format defined in `src/react-app/index.css`, consumed via `tailwind.config.js` as `hsl(var(--...))`.
- Dark mode uses the `class` strategy.
- Use `cn()` from `@/react-app/lib/utils` for conditional or merged class names.

### Path alias

`@/` maps to `./src/` in both TypeScript and Vite config.

### TypeScript

Strict mode with `noUnusedLocals` and `noUnusedParameters`. The repo has three tsconfigs (`tsconfig.app.json`, `tsconfig.worker.json`, `tsconfig.node.json`) inherited from the Mocha export; only `tsconfig.app.json` is relevant to the active build.

### Platform context

This project was exported from Mocha (a Cloudflare-based app builder). The `worker/` and `shared/` directories are empty scaffolding stubs left over from that export. The `.env` file contains Mocha secrets — do not commit it.
