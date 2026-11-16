export const brand = {
  name: 'Kat Kreationz',
  tagline: 'Event Decor',
  phoneDisplay: '613-793-2975',
  phoneTel: '6137932975',
  instagram: 'kat_kreationz',
  instagramUrl: 'https://www.instagram.com/kat_kreationz/',
  inquiryEmail: 'hello@katkreationz.example',
  serviceHub: 'Whitby, ON',
  serviceArea: 'Whitby, Durham Region, Toronto & the GTA',
} as const

export type FaqItem = {
  id: string
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    id: 'service-range',
    question: 'What is your service range?',
    answer:
      'We’re based in Whitby and style celebrations across Durham Region, Toronto, and the GTA. Travel may apply outside Whitby and nearby Durham — share your venue when you inquire and we’ll confirm timing and any travel fee before you book.',
  },
  {
    id: 'book-ahead',
    question: 'How far in advance should I book?',
    answer:
      'Weekends fill first — four to six weeks is a comfortable lead for most celebrations. Larger installs or peak dates may need more time. If your date is soon, still reach out; we can often find a window.',
  },
  {
    id: 'setup-pickup',
    question: 'Do you set up and pick up?',
    answer:
      'Yes. Setup is included with a minimum two-hour window so we can place, style, and refine on site. We schedule equipment pickup after your event so you can enjoy the look without teardown stress.',
  },
  {
    id: 'custom-colors',
    question: 'Can we choose our own colors and inspiration?',
    answer:
      'Absolutely. Every color story is collaborative — send palette ideas, venue photos, or mood boards when you book. We shape arches, balloons, and accents around your day, not a fixed trend.',
  },
  {
    id: 'packages-custom',
    question: 'Are packages fixed, or can we customize?',
    answer:
      'Packages are starting points. You can mix inventory pieces, swap accents, or build a Signature quote around your venue flow. Tell us what matters most and we’ll tailor the rest.',
  },
  {
    id: 'outdoor',
    question: 'Do you style outdoor venues?',
    answer:
      'Yes, when the space allows safe install and weather is workable. Outdoor looks may need weighted bases, wind-friendly choices, or a backup plan. We’ll flag anything that could affect balloons or textiles once we know the site.',
  },
]

export type PolicyItem = {
  id: string
  title: string
  body: string
}

export const policies: PolicyItem[] = [
  {
    id: 'booking',
    title: 'Booking & holds',
    body: 'A date is held once we confirm availability and you accept the quote details in writing. Until then, inquiries are requests — popular weekends can move quickly.',
  },
  {
    id: 'cancellation',
    title: 'Cancellation',
    body: 'If plans change, tell us as early as you can. Cancellation terms are confirmed with your quote so expectations stay clear for both sides.',
  },
  {
    id: 'setup',
    title: 'Setup window',
    body: 'Setup requires a minimum two-hour on-site window with clear access to the install space. Delayed venue access may shorten styling time or shift the schedule.',
  },
  {
    id: 'weather',
    title: 'Weather & outdoors',
    body: 'Outdoor installs depend on safe conditions. High wind, heavy rain, or extreme heat may require design changes, relocation, or rescheduling when possible.',
  },
  {
    id: 'care',
    title: 'Care of rentals',
    body: 'Client-facing pieces should stay as styled until pickup. Lost, damaged, or heavily soiled items may incur a repair or replacement fee outlined before your event.',
  },
  {
    id: 'balloons',
    title: 'Balloons & allergies',
    body: 'Balloon designs may include latex and foil. Share allergy or scent concerns when you inquire so we can plan safer alternatives where we can.',
  },
]

export type InventoryItem = {
  id: string
  name: string
  category: string
  blurb: string
  size: string
  finish: string
  src: string
  alt: string
}

