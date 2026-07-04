# 13_Security_Architecture_Document.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**Technology Stack**

* React + TypeScript
* Laravel 12
* MySQL 8
* Laravel Sanctum
* Google Gemini API

---

# 1. Purpose

This document defines the security architecture of Aria to ensure confidentiality, integrity, availability, and accountability of user data and system resources.

The security model follows a defense-in-depth strategy by implementing multiple layers of protection across the frontend, backend, database, APIs, AI integration, and deployment environment.

---

# 2. Security Objectives

* Protect user information.
* Prevent unauthorized access.
* Secure AI interactions.
* Protect API endpoints.
* Ensure database integrity.
* Detect malicious activities.
* Maintain audit trails.
* Reduce attack surfaces.

---

# 3. Security Layers

```text
Client Security
        │
        ▼
Authentication Layer
        │
        ▼
Authorization Layer
        │
        ▼
API Security Layer
        │
        ▼
Business Logic Layer
        │
        ▼
Database Security Layer
        │
        ▼
Infrastructure Security
```

---

# 4. Authentication

Authentication Provider

Laravel Sanctum

Supported Features

* Secure Login
* Logout
* Token Authentication
* SPA Authentication
* Session Management
* Email Verification
* Password Reset

Password Policy

* Minimum 8 characters
* Uppercase letter
* Lowercase letter
* Number
* Special character (recommended)

Passwords must never be stored in plain text.

Hashing

* bcrypt (Laravel default)

---

# 5. Authorization

Authorization Model

Role-Based Access Control (RBAC)

Roles

User

Permissions

* Manage own profile
* Generate AI recommendations
* Access dashboard
* View personal history

---

Administrator

Permissions

* Manage users
* Manage careers
* Manage resources
* View reports
* Configure AI prompts
* Access analytics

---

Future Roles

* Mentor
* Moderator
* Super Admin

---

# 6. Frontend Security

Best Practices

* Never store API keys.
* Validate forms before submission.
* Escape dynamic content.
* Protect authenticated routes.
* Store only necessary user data.
* Avoid exposing sensitive information.

Token Storage

Recommended

* Secure HTTP-only cookies (preferred)
* Avoid localStorage for long-lived authentication tokens.

---

# 7. Backend Security

Laravel Features

* CSRF Protection
* Request Validation
* Authentication Middleware
* Authorization Policies
* Password Hashing
* Secure Session Management

Middleware

* auth:sanctum
* verified
* throttle
* role
* permission

---

# 8. API Security

Protection Measures

* Authentication required for protected endpoints
* HTTPS only in production
* Rate limiting
* Input validation
* Output sanitization
* Standardized error responses

API Versioning

```text
/api/v1
```

Future

```text
/api/v2
```

---

# 9. Database Security

Database

MySQL

Protection

* Foreign Keys
* Transactions
* Prepared Statements
* Query Validation
* Soft Deletes

Sensitive Fields

* Password
* API Tokens
* Email Verification Tokens

Backups

* Daily
* Weekly
* Monthly Archive

---

# 10. AI Security

Gemini API Key

Stored only in

```env
.env
```

Never expose

* API Keys
* Internal Prompts
* System Instructions

Prompt Protection

* Sanitize user input
* Remove malicious instructions
* Validate prompt length
* Filter prohibited content

Response Validation

* JSON validation
* Content validation
* Maximum response size
* Retry on malformed output

---

# 11. Input Validation

Frontend

* React Hook Form
* Zod

Backend

* Laravel Form Requests

Validation Includes

* Required fields
* Email format
* Password rules
* File types
* URL validation
* String length
* Numeric ranges

---

# 12. Protection Against Common Attacks

### SQL Injection

Protection

* Laravel Query Builder
* Eloquent ORM
* Parameterized queries

---

### Cross-Site Scripting (XSS)

Protection

* Output escaping
* Input sanitization
* Content Security Policy

---

### Cross-Site Request Forgery (CSRF)

Protection

* Laravel CSRF middleware

---

### Brute Force Attacks

Protection

* Login throttling
* Temporary account lockout
* Rate limiting

---

### Broken Authentication

Protection

* Sanctum
* Secure sessions
* Password hashing
* Email verification

---

### Insecure Direct Object Reference (IDOR)

Protection

* Authorization Policies
* Ownership verification
* Route model binding

---

# 13. Logging & Audit

Every important action should be logged.

Examples

* Login
* Logout
* Password changes
* Profile updates
* AI requests
* Roadmap generation
* Admin actions
* Resource modifications

Log Fields

* User ID
* Action
* Module
* IP Address
* Browser
* Timestamp

---

# 14. File Security

Future Modules

* Resume Upload
* Certificates
* Profile Images

Validation

* MIME type
* Maximum size
* Virus scanning (future)
* Randomized filenames
* Storage outside public root where appropriate

---

# 15. Environment Security

Sensitive values stored in

```env
APP_KEY=
DB_PASSWORD=
GEMINI_API_KEY=
MAIL_PASSWORD=
```

Rules

* Never commit `.env` files.
* Rotate secrets periodically.
* Use different credentials for development, staging, and production.

---

# 16. Error Handling

Production

* Generic user-friendly messages
* Detailed logs stored internally

Never expose

* Stack traces
* SQL queries
* Environment variables
* API keys
* Internal server paths

---

# 17. Rate Limiting

Examples

Authentication

* 5 login attempts per minute

AI Requests

* 30 requests per hour (configurable)

API Requests

* Laravel throttle middleware

---

# 18. Data Privacy

Collected Data

* Name
* Email
* Education
* Skills
* Career Goals
* AI History
* Learning Progress

Privacy Principles

* Data minimization
* User consent
* Secure storage
* Controlled access
* Auditability

---

# 19. Disaster Recovery

Recovery Strategy

* Automated database backups
* Recovery testing
* Restore procedures
* Error monitoring
* Log retention

---

# 20. Future Security Enhancements

* Two-Factor Authentication (2FA)
* OAuth Login (Google, GitHub)
* Device Management
* Session Monitoring
* Security Dashboard
* Intrusion Detection
* Web Application Firewall (WAF)
* AI Abuse Detection
* Security Event Monitoring

---

# 21. Security Checklist

Authentication

* Secure password hashing
* Email verification
* Password reset
* Session management

Authorization

* RBAC
* Policies
* Middleware

Backend

* Validation
* Sanitization
* Logging

Database

* Foreign keys
* Backups
* Encryption where appropriate

AI

* Prompt validation
* Response validation
* API key protection

Deployment

* HTTPS
* Secure environment variables
* Regular updates

---

# 22. Security Summary

Aria adopts a layered security architecture that protects users, APIs, AI services, and data through modern Laravel security practices, secure authentication with Sanctum, strict input validation, comprehensive logging, and role-based authorization. The design is structured to meet current project requirements while remaining extensible for future enterprise-grade security enhancements.
