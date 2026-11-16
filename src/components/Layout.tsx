import { useEffect, useId, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { LogoMark } from './LogoMark'
import { brand } from '../data/content'
import type { BookPrefill, SectionId } from '../lib/booking'
import { BookNow } from '../pages/BookNow'
import { ContactPopup } from '../pages/ContactPopup'
import { Home } from '../pages/Home'
import { Info } from '../pages/Info'
import { OurWork } from '../pages/OurWork'
import { Packages } from '../pages/Packages'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Our Work' },
  { id: 'packages', label: 'Packages' },
  { id: 'info', label: 'Info' },
  { id: 'contact', label: 'Contact' },
  { id: 'book', label: 'Book Now' },
] as const satisfies ReadonlyArray<{ id: SectionId; label: string }>

const scrollLinks = links.filter((link) => link.id !== 'book' && link.id !== 'contact')

function MotifMark({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="100" cy="96" rx="78" ry="76" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="102" cy="98" rx="66" ry="64" stroke="currentColor" strokeWidth="0.65" opacity="0.55" />
      <ellipse cx="98" cy="95" rx="52" ry="50" stroke="currentColor" strokeWidth="0.45" opacity="0.35" />
      <path
        d="M42 156 C50 132, 58 108, 68 84 M52 158 C58 136, 70 114, 82 96 M34 148 C46 130, 56 112, 64 98"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M78 52 C80 78, 82 104, 84 130 C94 108, 108 86, 128 66 C110 92, 98 116, 92 138"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  )
}

export function Layout() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const navId = useId()
  const [active, setActive] = useState<SectionId>('home')
  const [bookOpen, setBookOpen] = useState(false)
  const [bookPrefill, setBookPrefill] = useState<BookPrefill | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return

    const sections = scrollLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        if (bookOpen || contactOpen) return
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (top?.target.id) {
          setActive(top.target.id as SectionId)
        }
      },
      {
        root,
        rootMargin: '-18% 0px -55% 0px',
        threshold: [0.08, 0.2, 0.4, 0.6],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [bookOpen, contactOpen])

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as SectionId | ''
    if (!hash || !links.some((link) => link.id === hash)) return
    const frame = window.requestAnimationFrame(() => {
      scrollToSection(hash, 'auto')
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!navOpen) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setNavOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navOpen])

  function openBook(prefill?: BookPrefill) {
    setContactOpen(false)
    setBookPrefill(prefill ?? null)
    setBookOpen(true)
    setActive('book')
    setNavOpen(false)
    window.history.replaceState(null, '', '#book')
  }

  function closeBook() {
    setBookOpen(false)
    setBookPrefill(null)
    if (window.location.hash === '#book') {
      window.history.replaceState(null, '', '#home')
    }
  }

  function openContact() {
    setBookOpen(false)
    setBookPrefill(null)
    setContactOpen(true)
    setActive('contact')
    setNavOpen(false)
    window.history.replaceState(null, '', '#contact')
  }

  function closeContact() {
    setContactOpen(false)
    if (window.location.hash === '#contact') {
      window.history.replaceState(null, '', '#home')
    }
  }

  function scrollToSection(id: SectionId, behavior: ScrollBehavior = 'smooth') {
    if (id === 'book') {
      openBook()
      return
    }
    if (id === 'contact') {
      openContact()
      return
    }

    const root = scrollRef.current
    const target = document.getElementById(id)
    if (!root || !target) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = target.offsetTop - 12
    root.scrollTo({ top, behavior: reduce ? 'auto' : behavior })
    window.history.replaceState(null, '', `#${id}`)
    setActive(id)
    setNavOpen(false)
  }

  function onNavClick(event: MouseEvent<HTMLAnchorElement>, id: SectionId) {
    event.preventDefault()
    scrollToSection(id)
  }

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="balloon-arch" aria-hidden="true">
        <div className="balloon-arch__flow" />
        <div className="balloon-arch__cluster">
          {Array.from({ length: 10 }, (_, index) => (
            <span key={index} className={`balloon-arch__orb balloon-arch__orb--${index + 1}`} />
          ))}
        </div>
      </div>

      <div className="site-motif" aria-hidden="true">
        <MotifMark className="site-motif__svg" />
      </div>

      <div className="shell">
        <div className="shell-bar">
          <header className={`site-header${navOpen ? ' is-nav-open' : ''}`}>
            <a
              href="#home"
              className="brand-lockup"
              aria-label={`${brand.name} home`}
              onClick={(event) => onNavClick(event, 'home')}
            >
              <LogoMark size={48} />
              <span className="brand-lockup__text">{brand.name}</span>
            </a>
            <button
              type="button"
              className="site-nav__toggle"
              aria-expanded={navOpen}
              aria-controls={navId}
              onClick={() => setNavOpen((open) => !open)}
            >
              <span className="site-nav__toggle-label">{navOpen ? 'Close' : 'Menu'}</span>
              <span className="site-nav__toggle-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
            <nav
              id={navId}
              className={`site-nav${navOpen ? ' is-open' : ''}`}
              aria-label="Primary"
            >
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={[
                    'site-nav__link',
                    link.id === 'book' ? 'site-nav__link--book' : '',
                    active === link.id ? 'is-active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={active === link.id ? 'true' : undefined}
                  onClick={(event) => onNavClick(event, link.id)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </header>
        </div>

        <div className="shell-scroll-veil" aria-hidden="true" />

        <div className="shell-scroll" ref={scrollRef}>
          <main id="main" className="site-main">
            <div className="page-fade">
              <div className="page-atmosphere" aria-hidden="true" />
              <Home onNavigate={scrollToSection} onBook={openBook} />
              <OurWork />
              <Packages onBook={openBook} />
              <Info />
            </div>
          </main>

          <footer className="site-footer">
            <div className="site-footer__brand content-width">
              <LogoMark size={52} />
              <div>
                <p className="brand-script site-footer__title">{brand.name.toLowerCase()}</p>
                <p className="eyebrow">{brand.tagline}</p>
              </div>
            </div>
            <p className="site-footer__note content-width">
              Thank you for dreaming with us — we can&apos;t wait to style your next celebration.
            </p>
          </footer>
        </div>
      </div>

      <BookNow
        open={bookOpen}
        prefill={bookPrefill}
        onOpenChange={(next) => (next ? openBook() : closeBook())}
      />
      <ContactPopup
        open={contactOpen}
        onOpenChange={(next) => (next ? openContact() : closeContact())}
      />
    </div>
  )
}
