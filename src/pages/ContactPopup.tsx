import { useEffect, useId, useRef } from 'react'
import { EmailIcon, InstagramIcon, PhoneIcon } from '../components/ContactIcons'
import { brand } from '../data/content'
import { lockPageScroll, unlockPageScroll } from '../lib/scrollLock'

type ContactPopupProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactPopup({ open, onOpenChange }: ContactPopupProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) dialog.showModal()
      lockPageScroll()
      return () => unlockPageScroll()
    }

    if (dialog.open) dialog.close()
  }, [open])

  function close() {
    onOpenChange(false)
  }

  return (
    <dialog
      ref={dialogRef}
      className="contact-lightbox"
      aria-labelledby={titleId}
      onClose={close}
      onCancel={close}
      onClick={(event) => {
        if (event.target === dialogRef.current) close()
      }}
    >
      <button
        type="button"
        className="contact-lightbox__close"
        onClick={close}
        aria-label="Close contact"
      >
        <span aria-hidden="true">×</span>
      </button>

      <div className="contact-lightbox__inner">
        <h2 id={titleId} className="contact-lightbox__title">
          Contact
        </h2>
        <p className="contact-lightbox__copy">
          Whitby · Toronto · the GTA
        </p>

        <ul className="contact-lightbox__list">
          <li>
            <a href={`tel:${brand.phoneTel}`} className="contact-lightbox__link">
              <PhoneIcon />
              <span>{brand.phoneDisplay}</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${brand.inquiryEmail}`} className="contact-lightbox__link">
              <EmailIcon />
              <span>{brand.inquiryEmail}</span>
            </a>
          </li>
          <li>
            <a
              href={brand.instagramUrl}
              className="contact-lightbox__link"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
              <span>@{brand.instagram}</span>
            </a>
          </li>
        </ul>
      </div>
    </dialog>
  )
}
