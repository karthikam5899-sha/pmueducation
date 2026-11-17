import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  PlayCircle,
  Star,
  Users,
} from 'lucide-react'
import { courses } from '../data/courses'
import { useAuth } from '../context/AuthContext'
import formatINR from '../utils/formatINR'

const outcomesByCategory = {
  Development: [
    'Build a working application from first component to final deployment.',
    'Write maintainable code and organize reusable logic.',
    'Connect interfaces to APIs and persistent data.',
    'Test, debug and ship with confidence.',
  ],
  Design: [
    'Turn user needs into clear design decisions.',
    'Create polished, consistent visual interfaces.',
    'Prototype ideas and test them with real people.',
    'Present your process in a portfolio-ready project.',
  ],
  'Data Science': [
    'Prepare and explore datasets with the right tools.',
    'Choose analysis methods that fit your question.',
    'Communicate findings with clear visual evidence.',
    'Make recommendations grounded in data.',
  ],
  Marketing: [
    'Understand your audience and choose useful channels.',
    'Build campaigns with a clear message and purpose.',
    'Create content that earns attention and action.',
    'Measure performance and improve your next campaign.',
  ],
  Business: [
    'Frame a business challenge and identify opportunities.',
    'Plan work around clear goals and useful measures.',
    'Communicate decisions and lead collaborative teams.',
    'Apply practical tools to a real-world project.',
  ],
}

const syllabusByCategory = {
  Development: [
    ['Project setup & code structure', 'Set up the tools and patterns used throughout the course.'],
    ['Core language patterns', 'Practice the programming concepts behind reliable features.'],
    ['Interfaces, state & components', 'Build clear user experiences from reusable parts.'],
    ['APIs, data & integrations', 'Connect the application to services and persistent data.'],
    ['Testing & production release', 'Polish, test and prepare your project to ship.'],
  ],
  Design: [
    ['Research & user insight', 'Discover user needs and frame the right design problem.'],
    ['Wireframes & interaction flows', 'Map how people move through the experience.'],
    ['Visual systems & UI design', 'Bring hierarchy, color and reusable patterns together.'],
    ['Prototype & usability tests', 'Make ideas tangible and learn from feedback.'],
    ['Portfolio-ready case study', 'Present the thinking and decisions behind your work.'],
  ],
  'Data Science': [
    ['Question framing & data quality', 'Turn a broad question into a useful analysis plan.'],
    ['Querying & data preparation', 'Collect, clean and structure information for analysis.'],
    ['Analysis & model foundations', 'Choose techniques that fit the data and question.'],
    ['Visualizing the evidence', 'Make patterns and uncertainty clear to others.'],
    ['Capstone insight project', 'Build a concise, evidence-led recommendation.'],
  ],
  Marketing: [
    ['Audience & channel research', 'Understand who you serve and where to reach them.'],
    ['Positioning & campaign planning', 'Set a clear message, goal and plan of action.'],
    ['Content, creative & distribution', 'Develop campaign assets that work across channels.'],
    ['Measurement & attribution', 'Use metrics to understand what is making an impact.'],
    ['Integrated campaign project', 'Bring the strategy together in a practical campaign.'],
  ],
  Business: [
    ['Problem framing & discovery', 'Understand the challenge before choosing a solution.'],
    ['Business models & strategy', 'Connect customer value with a sustainable plan.'],
    ['Operations, finance & planning', 'Organize resources, timelines and useful measures.'],
    ['Communication & leadership', 'Practice the habits that help teams move forward.'],
    ['Launch plan & next steps', 'Turn your learning into a focused action plan.'],
  ],
}

const courseIncludes = [
  'Self-paced video lessons',
  'Downloadable practice resources',
  'Hands-on course project',
  'Certificate of completion',
]

export default function CourseDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, progress, enrollCourse } = useAuth()
  const course = courses.find((item) => item.id === Number(id))
  const courseProgress = course ? progress[course.id] : undefined

  if (!course) {
    return (
      <div className="container-shell py-28 text-center">
        <p className="eyebrow">Course not found</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-slate-900">
          This learning path isn’t here.
        </h1>
        <Link to="/courses" className="btn-primary mt-6 inline-flex">
          <ArrowLeft size={17} /> Browse courses
        </Link>
      </div>
    )
  }

  const modules = (syllabusByCategory[course.category] ?? syllabusByCategory.Business).map(
    ([title, description], index, syllabus) => {
      const baseLessons = Math.floor(course.lessons / syllabus.length)
      const extraLesson = index < course.lessons % syllabus.length ? 1 : 0

      return {
        title,
        description,
        lessons: baseLessons + extraLesson,
      }
    },
  )
  const outcomes = outcomesByCategory[course.category] ?? outcomesByCategory.Business
  const enrollmentLabel =
    courseProgress?.status === 'completed'
      ? 'View completed course'
      : courseProgress
        ? 'Continue learning'
        : 'Enroll now'

  function handleEnroll() {
    if (!user) {
      navigate(`/login?course=${course.id}`)
      return
    }

    if (!courseProgress) enrollCourse(course.id)
    navigate('/dashboard')
  }

  return (
    <div className="overflow-hidden bg-[#fbfaf6] text-[#20251f]">
      <section className="relative overflow-hidden bg-[#20251f] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-56 h-[600px] w-[600px] rounded-full border-[80px] border-white/[.035]"
        />
        <div className="container-shell relative py-8 pb-16 sm:py-10 sm:pb-20">
          <Link
            to="/courses"
            className="course-reveal mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition hover:text-[#dafa50]"
          >
            <ArrowLeft size={16} /> All courses
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div className="course-reveal">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#dafa50] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#20251f]">
                {course.category} <span className="text-[#687454]">/</span> Field guide
              </p>
              <h1 className="mt-5 max-w-2xl font-display text-[clamp(2.4rem,5.5vw,4.7rem)] font-extrabold leading-[1.02] tracking-tight">
                {course.title}
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                <span className="inline-flex items-center gap-1.5 font-bold text-[#dafa50]">
                  <Star size={16} fill="currentColor" />
                  {course.rating}
                  <span className="font-normal text-white/55">({course.students} learners)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-white/70">
                  <Clock3 size={16} /> {course.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 text-white/70">
                  <BookOpen size={16} /> {course.lessons} lessons
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleEnroll}
                  className="inline-flex items-center gap-3 rounded-full bg-[#dafa50] px-6 py-3.5 text-sm font-extrabold text-[#20251f] transition hover:-translate-y-0.5 hover:bg-[#e6ff76]"
                >
                  {enrollmentLabel} <ArrowUpRight size={17} />
                </button>
                <p className="font-display text-2xl font-extrabold">
                  {formatINR(course.price)}
                  <span className="ml-1 text-xs font-medium text-white/50">per course</span>
                </p>
              </div>
            </div>

            <div className="course-reveal course-reveal-delay-1 relative mx-auto w-full max-w-[560px] pb-5 pl-3 pr-7 pt-3 sm:px-7 sm:py-7">
              <div className="absolute inset-8 rotate-3 rounded-[1.75rem] bg-[#dafa50]" />
              <div className="relative overflow-hidden rounded-[1.5rem] border-[6px] border-[#fbfaf6] bg-[#e6ebd9] shadow-[0_24px_70px_rgba(0,0,0,.25)]">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-[280px] w-full object-cover sm:h-[390px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10160e]/55 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-7 sm:left-7 sm:right-7">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#dafa50]">
                      Your next project
                    </p>
                    <p className="mt-1 font-display text-xl font-extrabold text-white sm:text-2xl">
                      Learn by making.
                    </p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#20251f]">
                    <PlayCircle size={21} />
                  </span>
                </div>
              </div>
              <div className="course-float absolute -bottom-1 right-0 flex items-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-extrabold text-[#20251f] shadow-xl sm:right-2">
                <Award size={17} className="text-[#687454]" />
                Finish with a certificate
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-shell relative z-10 -mt-5">
        <div className="grid gap-4 rounded-2xl border border-[#20251f]/10 bg-white p-5 shadow-[0_18px_50px_rgba(32,37,31,.08)] sm:grid-cols-3 sm:p-6">
          {[
            [Clock3, 'Flexible pace', course.duration],
            [BookOpen, 'Course content', `${course.lessons} focused lessons`],
            [Users, 'Learning community', `${course.students} learners enrolled`],
          ].map(([Icon, label, value]) => (
            <div key={label} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e6ebd9]">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#747b70]">
                  {label}
                </p>
                <p className="mt-1 text-sm font-bold">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="container-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <section className="course-reveal" aria-labelledby="course-overview">
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#687454]">
              The overview · 01
            </p>
            <h2
              id="course-overview"
              className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              A practical path from idea to outcome.
            </h2>
            <p className="mt-5 max-w-3xl leading-7 text-[#73786d]">
              {course.description} This course pairs clear instruction with guided practice,
              so you can build understanding as you go and finish with work you can use.
            </p>
          </section>

          <section className="mt-14" aria-labelledby="course-outcomes">
            <div className="mb-6">
              <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#687454]">
                By the end · 02
              </p>
              <h2
                id="course-outcomes"
                className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
              >
                What you’ll be able to do.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {outcomes.map((outcome, index) => (
                <div
                  key={outcome}
                  className={`course-reveal course-reveal-delay-${index % 3} flex min-h-28 gap-4 rounded-2xl border border-[#20251f]/10 bg-white p-5`}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#dafa50]">
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#747b70]">
                      Outcome 0{index + 1}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6">{outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14" aria-labelledby="course-syllabus">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#687454]">
                  The route map · 03
                </p>
                <h2
                  id="course-syllabus"
                  className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
                >
                  Course syllabus.
                </h2>
              </div>
              <span className="rounded-full bg-[#e6ebd9] px-4 py-2 text-xs font-bold">
                {modules.length} modules · {course.lessons} lessons
              </span>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute bottom-8 left-5 top-8 border-l border-dashed border-[#9da88b] sm:left-6"
              />
              <div className="space-y-3">
                {modules.map((module, index) => (
                  <article
                    key={module.title}
                    style={{ animationDelay: `${index * 80}ms` }}
                    className="course-reveal relative flex gap-4 rounded-2xl border border-[#20251f]/10 bg-white p-4 sm:gap-5 sm:p-5"
                  >
                    <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border-4 border-[#fbfaf6] bg-[#dafa50] font-display text-xs font-extrabold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1 py-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-display text-base font-extrabold">{module.title}</h3>
                        <span className="text-[10px] font-bold uppercase tracking-[.1em] text-[#747b70]">
                          {module.lessons} lessons
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#73786d]">
                        {module.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-14" aria-labelledby="course-instructor">
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#687454]">
              Your guide · 04
            </p>
            <h2
              id="course-instructor"
              className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
            >
              Meet your instructor.
            </h2>
            <article className="mt-6 flex flex-col gap-5 rounded-[1.5rem] bg-[#e6ebd9] p-5 sm:flex-row sm:items-center sm:p-7">
              <img
                src={`https://i.pravatar.cc/200?u=${encodeURIComponent(course.instructor)}`}
                alt={course.instructor}
                className="h-20 w-20 shrink-0 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-extrabold">{course.instructor}</h3>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#687454]">
                    <Star size={13} fill="currentColor" /> 4.9 instructor rating
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-[#596158]">{course.role}</p>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#62675d]">
                  Learn with an experienced {course.role.toLowerCase()} who brings real-world
                  perspective, practical examples and a clear path through the subject.
                </p>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white">
                <ArrowUpRight size={19} />
              </span>
            </article>
          </section>
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-[1.5rem] border border-[#20251f]/10 bg-white shadow-[0_18px_50px_rgba(32,37,31,.08)]">
            <div className="bg-[#dafa50] p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[.16em]">
                Your learning plan
              </p>
              <p className="mt-2 font-display text-4xl font-extrabold">{formatINR(course.price)}</p>
              <p className="mt-1 text-xs text-[#596158]">One-time course access</p>
            </div>
            <div className="p-6">
              <h2 className="font-display text-lg font-extrabold">Here’s what’s included</h2>
              <div className="mt-5 space-y-4">
                {courseIncludes.map((item) => (
                  <p key={item} className="flex items-center gap-3 text-sm text-[#596158]">
                    <CheckCircle2 size={17} className="shrink-0 text-[#687454]" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="my-6 border-t border-[#20251f]/10" />
              <div className="space-y-3 text-xs text-[#73786d]">
                <p className="flex items-center justify-between gap-3">
                  <span>Experience level</span>
                  <strong className="text-[#20251f]">{course.level}</strong>
                </p>
                <p className="flex items-center justify-between gap-3">
                  <span>Time commitment</span>
                  <strong className="text-[#20251f]">{course.duration}</strong>
                </p>
                <p className="flex items-center justify-between gap-3">
                  <span>Course rating</span>
                  <strong className="inline-flex items-center gap-1 text-[#20251f]">
                    <Star size={13} fill="currentColor" className="text-amber-500" />
                    {course.rating}
                  </strong>
                </p>
              </div>
              <button
                type="button"
                onClick={handleEnroll}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#20251f] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#3b4739]"
              >
                {enrollmentLabel} <ArrowRight size={16} />
              </button>
              <p className="mt-3 text-center text-[10px] leading-5 text-[#8a8f85]">
                Start learning at your own pace. Your progress is yours to keep.
              </p>
            </div>
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#747b70]">
            <Award size={15} /> Certificate included
          </p>
        </aside>
      </section>
    </div>
  )
}
