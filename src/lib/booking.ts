import type { InventoryItem, PackageOffer, WorkPiece } from '../data/content'
import { inventoryForPiece } from '../data/content'

export type BookPrefill = {
  packageId?: string
  packageName?: string
  inventoryId?: string
  inventoryName?: string
  lookTitle?: string
  arch?: string
  plinths?: 'yes' | 'no' | ''
  balloons?: 'yes' | 'no' | ''
  descriptionSeed?: string
}

export type SectionId =
  | 'home'
  | 'work'
  | 'packages'
  | 'info'
  | 'contact'
  | 'book'

export function prefillFromPackage(pkg: PackageOffer): BookPrefill {
  const joined = pkg.includes.join(' ').toLowerCase()
  return {
    packageId: pkg.id,
    packageName: pkg.name,
    descriptionSeed: `I'm interested in the ${pkg.name} package (${pkg.priceLabel}). ${pkg.summary}`,
    plinths: joined.includes('plinth') ? 'yes' : '',
    balloons: joined.includes('balloon') ? 'yes' : '',
  }
}

export function prefillFromInventory(item: InventoryItem): BookPrefill {
  const prefill: BookPrefill = {
    inventoryId: item.id,
    inventoryName: item.name,
    descriptionSeed: `I'd like to include the ${item.name} from inventory.`,
  }

  if (item.category === 'Arches') prefill.arch = item.name
  if (item.category === 'Plinths') prefill.plinths = 'yes'
  if (item.category === 'Balloons') prefill.balloons = 'yes'

  return prefill
}

export function prefillFromLook(piece: WorkPiece): BookPrefill {
  const items = inventoryForPiece(piece)
  const names = items.map((item) => item.name).join(', ')
  const archItem = items.find((item) => item.category === 'Arches')

  return {
    lookTitle: piece.title,
    descriptionSeed: `I'd love a look like "${piece.title}" (${piece.story}). Pieces of interest: ${names || 'custom styling'}.`,
    arch: archItem?.name ?? '',
    plinths: items.some((item) => item.category === 'Plinths') ? 'yes' : '',
    balloons: items.some((item) => item.category === 'Balloons') ? 'yes' : '',
  }
}
