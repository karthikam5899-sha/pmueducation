import { Link } from 'react-router-dom'
import { Star, Clock3, BookOpen, ArrowUpRight } from 'lucide-react'
import formatINR from '../utils/formatINR'
export default function CourseCard({course}){return <article className="course-card group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
  <Link to={`/courses/${course.id}`} className="relative block overflow-hidden"><img src={course.image} alt={course.title} className="h-52 w-full object-cover transition duration-700 group-hover:scale-105"/><span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-brand-700">{course.category}</span></Link>
  <div className="p-5"><div className="mb-3 flex items-center justify-between text-xs text-slate-500"><span>{course.level}</span><span className="flex items-center gap-1 font-bold text-amber-500"><Star size={14} fill="currentColor"/>{course.rating}</span></div>
  <Link to={`/courses/${course.id}`}><h3 className="min-h-[52px] font-display text-lg font-bold leading-snug text-slate-900 transition group-hover:text-brand-600">{course.title}</h3></Link>
  <p className="mt-2 text-sm text-slate-500">By {course.instructor}</p><div className="mt-5 flex gap-4 border-b border-slate-100 pb-4 text-xs text-slate-500"><span className="flex items-center gap-1.5"><Clock3 size={14}/>{course.duration}</span><span className="flex items-center gap-1.5"><BookOpen size={14}/>{course.lessons} lessons</span></div>
  <div className="flex items-center justify-between pt-4"><span className="text-xl font-extrabold text-slate-900">{formatINR(course.price)}</span><Link to={`/courses/${course.id}`} className="flex items-center gap-1 text-sm font-bold text-brand-600">View course <ArrowUpRight size={16}/></Link></div></div>
</article>}