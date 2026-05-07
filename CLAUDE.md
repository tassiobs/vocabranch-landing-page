# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # TypeScript check + Vite production build
npm run lint      # ESLint
npm run check     # Type-check, build, and dry-run Cloudflare deployment
npm run knip      # Dead code analysis
```

No test suite is configured — ESLint is the primary code quality tool.

## Architecture

**VocaBranch** is a vocabulary learning app landing page, exported from the Mocha platform. It is deployed at `https://y5llncirhyppi.mocha.app` on Cloudflare Workers.

### Stack

- **Frontend:** React 19 + React Router 7 + Tailwind CSS + Radix UI primitives
- **Backend:** Hono (Cloudflare Worker) with Zod validation
- **Infra:** Cloudflare Workers, D1 (SQLite via binding `DB`), R2 (binding `R2_BUCKET`)
- **Build:** Vite 7 with `@cloudflare/vite-plugin`

### Source layout

```
src/
├── react-app/         # React SPA
│   ├── components/ui/ # Radix-based design system components
│   ├── components/landing/ # Page sections (Hero, Problem, HowItWorks, Differentiators, Footer)
│   ├── pages/Home.tsx # Root page — composes landing sections
│   ├── lib/utils.ts   # cn() helper (clsx + tailwind-merge)
│   └── App.tsx        # React Router setup (single "/" route)
├── worker/index.ts    # Hono server entry point (Cloudflare Worker)
└── shared/types.ts    # Zod schemas shared between client and server
```

### Path alias

`@/` maps to `./src/` in both TypeScript and Vite.

### Styling conventions

- All styling uses Tailwind utility classes.
- Colors are CSS variables in HSL format (defined in `src/react-app/index.css`), consumed via `tailwind.config.js` as `hsl(var(--...))`.
- Dark mode uses the `class` strategy.
- Use `cn()` from `@/react-app/lib/utils` for conditional or merged class names.

### TypeScript

Strict mode is on with `noUnusedLocals` and `noUnusedParameters`. Three separate tsconfigs:
- `tsconfig.app.json` — React frontend
- `tsconfig.worker.json` — Cloudflare Worker
- `tsconfig.node.json` — Build tooling

### Platform notes

This project was exported from Mocha (a Cloudflare-based app builder). It has Mocha-specific Vite plugins and relies on Cloudflare bindings for auth, email, D1, and R2. Replacing platform-specific integrations requires engineering work.
