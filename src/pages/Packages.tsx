import { packages } from '../data/content'

type PackagesProps = {
  onNavigate: (id: 'book' | 'packages' | 'inventory' | 'home') => void
}

const toneClass: Record<string, string> = {
  intimate: 'package--intimate',
  celebration: 'package--celebration',
  signature: 'package--signature',
}

export function Packages({ onNavigate }: PackagesProps) {
  return (
    <section id="packages" className="page section-anchor" aria-labelledby="packages-heading">
      <header className="page-header glass glass--quiet glass-enter">
        <p className="eyebrow">Offerings</p>
        <h2 id="packages-heading" className="section-title">
          Packages
        </h2>
        <p className="section-copy">
          Starting points you can tailor. Every celebration is collaborative — tell us what matters
          most and we&apos;ll shape the rest.
        </p>
      </header>

      <div className="package-list">
        {packages.map((pkg, index) => (
          <article
            key={pkg.id}
            className={`package glass glass-enter glass-enter--delay-${Math.min(index + 1, 5)} ${toneClass[pkg.id] ?? ''}`}
          >
            <h3>{pkg.name}</h3>
            <p className="package__price">{pkg.priceLabel}</p>
            <p className="package__summary">{pkg.summary}</p>
            <ul>
              {pkg.includes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => onNavigate('book')}
            >
              Inquire about {pkg.name}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
