# Section 2: Agile User Stories

This section contains 23 detailed Agile User Stories complete with functional acceptance criteria using the industry-standard **Given-When-Then** format to guide engineering implementation.

---

## 🎓 Student User Stories (10)

### US-01: Auto-Parsing Resume Upload
*   **User Story:** As a **Student**, I want to **upload my resume in PDF/Word format** so that **the system can automatically extract my key details (skills, education, projects) and pre-populate my profile**.
*   **Acceptance Criteria:**
    *   **Given** a student is on the profile setup page,
    *   **When** they drag and drop a PDF or DOCX resume (max 5MB) and click "Parse",
    *   **Then** the system must parse the text, extract standard fields (Full Name, CGPA, Graduation Year, Skills, Projects, Experience), and pre-fill the form fields in less than 5 seconds with at least 85% accuracy.

### US-02: AI-Powered Resume Scoring and Analysis
*   **User Story:** As a **Student**, I want to **view an automated AI resume feedback report** so that **I can identify skill gaps and formatting issues to improve my shortlisting chances**.
*   **Acceptance Criteria:**
    *   **Given** a student has uploaded a parsed resume,
    *   **When** they trigger the "Resume Analysis",
    *   **Then** the system must generate a resume score (0–100) and present a structured analysis categorized into "Strengths", "Missing Industry Skills (relative to target roles)", and "Formatting Checklist".

### US-03: Personalized AI Job Recommendations
*   **User Story:** As a **Student**, I want to **receive tailored job recommendations on my feed** so that **I can focus on roles that best align with my skills and qualifications**.
*   **Acceptance Criteria:**
    *   **Given** the student has completed their profile and verified their academic details,
    *   **When** they visit the job search section,
    *   **Then** the recommendation engine must rank jobs by a matching percentage score (e.g., "94% Match") and provide a brief description explaining *why* it matches (e.g., "Matches skills: React, Node.js; Matches GPA criteria").

### US-04: Real-time Application Pipeline Tracker
*   **User Story:** As a **Student**, I want to **monitor the status of my applications in a visual pipeline tracker** so that **I know exactly where I stand in each company's recruitment cycle**.
*   **Acceptance Criteria:**
    *   **Given** a student has submitted applications to multiple companies,
    *   **When** they visit their "Application Tracker",
    *   **Then** they must see a list of companies mapped to visual status bars indicating progress across: *Applied*, *Resume Shortlisted*, *Online Assessment*, *Interview Scheduled*, *Offered*, or *Rejected*.

### US-05: AI Interview Question Generator
*   **User Story:** As a **Student**, I want to **generate customized interview questions based on my resume and a target job description** so that **I can practice relevant technical and behavioral topics**.
*   **Acceptance Criteria:**
    *   **Given** a student is preparing for an upcoming interview round,
    *   **When** they select a job profile and request mock questions,
    *   **Then** the system must generate 10 tailored questions (5 technical, 5 behavioral) complete with brief bullet points representing a "Model Answer".

### US-06: Eligibility Self-Screening
*   **User Story:** As a **Student**, I want to **see an instant eligibility validation badge on job posts** so that **I do not waste effort applying to drives for which I do not meet the minimum requirements**.
*   **Acceptance Criteria:**
    *   **Given** a job posting has eligibility criteria defined (e.g., GPA > 7.5, No active backlogs),
    *   **When** a student views the job posting,
    *   **Then** the platform must display a clear badge: green "Eligible" or red "Ineligible (GPA below target / Active backlog detected)" and disable the "Apply" button if ineligible.

### US-07: Verified Academic Profile Lock
*   **User Story:** As a **Student**, I want to **lock my academic records after Placement Cell verification** so that **I can guarantee to recruiters that my submitted GPA and backlog data are official**.
*   **Acceptance Criteria:**
    *   **Given** the Placement Officer has checked and verified a student's profile,
    *   **When** the student attempts to edit locked fields (like CGPA, Backlogs, Stream),
    *   **Then** the system must freeze these fields, show a lock icon, and require a formal "Change Request" to unlock.

