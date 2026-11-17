import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Youtube, Facebook, ArrowRight } from 'lucide-react'

const popularSubjects = [
  { label: 'Web Development', category: 'Development' },
  { label: 'UI/UX Design', category: 'Design' },
  { label: 'Data Science', category: 'Data Science' },
  { label: 'Marketing', category: 'Marketing' },
  { label: 'Business', category: 'Business' },
]

const footerLinkClass =
  'transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500'

export default function Footer() {
  return (
    <footer className="mt-24 bg-slate-950 text-slate-300">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link to="/" className="mb-5 flex items-center gap-2 text-white">
            <img src="/PMU%20Education.png" alt="" className="h-10 w-10 shrink-0 object-contain" />
            <span className="whitespace-nowrap font-display text-lg font-extrabold">PMU Education</span>
          </Link>
          <p className="max-w-xs text-sm leading-7 text-slate-400">
            Unlock your potential with expert-led courses designed for the way you want to learn.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Linkedin, Youtube, Facebook].map((Icon, index) => (
              <a
                key={index}
                href="#social"
                aria-label="Social media"
                className="rounded-full bg-white/10 p-2.5 transition hover:bg-brand-600"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-5 font-bold text-white">Explore</h4>
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            <Link to="/courses" className={footerLinkClass}>All courses</Link>
            <Link to="/about" className={footerLinkClass}>About us</Link>
            <Link to="/contact" className={footerLinkClass}>Contact</Link>
            <Link to="/signup" className={footerLinkClass}>Join community</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-5 font-bold text-white">Popular subjects</h4>
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            {popularSubjects.map(({ label, category }) => (
              <Link
                key={category}
                to={`/courses?category=${encodeURIComponent(category)}`}
                className={footerLinkClass}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-5 font-bold text-white">Stay in the loop</h4>
          <p className="mb-4 text-sm leading-6 text-slate-400">
            Get learning tips and course updates in your inbox.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              alert('Thanks for subscribing!')
            }}
            className="flex rounded-xl bg-white p-1.5"
          >
            <input
              required
              type="email"
              placeholder="Your email address"
              className="min-w-0 flex-1 px-3 text-sm text-slate-800 outline-none"
            />
            <button className="rounded-lg bg-brand-600 p-3 text-white">
              <ArrowRight size={17} />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row">
          <span>© 2026 PMU Education. All rights reserved.</span>
          <span>Learn something wonderful today.</span>
        </div>
      </div>
    </footer>
  )
}
