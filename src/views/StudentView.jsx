import React, { useContext, useState, useRef } from 'react'
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
    requestProfileEdit,
    currentUser,
    setStudents
  } = useContext(AppContext)

  // Get the student record for the currently logged-in user
  const student = students.find(s => s.id === currentUser?.id) || students[0]
  const studentApps = applications.filter(app => app.studentId === student.id)

  const offeredApp = studentApps.find(app => app.stage === 'offered')
  const targetJobName = offeredApp ? jobs.find(j => j.id === offeredApp.jobId)?.company : ''

  // Interview prep states
  const [selectedPrepJob, setSelectedPrepJob] = useState('')
  const [prepQuestions, setPrepQuestions] = useState([])
  const [isPrepGenerating, setIsPrepGenerating] = useState(false)

  // GPA modal
  const [showEditModal, setShowEditModal] = useState(false)
  const [gpaInput, setGpaInput] = useState(student.gpa)

  // Resume upload states
  const fileInputRef = useRef(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [parseError, setParseError] = useState('')

  // ── Real file handling ──────────────────────────────────────────────────────
  const processFile = (file) => {
    setParseError('')
    if (!file) return

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ]
    const maxSize = 5 * 1024 * 1024 // 5 MB

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|docx|doc|txt)$/i)) {
      setParseError('Unsupported file type. Please upload a PDF, DOCX, DOC, or TXT file.')
      return
    }
    if (file.size > maxSize) {
      setParseError('File exceeds 5 MB limit.')
      return
    }

    setUploadedFile(file)

    // Use FileReader to extract text content
    const reader = new FileReader()
    reader.onload = (e) => {
      // For PDFs/DOCX we get binary — pass the filename+metadata as context to AI parser
      // For .txt files we get real text we can use directly
      const textContent = file.type === 'text/plain'
        ? e.target.result
        : `Resume file: ${file.name}. Size: ${(file.size / 1024).toFixed(1)}KB. Candidate: ${student.name}.`

      // Update the student's resume filename in state
      setStudents(prev => prev.map(s =>
        s.id === student.id ? { ...s, resumeName: file.name } : s
      ))

      // Trigger AI parser with real text content
      runResumeParser(student.id, textContent)
    }

    if (file.type === 'text/plain') {
      reader.readAsText(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) processFile(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  // ── Interview prep ──────────────────────────────────────────────────────────
  const generatePrepQuestions = () => {
    if (!selectedPrepJob) return
    setIsPrepGenerating(true)
    setPrepQuestions([])
    const targetJob = jobs.find(j => j.id === selectedPrepJob)

    setTimeout(() => {
      setIsPrepGenerating(false)
      const skillFocus = targetJob?.skillsRequired?.[0] || 'programming'
      setPrepQuestions([
        {
          q: `Explain how you have used ${skillFocus} to solve a real-world problem in a project.`,
          a: `Walk through a specific project. Describe the problem, what ${skillFocus} feature or pattern you used, any tradeoffs you considered, and the measurable outcome.`
        },
        {
          q: `${targetJob?.company} works at large scale. How would you approach designing a system that handles millions of concurrent users?`,
          a: `Discuss horizontal scaling, load balancing (round-robin / least-connections), caching layers (Redis), CDN for static assets, and database sharding or read replicas.`
        },
        {
          q: `Describe a scenario where you had to debug a critical production issue under a tight deadline.`,
          a: `Use the STAR method. Emphasize: what monitoring/logging helped you isolate the bug, how you communicated with the team, the hotfix strategy, and the post-mortem changes you put in place.`
        },
        {
          q: `How do you stay current with new technologies and methodologies in software development?`,
          a: `Mention structured habits: reading official docs / changelogs, following thought leaders, personal side projects, contributing to open source, and attending local meetups or hackathons.`
        },
        {
          q: `Tell me about a time you disagreed with a technical decision made by your team. How did you handle it?`,
          a: `Show maturity: you raised concerns with data and an alternative proposal, listened to counterpoints, reached consensus, and still committed fully once a direction was chosen.`
        }
      ])
    }, 1200)
  }

  // ── HOME ───────────────────────────────────────────────────────────────────
  if (activeView === 'home') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">Student Portal</h1>
          <p className="page-subtitle">Welcome back, {student.name} &nbsp;|&nbsp; Branch: {student.branch}</p>
        </div>

        {offeredApp && (
          <div className="celebration-banner" style={{ borderLeft: '5px solid var(--success)' }}>
            <div className="celebration-text">
              <span style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Offer Letter Status
              </span>
              <h4 style={{ margin: '0.25rem 0' }}>Job Selection Confirmed</h4>
              <p style={{ margin: 0 }}>
                {targetJobName} has rolled out a formal job offer. Please coordinate with the Placement Cell to submit your confirmation credentials.
              </p>
            </div>
          </div>
        )}

        <DashboardCardGrid>
          <DashboardCard
            title="Applications Submitted"
            value={studentApps.length}
            footerText="All academic records locked"
            icon=""
          />
          <DashboardCard
            title="Upcoming Interviews"
            value={studentApps.filter(a => a.stage === 'interview').length}
            footerText="Next scheduled event: June 8"
            icon=""
          />
          <DashboardCard
            title="AI Resume Score"
            value={`${student.resumeScore}/100`}
            footerText="Top 15% in your branch cohort"
            icon=""
          />
        </DashboardCardGrid>

        <div className="dashboard-columns">
          {/* Active pipelines */}
          <div className="panel-card">
            <h3 className="panel-card-title">My Active Pipelines</h3>
            {studentApps.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                No active job applications. Go to "Matching Jobs" to apply.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {studentApps.map(app => {
                  const job = jobs.find(j => j.id === app.jobId)
                  return (
                    <div key={app.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div>
                          <strong style={{ fontSize: '0.95rem' }}>{job?.company}</strong>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{job?.title}</span>
                        </div>
                        <span className={`badge ${
                          app.stage === 'offered' ? 'badge-success' :
                          app.stage === 'rejected' ? 'badge-danger' :
                          app.stage === 'interview' ? 'badge-accent' : 'badge-warning'
                        }`}>
                          {app.stage}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>
                        {['screening', 'test', 'interview', 'offered'].map((stage, i) => (
                          <span key={stage} style={{
                            fontWeight: app.stage === stage ? 'bold' : 'normal',
                            color: app.stage === stage ? (stage === 'offered' ? 'var(--success)' : 'var(--primary)') : ''
                          }}>
                            {i + 1}. {stage.charAt(0).toUpperCase() + stage.slice(1)}
                          </span>
                        ))}
                      </div>
                      <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {app.notes}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Announcements */}
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

            {/* Academic record */}
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
                  <span className={`badge ${student.verified === 'Verified' ? 'badge-success' : student.verified === 'Flagged' ? 'badge-danger' : 'badge-warning'}`}>
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

        {/* GPA Edit Modal */}
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
                  min="0"
                  max="10"
                  className="form-input"
                  value={gpaInput}
                  onChange={(e) => setGpaInput(parseFloat(e.target.value))}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
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

  // ── JOBS ───────────────────────────────────────────────────────────────────
  if (activeView === 'jobs') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">AI Job Recommendations</h1>
          <p className="page-subtitle">Jobs sorted dynamically by AI matching vector weights based on your profile skills and GPA.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[...jobs]
            .sort((a, b) => getMatchScore(student, b) - getMatchScore(student, a))
            .map(job => {
              const hasApplied = applications.some(app => app.studentId === student.id && app.jobId === job.id)
              const matchScore = getMatchScore(student, job)
              const meetsGpa = student.gpa >= job.minGpa
              const meetsBacklogs = student.backlogs <= job.maxBacklogs
              const meetsBranch = job.branches.includes(student.branch)
              const isEligible = meetsGpa && meetsBacklogs && meetsBranch
              const verifiedRole = student.verified === 'Verified'

              return (
                <div key={job.id} className="panel-card" style={{ borderLeft: `4px solid ${hasApplied ? 'var(--success)' : isEligible ? 'var(--primary)' : 'var(--danger)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{job.title}</h3>
                      <h4 style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 500, margin: '0.25rem 0' }}>{job.company}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Package CTC: <strong>{job.ctc}</strong></p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className="badge badge-accent" style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem' }}>
                        {matchScore}% AI Match
                      </span>
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

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>{job.description}</p>

                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.75rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Required Skills: </span>
                      {job.skillsRequired.map(skill => {
                        const hasSkill = student.skills.some(s => s.toLowerCase() === skill.toLowerCase())
                        return (
                          <span key={skill} style={{
                            backgroundColor: hasSkill ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)',
                            color: hasSkill ? 'var(--success)' : 'var(--danger)',
                            border: `1px solid ${hasSkill ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
                            padding: '0.15rem 0.4rem', borderRadius: '4px', marginLeft: '0.25rem'
                          }}>
                            {skill}
                          </span>
                        )
                      })}
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Rules: </span>
                      <span style={{ color: meetsGpa ? 'var(--success)' : 'var(--danger)' }}>Min GPA: {job.minGpa}</span>
                      {' | '}
                      <span style={{ color: meetsBacklogs ? 'var(--success)' : 'var(--danger)' }}>Max Backlogs: {job.maxBacklogs}</span>
                      {' | '}
                      <span style={{ color: meetsBranch ? 'var(--success)' : 'var(--danger)' }}>Branch: {meetsBranch ? 'Eligible' : 'Not Eligible'}</span>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    )
  }

  // ── RESUME ─────────────────────────────────────────────────────────────────
  if (activeView === 'resume') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">AI Resume Parser</h1>
          <p className="page-subtitle">Upload your resume to extract skills, compute your AI score, and identify skill gaps for target roles.</p>
        </div>

        <div className="dashboard-columns">
          {/* Upload Panel */}
          <div className="panel-card">
            <h3 className="panel-card-title">Upload Resume File</h3>

            {/* Hidden real file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.doc,.docx,.txt"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            {/* Drag & Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${isDragging ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: '10px',
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: isDragging ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s ease',
                marginBottom: '1rem'
              }}
            >
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {uploadedFile ? uploadedFile.name : 'Drop your resume here or click to browse'}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                Supports PDF, DOCX, DOC, TXT — up to 5 MB
              </p>
              {uploadedFile && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: 'var(--success)', fontWeight: 600 }}>
                  {(uploadedFile.size / 1024).toFixed(1)} KB — Ready to parse
                </div>
              )}
            </div>

            {parseError && (
              <p style={{ color: 'var(--danger)', fontSize: '0.75rem', marginBottom: '0.75rem' }}>{parseError}</p>
            )}

            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={!uploadedFile || isParsing}
              onClick={() => uploadedFile && processFile(uploadedFile)}
            >
              {isParsing ? 'Parsing...' : 'Run AI Parser'}
            </button>

            {isParsing && (
              <div style={{ marginTop: '1.25rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>NLP model extracting skills and scoring profile...</span>
                  <strong>{parsingProgress}%</strong>
                </p>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${parsingProgress}%` }} />
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  {parsingProgress < 40 && '> Tokenizing document sections...'}
                  {parsingProgress >= 40 && parsingProgress < 70 && '> Extracting named entities and skill tokens...'}
                  {parsingProgress >= 70 && parsingProgress < 95 && '> Computing semantic match vectors...'}
                  {parsingProgress >= 95 && '> Finalizing score and highlights...'}
                </div>
              </div>
            )}
          </div>

          {/* AI Profiler Output */}
          <div className="panel-card">
            <h3 className="panel-card-title">AI Profiler Output</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Active Resume on File</span>
                <p style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.25rem' }}>{student.resumeName}</p>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>AI Score</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '2.25rem', fontWeight: 700, color: student.resumeScore >= 85 ? 'var(--success)' : student.resumeScore >= 70 ? 'var(--warning)' : 'var(--danger)' }}>
                    {student.resumeScore}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 100</span>
                </div>
                {/* Score bar */}
                <div className="progress-bar-container" style={{ marginTop: '0.35rem' }}>
                  <div className="progress-bar-fill" style={{
                    width: `${student.resumeScore}%`,
                    background: student.resumeScore >= 85
                      ? 'linear-gradient(90deg,#10b981,#34d399)'
                      : student.resumeScore >= 70
                      ? 'linear-gradient(90deg,#f59e0b,#fbbf24)'
                      : 'linear-gradient(90deg,#ef4444,#f87171)'
                  }} />
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Parsed Skills</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.35rem' }}>
                  {student.skills.map(skill => (
                    <span key={skill} style={{
                      backgroundColor: 'rgba(99,102,241,0.1)',
                      color: 'var(--primary)',
                      border: '1px solid rgba(99,102,241,0.25)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 500
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ padding: '0.85rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <span style={{ fontWeight: 600, fontSize: '0.75rem', color: 'var(--success)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                  Parser Highlights
                </span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{student.highlights}</p>
              </div>

              {/* Skill gap against best matching job */}
              {(() => {
                const bestJob = jobs.reduce((best, job) => getMatchScore(student, job) > getMatchScore(student, best) ? job : best, jobs[0])
                const missingSkills = bestJob?.skillsRequired.filter(s => !student.skills.some(sk => sk.toLowerCase() === s.toLowerCase()))
                return missingSkills?.length > 0 ? (
                  <div style={{ padding: '0.85rem', backgroundColor: 'rgba(245,158,11,0.05)', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.75rem', color: 'var(--warning)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                      Skill Gaps for {bestJob.company}
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {missingSkills.map(s => (
                        <span key={s} style={{ backgroundColor: 'rgba(245,158,11,0.1)', color: 'var(--warning)', border: '1px solid rgba(245,158,11,0.2)', padding: '0.2rem 0.45rem', borderRadius: '4px', fontSize: '0.72rem' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null
              })()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── PREP ───────────────────────────────────────────────────────────────────
  if (activeView === 'prep') {
    return (
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">AI Interview Prep Portal</h1>
          <p className="page-subtitle">Generate custom technical and behavioral questions tailored to your profile and target drive.</p>
        </div>

        <div className="panel-card">
          <h3 className="panel-card-title">Select Target Drive</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ flexGrow: 1, minWidth: '200px' }}>
              <label className="form-label">Company Profile:</label>
              <select
                className="filter-select"
                style={{ width: '100%' }}
                value={selectedPrepJob}
                onChange={(e) => { setSelectedPrepJob(e.target.value); setPrepQuestions([]) }}
              >
                <option value="">-- Choose Company --</option>
                {jobs.map(j => (
                  <option key={j.id} value={j.id}>{j.company} — {j.title}</option>
                ))}
              </select>
            </div>
            <button
              className="btn btn-primary"
              onClick={generatePrepQuestions}
              disabled={!selectedPrepJob || isPrepGenerating}
            >
              {isPrepGenerating ? 'Synthesizing...' : 'Generate Practice Board'}
            </button>
          </div>
        </div>

        {isPrepGenerating && (
          <div className="panel-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Analyzing role requirements and compiling practice prompts...
            </div>
          </div>
        )}

        {prepQuestions.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600 }}>
              Tailored AI Mock Questions
            </h3>
            {prepQuestions.map((qObj, index) => (
              <div key={index} className="panel-card">
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary)', minWidth: '2rem' }}>Q{index + 1}:</span>
                  <span>{qObj.q}</span>
                </h4>
                <div style={{ backgroundColor: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '6px', padding: '0.75rem', marginTop: '0.75rem' }}>
                  <strong style={{ fontSize: '0.7rem', color: 'var(--success)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                    Model Answer Framework
                  </strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{qObj.a}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return null
}

export default StudentView
