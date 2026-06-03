import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Sidebar = ({ activeView, setActiveView }) => {
  const { currentRole } = useContext(AppContext)

  // Configure navigation links based on user role
  const getNavItems = () => {
    switch (currentRole) {
      case 'student':
        return [
          { id: 'home', label: 'Dashboard', icon: '📊' },
          { id: 'jobs', label: 'Matching Jobs', icon: '💼' },
          { id: 'resume', label: 'Resume Parser', icon: '📄' },
          { id: 'prep', label: 'Prep Portal', icon: '🧠' }
        ]
      case 'recruiter':
        return [
          { id: 'dashboard', label: 'Hiring Overview', icon: '📊' },
          { id: 'jobs', label: 'Job Postings', icon: '✏️' },
          { id: 'candidates', label: 'Pipeline Board', icon: '👥' }
        ]
      case 'officer':
        return [
          { id: 'dashboard', label: 'Funnel Stats', icon: '📈' },
          { id: 'verifications', label: 'GPA Audits', icon: '🛡️' },
          { id: 'drives', label: 'Drive Manager', icon: '🏢' },
          { id: 'announcements', label: 'Broadcasts', icon: '📢' }
        ]
      case 'admin':
        return [
          { id: 'users', label: 'User Roles', icon: '👥' },
          { id: 'health', label: 'System Health', icon: '⚡' }
        ]
      default:
        return []
    }
  }

  const items = getNavItems()

  return (
    <div className="sidebar">
      <div className="brand">
        <span className="brand-logo">🤖</span>
        <span className="brand-text">AIPMP SaaS</span>
      </div>
      
      <ul className="nav-list">
        {items.map(item => (
          <li
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      
      <div className="sidebar-footer">
        <p>AIPMP System v1.0.0</p>
        <p>© 2026 Dev Sim</p>
      </div>
    </div>
  )
}

export default Sidebar
