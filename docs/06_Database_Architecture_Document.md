# 06_Database_Architecture_Document.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**Database:** MySQL

**ORM:** Laravel Eloquent

---

# 1. Overview

The Aria database follows a normalized relational design to ensure data integrity, scalability, and maintainability. The schema supports AI-generated career recommendations, personalized learning roadmaps, interview preparation, progress tracking, and administrative operations.

The architecture follows **Third Normal Form (3NF)** while allowing efficient querying through indexed relationships.

---

# 2. Database Design Principles

* Relational database design
* Third Normal Form (3NF)
* Foreign key constraints
* Soft delete support
* Audit logging
* Timestamp tracking
* UUID-ready architecture (future)
* Optimized indexing

---

# 3. Core Entities

## Authentication

* users
* password_reset_tokens
* personal_access_tokens

---

## User Profile

* user_profiles

---

## Career Management

* careers
* career_categories

---

## Skill Management

* skills
* career_skills
* user_skills

---

## AI Modules

* career_recommendations
* skill_gap_analyses
* learning_roadmaps
* roadmap_steps
* interview_sessions
* interview_questions
* ai_histories

---

## Learning Resources

* resources
* resource_categories
* career_resources

---

## Progress

* progress_logs
* completed_steps

---

## Administration

* roles
* permissions
* role_permissions
* user_roles

---

## System

* activity_logs
* system_settings
* notifications

---

# 4. Entity Relationships

```text
Users
│
├── User Profile (1:1)
├── User Skills (1:N)
├── Career Goals (1:N)
├── Learning Roadmaps (1:N)
├── Interview Sessions (1:N)
├── AI History (1:N)
├── Progress Logs (1:N)
└── Notifications (1:N)

Careers
│
├── Career Skills (1:N)
├── Resources (1:N)
├── Roadmaps (1:N)
└── Skill Gap Analyses (1:N)

Roadmaps
│
└── Roadmap Steps (1:N)

Interview Sessions
│
└── Interview Questions (1:N)
```

---

# 5. Table Specifications

## users

Purpose

Stores authentication information.

Columns

* id
* name
* email
* password
* email_verified_at
* status
* created_at
* updated_at

---

## user_profiles

Purpose

Stores personal and educational information.

Columns

* id
* user_id
* phone
* date_of_birth
* gender
* university
* degree
* graduation_year
* bio
* profile_photo
* created_at
* updated_at

Relationship

One user has one profile.

---

## careers

Purpose

Stores supported career paths.

Columns

* id
* category_id
* title
* description
* average_duration
* difficulty
* salary_range
* demand_level
* created_at
* updated_at

---

## career_categories

Examples

* Software Development
* Data Science
* Cyber Security
* UI/UX
* Cloud Computing
* DevOps
* AI & Machine Learning

---

## skills

Purpose

Stores all available skills.

Columns

* id
* name
* description
* level
* status

---

## career_skills

Purpose

Maps skills required for each career.

Columns

* id
* career_id
* skill_id
* priority
* required_level

---

## user_skills

Purpose

Stores user skill levels.

Columns

* id
* user_id
* skill_id
* proficiency_level
* experience_months

---

## career_recommendations

Purpose

Stores AI-generated career suggestions.

Columns

* id
* user_id
* recommended_career
* confidence_score
* ai_response
* created_at

---

## skill_gap_analyses

Purpose

Stores AI skill analysis.

Columns

* id
* user_id
* career_id
* current_skills
* missing_skills
* recommendations
* created_at

---

## learning_roadmaps

Purpose

Stores AI-generated learning plans.

Columns

* id
* user_id
* career_id
* title
* version
* estimated_duration
* ai_response
* status
* created_at

---

## roadmap_steps

Purpose

Stores roadmap milestones.

Columns

* id
* roadmap_id
* title
* description
* sequence
* estimated_hours
* completion_status

---

## resources

Purpose

Stores learning materials.

