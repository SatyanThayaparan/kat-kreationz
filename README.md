# Kat Kreationz

Marketing site for Kat Kreationz event décor — packages, inventory, gallery, and booking inquiries.

## Features

- Full-bleed marketing pages for home, packages, inventory, and gallery
- Book Now inquiry flow with validation, mailto draft, and clipboard copy
- Brand-forward UI built for desktop and mobile

## Tech stack

- React 19
- TypeScript
- Vite
- CSS

## Setup

1. Install Node.js 20+.
2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

## Usage

- `npm run dev` — local development
- `npm run build` — production build
- `npm run preview` — preview the production build

Open the local Vite URL (usually `http://localhost:5173`) to browse the site. Booking currently sends a mailto draft; connect a form provider for production delivery.

## Project structure

```text
src/
├── components/   # shared UI
├── pages/        # route sections
├── data/         # site content
└── index.css     # global styles
public/           # brand assets and gallery media
```

## Notes

- Frontend-only MVP: inquiry attachments store filenames, not uploaded files.