export const inventory: InventoryItem[] = [
  {
    id: 'arch-classic',
    name: 'Classic Backdrop Arch',
    category: 'Arches',
    blurb: 'Clean curved frame for florals, fabric, or balloon styling.',
    size: 'Approx. 7–8 ft wide · 7 ft tall',
    finish: 'Gold mesh or white frame — confirm finish when you book',
    src: '/gallery/happy-birthday-mesh-gold.jpg',
    alt: 'Classic curved backdrop arch styled with balloons and neon signage',
  },
  {
    id: 'arch-double',
    name: 'Double Ring Arch',
    category: 'Arches',
    blurb: 'Layered circular silhouette for ceremony and photo moments.',
    size: 'Approx. 6–7 ft diameter rings',
    finish: 'Gold hoop pair — nest or stagger on site',
    src: '/gallery/happy-birthday-teal-gold.jpg',
    alt: 'Double ring arch with teal and gold balloon cascade',
  },
  {
    id: 'plinth-set',
    name: 'Plinth Set (3)',
    category: 'Plinths',
    blurb: 'Mixed-height pedestals for cakes, florals, or statement pieces.',
    size: 'Set of 3 · roughly 24 / 30 / 36 in tall',
    finish: 'White matte cylinders — available as singles or the full set',
    src: '/gallery/oh-baby-gender-reveal.jpg',
    alt: 'White plinths styled with cake and balloon accents',
  },
  {
    id: 'plinth-tall',
    name: 'Tall Column Plinth',
    category: 'Plinths',
    blurb: 'Slender column for entry styling or flanking an arch.',
    size: 'Approx. 40–48 in tall',
    finish: 'White matte column — pair with florals or neon',
    src: '/gallery/40th-pastel-circle.jpg',
    alt: 'Tall pedestal styling beside a circular backdrop',
  },
  {
    id: 'balloon-organic',
    name: 'Organic Balloon Garland Kit',
    category: 'Balloons',
    blurb: 'Custom color story for soft, sculptural balloon moments.',
    size: 'Garland runs roughly 6–12 ft depending on design',
    finish: 'Latex + foil mix — exact colors chosen when you book',
    src: '/gallery/blush-pampas-highchair.jpg',
    alt: 'Organic balloon garland in blush tones with floral accents',
  },
  {
    id: 'linen-soft',
    name: 'Soft Drape Panels',
    category: 'Textiles',
    blurb: 'Lightweight panels to soften a wall, arch, or sweetheart table.',
    size: 'Panels roughly 8–10 ft drop — length confirmed per venue',
    finish: 'Ivory chiffon-style drape — pair with arches or neon',
    src: '/gallery/mila-first-birthday.jpg',
    alt: 'Soft draped backdrop with balloon arches and neon signage',
  },
  {
    id: 'hedge-wall',
    name: 'Hedge Wall Panel',
    category: 'Backdrops',
    blurb: 'Lush greenery wall for names, neon, and photo moments.',
    size: 'Approx. 8 ft wide · 7–8 ft tall (panel runs vary)',
    finish: 'Boxwood-style hedge — pair with balloons or script names',
    src: '/gallery/anera-ahana-hedge.jpg',
    alt: 'Greenery hedge wall styled with balloons and wooden names',
  },
  {
    id: 'neon-sign',
    name: 'Neon Sign Accent',
    category: 'Lighting',
    blurb: 'Glow wording for welcome walls, cake tables, and photo corners.',
    size: 'Typically 2–4 ft wide depending on phrase',
    finish: 'LED neon-style sign — phrase options confirmed on inquiry',
    src: '/gallery/happy-birthday-mesh-gold.jpg',
    alt: 'Neon Happy Birthday sign on a styled backdrop',
  },
  {
    id: 'marquee-numbers',
    name: 'Marquee Numbers',
    category: 'Lighting',
    blurb: 'Lit numerals for milestone birthdays and age moments.',
    size: 'Approx. 3–4 ft tall per digit',
    finish: 'Warm white marquee bulbs — available as singles or pairs',
    src: '/gallery/40th-black-gold-marble.jpg',
    alt: 'Illuminated marquee numbers in a black and gold balloon wall',
  },
]

export const archOptions = [
  ...inventory.filter((item) => item.category === 'Arches').map((item) => item.name),
  'Other / not sure yet',
] as const

export type EventType = 'birthday' | 'baby' | 'milestone'

export const eventTypeLabels: Record<EventType | 'all', string> = {
  all: 'All',
  birthday: 'Birthday',
  baby: 'Baby',
  milestone: 'Milestone',
}

export type WorkPiece = {
  id: string
  src: string
  alt: string
  title: string
  story: string
  eventType: EventType
  /** Inventory pieces featured in this look — shown in the lightbox for now. */
  inventoryIds: string[]
  featured?: boolean
}

