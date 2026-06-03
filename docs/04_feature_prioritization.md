# Section 4: Feature Prioritization (MoSCoW Framework)

To manage engineering resources effectively and ensure a fast time-to-market, this section breaks down the product features using the **MoSCoW Framework** (Must Have, Should Have, Could Have, Won't Have).

---

## 🟢 Must Have (Core MVP Scope)
*These features represent the minimum viable product (MVP) required to run a digital placement drive. Without these, the platform cannot function.*

| Feature Name | Primary Actor | Strategic PM Justification |
| :--- | :--- | :--- |
| **Authentication & SSO / JWT** | All Roles | Critical for data integrity, privacy compliance, and role boundaries. Ensures students cannot modify admin configs. |
| **Academic Profile Builder & Lock** | Student / PO | Creates the core data record. Replaces spreadsheets. Locking verified data prevents student profile falsification. |
| **Job Posting & Rules Configurator** | Recruiter / PO | Allows companies to set eligibility parameters (CGPA, branch, backlogs) which automate screening boundaries. |
| **Resume Upload & Storage** | Student | Baseline requirement. Students must be able to submit their PDF/DOCX files for recruiters to view. |
| **Eligibility Filter & Apply Flow** | Student | Automatically restricts student applications based on GPA or backlog rules, preventing ineligible submissions. |
| **Student Directory & Funnel Dashboard** | Placement Officer | Solves the primary administrative pain point by providing a single dashboard showing who is placed, unplaced, or processing. |

---

## 🟡 Should Have (Differentiators & AI Core)
*Important features that add significant value and define the product's competitive advantage, targeted for launch immediately after the MVP foundations are verified.*

| Feature Name | Primary Actor | Strategic PM Justification |
| :--- | :--- | :--- |
| **AI Resume Parser (NLP)** | Student | Replaces manual profile data entry by extracting structured fields, reducing onboarding friction. |
| **AI Candidate Ranking Engine** | Recruiter | Saves hours of HR resume scanning. Sorts applicants by semantic match, making the platform highly valuable for recruiters. |
| **AI Job Recommendations** | Student | Improves engagement by proactively pushing high-conversion matches to the student's feed. |
| **Bulk Segmented Notifications** | PO / Student | Critical for operational agility. Enables emergency announcements to specific student segments (e.g., "Hired CSE students"). |
| **Smart Interview Scheduler** | Recruiter / Student | Coordinates calendar slots to eliminate back-and-forth emails. Resolves major recruitment logistical friction. |

---

## 🔵 Could Have (Value Add & Advanced Prep)
*Desirable features that improve the overall user experience and long-term engagement, but are not critical to core operations. Deployed as bandwidth permits.*

| Feature Name | Primary Actor | Strategic PM Justification |
| :--- | :--- | :--- |
| **AI Interview Prep Generator** | Student | Provides personalized mock questions. While highly engaging, it is a self-study feature that does not block hiring. |
| **Alumni Mentorship Booking** | Student / Alumni | Connects students to alumni for career advice. Can run manually through calendar invite links initially. |
| **Mock Interview Feedback Logs** | Student / Alumni | Houses performance reports from mock trials, creating qualitative preparation logs. |
| **Dynamic PDF Resume Builder** | Student | Generates clean, standard resumes from profile data. Good for standardization, but raw PDF uploads are sufficient. |

---

## 🔴 Won't Have (Deferred / Future Scope)
*Features excluded from the current roadmap cycle to prevent scope creep. Re-evaluated in future planning sessions.*

| Feature Name | Strategic PM Justification | Proposed Alternative |
| :--- | :--- | :--- |
| **In-Platform Coding Assessment Engine** | High engineering complexity to build compilers and runtime sandboxes. Colleges already license dedicated third-party tools (e.g., HackerRank, Mettl). | Integrate via API with third-party testing platforms in Phase 2. |
| **Automated Video Proctoring** | Building AI eye-tracking and facial analysis engines is expensive and prone to false positives, risking compliance issues. | Integrate third-party proctoring hooks or run virtual tests on Zoom/Teams. |
| **Consortium Networking (Multi-College)** | Expands the database model to shared regional networks, adding data isolation and institutional competition complexities. | Keep each college instance isolated on its own tenant space. || **AI-Powered Resume Matching via GitHub Integration** | While valuable for tech roles, GitHub API integrations require significant data privacy compliance work and add feature scope. | Offer as an optional third-party integration in Phase 3 via Zapier or IFTTT. |
| **Real-Time Video Interview Transcription** | Requires enterprise-grade video processing and real-time speech-to-text APIs; complex to scale reliably. | Defer to Phase 4; partner with specialized vendors like Descript or Rev for transcription services. |
---

## 📈 Impact vs. Effort Prioritization Matrix

The priority matrix below visualizes the feature prioritization, mapping the value added against the development effort required:

```text
High Value  |  -------------------------------------------------------------
            |  [MUST HAVE]                                  [SHOULD HAVE]
            |  • Profile Lock & Verify                      • AI Candidate Ranking
            |  • Job Posting & Eligibility                  • AI Resume Parsing
            |  • Application Flow                           • Smart Scheduler
            |                                
            |  -------------------------------------------------------------
            |  [COULD HAVE]                                 [WON'T HAVE]
            |  • AI Interview Prep                          • Custom Coding Sandbox
            |  • Alumni Mentor Booking                      • AI Proctoring Engine
            |  • Resume Builder                             • Consortium Networking
            |
Low Value   |  -------------------------------------------------------------
               Low Effort                                    High Effort
```
