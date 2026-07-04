# 02_Requirements_Architecture_Document.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**Technology Stack**

* Frontend: React + TypeScript
* Backend: Laravel
* Database: MySQL
* AI: Google Gemini API
* Authentication: Laravel Sanctum

---

# 1. System Overview

Aria is an AI-powered career guidance platform that assists students, graduates, and self-learners in selecting career paths, identifying missing skills, generating personalized learning roadmaps, preparing for interviews, and tracking learning progress.

The system combines traditional web application architecture with AI-powered recommendation services to provide intelligent career guidance through an interactive dashboard.

---

# 2. Project Objectives

The system aims to:

* Help users choose suitable careers.
* Generate personalized learning roadmaps.
* Analyze skill gaps.
* Recommend learning resources.
* Generate interview questions.
* Track learning progress.
* Store AI interaction history.
* Provide administrative management.

---

# 3. Stakeholders

## Primary Stakeholders

* Students
* Graduates
* Self-learners

## Secondary Stakeholders

* Administrators
* Career mentors (future)
* Educational institutions (future)

---

# 4. User Role Matrix

## Guest

Permissions

* View landing page
* Read platform information
* Register
* Login

---

## Registered User

Permissions

* Manage profile
* Set career goals
* Generate AI roadmaps
* Perform skill-gap analysis
* Generate interview questions
* Browse learning resources
* Track progress
* View AI history

---

## Administrator

Permissions

* Dashboard
* User management
* Career management
* Learning resource management
* AI prompt management
* Analytics
* Platform configuration
* Report generation

---

# 5. Module Breakdown

## Module 1 — Authentication

Functions

* Registration
* Login
* Logout
* Email verification
* Password reset
* Profile management

---

## Module 2 — User Profile

Functions

* Personal information
* Education
* Skills
* Career interests
* Learning preferences
* Account settings

---

## Module 3 — Career Goal Management

Functions

* Select career
* Multiple career goals
* Career priority
* Goal history
* Goal updates

---

## Module 4 — AI Career Recommendation

Functions

* Analyze user profile
* Analyze skills
* Recommend careers
* Explain recommendations
* Confidence score

---

## Module 5 — Skill Gap Analyzer

Functions

* Current skill analysis
* Required skill analysis
* Missing skill detection
* Skill comparison
* Improvement suggestions

---

## Module 6 — AI Learning Roadmap

Functions

* Generate roadmap
* Learning phases
* Weekly milestones
* Monthly milestones
* Resource recommendations
* Regenerate roadmap
* Save roadmap versions

---

## Module 7 — Learning Resources

Functions

* Course recommendations
* Documentation
* Videos
* Articles
* Practice websites
* Books
* Certifications

---

## Module 8 — AI Interview Preparation

Functions

* Generate interview questions
* Beginner level
* Intermediate level
* Advanced level
* Coding questions
* Behavioral questions
* Answer explanations

---

## Module 9 — Progress Tracking

Functions

* Skill completion
* Roadmap progress
* Learning statistics
* Weekly progress
* Monthly progress
* Achievement tracking

---

## Module 10 — AI History

Functions

* Prompt history
* Roadmap history
* Skill analysis history
* Interview history
* Search history

---

## Module 11 — Dashboard

Widgets

* Profile summary
* Career goals
* Current roadmap
* Progress overview
* Skill status
* Recent AI activity
* Learning statistics

---

## Module 12 — Admin Panel

Functions

* User management
* Career path management
* Skill library management
* Learning resource management
* AI prompt configuration
* Analytics dashboard
* Reports

---

# 6. Business Rules

### Authentication

* Every user must register.
* Email addresses must be unique.
* Passwords must be securely hashed.

---

### Career Goals

* A user may maintain multiple career goals.
* Only one goal may be marked as the primary active goal.

---

### AI Roadmaps

* Every roadmap belongs to one user.
* Roadmaps are versioned.
* Older versions remain accessible.
* Users may regenerate roadmaps without losing previous versions.

---

### Skill Analysis

* Every analysis is associated with a selected career.
* Missing skills are calculated against the predefined career skill model.

---

### Learning Resources

* Resources are categorized.
* Resources can target multiple careers.
* Resources can target multiple skills.

---

### Interview Module

* Interview questions are generated according to the selected career and difficulty level.
* Every interview session is stored.

---

### Progress

* Progress is automatically recalculated whenever users update completed milestones.

---

# 7. Reporting Requirements

## User Reports

* Career progress
* Skill completion
* AI usage
* Learning history

---

## Administrative Reports

* Registered users
* Active users
* AI requests
* Popular careers
* Skill demand trends
* Resource usage
* System activity

---

# 8. Integration Matrix

| Integration       | Purpose                                   |
| ----------------- | ----------------------------------------- |
| Google Gemini API | AI recommendations and content generation |
| Laravel Sanctum   | Authentication                            |
| MySQL             | Data storage                              |
| Email Service     | Verification and password recovery        |

---

# 9. Non-Functional Requirements

## Performance

* Dashboard load time under 2 seconds.
* AI responses displayed within an acceptable response window based on external AI service latency.
* Optimized database queries.

---

## Scalability

The architecture should support:

* 100,000+ users
* Modular expansion
* Additional AI providers
* Future mobile applications

---

## Reliability

* Daily database backup
* Exception handling
* Logging
* Recovery mechanisms

---

## Maintainability

* Modular Laravel architecture
* RESTful APIs
* Layered service architecture
* Reusable React components

---

## Availability

Target uptime:

99.9%

---

# 10. Security Model

Authentication

* Laravel Sanctum
* Secure password hashing
* Session management

Authorization

* Role-Based Access Control (RBAC)

Security Measures

* CSRF protection
* XSS prevention
* SQL injection prevention
* Request validation
* Rate limiting
* Secure environment variables
* API authentication

---

# 11. Compliance Considerations

* Secure storage of user data.
* Protection of personally identifiable information (PII).
* User consent before AI processing where applicable.
* Audit logging for administrative actions.

---

# 12. Future Expansion

The architecture is designed to support future modules without major structural changes, including:

* Resume Analyzer
* AI Resume Builder
* AI Mock Interviews
* Job Recommendation Engine
* Internship Portal
* Certificate Tracker
* Learning Streaks
* Mobile Application
* Multi-language Support
* Community Forum
* Mentor Marketplace
* Multiple AI Provider Integration

---

# 13. Developer Deliverables

The implementation team should produce:

* React frontend
* Laravel backend
* MySQL database schema
* REST API
* AI integration layer
* Authentication module
* Admin dashboard
* User dashboard
* API documentation
* Testing suite
* Deployment configuration
* Technical documentation

---

# 14. Architecture Summary

Aria follows a modular three-tier architecture:

**Presentation Layer**

* React + TypeScript

↓

**Application Layer**

* Laravel REST API
* Business Services
* AI Service Layer
* Authentication Layer

↓

**Data Layer**

* MySQL Database
* File Storage
* Logs

↓

**External Services**

* Google Gemini API

This architecture emphasizes modularity, scalability, maintainability, and secure AI integration, providing a solid foundation for both the current academic implementation and future enterprise-scale enhancements.
