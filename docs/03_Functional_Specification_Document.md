# 03_Functional_Specification_Document.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**Technology Stack**

* Frontend: React + TypeScript
* Backend: Laravel
* Database: MySQL
* AI: Google Gemini API

---

# 1. Introduction

This document describes the functional behavior of every module within Aria. It defines user interactions, system workflows, validation rules, CRUD operations, permissions, state transitions, and audit requirements to guide implementation.

---

# 2. System Roles

## Guest

Allowed Actions

* View landing page
* Register
* Login

Restrictions

* Cannot access AI features
* Cannot access dashboard

---

## Registered User

Allowed Actions

* Manage profile
* Select career goals
* Generate AI roadmap
* Analyze skills
* Generate interview questions
* View learning resources
* Track progress
* View AI history

---

## Administrator

Allowed Actions

* Manage users
* Manage careers
* Manage skills
* Manage learning resources
* View reports
* Configure AI prompts
* View analytics

---

# 3. Authentication Module

## Functional Workflow

User Registration

User → Registration Form

↓

Validation

↓

Create Account

↓

Hash Password

↓

Store User

↓

Email Verification

↓

Login

---

## CRUD Matrix

| Operation      | User | Admin |
| -------------- | ---- | ----- |
| Create Account | Yes  | Yes   |
| View Profile   | Yes  | Yes   |
| Update Profile | Yes  | Yes   |
| Delete Account | No   | Yes   |

---

## Validation Rules

* Name required
* Email required
* Email unique
* Password minimum 8 characters
* Password confirmation required

---

## Edge Cases

* Duplicate email
* Invalid email
* Weak password
* Expired verification link

---

# 4. User Profile Module

## Functions

* Edit profile
* Education details
* Skills
* Interests
* Experience
* Learning preferences

---

## CRUD Matrix

Create

* Profile

Read

* Profile

Update

* Profile

Delete

* Optional (admin only)

---

## Validation

* Required name
* Valid graduation year
* Duplicate skills prevented

---

# 5. Career Goal Module

## Workflow

Dashboard

↓

Choose Career

↓

AI Recommendation

↓

Save Career Goal

↓

Generate Roadmap

---

## Functional Requirements

Users can

* Add multiple goals
* Select primary goal
* Archive goals
* Delete goals
* Update goals

---

## Validation

Career must exist.

Duplicate active career goals are not allowed.

---

# 6. Skill Gap Analyzer

## Workflow

Select Career

↓

Load Required Skills

↓

Compare User Skills

↓

Identify Missing Skills

↓

Generate Report

↓

Store Analysis

---

## Functional Rules

Every analysis

* belongs to one user
* belongs to one career
* generates missing skills
* stores analysis history

---

# 7. AI Learning Roadmap

## Workflow

Career Goal

↓

Current Skills

↓

Prompt Generation

↓

Gemini API

↓

AI Response

↓

Roadmap Parsing

↓

Database Storage

↓

Dashboard Display

---

## Functional Requirements

Users can

* Generate roadmap
* Regenerate roadmap
* Save roadmap
* View previous versions
* Track completion

---

## Validation

Career selected

Skills provided

Internet available

Valid AI response

---

# 8. Learning Resources Module

## Workflow

Career

↓

Missing Skills

↓

AI Recommendation

↓

Resources

↓

Save

---

## Categories

* Courses
* Videos
* Books
* Documentation
* Practice Websites
* Certifications

---

## CRUD

Admin

Create

Update

Delete

View

Users

View only

---

# 9. AI Interview Module

## Workflow

Choose Career

↓

Difficulty

↓

Gemini Prompt

↓

Generate Questions

↓

Store Session

↓

Display Questions

---

## Question Types

* MCQ
* Coding
* Behavioral
* Technical
* Scenario-based

---

## Difficulty Levels

* Beginner
* Intermediate
* Advanced

---

# 10. Dashboard Module

Widgets

* Career Goal
* Current Roadmap
* Skill Gap Summary
* Interview Progress
* Learning Progress
* Recent AI Activity
* Statistics

---

## Dashboard Refresh

Refresh after

* Login
* Roadmap generation
* Skill analysis
* Progress update

---

# 11. Progress Tracking Module

Workflow

Complete Milestone

↓

Update Progress

↓

Update Percentage

↓

Refresh Dashboard

↓

Store History

---

## Calculations

Track

* Completed skills
* Completed milestones
* Roadmap percentage
* Learning streak

---

# 12. AI History Module

Stores

* Prompt
* AI Response
* Roadmap
* Skill Analysis
* Interview Session
* Timestamp

---

## Search Filters

* Career
* Date
* AI Feature
* Keywords

---

# 13. Admin Module

## User Management

Functions

* Search
* View
* Activate
* Suspend
* Delete

---

## Career Management

Functions

* Add careers
* Update careers
* Delete careers

---

## Skill Library

Functions

* Create skills
* Edit skills
* Delete skills
* Assign skills

---

## Learning Resources

Functions

* Add resources
* Update resources
* Delete resources

---

## AI Prompt Configuration

Admin can manage

* Roadmap prompt
* Skill analysis prompt
* Interview prompt

---

# 14. Role Permission Matrix

| Module          | Guest | User | Admin |
| --------------- | ----- | ---- | ----- |
| Authentication  | ✓     | ✓    | ✓     |
| Dashboard       | ✗     | ✓    | ✓     |
| Career Goals    | ✗     | ✓    | ✓     |
| Skill Analysis  | ✗     | ✓    | ✓     |
| AI Roadmap      | ✗     | ✓    | ✓     |
| Interview       | ✗     | ✓    | ✓     |
| Resources       | Read  | Read | Full  |
| User Management | ✗     | ✗    | ✓     |
| Reports         | ✗     | Own  | All   |

---

# 15. State Transitions

## User

Registered

↓

Verified

↓

Active

↓

Suspended

↓

Reactivated

---

## Career Goal

Created

↓

Active

↓

Completed

↓

Archived

---

## Roadmap

Generated

↓

In Progress

↓

Completed

↓

Regenerated

---

# 16. Validation Rules

Authentication

* Email unique
* Password strength

Career

* Career required
* Primary goal unique

Roadmap

* Career required
* AI response valid

Resources

* URL validation
* Category required

Interview

* Difficulty required
* Career required

---

# 17. Error Handling

Common Errors

* Invalid login
* AI timeout
* Missing profile information
* Invalid career selection
* Duplicate goal
* Network failure
* Server unavailable

Every error should return

* Error code
* User-friendly message
* Suggested action

---

# 18. Audit Trail Requirements

Record

* User registration
* Login
* Profile updates
* Career goal changes
* Roadmap generation
* AI requests
* Admin actions
* Resource updates

Each log should include

* User ID
* Action
* Module
* Timestamp
* IP Address
* Device Information

---

# 19. Notifications

System notifications for

* Welcome message
* Email verification
* Roadmap generated
* Interview ready
* Progress milestone achieved
* Password changed

Future

* Push notifications
* Email reminders
* Weekly learning summary

---

# 20. Functional Summary

Aria is composed of modular functional components that work together to provide an intelligent career guidance experience. Each module follows clearly defined workflows, validation rules, CRUD operations, permission controls, and audit requirements. This specification serves as the implementation reference for the React frontend, Laravel REST API, and MySQL database while remaining extensible for future capabilities such as resume analysis, job recommendations, and AI-powered mock interviews.
