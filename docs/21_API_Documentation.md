# 21_API_Documentation.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**API Version:** v1

**Architecture:** REST API

**Backend:** Laravel 12

**Authentication:** Laravel Sanctum

**Response Format:** JSON

---

# 1. Introduction

The Aria REST API enables communication between the React frontend and the Laravel backend. All endpoints return JSON responses and follow RESTful principles.

Base URL

```text
https://your-domain.com/api/v1
```

Development URL

```text
http://localhost:8000/api/v1
```

---

# 2. Authentication

Protected endpoints require a valid Sanctum access token.

Header

```http
Authorization: Bearer {access_token}
Accept: application/json
Content-Type: application/json
```

---

# 3. Standard Response Format

## Success Response

```json
{
    "success": true,
    "message": "Operation completed successfully.",
    "data": {}
}
```

---

## Error Response

```json
{
    "success": false,
    "message": "Validation failed.",
    "errors": {}
}
```

---

# 4. Authentication APIs

## Register

**POST**

```text
/api/v1/auth/register
```

### Request

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password@123",
    "password_confirmation": "Password@123"
}
```

### Success

```json
{
    "success": true,
    "message": "Registration successful."
}
```

---

## Login

**POST**

```text
/api/v1/auth/login
```

### Request

```json
{
    "email":"john@example.com",
    "password":"Password@123"
}
```

### Response

```json
{
    "success": true,
    "token":"sanctum_token",
    "user":{}
}
```

---

## Logout

**POST**

```text
/api/v1/auth/logout
```

Authentication Required

---

# 5. Profile APIs

### Get Profile

GET

```text
/profile
```

---

### Update Profile

PUT

```text
/profile
```

Example Body

```json
{
    "phone":"017XXXXXXXX",
    "university":"Northern University of Business and Technology Khulna",
    "degree":"BSc in CSE",
    "graduation_year":2027
}
```

---

# 6. Career APIs

### Get Careers

GET

```text
/careers
```

---

### Career Details

GET

```text
/careers/{id}
```

---

### Create Career (Admin)

POST

```text
/careers
```

---

### Update Career

PUT

```text
/careers/{id}
```

---

### Delete Career

DELETE

```text
/careers/{id}
```

---

# 7. Skill APIs

### List Skills

GET

```text
/skills
```

---

### Add Skill

POST

```text
/skills
```

---

### Update Skill

PUT

```text
/skills/{id}
```

---

### Delete Skill

DELETE

```text
/skills/{id}
```

---

# 8. Career Goal APIs

Create

```text
POST /career-goals
```

Update

```text
PUT /career-goals/{id}
```

Delete

```text
DELETE /career-goals/{id}
```

List

```text
GET /career-goals
```

---

# 9. AI APIs

## Career Recommendation

POST

```text
/ai/recommend-career
```

---

## Skill Gap Analysis

POST

```text
/ai/skill-gap
```

---

## Generate Learning Roadmap

POST

```text
/roadmaps/generate
```

---

## Regenerate Roadmap

POST

```text
/roadmaps/{id}/regenerate
```

---

## Generate Interview Questions

POST

```text
/interviews/generate
```

---

# 10. Learning Resource APIs

List Resources

GET

```text
/resources
```

Supported Query Parameters

* category
* career
* difficulty
* search

---

# 11. Progress APIs

Get Progress

GET

```text
/progress
```

Update Progress

PUT

```text
/progress
```

Complete Step

POST

```text
/progress/complete-step
```

---

# 12. Dashboard API

GET

```text
/dashboard
```

Returns

* User Information
* Career Goal
* Statistics
* Progress
* AI Activity
* Notifications

---

# 13. AI History API

List

GET

```text
/history
```

Details

GET

```text
/history/{id}
```

Delete

DELETE

```text
/history/{id}
```

---

# 14. Notification APIs

List

GET

```text
/notifications
```

Mark Read

PUT

```text
/notifications/{id}/read
```

---

# 15. Admin APIs

Users

```text
GET /admin/users
```

Careers

```text
GET /admin/careers
```

Skills

```text
GET /admin/skills
```

Resources

```text
GET /admin/resources
```

Analytics

```text
GET /admin/analytics
```

Reports

```text
GET /admin/reports
```

Settings

```text
GET /admin/settings
PUT /admin/settings
```

---

# 16. Pagination Format

```json
{
    "data": [],
    "links": {},
    "meta": {
        "current_page":1,
        "last_page":5,
        "per_page":10,
        "total":48
    }
}
```

---

# 17. HTTP Status Codes

| Code | Description           |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Resource Created      |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Resource Not Found    |
| 409  | Conflict              |
| 422  | Validation Error      |
| 429  | Too Many Requests     |
| 500  | Internal Server Error |

---

# 18. Validation Rules

Examples

Authentication

* Email required
* Email unique
* Password minimum length

Career Goals

* Career required
* Duplicate active career goals not allowed

Roadmaps

* Career required
* User profile completed

Interview

* Difficulty required
* Career required

---

# 19. Rate Limiting

Recommended Limits

Authentication

* 5 login attempts/minute

General API

* 60 requests/minute

AI APIs

* Configurable per authenticated user

---

# 20. Versioning

Current

```text
/api/v1
```

Future

```text
/api/v2
/api/v3
```

Older versions should remain available during migration periods.

---

# 21. Security

* Laravel Sanctum authentication
* HTTPS in production
* CSRF protection
* Input validation
* Authorization policies
* Request throttling
* Secure environment variables

---

# 22. API Workflow

```text
React Application
        │
        ▼
Axios HTTP Client
        │
        ▼
Laravel API Routes
        │
        ▼
Controller
        │
        ▼
Service Layer
        │
        ▼
Repository
        │
        ▼
MySQL Database
        │
        ▼
JSON Response
```

---

# 23. API Best Practices

* Use meaningful HTTP status codes.
* Return consistent JSON structures.
* Validate every request.
* Handle exceptions gracefully.
* Protect all sensitive endpoints.
* Keep endpoints versioned.
* Document every new endpoint before release.

---

# 24. API Documentation Summary

This document provides the operational reference for the Aria REST API. It standardizes endpoint usage, authentication, request and response formats, validation, pagination, security, and versioning, ensuring seamless integration between the React frontend, Laravel backend, and future third-party clients.
