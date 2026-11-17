import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
function ScrollToTop(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo(0,0)},[pathname]);return null}
export default function App(){return <><ScrollToTop/><Navbar/><main><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/courses" element={<Courses/>}/><Route path="/courses/:id" element={<CourseDetails/>}/><Route path="/contact" element={<Contact/>}/><Route path="/login" element={<Login/>}/><Route path="/signup" element={<Signup/>}/><Route path="/dashboard" element={<Dashboard/>}/><Route path="*" element={<div className="container-shell py-32 text-center"><h1 className="text-4xl font-extrabold">Page not found</h1><a className="btn-primary mt-6 inline-flex" href="/">Back home</a></div>}/></Routes></main><Footer/></>}