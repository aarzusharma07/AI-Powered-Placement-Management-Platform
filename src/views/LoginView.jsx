import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'

const LoginView = () => {
  const { loginUser, dbStatus, errorMsg, setErrorMsg } = useContext(AppContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRolePreset, setSelectedRolePreset] = useState('student')

  // Set credentials presets based on selection
  useEffect(() => {
    setErrorMsg('')
    if (selectedRolePreset === 'student') {
      setEmail('sarah@university.edu')
      setPassword('password123')
    } else if (selectedRolePreset === 'recruiter') {
      setEmail('john@techcorp.com')
      setPassword('password123')
    } else if (selectedRolePreset === 'officer') {
      setEmail('emily@university.edu')
      setPassword('password123')
    } else if (selectedRolePreset === 'admin') {
      setEmail('admin@university.edu')
      setPassword('password123')
    }
  }, [selectedRolePreset])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) return
    loginUser(email, password)
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      background: '#0b0f17',
      padding: '1.5rem',
      fontFamily: 'var(--font-sans)'
    }}>
      <div className="glass-card" style={{
        width: '420px',
        padding: '2.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ 
            fontSize: '0.65rem', 
            color: 'var(--primary)', 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: '0.25rem'
          }}>
            Placement Management System
          </span>
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 700, 
            fontSize: '1.5rem', 
            letterSpacing: '0.02em',
            color: 'var(--text-main)'
          }}>
            Sign In to Portal
          </h2>
        </div>

        {/* Database connectivity status diagnostic banner */}
        <div style={{ 
          fontSize: '0.7rem', 
          fontFamily: 'monospace', 
          padding: '0.6rem 0.85rem', 
          borderRadius: '6px', 
          textAlign: 'center',
          backgroundColor: dbStatus === 'online' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
          border: dbStatus === 'online' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(245, 158, 11, 0.2)',
          color: dbStatus === 'online' ? 'var(--success)' : 'var(--warning)'
        }}>
          {dbStatus === 'online' 
            ? 'DATABASE STATUS: CONNECTED TO LOCAL MONGODB' 
            : 'DATABASE STATUS: OFFLINE (RUNNING IN-MEMORY SANDBOX)'}
        </div>

        {/* Preset Role Selectors */}
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            Choose Role Preset Profile
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
            <button 
              type="button" 
              className={`story-filter-btn ${selectedRolePreset === 'student' ? 'active' : ''}`}
              onClick={() => setSelectedRolePreset('student')}
              style={{ fontSize: '0.7rem', padding: '0.35rem 0.5rem' }}
            >
              Student (Sarah)
            </button>
            <button 
              type="button" 
              className={`story-filter-btn ${selectedRolePreset === 'recruiter' ? 'active' : ''}`}
              onClick={() => setSelectedRolePreset('recruiter')}
              style={{ fontSize: '0.7rem', padding: '0.35rem 0.5rem' }}
            >
              Recruiter (John)
            </button>
            <button 
              type="button" 
              className={`story-filter-btn ${selectedRolePreset === 'officer' ? 'active' : ''}`}
              onClick={() => setSelectedRolePreset('officer')}
              style={{ fontSize: '0.7rem', padding: '0.35rem 0.5rem' }}
            >
              TPO Lead (Emily)
            </button>
            <button 
              type="button" 
              className={`story-filter-btn ${selectedRolePreset === 'admin' ? 'active' : ''}`}
              onClick={() => setSelectedRolePreset('admin')}
              style={{ fontSize: '0.7rem', padding: '0.35rem 0.5rem' }}
            >
              System Admin
            </button>
          </div>
        </div>

        {/* Auth Credentials Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              required
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMsg && (
            <div style={{ color: 'var(--danger)', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.625rem' }}>
            Authenticate Session
          </button>
        </form>

        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          By signing in, you access the sandbox simulation context. Change parameters at any time using the mode selector.
        </div>
      </div>
    </div>
  )
}

export default LoginView
