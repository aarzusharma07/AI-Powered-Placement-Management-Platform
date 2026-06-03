import React, { createContext, useState, useEffect } from 'react'

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  // Roles: 'student' (Sarah Jenkins), 'recruiter' (Xebia HR / Microsoft HR), 'officer' (Placement Cell Lead), 'admin' (SuperAdmin)
  const [currentRole, setCurrentRole] = useState('student')
  
  // Seed Database States
  const [students, setStudents] = useState([
    {
      id: 'stu1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@university.edu',
      gpa: 9.1,
      registrarGpa: 9.1,
      backlogs: 0,
      branch: 'Computer Science',
      verified: 'Verified', // 'Verified', 'Flagged', 'Awaiting'
      resumeName: 'sarah_resume_v2.pdf',
      skills: ['React', 'Node.js', 'SQL', 'Python', 'Javascript', 'Git'],
      status: 'unplaced', // 'unplaced', 'placed'
      resumeScore: 85,
      highlights: 'Strong background in web interfaces and database querying. FCP optimizations on portfolio.',
      changeRequested: false
    },
    {
      id: 'stu2',
      name: 'David Miller',
      email: 'david.m@university.edu',
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
      gpa: 8.2, // Claimed
      registrarGpa: 7.1, // Registrar has 7.1 - Mismatch!
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
      studentId: 'stu2', // David
      jobId: 'job1', // Microsoft
      stage: 'screening', // 'screening', 'test', 'interview', 'hr', 'offered', 'rejected'
      dateApplied: '2026-05-28',
      notes: 'Resume submitted for AI screening.'
    },
    {
      id: 'app2',
      studentId: 'stu3', // Emily
      jobId: 'job2', // Xebia
      stage: 'test',
      dateApplied: '2026-05-29',
      notes: 'Cleared initial screening. Online assessment scheduled for June 5.'
    },
    {
      id: 'app3',
      studentId: 'stu5', // Chris
      jobId: 'job2', // Xebia
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

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 'n1', text: 'Microsoft published a new Software Engineer role.', time: '2h ago', read: false },
    { id: 'n2', text: 'Your GPA profile verification has been approved.', time: '1d ago', read: true }
  ])

  // Parser Simulator State
  const [parsingProgress, setParsingProgress] = useState(0)
  const [isParsing, setIsParsing] = useState(false)

  // API usage tracking state for Admin Dashboard
  const [apiUsage, setApiUsage] = useState({
    totalTokens: 12420,
    parserCalls: 125,
    matchEngineCalls: 430,
    costUSD: 18.63
  })

  // System Health States
  const [cpuUsage, setCpuUsage] = useState(32)
  const [latency, setLatency] = useState(120)

  // Auto-pulse latency and CPU variations to simulate live monitoring
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

    // Check if already applied
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
        const studentName = students.find(s => s.id === app.studentId)?.name || 'Student'
        const job = jobs.find(j => j.id === app.jobId)
        
        let customNote = `Status updated to ${newStage.toUpperCase()}.`
        if (newStage === 'interview') {
          customNote = `Interview scheduled. Calendar invitation sent.`
        } else if (newStage === 'offered') {
          customNote = `Offer rolled out! Download offer letter package.`
        } else if (newStage === 'rejected') {
          customNote = `Application review completed.`
        }

        // Trigger notification to student if primary student (stu1)
        if (app.studentId === 'stu1') {
          addNotification(`${job.company} updated your application status to: ${newStage.toUpperCase()}.`)
        }

        // If offered, lock student status if it's Sarah (stu1) and they accept later, 
        // but for simulation, let's keep it responsive.
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
    // decision: 'Verified' or 'Flagged'
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updated = { ...s, verified: decision }
        if (decision === 'Verified') {
          // If placement officer verified, force sync GPA claims with Registrar records
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
    addNotification(`GPA modification request submitted for verification.`)
  }

  const resolveDiscrepancy = (studentId) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, verified: 'Verified', gpa: s.registrarGpa, changeRequested: false }
      }
      return s
    }))
  }

  const runResumeParser = (studentId, textContent) => {
    setIsParsing(true)
    setParsingProgress(10)
    
    // Simulate steps of AI NLP parser
    const interval = setInterval(() => {
      setParsingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsParsing(false)
          
          // Modify primary student skills dynamically based on simple inputs
          setStudents(current => current.map(s => {
            if (s.id === studentId) {
              const baseSkills = ['React', 'Node.js', 'SQL']
              // Add simulated parsed skills based on user input or defaults
              const parsedSkills = [...new Set([...baseSkills, 'Docker', 'CI/CD', 'AWS', 'Kubernetes'])]
              return { 
                ...s, 
                skills: parsedSkills,
                resumeScore: 92,
                highlights: 'AI Parsed Profile: Enhanced technical cloud expertise detected (Docker, CI/CD, AWS). Score optimized to 92.'
              }
            }
            return s
          }))
          addNotification('AI Resume Parsing complete. Profile skills and score synchronized.')
          return 100
        }
        return prev + 30
      })
    }, 600)
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

  // Calculate dynamic matching vector score for a student and a job
  const getMatchScore = (student, job) => {
    if (!student || !job) return 0
    const matchedSkills = student.skills.filter(skill => 
      job.skillsRequired.some(req => req.toLowerCase() === skill.toLowerCase())
    )
    const ratio = matchedSkills.length / job.skillsRequired.length
    
    // Add additional weights for GPA margins
    let bonus = 0
    if (student.gpa >= job.minGpa) bonus += 15
    if (student.backlogs <= job.maxBacklogs) bonus += 10
    
    const finalScore = Math.min(100, Math.floor((ratio * 75) + bonus))
    return finalScore
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
      getMatchScore
    }}>
      {children}
    </AppContext.Provider>
  )
}
