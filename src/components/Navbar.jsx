import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = ({ setActiveView }) => {
  const { currentRole, setCurrentRole, notifications, currentUser, logoutUser } = useContext(AppContext)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleRoleChange = (e) => {
    const role = e.target.value
    setCurrentRole(role)
    if (role === 'student') setActiveView('home')
    else if (role === 'recruiter') setActiveView('dashboard')
    else if (role === 'officer') setActiveView('dashboard')
    else if (role === 'admin') setActiveView('users')
  }

  // Use real logged-in user name; fall back to role presets
  const getRoleDetails = () => {
    if (currentUser) {
      const initials = currentUser.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
      const label = {
        student: 'Student',
        recruiter: 'Recruiter',
        officer: 'TPO Lead',
        admin: 'System Admin'
      }[currentUser.role] || 'User'
      return { name: currentUser.name, label, avatar: initials }
    }
    switch (currentRole) {
      case 'student':   return { name: 'Sarah Jenkins',        label: 'Student',     avatar: 'SJ' }
      case 'recruiter': return { name: 'John Smith',           label: 'Recruiter',   avatar: 'JS' }
      case 'officer':   return { name: 'Emily Brown',          label: 'TPO Lead',    avatar: 'EB' }
      case 'admin':     return { name: 'System Administrator', label: 'System Admin',avatar: 'SA' }
      default:          return { name: 'Guest',                label: 'User',        avatar: 'U'  }
    }
  }

  const { name, label, avatar } = getRoleDetails()
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <nav className="navbar">
      {/* Left — role switcher (demo convenience) */}
      <div className="navbar-left">
        <div className="role-selector-wrap">
          <span className="role-label">Mode:</span>
          <select className="role-select" value={currentRole} onChange={handleRoleChange}>
            <option value="student">Student Portal</option>
            <option value="recruiter">Recruiter Portal</option>
            <option value="officer">Placement Officer</option>
            <option value="admin">System Admin</option>
          </select>
        </div>
      </div>

      {/* Right — alerts + user badge + sign out */}
      <div className="navbar-right">
        {/* Alerts */}
        <div style={{ position: 'relative' }}>
          <button
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            onClick={() => setShowNotifications(prev => !prev)}
          >
            <span>Alerts</span>
            {unreadCount > 0 && (
              <span style={{
                backgroundColor: 'var(--danger)',
                color: 'white',
                padding: '0.05rem 0.3rem',
                borderRadius: '3px',
                fontSize: '0.65rem',
                fontWeight: 'bold'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '42px',
              right: '0',
              width: '300px',
              backgroundColor: '#1f2937',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.6)',
              zIndex: 1000,
              padding: '0.75rem'
            }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.35rem' }}>
                System Alerts &nbsp;<span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({unreadCount} new)</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '220px', overflowY: 'auto' }}>
                {notifications.length === 0 && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No alerts.</p>
                )}
                {notifications.map(n => (
                  <div key={n.id} style={{ fontSize: '0.75rem', color: n.read ? '#9ca3af' : '#f9fafb', padding: '0.3rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <p style={{ margin: 0 }}>{n.text}</p>
                    <span style={{ fontSize: '0.65rem', color: '#6b7280' }}>{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User badge */}
        <div className="user-profile-badge">
          <div className="avatar" style={{ background: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700 }}>
            {avatar}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span className="username">{name}</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{label}</span>
          </div>
        </div>

        {/* Sign Out */}
        <button
          className="btn btn-secondary"
          style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem', borderColor: 'rgba(239,68,68,0.3)', color: 'var(--danger)' }}
          onClick={logoutUser}
        >
          Sign Out
        </button>
      </div>
    </nav>
  )
}

export default Navbar
