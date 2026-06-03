import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = ({ setActiveView }) => {
  const { currentRole, setCurrentRole, notifications } = useContext(AppContext)
  const [showNotifications, setShowNotifications] = useState(false)

  // Handle switching roles and resetting default views
  const handleRoleChange = (e) => {
    const role = e.target.value
    setCurrentRole(role)
    
    if (role === 'student') {
      setActiveView('home')
    } else if (role === 'recruiter') {
      setActiveView('dashboard')
    } else if (role === 'officer') {
      setActiveView('dashboard')
    } else if (role === 'admin') {
      setActiveView('users')
    }
  }

  // Set avatar details based on active role
  const getRoleDetails = () => {
    switch (currentRole) {
      case 'student':
        return { name: 'Sarah Jenkins', label: 'Student', avatar: 'SJ' }
      case 'recruiter':
        return { name: 'Xebia HR Specialist', label: 'Recruiter', avatar: 'XH' }
      case 'officer':
        return { name: 'Dr. Anita Sharma', label: 'TPO Lead', avatar: 'AS' }
      case 'admin':
        return { name: 'System Administrator', label: 'SuperAdmin', avatar: 'SA' }
      default:
        return { name: 'Guest', label: 'User', avatar: 'U' }
    }
  }

  const { name, label, avatar } = getRoleDetails()

  // Unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="role-selector-wrap">
          <span className="role-label">Portal Mode</span>
          <select 
            className="role-select" 
            value={currentRole} 
            onChange={handleRoleChange}
          >
            <option value="student">🎓 Student View</option>
            <option value="recruiter">🏢 Recruiter View</option>
            <option value="officer">👔 Placement Officer</option>
            <option value="admin">🔑 System Admin</option>
          </select>
        </div>
      </div>

      <div className="navbar-right">
        {/* Notifications Icon & Popover */}
        <div style={{ position: 'relative' }}>
          <button 
            className="notifications-bell"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔 {unreadCount > 0 && <span className="badge-dot"></span>}
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '40px',
              right: '0',
              width: '280px',
              backgroundColor: '#1f2937',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)',
              zIndex: 1000,
              padding: '0.75rem'
            }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.25rem' }}>
                System Alerts ({unreadCount} new)
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{ fontSize: '0.75rem', color: n.read ? '#9ca3af' : '#f9fafb', padding: '0.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <p>{n.text}</p>
                    <span style={{ fontSize: '0.65rem', color: '#6b7280' }}>{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="user-profile-badge">
          <div className="avatar">{avatar}</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span className="username">{name}</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{label}</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
