# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Type-check + production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

Minimal React 19 + TypeScript SPA using Vite 8.

- `src/main.tsx` — mounts the React root
- `src/App.tsx` — single top-level component with `useState`
- `src/index.css` — global styles with CSS custom properties for light/dark theming (`prefers-color-scheme`)
- `src/App.css` — component-scoped styles

TypeScript is configured with strict mode (`noUnusedLocals`, `noUnusedParameters`). Two separate tsconfig files: `tsconfig.app.json` for source, `tsconfig.node.json` for Vite config/build scripts. ESLint uses v9 flat config format with `typescript-eslint`, `react-hooks`, and `react-refresh` plugins.
