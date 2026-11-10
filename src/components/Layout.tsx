import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { InstagramIcon, PhoneIcon } from './ContactIcons'
import { LogoMark } from './LogoMark'
import { brand } from '../data/content'
import { BookNow } from '../pages/BookNow'
import { Home } from '../pages/Home'
import { Inventory } from '../pages/Inventory'
import { Packages } from '../pages/Packages'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'packages', label: 'Packages' },
  { id: 'book', label: 'Book Now' },
] as const

type SectionId = (typeof links)[number]['id']

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
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<SectionId>('home')

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return

    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
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
  }, [])

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as SectionId | ''
    if (!hash || !links.some((link) => link.id === hash)) return
    const frame = window.requestAnimationFrame(() => {
      scrollToSection(hash, 'auto')
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  function scrollToSection(id: SectionId, behavior: ScrollBehavior = 'smooth') {
    const root = scrollRef.current
    const target = document.getElementById(id)
    if (!root || !target) return
    const top = target.offsetTop - 12
    root.scrollTo({ top, behavior })
    window.history.replaceState(null, '', `#${id}`)
    setActive(id)
  }

  function onNavClick(event: MouseEvent<HTMLAnchorElement>, id: SectionId) {
    event.preventDefault()
    scrollToSection(id)
  }

  return (
    <div className="site">
      <div className="site-motif" aria-hidden="true">
        <MotifMark className="site-motif__svg" />
        <MotifMark className="site-motif__svg site-motif__svg--accent" />
      </div>

      <div className="shell">
        <div className="shell-bar">
          <header className="site-header">
            <a
              href="#home"
              className="brand-lockup"
              aria-label={`${brand.name} home`}
              onClick={(event) => onNavClick(event, 'home')}
            >
              <LogoMark size={42} />
              <span className="brand-lockup__text">{brand.name}</span>
            </a>
            <nav className="site-nav" aria-label="Primary">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={
                    active === link.id ? 'site-nav__link is-active' : 'site-nav__link'
                  }
                  onClick={(event) => onNavClick(event, link.id)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </header>
        </div>

        {/* Static under-nav fade — avoids mask-image on the scrolling container */}
        <div className="shell-scroll-veil" aria-hidden="true" />

        <div className="shell-scroll" ref={scrollRef}>
          <main className="site-main">
            <div className="page-fade">
              <Home onNavigate={scrollToSection} />
              <Inventory onNavigate={scrollToSection} />
              <Packages onNavigate={scrollToSection} />
              <BookNow />
            </div>
          </main>

          <footer className="site-footer glass">
            <div className="site-footer__brand">
              <LogoMark size={56} />
              <div>
                <p className="brand-script site-footer__title">{brand.name.toLowerCase()}</p>
                <p className="eyebrow">{brand.tagline}</p>
              </div>
            </div>
            <div className="site-footer__meta">
              <a href={`tel:${brand.phoneTel}`} className="contact-chip">
                <PhoneIcon />
                <span>{brand.phoneDisplay}</span>
              </a>
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="contact-chip"
              >
                <InstagramIcon />
                <span>@{brand.instagram}</span>
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
