# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Vite HMR)
npm run build    # Production build
npm run preview  # Preview production build locally
```

## Architecture

**Ragnetor** is a single-page retro-styled landing site built with React 18 + Vite. No routing — navigation is anchor-based (`#hero`, `#stream`, `#game`, `#shop`, `#contacts`).

### Page structure (`src/App.jsx`)

Sections render top-to-bottom in a single scroll:
`Navbar → Hero → PigeonSection → ContentSection(stream) → ContentSection(game) → ShopSection → CTASection → ContactSection`

`ContentSection` is a generic reusable container instantiated twice with `id` and `label` props.

### Styling conventions

- Each component has a co-located `ComponentName.module.css` (CSS Modules, no global leakage)
- Global design tokens and animations live in `src/index.css` — edit here for colors, fonts, effects
- Color palette: dark purple backgrounds (`--bg`, `--bg-light`, `--bg-mid`) + gold accents (`--gold`, `--gold-dim`, `--gold-glow`)
- Typography: "Press Start 2P" (Google Fonts, loaded in `index.html`)
- Global visual effects (CRT scanlines, crosshair cursor, `wordReveal`/`glitchFlicker` animations) are defined in `index.css`

### SVG components

Custom inline SVGs live in `src/components/svg/` and are imported as React components (`PigeonSVG`, `RobotArmSVG`, `CrosshairSVG`).
