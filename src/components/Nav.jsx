import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import LoginModal from './LoginModal'
import './Nav.css'

const SECTION_LABELS = {
  '/photography': 'Photography',
  '/progress': 'Progress',
  '/news': 'News',
  '/writing': 'Writing',
}

export default function Nav() {
  const location = useLocation()
  const [dark, setDark] = useState(
    () => localStorage.getItem('theme') === 'dark'
  )
  const [loginOpen, setLoginOpen] = useState(false)
  const [session, setSession] = useState(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session)
      if (session) setLoginOpen(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  const section = SECTION_LABELS[location.pathname]
  const loggedIn = !!session

  return (
    <>
      <nav className="nav">
        <span className="nav-logo">
          <Link to="/" className="nav-logo-home">TO TRANSIT</Link>
          {section && <span className="nav-logo-section"> {section}</span>}
        </span>
        <ul className="nav-links">
          <li><Link to="/progress" className={location.pathname === '/progress' ? 'active' : ''}>Progress</Link></li>
          <li><Link to="/news" className={location.pathname === '/news' ? 'active' : ''}>News</Link></li>
          <li><Link to="/photography" className={location.pathname === '/photography' ? 'active' : ''}>Photography</Link></li>
          <li><Link to="/writing" className={location.pathname === '/writing' ? 'active' : ''}>Writing</Link></li>
          

          {!loggedIn ? <li>
            <button className="nav-login-btn" onClick={() => setLoginOpen(true)}>Log In</button>
          </li> : 
            <li>
            <button className="nav-login-btn" onClick={() => setLoginOpen(true)}>Profile</button>
          </li>
          }
          <li>
            <button className="theme-toggle" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
              {dark ? '☀' : '☾'}
            </button>
          </li>
        </ul>
      </nav>

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </>
  )
}
