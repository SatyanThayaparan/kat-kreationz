export const brand = {
  name: 'Kat Kreationz',
  tagline: 'Event Decor',
  phoneDisplay: '613-793-2975',
  phoneTel: '6137932975',
  instagram: 'kat_kreationz',
  instagramUrl: 'https://www.instagram.com/kat_kreationz/',
  inquiryEmail: 'hello@katkreationz.example',
} as const

export type InventoryItem = {
  id: string
  name: string
  category: string
  blurb: string
  note: string
}

export const inventory: InventoryItem[] = [
  {
    id: 'arch-classic',
    name: 'Classic Backdrop Arch',
    category: 'Arches',
    blurb: 'Clean curved frame for florals, fabric, or balloon styling.',
    note: 'Sample listing — confirm sizes on inquiry',
  },
  {
    id: 'arch-double',
    name: 'Double Ring Arch',
    category: 'Arches',
    blurb: 'Layered circular silhouette for ceremony and photo moments.',
    note: 'Sample listing — confirm sizes on inquiry',
  },
  {
    id: 'plinth-set',
    name: 'Plinth Set (3)',
    category: 'Plinths',
    blurb: 'Mixed-height pedestals for cakes, florals, or statement pieces.',
    note: 'Sample listing — available as singles or sets',
  },
  {
    id: 'plinth-tall',
    name: 'Tall Column Plinth',
    category: 'Plinths',
    blurb: 'Slender column for entry styling or flanking an arch.',
    note: 'Sample listing — finish options on request',
  },
  {
    id: 'balloon-organic',
    name: 'Organic Balloon Garland Kit',
    category: 'Balloons',
    blurb: 'Custom color story for soft, sculptural balloon moments.',
    note: 'Sample listing — colors chosen on Book Now',
  },
  {
    id: 'linen-soft',
    name: 'Soft Drape Panels',
    category: 'Textiles',
    blurb: 'Lightweight panels to soften a wall, arch, or sweetheart table.',
    note: 'Sample listing — length confirmed per venue',
  },
]

export type PackageOffer = {
  id: string
  name: string
  summary: string
  includes: string[]
  idealFor: string
  priceLabel: string
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
