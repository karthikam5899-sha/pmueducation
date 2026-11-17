import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BookOpen, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import CatalogCourseCard from '../components/CatalogCourseCard'
import { categories, courses } from '../data/courses'

function getStudentCount(value) {
  const count = Number.parseFloat(value)
  return value.toLowerCase().endsWith('k') ? count * 1000 : count
}

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category')
  const initialCategory = categories.some(({ name }) => name === requestedCategory)
    ? requestedCategory
    : 'All'
  const [category, setCategory] = useState(initialCategory)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('popular')

  useEffect(() => {
    setCategory(initialCategory)
  }, [initialCategory])

  const filteredCourses = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()
    const results = courses.filter((course) => {
      const matchesCategory = category === 'All' || course.category === category
      const searchableContent = [
        course.title,
        course.category,
        course.description,
        course.instructor,
        course.role,
        course.level,
      ]
        .join(' ')
        .toLowerCase()

      return matchesCategory && searchableContent.includes(searchTerm)
    })

    return results.sort((first, second) => {
      if (sort === 'price-low') return first.price - second.price
      if (sort === 'rating') return second.rating - first.rating
      return getStudentCount(second.students) - getStudentCount(first.students)
    })
  }, [category, query, sort])

  const visibleCategories =
    category === 'All' ? categories : categories.filter((item) => item.name === category)
  const resultGroups = visibleCategories
    .map((item) => ({
      ...item,
      courses: filteredCourses.filter((course) => course.category === item.name),
    }))
    .filter((item) => item.courses.length > 0)

  function selectCategory(nextCategory) {
    setCategory(nextCategory)
    setSearchParams(nextCategory === 'All' ? {} : { category: nextCategory })
  }

  function clearFilters() {
    selectCategory('All')
    setQuery('')
    setSort('popular')
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#20251f] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-56 h-[600px] w-[600px] rounded-full border-[80px] border-white/[.035]"
        />
        <div className="container-shell relative grid items-center gap-10 py-14 sm:py-16 lg:min-h-[390px] lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#dafa50] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#20251f]">
              <Sparkles size={14} /> The course index
            </p>
            <h1 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Find a skill that takes you{' '}
              <span className="text-[#dafa50]">somewhere.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              Explore practical classes, meet the people teaching them, and choose your next
              step.
            </p>
            <label className="mt-7 flex max-w-xl items-center gap-3 rounded-xl bg-white px-4 py-2 text-[#20251f] shadow-lg">
              <Search size={19} className="shrink-0 text-[#747b70]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search courses, skills or instructors"
                aria-label="Search courses, skills or instructors"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-[#9a9f96]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#747b70] transition hover:bg-[#f0efe7]"
                >
                  <X size={16} />
                </button>
              )}
            </label>
          </div>

          <aside className="hidden justify-self-end lg:block">
            <div className="relative grid h-56 w-56 place-items-center rounded-full border border-white/15">
              <div className="absolute inset-4 rounded-full border border-dashed border-[#dafa50]/40" />
              <div className="text-center">
                <BookOpen className="mx-auto mb-2 text-[#dafa50]" size={28} strokeWidth={1.5} />
                <p className="font-display text-6xl font-extrabold tracking-[-.06em]">25</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[.2em] text-white/55">
                  courses to explore
                </p>
              </div>
              <span className="absolute -right-5 top-8 rounded-full bg-[#f3e5dc] px-4 py-2 text-xs font-extrabold text-[#20251f]">
                5 learning paths
              </span>
              <span className="absolute -bottom-2 left-2 rounded-full bg-[#dafa50] px-4 py-2 text-xs font-extrabold text-[#20251f]">
                Pick your pace ↗
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-shell py-12 sm:py-16">
        <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2" aria-label="Filter by course category">
            <button
              type="button"
              onClick={() => selectCategory('All')}
              aria-pressed={category === 'All'}
              className={`rounded-full border px-4 py-2.5 text-xs font-bold transition ${
                category === 'All'
                  ? 'border-[#20251f] bg-[#20251f] text-white'
                  : 'border-[#20251f]/15 bg-white text-[#596158] hover:border-[#20251f]/40'
              }`}
            >
              All courses <span className="ml-1 opacity-65">{courses.length}</span>
            </button>
            {categories.map((item) => {
              const count = courses.filter((course) => course.category === item.name).length
              const isSelected = category === item.name

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => selectCategory(item.name)}
                  aria-pressed={isSelected}
                  className={`rounded-full border px-4 py-2.5 text-xs font-bold transition ${
                    isSelected
                      ? 'border-[#dafa50] bg-[#dafa50] text-[#20251f]'
                      : 'border-[#20251f]/15 bg-white text-[#596158] hover:border-[#20251f]/40'
                  }`}
                >
                  {item.icon} {item.name} <span className="ml-1 opacity-65">{count}</span>
                </button>
              )
            })}
          </div>

          <label className="flex w-fit items-center gap-2 text-sm text-[#73786d]">
            <SlidersHorizontal size={16} />
            <span className="sr-only">Sort courses</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-lg border border-[#20251f]/15 bg-white px-3 py-2.5 text-xs font-semibold text-[#20251f] outline-none focus:border-[#687454]"
            >
              <option value="popular">Most popular</option>
              <option value="rating">Top rated</option>
              <option value="price-low">Price: low to high</option>
            </select>
          </label>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[#20251f]/10 pb-5">
          <p className="text-sm text-[#73786d]">
            Showing <strong className="text-[#20251f]">{filteredCourses.length}</strong>{' '}
            {filteredCourses.length === 1 ? 'course' : 'courses'}
            {category !== 'All' && (
              <>
                {' '}
                in <strong className="text-[#20251f]">{category}</strong>
              </>
            )}
          </p>
          {(query || category !== 'All') && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-bold text-[#596158] underline decoration-[#9ca391] underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </div>

        {resultGroups.length > 0 ? (
          <div className="space-y-14">
            {resultGroups.map((group, index) => (
              <section key={group.name} aria-labelledby={`category-${index}`}>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e6ebd9] text-xl">
                      {group.icon}
                    </span>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#687454]">
                        Learning path · {String(index + 1).padStart(2, '0')}
                      </p>
                      <h2
                        id={`category-${index}`}
                        className="mt-1 font-display text-2xl font-extrabold tracking-tight text-[#20251f]"
                      >
                        {group.name}
                      </h2>
                      <p className="mt-1 text-sm text-[#73786d]">{group.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#73786d]">
                    {group.courses.length} {group.courses.length === 1 ? 'class' : 'classes'}
                  </span>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {group.courses.map((course) => (
                    <CatalogCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] bg-[#f0efe7] px-6 py-16 text-center">
            <Search className="mx-auto text-[#687454]" size={28} />
            <h2 className="mt-4 font-display text-xl font-extrabold text-[#20251f]">
              No courses found
            </h2>
            <p className="mt-2 text-sm text-[#73786d]">
              Try another keyword or choose a different learning path.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-full bg-[#20251f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#3b4739]"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  )
}
