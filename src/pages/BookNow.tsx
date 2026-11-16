import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { archOptions, brand } from '../data/content'
import type { BookPrefill } from '../lib/booking'
import { lockPageScroll, unlockPageScroll } from '../lib/scrollLock'

function todayIsoDate() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function phoneDigits(value: string) {
  return value.replace(/\D/g, '')
}

type FormState = {
  name: string
  email: string
  phone: string
  eventDate: string
  location: string
  description: string
  arch: string
  plinths: 'yes' | 'no' | ''
  balloons: 'yes' | 'no' | ''
  balloonColors: string
  setupTime: string
  pickupTime: string
  interest: string
}

const initial: FormState = {
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  location: '',
  description: '',
  arch: '',
  plinths: '',
  balloons: '',
  balloonColors: '',
  setupTime: '',
  pickupTime: '',
  interest: '',
}

function interestLabel(prefill: BookPrefill | null | undefined) {
  if (!prefill) return ''
  if (prefill.lookTitle) return `Look: ${prefill.lookTitle}`
  if (prefill.packageName) return `Package: ${prefill.packageName}`
  if (prefill.inventoryName) return `Inventory: ${prefill.inventoryName}`
  return ''
}

function applyPrefill(prefill: BookPrefill | null | undefined): Partial<FormState> {
  if (!prefill) return {}
  return {
    interest: interestLabel(prefill),
    description: prefill.descriptionSeed ?? '',
    arch: prefill.arch ?? '',
    plinths: prefill.plinths ?? '',
    balloons: prefill.balloons ?? '',
  }
}

