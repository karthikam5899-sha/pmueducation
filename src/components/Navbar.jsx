import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
const links = [['Home','/'],['About Us','/about'],['Courses','/courses'],['Contact','/contact']]
export default function Navbar(){
  const [open,setOpen]=useState(false)
  const {user,logOut}=useAuth()
  const navigate=useNavigate()
  const visibleLinks=user?[...links,['Dashboard','/dashboard']]:links
  const handleLogOut=()=>{logOut();setOpen(false);navigate('/')}
  const linkClass=({isActive})=>`text-sm font-semibold transition hover:text-brand-600 ${isActive?'text-brand-600':'text-slate-600'}`
  return <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
    <div className="container-shell flex h-[76px] items-center justify-between">
      <Link to="/" className="flex items-center gap-2.5" onClick={()=>setOpen(false)}>
        <img src="/PMU%20Education.png" alt="" className="h-10 w-10 shrink-0 object-contain" />
        <span className="whitespace-nowrap font-display text-lg font-extrabold tracking-tight text-slate-900">PMU Education</span>
      </Link>
      <nav className="hidden items-center gap-8 md:flex">{visibleLinks.map(([label,path])=><NavLink key={path} to={path} className={linkClass}>{label}</NavLink>)}</nav>
      <div className="hidden items-center gap-3 md:flex">{user?<><span className="max-w-32 truncate text-xs font-semibold text-slate-500">{user.name}</span><button type="button" onClick={handleLogOut} className="btn-ghost">Log out</button></>:<><Link to="/login" className="btn-ghost">Log in</Link><Link to="/signup" className="btn-primary">Get started <ArrowRight size={16}/></Link></>}</div>
      <button className="rounded-lg p-2 text-slate-700 md:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
    </div>
    {open&&<div className="border-t border-slate-100 bg-white px-6 py-5 md:hidden"><nav className="flex flex-col gap-5">{visibleLinks.map(([label,path])=><NavLink key={path} to={path} onClick={()=>setOpen(false)} className={linkClass}>{label}</NavLink>)}<div className="flex gap-3 pt-2">{user?<button type="button" onClick={handleLogOut} className="btn-ghost">Log out</button>:<><Link to="/login" onClick={()=>setOpen(false)} className="btn-ghost">Log in</Link><Link to="/signup" onClick={()=>setOpen(false)} className="btn-primary">Get started</Link></>}</div></nav></div>}
  </header>
}