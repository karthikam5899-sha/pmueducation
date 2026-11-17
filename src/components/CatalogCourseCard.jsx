import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Clock3, Star, Users } from 'lucide-react'
import formatINR from '../utils/formatINR'

export default function CatalogCourseCard({ course }) {
  const initials = course.instructor
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <article className="group overflow-hidden rounded-[1.4rem] border border-[#20251f]/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(32,37,31,.10)]">
      <Link
        to={`/courses/${course.id}`}
        className="relative block h-52 overflow-hidden bg-[#e6ebd9]"
      >
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[#dafa50] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.1em] text-[#20251f]">
          {course.category}
        </span>
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-[#20251f]">
          <Star size={13} fill="currentColor" className="text-amber-500" />
          {course.rating}
        </span>
        <span className="absolute bottom-4 left-4 rounded-full bg-[#20251f]/90 px-3 py-1.5 text-[10px] font-bold text-white">
          {course.level}
        </span>
      </Link>

      <div className="p-5">
        <Link to={`/courses/${course.id}`}>
          <h3 className="min-h-[52px] font-display text-lg font-extrabold leading-snug tracking-tight text-[#20251f] transition group-hover:text-brand-600">
            {course.title}
          </h3>
        </Link>
        <p className="mt-2 min-h-[72px] text-sm leading-6 text-[#73786d]">
          {course.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-y border-[#20251f]/10 py-3 text-xs text-[#73786d]">
          <span className="flex items-center gap-1.5">
            <Clock3 size={14} /> {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen size={14} /> {course.lessons} lessons
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={14} /> {course.students}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e6ebd9] text-[10px] font-extrabold">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-[#20251f]">{course.instructor}</p>
              <p className="truncate text-[10px] text-[#73786d]">{course.role}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <p className="font-display text-lg font-extrabold text-[#20251f]">
              {formatINR(course.price)}
            </p>
            <Link
              to={`/courses/${course.id}`}
              aria-label={`View ${course.title}`}
              className="grid h-9 w-9 place-items-center rounded-full bg-[#20251f] text-white transition group-hover:bg-brand-600"
            >
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
