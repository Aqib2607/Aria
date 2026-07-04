# 12_Tech_Stack_Document.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

---

# 1. Overview

This document defines the official technology stack for Aria. The selected technologies prioritize maintainability, scalability, performance, security, and developer productivity while supporting future expansion.

---

# 2. Technology Overview

| Layer            | Technology         |
| ---------------- | ------------------ |
| Frontend         | React + TypeScript |
| Backend          | Laravel 12         |
| Database         | MySQL 8            |
| Authentication   | Laravel Sanctum    |
| AI Provider      | Google Gemini API  |
| API Style        | REST API           |
| Styling          | Tailwind CSS       |
| State Management | Zustand            |
| Routing          | React Router       |
| HTTP Client      | Axios              |
| Icons            | Lucide React       |
| Charts           | Recharts           |
| Forms            | React Hook Form    |
| Validation       | Zod                |
| Notifications    | Sonner             |
| File Storage     | Laravel Storage    |
| Package Manager  | npm                |
| Version Control  | Git + GitHub       |

---

# 3. Frontend Stack

## Framework

React 19

Reason

* Component-based architecture
* Excellent ecosystem
* Large community
* Strong TypeScript support

---

## Language

TypeScript

Reason

* Static typing
* Better maintainability
* Improved IDE support
* Reduced runtime errors

---

## Styling

Tailwind CSS

Reason

* Utility-first
* Fast UI development
* Responsive utilities
* Easy customization

---

## Routing

React Router

Responsibilities

* Protected routes
* Nested routing
* Lazy loading

---

## State Management

Zustand

Reason

* Lightweight
* Simple API
* High performance
* Minimal boilerplate

---

## HTTP Client

Axios

Responsibilities

* API requests
* Authentication headers
* Error interception
* Token refresh handling

---

## Forms

React Hook Form

Combined with

Zod

Purpose

* Efficient form management
* Schema validation
* Better performance

---

## Charts

Recharts

Usage

* Learning progress
* Dashboard analytics
* AI usage
* Career statistics

---

## Notifications

Sonner

Purpose

* Success messages
* Error alerts
* Warning notifications
* Informational toasts

---

# 4. Backend Stack

## Framework

Laravel 12

Reason

* Mature ecosystem
* MVC architecture
* Excellent ORM
* Built-in security
* Queue support
* Robust validation

---

## Language

PHP 8.3+

---

## Authentication

Laravel Sanctum

Features

* Token authentication
* SPA authentication
* API protection

---

## ORM

Laravel Eloquent

Benefits

* Relationship management
* Query builder
* Soft deletes
* Model events

---

## Validation

Laravel Form Requests

Responsibilities

* Input validation
* Authorization
* Custom validation rules

---

## Queues (Future)

Laravel Queue

Potential Drivers

* Database
* Redis

Use Cases

* AI processing
* Email sending
* Notification delivery

---

# 5. Database

Database Engine

MySQL 8

Features

* ACID compliance
* Foreign keys
* Indexing
* Transactions
* Views
* Stored procedures (optional)

---

# 6. AI Stack

Provider

Google Gemini API

Backend Integration

Laravel Service Layer

Capabilities

* Career recommendations
* Skill-gap analysis
* Roadmap generation
* Interview preparation
* Learning resource suggestions

---

# 7. Development Tools

IDE

* Visual Studio Code

API Testing

* Postman

Database Client

* MySQL Workbench

Version Control

* Git
* GitHub

Documentation

* Markdown

---

# 8. Folder Structure

## Frontend

```text
src/
├── assets/
├── components/
├── pages/
├── layouts/
├── hooks/
├── services/
├── store/
├── routes/
├── utils/
├── types/
├── constants/
└── styles/
```

---

## Backend

```text
app/
├── Http/
├── Models/
├── Services/
├── Repositories/
├── Policies/
├── Notifications/
├── Jobs/
├── Providers/
└── Helpers/

routes/
database/
storage/
config/
```

---

# 9. API Communication

Communication Pattern

```text
React
   │
Axios
   │
Laravel REST API
   │
Business Services
   │
MySQL
```

---

# 10. Security Technologies

Authentication

* Laravel Sanctum

Password Hashing

* Bcrypt

Validation

* Laravel Form Requests
* Zod

Protection

* CSRF
* XSS
* SQL Injection
* Rate Limiting
* HTTPS
* Environment Variables

---

# 11. Performance Optimization

Frontend

* Lazy loading
* Code splitting
* Route-based loading
* Memoization

Backend

* Eager loading
* Optimized queries
* Pagination
* Service layer caching (future)

Database

* Proper indexes
* Foreign keys
* Optimized relationships

---

# 12. Deployment

Frontend

* Vercel

Backend

* Render
* VPS (Future)

Database

* MySQL

Environment

* Production
* Staging
* Development

---

# 13. Environment Variables

Frontend

```env
VITE_API_URL=
```

Backend

```env
APP_NAME=Aria
APP_ENV=production

DB_CONNECTION=mysql
DB_HOST=
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

GEMINI_API_KEY=

SANCTUM_STATEFUL_DOMAINS=
SESSION_DOMAIN=
```

---

# 14. Coding Standards

Frontend

* ESLint
* Prettier
* Functional Components
* Custom Hooks

Backend

* PSR-12
* Service Layer
* Repository Pattern
* Dependency Injection

---

# 15. Testing Tools

Frontend

* Vitest
* React Testing Library

Backend

* PHPUnit

API

* Postman

---

# 16. Logging & Monitoring

Laravel Logs

* Application logs
* Error logs
* AI request logs

Future

* Laravel Telescope
* Laravel Pulse

---

# 17. Scalability Strategy

Designed to support:

* 100,000+ users
* Multiple AI providers
* Mobile applications
* Queue workers
* CDN integration
* Horizontal scaling

---

# 18. Future Technology Roadmap

Potential additions

* Redis
* Laravel Horizon
* Docker
* Kubernetes
* WebSockets
* Elasticsearch
* Firebase Cloud Messaging
* OpenAI
* Claude
* Groq

---

# 19. Technology Decision Rationale

The selected stack balances rapid development with enterprise readiness. React and TypeScript provide a modern, maintainable frontend, while Laravel offers a mature backend ecosystem with strong security and developer productivity. MySQL ensures reliable relational data management, and Google Gemini enables AI-driven career intelligence. The overall architecture is modular, scalable, and well suited for both academic delivery and future production deployment.

---

# 20. Tech Stack Summary

Aria is built on a modern full-stack architecture centered around **React + TypeScript**, **Laravel 12**, **MySQL**, and **Google Gemini API**. Supporting technologies such as Tailwind CSS, Zustand, React Hook Form, Zod, Axios, and Laravel Sanctum provide a secure, responsive, and maintainable development foundation capable of evolving into an enterprise-grade AI career guidance platform.
