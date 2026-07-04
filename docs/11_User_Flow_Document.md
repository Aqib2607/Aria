# 11_User_Flow_Document.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**Frontend:** React + TypeScript

**Backend:** Laravel

**Database:** MySQL

---

# 1. Overview

This document defines the end-to-end user journeys within Aria. It outlines how users navigate the platform, interact with AI-powered features, and complete career development tasks.

The goal is to ensure a seamless, intuitive, and consistent user experience.

---

# 2. Primary User Journey

```text
Landing Page
      │
      ▼
Register/Login
      │
      ▼
Email Verification
      │
      ▼
Complete Profile
      │
      ▼
Select Career Goal
      │
      ▼
Skill Assessment
      │
      ▼
AI Career Recommendation
      │
      ▼
Generate Learning Roadmap
      │
      ▼
Explore Learning Resources
      │
      ▼
Track Progress
      │
      ▼
Practice Interview
      │
      ▼
Continuous Learning
```

---

# 3. Authentication Flow

```text
Landing Page
      │
      ▼
Register
      │
      ▼
Validate Information
      │
      ▼
Create Account
      │
      ▼
Email Verification
      │
      ▼
Login
      │
      ▼
Dashboard
```

Alternative Flow

```text
Login
    │
    ▼
Forgot Password
    │
    ▼
Email Link
    │
    ▼
Reset Password
    │
    ▼
Login
```

---

# 4. First-Time User Onboarding

Step 1

Create Account

↓

Step 2

Verify Email

↓

Step 3

Complete Profile

↓

Step 4

Add Skills

↓

Step 5

Select Career Goal

↓

Step 6

Generate AI Recommendation

↓

Step 7

Generate Learning Roadmap

↓

Step 8

Open Dashboard

---

# 5. Dashboard Flow

```text
Dashboard
   │
   ├── Profile
   ├── Career Goals
   ├── Skill Analysis
   ├── Learning Roadmaps
   ├── Learning Resources
   ├── Interview Preparation
   ├── AI History
   └── Settings
```

---

# 6. Career Recommendation Flow

```text
Dashboard
      │
      ▼
Career Module
      │
      ▼
Select Preferred Career
      │
      ▼
AI Analysis
      │
      ▼
Recommendation Results
      │
      ▼
Save Recommendation
      │
      ▼
Generate Roadmap
```

---

# 7. Skill Gap Analysis Flow

```text
Dashboard
      │
      ▼
Skill Assessment
      │
      ▼
Current Skills
      │
      ▼
Compare With Career
      │
      ▼
Missing Skills
      │
      ▼
Improvement Suggestions
      │
      ▼
Save Analysis
```

---

# 8. Learning Roadmap Flow

```text
Career Goal
      │
      ▼
Generate AI Roadmap
      │
      ▼
Learning Phases
      │
      ▼
Weekly Tasks
      │
      ▼
Mark Complete
      │
      ▼
Progress Updated
```

Users can:

* Regenerate roadmap
* View previous versions
* Continue existing roadmap

---

# 9. Learning Resource Flow

```text
Dashboard
      │
      ▼
Resources
      │
      ▼
Apply Filters
      │
      ▼
Browse Recommendations
      │
      ▼
Open Resource
      │
      ▼
Return to Dashboard
```

---

# 10. Interview Preparation Flow

```text
Dashboard
      │
      ▼
Interview Module
      │
      ▼
Choose Career
      │
      ▼
Select Difficulty
      │
      ▼
Generate Questions
      │
      ▼
Read Answers
      │
      ▼
Save Session
```

---

# 11. Progress Tracking Flow

```text
Complete Learning Step
         │
         ▼
Update Progress
         │
         ▼
Dashboard Refresh
         │
         ▼
Achievement Updated
```

---

# 12. AI History Flow

```text
Dashboard
      │
      ▼
AI History
      │
      ▼
Search History
      │
      ▼
Open Previous Result
      │
      ▼
Reuse or Regenerate
```

---

# 13. Profile Management Flow

```text
Dashboard
      │
      ▼
Profile
      │
      ▼
Edit Information
      │
      ▼
Save Changes
      │
      ▼
Update Dashboard
```

---

# 14. Notification Flow

System Events

* Roadmap Generated
* Skill Analysis Completed
* Profile Updated
* Password Changed
* Interview Session Generated

↓

Notification Center

↓

User Reads Notification

↓

Marked as Read

---

# 15. Admin Flow

```text
Admin Login
      │
      ▼
Admin Dashboard
      │
      ├── Users
      ├── Careers
      ├── Skills
      ├── Resources
      ├── Reports
      ├── Analytics
      └── Settings
```

---

# 16. Error Flow

Example: AI Request Failure

```text
User Action
      │
      ▼
AI Request
      │
      ▼
Failure
      │
      ▼
Friendly Error Message
      │
      ▼
Retry Option
```

The system should preserve user input whenever possible.

---

# 17. Logout Flow

```text
User Menu
      │
      ▼
Logout
      │
      ▼
Invalidate Sanctum Token
      │
      ▼
Redirect to Landing Page
```

---

# 18. Future User Flows

The architecture supports future flows including:

* Resume Upload → AI Resume Analysis
* Resume Builder → PDF Export
* Job Recommendation → Apply Workflow
* Certificate Upload → Progress Validation
* Mentor Booking → Session Management
* Mobile App Synchronization
* AI Chat Assistant
* Company-Specific Interview Preparation

---

# 19. User Experience Principles

The platform should ensure:

* Minimal clicks to complete tasks
* Clear navigation hierarchy
* Immediate feedback after actions
* Persistent progress tracking
* Transparent AI interactions
* Consistent behavior across all modules

---

# 20. User Flow Summary

Aria is designed around a guided learning journey that takes users from account creation to personalized career planning, AI-assisted learning, and continuous progress monitoring. Every flow emphasizes simplicity, clarity, and efficiency while supporting future expansion without disrupting the overall user experience.
