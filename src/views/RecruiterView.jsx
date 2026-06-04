import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { DashboardCard, DashboardCardGrid } from '../components/DashboardCards'

const RecruiterView = ({ activeView, setActiveView }) => {
  const { 
    jobs, 
    applications, 
    students, 
    updateApplicationStage, 
    submitJob,
    getMatchScore 
  } = useContext(AppContext)

  // Recruiter active job selector for pipeline view
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || '')

  // New job form state
  const [company, setCompany] = useState('')
  const [title, setTitle] = useState('')
  const [ctc, setCtc] = useState('')
  const [skillsText, setSkillsText] = useState('')
  const [minGpa, setMinGpa] = useState(7.5)
  const [maxBacklogs, setMaxBacklogs] = useState(0)
  const [selectedBranches, setSelectedBranches] = useState(['Computer Science'])
  const [description, setDescription] = useState('')

  // Handle branch checkboxes
  const handleBranchToggle = (branch) => {
    if (selectedBranches.includes(branch)) {
      setSelectedBranches(prev => prev.filter(b => b !== branch))
    } else {
      setSelectedBranches(prev => [...prev, branch])
    }
  }

  // Handle job submit
  const handleJobSubmit = (e) => {
    e.preventDefault()
    if (!company || !title || !ctc) return
    
    submitJob({
      company,
      title,
      ctc,
      skillsRequired: skillsText.split(',').map(s => s.trim()).filter(Boolean),
      minGpa: parseFloat(minGpa),
      maxBacklogs: parseInt(maxBacklogs),
      branches: selectedBranches,
      description
    })
    
    // Reset forms
    setCompany('')
    setTitle('')
    setCtc('')
    setSkillsText('')
    setDescription('')
    setActiveView('dashboard')
  }

  // Filter applications by selected job
  const jobApps = applications.filter(app => app.jobId === selectedJobId)

  // Pipeline column arrays (no icons)
  const columns = [
    { id: 'screening', title: 'Resume Screen', color: 'var(--text-muted)' },
    { id: 'test', title: 'Technical Assessment', color: 'var(--warning)' },
    { id: 'interview', title: 'Interview Rounds', color: 'var(--accent)' },
    { id: 'offered', title: 'Offered', color: 'var(--success)' },
    { id: 'rejected', title: 'Rejected', color: 'var(--danger)' }
  ]

  if (activeView === 'dashboard') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">Recruiter Dashboard</h1>
          <p className="page-subtitle">Manage campus talent pools and monitor ongoing selection funnels.</p>
        </div>

        <DashboardCardGrid>
          <DashboardCard 
            title="Open Postings" 
            value={jobs.length} 
            footerText="Active listings in placement pool" 
            icon=""
          />
          <DashboardCard 
            title="Total Applications" 
            value={applications.length} 
            footerText="Resume screenings matching criteria" 
            icon=""
          />
          <DashboardCard 
            title="Scheduled Interviews" 
            value={applications.filter(a => a.stage === 'interview').length} 
            footerText="Slots coordinated automatically" 
            icon=""
          />
          <DashboardCard 
            title="Offers Extended" 
            value={applications.filter(a => a.stage === 'offered').length} 
            footerText="Offered conversion yield: 85%" 
            icon=""
          />
        </DashboardCardGrid>

        <div className="dashboard-columns">
          {/* Recent Applicants */}
          <div className="panel-card">
            <h3 className="panel-card-title">Recent Applicants Funnel</h3>
            <div className="table-wrap">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Role Applied</th>
                    <th>CGPA</th>
                    <th>Match Rating</th>
                    <th>Hiring Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.slice(-5).map(app => {
                    const student = students.find(s => s.id === app.studentId)
                    const job = jobs.find(j => j.id === app.jobId)
                    if (!student || !job) return null
                    const score = getMatchScore(student, job)

                    return (
                      <tr key={app.id}>
                        <td><strong>{student.name}</strong></td>
                        <td>{job.company} - {job.title}</td>
                        <td>{student.gpa}</td>
                        <td><span className="badge badge-accent">{score}% Match</span></td>
                        <td>
                          <span className={`badge ${
                            app.stage === 'offered' ? 'badge-success' : 
                            app.stage === 'rejected' ? 'badge-danger' : 
                            app.stage === 'interview' ? 'badge-accent' : 'badge-warning'
                          }`}>
                            {app.stage}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick links to active posts */}
          <div className="panel-card">
            <h3 className="panel-card-title">Active Job Rules</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {jobs.map(job => (
                <div key={job.id} style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600 }}>{job.company} | {job.title}</h4>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>Eligibility: CGPA &ge; {job.minGpa} | Backlogs = {job.maxBacklogs}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', marginTop: '0.25rem' }}>
                    {job.skillsRequired.map(skill => (
                      <span key={skill} style={{ fontSize: '0.65rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (activeView === 'jobs') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">Post a New Job Opportunity</h1>
          <p className="page-subtitle">Publish drive rules, set criteria benchmarks, and launch candidate mapping.</p>
        </div>

        <div className="panel-card">
          <form onSubmit={handleJobSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Company Name:</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="e.g. Google Cloud" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Job Title:</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="e.g. Software Engineer 1" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Compensation Package (CTC):</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="e.g. $135,000" 
                  value={ctc}
                  onChange={(e) => setCtc(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Required Skills (Comma separated):</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. React, Node.js, AWS, Docker" 
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Minimum CGPA Prerequisite:</label>
                <input 
                  type="number" 
                  step="0.01" 
                  className="form-input" 
                  value={minGpa}
                  onChange={(e) => setMinGpa(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Maximum Allowed Backlogs:</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={maxBacklogs}
                  onChange={(e) => setMaxBacklogs(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Target Branch Permissions:</label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                {['Computer Science', 'Electronics', 'Mechanical Engineering'].map(branch => (
                  <label key={branch} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedBranches.includes(branch)}
                      onChange={() => handleBranchToggle(branch)}
                    />
                    {branch}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Job Description Context:</label>
              <textarea 
                className="form-input" 
                rows="4" 
                placeholder="Describe roles, day-to-day work, team structures..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              Launch Placement Drive
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (activeView === 'candidates') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">Candidate Pipeline Board</h1>
          <p className="page-subtitle">Track and transition applicants dynamically across recruitment rounds.</p>
        </div>

        <div className="panel-card" style={{ marginBottom: '1rem' }}>
          <div className="form-group" style={{ maxWidth: '300px' }}>
            <label className="form-label">Select Active Drive:</label>
            <select 
              className="filter-select"
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
            >
              {jobs.map(j => (
                <option key={j.id} value={j.id}>{j.company} - {j.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Kanban Board Grid */}
        <div className="kanban-board">
          {columns.map(col => {
            const columnApps = jobApps.filter(app => app.stage === col.id)
            return (
              <div key={col.id} className="kanban-column">
                <div className="kanban-column-header">
                  <span className="kanban-column-title" style={{ color: col.color }}>{col.title}</span>
                  <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.05)', fontSize: '0.7rem' }}>
                    {columnApps.length}
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1, overflowY: 'auto' }}>
                  {columnApps.length === 0 ? (
                    <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.7rem', padding: '1rem' }}>
                      Empty Round
                    </div>
                  ) : (
                    columnApps.map(app => {
                      const student = students.find(s => s.id === app.studentId)
                      if (!student) return null
                      const score = getMatchScore(student, jobs.find(j => j.id === selectedJobId))

                      return (
                        <div key={app.id} className="kanban-card">
                          <div className="kanban-card-title">{student.name}</div>
                          <div className="kanban-card-meta">
                            GPA: {student.gpa} | Match: <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{score}%</span>
                          </div>
                          
                          {/* Simulated drag-and-drop promoters */}
                          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.5rem', marginTop: '0.25rem', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', gap: '0.25rem' }}>
                            {col.id !== 'rejected' && col.id !== 'offered' && (
                              <button 
                                className="btn btn-secondary" 
                                style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', flexGrow: 1 }}
                                onClick={() => updateApplicationStage(app.id, 'rejected')}
                              >
                                Reject
                              </button>
                            )}

                            {col.id === 'screening' && (
                              <button 
                                className="btn btn-primary" 
                                style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', flexGrow: 1 }}
                                onClick={() => updateApplicationStage(app.id, 'test')}
                              >
                                Pass Screen
                              </button>
                            )}

                            {col.id === 'test' && (
                              <button 
                                className="btn btn-primary" 
                                style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', flexGrow: 1 }}
                                onClick={() => updateApplicationStage(app.id, 'interview')}
                              >
                                Pass Test
                              </button>
                            )}

                            {col.id === 'interview' && (
                              <button 
                                className="btn btn-primary" 
                                style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', flexGrow: 1 }}
                                onClick={() => updateApplicationStage(app.id, 'offered')}
                              >
                                Offer
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default RecruiterView
