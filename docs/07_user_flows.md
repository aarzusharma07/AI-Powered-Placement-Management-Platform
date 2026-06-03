# Section 7: User Flow Diagrams

This section outlines the operational user flows for the three primary system roles. Each flowchart maps out the decision points, system processes, and notifications from authentication through to successful placement.

---

## 🎓 1. Student Journey Flow

The student workflow tracks candidate progression from registration through AI enhancement, eligibility screens, testing, interviewing, and final hire lock.

```mermaid
graph TD
    A[Student Login / Magic Link] --> B{Profile verified by Placement Cell?}
    
    %% Profile Setup Loop
    B -->|No| C[Upload Resume PDF/DOCX]
    C --> D[AI Parser Extracts Details]
    D --> E[Check / Update Academic Forms]
    E --> F[Submit Profile for Verification]
    F --> G[Placement Cell Audit Queue]
    G --> B
    
    %% Placement Drive Flow
    B -->|Yes| H[Access Dashboard & Job Feed]
    H --> I[AI Recommend Engine Runs]
    I --> J[Browse Job Openings]
    J --> K{Check Eligibility: CGPA/Backlogs?}
    
    K -->|No| L[Display Red 'Ineligible' Badge / Block Apply]
    K -->|Yes| M[Click Apply / Submit Locked Profile]
    M --> N{AI Candidate Screening Round}
    
    N -->|Rejected| O[Get Resume Feedback & Mock Prep Logs]
    O --> H
    
    N -->|Shortlisted| P[Take Online Assessment]
    P --> Q{Test Cleared?}
    Q -->|No| O
    Q -->|Yes| R[Schedule Interview via Calendar Link]
    
    R --> S[Attend Technical & HR Interviews]
    S --> T{Offer Released?}
    T -->|No| O
    T -->|Yes| U[Accept Placement Offer]
    U --> V[System Locks Profile Status as 'Placed']
    V --> W[Celebration Dashboard Alert / Close Registration]
```

---

## 🏢 2. Recruiter Journey Flow

The recruiter flow spans account setup, job configuration, applicant processing via AI ranking, screening, interview orchestration, and closing out the offer sheets.

```mermaid
graph TD
    A[Recruiter Sign Up] --> B[Upload Business Credentials & JD]
    B --> C{Admin Approval Process?}
    C -->|No| D[Flag Account / Request ID]
    D --> B
    C -->|Yes| E[Access Recruiter Dashboard]
    
    E --> F[Post Job & Setup Rules CGPA/Branches]
    F --> G[Awaiting Placement Cell Publishing]
    G --> H[Drive Active: Applications Collect]
    
    H --> I[Execute AI Candidate Ranking]
    I --> J[Review Sorted Applicant Lists]
    J --> K[Select Top Candidates for Screening]
    
    K --> L[Drag-and-Drop to 'Online Assessment' Column]
    L --> M[System Dispatches Test Invites]
    M --> N[Review Test Results Dashboard]
    
    N --> O[Select Interview Candidates]
    O --> P[Trigger Smart Interview Scheduler]
    P --> Q[Conduct Interviews Virtual/On-Campus]
    
    Q --> R[Select Hired Candidates]
    R --> S[Roll Out Hired Offers via Portal]
    S --> T[Sync Placed Database Status with College]
    T --> U[Close Job Posting / Archive Pipeline]
```

---

## 👔 3. Placement Officer Journey Flow

The Placement Officer's flow focuses on platform administration, drive orchestration, bulk academic auditing, and generating reports.

```mermaid
graph TD
    A[Placement Officer Login] --> B[View Admin Panel Dashboard]
    
    %% Verification Loop
    B --> C[Access Academic Verification Portal]
    C --> D[Upload Official University Grade CSV]
    D --> E[Automated Profile Discrepancy Scan]
    E --> F{Discrepancies Flagged?}
    F -->|Yes| G[Reject Profile / Send Mismatch Alert]
    G --> C
    F -->|No| H[Lock Student Record as Verified]
    
    %% Drive Coordination
    B --> I[Access Drive Manager Queue]
    I --> J[Review Recruiter Job Post Request]
    J --> K{Approve Posting Rules?}
    K -->|No| L[Reject Job / Request Criteria Edit]
    L --> I
    K -->|Yes| M[Approve and Set Calendar Schedule]
    M --> N[Publish Drive and Notify Eligible Students]
    
    %% Analytics & Compliance
    B --> O[Monitor Season Placed % Funnels]
    O --> P{Track Unplaced Pockets?}
    P -->|Yes| Q[Trigger Segmented Push Announcement]
    Q --> O
    P -->|No| R[Season Closes / Collect Recruiter Hired Lists]
    R --> S[Match Recruiter Lists to Student Profiles]
    S --> T[Download NIRF / NAAC Compliance Reports]
```
