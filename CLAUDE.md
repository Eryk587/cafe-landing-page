# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Premium coffee shop landing page. Goal: make the user *feel* the atmosphere and want to visit — not just read information. Brand experience first, info second.

## Tech Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animations

## Commands

```bash
# Install dependencies
npm install

# Dev server
npm run dev

# Build
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

## Architecture

Single-page layout with section-based components. Each section is a standalone component under `src/components/sections/`. Shared UI primitives (buttons, cards) live in `src/components/ui/`. Framer Motion animations are co-located with their components, not in a global animation file.

## Page Sections (in order)

1. **Hero** — fullscreen, video/cinematic image background, headline, 2 CTAs, parallax
2. **Menu** — bestsellers only (Espresso, Cappuccino, Flat White, Croissant, Cheesecake), hover micro-interactions
3. **Story** — 2-column layout (text + image), storytelling tone, not corporate copy
4. **Experience** — lifestyle/emotion section, sells atmosphere not product
5. **Gallery** — large images, minimal UI, cinematic feel, scroll reveal + hover zoom
6. **Reviews** — 3 testimonials, minimalist cards
7. **Location** — address, hours, contact, map, CTA buttons
8. **Footer** — logo, links, social, contact — very minimal

## Design System

**Colors:**
- Cream / beige backgrounds
- Coffee brown (primary)
- Dark espresso (headings/accents)
- Caramel (CTA accent)

**Typography:**
- Headlines: premium serif (e.g. Playfair Display, Cormorant Garamond)
- Body: clean sans-serif (e.g. Inter, DM Sans)

**Animation rules:**
- Subtle, slow, cinematic — inspired by Apple/Stripe/Awwwards
- Allowed: fade-in on scroll, light parallax, smooth transitions, hover micro-interactions, text reveal, video loops
- Forbidden: aggressive animations, flashy effects, visual chaos

## CTA Strategy

CTAs must appear in: Hero, after Menu, after Story, in Location. Copy: "Zobacz menu", "Odwiedź nas", "Wyznacz trasę", "Zarezerwuj stolik". Always match CTA text to section context.

## Current Phase

Starting with a simple HTML/CSS prototype, then moving to full Next.js + design implementation.
