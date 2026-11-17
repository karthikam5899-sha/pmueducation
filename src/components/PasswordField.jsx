import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function PasswordField({
  label = 'Password',
  name = 'password',
  value,
  onChange,
  autoComplete = 'current-password',
}) {
  const [show, setShow] = useState(false)

  return (
    <label className="form-label">
      {label}
      <span className="relative block">
        <input
          required
          minLength={8}
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder="At least 8 characters"
          className="form-input pr-12"
        />
        <button
          type="button"
          onClick={() => setShow((current) => !current)}
          aria-label={show ? 'Hide password' : 'Show password'}
          aria-pressed={show}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-600"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </span>
    </label>
  )
}