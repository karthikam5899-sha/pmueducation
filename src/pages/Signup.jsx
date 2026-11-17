import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import PasswordField from '../components/PasswordField'
import { useAuth } from '../context/AuthContext'
import { courses } from '../data/courses'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, signUp } = useAuth()
  const [searchParams] = useSearchParams()
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

    if (form.name.trim().length < 2) {
      setError('Please enter your full name.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)
    try {
      await signUp(form, courseId)
      navigate('/dashboard', { replace: true })
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start learning something amazing today."
      footer={
        <>
          Already have an account?{' '}
          <Link
            className="font-bold text-brand-600"
            to={courseId ? `/login?course=${courseId}` : '/login'}
          >
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="form-label">
          Full name
          <input
            required
            minLength={2}
            maxLength={80}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            autoComplete="name"
            className="form-input"
          />
        </label>

        <label className="form-label">
          Email address
          <input
            required
            type="email"
            maxLength={254}
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            className="form-input"
          />
        </label>

        <PasswordField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <label className="form-label">
          Confirm password
          <input
            required
            minLength={8}
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Re-enter your password"
            autoComplete="new-password"
            className="form-input"
          />
        </label>

        <label className="flex items-start gap-2 text-xs leading-5 text-slate-500">
          <input required type="checkbox" className="mt-1 accent-brand-600" />
          I agree to the Terms of Service and Privacy Policy.
        </label>

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
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>
        <p className="text-center text-xs leading-5 text-slate-400">
          This demo saves your profile and a password hash in this browser; it does not use a
          production authentication server.
        </p>
      </form>
    </AuthLayout>
  )
}
