import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Sidebar = ({ activeView, setActiveView }) => {
  const { currentRole } = useContext(AppContext)

  // Configure navigation links based on user role (no icons or emojis)
  const getNavItems = () => {
    switch (currentRole) {
      case 'student':
        return [
          { id: 'home', label: 'Dashboard' },
          { id: 'jobs', label: 'Matching Jobs' },
          { id: 'resume', label: 'Resume Parser' },
          { id: 'prep', label: 'Prep Portal' }
        ]
      case 'recruiter':
        return [
          { id: 'dashboard', label: 'Hiring Overview' },
          { id: 'jobs', label: 'Job Postings' },
          { id: 'candidates', label: 'Pipeline Board' }
        ]
      case 'officer':
        return [
          { id: 'dashboard', label: 'Funnel Stats' },
          { id: 'verifications', label: 'GPA Audits' },
          { id: 'drives', label: 'Drive Manager' },
          { id: 'announcements', label: 'Broadcasts' }
        ]
      case 'admin':
        return [
          { id: 'users', label: 'User Roles' },
          { id: 'health', label: 'System Health' }
        ]
      default:
        return []
    }
  }

  const items = getNavItems()

  return (
    <div className="sidebar">
      <div className="brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem' }}>
        <span className="brand-text" style={{ fontSize: '1.1rem', letterSpacing: '0.05em' }}>AIPMP PORTAL</span>
        <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product Simulation</span>
      </div>
      
      <ul className="nav-list" style={{ marginTop: '1rem' }}>
        <li style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', padding: '0 1rem 0.25rem 1rem' }}>
          Portal Navigation
        </li>
        {items.map(item => (
          <li
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
            style={{ paddingLeft: '1rem' }}
          >
            <span>{item.label}</span>
          </li>
        ))}

        <li style={{ borderTop: '1px solid var(--border)', margin: '1rem 0' }}></li>

        <li style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', padding: '0 1rem 0.25rem 1rem' }}>
          Simulation Assets
        </li>
        <li
          className={`nav-item ${activeView === 'deliverables' ? 'active' : ''}`}
          onClick={() => setActiveView('deliverables')}
          style={{ paddingLeft: '1rem' }}
        >
          <span>Deliverables Hub</span>
        </li>
      </ul>
      
      <div className="sidebar-footer">
        <p style={{ letterSpacing: '0.03em' }}>AIPMP Core v2.0.0</p>
        <p>Evaluation Sandbox</p>
      </div>
    </div>
  )
}

export default Sidebar

