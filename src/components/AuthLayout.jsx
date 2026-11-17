import { Link } from 'react-router-dom'

export default function AuthLayout({ children, title, subtitle, footer }) {
  return (
    <section className="auth-bg min-h-[760px] px-4 py-14">
      <div className="mx-auto max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <img src="/PMU%20Education.png" alt="" className="h-10 w-10 object-contain" />
          <span className="whitespace-nowrap font-display text-lg font-extrabold text-slate-900">
            PMU Education
          </span>
        </Link>
        <div className="rounded-3xl border border-white bg-white p-7 shadow-soft sm:p-9">
          <div className="text-center">
            <h1 className="font-display text-3xl font-extrabold text-slate-900">{title}</h1>
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          </div>
          {children}
          <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
            {footer}
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">
          © 2026 PMU Education. All rights reserved.
        </p>
      </div>
    </section>
  )
}