### US-08: Alumni Mentorship Session Booking
*   **User Story:** As a **Student**, I want to **browse and book mock interview slots with alumni mentors** so that **I can get real industry evaluation before my placement drive**.
*   **Acceptance Criteria:**
    *   **Given** an alumni mentor has opened available calendar slots,
    *   **When** a student navigates to the Mentorship portal,
    *   **Then** they must be able to filter by industry vertical (e.g., Finance, Tech, Product), select a 30-minute slot, and receive a Google Meet invite link upon confirmation.

### US-09: Immediate Notification Center
*   **User Story:** As a **Student**, I want to **configure push and email notification alerts for drive updates** so that **I never miss test deadlines or interview call-ups**.
*   **Acceptance Criteria:**
    *   **Given** a user has set notification preferences,
    *   **When** a placement officer publishes an emergency schedule change or a recruiter shortlists the student,
    *   **Then** the student must receive an email and an in-app push notification within 2 minutes.

### US-10: Integrated Drive Calendar
*   **User Story:** As a **Student**, I want to **view all upcoming recruitment deadlines and interviews on an interactive calendar** so that **I can manage my schedule and preparation load**.
*   **Acceptance Criteria:**
    *   **Given** the student has active job applications,
    *   **When** they open the "Calendar View" in their dashboard,
    *   **Then** the calendar must display clear colored blocks representing: application deadlines (blue), online assessments (orange), and scheduled interviews (green), with an option to sync with Google Calendar.

---

## 💼 Recruiter User Stories (5)

### US-11: Job Posting and Criteria Builder
*   **User Story:** As a **Recruiter**, I want to **create a detailed job post with structured eligibility rules** so that **only qualified candidates from the campus can apply**.
*   **Acceptance Criteria:**
    *   **Given** a recruiter is logged into the platform,
    *   **When** they create a new job profile,
    *   **Then** the system must require fields for job description, salary CTC, location, target branches (checkboxes), minimum CGPA, and maximum allowed active backlogs.

### US-12: AI-Powered Candidate Ranking
*   **User Story:** As a **Recruiter**, I want to **view applications sorted by an AI matching rank** so that **I can immediately focus my screening on the most qualified profiles**.
*   **Acceptance Criteria:**
    *   **Given** candidates have applied to a job posting,
    *   **When** the recruiter opens the applicant list,
    *   **Then** the platform must show candidates ranked by semantic skill overlap, project relevance, and resume quality, displaying a score out of 100 with hoverable tooltips showing matching factors.

### US-13: Drag-and-Drop Hiring Pipeline
*   **User Story:** As a **Recruiter**, I want to **manage candidate stages using a drag-and-drop Kanban board** so that **I can update student statuses easily during fast-paced recruitment drives**.
*   **Acceptance Criteria:**
    *   **Given** candidates are in the recruitment funnel,
    *   **When** the recruiter drags a candidate's card from "Online Test" to "Technical Interview",
    *   **Then** the system must update the student's status, generate an email notification to the student, and update database records instantly.

### US-14: Smart Interview Scheduler Integration
*   **User Story:** As a **Recruiter**, I want to **batch-schedule interviews based on interviewer and candidate calendar slots** so that **I can avoid scheduling conflicts and save hours of coordination**.
*   **Acceptance Criteria:**
    *   **Given** a list of shortlisted candidates for interview,
    *   **When** the recruiter selects the candidates and inputs interviewer emails,
    *   **Then** the system must cross-reference available time slots, suggest optimal times, generate calendar links, and email both parties automatically.

### US-15: Recruitment Analytics Dashboard
*   **User Story:** As a **Recruiter**, I want to **view a drive-specific dashboard showing funnel conversion metrics** so that **I can analyze yield rates and present performance summaries to my HR leadership**.
*   **Acceptance Criteria:**
    *   **Given** a company has completed or is running a campus placement drive,
    *   **When** they open their analytics panel,
    *   **Then** the system must display visual charts tracking: total applications, screening yield, interview success ratios, and offer acceptance rates, with an option to download a CSV of selected candidates.

---

## 💼 Placement Officer User Stories (5)

