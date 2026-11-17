import { Link } from 'react-router-dom'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Eye,
  Globe2,
  Heart,
  Lightbulb,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'

const team = [
  { name: 'Olivia Rhye', role: 'Founder & CEO', image: '47', focus: 'Making learning human' },
  { name: 'Alex Morgan', role: 'Head of Learning', image: '12', focus: 'Building better courses' },
  { name: 'Sophia Lee', role: 'Community Lead', image: '44', focus: 'Bringing people together' },
  { name: 'Daniel Kim', role: 'Academic Director', image: '13', focus: 'Keeping ideas practical' },
]

const principles = [
  {
    icon: Heart,
    title: 'People before platforms',
    detail: 'Start with what learners need, then design the experience around them.',
  },
  {
    icon: Lightbulb,
    title: 'Curiosity stays curious',
    detail: 'Keep asking better questions, testing new ideas and learning ourselves.',
  },
  {
    icon: Globe2,
    title: 'Open doors, not gates',
    detail: 'Welcome different backgrounds, ambitions and ways of finding your way.',
  },
]

export default function About() {
  return (
    <div className="overflow-hidden bg-[#fbfaf6] text-[#20251f]">
      <section className="relative bg-[#f0efe7]">
        <div className="container-shell grid items-center gap-12 py-16 sm:py-20 lg:min-h-[470px] lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#dafa50] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.15em]">
              <Sparkles size={14} /> A little about us
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(3rem,7vw,5.25rem)] font-extrabold leading-[.98] tracking-tight">
              We make learning feel like{' '}
              <span className="inline-block -rotate-2 bg-[#dafa50] px-2">moving forward.</span>
            </h1>
          </div>
          <div className="lg:pl-10">
            <p className="max-w-xl text-lg leading-8 text-[#596158]">
              PMU Education brings thoughtful teachers and curious people together. We make
              practical learning easier to find, easier to fit into life, and easier to put
              to use.
            </p>
            <a
              href="#our-story"
              className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold"
            >
              Get to know us <ArrowDownRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section id="our-story" className="container-shell grid gap-12 py-20 sm:py-24 lg:grid-cols-[.95fr_1.05fr]">
        <div className="relative min-h-[360px] sm:min-h-[440px]">
          <div className="absolute left-0 top-0 h-[78%] w-[82%] overflow-hidden rounded-[1.5rem] bg-[#d9ded0]">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1100&q=85"
              alt="Students learning and sharing ideas together"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[58%] rounded-[1.25rem] bg-[#dafa50] p-5 sm:p-7">
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em]">Our starting point</p>
            <p className="mt-3 font-display text-xl font-extrabold leading-tight sm:text-2xl">
              Everyone has more to become.
            </p>
          </div>
          <span className="absolute right-2 top-4 -rotate-3 rounded-full bg-white px-4 py-2 text-xs font-bold shadow-lg sm:right-6">
            Since day one <span aria-hidden="true">↗</span>
          </span>
        </div>

        <div className="flex flex-col justify-center lg:pl-7">
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#687454]">
            Our story · 01
          </p>
          <h2 className="max-w-xl font-display text-3xl font-extrabold leading-tight tracking-[-.05em] sm:text-4xl">
            Learning should open doors, not create barriers.
          </h2>
          <p className="mt-5 leading-7 text-[#73786d]">
            PMU Education began with a simple belief: good education should be useful, welcoming
            and within reach. We work with experts who love what they do, turning their
            experience into lessons learners can use in the real world.
          </p>
          <p className="mt-4 leading-7 text-[#73786d]">
            Today, our community brings together different backgrounds, industries and
            ambitions. Every course is another way to take a step toward what comes next.
          </p>
          <div className="mt-8 grid grid-cols-3 border-t border-[#20251f]/15 pt-5">
            {[
              ['25k+', 'learners'],
              ['120+', 'courses'],
              ['40+', 'instructors'],
            ].map(([value, label]) => (
              <div key={label} className="border-r border-[#20251f]/15 last:border-0 last:pl-4">
                <p className="font-display text-2xl font-extrabold tracking-tight">{value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#747b70] sm:text-xs">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-shell">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#687454]">
                Our north stars · 02
              </p>
              <h2 className="font-display text-3xl font-extrabold tracking-[-.05em] sm:text-4xl">
                Why we show up.
              </h2>
            </div>
            <p className="max-w-md leading-7 text-[#73786d]">
              A clear purpose keeps every lesson pointed toward a better, more possible future.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="relative min-h-[290px] overflow-hidden rounded-[1.5rem] bg-[#dafa50] p-7 sm:p-10">
              <span className="absolute right-5 top-1 font-display text-[8rem] font-extrabold leading-none tracking-[-.1em] text-[#20251f]/[.07]">
                01
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/70">
                <Target size={23} />
              </span>
              <div className="relative mt-10 max-w-md">
                <p className="text-[10px] font-extrabold uppercase tracking-[.2em]">Our mission</p>
                <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
                  Make lifelong learning accessible and useful.
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[#3d463b]">
                  Expert guidance, hands-on practice and a community that helps every learner
                  thrive.
                </p>
              </div>
            </article>

            <article className="relative min-h-[290px] overflow-hidden rounded-[1.5rem] bg-[#20251f] p-7 text-white sm:p-10">
              <span className="absolute right-5 top-1 font-display text-[8rem] font-extrabold leading-none tracking-[-.1em] text-white/[.06]">
                02
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-[#dafa50]">
                <Eye size={23} />
              </span>
              <div className="relative mt-10 max-w-md">
                <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#dafa50]">
                  Our vision
                </p>
                <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
                  A future shaped by curiosity and opportunity.
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
                  Anyone, anywhere can discover their potential and build a path that feels
                  like their own.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 sm:py-24">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#687454]">
              The people behind the lessons · 03
            </p>
            <h2 className="font-display text-3xl font-extrabold tracking-[-.05em] sm:text-4xl">
              Meet your learning crew.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#73786d]">
            Educators, makers and lifelong learners—working together to help you move forward.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <article
              key={member.name}
              className="group overflow-hidden rounded-[1.25rem] border border-[#20251f]/10 bg-white p-2 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(32,37,31,.10)]"
            >
              <div className="relative overflow-hidden rounded-[.9rem] bg-[#e6ebd9]">
                <img
                  src={`https://i.pravatar.cc/500?img=${member.image}`}
                  alt={member.name}
                  className="h-[270px] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-[#fbfaf6] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.12em]">
                  0{index + 1} / 04
                </span>
              </div>
              <div className="px-3 pb-4 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-[.1em] text-[#747b70]">
                  {member.focus}
                </p>
                <h3 className="mt-1 font-display text-lg font-extrabold">{member.name}</h3>
                <p className="mt-1 text-xs text-[#73786d]">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#e6ebd9] py-16 sm:py-20">
        <div className="container-shell">
          <div className="mb-9 flex items-end justify-between gap-5">
            <div>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#687454]">
                A few things we believe · 04
              </p>
              <h2 className="font-display text-3xl font-extrabold tracking-[-.05em] sm:text-4xl">
                Our everyday principles.
              </h2>
            </div>
            <Compass className="hidden text-[#687454] sm:block" size={38} strokeWidth={1.4} />
          </div>
          <div className="divide-y divide-[#20251f]/15 border-y border-[#20251f]/15">
            {principles.map(({ icon: Icon, title, detail }, index) => (
              <div
                key={title}
                className="grid gap-3 py-5 sm:grid-cols-[60px_1fr_1.2fr] sm:items-center sm:gap-6"
              >
                <span className="text-xs font-bold text-[#73786d]">0{index + 1}</span>
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <h3 className="font-display text-base font-extrabold">{title}</h3>
                </div>
                <p className="text-sm leading-6 text-[#62675d]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-20 sm:py-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#f3e5dc] px-7 py-12 sm:px-14 sm:py-16">
          <Users
            aria-hidden="true"
            size={150}
            strokeWidth={0.7}
            className="absolute -right-7 -top-8 rotate-[-12deg] text-[#20251f]/[.08] sm:right-8 sm:top-1/2 sm:-translate-y-1/2"
          />
          <div className="relative max-w-2xl">
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#687454]">
              Your next step
            </p>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-[-.05em] sm:text-5xl">
              There’s a place for you in this story.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[#62675d]">
              Find a skill that sparks something—and learn alongside people who are moving
              forward too.
            </p>
            <Link
              to="/courses"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#20251f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#3b4739]"
            >
              Explore courses <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="ml-4 inline-flex items-center gap-2 text-sm font-bold"
            >
              Say hello <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
