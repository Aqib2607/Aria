# 24_System_Design_Document_(SDD).md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**Document Type:** System Design Document (SDD)

**Technology Stack**

* Frontend: React + TypeScript
* Backend: Laravel 12
* Database: MySQL 8
* AI Provider: Google Gemini API

---

# Revision History

| Version | Date            | Description                           |
| ------- | --------------- | ------------------------------------- |
| 1.0     | Initial Release | First complete System Design Document |

---

# Table of Contents

1. System Overview
2. Design Goals
3. High-Level Architecture
4. Module Design
5. Database Design
6. API Design
7. AI System Design
8. Security Design
9. Deployment Design
10. Error Handling
11. Performance Design
12. Future Scalability

---

# 1. System Overview

Aria is an AI-powered career guidance platform designed using a modular, service-oriented architecture. The application separates the user interface, business logic, persistence layer, and AI integration into independent layers to improve maintainability and scalability.

Core capabilities include:

* Career Recommendation
* Skill Gap Analysis
* Learning Roadmap Generation
* Interview Preparation
* Learning Resource Recommendation
* Progress Tracking
* Administrative Management

---

# 2. Design Goals

The system is designed to achieve:

* High maintainability
* Modular development
* Scalability
* Secure authentication
* Clean API architecture
* Responsive user experience
* AI extensibility
* High availability

---

# 3. High-Level Architecture

```text
                    Users
                      │
                      ▼
        React + TypeScript Frontend
                      │
               Axios REST Requests
                      │
                      ▼
              Laravel REST API
                      │
     ┌──────────┬──────────┬──────────┐
     ▼          ▼          ▼
 Authentication Services   AI Services
                │
                ▼
         Business Services
                │
                ▼
         Repository Layer
                │
                ▼
            MySQL Database
                │
                ▼
        Google Gemini API
```

---

# 4. Architectural Pattern

Aria follows a **Layered Architecture** with a **Service-Repository Pattern**.

Presentation Layer

* React UI
* Routing
* State Management

↓

Application Layer

* Laravel Controllers
* Request Validation
* Policies

↓

Business Layer

* Services
* AI Processing
* Business Rules

↓

Repository Layer

* Database Access
* Query Optimization

↓

Persistence Layer

* MySQL Database

---

# 5. Module Design

## Authentication Module

Responsibilities

* Registration
* Login
* Email Verification
* Password Reset
* Session Management

Components

* AuthController
* AuthService
* User Model
* Sanctum

---

## User Profile Module

Responsibilities

* Personal Information
* Education
* Skills
* Preferences

Components

* ProfileController
* ProfileService
* UserProfile Model

---

## Career Module

Responsibilities

* Career Selection
* Career Categories
* Goal Management

Components

* CareerController
* CareerService
* Career Model

---

## Skill Module

Responsibilities

* Skill Library
* User Skills
* Career Skills

Components

* SkillController
* SkillService

---

## AI Module

Responsibilities

* Prompt Generation
* Gemini Integration
* Response Validation
* History Logging

Components

* GeminiService
* PromptService
* ResponseFormatter
* AIHistoryService

---

## Roadmap Module

Responsibilities

* Roadmap Generation
* Version Management
* Progress Synchronization

Components

* RoadmapController
* RoadmapService
* RoadmapRepository

---

## Interview Module

Responsibilities

* Interview Generation
* Question Storage
* Difficulty Management

Components

* InterviewController
* InterviewService

---

## Dashboard Module

Responsibilities

* Aggregate Statistics
* User Overview
* Progress Summary

Components

* DashboardService
* DashboardController

---

## Admin Module

Responsibilities

* User Management
* Career Management
* Reports
* Analytics
* Settings

Components

* AdminController
* AdminService

---

# 6. Database Design

Database Engine

MySQL

Primary Tables

* users
* user_profiles
* careers
* skills
* career_skills
* user_skills
* learning_roadmaps
* roadmap_steps
* interview_sessions
* interview_questions
* resources
* progress_logs
* ai_histories
* notifications
* activity_logs

Relationship Types

* One-to-One
* One-to-Many
* Many-to-Many

All relationships use foreign key constraints.

---

# 7. API Design

Architecture

RESTful APIs

Base URL

```text
/api/v1
```

Request Format

JSON

Response Format

JSON

Authentication

Laravel Sanctum

Each endpoint follows standard HTTP methods:

* GET
* POST
* PUT
* DELETE

---

# 8. AI System Design

Workflow

```text
User Request
      │
      ▼
Laravel Controller
      │
      ▼
Prompt Builder
      │
      ▼
Gemini API
      │
      ▼
Response Validation
      │
      ▼
Formatter
      │
      ▼
Database Storage
      │
      ▼
Frontend Display
```

Every AI request is logged for history, analytics, and regeneration.

---

# 9. Security Design

Authentication

* Laravel Sanctum

Authorization

* RBAC
* Policies
* Middleware

Security Controls

* CSRF Protection
* Input Validation
* Password Hashing
* HTTPS
* Rate Limiting
* Environment Variables

---

# 10. Error Handling Design

Application errors are processed through Laravel's centralized exception handling.

Error Categories

* Validation Errors
* Authentication Errors
* Authorization Errors
* Database Errors
* AI Service Errors
* Network Errors

Each error returns:

* HTTP Status Code
* Friendly Message
* Optional Validation Details

---

# 11. Logging Design

Logs include:

* User Authentication
* AI Requests
* Profile Updates
* Career Changes
* Resource Updates
* System Errors
* Administrative Actions

Log Destination

* Laravel Log Files
* Activity Logs Table

---

# 12. Performance Design

Frontend

* Lazy Loading
* Route Splitting
* Component Reuse

Backend

* Eager Loading
* Service Layer
* Optimized Queries

Database

* Foreign Keys
* Composite Indexes
* Pagination

---

# 13. Deployment Design

Frontend

React Application

↓

Vercel

Backend

Laravel

↓

Render / VPS

Database

↓

MySQL

External Service

↓

Google Gemini API

---

# 14. Scalability Design

The architecture supports:

* 100,000+ users
* Queue workers
* Multiple AI providers
* Mobile applications
* Notification services
* Distributed deployments
* Caching layer (Redis)
* Horizontal scaling

---

# 15. Design Principles

The implementation follows:

* SOLID Principles
* DRY (Don't Repeat Yourself)
* Separation of Concerns
* RESTful Design
* Modular Architecture
* Secure-by-Default Development
* Clean Code Practices

---

# 16. Future Enhancements

The design allows seamless integration of:

* Resume Analyzer
* AI Resume Builder
* Job Recommendation Engine
* Internship Portal
* Company Profiles
* Mentor Marketplace
* Community Forum
* Voice AI Assistant
* Multi-language Support

---

# 17. Design Validation Checklist

| Area                   | Status |
| ---------------------- | ------ |
| Modular Architecture   | ✓      |
| REST API Design        | ✓      |
| Secure Authentication  | ✓      |
| AI Integration         | ✓      |
| Database Normalization | ✓      |
| Responsive Frontend    | ✓      |
| Scalable Deployment    | ✓      |
| Future Extensibility   | ✓      |

---

# 18. System Design Summary

The System Design Document defines the complete technical blueprint for Aria, translating business and functional requirements into a practical implementation architecture. The design combines a React frontend, Laravel backend, MySQL database, and Google Gemini AI within a layered, service-oriented architecture that emphasizes maintainability, security, scalability, and future extensibility. It serves as the primary technical reference for developers during implementation and maintenance.
