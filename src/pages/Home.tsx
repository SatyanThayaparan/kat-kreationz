import { Link } from 'react-router-dom'
import { LogoMark } from '../components/LogoMark'
import { brand } from '../data/content'

export function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-brand">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__botanical" aria-hidden="true" />
        <div className="hero__botanical hero__botanical--right" aria-hidden="true" />
        <div className="hero__content">
          <LogoMark size={132} className="hero__mark rise" />
          <p className="brand-wordmark rise delay-1" id="hero-brand">
            {brand.name.toUpperCase()}
          </p>
          <h1 className="brand-script rise delay-2">{brand.name.toLowerCase()} team</h1>
          <p className="hero__lede rise delay-3">
            Thoughtful event decor — arches, plinths, balloons, and soft details styled with care for
            your celebration.
          </p>
          <div className="hero__actions rise delay-4">
            <Link className="btn btn--primary" to="/book">
              Book Now
            </Link>
            <Link className="btn btn--ghost" to="/packages">
              View packages
            </Link>
          </div>
        </div>
      </section>

      <div className="band-wrap">
        <section
          className="band glass glass--panel glass-enter glass-enter--delay-2"
          aria-labelledby="welcome-heading"
        >
          <p className="eyebrow">Welcome</p>
          <h2 id="welcome-heading" className="section-title">
            Decor that feels personal
          </h2>
          <p className="section-copy">
            Hi, we&apos;re {brand.name}. We collaborate closely on color, silhouette, and timing so
            your space feels warm, intentional, and wholly yours — never cookie-cutter.
          </p>
          <div className="home-links">
            <Link to="/inventory" className="text-link">
              Browse inventory
            </Link>
            <span aria-hidden="true">·</span>
            <a href={`tel:${brand.phoneTel}`} className="text-link">
              Call {brand.phoneDisplay}
            </a>
            <span aria-hidden="true">·</span>
            <a href={brand.instagramUrl} className="text-link" target="_blank" rel="noreferrer">
              @{brand.instagram}
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
