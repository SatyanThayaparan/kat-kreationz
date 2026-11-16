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

1. Clone the repo and enter the project folder:

```bash
git clone https://github.com/SatyanThayaparan/kat-kreationz.git
cd kat-kreationz
```

2. Install [Node.js 20+](https://nodejs.org/).
3. Install dependencies:

```bash
npm install
```

4. Start the dev server:

```bash
npm run dev
```

5. Open the local Vite URL (usually `http://localhost:5173`).

## Usage

- `npm run dev` — local development
- `npm run build` — production build
- `npm run preview` — preview the production build

Booking currently sends a mailto draft; connect a form provider for production delivery.

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
