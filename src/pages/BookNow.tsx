import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { brand } from '../data/content'

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

export function BookNow() {
  const [form, setForm] = useState<FormState>(initial)
  const [fileNames, setFileNames] = useState<string[]>([])
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<'idle' | 'ready' | 'copied'>('idle')
  const [inquiryText, setInquiryText] = useState('')

  const showBalloonColors = form.balloons === 'yes'

  const mailtoHref = useMemo(() => {
    if (!inquiryText) return '#'
    const subject = encodeURIComponent(`Event inquiry — ${form.name || 'Kat Kreationz'}`)
    const body = encodeURIComponent(inquiryText)
    return `mailto:${brand.inquiryEmail}?subject=${subject}&body=${body}`
  }, [inquiryText, form.name])

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
    if (!data.phone.trim()) next.phone = 'Please enter a phone number.'
    if (!data.eventDate) next.eventDate = 'Please choose an event date.'
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
    <section className="page page--narrow" aria-labelledby="book-heading">
      <header className="page-header glass glass--quiet glass-enter">
        <p className="eyebrow">Inquire</p>
        <h1 id="book-heading" className="section-title">
          Book Now
        </h1>
        <p className="section-copy">
          Share a few details and we&apos;ll follow up to collaborate on your look. This MVP form
          stays in your browser — after you submit, you can open a draft email or copy the inquiry
          text. File uploads record filenames only until a form service is connected.
        </p>
      </header>

      <form className="inquiry-form" onSubmit={onSubmit} noValidate>
        <fieldset className="glass glass--panel glass-enter glass-enter--delay-1" aria-labelledby="about-you-title">
          <p className="fieldset-title" id="about-you-title">
            About you
          </p>
          <div className="field-grid field-grid--3">
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

        <fieldset className="glass glass--panel glass-enter glass-enter--delay-2" aria-labelledby="your-event-title">
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
              rows={5}
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              required
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
          </div>
          <div className="field">
            <label htmlFor="inspiration">Inspiration attachments</label>
            <input
              id="inspiration"
              type="file"
              name="inspiration"
              accept="image/*,.pdf"
              multiple
              onChange={(e) =>
                setFileNames(Array.from(e.target.files ?? []).map((file) => file.name))
              }
            />
            <span className="field-hint">
              MVP stores filenames only (not the files). Connect Formspree or similar later for true
              uploads.
            </span>
            {fileNames.length > 0 && (
              <span className="field-hint">Selected: {fileNames.join(', ')}</span>
            )}
          </div>
        </fieldset>

        <fieldset className="glass glass--panel glass-enter glass-enter--delay-3" aria-labelledby="styling-title">
          <p className="fieldset-title" id="styling-title">
            Styling details
          </p>
          <div className="field">
            <label htmlFor="arch">What arch would you like?</label>
            <input
              id="arch"
              name="arch"
              value={form.arch}
              onChange={(e) => update('arch', e.target.value)}
              placeholder="e.g. double ring, classic backdrop…"
            />
          </div>

          <div className="choice-group" role="group" aria-labelledby="plinths-label">
            <p className="choice-group__label" id="plinths-label">
              Do you need a plinth(s)?
            </p>
            <div className="choice-group__options">
              <label className="choice">
                <input
                  type="radio"
                  name="plinths"
                  checked={form.plinths === 'yes'}
                  onChange={() => update('plinths', 'yes')}
                />
                Yes
              </label>
              <label className="choice">
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
            <div className="choice-group__options">
              <label className="choice">
                <input
                  type="radio"
                  name="balloons"
                  checked={form.balloons === 'yes'}
                  onChange={() => update('balloons', 'yes')}
                />
                Yes
              </label>
              <label className="choice">
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
              {errors.balloonColors && <span className="field-error">{errors.balloonColors}</span>}
            </div>
          )}

          <div className="field-grid field-grid--2">
            <div className="field">
              <label htmlFor="setupTime">Setup time</label>
              <input
                id="setupTime"
                name="setupTime"
                value={form.setupTime}
                onChange={(e) => update('setupTime', e.target.value)}
                placeholder="e.g. 2:00 PM"
                required
              />
              <span className="field-hint">Minimum 2 hours; can increase for larger installs.</span>
              {errors.setupTime && <span className="field-error">{errors.setupTime}</span>}
            </div>
            <div className="field">
              <label htmlFor="pickupTime">Equipment pickup time (after event)</label>
              <input
                id="pickupTime"
                name="pickupTime"
                value={form.pickupTime}
                onChange={(e) => update('pickupTime', e.target.value)}
                placeholder="e.g. 10:00 PM"
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
        <div className="inquiry-success glass glass--panel glass-enter" role="status">
          <h2 className="section-title">Your inquiry is ready</h2>
          <p className="section-copy">
            Open a draft email to <strong>{brand.inquiryEmail}</strong> (placeholder — update when
            Kat shares a real inbox), or copy the text to send via Instagram DM / text.
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
    </section>
  )
}
