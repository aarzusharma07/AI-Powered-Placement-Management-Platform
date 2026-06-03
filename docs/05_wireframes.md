# Section 5: Low-Fidelity Wireframes

This document outlines the UI layout blueprints for the 10 core views of the **AI-Powered Placement Management Platform**. These wireframes utilize standard ASCII and markdown block layouts to represent screen partitions, navigation setups, dashboard widgets, and table layouts.

---

## 💻 SaaS Core Layout Frameworks

### Standard Dashboard Layout Structure
Most dashboard screens follow a professional **Split-Pane SaaS Layout**:
```text
+-----------------------------------------------------------------------------+
| LOGO  | NAVBAR: Global Search, Quick Actions, Profile, Notifications       |
+-------+---------------------------------------------------------------------+
| S     |                                                                     |
| I     | MAIN CONTENT AREA                                                   |
| D     |                                                                     |
| E     | +-------------------+  +-------------------+  +-------------------+ |
| B     | |   KPI Card 1      |  |   KPI Card 2      |  |   KPI Card 3      | |
| A     | +-------------------+  +-------------------+  +-------------------+ |
| R     |                                                                     |
|       | +-----------------------------------------------------------------+ |
|       | |   Primary Data Table or Graph Component                         | |
|       | +-----------------------------------------------------------------+ |
+-------+---------------------------------------------------------------------+
```

---

## 📂 The 10 Low-Fidelity UI Wireframes

### 1. Landing Page
*A marketing-focused page designed to convert prospective colleges and recruiters.*
```text
+-----------------------------------------------------------------------------------+
|  [LOGO] AIPMP         Features   For Colleges   For Recruiters   [Login / SignUp] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                      AI-Powered Campus Placement Automation                       |
|          Streamline screening, rank talent, and verify records in minutes.        |
|                                                                                   |
|                 [Request College Demo]     [Register as Recruiter]                |
|                                                                                   |
|  +-----------------------+  +-----------------------+  +-----------------------+  |
|  |     For Students      |  |    For Recruiters     |  | For Placement Cells   |  |
|  | Resume parse, AI prep |  | Semantic ranking, raw |  | Spreadsheets replaced |  |
|  | and smart match tags. |  | pipeline tracking UI. |  | & verified metrics.   |  |
|  +-----------------------+  +-----------------------+  +-----------------------+  |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|  [LOGO] 2026 AIPMP Inc.         Privacy Policy   |   Terms of Service             |
+-----------------------------------------------------------------------------------+
```

---

