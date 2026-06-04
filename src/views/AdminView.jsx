import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { DashboardCard, DashboardCardGrid } from '../components/DashboardCards'

const AdminView = ({ activeView }) => {
  const {
    students,
    apiUsage,
    cpuUsage,
    latency,
    setCurrentRole
  } = useContext(AppContext)

  // System logs simulation state
  const [logs, setLogs] = useState([
    { id: 1, type: 'info', text: 'System boot sequence completed. Redis cache initialized.', time: '10:01:05' },
    { id: 2, type: 'info', text: 'MongoDB connection established at port 27017.', time: '10:01:06' },
    { id: 3, type: 'info', text: 'FastAPI microservice active for vector embeddings.', time: '10:01:08' },
    { id: 4, type: 'success', text: 'AI matching engine loaded with 46 catalog skills.', time: '10:02:15' }
  ])

  // Rolling logs trigger
  useEffect(() => {
    const logsTemplates = [
      { type: 'info', text: 'API Router: GET /api/student/stu1 - Status 200' },
      { type: 'info', text: 'API Router: GET /api/jobs - Status 200' },
      { type: 'success', text: 'AI Matching Engine: Calculated similarity matrix for Sarah Jenkins' },
      { type: 'info', text: 'Academic Registrar: Transmitted sync grade token for stu4' },
      { type: 'warn', text: 'GPA Audit Engine: Detected registrar discrepancy for student account stu4' },
      { type: 'info', text: 'API Router: POST /api/announcements - Status 201' },
      { type: 'success', text: 'NLP Resume Parser: Extracted skills from PDF - Git, Docker, Kubernetes' }
    ]

    const interval = setInterval(() => {
      const randomTemplate = logsTemplates[Math.floor(Math.random() * logsTemplates.length)]
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      
      setLogs(prev => [
        ...prev.slice(-9), // Keep last 10 logs
        {
          id: Date.now(),
          type: randomTemplate.type,
          text: randomTemplate.text,
          time: timestamp
        }
      ])
    }, 4500)

    return () => clearInterval(interval)
  }, [])

  if (activeView === 'users') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">User Role Configurations</h1>
          <p className="page-subtitle">Inspect registered student profiles and adjust active sandbox session roles.</p>
        </div>

        <div className="panel-card">
          <h3 className="panel-card-title">Portal User Registry</h3>
          <div className="table-wrap">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>User Identity</th>
                  <th>Database ID</th>
                  <th>Core Branch</th>
                  <th>Claimed GPA</th>
                  <th>Credential State</th>
                  <th>Account Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>
                      <strong>{student.name}</strong>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>{student.email}</span>
                    </td>
                    <td><code style={{ fontSize: '0.75rem' }}>{student.id}</code></td>
                    <td>{student.branch}</td>
                    <td>{student.gpa}</td>
                    <td>
                      <span className={`badge ${
                        student.verified === 'Verified' ? 'badge-success' : 
                        student.verified === 'Flagged' ? 'badge-danger' : 'badge-warning'
                      }`}>
                        {student.verified}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-secondary"
                        style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}
                        onClick={() => {
                          setCurrentRole('student')
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                      >
                        Impersonate Student
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
          <div className="panel-card">
            <h3 className="panel-card-title">Role-Based Access Control Policies</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Authorized API operations mapped across account namespaces.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.35rem' }}>
                <strong>Role Namespace</strong>
                <strong>Authorizations</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                <span style={{ color: 'var(--primary)' }}>Student</span>
                <span>Self-upload, match calculations, practice interviews</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                <span style={{ color: 'var(--accent)' }}>Recruiter</span>
                <span>Post jobs, candidates ranking, schedule updates</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                <span style={{ color: 'var(--warning)' }}>Placement Officer</span>
                <span>Auditing overrides, announcements broadcast, funnel stats</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                <span style={{ color: 'var(--danger)' }}>System Admin</span>
                <span>System health logs monitoring, API tokens usage analysis</span>
              </div>
            </div>
          </div>
          
          <div className="panel-card">
            <h3 className="panel-card-title">Audit Log Verification Policies</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              All self-declared student GPAs require automated synchronization check against the Academic Registrar DB. If a mismatch of &gt; 0.01 is detected, the student profile is automatically flagged as "Flagged" and blocked from applying to any job drive until audited by the TPO Lead.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (activeView === 'health') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">System Infrastructure Health</h1>
          <p className="page-subtitle">Real-time status streams of cloud containers, microservices, and database transaction queries.</p>
        </div>

        <DashboardCardGrid>
          <DashboardCard 
            title="CPU Utilization" 
            value={`${cpuUsage}%`} 
            footerText="Container limits normal" 
            icon=""
          />
          <DashboardCard 
            title="API Network Latency" 
            value={`${latency}ms`} 
            footerText="Gateway response averages" 
            icon=""
          />
          <DashboardCard 
            title="Total Tokens Synced" 
            value={apiUsage.totalTokens} 
            footerText="Gemini API inputs/outputs" 
            icon=""
          />
          <DashboardCard 
            title="Model Cost Accrued" 
            value={`$${apiUsage.costUSD}`} 
            footerText="Total USD since deploy" 
            icon=""
          />
        </DashboardCardGrid>

        <div className="dashboard-columns">
          {/* Live terminal log stream */}
          <div className="panel-card">
            <h3 className="panel-card-title">Live Server Request Stream</h3>
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="terminal-dot red"></span>
                  <span className="terminal-dot yellow"></span>
                  <span className="terminal-dot green"></span>
                </div>
                <span className="terminal-title">AIPMP_ROUTER_DAEMON</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>ONLINE</span>
              </div>
              <div className="terminal-body">
                {logs.map(log => (
                  <div key={log.id} style={{ display: 'flex', gap: '0.5rem' }}>
                    <span className="terminal-log-line timestamp">[{log.time}]</span>
                    <span className={`terminal-log-line ${log.type === 'error' ? 'error' : log.type === 'warn' ? 'warn' : log.type === 'success' ? 'success' : ''}`}>
                      {log.type.toUpperCase()}: {log.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI APIs tokens analysis */}
          <div className="panel-card">
            <h3 className="panel-card-title">AI Engine Statistics</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>NLP SpaCy Parser Hits:</span>
                <strong>{apiUsage.parserCalls} calls</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Vector Similarity Stacks:</span>
                <strong>{apiUsage.matchEngineCalls} calls</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Average Prompt Latency:</span>
                <strong>180ms</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>API Token Rate Limit:</span>
                <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Healthy</span>
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>AI Endpoint Status</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                Embeddings calculation caches are enabled on redis (92% hit ratio). NLP parser instances scale automatically if CPU load exceeds 75%.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminView
