import { Link } from 'react-router-dom'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Compass,
  Play,
  Quote,
  Sparkles,
  Star,
  Trophy,
  Users,
} from 'lucide-react'
import { courses, categories } from '../data/courses'
import CourseCard from '../components/CourseCard'

const testimonials = [
  {
    name: 'Emily Carter',
    role: 'UX Designer',
    quote:
      'The courses are practical, clear and genuinely changed the way I approach my work.',
    avatar: 'https://i.pravatar.cc/100?img=47',
  },
  {
    name: 'Noah Williams',
    role: 'Web Developer',
    quote:
      'I went from knowing a little HTML to building full-stack projects with confidence.',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    name: 'Ava Patel',
    role: 'Marketing Specialist',
    quote: 'Flexible lessons and amazing instructors. I could learn at my own pace.',
    avatar: 'https://i.pravatar.cc/100?img=44',
  },
]

const benefits = [
  'Learn from people who do the work',
  'Build skills with hands-on projects',
  'Fit flexible lessons around your life',
]

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#fbfaf6] text-[#20251f]">
      <section className="relative isolate bg-[#f0efe7]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-32 -z-10 h-[520px] w-[520px] rounded-full border border-[#20251f]/10 sm:border-[70px] sm:border-[#20251f]/[.025]"
        />
        <div className="container-shell grid items-center gap-12 py-16 sm:py-20 lg:min-h-[650px] lg:grid-cols-[1.05fr_.95fr] lg:py-12">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-[#dafa50] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.14em]">
              <Sparkles size={14} />
              The open classroom
            </div>
            <h1 className="max-w-2xl font-display text-[clamp(3.2rem,7vw,5.6rem)] font-extrabold leading-[.99] tracking-[-.07em]">
              Make room for{' '}
              <span className="inline-block -rotate-2 whitespace-nowrap bg-[#dafa50] px-2">
                what’s next.
              </span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-[#596158] sm:text-lg sm:leading-8">
              Good things happen when curiosity meets a plan. Find your next skill, learn
              from people who know it, and put it to work.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/courses"
                className="inline-flex items-center gap-3 rounded-full bg-[#20251f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#3b4739]"
              >
                Find your course <ArrowUpRight size={17} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-[#3d463b] transition hover:bg-white"
              >
                <Play size={15} fill="currentColor" /> How it works
              </a>
            </div>
            <div className="mt-12 grid max-w-lg grid-cols-3 border-t border-[#20251f]/15 pt-5">
              {[
                ['25k+', 'learners'],
                ['120+', 'expert courses'],
                ['4.9/5', 'average rating'],
              ].map(([value, label]) => (
                <div key={label} className="border-r border-[#20251f]/15 last:border-0 last:pl-4">
                  <p className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
                    {value}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.1em] text-[#747b70] sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px] pb-8 pl-3 pr-7 pt-3 sm:px-8 sm:py-8">
            <div className="absolute inset-8 rotate-3 rounded-[2rem] bg-[#dafa50]" />
            <div className="relative overflow-hidden rounded-[1.6rem] border-[7px] border-[#fbfaf6] bg-[#d5d9c8] shadow-[0_24px_70px_rgba(32,37,31,.18)]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1100&q=90"
                alt="Students sharing ideas around a table"
                className="h-[360px] w-full object-cover sm:h-[440px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10160e]/45 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white sm:bottom-7 sm:left-7 sm:right-7">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e2f5a1]">
                    Learn out loud
                  </p>
                  <p className="mt-1 font-display text-xl font-bold sm:text-2xl">
                    Your people are here.
                  </p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#dafa50] text-[#20251f]">
                  <ArrowDownRight size={21} />
                </span>
              </div>
            </div>
            <div className="absolute -left-2 top-10 flex -rotate-6 items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-[0_14px_35px_rgba(32,37,31,.12)] sm:left-0 sm:top-16">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f1a58a]">
                <Trophy size={19} />
              </span>
              <div>
                <p className="text-xs font-extrabold">Small steps. Big shifts.</p>
                <p className="mt-0.5 text-[10px] text-[#747b70]">Start where you are</p>
              </div>
            </div>
            <div className="absolute -bottom-1 right-0 flex rotate-3 items-center gap-2 rounded-full border border-[#20251f]/10 bg-[#fbfaf6] px-4 py-2.5 shadow-lg sm:right-2">
              <Users size={15} />
              <span className="text-xs font-bold">A community of 25,000+</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 sm:py-24">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#687454]">
              Follow your curiosity
            </p>
            <h2 className="font-display text-3xl font-extrabold tracking-[-.05em] sm:text-4xl">
              Pick a path. Make it yours.
            </h2>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#46513e] hover:underline"
          >
            All subjects <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => (
            <Link
              to={`/courses?category=${encodeURIComponent(category.name)}`}
              key={category.name}
              className={`group relative min-h-[178px] overflow-hidden rounded-2xl p-5 transition duration-300 hover:-translate-y-1 ${
                index % 2 === 0 ? 'bg-[#e6ebd9]' : 'bg-[#f3e5dc]'
              }`}
            >
              <span className="absolute right-4 top-3 font-display text-5xl font-extrabold tracking-[-.08em] text-[#20251f]/[.07]">
                0{index + 1}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/70 text-2xl transition group-hover:rotate-[-8deg]">
                {category.icon}
              </span>
              <h3 className="mt-7 font-display text-base font-extrabold">{category.name}</h3>
              <p className="mt-1 text-xs text-[#73786d]">{category.count}</p>
              <ArrowUpRight
                size={17}
                className="absolute bottom-5 right-5 text-[#59644d] transition group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[#20251f]/[.06] bg-white py-20 sm:py-24">
        <div className="container-shell">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#687454]">
                A good place to begin
              </p>
              <h2 className="font-display text-3xl font-extrabold tracking-[-.05em] sm:text-4xl">
                Classes with a point of view.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-[#73786d]">
                Thoughtfully made courses to help turn your interests into practical skills.
              </p>
            </div>
            <Link
              to="/courses"
              className="mb-1 inline-flex items-center gap-2 text-sm font-bold text-[#46513e] hover:underline"
            >
              Explore the library <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="container-shell grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full border-[14px] border-[#dafa50]" />
          <img
            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1000&q=85"
            alt="Learners working together on a project"
            className="relative h-[330px] w-full rounded-[1.5rem] object-cover sm:h-[430px]"
          />
          <div className="absolute -bottom-5 right-4 rounded-2xl bg-[#20251f] p-5 text-white shadow-xl sm:right-8">
            <p className="font-display text-2xl font-extrabold">Learn by doing.</p>
            <p className="mt-1 text-xs text-white/65">Keep what you make.</p>
          </div>
        </div>
        <div className="lg:pl-7">
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#687454]">
            Learning, without the detours
          </p>
          <h2 className="max-w-xl font-display text-3xl font-extrabold leading-tight tracking-[-.05em] sm:text-5xl">
            Less scrolling.
            <br />
            More becoming.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[#73786d] sm:text-base">
            Make progress that feels real. Our instructors help you move from “I’ve always
            wanted to” to “I just did.”
          </p>
          <div className="mt-7 space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 text-sm font-semibold">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#dafa50]">
                  <Check size={14} strokeWidth={3} />
                </span>
                {benefit}
              </div>
            ))}
          </div>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#20251f]/20 px-5 py-3 text-sm font-bold transition hover:bg-[#20251f] hover:text-white"
          >
            Meet PMU Education <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <section className="bg-[#20251f] py-20 text-white sm:py-24">
        <div className="container-shell">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#dafa50]">
                Notes from the classroom
              </p>
              <h2 className="font-display text-3xl font-extrabold tracking-[-.05em] sm:text-4xl">
                Real people. Real progress.
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white/65">
              <Star size={16} fill="#dafa50" className="text-[#dafa50]" />
              4.9 average learner rating
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
            <article className="flex min-h-[300px] flex-col justify-between rounded-[1.5rem] bg-[#dafa50] p-7 text-[#20251f] sm:p-10">
              <Quote size={30} />
              <p className="max-w-2xl font-display text-2xl font-bold leading-snug tracking-[-.03em] sm:text-3xl">
                “{testimonials[0].quote}”
              </p>
              <div className="mt-7 flex items-center gap-3">
                <img
                  src={testimonials[0].avatar}
                  alt=""
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-extrabold">{testimonials[0].name}</p>
                  <p className="text-xs text-[#20251f]/65">{testimonials[0].role}</p>
                </div>
              </div>
            </article>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {testimonials.slice(1).map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="flex flex-col justify-between rounded-[1.5rem] border border-white/15 p-6 sm:p-7"
                >
                  <p className="text-sm leading-6 text-white/80">“{testimonial.quote}”</p>
                  <div className="mt-5 flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold">{testimonial.name}</p>
                      <p className="mt-0.5 text-[11px] text-white/55">{testimonial.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 sm:py-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#f3e5dc] px-7 py-12 sm:px-14 sm:py-16">
          <Compass
            aria-hidden="true"
            size={150}
            strokeWidth={0.7}
            className="absolute -right-8 -top-8 rotate-12 text-[#20251f]/[.08] sm:right-8 sm:top-1/2 sm:-translate-y-1/2"
          />
          <div className="relative max-w-2xl">
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#687454]">
              Your next chapter starts here
            </p>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-[-.05em] sm:text-5xl">
              Curious about what you could do?
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[#62675d]">
              Find a course that meets you where you are—and helps you get where you want to go.
            </p>
            <Link
              to="/courses"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#20251f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#3b4739]"
            >
              Start exploring <BookOpen size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
