import { useState } from 'react'
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from 'lucide-react'

const emptyForm = { name: '', email: '', subject: '', message: '' }

const contactMethods = [
  {
    icon: Mail,
    title: 'Email us',
    value: 'hello@pmueducation.example',
    note: 'Course and platform questions',
    href: 'mailto:hello@pmueducation.example',
  },
  {
    icon: Phone,
    title: 'Call us',
    value: '+91 98765 43210',
    note: 'Monday–Friday, 9am–5pm IST',
    href: 'tel:+919876543210',
  },
  {
    icon: MapPin,
    title: 'Visit us',
    value: 'Coimbatore, Tamil Nadu, India',
    note: 'Our learning community is based here',
    href: 'https://www.google.com/maps/search/?api=1&query=Coimbatore%2C%20Tamil%20Nadu%2C%20India',
  },
]

export default function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setSent(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const emailInput = event.currentTarget.elements.email
    const nextErrors = {}

    if (form.name.trim().length < 2) {
      nextErrors.name = 'Please enter at least 2 characters.'
    }
    if (!emailInput.checkValidity()) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (form.subject.trim().length < 3) {
      nextErrors.subject = 'Please enter a subject of at least 3 characters.'
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = 'Please enter a message of at least 10 characters.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSent(true)
    setForm(emptyForm)
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#20251f] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-48 h-[560px] w-[560px] rounded-full border-[75px] border-white/[.035]"
        />
        <div className="container-shell relative grid items-center gap-8 py-16 sm:py-20 lg:min-h-[340px] lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#dafa50] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#20251f]">
              <Sparkles size={14} /> We’re here to help
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Let’s make the next step a little clearer.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              Questions about a course, your learning path, or something else? Leave us a note.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[.06] p-5 sm:p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#dafa50] text-[#20251f]">
              <Clock3 size={22} />
            </span>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#dafa50]">
                Human replies
              </p>
              <p className="mt-1 font-display text-lg font-extrabold">Within one business day</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-10 py-14 sm:py-16 lg:grid-cols-[.85fr_1.15fr]">
        <div className="min-w-0">
          <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#687454]">
            Pick your way · 01
          </p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#20251f]">
            Get in touch.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-[#73786d]">
            We’re a small team that cares about helping learners find their way. Choose the
            contact method that works best for you.
          </p>

          <div className="mt-7 space-y-3">
            {contactMethods.map(({ icon: Icon, title, value, note, href }) => (
              <a
                key={title}
                href={href}
                target={title === 'Visit us' ? '_blank' : undefined}
                rel={title === 'Visit us' ? 'noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-[#20251f]/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#9da88b] hover:shadow-[0_12px_30px_rgba(32,37,31,.07)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#e6ebd9] text-[#20251f]">
                  <Icon size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-extrabold uppercase tracking-[.1em] text-[#747b70]">
                    {title}
                  </span>
                  <span className="mt-1 block break-words text-sm font-bold text-[#20251f]">
                    {value}
                  </span>
                  <span className="mt-1 block text-xs text-[#8a8f85]">{note}</span>
                </span>
                <ArrowUpRight
                  size={17}
                  className="shrink-0 text-[#9da391] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#20251f]"
                />
              </a>
            ))}
          </div>

          <div className="mt-7 overflow-hidden rounded-[1.4rem] border border-[#20251f]/10 bg-white">
            <div className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#687454]">
                  Find our community
                </p>
                <p className="mt-1 text-sm font-bold text-[#20251f]">Coimbatore, Tamil Nadu</p>
              </div>
              <MapPin size={19} className="shrink-0 text-[#687454]" />
            </div>
            <iframe
              title="Map showing PMU Education in Coimbatore, Tamil Nadu"
              src="https://www.google.com/maps?q=Coimbatore,Tamil%20Nadu&output=embed"
              className="block h-56 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="min-w-0 rounded-[1.6rem] border border-[#20251f]/10 bg-white p-6 shadow-[0_18px_50px_rgba(32,37,31,.07)] sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#687454]">
                Send a note · 02
              </p>
              <h2 className="font-display text-2xl font-extrabold text-[#20251f] sm:text-3xl">
                What’s on your mind?
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#73786d]">
                Share a few details and we’ll point you in the right direction.
              </p>
            </div>
            <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-[#dafa50] sm:grid">
              <Send size={20} />
            </span>
          </div>

          {sent && (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 flex items-start gap-3 rounded-xl bg-[#e6ebd9] p-4 text-sm font-semibold text-[#35402f]"
            >
              <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
              <span>
                Thanks for reaching out. Your message passed validation. This demo doesn’t
                send messages to a server yet.
              </span>
            </div>
          )}

          <form noValidate onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="form-label">
                Full name
                <input
                  required
                  minLength={2}
                  maxLength={80}
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  placeholder="Your name"
                  className="form-input"
                />
                {errors.name && (
                  <span id="contact-name-error" className="mt-1 block text-xs text-red-600">
                    {errors.name}
                  </span>
                )}
              </label>
              <label className="form-label">
                Email address
                <input
                  required
                  type="email"
                  maxLength={254}
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  placeholder="you@example.com"
                  className="form-input"
                />
                {errors.email && (
                  <span id="contact-email-error" className="mt-1 block text-xs text-red-600">
                    {errors.email}
                  </span>
                )}
              </label>
            </div>

            <label className="form-label">
              Subject
              <input
                required
                minLength={3}
                maxLength={120}
                name="subject"
                value={form.subject}
                onChange={handleChange}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                placeholder="What can we help with?"
                className="form-input"
              />
              {errors.subject && (
                <span id="contact-subject-error" className="mt-1 block text-xs text-red-600">
                  {errors.subject}
                </span>
              )}
            </label>

            <label className="form-label">
              Your message
              <textarea
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                placeholder="Tell us a little more..."
                className="form-input resize-y"
              />
              {errors.message && (
                <span id="contact-message-error" className="mt-1 block text-xs text-red-600">
                  {errors.message}
                </span>
              )}
              <span className="mt-1 block text-right text-[10px] font-medium text-[#8a8f85]">
                {form.message.length}/2000
              </span>
            </label>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#20251f] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#3b4739]"
            >
              Send message <Send size={16} />
            </button>
            <p className="text-center text-[10px] leading-5 text-[#8a8f85]">
              Your details stay in this demo form and aren’t sent to a server.
            </p>
          </form>
        </div>
      </section>
    </>
  )
}
