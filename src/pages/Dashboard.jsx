import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  CircleUserRound,
  Clock3,
  LogOut,
  Pencil,
  UserRound,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { courses } from '../data/courses'

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export default function Dashboard() {
  const { user, progress, updateProfile, updateCourseProgress, logOut } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name ?? '')
  const [profileMessage, setProfileMessage] = useState('')

  useEffect(() => {
    if (user) setName(user.name)
  }, [user])

  const learningCourses = useMemo(
    () =>
      Object.entries(progress)
        .map(([courseId, record]) => ({
          course: courses.find((item) => item.id === Number(courseId)),
          record,
        }))
        .filter((entry) => entry.course),
    [progress],
  )
  const activeCourses = learningCourses.filter(({ record }) => record.status !== 'completed')
  const completedCourses = learningCourses.filter(({ record }) => record.status === 'completed')
  const averageProgress = learningCourses.length
    ? Math.round(
        learningCourses.reduce((total, { record }) => total + record.progress, 0) /
          learningCourses.length,
      )
    : 0

  if (!user) {
    return <Navigate to="/login" state={{ from: { pathname: '/dashboard' } }} replace />
  }

  function saveProfile(event) {
    event.preventDefault()
    if (name.trim().length < 2) {
      setProfileMessage('Please enter a name with at least 2 characters.')
      return
    }

    updateProfile(name)
    setProfileMessage('Your profile has been updated.')
  }

  function handleLogOut() {
    logOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#20251f]">
      <section className="bg-[#20251f] text-white">
        <div className="container-shell flex flex-col justify-between gap-6 py-12 sm:flex-row sm:items-end sm:py-16">
          <div>
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#dafa50]">
              Your learning space
            </p>
            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
              Welcome back, {user.name.split(' ')[0]}.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
              Keep your momentum going. Your courses and achievements are all in one place.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#dafa50] px-5 py-3 text-sm font-extrabold text-[#20251f] transition hover:-translate-y-0.5"
          >
            Find another course <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="container-shell grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_310px] lg:py-14">
        <div className="min-w-0">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              [BookOpen, activeCourses.length, 'In progress'],
              [Award, completedCourses.length, 'Completed'],
              [CheckCircle2, `${averageProgress}%`, 'Overall progress'],
            ].map(([Icon, value, label]) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-[#20251f]/10 bg-white p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e6ebd9]">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="font-display text-2xl font-extrabold">{value}</p>
                  <p className="mt-0.5 text-xs text-[#73786d]">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <section className="mt-10" aria-labelledby="in-progress-heading">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#687454]">
                  Pick up where you left off
                </p>
                <h2
                  id="in-progress-heading"
                  className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
                >
                  In progress
                </h2>
              </div>
              <span className="text-xs font-semibold text-[#73786d]">
                {activeCourses.length} {activeCourses.length === 1 ? 'course' : 'courses'}
              </span>
            </div>

            {activeCourses.length > 0 ? (
              <div className="space-y-4">
                {activeCourses.map(({ course, record }) => (
                  <article
                    key={course.id}
                    className="overflow-hidden rounded-[1.4rem] border border-[#20251f]/10 bg-white"
                  >
                    <div className="grid md:grid-cols-[200px_minmax(0,1fr)]">
                      <Link
                        to={`/courses/${course.id}`}
                        className="relative block min-h-40 overflow-hidden bg-[#e6ebd9] md:min-h-full"
                      >
                        <img
                          src={course.image}
                          alt={course.title}
                          className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-[#dafa50] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.1em]">
                          {course.category}
                        </span>
                      </Link>
                      <div className="p-5 sm:p-6">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#747b70]">
                              {course.level} · {course.duration}
                            </p>
                            <h3 className="mt-2 font-display text-lg font-extrabold sm:text-xl">
                              {course.title}
                            </h3>
                            <p className="mt-1 text-xs text-[#73786d]">
                              Instructor · {course.instructor}
                            </p>
                          </div>
                          <span className="rounded-full bg-[#f0efe7] px-3 py-1.5 text-xs font-extrabold">
                            {record.progress}% complete
                          </span>
                        </div>

                        <label className="mt-5 block">
                          <span className="sr-only">Progress for {course.title}</span>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={record.progress}
                            onChange={(event) =>
                              updateCourseProgress(course.id, Number(event.target.value))
                            }
                            className="h-2 w-full cursor-pointer accent-[#687454]"
                          />
                        </label>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                          <Link
                            to={`/courses/${course.id}`}
                            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#596158] hover:text-brand-600"
                          >
                            Continue course <ArrowRight size={15} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => updateCourseProgress(course.id, 100)}
                            className="rounded-full border border-[#20251f]/15 px-4 py-2 text-xs font-bold transition hover:border-[#20251f] hover:bg-[#20251f] hover:text-white"
                          >
                            Mark complete
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.4rem] border border-dashed border-[#20251f]/20 bg-white px-6 py-10 text-center">
                <BookOpen className="mx-auto text-[#687454]" size={28} />
                <p className="mt-3 font-display text-lg font-extrabold">Ready for your next course?</p>
                <p className="mt-1 text-sm text-[#73786d]">
                  Enroll in a class and your progress will appear here.
                </p>
                <Link
                  to="/courses"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#596158]"
                >
                  Browse courses <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </section>

          <section className="mt-10" aria-labelledby="completed-heading">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#687454]">
                  Your milestones
                </p>
                <h2
                  id="completed-heading"
                  className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
                >
                  Completed courses
                </h2>
              </div>
              <span className="text-xs font-semibold text-[#73786d]">
                {completedCourses.length} {completedCourses.length === 1 ? 'course' : 'courses'}
              </span>
            </div>

            {completedCourses.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {completedCourses.map(({ course, record }) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.id}`}
                    className="group flex min-w-0 items-center gap-4 rounded-2xl border border-[#20251f]/10 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#dafa50]">
                      <CheckCircle2 size={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-extrabold">{course.title}</span>
                      <span className="mt-1 block text-xs text-[#73786d]">
                        Completed{' '}
                        {record.completedAt
                          ? new Date(record.completedAt).toLocaleDateString()
                          : 'successfully'}
                      </span>
                    </span>
                    <ArrowRight
                      size={16}
                      className="shrink-0 text-[#9da391] transition group-hover:translate-x-1"
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="rounded-2xl border border-dashed border-[#20251f]/20 bg-white p-5 text-sm text-[#73786d]">
                Complete a course to add it to your milestones.
              </p>
            )}
          </section>
        </div>

        <aside className="h-fit rounded-[1.4rem] border border-[#20251f]/10 bg-white p-6">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#dafa50] font-display text-lg font-extrabold">
              {getInitials(user.name)}
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#747b70]">
                Learner profile
              </p>
              <h2 className="mt-1 truncate font-display text-lg font-extrabold">{user.name}</h2>
            </div>
          </div>

          <div className="mt-6 space-y-3 border-y border-[#20251f]/10 py-5 text-sm">
            <p className="flex items-start gap-3">
              <CircleUserRound size={17} className="mt-0.5 shrink-0 text-[#687454]" />
              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-[.1em] text-[#8a8f85]">
                  Email
                </span>
                <span className="mt-1 block break-all font-semibold">{user.email}</span>
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Clock3 size={17} className="shrink-0 text-[#687454]" />
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[.1em] text-[#8a8f85]">
                  Member since
                </span>
                <span className="mt-1 block font-semibold">
                  {new Date(user.createdAt).toLocaleDateString(undefined, {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </span>
            </p>
          </div>

          <form onSubmit={saveProfile} className="mt-5">
            <label className="form-label">
              Display name
              <input
                required
                minLength={2}
                maxLength={80}
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setProfileMessage('')
                }}
                className="form-input"
              />
            </label>
            {profileMessage && (
              <p role="status" className="mt-2 text-xs text-[#596158]">
                {profileMessage}
              </p>
            )}
            <button
              type="submit"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#20251f]/15 px-4 py-2.5 text-xs font-extrabold transition hover:bg-[#f0efe7]"
            >
              <Pencil size={14} /> Save profile
            </button>
          </form>

          <button
            type="button"
            onClick={handleLogOut}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#20251f] px-4 py-3 text-xs font-extrabold text-white transition hover:bg-[#3b4739]"
          >
            <LogOut size={15} /> Log out
          </button>
        </aside>
      </section>
    </div>
  )
}
