import { NavLink } from 'react-router-dom'
import { brand } from '../data/content'
import { LogoMark } from './LogoMark'
import { PageFade } from './PageFade'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/inventory', label: 'Inventory', end: false },
  { to: '/packages', label: 'Packages', end: false },
  { to: '/book', label: 'Book Now', end: false },
]

function MotifMark({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
      <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.45" opacity="0.35" />
      <path
        d="M48 138 C62 118, 72 94, 78 66 C84 94, 96 118, 118 140"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  )
}

export function Layout() {
  return (
    <div className="site">
      <div className="site-motif" aria-hidden="true">
        <MotifMark className="site-motif__svg" />
        <MotifMark className="site-motif__svg site-motif__svg--accent" />
      </div>

      <div className="shell">
        <div className="shell-bar">
          <header className="site-header">
            <NavLink to="/" className="brand-lockup" aria-label={`${brand.name} home`}>
              <LogoMark size={42} />
              <span className="brand-lockup__text">{brand.name}</span>
            </NavLink>
            <nav className="site-nav" aria-label="Primary">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    isActive ? 'site-nav__link is-active' : 'site-nav__link'
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </header>
        </div>

        {/* Static under-nav fade — avoids mask-image on the scrolling container */}
        <div className="shell-scroll-veil" aria-hidden="true" />

        <div className="shell-scroll">
          <main className="site-main">
            <PageFade />
          </main>

          <footer className="site-footer glass">
            <div className="site-footer__brand">
              <LogoMark size={56} />
              <div>
                <p className="brand-script site-footer__title">{brand.name.toLowerCase()} team</p>
                <p className="eyebrow">{brand.tagline}</p>
              </div>
            </div>
            <div className="site-footer__meta">
              <a href={`tel:${brand.phoneTel}`}>Phone: {brand.phoneDisplay}</a>
              <a href={brand.instagramUrl} target="_blank" rel="noreferrer">
                Instagram: @{brand.instagram}
              </a>
            </div>
            <p className="site-footer__note">
              Thank you for dreaming with us — we can&apos;t wait to style your next celebration.
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}
