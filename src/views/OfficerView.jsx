import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { DashboardCard, DashboardCardGrid } from '../components/DashboardCards'

const OfficerView = ({ activeView }) => {
  const {
    students,
    jobs,
    applications,
    announcements,
    verifyStudentGPA,
    broadcastAnnouncement,
    resolveDiscrepancy
  } = useContext(AppContext)

  // Broadcast form states
  const [broadcastTitle, setBroadcastTitle] = useState('')
  const [broadcastMessage, setBroadcastMessage] = useState('')

  // Handle broadcast submission
  const handleBroadcastSubmit = (e) => {
    e.preventDefault()
    if (!broadcastTitle || !broadcastMessage) return
    broadcastAnnouncement(broadcastTitle, broadcastMessage, 'Placement Cell Lead')
    setBroadcastTitle('')
    setBroadcastMessage('')
  }

  // Find audit candidates (either flagged, awaiting, or having mismatch)
  const auditStudents = students.filter(s => s.verified === 'Flagged' || s.verified === 'Awaiting' || s.gpa !== s.registrarGpa)

  // Compute stats
  const totalStudents = students.length
  const placedStudents = students.filter(s => s.status === 'placed').length
  const unplacedStudents = students.filter(s => s.status === 'unplaced').length
  const activeDrives = jobs.filter(j => j.status === 'Active').length
  const pendingAuditsCount = auditStudents.filter(s => s.verified !== 'Verified').length

  if (activeView === 'dashboard') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">Placement Cell Executive Panel</h1>
          <p className="page-subtitle">Track longitudinal student hires and active corporate recruitment pipelines.</p>
        </div>

        <DashboardCardGrid>
          <DashboardCard 
            title="Total Candidates" 
            value={totalStudents} 
            footerText="Enrolled final year cohort" 
            icon=""
          />
          <DashboardCard 
            title="Active Companies" 
            value={activeDrives} 
            footerText="Recruitment drives running" 
            icon=""
          />
          <DashboardCard 
            title="Unplaced Cohort" 
            value={unplacedStudents} 
            footerText="Actively applying students" 
            icon=""
          />
          <DashboardCard 
            title="Audit Tasks Pending" 
            value={pendingAuditsCount} 
            footerText="Transcript credentials discrepancy" 
            isAlert={pendingAuditsCount > 0}
            icon=""
          />
        </DashboardCardGrid>

        <div className="dashboard-columns">
          {/* Funnel chart simulation */}
          <div className="panel-card">
            <h3 className="panel-card-title">Placement Progress Funnel</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Visual tracking of placed vs unplaced final-year cohorts.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  <span>Placed (Sarah Accepted, Pending formal lock)</span>
                  <strong>{placedStudents} Candidates ({Math.round((placedStudents / totalStudents) * 100)}%)</strong>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ backgroundColor: 'var(--success)', width: `${(placedStudents / totalStudents) * 100}%`, height: '100%' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  <span>Awaiting Placement</span>
                  <strong>{unplacedStudents} Candidates ({Math.round((unplacedStudents / totalStudents) * 100)}%)</strong>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ backgroundColor: 'var(--primary)', width: `${(unplacedStudents / totalStudents) * 100}%`, height: '100%' }}></div>
                </div>
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Eligibility Overview</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <div className="panel-card" style={{ padding: '0.75rem' }}>
                  <strong>Verified Academic Status</strong>
                  <span>{students.filter(s => s.verified === 'Verified').length} Accounts</span>
                </div>
                <div className="panel-card" style={{ padding: '0.75rem' }}>
                  <strong>Flagged Discrepancy Claims</strong>
                  <span>{students.filter(s => s.verified === 'Flagged').length} Accounts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Alerts */}
          <div className="panel-card">
            <h3 className="panel-card-title">Urgent Auditor Warnings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {auditStudents.length === 0 ? (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>All transcript values synchronized with academic records.</p>
              ) : (
                auditStudents.map(student => (
                  <div key={student.id} style={{ padding: '0.5rem 0.75rem', border: '1px solid rgba(239, 68, 68, 0.2)', backgroundColor: 'var(--danger-light)', borderRadius: '6px' }}>
                    <h5 style={{ fontSize: '0.8rem', fontWeight: 600 }}>{student.name}</h5>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Claimed GPA: {student.gpa} | Registrar GPA: {student.registrarGpa}
                    </p>
                    <span style={{ fontSize: '0.65rem', color: 'var(--danger)', fontWeight: 'bold' }}>
                      Status: {student.verified}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (activeView === 'verifications') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">GPA Audits & Grade Verifications</h1>
          <p className="page-subtitle">Inspect inconsistencies between student claims and the academic Registrar database. Override values to resolve errors.</p>
        </div>

        <div className="panel-card">
          <h3 className="panel-card-title">Academic Record Audit List</h3>
          {auditStudents.length === 0 ? (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No student discrepancies detected. All profile GPAs are verified.</p>
          ) : (
            <div className="table-wrap">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Branch</th>
                    <th>Self-Reported GPA</th>
                    <th>Registrar GPA</th>
                    <th>Backlogs</th>
                    <th>Verification State</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {auditStudents.map(student => {
                    const isMismatch = student.gpa !== student.registrarGpa
                    return (
                      <tr key={student.id}>
                        <td>
                          <strong>{student.name}</strong>
                          <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>{student.email}</span>
                        </td>
                        <td>{student.branch}</td>
                        <td style={{ color: isMismatch ? 'var(--danger)' : '' }}>
                          {student.gpa}
                        </td>
                        <td>{student.registrarGpa}</td>
                        <td>{student.backlogs}</td>
                        <td>
                          <span className={`badge ${
                            student.verified === 'Verified' ? 'badge-success' : 
                            student.verified === 'Flagged' ? 'badge-danger' : 'badge-warning'
                          }`}>
                            {student.verified}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button 
                              className="btn btn-primary" 
                              style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}
                              onClick={() => verifyStudentGPA(student.id, 'Verified')}
                            >
                              Sync to Registrar
                            </button>
                            {student.verified !== 'Flagged' && (
                              <button 
                                className="btn btn-danger" 
                                style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}
                                onClick={() => verifyStudentGPA(student.id, 'Flagged')}
                              >
                                Flag Account
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (activeView === 'drives') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">Drive Manager</h1>
          <p className="page-subtitle">Monitor and review company requirements launched in the placement pool.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {jobs.map(job => {
            const applicantsCount = applications.filter(app => app.jobId === job.id).length
            return (
              <div key={job.id} className="panel-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>{job.title}</h3>
                    <h4 style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 500, margin: '0.25rem 0' }}>{job.company}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Package CTC: <strong>{job.ctc}</strong></p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Applicants:</div>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>{applicantsCount}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.75rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Criteria Prereq: </span>
                    <span>Min GPA {job.minGpa}</span> | <span>Max Backlogs {job.maxBacklogs}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Branches Permitted: </span>
                    {job.branches.join(', ')}
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Status: </span>
                    <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>{job.status}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (activeView === 'announcements') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">Broadcast Official Notices</h1>
          <p className="page-subtitle">Publish announcements, alerts, and instructions to student dashboards globally.</p>
        </div>

        <div className="dashboard-columns">
          {/* Announcement Form */}
          <div className="panel-card">
            <h3 className="panel-card-title">Compose Global Broadcast</h3>
            <form onSubmit={handleBroadcastSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Notice Title:</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required
                  placeholder="e.g. Resume Submission Deadline Extended"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Content Body Message:</label>
                <textarea 
                  className="form-input" 
                  required 
                  rows="5"
                  placeholder="Write clear instructions, eligibility reminders, or company requirements..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Publish Announcement
              </button>
            </form>
          </div>

          {/* Active Notices history */}
          <div className="panel-card">
            <h3 className="panel-card-title">Published Notice History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {announcements.map(ann => (
                <div key={ann.id} style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600 }}>{ann.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>{ann.message}</p>
                  <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--primary)', marginTop: '0.5rem' }}>
                    <span>By {ann.sender}</span>
                    <span>Date: {ann.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OfficerView
