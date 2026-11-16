import { bookingNotes, packages } from '../data/content'
import { prefillFromPackage } from '../lib/booking'
import type { BookPrefill } from '../lib/booking'

type PackagesProps = {
  onBook: (prefill?: BookPrefill) => void
}

const toneClass: Record<string, string> = {
  intimate: 'package--intimate',
  celebration: 'package--celebration',
  signature: 'package--signature',
}

export function Packages({ onBook }: PackagesProps) {
  return (
    <section id="packages" className="page section-anchor" aria-labelledby="packages-heading">
      <header className="page-header page-header--open content-width">
        <h2 id="packages-heading" className="section-title">
          Packages
        </h2>
        <p className="section-copy">
          Starting points you can tailor. Every celebration is collaborative — tell us what matters
          most and we&apos;ll shape the rest.
        </p>
        <p className="section-note">{bookingNotes.leadTime}</p>
        <p className="section-note">{bookingNotes.travel}</p>
      </header>

      <div className="package-list content-width">
        {packages.map((pkg) => (
          <article
            key={pkg.id}
            className={`package glass ${toneClass[pkg.id] ?? ''}${pkg.highlighted ? ' package--highlight' : ''}`}
          >
            {pkg.highlighted && pkg.highlightLabel ? (
              <p className="package__badge">{pkg.highlightLabel}</p>
            ) : null}
            <div className="package__top">
              <h3>{pkg.name}</h3>
              <p className="package__price">{pkg.priceLabel}</p>
            </div>
            <p className="package__fit">{pkg.idealFor}</p>
            <p className="package__summary">{pkg.summary}</p>
            <ul>
              {pkg.includes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => onBook(prefillFromPackage(pkg))}
            >
              Book now
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
