import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import './HomePage.css'

const sections = [
  { path: '/photography', label: 'Photography', desc: 'A community gallery of transit photography.' },
  { path: '/progress', label: 'Progress', desc: 'Tracking expansions and system updates across the network.' },
  { path: '/news', label: 'News', desc: 'Latest transit news and announcements.' },
  { path: '/writing', label: 'Writing', desc: 'Essays, spotlights, and long-form pieces.' },
]

export default function HomePage() {
  return (
    <div className="site">
      <Nav />
      <main className="home-main">
        <div className="home-hero">
          <h1 className="home-title">TO TRANSIT</h1>
          <p className="home-sub">An open community for Toronto's transit enthusiasts.</p>
        </div>
        <div className="home-grid">
          {sections.map(s => (
            <Link key={s.path} to={s.path} className="home-card">
              <span className="home-card-label">{s.label}</span>
              <p className="home-card-desc">{s.desc}</p>
            </Link>
          ))}
        </div>
      </main>
      <footer className="footer">
        <a href="https://discord.gg/9n7CMmEpcb" target="_blank" rel="noreferrer" className="discord-link">Join the Discord Server</a>
      </footer>
    </div>
  )
}
