import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { DashboardCard, DashboardCardGrid } from '../components/DashboardCards'

const StudentView = ({ activeView }) => {
  const { 
    students, 
    jobs, 
    applications, 
    applyToJob, 
    getMatchScore, 
    runResumeParser, 
    isParsing, 
    parsingProgress,
    announcements,
    requestProfileEdit
  } = useContext(AppContext)

  // Use primary student (Sarah Jenkins, stu1) for the student view
  const student = students.find(s => s.id === 'stu1')
  const studentApps = applications.filter(app => app.studentId === student.id)
  
  // Checking if student got offered
  const offeredApp = studentApps.find(app => app.stage === 'offered')
  const targetJobName = offeredApp ? jobs.find(j => j.id === offeredApp.jobId)?.company : ''

  // Interview prep states
  const [selectedPrepJob, setSelectedPrepJob] = useState('')
  const [prepQuestions, setPrepQuestions] = useState([])
  const [isPrepGenerating, setIsPrepGenerating] = useState(false)

  // GPA request modal states
  const [showEditModal, setShowEditModal] = useState(false)
  const [gpaInput, setGpaInput] = useState(student.gpa)

  // Trigger simulated AI Interview prep question generator
  const generatePrepQuestions = () => {
    if (!selectedPrepJob) return
    setIsPrepGenerating(true)
    setPrepQuestions([])
    
    setTimeout(() => {
      setIsPrepGenerating(false)
      const targetJob = jobs.find(j => j.id === selectedPrepJob)
      setPrepQuestions([
        {
          q: `Explain how you used React and state management to resolve application state in your projects.`,
          a: `Focus on explaining the Context API or Redux setup. Highlight hooks (useContext, useReducer) and how you prevented unwanted re-renders.`
        },
        {
          q: `Your resume lists SQL experience. How would you optimize a query that is experiencing significant transaction latency?`,
          a: `Mention setting indexes on high-search query fields, reviewing execution plans (EXPLAIN), and utilizing Redis caching where write frequencies are low.`
        },
        {
          q: `Tell me about a time you worked under a tight deadline to release a software iteration.`,
          a: `Structure your answer using the STAR format (Situation, Task, Action, Result). Emphasize how you prioritized Must-Have components.`
        },
        {
          q: `How would you handle a disagreement with a product manager regarding the technical scope of a feature?`,
          a: `Emphasize collaborative communication, presenting data-driven alternative options, and seeking middle-ground iterations (MVP releases).`
        }
      ])
    }, 1200)
  }

  // File drag-over simulator
  const handleDragOver = (e) => e.preventDefault()

  if (activeView === 'home') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">Student Portal</h1>
          <p className="page-subtitle">Welcome back, {student.name} | Branch: {student.branch}</p>
        </div>

        {/* Offer Celebration Banner */}
        {offeredApp && (
          <div className="celebration-banner">
            <span className="celebration-emoji">🎉</span>
            <div className="celebration-text">
              <h4>Congratulations! You have a job offer!</h4>
              <p>{targetJobName} has rolled out a formal job offer for you. Please coordinate with the Placement Cell to lock your confirmation.</p>
            </div>
          </div>
        )}

        <DashboardCardGrid>
          <DashboardCard 
            title="Applications Submitted" 
            value={studentApps.length} 
            footerText="All academic records locked" 
            icon="📁"
          />
          <DashboardCard 
            title="Upcoming Interviews" 
            value={studentApps.filter(a => a.stage === 'interview').length} 
            footerText="Next scheduled event: June 8" 
            icon="📅"
          />
          <DashboardCard 
            title="AI Resume Score" 
            value={`${student.resumeScore}/100`} 
            footerText="Top 15% in your branch cohort" 
            icon="🧠"
          />
        </DashboardCardGrid>

        <div className="dashboard-columns">
          {/* Active Job applications progress tracker */}
          <div className="panel-card">
            <h3 className="panel-card-title">My Active Pipelines</h3>
            {studentApps.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No active job applications. Go to "Matching Jobs" to apply.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {studentApps.map(app => {
                  const job = jobs.find(j => j.id === app.jobId)
                  return (
                    <div key={app.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div>
                          <strong style={{ fontSize: '0.95rem' }}>{job.company}</strong>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{job.title}</span>
                        </div>
                        <span className={`badge ${
                          app.stage === 'offered' ? 'badge-success' : 
                          app.stage === 'rejected' ? 'badge-danger' : 
                          app.stage === 'interview' ? 'badge-accent' : 'badge-warning'
                        }`}>
                          {app.stage}
                        </span>
                      </div>
                      
                      {/* Visual progress bar steps */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>
                        <span style={{ fontWeight: app.stage === 'screening' ? 'bold' : 'normal', color: app.stage === 'screening' ? 'var(--primary)' : '' }}>1. Screen</span>
                        <span style={{ fontWeight: app.stage === 'test' ? 'bold' : 'normal', color: app.stage === 'test' ? 'var(--primary)' : '' }}>2. Test</span>
                        <span style={{ fontWeight: app.stage === 'interview' ? 'bold' : 'normal', color: app.stage === 'interview' ? 'var(--primary)' : '' }}>3. Interview</span>
                        <span style={{ fontWeight: app.stage === 'offered' ? 'bold' : 'normal', color: app.stage === 'offered' ? 'var(--success)' : '' }}>4. Offer</span>
                      </div>

                      <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Update Notes: {app.notes}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Announcements & Profile controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="panel-card">
              <h3 className="panel-card-title">Official Announcements</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {announcements.map(ann => (
                  <div key={ann.id} style={{ padding: '0.5rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: 600 }}>{ann.title}</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>{ann.message}</p>
                    <span style={{ fontSize: '0.65rem', color: 'var(--primary)' }}>By {ann.sender} | {ann.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-card">
              <h3 className="panel-card-title">Academic Record Status</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Registered GPA:</span>
                  <strong>{student.gpa}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Backlog Count:</span>
                  <strong>{student.backlogs}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Profile Check:</span>
                  <span className={`badge ${student.verified === 'Verified' ? 'badge-success' : 'badge-warning'}`}>
                    {student.verified}
                  </span>
                </div>
                <button 
                  className="btn btn-secondary" 
                  style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.75rem' }}
                  onClick={() => setShowEditModal(true)}
                >
                  Modify GPA Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* GPA Edit Modal Simulator */}
        {showEditModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
          }}>
            <div className="panel-card" style={{ width: '360px' }}>
              <h3 className="panel-card-title">Edit GPA Profile</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Changing GPA values will lock your profile and require verification by the Placement Officer.
              </p>
              <div className="form-group" style={{ margin: '1rem 0' }}>
                <label className="form-label">Requested GPA:</label>
                <input 
                  type="number" 
                  step="0.01" 
                  className="form-input" 
                  value={gpaInput} 
                  onChange={(e) => setGpaInput(parseFloat(e.target.value))} 
                />
              </div>
              <div style={{ display: 'flex', justifySelf: 'end', gap: '0.5rem' }}>
                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => {
                  requestProfileEdit(student.id, gpaInput)
                  setShowEditModal(false)
                }}>Submit Request</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (activeView === 'jobs') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">AI Job Recommendations</h1>
          <p className="page-subtitle">Jobs are sorted dynamically by matching vector weights based on your profile.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {jobs.map(job => {
            const hasApplied = applications.some(app => app.studentId === student.id && app.jobId === job.id)
            const matchScore = getMatchScore(student, job)
            
            // Check eligibility rules
            const meetsGpa = student.gpa >= job.minGpa
            const meetsBacklogs = student.backlogs <= job.maxBacklogs
            const meetsBranch = job.branches.includes(student.branch)
            const isEligible = meetsGpa && meetsBacklogs && meetsBranch
            const verifiedRole = student.verified === 'Verified'

            return (
              <div key={job.id} className="panel-card" style={{ borderLeft: `4px solid ${hasApplied ? 'var(--success)' : isEligible ? 'var(--primary)' : 'var(--danger)'}` }}>
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{job.title}</h3>
                    <h4 style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 500, margin: '0.25rem 0' }}>{job.company}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Package CTC: <strong>{job.ctc}</strong></p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-accent" style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem' }}>
                        {matchScore}% AI Match
                      </span>
                    </div>

                    {hasApplied ? (
                      <button className="btn btn-secondary" disabled>Applied</button>
                    ) : !verifiedRole ? (
                      <button className="btn btn-secondary" disabled>Awaiting Verification</button>
                    ) : !isEligible ? (
                      <button className="btn btn-danger" disabled style={{ fontSize: '0.75rem' }}>Ineligible</button>
                    ) : (
                      <button className="btn btn-primary" onClick={() => applyToJob(student.id, job.id)}>Quick Apply</button>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>
                  {job.description}
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.75rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Required Skills: </span>
                    {job.skillsRequired.map(skill => (
                      <span key={skill} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.15rem 0.4rem', borderRadius: '4px', marginLeft: '0.25rem' }}>{skill}</span>
                    ))}
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Rules: </span>
                    <span style={{ color: meetsGpa ? 'var(--success)' : 'var(--danger)' }}>Min GPA: {job.minGpa}</span> | 
                    <span style={{ color: meetsBacklogs ? 'var(--success)' : 'var(--danger)' }}> Max Backlogs: {job.maxBacklogs}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (activeView === 'resume') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">AI Resume Parser & Skill gaps</h1>
          <p className="page-subtitle">Upload your CV to automatically map matching profiles and diagnose technical score ratios.</p>
        </div>

        <div className="dashboard-columns">
          <div className="panel-card">
            <h3 className="panel-card-title">Upload Resume File</h3>
            <div 
              className="upload-dropzone"
              onDragOver={handleDragOver}
              onClick={() => runResumeParser(student.id, 'Simulated PDF text')}
            >
              <div className="upload-icon">📄</div>
              <div>
                <strong>Click to simulate drag & drop upload</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Supports PDF or DOCX up to 5MB.
                </p>
              </div>
            </div>

            {isParsing && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>AI parsing elements using NLP spaCy models...</span>
                  <strong>{parsingProgress}%</strong>
                </p>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${parsingProgress}%` }}></div>
                </div>
              </div>
            )}
          </div>

          <div className="panel-card">
            <h3 className="panel-card-title">AI Profiler Output</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Active Extracted CV:</span>
                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{student.resumeName}</p>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Resume Score rating:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.25rem 0' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: 700 }}>{student.resumeScore}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ 100</span>
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Parsed Skills List:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.25rem' }}>
                  {student.skills.map(skill => (
                    <span key={skill} style={{ backgroundColor: 'var(--primary-light)', color: 'var(--text-main)', border: '1px solid var(--border)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.8rem' }}>
                <span style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Parser Highlights:</span>
                <p style={{ color: 'var(--text-muted)' }}>{student.highlights}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (activeView === 'prep') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">AI Interview Prep Portal</h1>
          <p className="page-subtitle">Synthesize custom technical and behavioral questions tailored to your active resume and target drive rules.</p>
        </div>

        <div className="panel-card">
          <h3 className="panel-card-title">Prepare for an Upcoming Job Drive</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ flexGrow: 1, minWidth: '200px' }}>
              <label className="form-label">Select Company Profile:</label>
              <select 
                className="filter-select" 
                style={{ width: '100%' }}
                value={selectedPrepJob}
                onChange={(e) => setSelectedPrepJob(e.target.value)}
              >
                <option value="">-- Choose Company --</option>
                {jobs.map(j => (
                  <option key={j.id} value={j.id}>{j.company} - {j.title}</option>
                ))}
              </select>
            </div>
            <button 
              className="btn btn-primary" 
              onClick={generatePrepQuestions}
              disabled={!selectedPrepJob || isPrepGenerating}
            >
              {isPrepGenerating ? 'Synthesizing Questions...' : 'Generate Practice Board'}
            </button>
          </div>
        </div>

        {isPrepGenerating && (
          <div className="panel-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="upload-icon" style={{ animation: 'spin 2s linear infinite' }}>🔄</div>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Analyzing skills parameters and compiling practice prompts...</p>
          </div>
        )}

        {prepQuestions.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600 }}>Tailored AI Mock Questions</h3>
            {prepQuestions.map((qObj, index) => (
              <div key={index} className="panel-card">
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary)' }}>Q{index + 1}:</span>
                  <span>{qObj.q}</span>
                </h4>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.75rem', marginTop: '0.5rem' }}>
                  <strong style={{ fontSize: '0.75rem', color: 'var(--success)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Model Answer Framework:</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{qObj.a}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default StudentView
