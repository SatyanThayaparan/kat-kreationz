import { Link } from 'react-router-dom'
import { inventory } from '../data/content'

const categories = [...new Set(inventory.map((item) => item.category))]

export function Inventory() {
  return (
    <section className="page" aria-labelledby="inventory-heading">
      <header className="page-header glass glass--quiet glass-enter">
        <p className="eyebrow">Rentals</p>
        <h1 id="inventory-heading" className="section-title">
          Inventory
        </h1>
        <p className="section-copy">
          Sample pieces available for styled events. Share your vision on Book Now and we&apos;ll
          confirm finishes, quantities, and timing together.
        </p>
      </header>

      {categories.map((category, groupIndex) => (
        <div key={category} className="inventory-group">
          <h2 className="inventory-group__title glass-enter glass-enter--delay-1">{category}</h2>
          <ul className="inventory-list">
            {inventory
              .filter((item) => item.category === category)
              .map((item, itemIndex) => {
                const stagger = Math.min(groupIndex * 2 + itemIndex + 2, 5)
                return (
                  <li
                    key={item.id}
                    className={`inventory-item glass glass--quiet glass-enter glass-enter--delay-${stagger}`}
                  >
                    <h3>{item.name}</h3>
                    <p className="inventory-item__blurb">{item.blurb}</p>
                    <p className="inventory-item__note">{item.note}</p>
                  </li>
                )
              })}
          </ul>
        </div>
      ))}

      <p className="page-cta glass glass--quiet glass-enter glass-enter--delay-4">
        Ready to reserve a look?{' '}
        <Link className="text-link" to="/book">
          Start your inquiry
        </Link>
      </p>
    </section>
  )
}