/** Portfolio moments — full-color work held in brand chrome. */
export const workPieces: WorkPiece[] = [
  {
    id: 'mesh-gold-birthday',
    src: '/gallery/happy-birthday-mesh-gold.jpg',
    alt: 'Circular gold mesh backdrop with Happy Birthday neon and dusty rose balloon clusters',
    title: 'First birthday welcome',
    story: 'Dusty rose · powder blue · gold',
    eventType: 'birthday',
    inventoryIds: ['arch-classic', 'balloon-organic', 'neon-sign'],
    featured: true,
  },
  {
    id: 'mila-first',
    src: '/gallery/mila-first-birthday.jpg',
    alt: 'White circular backdrop with purple neon Happy Birthday, pampas, and blush balloon arches',
    title: 'Mila turns one',
    story: 'Blush · mauve · pampas',
    eventType: 'birthday',
    inventoryIds: ['linen-soft', 'balloon-organic', 'arch-classic', 'neon-sign'],
  },
  {
    id: 'anera-ahana',
    src: '/gallery/anera-ahana-hedge.jpg',
    alt: 'Grass wall with wooden script names, rose gold balloons, and butterfly accents',
    title: 'Anera & Ahana',
    story: 'Hedge wall · rose gold · blush',
    eventType: 'birthday',
    inventoryIds: ['hedge-wall', 'balloon-organic'],
  },
  {
    id: 'blush-highchair',
    src: '/gallery/blush-pampas-highchair.jpg',
    alt: 'High chair styled for a first birthday with pink balloon arch and neon Happy Birthday',
    title: 'Sweetheart high chair',
    story: 'Pink cascade · florals · neon',
    eventType: 'birthday',
    inventoryIds: ['balloon-organic', 'neon-sign'],
  },
  {
    id: '40th-pastel',
    src: '/gallery/40th-pastel-circle.jpg',
    alt: 'Gold circular frame with Happy 40th Birthday Amma sign and soft blue peach balloon garland',
    title: 'Happy 40th, Amma',
    story: 'Peach · sky blue · sand',
    eventType: 'milestone',
    inventoryIds: ['arch-double', 'balloon-organic', 'plinth-tall'],
  },
  {
    id: '40th-marble',
    src: '/gallery/40th-black-gold-marble.jpg',
    alt: 'Black gold and marble balloon wall with illuminated 40 marquee numbers',
    title: 'Forty in marble & gold',
    story: 'Black · marble · metallic gold',
    eventType: 'milestone',
    inventoryIds: ['balloon-organic', 'marquee-numbers'],
  },
  {
    id: 'teal-gold',
    src: '/gallery/happy-birthday-teal-gold.jpg',
    alt: 'Gold mesh circle with blue neon Happy Birthday and teal gold balloon cascade',
    title: 'Teal & gold cascade',
    story: 'Periwinkle · teal · gold',
    eventType: 'birthday',
    inventoryIds: ['arch-double', 'balloon-organic', 'neon-sign'],
  },
  {
    id: 'oh-baby',
    src: '/gallery/oh-baby-gender-reveal.jpg',
    alt: 'Oh Baby neon over hedge wall with white cake and pink and navy balloons',
    title: 'Girl or boy?',
    story: 'White · blush · navy',
    eventType: 'baby',
    inventoryIds: ['hedge-wall', 'plinth-set', 'balloon-organic', 'neon-sign'],
  },
]

export function inventoryForPiece(piece: WorkPiece): InventoryItem[] {
  return piece.inventoryIds
    .map((id) => inventory.find((item) => item.id === id))
    .filter((item): item is InventoryItem => Boolean(item))
}

export type PackageOffer = {
  id: string
  name: string
  summary: string
  includes: string[]
  idealFor: string
  priceLabel: string
  highlighted?: boolean
  highlightLabel?: string
}

export const packages: PackageOffer[] = [
  {
    id: 'intimate',
    name: 'Intimate Moment',
    summary: 'A focused statement piece for smaller gatherings and photo corners.',
    includes: ['One arch or backdrop', 'Two plinths', 'Soft balloon accent (optional)', 'Setup (min. 2 hrs)'],
    idealFor: 'Showers, dinners, intimate birthdays',
    priceLabel: 'From $350',
  },
  {
    id: 'celebration',
    name: 'Celebration Suite',
    summary: 'A fuller welcome look with layered height and color.',
    includes: [
      'Primary arch styling',
      'Plinth trio',
      'Custom balloon color story',
      'Setup + scheduled pickup window',
    ],
    idealFor: 'Birthdays, engagements, milestone parties',
    priceLabel: 'From $650',
    highlighted: true,
    highlightLabel: 'Most booked',
  },
  {
    id: 'signature',
    name: 'Signature Event',
    summary: 'Collaborative styling built around your inspiration and venue flow.',
    includes: [
      'Custom arch + textile plan',
      'Plinths & accent rentals',
      'Full balloon design',
      'Extended setup window as needed',
      'Post-event equipment pickup',
    ],
    idealFor: 'Weddings, corporate welcomes, styled shoots',
    priceLabel: 'Custom quote',
  },
]

export type Testimonial = {
  id: string
  quote: string
  name: string
  detail: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Kat made our daughter’s first birthday feel so personal — the colors, the neon, everything landed exactly how we hoped.',
    name: 'Priya',
    detail: 'First birthday · Whitby',
  },
  {
    id: 't2',
    quote:
      'From the inquiry to pickup, it was easy. Guests kept asking who styled the backdrop.',
    name: 'Amma’s family',
    detail: '40th birthday · GTA',
  },
  {
    id: 't3',
    quote:
      'We wanted soft and sculptural, not trendy. She listened and built the look with us.',
    name: 'Jordan',
    detail: 'Baby shower · Durham',
  },
]

export const bookingNotes = {
  leadTime: 'Peak weekends fill first — four to six weeks is a comfortable lead.',
  travel: 'Based in Whitby; travel may apply across Toronto and the wider GTA.',
} as const
