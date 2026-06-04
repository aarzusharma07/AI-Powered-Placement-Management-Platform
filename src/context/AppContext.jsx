import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AppContext = createContext()

const API_URL = 'http://localhost:5000/api'

export const AppContextProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState('student')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [dbStatus, setDbStatus] = useState('checking')
  const [errorMsg, setErrorMsg] = useState('')

  // Poll database status on load
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await axios.get(`${API_URL}/health`, { timeout: 2000 })
        if (res.status === 200) {
          setDbStatus('online')
        } else {
          setDbStatus('offline')
        }
      } catch (err) {
        setDbStatus('offline')
      }
    }
    checkConnection()
  }, [])

  // Seed Database States
  const [students, setStudents] = useState([
    {
      id: 'stu1',
      name: 'Sarah Jenkins',
      email: 'sarah@university.edu',
      gpa: 9.1,
      registrarGpa: 9.1,
      backlogs: 0,
      branch: 'Computer Science',
      verified: 'Verified',
      resumeName: 'sarah_resume_v2.pdf',
      skills: ['React', 'Node.js', 'SQL', 'Python', 'Javascript', 'Git'],
      status: 'unplaced',
      resumeScore: 85,
      highlights: 'Strong background in web interfaces and database querying. FCP optimizations on portfolio.',
      changeRequested: false
    },
    {
      id: 'stu2',
      name: 'David Miller',
      email: 'david@university.edu',
      gpa: 7.9,
      registrarGpa: 7.9,
      backlogs: 0,
      branch: 'Computer Science',
      verified: 'Verified',
      resumeName: 'david_dev.pdf',
      skills: ['React', 'CSS', 'Javascript', 'HTML'],
      status: 'unplaced',
      resumeScore: 74,
      highlights: 'Frontend focus. Specialized in CSS Layouts and accessible design systems.',
      changeRequested: false
    },
    {
      id: 'stu3',
      name: 'Emily Watson',
      email: 'emily.w@university.edu',
      gpa: 8.8,
      registrarGpa: 8.8,
      backlogs: 0,
      branch: 'Electronics',
      verified: 'Verified',
      resumeName: 'emily_ece.pdf',
      skills: ['Embedded Systems', 'C++', 'Python', 'Microcontrollers'],
      status: 'unplaced',
      resumeScore: 82,
      highlights: 'IoT enthusiast. Developed automated micro-irrigation controller rigs.',
      changeRequested: false
    },
    {
      id: 'stu4',
      name: 'Alex Jones',
      email: 'alex.j@university.edu',
      gpa: 8.2,
      registrarGpa: 7.1,
      backlogs: 0,
      branch: 'Computer Science',
      verified: 'Flagged',
      resumeName: 'alex_j_cv.pdf',
      skills: ['React', 'HTML', 'Node.js', 'Express'],
      status: 'unplaced',
      resumeScore: 72,
      highlights: 'Junior fullstack builder. Created weather forecast apps and API integrations.',
      changeRequested: false
    },
    {
      id: 'stu5',
      name: 'Chris Carter',
      email: 'chris.c@university.edu',
      gpa: 6.8,
      registrarGpa: 6.8,
      backlogs: 1,
      branch: 'Mechanical Engineering',
      verified: 'Verified',
      resumeName: 'chris_mech_cv.docx',
      skills: ['AutoCAD', 'Solidworks', 'Python', 'FEA Analysis'],
      status: 'unplaced',
      resumeScore: 68,
      highlights: 'Designed and fabricated CAD chassis layouts for Formula Student teams.',
      changeRequested: false
    }
  ])

  const [jobs, setJobs] = useState([
    {
      id: 'job1',
      company: 'Microsoft',
      title: 'Software Engineer 1',
      ctc: '$120,000',
      skillsRequired: ['React', 'Node.js', 'SQL', 'Git'],
      minGpa: 8.5,
      maxBacklogs: 0,
      branches: ['Computer Science', 'Electronics'],
      status: 'Active',
      description: 'Join the Cloud + AI organization to build next-generation scalable web dashboards and database APIs.'
    },
    {
      id: 'job2',
      company: 'Xebia Technology',
      title: 'DevOps Intern',
      ctc: '$65,000',
      skillsRequired: ['Python', 'Docker', 'Git'],
      minGpa: 7.0,
      maxBacklogs: 1,
      branches: ['Computer Science', 'Electronics', 'Mechanical Engineering'],
      status: 'Active',
      description: 'Support the release engineering pipelines. Automate builds using Docker containers and cloud infrastructure scripts.'
    },
    {
      id: 'job3',
      company: 'Deloitte',
      title: 'Cybersecurity Analyst',
      ctc: '$85,000',
      skillsRequired: ['Python', 'Networks', 'SQL'],
      minGpa: 7.5,
      maxBacklogs: 0,
      branches: ['Computer Science', 'Electronics'],
      status: 'Active',
      description: 'Perform web application penetration testing, log analysis, and design secure network routing matrices.'
    }
  ])

  const [applications, setApplications] = useState([
    {
      id: 'app1',
      studentId: 'stu2',
      jobId: 'job1',
      stage: 'screening',
      dateApplied: '2026-05-28',
      notes: 'Resume submitted for AI screening.'
    },
    {
      id: 'app2',
      studentId: 'stu3',
      jobId: 'job2',
      stage: 'test',
      dateApplied: '2026-05-29',
      notes: 'Cleared initial screening. Online assessment scheduled for June 5.'
    },
    {
      id: 'app3',
      studentId: 'stu5',
      jobId: 'job2',
      stage: 'screening',
      dateApplied: '2026-05-30',
      notes: 'Profile submitted.'
    }
  ])

  const [announcements, setAnnouncements] = useState([
    {
      id: 'ann1',
      title: 'Microsoft Drive Opening Notice',
      message: 'Microsoft Software Engineer 1 drive is now active. Please check your eligibility and submit your verified profile by June 10, 11:59 PM.',
      sender: 'Placement Cell',
      date: '2026-06-01'
    },
    {
      id: 'ann2',
      title: 'Mandatory CGPA Verification',
      message: 'All unplaced final year students must verify their semester 7 grades. GPAs will lock on June 12.',
      sender: 'Dean Academics',
      date: '2026-06-02'
    }
  ])

  const [notifications, setNotifications] = useState([
    { id: 'n1', text: 'Microsoft published a new Software Engineer role.', time: '2h ago', read: false },
    { id: 'n2', text: 'Your GPA profile verification has been approved.', time: '1d ago', read: true }
  ])

  const [parsingProgress, setParsingProgress] = useState(0)
  const [isParsing, setIsParsing] = useState(false)

  const [apiUsage, setApiUsage] = useState({
    totalTokens: 12420,
    parserCalls: 125,
    matchEngineCalls: 430,
    costUSD: 18.63
  })

  const [cpuUsage, setCpuUsage] = useState(32)
  const [latency, setLatency] = useState(120)

  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage(prev => Math.max(15, Math.min(85, Math.floor(prev + (Math.random() * 10 - 5)))))
      setLatency(prev => Math.max(80, Math.min(220, Math.floor(prev + (Math.random() * 40 - 20)))))
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Core Simulation Functions
  const addNotification = (text) => {
    setNotifications(prev => [
      { id: 'n_' + Date.now(), text, time: 'Just now', read: false },
      ...prev
    ])
  }

  const applyToJob = (studentId, jobId) => {
    const student = students.find(s => s.id === studentId)
    const job = jobs.find(j => j.id === jobId)
    if (!student || !job) return false
    const exists = applications.some(app => app.studentId === studentId && app.jobId === jobId)
    if (exists) return false
    const newApp = {
      id: 'app_' + Date.now(),
      studentId,
      jobId,
      stage: 'screening',
      dateApplied: new Date().toISOString().split('T')[0],
      notes: 'Applied. Awaiting recruiter review.'
    }
    setApplications(prev => [...prev, newApp])
    addNotification(`Successfully applied to ${job.company} for the ${job.title} role.`)
    return true
  }

  const updateApplicationStage = (appId, newStage) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const job = jobs.find(j => j.id === app.jobId)
        let customNote = `Status updated to ${newStage.toUpperCase()}.`
        if (newStage === 'interview') {
          customNote = 'Interview scheduled. Calendar invitation sent.'
        } else if (newStage === 'offered') {
          customNote = 'Offer rolled out! Download offer letter package.'
        } else if (newStage === 'rejected') {
          customNote = 'Application review completed.'
        }
        if (app.studentId === 'stu1' && job) {
          addNotification(`${job.company} updated your application status to: ${newStage.toUpperCase()}.`)
        }
        return { ...app, stage: newStage, notes: customNote }
      }
      return app
    }))
  }

  const submitJob = (newJob) => {
    const jobRecord = {
      id: 'job_' + Date.now(),
      status: 'Active',
      ...newJob
    }
    setJobs(prev => [jobRecord, ...prev])
    addNotification(`New placement drive launched: ${newJob.company} (${newJob.title}).`)
  }

  const verifyStudentGPA = (studentId, decision) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updated = { ...s, verified: decision }
        if (decision === 'Verified') {
          updated.gpa = updated.registrarGpa
        }
        return updated
      }
      return s
    }))
  }

  const requestProfileEdit = (studentId, requestedGpa) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, gpa: requestedGpa, changeRequested: true, verified: 'Awaiting' }
      }
      return s
    }))
    addNotification('GPA modification request submitted for verification.')
  }

  const resolveDiscrepancy = (studentId) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, verified: 'Verified', gpa: s.registrarGpa, changeRequested: false }
      }
      return s
    }))
  }

  const loginUser = async (email, password) => {
    setErrorMsg('')
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password })
      if (res.data && res.data.user) {
        setCurrentUser(res.data.user)
        setCurrentRole(res.data.user.role)
        setIsAuthenticated(true)
        setDbStatus('online')
        try {
          const jobsRes = await axios.get(`${API_URL}/recruiter/jobs`)
          if (jobsRes.data && Array.isArray(jobsRes.data)) {
            const mappedJobs = jobsRes.data.map(j => ({
              id: j._id,
              company: j.company,
              title: j.title,
              ctc: j.salary ? `${j.salary.min} - ${j.salary.max} USD` : '$65,000',
              skillsRequired: j.requiredSkills,
              minGpa: j.minGPA,
              maxBacklogs: j.maxBacklogs || 0,
              branches: j.allowedBranches || ['Computer Science'],
              status: j.status === 'open' ? 'Active' : 'Closed',
              description: j.description
            }))
            setJobs(mappedJobs)
          }
        } catch (jobErr) {
          console.warn('Failed to load live jobs, keeping seed data:', jobErr)
        }
      }
    } catch (err) {
      // Local sandbox authentication
      if (email === 'sarah@university.edu' && password === 'password123') {
        const s = students.find(s => s.id === 'stu1')
        setCurrentUser({ id: 'stu1', name: s.name, email, role: 'student' })
        setCurrentRole('student')
        setIsAuthenticated(true)
      } else if (email === 'david@university.edu' && password === 'password123') {
        const s = students.find(s => s.id === 'stu2')
        setCurrentUser({ id: 'stu2', name: s.name, email, role: 'student' })
        setCurrentRole('student')
        setIsAuthenticated(true)
      } else if (email === 'john@techcorp.com' && password === 'password123') {
        setCurrentUser({ id: 'rec1', name: 'John Smith', email, role: 'recruiter', company: 'Tech Corp' })
        setCurrentRole('recruiter')
        setIsAuthenticated(true)
      } else if (email === 'emily@university.edu' && password === 'password123') {
        setCurrentUser({ id: 'off1', name: 'Emily Brown', email, role: 'officer' })
        setCurrentRole('officer')
        setIsAuthenticated(true)
      } else if (email === 'admin@university.edu' && password === 'password123') {
        setCurrentUser({ id: 'admin1', name: 'System Admin', email, role: 'admin' })
        setCurrentRole('admin')
        setIsAuthenticated(true)
      } else {
        setErrorMsg('Invalid email or password combination.')
      }
    }
  }

  const logoutUser = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  const runResumeParser = async (studentId, textContent) => {
    setIsParsing(true)
    setParsingProgress(10)
    const interval = setInterval(() => {
      setParsingProgress(prev => Math.min(95, prev + 25))
    }, 200)

    try {
      const res = await axios.post(`${API_URL}/student/resume/upload`, {
        userId: studentId,
        resumeText: textContent || 'Simulated react developer with Docker, AWS cloud, and git background.'
      })
      clearInterval(interval)
      setParsingProgress(100)
      if (res.data && res.data.parsedData) {
        const parsed = res.data.parsedData
        setStudents(current => current.map(s => {
          if (s.id === studentId) {
            return {
              ...s,
              skills: parsed.skills || s.skills,
              resumeScore: parsed.aiScore || s.resumeScore,
              highlights: `AI Parsed Profile: Extracted ${parsed.skills.join(', ')}. Scored at ${parsed.aiScore}.`
            }
          }
          return s
        }))
        addNotification('AI Resume Parsing complete. Profile skills and score synchronized with database.')
      }
      setIsParsing(false)
    } catch (err) {
      setTimeout(() => {
        clearInterval(interval)
        setParsingProgress(100)
        setIsParsing(false)
        setStudents(current => current.map(s => {
          if (s.id === studentId) {
            const parsedSkills = [...new Set([...s.skills, 'Docker', 'CI/CD', 'AWS', 'Kubernetes'])]
            return {
              ...s,
              skills: parsedSkills,
              resumeScore: 92,
              highlights: 'AI Parsed Profile: Enhanced technical cloud expertise detected (Docker, CI/CD, AWS). Score optimized to 92.'
            }
          }
          return s
        }))
        addNotification('AI Resume Parsing complete. Profile skills and score synchronized (Sandbox Mode).')
      }, 800)
    }
  }

  // AI Chatbot State
  const [chatHistory, setChatHistory] = useState([
    { id: 'c1', sender: 'ai', text: 'Hello! I am your AIPMP AI Assistant. How can I help you optimize your recruitment workflow today?', timestamp: 'Just now' }
  ])
  const [isAiLoading, setIsAiLoading] = useState(false)

  const sendAiMessage = (text, role) => {
    if (!text.trim()) return
    const userMsg = {
      id: 'c_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setChatHistory(prev => [...prev, userMsg])
    setIsAiLoading(true)
    setApiUsage(prev => ({
      totalTokens: prev.totalTokens + Math.floor(text.length * 1.5 + 80),
      parserCalls: prev.parserCalls,
      matchEngineCalls: prev.matchEngineCalls + (role === 'recruiter' ? 1 : 0),
      costUSD: parseFloat((prev.costUSD + 0.0003).toFixed(4))
    }))

    setTimeout(() => {
      let aiText = ''
      const textLower = text.toLowerCase()

      if (role === 'student') {
        if (textLower.includes('resume') || textLower.includes('cv') || textLower.includes('score')) {
          aiText = 'Based on your profile, your resume score is 85/100 (top 15% of branch cohort). You have strong React and Node.js skills, but adding Docker, AWS, or CI/CD could boost your score to 92+ and open up cloud developer roles. Use the Resume Parser tab to scan and update!'
        } else if (textLower.includes('gpa') || textLower.includes('cgpa')) {
          aiText = 'Your registered GPA is 9.1. If you noticed a mismatch, you can request an update from the portal. This will trigger a notification to the TPO Lead to verify your transcript records.'
        } else if (textLower.includes('microsoft') || textLower.includes('interview') || textLower.includes('prep')) {
          aiText = 'For Microsoft Software Engineer 1: Focus on dynamic programming, relational databases (SQL), and system design. You can generate custom mock interview boards tailored to your resume under the Prep Portal tab.'
        } else {
          aiText = 'I can help you review your resume, suggest jobs matching your skills, explain eligibility criteria, or generate mock interview questions. What would you like help with?'
        }
      } else if (role === 'recruiter') {
        if (textLower.includes('candidate') || textLower.includes('rank') || textLower.includes('student')) {
          aiText = 'Currently, Sarah Jenkins has the highest matching score (92% semantic match) for your Software Engineer role, followed by Emily Watson (82%). David Miller meets GPA criteria but is awaiting TPO verification. Shall I draft screening test parameters?'
        } else if (textLower.includes('job') || textLower.includes('description') || textLower.includes('post')) {
          aiText = 'Suggested JD: Looking for a Junior Full Stack Engineer proficient in React.js, Express, and SQL. Familiarity with Docker and Git is a plus. Minimum GPA: 8.0, zero backlogs required. Adjust criteria in the Job Posting form.'
        } else {
          aiText = 'As your recruiter co-pilot, I can assist with candidate ranking, drafting job descriptions, recommending technical test topics, and monitoring interview schedules.'
        }
      } else if (role === 'officer') {
        if (textLower.includes('stats') || textLower.includes('rate') || textLower.includes('placed')) {
          aiText = 'Active stats: 3 drives open. 3 student applications total. Placement conversion at 33%. 1 GPA audit mismatch flagged (Alex Jones).'
        } else if (textLower.includes('gpa') || textLower.includes('mismatch') || textLower.includes('audit')) {
          aiText = 'Alert: Alex Jones claimed GPA 8.2, but Registrar records show 7.1. Recommend auditing his profile and clicking Reject Modification or Resolve Sync to enforce Registrar values.'
        } else if (textLower.includes('announcement') || textLower.includes('broadcast')) {
          aiText = 'Draft: "Attention Students: The Microsoft Software Engineer 1 deadline has been extended to June 12. Ensure GPA claims are verified. Unverified profiles will be locked automatically." Broadcast this?'
        } else {
          aiText = 'As TPO Lead assistant, I can audit academic discrepancies, draft drive notices, summarize placement metrics, or outline coordinator workflows.'
        }
      } else {
        aiText = 'System Dashboard: CPU 32%, latency 120ms. API request rate is normal (22 calls/min). The AI Parser NLP container is running at sub-200ms latency. No database replication lag detected.'
      }

      setChatHistory(prev => [...prev, {
        id: 'c_' + Date.now(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setIsAiLoading(false)
    }, 700)
  }

  const broadcastAnnouncement = (title, message, sender) => {
    setAnnouncements(prev => [
      {
        id: 'ann_' + Date.now(),
        title,
        message,
        sender,
        date: new Date().toISOString().split('T')[0]
      },
      ...prev
    ])
    addNotification(`Global announcement broadcasted: "${title}".`)
  }

  const getMatchScore = (student, job) => {
    if (!student || !job) return 0
    const matchedSkills = student.skills.filter(skill =>
      job.skillsRequired.some(req => req.toLowerCase() === skill.toLowerCase())
    )
    const ratio = matchedSkills.length / job.skillsRequired.length
    let bonus = 0
    if (student.gpa >= job.minGpa) bonus += 15
    if (student.backlogs <= job.maxBacklogs) bonus += 10
    return Math.min(100, Math.floor((ratio * 75) + bonus))
  }

  return (
    <AppContext.Provider value={{
      currentRole,
      setCurrentRole,
      students,
      jobs,
      applications,
      announcements,
      notifications,
      parsingProgress,
      isParsing,
      apiUsage,
      cpuUsage,
      latency,
      applyToJob,
      updateApplicationStage,
      submitJob,
      verifyStudentGPA,
      requestProfileEdit,
      resolveDiscrepancy,
      runResumeParser,
      broadcastAnnouncement,
      getMatchScore,
      chatHistory,
      sendAiMessage,
      isAiLoading,
      isAuthenticated,
      currentUser,
      loginUser,
      logoutUser,
      dbStatus,
      errorMsg,
      setErrorMsg
    }}>
      {children}
    </AppContext.Provider>
  )
}
