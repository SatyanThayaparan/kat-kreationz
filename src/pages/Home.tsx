import { LogoMark } from '../components/LogoMark'
import { brand } from '../data/content'

type HomeProps = {
  onNavigate: (id: 'book' | 'packages' | 'inventory' | 'home') => void
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <section id="home" className="section-anchor" aria-labelledby="hero-brand">
      <div className="hero">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__botanical" aria-hidden="true" />
        <div className="hero__botanical hero__botanical--right" aria-hidden="true" />
        <div className="hero__content">
          <LogoMark size={132} className="hero__mark rise" />
          <h1 className="brand-wordmark brand-wordmark--hero rise delay-1" id="hero-brand">
            {brand.name.toUpperCase()}
          </h1>
          <p className="hero__lede rise delay-2">
            Thoughtful event decor — arches, plinths, balloons, and soft details styled with care for
            your celebration.
          </p>
          <div className="hero__actions rise delay-3">
            <button type="button" className="btn btn--primary" onClick={() => onNavigate('book')}>
              Book Now
            </button>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => onNavigate('packages')}
            >
              View packages
            </button>
          </div>
          <button
            type="button"
            className="scroll-cue rise delay-4"
            onClick={() => onNavigate('inventory')}
            aria-label="Scroll to inventory"
          >
            <span className="scroll-cue__label">Explore</span>
            <span className="scroll-cue__chevron" aria-hidden="true" />
          </button>
        </div>
      </div>

      <section className="welcome welcome--editorial rise delay-2" aria-labelledby="welcome-heading">
        <div className="welcome__orbit" aria-hidden="true" />
        <div className="welcome__inner content-width">
          <p className="welcome__script" aria-hidden="true">
            welcome
          </p>
          <div className="welcome__copy">
            <p className="eyebrow">A note from the studio</p>
            <h2 id="welcome-heading" className="section-title">
              Styled with you, not for a trend
            </h2>
            <p className="section-copy">
              Hi, we&apos;re {brand.name}. We collaborate closely on color, silhouette, and timing so
              your space feels warm, intentional, and wholly yours — never cookie-cutter.
            </p>
          </div>
        </div>
      </section>
    </section>
  )
}