### 2. Login Page
*A simple entry gate containing role selection tabs.*
```text
+-----------------------------------------------------------------------------------+
|                                                                                   |
|   +-----------------------+   +-----------------------------------------------+   |
|   |                       |   |               Welcome to AIPMP                |   |
|   |  AI-POWERED           |   |   Select your Role:                           |   |
|   |  PLACEMENT CELL       |   |   [Student]   [Recruiter]   [Placement Cell]  |   |
|   |                       |   |   ------------------------------------------  |   |
|   |  "Transforming        |   |   Enter Institutional Email:                  |   |
|   |   university hiring   |   |   [ user@university.edu                     ] |   |
|   |   pipelines."         |   |                                               |   |
|   |                       |   |   [x] Keep me signed in                       |   |
|   |  • 80% Admin Savings  |   |                                               |   |
|   |  • 50% Faster Hiring  |   |   [       Login via Secure Magic Link       ] |   |
|   |                       |   |                                               |   |
|   |                       |   |   Or: [ G Sign in with Google SSO ]           |   |
|   +-----------------------+   +-----------------------------------------------+   |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

### 3. Student Dashboard
*The primary workspace for a student user.*
```text
+-----------------------------------------------------------------------------------+
|  [AIPMP] | Search jobs...                                  (🔔) (✉️) [Profile v] |
+-----------------------------------------------------------------------------------+
| [X] Home          |  Welcome back, Sarah! (GPA: 9.1 | Status: Verified)           |
| [ ] Jobs Feed     |  +-------------------+  +-------------------+  +------------+ |
| [ ] Resume Parse  |  | Active Apps: 04   |  | Interviews: 02    |  | Score: 85  | |
| [ ] Prep Portal   |  +-------------------+  +-------------------+  +------------+ |
| [ ] Mentorship    |                                                               |
| [ ] Settings      |  📅 Upcoming Placement Deadlines                              |
|                   |  +----------------------+---------------+------------+--------+ |
|                   |  | Company              | Event         | Date/Time  | Status | |
|                   |  +----------------------+---------------+------------+--------+ |
|                   |  | Microsoft Corp.      | Online Test   | June 05    | Join   | |
|                   |  | Google Cloud         | Interview     | June 08    | Prep   | |
|                   |  | Xebia Technology     | Resume Lock   | June 10    | Submit | |
|                   |  +----------------------+---------------+------------+--------+ |
+-------------------+---------------------------------------------------------------+
```

---

### 4. Job Recommendation Page
*Filtered view displaying matching algorithms.*
```text
+-----------------------------------------------------------------------------------+
|  [AIPMP] | Search jobs...                                  (🔔) (✉️) [Profile v] |
+-----------------------------------------------------------------------------------+
| [ ] Home          |  AI Job Matches for you                                       |
| [X] Jobs Feed     |  Filter: [Tech Roles v]  [CTC > $80K v]  Sort: [Match Score v] |
| [ ] Resume Parse  |                                                               |
| [ ] Prep Portal   |  +----------------------------------------------------------+ |
| [ ] Mentorship    |  | Microsoft - Software Engineer (Redmond)       [96% MATCH] | |
| [ ] Settings      |  | Req: React, Node, SQL. Match: "Your profile has React     | |
|                   |  | and SQL projects. GPA exceeds required 8.0."             | |
|                   |  | [ View Job Details ]                    [ Quick Apply ]  | |
|                   |  +----------------------------------------------------------+ |
|                   |  +----------------------------------------------------------+ |
|                   |  | Deloitte - Consultant (Cybersecurity)          [82% MATCH] | |
|                   |  | Req: Networks, Cloud. Match: "Missing AWS Cert tag."     | |
|                   |  | [ View Job Details ]                    [ Quick Apply ]  | |
|                   |  +----------------------------------------------------------+ |
+-------------------+---------------------------------------------------------------+
```

---

### 5. Resume Analysis Page
*Actionable feedback panel helping students bridge skill gaps.*
```text
+-----------------------------------------------------------------------------------+
|  [AIPMP] | Search jobs...                                  (🔔) (✉️) [Profile v] |
+-----------------------------------------------------------------------------------+
| [ ] Home          |  AI Resume Analyzer                                           |
| [ ] Jobs Feed     |  +----------------------+  +--------------------------------+ |
| [X] Resume Parse  |  | Uploaded File:       |  | Analysis Result                | |
| [ ] Prep Portal   |  | sarah_resume_v2.pdf  |  | Score: [ 85 / 100 ]            | |
| [ ] Mentorship    |  |                      |  |                                | |
| [ ] Settings      |  | [ Choose New File ]  |  | Missing Technical Skills:      | |
|                   |  | [ Re-run Analysis ]  |  | • Docker                       | |
|                   |  |                      |  | • CI/CD Pipelines              | |
|                   |  | Status: Extracted    |  |                                | |
|                   |  | Skills: React, Node  |  | Formatting Issues:             | |
|                   |  | GPA: 9.1 detected    |  | [x] Font Consistency           | |
|                   |  |                      |  | [!] Action verbs missing       | |
|                   |  +----------------------+  +--------------------------------+ |
+-------------------+---------------------------------------------------------------+
```

---

### 6. Application Tracking Page
*Application pipeline stage monitor.*
```text
+-----------------------------------------------------------------------------------+
|  [AIPMP] | Search jobs...                                  (🔔) (✉️) [Profile v] |
+-----------------------------------------------------------------------------------+
| [ ] Home          |  My Applications (Active: 04)                                 |
| [ ] Jobs Feed     |  Select App: [ Microsoft - Software Engineer (June 2026) v ]  |
| [ ] Resume Parse  |                                                               |
| [ ] Prep Portal   |  Stage Progress:                                              |
| [ ] Mentorship    |  [Applied] ===> [Screened] ===> [Online Test] ===> [Interview]|
| [X] Settings      |     (x)            (x)             (x)             (/)    |
|                   |                                                               |
|                   |  Status Notes:                                                |
|                   |  • Interview Scheduled for June 08, 10:00 AM (Virtual Slot).  |
|                   |  • Interviewer: HR Specialist Team 2.                         |
|                   |  • Link: [ Join Interview Call ]                              |
+-------------------+---------------------------------------------------------------+
```

---

### 7. Recruiter Dashboard
*Main interface for visiting talent acquisition teams.*
```text
+-----------------------------------------------------------------------------------+
|  [AIPMP Recruiter] | Search Candidates...                  (🔔) (✉️) [HR Profile v]|
+-----------------------------------------------------------------------------------+
| [X] Dashboard     |  Xebia Recruitment Campaign Overview                           |
| [ ] Job Posts     |  +-------------------+  +-------------------+  +------------+ |
| [ ] Candidate Dir |  | Active Jobs: 02   |  | Total Applied: 320|  | Offers: 12 | |
| [ ] Schedulers    |  +-------------------+  +-------------------+  +------------+ |
| [ ] Analytics     |                                                               |
|                   |  📊 Screening Funnel Stats                                    |
|                   |  [Applied (320)] =====> [Shortlisted (80)] =====> [Hired (12)]|
|                   |  ===================================>                         |
|                   |                                                               |
|                   |  🔔 Action Required:                                          |
|                   |  • 15 candidates pending confirmation for Technical Round 1.   |
|                   |  • [ View Schedule Calendar ]                                 |
+-------------------+---------------------------------------------------------------+
```

---

### 8. Candidate Management Page
*The pipeline board showing applicants.*
```text
+-----------------------------------------------------------------------------------+
|  [AIPMP Recruiter] | Job: [ Software Engineer 1 v ]                 [Export CSV]  |
+-----------------------------------------------------------------------------------+
| [ ] Dashboard     |  Job Pipeline Board                                           |
| [ ] Job Posts     |  +--------------+  +--------------+  +--------------+  +----+ |
| [X] Candidate Dir |  | Screened (10)|  | Test Pass (5)|  | Interview (3)|  |Hire| |
| [ ] Schedulers    |  +--------------+  +--------------+  +--------------+  +----+ |
| [ ] Analytics     |  | Sarah Jenkins|  | David Miller |  | Emily Watson |  |John| |
|                   |  | (Match: 95%) |  | (Match: 91%) |  | (Match: 94%) |  |    | |
|                   |  | [View Profile]| | [View Profile]| | [View Profile]| |    | |
|                   |  |--------------|  |--------------|  |--------------|  |    | |
|                   |  | Alex Jones   |  | Chris Carter |  |              |  |    | |
|                   |  | (Match: 88%) |  | (Match: 86%) |  |              |  |    | |
|                   |  +--------------+  +--------------+  +--------------+  +----+ |
+-------------------+---------------------------------------------------------------+
```

---

### 9. Placement Officer Dashboard
*The central control dashboard for college career teams.*
```text
+-----------------------------------------------------------------------------------+
|  [AIPMP Admin] | Search Students...                       (🔔) (✉️) [Officer Profile] |
+-----------------------------------------------------------------------------------+
| [X] Drives Manager|  Placement Dashboard (Season 2025-2026)                       |
| [ ] Verification  |  +-------------------+  +-------------------+  +------------+ |
| [ ] Student DB    |  | Placed %: 74%     |  | Active Drives: 08 |  | Avg: $82K  | |
| [ ] Alerts        |  +-------------------+  +-------------------+  +------------+ |
| [ ] Reports       |                                                               |
|                   |  📊 Department-wise Placement Rates                           |
|                   |  CSE:  [████████████████████████████] 88%                     |
|                   |  ECE:  [████████████████████] 65%                             |
|                   |  MECH: [████████████] 40%                                     |
|                   |                                                               |
|                   |  ⚠️ System Alerts:                                            |
|                   |  • [!] 12 Student academic profile GPA claims mismatch database.|
|                   |  • [ Resolve Discrepancies Now ]                              |
+-------------------+---------------------------------------------------------------+
```

---

### 10. Admin Dashboard
*System administrators control board.*
```text
+-----------------------------------------------------------------------------------+
|  [AIPMP System] | System Admin Console                     (🔔) [SuperAdmin Profile]|
+-----------------------------------------------------------------------------------+
| [ ] User Roles    |  System Health Diagnostics                                    |
| [X] System Health |  +-------------------+  +-------------------+  +------------+ |
| [ ] API Alloc     |  | API Latency: 120ms|  | CPU Usage: 32%    |  | Error: 0.0%| |
| [ ] Audit Logs    |  +-------------------+  +-------------------+  +------------+ |
|                   |                                                               |
|                   |  🔑 Active API Providers & Token Usage Tracking               |
|                   |  +-----------------+-------------------+----------------------+ |
|                   |  | Provider        | Endpoint          | Usage Last 24 Hours  | |
|                   |  +-----------------+-------------------+----------------------+ |
|                   |  | OpenAI Parser   | v1/chat/completions| 12,420 Tokens        | |
|                   |  | Google Cloud SSO| /oauth/token      | 3,110 Sessions       | |
|                   |  | Sengrid Mail    | /mail/send        | 4,200 Alerts         | |
|                   |  +-----------------+-------------------+----------------------+ |
+-------------------+---------------------------------------------------------------+
```
---

## 🎨 Design System & Component Specifications

### Button Styles
```
Primary CTA: [ Bright Teal ] "Apply Now", "Accept Offer"
Secondary Action: [ Light Gray Border ] "Cancel", "Skip"
Danger Action: [ Red Background ] "Withdraw", "Reject"
Disabled State: [ Gray, 50% Opacity ] Inactive buttons
```

### Card Components
- **KPI Card:** Rounded corners (8px), shadow depth 2, icon + number + label
- **Job Card:** Minimal borders, icon badges for skills, green match percentage
- **Candidate Card:** Profile photo, name, match %, one-liner about why they match

### Data Tables
- **Header Row:** Slightly darker background, sort icons on columns
- **Alternating Rows:** White + Light Gray striping for readability
- **Interactive Rows:** Hover effect with subtle background lightening
- **Pagination:** Show 25-50 rows per page; lazy-load for performance

### Navigation Sidebar
- **Collapsed State:** Icon-only sidebar (80px width)
- **Expanded State:** Full labels visible (220px width)
- **Active State:** Teal highlight bar on the left edge of active menu item
- **Tooltip Support:** Hovering on collapsed nav shows full label in tooltip

---

## 📱 Responsive Design Considerations

All wireframes are designed for desktop-first (1440px width), but responsive breakpoints are:

- **Desktop:** 1440px+ (sidebar always visible)
- **Tablet:** 768px - 1439px (sidebar collapsible)
- **Mobile:** < 768px (sidebar hidden by default, hamburger menu for navigation)

**Mobile Navigation:** Bottom tab bar for Students (Home, Jobs, Resume, Mentorship). Stack-based layout for recruiters/officers.

---

## 🖼️ Wireframe Annotations & Developer Notes

### Student Dashboard - Detailed Interactions
- **Welcome Banner:** Dismissible; shows verified status and days until graduation.
- **KPI Cards:** Click to expand and see trend graphs (e.g., Active Apps trending up 20% week-over-week).
- **Upcoming Deadlines Table:** Sortable by date/company; click row to open job details modal.
- **Notification Preferences:** Cog icon in top-right opens settings to configure push/email notifications.

### Job Recommendation Feed - Filtering & Sorting
- **Filter Sidebar:** Collapsible; multiple selections allowed (Tech Role + Salary > 80K).
- **Match Explanation Tooltip:** Hovering over the match percentage shows breakdown: "85% Match = Skills (90%) + GPA (80%) + Location (75%)".
- **Save Job:** Heart icon to save job for later; saved jobs sync across devices.

### Recruiter Kanban Board - Drag-and-Drop Interactions
- **Card Drag Source:** Click and hold on candidate card, drag to adjacent column.
- **Drop Animation:** Smooth card slide-in animation on drop; auto-save to backend.
- **Bulk Actions:** Checkbox on cards allows multi-select + batch move to next stage.
- **Search Bar:** Type candidate name or skills to filter visible cards across all columns.

### Placement Officer Dashboard - Alert System
- **Alert Severity Levels:** 
  - 🔴 Critical (red border): GPA mismatches requiring immediate resolution
  - 🟡 Warning (yellow border): Missing resume uploads or unverified profiles
  - 🔵 Info (blue border): Upcoming drive deadlines or low placement statistics
- **Dismiss/Snooze:** Each alert has 'X' to dismiss and 'Bell' to snooze for 7 days.

---

## 📐 Wireframe Specifications Table

| Wireframe | Primary Actor | Key Interactions | Data Points | CTA Buttons |
| :--- | :--- | :--- | :--- | :--- |
| **Landing Page** | Public | Navigation, Role Selection | Features list, testimonials | Login, SignUp |
| **Login Page** | Public | Role tabs, SSO integration | Email field, remember checkbox | Login via Email/Google |
| **Student Dashboard** | Student | View KPIs, read alerts | 3-4 KPIs, upcoming deadlines | Explore Jobs, View Resume |
| **Job Feed** | Student | Filter, sort, view matches | Match %, job title, company | Apply, Save Job |
| **Resume Analyzer** | Student | Upload, trigger analysis | Score, skill gaps, checklist | Re-analyze, Download Report |
| **Application Tracker** | Student | View status pipeline | Company, stage, timeline | View Interview Link, Prepare |
| **Recruiter Dashboard** | Recruiter | Monitor funnel stats | Applied, shortlisted, hired | View Candidates, Schedule |
| **Candidate Kanban** | Recruiter | Drag candidates, batch actions | Candidate names, scores | View Profile, Send Assessment |
| **Officer Dashboard** | Officer | View placement metrics | Placed %, departments, CTC | Verify Student, Launch Drive |
| **Admin Console** | Admin | Monitor health, manage users | API latency, user counts | Suspend User, Cycle Keys |

---

## 🎯 Accessibility & Usability Guidelines

- **Color Contrast:** All text meets WCAG AA standards (≥ 4.5:1 ratio).
- **Keyboard Navigation:** All interactive elements accessible via Tab and Enter keys.
- **Screen Reader Support:** Semantic HTML labels for buttons, inputs, and tables.
- **Mobile Touch Targets:** All buttons sized ≥ 44x44 px for easy tapping.
- **Error Messages:** Clear, contextual error messages shown inline near form fields.

---

## 📊 Wireframe to Code Handoff Checklist

Before frontend developers begin implementation, ensure:

- [ ] All wireframes reviewed and approved by stakeholders.
- [ ] Component library design specifications finalized in Figma/Adobe XD.
- [ ] Responsive breakpoints tested and documented for each wireframe.
- [ ] Accessibility audit completed (color contrast, keyboard navigation).
- [ ] API endpoints mapped to each wireframe view (in documentation).
- [ ] Mock data / dummy content prepared for development environment.
- [ ] Loading states and error states designed for all data views.
- [ ] Performance targets set (First Contentful Paint < 1.5s).