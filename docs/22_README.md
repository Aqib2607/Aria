# 22_README.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

> **Your AI Career Mentor**

---

# Overview

Aria is an AI-powered career guidance platform that helps students, graduates, and self-learners make informed career decisions through personalized recommendations, skill-gap analysis, AI-generated learning roadmaps, interview preparation, and progress tracking.

The platform leverages **React**, **Laravel**, **MySQL**, and **Google Gemini AI** to deliver an intelligent, scalable, and user-friendly career development experience.

---

# Key Features

### Authentication

* User Registration
* Login
* Email Verification
* Password Reset
* Secure Authentication using Laravel Sanctum

### User Management

* User Profile
* Skills Management
* Career Goals
* Learning Preferences

### AI Features

* AI Career Recommendation
* Skill Gap Analysis
* Personalized Learning Roadmap
* Interview Question Generator
* Learning Resource Recommendation

### Dashboard

* Learning Progress
* AI Activity
* Roadmap Overview
* Statistics
* Notifications

### Administration

* User Management
* Career Management
* Skill Management
* Learning Resources
* Reports
* Analytics
* AI Prompt Management

---

# Technology Stack

## Frontend

* React 19
* TypeScript
* Tailwind CSS
* React Router
* Zustand
* Axios
* React Hook Form
* Zod
* Recharts
* Lucide React

---

## Backend

* Laravel 12
* PHP 8.3+
* Laravel Sanctum
* Eloquent ORM

---

## Database

* MySQL 8

---

## Artificial Intelligence

* Google Gemini API

---

# Project Structure

```text
aria/

├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── database/
│   ├── config/
│   ├── storage/
│   └── artisan
│
├── docs/
│
├── README.md
│
└── .gitignore
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/aria.git

cd aria
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Backend

```bash
cd backend

composer install

cp .env.example .env

php artisan key:generate

php artisan migrate

php artisan db:seed

php artisan serve
```

---

# Environment Variables

## Frontend

```env
VITE_API_URL=
```

---

## Backend

```env
APP_NAME=Aria

APP_ENV=local

APP_KEY=

DB_CONNECTION=mysql

DB_HOST=

DB_PORT=3306

DB_DATABASE=

DB_USERNAME=

DB_PASSWORD=

GEMINI_API_KEY=
```

---

# Running the Project

Start Backend

```bash
php artisan serve
```

Start Frontend

```bash
npm run dev
```

Visit

```text
http://localhost:5173
```

---

# Database

Run migrations

```bash
php artisan migrate
```

Run seeders

```bash
php artisan db:seed
```

Rollback

```bash
php artisan migrate:rollback
```

---

# API

Base URL

```text
/api/v1
```

Authentication

Laravel Sanctum

Response Format

JSON

---

# Folder Structure

## Frontend

```text
src/

components/

pages/

layouts/

services/

store/

hooks/

routes/

types/

utils/

assets/
```

---

## Backend

```text
app/

Http/

Models/

Services/

Repositories/

Policies/

Jobs/

Notifications/
```

---

# Development Workflow

1. Pull latest changes.
2. Create a feature branch.
3. Implement the feature.
4. Test locally.
5. Submit a Pull Request.
6. Review and merge.

---

# Coding Standards

Frontend

* TypeScript
* ESLint
* Prettier
* Functional Components

Backend

* PSR-12
* Laravel Best Practices
* Repository Pattern
* Service Layer

---

# Testing

Frontend

```bash
npm test
```

Backend

```bash
php artisan test
```

---

# Deployment

Frontend

* Vercel

Backend

* Render / VPS

Database

* MySQL

---

# Security

* Laravel Sanctum
* HTTPS
* CSRF Protection
* Input Validation
* Role-Based Access Control
* Environment Variables

---

# Documentation

The project includes the following documentation:

* Project Vision & Research
* Requirements Architecture
* Functional Specification
* Product Requirements Document (PRD)
* System Architecture
* Database Architecture
* API Specification
* AI Integration
* Design Document
* UI Component Specification
* User Flow
* Tech Stack
* Security Architecture
* Deployment Guide
* Development Roadmap
* Module Development Guide
* Testing Strategy
* User Acceptance Testing
* User Manual
* Admin Manual
* API Documentation

---

# Future Enhancements

* Resume Analyzer
* AI Resume Builder
* Job Recommendation Engine
* Internship Portal
* Mentor Marketplace
* Mobile Application
* Voice AI Assistant
* Community Forum
* Multi-language Support

---

# License

This project is developed for academic purposes and may be extended for commercial or production use with the appropriate licensing and deployment considerations.

---

# Contributors

Project Name

**Aria — AI-Powered Career Guidance & Learning Roadmap Assistant**

Frontend

React + TypeScript

Backend

Laravel

Database

MySQL

Artificial Intelligence

Google Gemini API

---

# Acknowledgements

Special thanks to the open-source community, Laravel, React, Tailwind CSS, MySQL, and Google Gemini for providing the technologies that power the Aria platform.

---

# README Summary

This README serves as the primary entry point for developers and contributors. It provides an overview of Aria, installation instructions, project structure, development workflow, technology stack, deployment guidance, and links to the complete project documentation, ensuring a smooth onboarding experience for future development and collaboration.
