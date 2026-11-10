import { Link } from 'react-router-dom'
import { packages } from '../data/content'

export function Packages() {
  return (
    <section className="page" aria-labelledby="packages-heading">
      <header className="page-header glass glass--quiet glass-enter">
        <p className="eyebrow">Offerings</p>
        <h1 id="packages-heading" className="section-title">
          Packages
        </h1>
        <p className="section-copy">
          Starting points you can tailor. Every celebration is collaborative — tell us what matters
          most and we&apos;ll shape the rest.
        </p>
      </header>

      <div className="package-list">
        {packages.map((pkg, index) => (
          <article
            key={pkg.id}
            className={`package glass glass-enter glass-enter--delay-${Math.min(index + 1, 5)}`}
          >
            <p className="eyebrow">{pkg.idealFor}</p>
            <h2>{pkg.name}</h2>
            <p className="package__price">{pkg.priceLabel}</p>
            <p className="package__summary">{pkg.summary}</p>
            <ul>
              {pkg.includes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <Link className="btn btn--primary" to="/book">
              Inquire about {pkg.name}
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
