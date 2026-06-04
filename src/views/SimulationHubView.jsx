import React, { useState } from 'react'

const SimulationHubView = () => {
  const [activeTab, setActiveTab] = useState('stakeholders')
  const [storyFilter, setStoryFilter] = useState('all')

  // Sample deliverables data modeled directly from the markdown assets
  const stakeholders = [
    { name: 'Placement Officer', power: 'Critical', interest: 'High', role: 'System Admin & Buyer', strategy: 'Co-design user interfaces, automate grade verification, eliminate spreadsheet dependencies.' },
    { name: 'Recruiter', power: 'High', interest: 'High', role: 'Talent Buyer', strategy: 'Deliver pre-screened candidate pipeline stacks, accelerate campus recruitment drives.' },
    { name: 'Student', power: 'Low', interest: 'High', role: 'Primary End-User', strategy: 'Optimize resume parsing accuracy, offer real-time application trackers.' },
    { name: 'College Management', power: 'High', interest: 'Medium', role: 'Financial Sponsor', strategy: 'Provide longitudinal dashboards, avg salary trends, and compliance accreditation reporting.' },
    { name: 'Faculty Coordinator', power: 'Medium', interest: 'Medium', role: 'Academic Verification', strategy: 'Provide department-specific tracking tables, automate registrar sync.' },
    { name: 'Alumni Mentor', power: 'Low', interest: 'Low', role: 'Mentorship Volunteer', strategy: 'Offer voluntary interview preparation slots, referral logging.' }
  ]

  const userStories = [
    { id: 'US1', role: 'student', title: 'Resume Parsing', description: 'As a Student, I want to upload my PDF resume so that the AI automatically extracts my skills and fills out my profile.', criteria: 'Given a PDF resume is uploaded, when parsed by NLP, then skills are extracted and CV score rating is computed.' },
    { id: 'US2', role: 'student', title: 'Job Matching', description: 'As a Student, I want to see personalized job recommendations sorted by matching confidence percentage so that I can apply to the most suitable drives.', criteria: 'Given student profile skills, when compared against job requirements, then dynamic match score is calculated and displayed.' },
    { id: 'US3', role: 'student', title: 'GPA Modification', description: 'As a Student, I want to request changes to my locked GPA profile so that errors can be corrected before drive deadlines.', criteria: 'Given GPA changes are input, when submitted, then status sets to "Awaiting" and notifies TPO Lead for audits.' },
    { id: 'US4', role: 'recruiter', title: 'Job Posting', description: 'As a Recruiter, I want to post new job openings with clear CGPA and backlog criteria so that only eligible students can apply.', criteria: 'Given job posting details are submitted, when checked, then platform blocks ineligible applicants based on rules.' },
    { id: 'US5', role: 'recruiter', title: 'Hiring Pipeline Board', description: 'As a Recruiter, I want to promote eligible candidates across screening, technical tests, and interviews in a board layout.', criteria: 'Given candidates are listed, when stage actions are clicked, then application stage updates and sends alerts to student.' },
    { id: 'US6', role: 'officer', title: 'Funnel Monitoring', description: 'As a Placement Officer, I want to see total placed vs unplaced stats so that I can track overall placement drive success.', criteria: 'Given placement database stats, when loaded, then displays real-time KPI card counts.' },
    { id: 'US7', role: 'officer', title: 'GPA Audit Logs', description: 'As a Placement Officer, I want to audit students with registrar discrepancies so that I can prevent resume frauds.', criteria: 'Given registrar claims show mismatch, when audited, then TPO can override student GPA claims.' }
  ]

  const moscowPriorities = {
    must: [
      { title: 'Secure Authentication & RBAC', desc: 'Separate portals for student, recruiter, placement officer, and system administrator.' },
      { title: 'Student Profile Sync', desc: 'Verification locks and registrar data matching engine.' },
      { title: 'Job Posting Engine', desc: 'Prerequisite rules configurations (min CGPA, max backlogs, branch permissions).' },
      { title: 'Pipeline Kanban Tracking', desc: 'Promoting or rejecting applicants across screening rounds.' }
    ],
    should: [
      { title: 'NLP Resume Parser', desc: 'Extracting skills and calculating resume match rating scores.' },
      { title: 'Semantic Candidate Ranking', desc: 'Sorting candidates by match percentage rather than raw keywords.' },
      { title: 'Broadcast Messaging Hub', desc: 'Sending mass alerts to student cohorts regarding upcoming drives.' }
    ],
    could: [
      { title: 'AI Practice Mock Board', desc: 'Generating specific technical interview questions based on company requirements.' },
      { title: 'Self-Service Alumni Referrals', desc: 'Alumni mentors mapping referral lists for top student cohorts.' }
    ],
    wont: [
      { title: 'Native Calendar Synchronizers', desc: 'Postponed to phase 3; replaced by automated scheduling links.' },
      { title: 'Off-line Batch PDF Export', desc: 'Replaced by real-time Excel downloads in phase 1.' }
    ]
  }

  const filteredStories = storyFilter === 'all' 
    ? userStories 
    : userStories.filter(story => story.role === storyFilter)

  return (
    <div className="page-body">
      <div className="page-header">
        <h1 className="page-title">Simulation Deliverables Hub</h1>
        <p className="page-subtitle">Product development deliverables, requirements, and specifications for Day 4 evaluation.</p>
      </div>

      <div className="simulation-hub-layout">
        {/* Navigation Tabs */}
        <div className="hub-nav-tabs">
          <button 
            className={`hub-tab-btn ${activeTab === 'stakeholders' ? 'active' : ''}`}
            onClick={() => setActiveTab('stakeholders')}
          >
            Stakeholder Analysis
          </button>
          <button 
            className={`hub-tab-btn ${activeTab === 'stories' ? 'active' : ''}`}
            onClick={() => setActiveTab('stories')}
          >
            Agile User Stories
          </button>
          <button 
            className={`hub-tab-btn ${activeTab === 'prd' ? 'active' : ''}`}
            onClick={() => setActiveTab('prd')}
          >
            Product Requirements (PRD)
          </button>
          <button 
            className={`hub-tab-btn ${activeTab === 'moscow' ? 'active' : ''}`}
            onClick={() => setActiveTab('moscow')}
          >
            Feature Prioritization
          </button>
          <button 
            className={`hub-tab-btn ${activeTab === 'wireframes' ? 'active' : ''}`}
            onClick={() => setActiveTab('wireframes')}
          >
            Design Wireframes
          </button>
        </div>

        {/* Tab Content Panes */}
        {activeTab === 'stakeholders' && (
          <div className="document-pane">
            <h2>Stakeholder Persona Mapping</h2>
            <p>
              An analysis of the key users, administrators, and clients of the AI-Powered Placement Management Platform (AIPMP), mapped by power and interest parameters.
            </p>
            <div className="table-wrap" style={{ marginBottom: '2rem' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Stakeholder</th>
                    <th>Role Category</th>
                    <th>Power Rating</th>
                    <th>Interest Rating</th>
                    <th>Engagement Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  {stakeholders.map((sh, idx) => (
                    <tr key={idx}>
                      <td><strong>{sh.name}</strong></td>
                      <td>{sh.role}</td>
                      <td>
                        <span className={`badge ${sh.power === 'Critical' ? 'badge-danger' : sh.power === 'High' ? 'badge-accent' : 'badge-warning'}`}>
                          {sh.power}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-accent">
                          {sh.interest}
                        </span>
                      </td>
                      <td>{sh.strategy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Power-Interest Matrix Strategy</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="panel-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <h4 style={{ fontWeight: '600', fontSize: '0.9rem' }}>High Power / High Interest (Manage Closely)</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                  Placement Officers & Recruiters. These are the main buyers and transactional clients. Their workflow must be heavily optimized, focusing on eliminating manual spreadsheet verifications and accelerating physical campus drives.
                </p>
              </div>
              <div className="panel-card" style={{ borderLeft: '4px solid var(--accent)' }}>
                <h4 style={{ fontWeight: '600', fontSize: '0.9rem' }}>High Power / Low Interest (Keep Satisfied)</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                  College Management. Require high-level dashboards summarizing Accreditations (NAAC, NIRF), budget expenditures, placement metrics, and security compliance records.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="document-pane">
            <h2>Agile User Stories</h2>
            <p>
              User stories with Gherkin (Given-When-Then) Acceptance Criteria formatted for product backlog development.
            </p>

            <div className="story-role-filters">
              {['all', 'student', 'recruiter', 'officer'].map(role => (
                <button
                  key={role}
                  className={`story-filter-btn ${storyFilter === role ? 'active' : ''}`}
                  onClick={() => setStoryFilter(role)}
                >
                  {role.toUpperCase()}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredStories.map(story => (
                <div key={story.id} className="panel-card">
                  <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold' }}>{story.id}</span>
                    <span className="badge badge-accent" style={{ fontSize: '0.65rem' }}>As {story.role.toUpperCase()}</span>
                  </div>
                  <h4 style={{ fontWeight: '600', fontSize: '0.95rem' }}>{story.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: '0.25rem 0' }}>{story.description}</p>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <strong style={{ fontSize: '0.7rem', color: 'var(--success)', display: 'block', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Acceptance Criteria:</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{story.criteria}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'prd' && (
          <div className="document-pane">
            <h2>Product Requirement Document (PRD)</h2>
            <p><strong>Document Version:</strong> 2.0-SIM | <strong>Status:</strong> Ready for Handoff</p>
            
            <h3>1. Executive Vision</h3>
            <p>
              The AI-Powered Placement Management Platform digitizes and automates college recruitment. By integrating NLP resume extraction, vector similarity ranking, and automated academic audit tracking, the platform reduces administrative overhead, minimizes human errors, and boosts corporate recruiter conversion rates.
            </p>

            <h3>2. Key Performance Indicators</h3>
            <ul>
              <li>Placement conversion speed increased by 70% (drives completed within a single day).</li>
              <li>TPO office administrative workload reduced by 80% (zero manual grade matching spreadsheets).</li>
              <li>Application conversion rates improved to over 40% (qualitative candidate recommendation).</li>
            </ul>

            <h3>3. Functional Specifications</h3>
            <ul>
              <li><strong>Student Profile Security:</strong> GPA and backlog credentials are locked once imported. Student modification claims are marked as awaiting verification and flagged if they mismatch.</li>
              <li><strong>AI Parser & Matcher:</strong> Extracts skill fields from uploaded resumes, checks prerequisites, and outputs an AI Match Score based on semantic skill alignment.</li>
              <li><strong>Audit Auditing Tool:</strong> Dedicated interface for Placement Officers to audit mismatches between student claims and academic registrar files.</li>
              <li><strong>Recruiter Kanban Board:</strong> Visual columns for screening, assessments, interview rounds, and offers. Promoting cards triggers automatic stage notifications.</li>
            </ul>

            <h3>4. Non-Functional Criteria</h3>
            <ul>
              <li><strong>Security:</strong> All operations utilize role-based access controls. GPA edits require verification tokens.</li>
              <li><strong>Availability:</strong> 99.9% application uptime backed by high-availability API containers.</li>
              <li><strong>Performance:</strong> AI Matching scores must generate in under 200ms using indexed vector similarities.</li>
            </ul>
          </div>
        )}

        {activeTab === 'moscow' && (
          <div className="document-pane">
            <h2>MoSCoW Feature Prioritization</h2>
            <p>
              Backlog feature prioritization matrix separating the Minimal Viable Product (MVP) core from post-launch expansion releases.
            </p>

            <div className="moscow-grid">
              <div className="moscow-column must">
                <div className="moscow-column-header">Must Have (MVP Core)</div>
                {moscowPriorities.must.map((item, idx) => (
                  <div key={idx} className="moscow-item">
                    <strong style={{ display: 'block', fontSize: '0.85rem' }}>{item.title}</strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.desc}</span>
                  </div>
                ))}
              </div>

              <div className="moscow-column should">
                <div className="moscow-column-header">Should Have (Phase 1.1)</div>
                {moscowPriorities.should.map((item, idx) => (
                  <div key={idx} className="moscow-item">
                    <strong style={{ display: 'block', fontSize: '0.85rem' }}>{item.title}</strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.desc}</span>
                  </div>
                ))}
              </div>

              <div className="moscow-column could">
                <div className="moscow-column-header">Could Have (Phase 2.0)</div>
                {moscowPriorities.could.map((item, idx) => (
                  <div key={idx} className="moscow-item">
                    <strong style={{ display: 'block', fontSize: '0.85rem' }}>{item.title}</strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.desc}</span>
                  </div>
                ))}
              </div>

              <div className="moscow-column wont">
                <div className="moscow-column-header">Won't Have (Postponed)</div>
                {moscowPriorities.wont.map((item, idx) => (
                  <div key={idx} className="moscow-item">
                    <strong style={{ display: 'block', fontSize: '0.85rem' }}>{item.title}</strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wireframes' && (
          <div className="document-pane">
            <h2>Low-Fidelity Interaction Wireframes</h2>
            <p>
              Interactive HTML/CSS representations of major application screens demonstrating layouts, components, and responsive design systems.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Wireframe 1: Student Dashboard */}
              <div>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Wireframe 1: Student Dashboard Mock</h3>
                <div className="wireframe-canvas">
                  <div className="wireframe-browser-frame">
                    <div className="wireframe-browser-bar">
                      <div className="wireframe-address">aipmp-portal.edu/student/dashboard</div>
                    </div>
                    <div className="wireframe-content">
                      <div className="wireframe-header">
                        <div>
                          <strong style={{ fontSize: '0.8rem' }}>Student Portal Dashboard</strong>
                          <span style={{ color: 'var(--primary)', marginLeft: '0.5rem' }}>[Sarah Jenkins CS]</span>
                        </div>
                        <span className="wireframe-tag">Draft Mode</span>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                        <div className="wireframe-box">
                          <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>KPI: APPS SUBMITTED</div>
                          <strong style={{ fontSize: '1rem' }}>3</strong>
                        </div>
                        <div className="wireframe-box">
                          <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>KPI: INTERVIEWS</div>
                          <strong style={{ fontSize: '1rem' }}>1</strong>
                        </div>
                        <div className="wireframe-box">
                          <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>KPI: RESUME RATING</div>
                          <strong style={{ fontSize: '1rem' }}>85/100</strong>
                        </div>
                      </div>

                      <div className="wireframe-grid">
                        <div className="wireframe-box">
                          <strong style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.25rem' }}>Sidebar Panel</strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.6rem' }}>
                            <div>- Dashboard [Active]</div>
                            <div>- Matching Jobs</div>
                            <div>- Resume Parser</div>
                            <div>- Prep Portal</div>
                          </div>
                        </div>
                        <div className="wireframe-box">
                          <strong style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.25rem' }}>Active Pipelines</strong>
                          <div style={{ fontSize: '0.65rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.05)', padding: '0.2rem 0' }}>
                              <span>Microsoft (SE 1)</span>
                              <span style={{ color: 'var(--warning)' }}>Screening</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.2rem 0' }}>
                              <span>Xebia (DevOps Intern)</span>
                              <span style={{ color: 'var(--accent)' }}>Assessment</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wireframe 2: Recruiter Kanban Board */}
              <div>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Wireframe 2: Recruiter Hiring Pipeline Board Mock</h3>
                <div className="wireframe-canvas">
                  <div className="wireframe-browser-frame">
                    <div className="wireframe-browser-bar">
                      <div className="wireframe-address">aipmp-portal.edu/recruiter/pipeline</div>
                    </div>
                    <div className="wireframe-content">
                      <div className="wireframe-header">
                        <div>
                          <strong style={{ fontSize: '0.8rem' }}>Recruiter Pipeline Panel</strong>
                          <span style={{ color: 'var(--primary)', marginLeft: '0.5rem' }}>[Active Job: Microsoft SE 1]</span>
                        </div>
                        <span className="wireframe-tag">Draft Mode</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                        <div className="wireframe-box">
                          <strong style={{ fontSize: '0.65rem', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.2rem', marginBottom: '0.35rem' }}>Resume Screen</strong>
                          <div className="wireframe-box" style={{ padding: '0.35rem', marginBottom: '0.25rem' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '0.65rem' }}>David Miller</div>
                            <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>GPA: 7.9 | Match: 79%</div>
                          </div>
                          <div className="wireframe-box" style={{ padding: '0.35rem' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '0.65rem' }}>Chris Carter</div>
                            <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>GPA: 6.8 | Match: 68%</div>
                          </div>
                        </div>

                        <div className="wireframe-box">
                          <strong style={{ fontSize: '0.65rem', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.2rem', marginBottom: '0.35rem' }}>Interview Rounds</strong>
                          <div className="wireframe-box" style={{ padding: '0.35rem' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '0.65rem' }}>Sarah Jenkins</div>
                            <div style={{ fontSize: '0.55rem', color: 'var(--primary)', fontWeight: 'bold' }}>GPA: 9.1 | Match: 92%</div>
                          </div>
                        </div>

                        <div className="wireframe-box">
                          <strong style={{ fontSize: '0.65rem', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.2rem', marginBottom: '0.35rem' }}>Offered</strong>
                          <div className="wireframe-box" style={{ padding: '0.35rem' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '0.65rem' }}>Emily Watson</div>
                            <div style={{ fontSize: '0.55rem', color: 'var(--success)' }}>GPA: 8.8 | Match: 82%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wireframe 3: AI Resume Parser */}
              <div>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Wireframe 3: AI Resume Analyzer & Match Engine Mock</h3>
                <div className="wireframe-canvas">
                  <div className="wireframe-browser-frame">
                    <div className="wireframe-browser-bar">
                      <div className="wireframe-address">aipmp-portal.edu/student/resume-parser</div>
                    </div>
                    <div className="wireframe-content">
                      <div className="wireframe-header">
                        <strong style={{ fontSize: '0.8rem' }}>AI Resume Analyzer Panel</strong>
                        <span className="wireframe-tag">Draft Mode</span>
                      </div>

                      <div className="wireframe-grid">
                        <div className="wireframe-box" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                          <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>[ Drop File ]</div>
                          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Drag resume PDF to parse skills</span>
                        </div>
                        <div className="wireframe-box">
                          <strong style={{ fontSize: '0.7rem', display: 'block', marginBottom: '0.25rem' }}>AI Extracted Skills Profile</strong>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', marginBottom: '0.5rem' }}>
                            <span style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '0.1rem 0.3rem', fontSize: '0.55rem', borderRadius: '3px' }}>React</span>
                            <span style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '0.1rem 0.3rem', fontSize: '0.55rem', borderRadius: '3px' }}>Node.js</span>
                            <span style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '0.1rem 0.3rem', fontSize: '0.55rem', borderRadius: '3px' }}>SQL</span>
                            <span style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '0.1rem 0.3rem', fontSize: '0.55rem', borderRadius: '3px' }}>Python</span>
                          </div>
                          
                          <div className="ai-match-gauge">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>SIMULATED COHORT PLACEMENT CONFIDENCE</span>
                              <span className="match-score-badge">85%</span>
                            </div>
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', height: '4px', borderRadius: '2px', marginTop: '0.25rem', overflow: 'hidden' }}>
                              <div style={{ backgroundColor: 'var(--primary)', width: '85%', height: '100%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SimulationHubView
