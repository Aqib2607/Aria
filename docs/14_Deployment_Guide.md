# 14_Deployment_Guide.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**Deployment Architecture**

* Frontend: React + TypeScript
* Backend: Laravel 12
* Database: MySQL 8
* AI Provider: Google Gemini API

---

# 1. Deployment Overview

Aria is deployed using a decoupled architecture where the frontend, backend, and database are hosted independently. This improves scalability, maintainability, and deployment flexibility.

Architecture

```text
Users
   │
   ▼
Frontend (React)
   │
   ▼
Laravel REST API
   │
   ▼
MySQL Database
   │
   ▼
Google Gemini API
```

---

# 2. Hosting Strategy

## Frontend

Platform

* Vercel

Responsibilities

* React application
* Static assets
* Client-side routing

---

## Backend

Recommended Platforms

* Render
* VPS (Ubuntu + Nginx)
* DigitalOcean
* Railway (optional)

Responsibilities

* REST API
* AI Integration
* Authentication
* Business Logic

---

## Database

Engine

* MySQL 8

Hosting

* Managed MySQL
* VPS MySQL
* Cloud SQL

---

# 3. Environment Configuration

## Frontend (.env)

```env
VITE_API_URL=https://api.aria.example.com/api/v1
VITE_APP_NAME=Aria
```

---

## Backend (.env)

```env
APP_NAME=Aria
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.aria.example.com

DB_CONNECTION=mysql
DB_HOST=
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

GEMINI_API_KEY=

SANCTUM_STATEFUL_DOMAINS=
SESSION_DOMAIN=

MAIL_MAILER=smtp
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME=Aria
```

---

# 4. Laravel Production Setup

Run the following after deployment:

```bash
composer install --no-dev --optimize-autoloader

php artisan key:generate

php artisan migrate --force

php artisan db:seed

php artisan storage:link

php artisan config:cache

php artisan route:cache

php artisan view:cache

php artisan optimize
```

---

# 5. React Production Build

```bash
npm install

npm run build
```

Generated Output

```text
dist/
```

Deploy the generated build to the frontend hosting platform.

---

# 6. Database Migration Strategy

Deployment Order

1. Backup database
2. Run migrations
3. Seed reference data
4. Verify schema
5. Restart application

Rollback

```bash
php artisan migrate:rollback
```

---

# 7. File Storage

Laravel Storage

Directories

* Profile Photos
* Future Resume Uploads
* Certificates
* Generated Reports

Recommended

* Local Storage (Development)
* Object Storage (Production, optional)

---

# 8. Email Configuration

Used For

* Email verification
* Password reset
* Notifications
* Welcome emails

SMTP or supported mail provider may be configured through environment variables.

---

# 9. AI Configuration

Gemini API Key

Stored only in:

```env
GEMINI_API_KEY=
```

Never expose API keys to the frontend.

All AI requests must pass through Laravel.

---

# 10. HTTPS

Production Requirements

* HTTPS enabled
* Valid SSL certificate
* HTTP redirected to HTTPS
* Secure cookies enabled

---

# 11. CORS Configuration

Allow

* Frontend domain
* Development localhost

Block

* Unknown origins

Configure through Laravel's CORS settings.

---

# 12. CI/CD Strategy

Suggested Workflow

```text
Developer
      │
      ▼
GitHub Repository
      │
      ▼
Build Pipeline
      │
      ▼
Automated Tests
      │
      ▼
Deploy Frontend
      │
      ▼
Deploy Backend
      │
      ▼
Run Database Migration
      │
      ▼
Production
```

---

# 13. Logging

Application Logs

* Laravel logs
* AI request logs
* Authentication logs
* Error logs

Recommended Retention

* 30–90 days

---

# 14. Monitoring

Monitor

* API response time
* Server health
* AI response latency
* Database performance
* Error rate
* Storage usage

Future tools

* Laravel Pulse
* Laravel Telescope
* Uptime monitoring service

---

# 15. Backup Strategy

Database

* Daily incremental backup
* Weekly full backup
* Monthly archive

Application

* Version controlled with Git

Storage

* Scheduled file backup

---

# 16. Recovery Plan

In case of failure:

1. Restore latest backup.
2. Verify database integrity.
3. Redeploy application if necessary.
4. Confirm AI integration.
5. Validate user authentication.

---

# 17. Performance Optimization

Frontend

* Asset compression
* Lazy loading
* Code splitting

Backend

* Config cache
* Route cache
* Optimized Composer autoloader

Database

* Proper indexing
* Query optimization

---

# 18. Maintenance

Routine Tasks

* Update dependencies
* Review logs
* Rotate secrets
* Verify backups
* Monitor API usage
* Review security patches

---

# 19. Deployment Checklist

Frontend

* Production build generated
* Environment variables configured
* API URL verified

Backend

* Dependencies installed
* Migrations executed
* Cache optimized
* Storage linked
* Queue configured (future)

Database

* Backup completed
* Migrations verified
* Seed data available

Security

* HTTPS enabled
* Debug mode disabled
* Environment secrets protected

AI

* Gemini API key configured
* AI endpoint tested
* Response validation confirmed

---

# 20. Future Deployment Enhancements

* Docker containerization
* Kubernetes orchestration
* Redis cache
* Queue workers
* CDN integration
* Multi-region deployment
* Blue-green deployment
* Zero-downtime releases

---

# 21. Deployment Summary

Aria is designed for a modular deployment model that separates the React frontend, Laravel backend, and MySQL database. This approach simplifies scaling, improves maintainability, and enables independent deployment of each layer. With proper environment management, automated deployments, secure configuration, and routine operational practices, the platform is prepared for both academic deployment and future production growth.
