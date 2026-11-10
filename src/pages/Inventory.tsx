import { inventory } from '../data/content'

const categories = [...new Set(inventory.map((item) => item.category))]

type InventoryProps = {
  onNavigate: (id: 'book' | 'packages' | 'inventory' | 'home') => void
}

export function Inventory({ onNavigate }: InventoryProps) {
  return (
    <section id="inventory" className="page section-anchor" aria-labelledby="inventory-heading">
      <header className="page-header glass glass--quiet glass-enter">
        <p className="eyebrow">Rentals</p>
        <h2 id="inventory-heading" className="section-title">
          Inventory
        </h2>
        <p className="section-copy">
          Sample pieces available for styled events. Share your vision on Book Now and we&apos;ll
          confirm finishes, quantities, and timing together.
        </p>
      </header>

      {categories.map((category, groupIndex) => (
        <div
          key={category}
          className={`inventory-group glass glass--quiet glass-enter glass-enter--delay-${Math.min(groupIndex + 1, 5)}`}
        >
          <h3 className="inventory-group__title">{category}</h3>
          <ul className="inventory-list">
            {inventory
              .filter((item) => item.category === category)
              .map((item) => (
                <li key={item.id} className="inventory-item">
                  <h4>{item.name}</h4>
                  <p className="inventory-item__blurb">{item.blurb}</p>
                  <p className="inventory-item__note">{item.note}</p>
                </li>
              ))}
          </ul>
        </div>
      ))}

      <p className="page-cta glass glass--quiet glass-enter glass-enter--delay-4">
        Ready to reserve a look?{' '}
        <button type="button" className="text-link text-link--button" onClick={() => onNavigate('book')}>
          Start your inquiry
        </button>
      </p>
    </section>
  )
}
