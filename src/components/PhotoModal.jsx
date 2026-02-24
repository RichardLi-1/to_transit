import { useEffect } from 'react'
import './PhotoModal.css'

export default function PhotoModal({ photo, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Photo */}
        <div className="modal-image-wrap">
          <div className="modal-image-placeholder" style={{ backgroundColor: photo.bg }} />
        </div>

        {/* Details */}
        <div className="modal-details">
          <div className="modal-details-left">
            <p className="modal-title">{photo.title ?? 'Untitled'}</p>
            <p className="modal-attr">@{photo.username}</p>
          </div>

          <div className="modal-meta-grid">
            <div className="modal-meta-col">
              {photo.agency    && <span>{photo.agency}</span>}
              {photo.station   && <span>{photo.station}</span>}
              {photo.vehicle   && <span>{photo.vehicle}</span>}
            </div>
            <div className="modal-meta-col">
              {photo.camera    && <span>{photo.camera}</span>}
              {photo.focal     && <span>{photo.focal}</span>}
              {photo.iso       && <span>{photo.iso}</span>}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
