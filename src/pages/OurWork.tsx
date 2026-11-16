import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { inventoryForPiece, workPieces } from '../data/content'
import { lockPageScroll, unlockPageScroll } from '../lib/scrollLock'

const COUNT = workPieces.length
const LAST = COUNT - 1

export function OurWork() {
  const labelId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const ignoreScroll = useRef(false)
  const pendingOpen = useRef(false)
  const cloneTimer = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const isOpen = activeIndex !== null

  const loopSlides = useMemo(
    () => [
      { ...workPieces[LAST], key: `${workPieces[LAST].id}-clone-start` },
      ...workPieces.map((piece) => ({ ...piece, key: piece.id })),
      { ...workPieces[0], key: `${workPieces[0].id}-clone-end` },
    ],
    [],
  )

  function widthOf() {
    return trackRef.current?.clientWidth ?? 0
  }

  function jumpToLogical(index: number) {
    const track = trackRef.current
    const width = widthOf()
    if (!track || width <= 0) return
    ignoreScroll.current = true
    track.scrollTo({ left: (index + 1) * width, behavior: 'auto' })
    requestAnimationFrame(() => {
      ignoreScroll.current = false
    })
  }

  function normalizeClones() {
    const track = trackRef.current
    const width = widthOf()
    if (!track || width <= 0) return

    const position = Math.round(track.scrollLeft / width)

    if (position <= 0) {
      jumpToLogical(LAST)
      setActiveIndex(LAST)
      return
    }

    if (position >= COUNT + 1) {
      jumpToLogical(0)
      setActiveIndex(0)
      return
    }

    const logical = position - 1
    setActiveIndex((current) => (current === logical ? current : logical))
  }

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) dialog.showModal()
      lockPageScroll()
      return () => unlockPageScroll()
    }

    if (dialog.open) dialog.close()
  }, [isOpen])

  useEffect(() => {
    if (activeIndex === null || !pendingOpen.current) return
    const track = trackRef.current
    const dialog = dialogRef.current
    if (!track || !dialog) return

    let cancelled = false
    let attempts = 0

    const place = () => {
      if (cancelled) return
      if (!dialog.open || track.clientWidth === 0) {
        if (attempts++ < 24) requestAnimationFrame(place)
        return
      }
      jumpToLogical(activeIndex)
      pendingOpen.current = false
    }

    const frame = requestAnimationFrame(() => requestAnimationFrame(place))
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [activeIndex])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onScrollEnd = () => {
      if (ignoreScroll.current) return
      normalizeClones()
    }

    track.addEventListener('scrollend', onScrollEnd)
    return () => track.removeEventListener('scrollend', onScrollEnd)
  }, [])

  function openAt(index: number) {
    pendingOpen.current = true
    setActiveIndex(index)
  }

  function closeLightbox() {
    pendingOpen.current = false
    setActiveIndex(null)
  }

  function goNext() {
    if (activeIndex === null) return
    const track = trackRef.current
    const width = widthOf()
    if (!track || width <= 0) return

    if (activeIndex === LAST) {
      setActiveIndex(0)
      track.scrollTo({ left: (COUNT + 1) * width, behavior: 'smooth' })
      return
    }

    setActiveIndex(activeIndex + 1)
    track.scrollTo({ left: (activeIndex + 2) * width, behavior: 'smooth' })
  }

  function goPrev() {
    if (activeIndex === null) return
    const track = trackRef.current
    const width = widthOf()
    if (!track || width <= 0) return

    if (activeIndex === 0) {
      setActiveIndex(LAST)
      track.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }

    setActiveIndex(activeIndex - 1)
    track.scrollTo({ left: activeIndex * width, behavior: 'smooth' })
  }

  function onDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (activeIndex === null) return
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrev()
    }
  }

  function onTrackScroll() {
    if (ignoreScroll.current || activeIndex === null) return
    const track = trackRef.current
    const width = widthOf()
    if (!track || width <= 0) return

    const position = Math.round(track.scrollLeft / width)

    if (position >= 1 && position <= COUNT) {
      const logical = position - 1
      if (logical !== activeIndex) setActiveIndex(logical)
    }

    if (cloneTimer.current !== null) window.clearTimeout(cloneTimer.current)
    if (position <= 0 || position >= COUNT + 1) {
      cloneTimer.current = window.setTimeout(() => {
        if (!ignoreScroll.current) normalizeClones()
      }, 90)
    }
  }

  const activePiece = activeIndex !== null ? workPieces[activeIndex] : null

  return (
    <section id="work" className="page section-anchor work" aria-labelledby="work-heading">
      <header className="page-header page-header--open content-width">
        <h2 id="work-heading" className="section-title">
          Our Work
        </h2>
        <p className="section-copy">
          Real celebrations, styled in collaboration. Open a photo to see the pieces, sizes, and
          finishes behind the look.
        </p>
      </header>

      <ul className="work-grid">
        {workPieces.map((piece, index) => (
          <li key={piece.id} className="work-tile">
            <button
              type="button"
              className="work-tile__button"
              onClick={() => openAt(index)}
              aria-label={`View ${piece.title}`}
            >
              <span className="work-tile__media">
                <img
                  src={piece.src}
                  alt={piece.alt}
                  width={800}
                  height={800}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="work-tile__caption">
                <span className="work-tile__title">{piece.title}</span>
                <span className="work-tile__story">{piece.story}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="work-lightbox"
        aria-labelledby={labelId}
        onClose={closeLightbox}
        onCancel={closeLightbox}
        onKeyDown={onDialogKeyDown}
        onClick={(event) => {
          const target = event.target as HTMLElement
          if (
            target === dialogRef.current ||
            target.classList.contains('work-lightbox__slide') ||
            target.classList.contains('work-lightbox__track')
          ) {
            closeLightbox()
          }
        }}
      >
        <div className="work-lightbox__chrome">
          <div className="work-lightbox__caption">
            <p id={labelId} className="work-lightbox__title">
              {activePiece?.title ?? ''}
            </p>
            <p className="work-lightbox__story">{activePiece?.story ?? ''}</p>
          </div>
          <button
            type="button"
            className="work-lightbox__close"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div
          ref={trackRef}
          className="work-lightbox__track"
          onScroll={onTrackScroll}
          tabIndex={0}
        >
          {loopSlides.map((piece) => {
            const details = inventoryForPiece(piece)
            return (
              <figure key={piece.key} className="work-lightbox__slide">
                <img src={piece.src} alt={piece.alt} decoding="async" />
                {details.length > 0 && (
                  <figcaption className="work-lightbox__details">
                    <p className="work-lightbox__details-label">In this look</p>
                    <ul className="work-lightbox__details-list">
                      {details.map((item) => (
                        <li key={item.id} className="work-lightbox__detail">
                          <span className="work-lightbox__detail-name">{item.name}</span>
                          <span className="work-lightbox__detail-meta">{item.size}</span>
                          <span className="work-lightbox__detail-meta">{item.finish}</span>
                        </li>
                      ))}
                    </ul>
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>

        <div className="work-lightbox__nav">
          <button
            type="button"
            className="work-lightbox__arrow"
            onClick={goPrev}
            aria-label="Previous look"
          >
            ‹
          </button>
          <p className="work-lightbox__count" aria-live="polite">
            {activeIndex !== null ? `${activeIndex + 1} / ${workPieces.length}` : ''}
          </p>
          <button
            type="button"
            className="work-lightbox__arrow"
            onClick={goNext}
            aria-label="Next look"
          >
            ›
          </button>
        </div>
      </dialog>
    </section>
  )
}
