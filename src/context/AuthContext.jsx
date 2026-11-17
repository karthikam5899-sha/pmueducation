import { createContext, useContext, useEffect, useState } from 'react'

const SESSION_KEY = 'edulearn:session'
const ACCOUNTS_KEY = 'edulearn:accounts'
const PROGRESS_KEY_PREFIX = 'edulearn:progress:'
const LEGACY_DEMO_EMAIL = 'demo@edulearn.example'
const PASSWORD_HASH_ITERATIONS = 100_000

export const DEMO_CREDENTIALS = {
  name: 'Demo Learner',
  email: 'demo@pmueducation.example',
  password: 'Learn123!',
}

const DEMO_PROGRESS = {
  2: {
    status: 'in-progress',
    progress: 45,
    updatedAt: '2026-11-01T12:00:00.000Z',
  },
  3: {
    status: 'completed',
    progress: 100,
    updatedAt: '2026-10-20T12:00:00.000Z',
    completedAt: '2026-10-20T12:00:00.000Z',
  },
}

const AuthContext = createContext(null)

function readSession() {
  const savedSession = window.localStorage.getItem(SESSION_KEY)
  if (!savedSession) return null

  const session = JSON.parse(savedSession)
  if (!session || session.email?.toLowerCase() !== LEGACY_DEMO_EMAIL) return session

  const legacyProgressKey = `${PROGRESS_KEY_PREFIX}${LEGACY_DEMO_EMAIL}`
  const currentProgressKey = `${PROGRESS_KEY_PREFIX}${DEMO_CREDENTIALS.email}`
  const legacyProgress = window.localStorage.getItem(legacyProgressKey)
  if (legacyProgress && !window.localStorage.getItem(currentProgressKey)) {
    window.localStorage.setItem(currentProgressKey, legacyProgress)
  }

  const migratedSession = { ...session, email: DEMO_CREDENTIALS.email }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(migratedSession))
  return migratedSession
}

function readAccounts() {
  const savedAccounts = window.localStorage.getItem(ACCOUNTS_KEY)
  return savedAccounts ? JSON.parse(savedAccounts) : []
}

function readProgress(email) {
  const savedProgress = window.localStorage.getItem(
    `${PROGRESS_KEY_PREFIX}${email.toLowerCase()}`,
  )

  if (savedProgress) return JSON.parse(savedProgress)
  return email.toLowerCase() === DEMO_CREDENTIALS.email ? DEMO_PROGRESS : {}
}

function createSalt() {
  return Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function saltToBytes(salt) {
  return new Uint8Array(salt.match(/.{2}/g).map((byte) => Number.parseInt(byte, 16)))
}

async function hashPassword(password, salt) {
  const key = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltToBytes(salt),
      iterations: PASSWORD_HASH_ITERATIONS,
      hash: 'SHA-256',
    },
    key,
    256,
  )

  return Array.from(new Uint8Array(bits))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession)
  const [progress, setProgress] = useState(() => {
    const savedUser = readSession()
    return savedUser ? readProgress(savedUser.email) : {}
  })

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(
        `${PROGRESS_KEY_PREFIX}${user.email.toLowerCase()}`,
        JSON.stringify(progress),
      )
    }
  }, [progress, user])

  function setSession(profile, courseId) {
    const nextProgress = { ...readProgress(profile.email) }
    if (Number.isSafeInteger(courseId) && courseId > 0 && !nextProgress[courseId]) {
      nextProgress[courseId] = {
        status: 'in-progress',
        progress: 0,
        updatedAt: new Date().toISOString(),
      }
    }

    window.localStorage.setItem(SESSION_KEY, JSON.stringify(profile))
    window.localStorage.setItem(
      `${PROGRESS_KEY_PREFIX}${profile.email.toLowerCase()}`,
      JSON.stringify(nextProgress),
    )
    setProgress(nextProgress)
    setUser(profile)
  }

  async function signIn(email, password, courseId) {
    const normalizedEmail = email.trim().toLowerCase()
    let profile

    if (
      normalizedEmail === DEMO_CREDENTIALS.email ||
      normalizedEmail === LEGACY_DEMO_EMAIL
    ) {
      if (password !== DEMO_CREDENTIALS.password) {
        throw new Error('Email or password is incorrect.')
      }

      profile = {
        name: DEMO_CREDENTIALS.name,
        email: DEMO_CREDENTIALS.email,
        createdAt: '2026-01-01T00:00:00.000Z',
      }
    } else {
      const account = readAccounts().find((item) => item.email === normalizedEmail)
      if (!account || (await hashPassword(password, account.salt)) !== account.passwordHash) {
        throw new Error('Email or password is incorrect.')
      }

      profile = {
        name: account.name,
        email: account.email,
        createdAt: account.createdAt,
      }
    }

    setSession(profile, courseId)
    return profile
  }

  async function signUp({ name, email, password }, courseId) {
    const normalizedEmail = email.trim().toLowerCase()
    const accounts = readAccounts()
    const alreadyExists =
      normalizedEmail === DEMO_CREDENTIALS.email ||
      normalizedEmail === LEGACY_DEMO_EMAIL ||
      accounts.some((account) => account.email === normalizedEmail)

    if (alreadyExists) {
      throw new Error('An account with this email already exists. Please log in instead.')
    }

    const salt = createSalt()
    const createdAt = new Date().toISOString()
    const account = {
      name: name.trim(),
      email: normalizedEmail,
      salt,
      passwordHash: await hashPassword(password, salt),
      createdAt,
    }
    const profile = { name: account.name, email: account.email, createdAt }

    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]))
    setSession(profile, courseId)
    return profile
  }

  function updateProfile(name) {
    if (!user) throw new Error('Sign in before updating your profile.')

    const updatedUser = { ...user, name: name.trim() }
    const accounts = readAccounts()
    const accountIndex = accounts.findIndex((account) => account.email === user.email)

    if (accountIndex >= 0) {
      accounts[accountIndex] = { ...accounts[accountIndex], name: updatedUser.name }
      window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
    }

    window.localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  function logOut() {
    window.localStorage.removeItem(SESSION_KEY)
    setUser(null)
    setProgress({})
  }

  function enrollCourse(courseId) {
    if (!user) throw new Error('Sign in to add this course to your learning plan.')

    setProgress((current) => {
      if (current[courseId]) return current

      return {
        ...current,
        [courseId]: {
          status: 'in-progress',
          progress: 0,
          updatedAt: new Date().toISOString(),
        },
      }
    })
  }

  function updateCourseProgress(courseId, value) {
    if (!user) throw new Error('Sign in to update course progress.')

    const boundedProgress = Math.max(0, Math.min(100, Math.round(value)))
    const updatedAt = new Date().toISOString()

    setProgress((current) => {
      const completed = boundedProgress === 100
      const existing = current[courseId]

      return {
        ...current,
        [courseId]: {
          status: completed ? 'completed' : 'in-progress',
          progress: boundedProgress,
          updatedAt,
          ...(completed
            ? { completedAt: existing?.completedAt ?? updatedAt }
            : {}),
        },
      }
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        progress,
        signIn,
        signUp,
        updateProfile,
        logOut,
        enrollCourse,
        updateCourseProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider.')
  return context
}
