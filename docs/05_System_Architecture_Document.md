# 05_System_Architecture_Document.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**Architecture Style:** Layered Modular Architecture (Three-Tier)

**Technology Stack**

* Frontend: React + TypeScript
* Backend: Laravel
* Database: MySQL
* AI: Google Gemini API
* Authentication: Laravel Sanctum

---

# 1. Architecture Overview

Aria follows a modular three-tier architecture that separates presentation, business logic, and data storage. This design improves maintainability, scalability, security, and future extensibility.

```
Presentation Layer
        │
        ▼
Laravel REST API
        │
        ▼
Business Service Layer
        │
        ├───────────────► AI Service
        │                     │
        │                     ▼
        │             Google Gemini API
        │
        ▼
Repository Layer
        │
        ▼
MySQL Database
```

---

# 2. High-Level Components

## Frontend Layer

Responsibilities

* User Interface
* Authentication
* Forms
* Dashboard
* Charts
* Progress Visualization
* API Communication

Technology

* React
* TypeScript
* Tailwind CSS
* Axios
* React Router

---

## Backend Layer

Responsibilities

* Business Logic
* Authentication
* Validation
* Authorization
* AI Integration
* API Services

Technology

* Laravel
* Sanctum
* Eloquent ORM
* Service Classes

---

## Database Layer

Responsibilities

* User Data
* Career Data
* Skills
* AI History
* Roadmaps
* Progress
* Learning Resources

Technology

* MySQL

---

## External Services

* Google Gemini API
* Email Service (SMTP)

---

# 3. Layered Architecture

## Presentation Layer

Components

* Landing Page
* Login
* Register
* Dashboard
* Profile
* Career Goal
* Skill Analysis
* Roadmap
* Interview
* Resources
* Admin Panel

Responsibilities

* Display data
* Input validation
* State management
* API requests
* User interactions

---

## API Layer

REST Endpoints

```
/api/auth
/api/profile
/api/careers
/api/skills
/api/roadmaps
/api/resources
/api/interviews
/api/history
/api/admin
```

Responsibilities

* Request validation
* Authentication
* Authorization
* Response formatting

---

## Business Layer

Services

Authentication Service

Career Service

Skill Analysis Service

Roadmap Service

Interview Service

Resource Service

Dashboard Service

AI Service

Admin Service

Responsibilities

* Business rules
* AI orchestration
* Data processing

---

## Repository Layer

Responsibilities

* Database operations
* Query optimization
* Data retrieval
* Transactions

---

## Data Layer

Stores

* Users
* Careers
* Skills
* Roadmaps
* AI History
* Resources
* Reports

---

# 4. Authentication Flow

```
User

↓

Login Request

↓

Laravel Validation

↓

Authentication

↓

Sanctum Token

↓

Authorized API Access
```

---

# 5. Career Recommendation Flow

```
User Profile

↓

Career Selection

↓

Current Skills

↓

AI Prompt Builder

↓

Gemini API

↓

AI Response

↓

Career Recommendation

↓

Database Storage

↓

Dashboard
```

---

# 6. Skill Gap Analysis Flow

```
User Skills

↓

Career Requirements

↓

Comparison Engine

↓

Missing Skills

↓

AI Suggestions

↓

Store Analysis

↓

Display Results
```

---

# 7. Roadmap Generation Flow

```
Career Goal

↓

Skill Gap

↓

Prompt Generator

↓

Gemini API

↓

Roadmap Parser

↓

Roadmap Builder

↓

Database

↓

Dashboard
```

---

# 8. Interview Generation Flow

```
Career

↓

Difficulty

↓

Prompt Builder

↓

Gemini

↓

Questions

↓

Store Session

↓

Display
```

---

# 9. Dashboard Flow

```
Login

↓

Authentication

↓

Collect Statistics

↓

Aggregate Data

↓

Return Dashboard JSON

↓

React Dashboard
```

---

# 10. AI Integration Architecture

```
Frontend

↓

Laravel API

↓

AI Service

↓

Prompt Generator

↓

Gemini API

↓

Response Validator

↓

Formatter

↓

Database

↓

Frontend
```

Responsibilities

* Prompt construction
* Error handling
* Response validation
* Retry strategy
* History logging

---

# 11. Error Handling Architecture

Application Errors

↓

Exception Handler

↓

JSON Response

↓

Frontend Notification

Types

* Validation
* Authentication
* Authorization
* Database
* AI Service
* Network
* Server

---

# 12. Security Architecture

Authentication

* Laravel Sanctum

Authorization

* Role-Based Access Control

Protection

* CSRF
* XSS
* SQL Injection
* Input Validation
* Rate Limiting
* Secure Password Hashing

---

# 13. Logging Architecture

Logs

* Login
* Registration
* AI Requests
* Roadmap Generation
* Skill Analysis
* Interview Generation
* Admin Activity
* Errors

---

# 14. Deployment Architecture

```
React Frontend

↓

Vercel

↓

Laravel REST API

↓

Render / VPS

↓

MySQL Database

↓

Google Gemini API
```

---

# 15. Scalability Strategy

Application

* Modular Services
* Stateless APIs
* REST Architecture

Database

* Index Optimization
* Query Optimization
* Pagination
* Foreign Keys

Frontend

* Lazy Loading
* Code Splitting
* Component Reusability

Backend

* Service Layer
* Repository Pattern
* Queue-ready Design

---

# 16. Performance Optimization

Frontend

* Lazy loading
* Memoization
* Optimized API calls

Backend

* Eloquent eager loading
* Query optimization
* Caching-ready services

Database

* Proper indexing
* Optimized relationships
* Transaction management

---

# 17. Architecture Principles

Aria follows these principles:

* Separation of Concerns
* Single Responsibility Principle
* RESTful API Design
* Modular Development
* Reusable Components
* Secure by Default
* Scalable Architecture
* Maintainable Codebase

---

# 18. Future Expansion

The architecture is intentionally extensible to support:

* Resume Analyzer
* AI Resume Builder
* Job Recommendation Engine
* Internship Portal
* AI Mock Interview
* Mobile Application
* Notification Service
* Multi-language Support
* Multiple AI Providers
* Analytics Engine

No major restructuring is required to integrate these modules.

---

# 19. Architecture Summary

Aria adopts a clean, modular, three-tier architecture that separates the user interface, business logic, and persistence layer. React provides a responsive client application, Laravel exposes secure RESTful APIs and encapsulates business services, MySQL manages relational data, and Google Gemini delivers AI-powered recommendations.

This architecture prioritizes scalability, maintainability, security, and future extensibility, making it suitable for both academic implementation and production-grade evolution.
