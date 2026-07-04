# 18_User_Acceptance_Testing_(UAT).md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**Testing Type:** User Acceptance Testing (UAT)

**Technology Stack**

* Frontend: React + TypeScript
* Backend: Laravel 12
* Database: MySQL
* AI: Google Gemini API

---

# 1. Purpose

User Acceptance Testing (UAT) validates that Aria satisfies the functional and business requirements from the perspective of end users and stakeholders.

The objective is to ensure that the application behaves as expected before production deployment.

---

# 2. UAT Objectives

* Verify business requirements.
* Validate user workflows.
* Ensure usability.
* Confirm AI functionality.
* Verify data integrity.
* Confirm overall system readiness.

---

# 3. UAT Scope

Included Modules

* Authentication
* User Profile
* Career Goal Management
* Skill Management
* AI Career Recommendation
* Skill Gap Analysis
* Learning Roadmap
* Learning Resources
* Interview Preparation
* Dashboard
* AI History
* Notifications
* Admin Panel

---

# 4. Test Environment

Frontend

* React Production Build

Backend

* Laravel Production Configuration

Database

* MySQL Test Database

AI

* Google Gemini Test API

Browsers

* Chrome
* Firefox
* Edge
* Safari

Devices

* Desktop
* Tablet
* Mobile

---

# 5. Test Participants

Primary Testers

* Project Team
* Academic Supervisor
* Student Test Users

Optional Testers

* Career Mentors
* External Reviewers

---

# 6. Entry Criteria

Before UAT begins:

* Development completed
* System testing passed
* Critical bugs resolved
* Test environment prepared
* Database populated with sample data

---

# 7. Exit Criteria

UAT is complete when:

* All critical scenarios pass.
* Business requirements are satisfied.
* No critical defects remain.
* Stakeholders approve the system.

---

# 8. Test Scenarios

## Authentication

### UAT-001

Scenario

User Registration

Steps

1. Open registration page.
2. Enter valid information.
3. Submit form.

Expected Result

* Account created successfully.
* Verification email sent.

Status

Pass / Fail

---

### UAT-002

Scenario

User Login

Expected Result

* User redirected to Dashboard.

---

### UAT-003

Scenario

Forgot Password

Expected Result

* Reset link sent successfully.

---

# 9. User Profile

### UAT-004

Scenario

Update Profile

Expected Result

* Information saved successfully.
* Dashboard reflects updated profile.

---

# 10. Career Goals

### UAT-005

Scenario

Select Career Goal

Expected Result

* Career goal saved.
* Active career displayed.

---

### UAT-006

Scenario

Update Career Goal

Expected Result

* Changes reflected immediately.

---

# 11. Skill Management

### UAT-007

Scenario

Add Skills

Expected Result

* Skills saved successfully.

---

### UAT-008

Scenario

Update Skill Levels

Expected Result

* Skill levels updated.
* Dashboard statistics refreshed.

---

# 12. AI Career Recommendation

### UAT-009

Scenario

Generate Recommendation

Expected Result

* AI recommendation displayed.
* Confidence score shown.
* Recommendation stored in history.

---

# 13. Skill Gap Analysis

### UAT-010

Scenario

Analyze Skills

Expected Result

* Missing skills identified.
* Improvement suggestions displayed.

---

# 14. Learning Roadmap

### UAT-011

Scenario

Generate Roadmap

Expected Result

* Roadmap generated successfully.
* Timeline displayed.
* Version stored.

---

### UAT-012

Scenario

Regenerate Roadmap

Expected Result

* New roadmap generated.
* Previous version retained.

---

# 15. Learning Resources

### UAT-013

Scenario

View Recommended Resources

Expected Result

* Resources filtered correctly.
* External links open successfully.

---

# 16. Interview Preparation

### UAT-014

Scenario

Generate Interview Questions

Expected Result

* Questions generated according to selected career and difficulty.
* Questions stored in history.

---

# 17. Progress Tracking

### UAT-015

Scenario

Complete Roadmap Step

Expected Result

* Progress updated.
* Dashboard refreshed.
* Completion percentage recalculated.

---

# 18. Dashboard

### UAT-016

Scenario

Open Dashboard

Expected Result

Dashboard displays:

* Profile Summary
* Career Goal
* Learning Progress
* AI Activity
* Notifications
* Statistics

---

# 19. AI History

### UAT-017

Scenario

View AI History

Expected Result

* All AI interactions listed.
* Search and filtering work correctly.

---

# 20. Notifications

### UAT-018

Scenario

Read Notification

Expected Result

* Notification marked as read.
* Badge count updated.

---

# 21. Admin Panel

### UAT-019

Scenario

Manage Users

Expected Result

* Users listed.
* Search works.
* Status updated successfully.

---

### UAT-020

Scenario

Manage Careers

Expected Result

* Careers created, updated, and deleted successfully.

---

### UAT-021

Scenario

Generate Reports

Expected Result

* Reports generated accurately.

---

# 22. Non-Functional Acceptance

Performance

* Dashboard loads within target response time.
* API responses remain responsive.
* AI responses complete within acceptable latency.

Security

* Protected routes require authentication.
* Unauthorized access blocked.
* Input validation enforced.

Usability

* Responsive layouts.
* Accessible navigation.
* Clear feedback messages.

---

# 23. Defect Classification

| Severity | Description                                       |
| -------- | ------------------------------------------------- |
| Critical | Application unusable, data loss, security failure |
| High     | Major functionality unavailable                   |
| Medium   | Functional issue with workaround available        |
| Low      | Cosmetic or minor usability issue                 |

---

# 24. UAT Sign-Off Checklist

| Item                                 | Status |
| ------------------------------------ | ------ |
| Functional Requirements Verified     | □      |
| Non-Functional Requirements Verified | □      |
| Authentication Verified              | □      |
| AI Features Verified                 | □      |
| Database Integrity Verified          | □      |
| Security Verified                    | □      |
| Performance Verified                 | □      |
| Documentation Reviewed               | □      |
| Stakeholder Approval Received        | □      |

---

# 25. Stakeholder Approval

| Role                       | Name | Signature | Date |
| -------------------------- | ---- | --------- | ---- |
| Project Supervisor         |      |           |      |
| Project Team Lead          |      |           |      |
| QA Reviewer                |      |           |      |
| Client/Reviewer (Optional) |      |           |      |

---

# 26. UAT Summary

The User Acceptance Testing process confirms that Aria fulfills its functional, technical, and business objectives from an end-user perspective. By validating complete user journeys—from registration through AI-powered career guidance, roadmap generation, interview preparation, and progress tracking—the project ensures readiness for deployment and provides documented stakeholder approval for release.
