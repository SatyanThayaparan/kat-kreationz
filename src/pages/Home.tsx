import { LogoMark } from '../components/LogoMark'
import { brand } from '../data/content'
import type { BookPrefill, SectionId } from '../lib/booking'

type HomeProps = {
  onNavigate: (id: SectionId) => void
  onBook: (prefill?: BookPrefill) => void
}

export function Home({ onNavigate, onBook }: HomeProps) {
  return (
    <section id="home" className="section-anchor hero" aria-labelledby="hero-brand">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__content">
        <LogoMark variant="hero" size={240} className="hero__mark rise" alt="" />
        <h1 className="brand-wordmark brand-wordmark--hero rise delay-1" id="hero-brand">
          {brand.name.toUpperCase()}
        </h1>
        <p className="hero__lede rise delay-2">
          Styled with you, not for a trend — arches, plinths, balloons, and soft details for
          celebrations across Whitby, Toronto, and the GTA.
        </p>
        <div className="hero__actions rise delay-3">
          <button type="button" className="btn btn--primary" onClick={() => onBook()}>
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
          onClick={() => onNavigate('work')}
          aria-label="Scroll to our work"
        >
          <span className="scroll-cue__label">Explore</span>
          <span className="scroll-cue__chevron" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