function buildInquiryText(data: FormState, files: string[]) {
  return [
    `Kat Kreationz event inquiry`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Event date: ${data.eventDate}`,
    `Location: ${data.location}`,
    data.interest ? `Selected interest: ${data.interest}` : null,
    ``,
    `Description:`,
    data.description,
    ``,
    `Arch preference: ${data.arch || 'n/a'}`,
    `Plinth(s) needed: ${data.plinths || 'n/a'}`,
    `Balloons needed: ${data.balloons || 'n/a'}`,
    data.balloons === 'yes' ? `Balloon colors: ${data.balloonColors || 'n/a'}` : null,
    `Setup time: ${data.setupTime || 'n/a'} (min 2 hrs)`,
    `Equipment pickup time: ${data.pickupTime || 'n/a'}`,
    ``,
    `Inspiration attachments (filenames only in MVP):`,
    files.length ? files.map((f) => `- ${f}`).join('\n') : '- none selected',
  ]
    .filter((line) => line !== null)
    .join('\n')
}

type BookNowProps = {
  open: boolean
  prefill?: BookPrefill | null
  onOpenChange: (open: boolean) => void
}

export function BookNow({ open, prefill = null, onOpenChange }: BookNowProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState<FormState>(initial)
  const [fileNames, setFileNames] = useState<string[]>([])
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<'idle' | 'ready' | 'copied'>('idle')
  const [inquiryText, setInquiryText] = useState('')

  const showBalloonColors = form.balloons === 'yes'
  const namedArchOptions = archOptions.filter((entry) => entry !== 'Other / not sure yet')
  const otherArchSelected =
    form.arch === 'Other / not sure yet' ||
    (form.arch !== '' && !namedArchOptions.some((entry) => entry === form.arch))

  const mailtoHref = useMemo(() => {
    if (!inquiryText) return '#'
    const subject = encodeURIComponent(`Event inquiry — ${form.name || 'Kat Kreationz'}`)
    const body = encodeURIComponent(inquiryText)
    return `mailto:${brand.inquiryEmail}?subject=${subject}&body=${body}`
  }, [inquiryText, form.name])

  useEffect(() => {
    if (!open) return
    setForm((prev) => ({
      ...initial,
      ...applyPrefill(prefill),
      name: prev.name,
      email: prev.email,
      phone: prev.phone,
    }))
    setErrors({})
    setStatus('idle')
    setInquiryText('')
    setFileNames([])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [open, prefill])

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

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
    setStatus('idle')
  }

  function validate(data: FormState) {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!data.name.trim()) next.name = 'Please enter your name.'
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = 'Please enter a valid email.'
    }
    if (phoneDigits(data.phone).length < 10) {
      next.phone = 'Please enter a phone number with at least 10 digits.'
    }
    if (!data.eventDate) next.eventDate = 'Please choose an event date.'
    else if (data.eventDate < todayIsoDate()) next.eventDate = 'Please choose a future event date.'
    if (!data.location.trim()) next.location = 'Please add the event location.'
    if (!data.description.trim()) next.description = 'Please describe what you have in mind.'
    if (!data.plinths) next.plinths = 'Please choose yes or no.'
    if (!data.balloons) next.balloons = 'Please choose yes or no.'
    if (data.balloons === 'yes' && !data.balloonColors.trim()) {
      next.balloonColors = 'Please share exact balloon colors.'
    }
    if (!data.setupTime.trim()) next.setupTime = 'Please share a setup time (min 2 hrs).'
    if (!data.pickupTime.trim()) next.pickupTime = 'Please share a pickup time after the event.'
    return next
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('idle')
      return
    }
    const text = buildInquiryText(form, fileNames)
    setInquiryText(text)
    setStatus('ready')
  }

  async function copyInquiry() {
    try {
      await navigator.clipboard.writeText(inquiryText)
      setStatus('copied')
    } catch {
      setStatus('ready')
    }
  }

  return (
      <dialog
        ref={dialogRef}
        className="book-lightbox"
        aria-labelledby={titleId}
        onClose={close}
        onCancel={close}
      >
        <div className="book-lightbox__chrome">
          <div className="book-lightbox__intro">
            <h2 id={titleId} className="book-lightbox__title">
              Book Now
            </h2>
            <p className="book-lightbox__copy">
              After you submit, you can open a draft email or copy the inquiry text.
            </p>
          </div>
          <button
            type="button"
            className="book-lightbox__close"
            onClick={close}
            aria-label="Close booking form"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="book-lightbox__body">
          <form className="inquiry-form inquiry-form--lightbox" onSubmit={onSubmit} noValidate>
            {form.interest && (
              <p className="inquiry-interest" role="status">
                {form.interest}
              </p>
            )}

            <fieldset aria-labelledby="about-you-title">
              <p className="fieldset-title" id="about-you-title">
                About you
              </p>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  autoComplete="name"
                  required
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className="field-grid field-grid--2">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    autoComplete="email"
                    required
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    autoComplete="tel"
                    required
                  />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
              </div>
            </fieldset>

            <fieldset aria-labelledby="your-event-title">
              <p className="fieldset-title" id="your-event-title">
                Your event
              </p>
              <div className="field-grid field-grid--2">
                <div className="field">
                  <label htmlFor="eventDate">Date of event</label>
                  <input
                    id="eventDate"
                    type="date"
                    name="eventDate"
                    value={form.eventDate}
                    min={todayIsoDate()}
                    onChange={(e) => update('eventDate', e.target.value)}
                    required
                  />
                  {errors.eventDate && <span className="field-error">{errors.eventDate}</span>}
                </div>
                <div className="field">
                  <label htmlFor="location">Location of event</label>
                  <input
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={(e) => update('location', e.target.value)}
                    placeholder="e.g. Whitby, Toronto, or venue name"
                    required
                  />
                  {errors.location && <span className="field-error">{errors.location}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  required
                />
                {errors.description && <span className="field-error">{errors.description}</span>}
              </div>
              <div className="field">
                <span className="field-label" id="inspiration-label">
                  Inspiration attachments
                </span>
                <input
                  ref={fileInputRef}
                  id="inspiration"
                  type="file"
                  name="inspiration"
                  className="file-input-native"
                  accept="image/*,.pdf"
                  multiple
                  aria-labelledby="inspiration-label"
                  onChange={(e) =>
                    setFileNames(Array.from(e.target.files ?? []).map((file) => file.name))
                  }
                />
                <div className="file-picker">
                  <button
                    type="button"
                    className="btn btn--secondary file-picker__btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose files
                  </button>
                  <span className="file-picker__names">
                    {fileNames.length > 0 ? fileNames.join(', ') : 'No files selected'}
                  </span>
                </div>
                <span className="field-hint">
                  File names are included with the inquiry. The photos themselves are not uploaded
                  yet.
                </span>
              </div>
            </fieldset>

            <fieldset aria-labelledby="styling-title">
              <p className="fieldset-title" id="styling-title">
                Styling details
              </p>
              <div className="choice-group" role="group" aria-labelledby="arch-label">
                <p className="choice-group__label" id="arch-label">
                  What arch would you like?
                </p>
                <div className="choice-group__options choice-group__options--chips" role="presentation">
                  {archOptions.map((option) => {
                    const selected =
                      form.arch === option ||
                      (option === 'Other / not sure yet' && otherArchSelected)
                    return (
                      <button
                        key={option}
                        type="button"
                        className={`choice choice--chip${selected ? ' is-selected' : ''}`}
                        aria-pressed={selected}
                        onClick={() => update('arch', option)}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
                {otherArchSelected && (
                  <div className="field field--conditional">
                    <label htmlFor="archOther">Tell us more</label>
                    <input
                      id="archOther"
                      name="archOther"
                      value={form.arch === 'Other / not sure yet' ? '' : form.arch}
                      onChange={(e) => update('arch', e.target.value || 'Other / not sure yet')}
                      placeholder="e.g. custom hoop, no arch…"
                    />
                  </div>
                )}
              </div>

              <div className="choice-group" role="group" aria-labelledby="plinths-label">
                <p className="choice-group__label" id="plinths-label">
                  Do you need a plinth(s)?
                </p>
                <div
                  className="choice-group__options choice-group__options--toggle"
                  role="presentation"
                >
                  <label
                    className={`choice choice--toggle${form.plinths === 'yes' ? ' is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="plinths"
                      checked={form.plinths === 'yes'}
                      onChange={() => update('plinths', 'yes')}
                    />
                    Yes
                  </label>
                  <label
                    className={`choice choice--toggle${form.plinths === 'no' ? ' is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="plinths"
                      checked={form.plinths === 'no'}
                      onChange={() => update('plinths', 'no')}
                    />
                    No
                  </label>
                </div>
                {errors.plinths && <span className="field-error">{errors.plinths}</span>}
              </div>

              <div className="choice-group" role="group" aria-labelledby="balloons-label">
                <p className="choice-group__label" id="balloons-label">
                  Do you need balloons?
                </p>
                <div
                  className="choice-group__options choice-group__options--toggle"
                  role="presentation"
                >
                  <label
                    className={`choice choice--toggle${form.balloons === 'yes' ? ' is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="balloons"
                      checked={form.balloons === 'yes'}
                      onChange={() => update('balloons', 'yes')}
                    />
                    Yes
                  </label>
                  <label
                    className={`choice choice--toggle${form.balloons === 'no' ? ' is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="balloons"
                      checked={form.balloons === 'no'}
                      onChange={() => update('balloons', 'no')}
                    />
                    No
                  </label>
                </div>
                {errors.balloons && <span className="field-error">{errors.balloons}</span>}
              </div>

              {showBalloonColors && (
                <div className="field field--conditional">
                  <label htmlFor="balloonColors">Exact balloon colors</label>
                  <input
                    id="balloonColors"
                    name="balloonColors"
                    value={form.balloonColors}
                    onChange={(e) => update('balloonColors', e.target.value)}
                    placeholder="e.g. champagne, blush, soft white"
                    required={showBalloonColors}
                  />
                  {errors.balloonColors && (
                    <span className="field-error">{errors.balloonColors}</span>
                  )}
                </div>
              )}

              <div className="field-grid field-grid--2">
                <div className="field">
                  <label htmlFor="setupTime">Setup time</label>
                  <input
                    id="setupTime"
                    type="time"
                    name="setupTime"
                    value={form.setupTime}
                    onChange={(e) => update('setupTime', e.target.value)}
                    required
                  />
                  <span className="field-hint">
                    Minimum 2 hours; can increase for larger installs.
                  </span>
                  {errors.setupTime && <span className="field-error">{errors.setupTime}</span>}
                </div>
                <div className="field">
                  <label htmlFor="pickupTime">Equipment pickup time (after event)</label>
                  <input
                    id="pickupTime"
                    type="time"
                    name="pickupTime"
                    value={form.pickupTime}
                    onChange={(e) => update('pickupTime', e.target.value)}
                    required
                  />
                  {errors.pickupTime && <span className="field-error">{errors.pickupTime}</span>}
                </div>
              </div>
            </fieldset>

            <button type="submit" className="btn btn--primary">
              Prepare inquiry
            </button>
          </form>

          {status !== 'idle' && (
            <div className="inquiry-success" role="status">
              <h3 className="inquiry-success__title">Your inquiry is ready</h3>
              <p className="inquiry-success__copy">
                Open a draft email to {brand.inquiryEmail}, or copy the text to send by Instagram DM
                or text.
              </p>
              <div className="form-actions">
                <a className="btn btn--primary" href={mailtoHref}>
                  Open email draft
                </a>
                <button type="button" className="btn btn--secondary" onClick={copyInquiry}>
                  {status === 'copied' ? 'Copied' : 'Copy inquiry'}
                </button>
              </div>
              <pre className="inquiry-preview">{inquiryText}</pre>
            </div>
          )}
        </div>
      </dialog>
  )
}
