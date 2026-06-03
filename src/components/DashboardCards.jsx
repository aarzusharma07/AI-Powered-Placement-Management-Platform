import React from 'react'

export const DashboardCard = ({ title, value, footerText, isAlert, icon }) => {
  return (
    <div className="kpi-card">
      <div className="kpi-card-header">
        <span className="kpi-title">{title}</span>
        <span style={{ fontSize: '1.25rem' }}>{icon}</span>
      </div>
      <div className="kpi-value">{value}</div>
      <div className={`kpi-footer ${isAlert ? 'warning' : ''}`}>
        {footerText}
      </div>
    </div>
  )
}

export const DashboardCardGrid = ({ children }) => {
  return (
    <div className="kpi-grid">
      {children}
    </div>
  )
}
