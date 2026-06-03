// Mock AI Service - Simulates AI Resume Parsing & Job Recommendations
// In production, integrate with OpenAI, Hugging Face, or custom ML models

export const parseResume = async (resumeText) => {
  // Simulates AI resume parsing using NLP/NER
  const mockParsedData = {
    education: [
      {
        institution: 'Tech University',
        degree: 'Bachelor of Technology',
        field: 'Computer Science',
        graduationYear: 2024
      }
    ],
    experience: [
      {
        company: 'Tech Corp',
        position: 'Intern',
        duration: '3 months',
        description: 'Worked on React components'
      }
    ],
    skills: extractSkills(resumeText),
    projects: extractProjects(resumeText),
    aiScore: calculateResumeScore(resumeText)
  }
  return mockParsedData
}

export const recommendJobs = async (studentProfile, jobs) => {
  // AI Job Recommendation Engine using vector matching
  const recommendations = jobs.map((job) => {
    const matchScore = calculateJobMatch(studentProfile, job)
    return {
      jobId: job._id,
      job: job,
      matchScore: matchScore,
      matchDetails: {
        skillsMatch: getSkillsMatch(studentProfile.skills, job.requiredSkills),
        gpaMatch: studentProfile.gpa >= job.minGPA,
        backlogMatch: studentProfile.backlogs <= job.maxBacklogs,
        branchMatch: job.allowedBranches.includes(studentProfile.branch)
      }
    }
  })

  // Sort by match score (descending)
  return recommendations.sort((a, b) => b.matchScore - a.matchScore)
}

export const rankCandidates = async (candidateProfiles, jobDescription) => {
  // AI Candidate Ranking for Recruiters
  const rankings = candidateProfiles.map((candidate) => {
    const score = calculateCandidateScore(candidate, jobDescription)
    return {
      candidateId: candidate._id,
      candidate: candidate,
      rankingScore: score,
      reasoning: getRankingReasoning(candidate, jobDescription)
    }
  })

  return rankings.sort((a, b) => b.rankingScore - a.rankingScore)
}

export const generateInterviewQuestions = async (studentProfile, targetJob) => {
  // AI Interview Question Generator
  const questions = []

  // Technical questions based on skills
  const technicalQuestions = [
    `Tell us about your experience with ${studentProfile.skills[0] || 'programming'}`,
    `Describe a challenging project you worked on using ${studentProfile.skills[1] || 'web development'}`,
    `How would you approach building a system similar to ${targetJob.title}?`,
    `Explain your understanding of system design and scalability`,
    `What design patterns have you used in your projects?`
  ]

  // Behavioral questions
  const behavioralQuestions = [
    'Tell us about a time you had to learn something new quickly',
    'Describe a situation where you had to work in a team',
    'How do you handle failure or mistakes?',
    'What motivates you in your career?',
    'Why are you interested in this role at our company?'
  ]

  questions.push(
    ...technicalQuestions.slice(0, 2),
    ...behavioralQuestions.slice(0, 3)
  )

  return questions
}

// Helper functions
function extractSkills(resumeText) {
  const commonSkills = [
    'React', 'Node.js', 'Python', 'JavaScript', 'SQL', 'MongoDB', 'AWS',
    'Docker', 'Git', 'CSS', 'HTML', 'Java', 'C++', 'Machine Learning'
  ]

  const foundSkills = commonSkills.filter((skill) =>
    resumeText.toLowerCase().includes(skill.toLowerCase())
  )

  return foundSkills.length > 0 ? foundSkills : ['JavaScript', 'HTML', 'CSS']
}

function extractProjects(resumeText) {
  // Mock project extraction
  return [
    {
      name: 'Portfolio Website',
      description: 'Built a personal portfolio website',
      technologies: ['React', 'CSS', 'JavaScript']
    },
    {
      name: 'E-commerce Platform',
      description: 'Developed a full-stack e-commerce application',
      technologies: ['React', 'Node.js', 'MongoDB']
    }
  ]
}

function calculateResumeScore(resumeText) {
  // Mock scoring algorithm
  let score = 50

  const skillKeywords = ['experience', 'project', 'achievement', 'developed', 'built']
  skillKeywords.forEach((keyword) => {
    if (resumeText.toLowerCase().includes(keyword)) {
      score += 5
    }
  })

  // Cap at 100
  return Math.min(score, 100)
}

function calculateJobMatch(student, job) {
  let matchScore = 0

  // Skills matching (40% weight)
  const skillsMatch = student.skills.filter((skill) =>
    job.requiredSkills.some((req) => req.toLowerCase().includes(skill.toLowerCase()))
  ).length
  matchScore += (skillsMatch / job.requiredSkills.length) * 40

  // GPA matching (30% weight)
  if (student.gpa >= job.minGPA) {
    matchScore += 30
  } else {
    matchScore += (student.gpa / job.minGPA) * 30
  }

  // Backlog matching (20% weight)
  if (student.backlogs <= job.maxBacklogs) {
    matchScore += 20
  }

  // Branch matching (10% weight)
  if (job.allowedBranches.includes(student.branch)) {
    matchScore += 10
  }

  return Math.round(matchScore)
}

function getSkillsMatch(studentSkills, requiredSkills) {
  return requiredSkills.map((skill) => ({
    skill: skill,
    studentHas: studentSkills.some((s) => s.toLowerCase() === skill.toLowerCase()),
    requiredLevel: 'Intermediate'
  }))
}

function calculateCandidateScore(candidate, jobDescription) {
  // More sophisticated scoring for recruiter view
  let score = 0

  // Skills match
  const skillsCount = candidate.skills.filter((skill) =>
    jobDescription.toLowerCase().includes(skill.toLowerCase())
  ).length
  score += skillsCount * 15

  // GPA
  score += candidate.gpa * 5

  // Experience/projects
  if (candidate.resume?.parsedData?.experience) {
    score += candidate.resume.parsedData.experience.length * 10
  }

  return Math.min(score, 100)
}

function getRankingReasoning(candidate, jobDescription) {
  const reasons = []

  if (candidate.gpa > 8.5) {
    reasons.push('Excellent academic performance')
  }

  if (candidate.resume?.parsedData?.projects?.length > 2) {
    reasons.push('Strong project portfolio')
  }

  if (candidate.skills.length > 5) {
    reasons.push('Diverse skill set')
  }

  return reasons.join(', ') || 'Qualified candidate'
}