Columns

* id
* category_id
* title
* url
* provider
* resource_type
* difficulty
* created_at

---

## resource_categories

Examples

* Video
* Documentation
* Course
* Book
* Practice
* Certification

---

## career_resources

Purpose

Maps careers to learning resources.

---

## interview_sessions

Purpose

Stores AI interview sessions.

Columns

* id
* user_id
* career_id
* difficulty
* total_questions
* score
* created_at

---

## interview_questions

Purpose

Stores generated interview questions.

Columns

* id
* session_id
* question
* answer
* explanation
* type

---

## progress_logs

Purpose

Tracks learning progress.

Columns

* id
* user_id
* roadmap_id
* completed_percentage
* completed_skills
* created_at

---

## completed_steps

Purpose

Tracks completed roadmap milestones.

Columns

* id
* roadmap_step_id
* user_id
* completed_at

---

## ai_histories

Purpose

Stores all AI interactions.

Columns

* id
* user_id
* feature
* prompt
* response
* tokens_used
* execution_time
* created_at

---

## notifications

Purpose

Stores user notifications.

Columns

* id
* user_id
* title
* message
* status
* created_at

---

## activity_logs

Purpose

Stores audit trails.

Columns

* id
* user_id
* action
* module
* ip_address
* device
* created_at

---

## roles

Examples

* Admin
* User

---

## permissions

Examples

* Create Career
* Edit Career
* Delete Career
* Manage Users
* View Reports

---

## role_permissions

Many-to-many mapping between roles and permissions.

---

## user_roles

Assigns roles to users.

---

## system_settings

Stores configurable platform settings.

Examples

* Gemini API configuration
* Prompt templates
* Feature toggles
* Maintenance mode

---

# 6. Foreign Key Relationships

* user_profiles.user_id → users.id
* user_skills.user_id → users.id
* career_skills.career_id → careers.id
* career_skills.skill_id → skills.id
* learning_roadmaps.user_id → users.id
* learning_roadmaps.career_id → careers.id
* roadmap_steps.roadmap_id → learning_roadmaps.id
* interview_sessions.user_id → users.id
* interview_questions.session_id → interview_sessions.id
* progress_logs.roadmap_id → learning_roadmaps.id

---

# 7. Soft Delete Strategy

Soft deletes enabled for:

* users
* careers
* skills
* resources
* learning_roadmaps

This preserves historical data while preventing accidental loss.

---

# 8. Indexing Strategy

Indexes should be created on:

* email
* user_id
* career_id
* roadmap_id
* created_at
* status
* feature
* category_id

Composite indexes:

* (user_id, career_id)
* (career_id, skill_id)
* (roadmap_id, sequence)

---

# 9. Data Validation Rules

* Email must be unique.
* Foreign keys enforced.
* Required fields cannot be null.
* Status values constrained through enums or validation.
* Roadmap versions increment automatically.

---

# 10. Audit & Logging

Every important operation should create an activity log, including:

* User login
* Profile update
* Career goal changes
* AI request generation
* Roadmap generation
* Admin modifications
* Resource management

---

# 11. Backup & Recovery

Recommended strategy:

* Daily automated database backup.
* Weekly full backup.
* Monthly archival backup.
* Transaction-safe migrations.

---

# 12. Scalability Considerations

The schema supports future expansion without structural redesign by accommodating:

* Resume Analyzer
* AI Resume Builder
* Job Recommendation Engine
* Company Profiles
* Mentor Marketplace
* Certificates
* Mobile Applications
* Multiple AI Providers

---

# 13. Database Summary

The Aria database architecture consists of approximately **22 core tables** organized into authentication, user management, career intelligence, AI services, learning management, administration, and auditing modules.

The design leverages Laravel Eloquent relationships, MySQL foreign keys, normalized entities, optimized indexing, and soft-delete support to provide a secure, maintainable, and scalable foundation for AI-powered career guidance.
