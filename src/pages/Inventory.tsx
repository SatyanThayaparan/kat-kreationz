import { inventory } from '../data/content'
import { prefillFromInventory } from '../lib/booking'
import type { BookPrefill } from '../lib/booking'

const categories = [...new Set(inventory.map((item) => item.category))]

type InventoryProps = {
  onBook: (prefill?: BookPrefill) => void
}

export function Inventory({ onBook }: InventoryProps) {
  return (
    <section id="inventory" className="page section-anchor" aria-labelledby="inventory-heading">
      <header className="page-header page-header--open content-width">
        <h2 id="inventory-heading" className="section-title">
          Inventory
        </h2>
        <p className="section-copy">
          Pieces available for styled events. Add the ones you want to your inquiry — we&apos;ll
          confirm finishes, quantities, and timing together.
        </p>
      </header>

      <div className="inventory-stage content-width">
        {categories.map((category, groupIndex) => {
          const items = inventory.filter((item) => item.category === category)
          const layout =
            items.length === 1
              ? 'inventory-band--solo'
              : items.length === 2
                ? 'inventory-band--pair'
                : 'inventory-band--grid'

          return (
            <section
              key={category}
              className={`inventory-band ${layout}`}
              aria-labelledby={`inventory-cat-${groupIndex}`}
            >
              <h3 className="inventory-band__title" id={`inventory-cat-${groupIndex}`}>
                {category}
              </h3>
              <ul className="inventory-mosaic">
                {items.map((item, itemIndex) => (
                  <li
                    key={item.id}
                    className={`inventory-tile inventory-tile--tone-${(itemIndex % 3) + 1}`}
                  >
                    <div className="inventory-tile__media">
                      <img
                        src={item.src}
                        alt={item.alt}
                        width={640}
                        height={480}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="inventory-tile__body">
                      <h4>{item.name}</h4>
                      <p className="inventory-item__blurb">{item.blurb}</p>
                      <p className="inventory-item__meta">
                        <span>{item.size}</span>
                        <span>{item.finish}</span>
                      </p>
                      <button
                        type="button"
                        className="btn btn--secondary inventory-tile__book"
                        onClick={() => onBook(prefillFromInventory(item))}
                      >
                        Add to inquiry
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      <p className="page-cta page-cta--open content-width">
        Ready to reserve a look?{' '}
        <button
          type="button"
          className="text-link text-link--button"
          onClick={() => onBook()}
        >
          Book now
        </button>
      </p>
    </section>
  )
}
