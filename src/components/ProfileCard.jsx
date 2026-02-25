import { supabase } from '../lib/supabase'
import './ProfileCard.css'

function getInitials(session) {
  const name = session.user.user_metadata?.full_name
  if (name) return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (session.user.email?.[0] ?? '?').toUpperCase()
}

function getDisplayName(session) {
  return session.user.user_metadata?.full_name || session.user.email
}

function formatJoinDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function ProfileCard({ session }) {
  return (
    <div className="profile-card">
      <div className="profile-card-top">
        <div className="profile-avatar">{getInitials(session)}</div>
        <span className="profile-name">{getDisplayName(session)}</span>
        <button className="profile-settings-btn" aria-label="Settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>
      <p className="profile-joined">Joined {formatJoinDate(session.user.created_at)}</p>
      <div className="profile-actions">
        <button className="profile-action-btn">View Profile</button>
        <button className="profile-action-btn" onClick={() => supabase.auth.signOut()}>Log Out</button>
      </div>
    </div>
  )
}
