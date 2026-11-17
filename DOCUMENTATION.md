# Kat Kreationz — Documentation

## What this project is

A marketing website for Kat Kreationz event décor. Visitors can browse the brand story, gallery, packages, inventory, and contact options, then send a booking inquiry.

## Tech stack

| Layer | Choice | Why it’s used |
| --- | --- | --- |
| UI | React 19 + TypeScript | Typed components for pages and forms |
| Build tooling | Vite | Fast local dev and production bundling |
| Styling | Custom CSS | Brand look without a heavy UI kit |
| Content | `src/data/content.ts` | Packages, inventory, gallery, and copy in one editable file |
| Hosting | Vercel | Static SPA deploy |
| Booking delivery | mailto / clipboard helpers | No backend form service in the MVP |

## How the logic works

1. **Single-page layout** — `App.tsx` wraps pages in a shared `Layout`. Sections such as home, work, packages, inventory, and info are presented as one scrolling marketing site.
2. **Content first** — Most marketing text and item lists live in `content.ts`, so updating offerings doesn’t require redesigning components.
3. **Book Now prefills** — Choosing a package, inventory item, or gallery look can open the booking form with helpful defaults (`src/lib/booking.ts`).
4. **Inquiry submission** — The form validates basic fields, builds a readable inquiry message, then opens a mail draft and/or copies the message to the clipboard for the business owner to receive.
5. **Contact popup** — A lighter contact path sits beside the fuller booking flow.

## Project map

### `src/` — application code
| Path | Role |
| --- | --- |
| `src/main.tsx` | Vite/React entry: mounts the app |
| `src/App.tsx` | Top-level composition of layout + sections |
| `src/index.css` | Global styles and brand styling tokens |

#### `src/components/` — shared UI chrome
Reusable pieces used across sections: `Layout` (page shell/nav), logo mark, contact icons.

#### `src/pages/` — each marketing section
| File | Role |
| --- | --- |
| `Home.tsx` | Hero / first impression |
| `OurWork.tsx` | Gallery of past looks |
| `Packages.tsx` | Décor package offerings |
| `Inventory.tsx` | Rentable/inventory items |
| `Info.tsx` | Business info / details |
| `BookNow.tsx` | Inquiry form (main conversion flow) |
| `ContactPopup.tsx` | Lighter contact overlay |

#### `src/data/` — editable content
`content.ts` holds packages, inventory, gallery, and copy so non-layout updates stay in one file.

#### `src/lib/` — small helpers
| File | Role |
| --- | --- |
| `booking.ts` | Prefill booking fields and build inquiry text |
| `scrollLock.ts` | Prevents background scroll when popups are open |

#### `src/assets/`
Imported images/icons used by components.

### `public/` — static media & shell
Brand/gallery files and other assets served directly (no bundler transform required).

### Root tooling
| Path | Role |
| --- | --- |
| `package.json` / `vite.config.ts` | Scripts and Vite setup |
| `tsconfig*.json` | TypeScript project settings |
| `vercel.json` | Deploy settings for Vercel |
| `index.html` | HTML shell Vite injects the app into |
| `README.md` / `DOCUMENTATION.md` | Setup + this overview |

## Mental model

This is a **front-end brochure with a smart contact form**. There is no server-side database; the site presents curated content and helps visitors draft an inquiry the owner can answer by email.