### US-16: Centralized Placement Drive Orchestrator
*   **User Story:** As a **Placement Officer**, I want to **approve, schedule, and launch university-wide placement drives** so that **students can view and apply to verified companies**.
*   **Acceptance Criteria:**
    *   **Given** a recruiter has submitted a job post,
    *   **When** the placement officer reviews it in their "Drive Manager" panel,
    *   **Then** they must be able to click "Approve and Schedule", set start/end deadlines, and publish it to the student feed.

### US-17: Automated Bulk GPA & Backlog Verification
*   **User Story:** As a **Placement Officer**, I want to **verify student profiles in bulk by uploading university registration records** so that **I can ensure student profiles contain truthful academic data**.
*   **Acceptance Criteria:**
    *   **Given** the college administration has exported student grades,
    *   **When** the placement officer uploads the Excel/CSV database to the verification panel,
    *   **Then** the system must run a diff, auto-approve matching profiles, and flag profiles with discrepancies (e.g., student claimed 8.2 GPA, sheet says 7.1).

### US-18: Real-Time Executive Placement Dashboard
*   **User Story:** As a **Placement Officer**, I want to **monitor aggregate statistics (placed percentage, branch metrics, top packages)** so that **I can track progress toward the college's annual placement goals**.
*   **Acceptance Criteria:**
    *   **Given** the current active placement season is underway,
    *   **When** they open the home dashboard,
    *   **Then** they must see KPI cards (Overall Placed %, Active Drives, Average & Highest Package) and a bar chart showing department-wise placement distributions.

### US-19: Segmented Mass Communication
*   **User Story:** As a **Placement Officer**, I want to **send targeted messages to specific subsets of students (e.g., unplaced CSE students)** so that **I can alert them to urgent job drives without cluttering other feeds**.
*   **Acceptance Criteria:**
    *   **Given** a need to broadcast an announcement,
    *   **When** the user selects filters (e.g., "Branch: CSE", "Placement Status: Unplaced", "CGPA: > 7.0"),
    *   **Then** the system must display the matching student count and send the drafted announcement via email/in-app notification to only those matching students.

### US-20: Accreditation & NIRF Report Exporter
*   **User Story:** As a **Placement Officer**, I want to **generate pre-formatted placement reports matching NIRF/NAAC requirements** so that **I can submit official data to university accreditation committees**.
*   **Acceptance Criteria:**
    *   **Given** the placement cell needs to submit annual records,
    *   **When** they click "Export Accreditation Report" and select the academic year,
    *   **Then** the system must output a zip folder containing a detailed PDF audit and a formatted Excel sheet listing students, department, recruiter name, CTC, and offer letter verification reference.

---

## 🔑 Admin User Stories (3)

### US-21: Granular User Role & Access Manager
*   **User Story:** As an **Admin**, I want to **manage system users and assign roles (Student, Recruiter, Placement Officer)** so that **I can control platform access and ensure data security**.
*   **Acceptance Criteria:**
    *   **Given** the admin is in the "User Management" dashboard,
    *   **When** they view user accounts,
    *   **Then** they must have options to edit user roles, approve pending recruiter business licenses, or suspend accounts, with all actions recorded in an immutable admin log.

### US-22: System Health and Performance Monitor
*   **User Story:** As an **Admin**, I want to **monitor real-time system performance (API response times, database load, AI processing queues)** so that **I can allocate resources during high-traffic registration windows**.
*   **Acceptance Criteria:**
    *   **Given** high concurrent user activity (e.g., when a major company opens applications),
    *   **When** they check the system health dashboard,
    *   **Then** they must see real-time charts showing server uptime, API request rates, database queries, and AI processing queues, triggering alert emails if latency exceeds 2 seconds.

### US-23: API Integration & Token Usage Controller
*   **User Story:** As an **Admin**, I want to **monitor external API call rates and manage LLM API tokens** so that **the platform does not exceed cloud budgets or run out of parsing credits**.
*   **Acceptance Criteria:**
    *   **Given** the platform uses external AI services for resume parsing and matching,
    *   **When** the admin reviews the "API usage dashboard",
    *   **Then** they must see monthly cost breakdowns, call volumes, and have the capability to cycle keys or restrict monthly credit limits.
