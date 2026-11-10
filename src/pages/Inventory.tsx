import { inventory } from '../data/content'

const categories = [...new Set(inventory.map((item) => item.category))]

type InventoryProps = {
  onNavigate: (id: 'book' | 'packages' | 'inventory' | 'home') => void
}

export function Inventory({ onNavigate }: InventoryProps) {
  return (
    <section id="inventory" className="page section-anchor" aria-labelledby="inventory-heading">
      <header className="page-header page-header--open content-width glass-enter">
        <p className="eyebrow">Rentals</p>
        <h2 id="inventory-heading" className="section-title">
          Inventory
        </h2>
        <p className="section-copy">
          Sample pieces available for styled events. Share your vision on Book Now and we&apos;ll
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
              className={`inventory-band ${layout} glass-enter glass-enter--delay-${Math.min(groupIndex + 1, 5)}`}
              aria-labelledby={`inventory-cat-${groupIndex}`}
            >
              <div className="inventory-band__head">
                <span className="inventory-band__index" aria-hidden="true">
                  {String(groupIndex + 1).padStart(2, '0')}
                </span>
                <h3 className="inventory-band__title" id={`inventory-cat-${groupIndex}`}>
                  {category}
                </h3>
              </div>
              <ul className="inventory-mosaic">
                {items.map((item, itemIndex) => (
                  <li
                    key={item.id}
                    className={`inventory-tile inventory-tile--tone-${(itemIndex % 3) + 1}`}
                  >
                    <div className="inventory-tile__accent" aria-hidden="true" />
                    <h4>{item.name}</h4>
                    <p className="inventory-item__blurb">{item.blurb}</p>
                    <p className="inventory-item__note">{item.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      <p className="page-cta page-cta--open content-width glass-enter glass-enter--delay-4">
        Ready to reserve a look?{' '}
        <button type="button" className="text-link text-link--button" onClick={() => onNavigate('book')}>
          Start your inquiry
        </button>
      </p>
    </section>
  )
}
