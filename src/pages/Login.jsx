import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Mail } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import PasswordField from '../components/PasswordField'
import { DEMO_CREDENTIALS, useAuth } from '../context/AuthContext'
import { courses } from '../data/courses'

export default function Login() {
  const [form, setForm] = useState({
    email: DEMO_CREDENTIALS.email,
    password: DEMO_CREDENTIALS.password,
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, signIn } = useAuth()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const requestedCourseId = Number(searchParams.get('course'))
  const courseId = courses.some((course) => course.id === requestedCourseId)
    ? requestedCourseId
    : undefined

  if (user) return <Navigate to="/dashboard" replace />

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await signIn(form.email, form.password, courseId)
      const destination = courseId
        ? '/dashboard'
        : location.state?.from?.pathname || '/dashboard'
      navigate(destination, { replace: true })
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue your learning journey."
      footer={
        <>
          Don’t have an account?{' '}
          <Link
            className="font-bold text-brand-600"
            to={courseId ? `/signup?course=${courseId}` : '/signup'}
          >
            Create one
          </Link>
        </>
      }
    >
      <div className="mt-7 rounded-2xl border border-brand-100 bg-brand-50/70 p-4">
        <p className="text-xs font-extrabold uppercase tracking-[.12em] text-brand-700">
          Demo account
        </p>
        <div className="mt-2 grid gap-1 text-sm text-slate-600 sm:grid-cols-2">
          <p>
            Email: <strong className="text-slate-900">{DEMO_CREDENTIALS.email}</strong>
          </p>
          <p>
            Password: <strong className="text-slate-900">{DEMO_CREDENTIALS.password}</strong>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <label className="form-label">
          Email address
          <span className="relative block">
            <Mail
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              required
              type="email"
              maxLength={254}
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className="form-input pl-11"
            />
          </span>
        </label>

        <PasswordField
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full justify-center py-4 disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? 'Signing in…' : 'Log in'}
        </button>
        <p className="text-center text-xs leading-5 text-slate-400">
          Demo authentication is stored in this browser only. Use the demo credentials above
          to explore the dashboard.
        </p>
      </form>
    </AuthLayout>
  )
}
