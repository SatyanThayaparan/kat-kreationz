import { InstagramIcon, PhoneIcon } from '../components/ContactIcons'
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
          <p className="brand-wordmark rise delay-1" id="hero-brand">
            {brand.name.toUpperCase()}
          </p>
          <h1 className="brand-script rise delay-2">{brand.name.toLowerCase()}</h1>
          <p className="hero__lede rise delay-3">
            Thoughtful event decor — arches, plinths, balloons, and soft details styled with care for
            your celebration.
          </p>
          <div className="hero__actions rise delay-4">
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

      <div className="band-wrap">
        <section
          className="welcome glass glass--panel glass-enter glass-enter--delay-2"
          aria-labelledby="welcome-heading"
        >
          <div className="welcome__accent" aria-hidden="true" />
          <div className="welcome__body">
            <p className="eyebrow">Welcome</p>
            <h2 id="welcome-heading" className="section-title">
              Decor that feels personal
            </h2>
            <p className="section-copy">
              Hi, we&apos;re {brand.name}. We collaborate closely on color, silhouette, and timing so
              your space feels warm, intentional, and wholly yours — never cookie-cutter.
            </p>
            <div className="home-links">
              <a href={`tel:${brand.phoneTel}`} className="contact-chip contact-chip--soft">
                <PhoneIcon />
                <span>{brand.phoneDisplay}</span>
              </a>
              <a
                href={brand.instagramUrl}
                className="contact-chip contact-chip--soft"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon />
                <span>@{brand.instagram}</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
