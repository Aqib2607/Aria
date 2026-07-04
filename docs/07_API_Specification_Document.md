# 07_API_Specification_Document.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**Architecture:** REST API

**Backend:** Laravel

**Authentication:** Laravel Sanctum

**Response Format:** JSON

**Base URL**

```text
/api/v1
```

---

# 1. API Design Principles

* RESTful architecture
* Resource-based endpoints
* JSON request and response bodies
* Token-based authentication using Laravel Sanctum
* Standardized HTTP status codes
* Consistent error handling
* Versioned APIs

---

# 2. Authentication APIs

## Register

```http
POST /auth/register
```

Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

Response

```json
{
  "success": true,
  "message": "Registration successful."
}
```

---

## Login

```http
POST /auth/login
```

Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response

```json
{
  "token": "sanctum_access_token",
  "user": {}
}
```

---

## Logout

```http
POST /auth/logout
```

Authentication Required

---

## Current User

```http
GET /auth/me
```

Authentication Required

---

# 3. User Profile APIs

## Get Profile

```http
GET /profile
```

---

## Update Profile

```http
PUT /profile
```

Example Fields

```json
{
  "phone": "",
  "university": "",
  "degree": "",
  "graduation_year": 2027,
  "bio": ""
}
```

---

# 4. Career APIs

## Get Careers

```http
GET /careers
```

---

## Career Details

```http
GET /careers/{id}
```

---

## Create Career (Admin)

```http
POST /careers
```

---

## Update Career (Admin)

```http
PUT /careers/{id}
```

---

## Delete Career (Admin)

```http
DELETE /careers/{id}
```

---

# 5. User Skill APIs

## Get User Skills

```http
GET /skills
```

---

## Add Skill

```http
POST /skills
```

---

## Update Skill

```http
PUT /skills/{id}
```

---

## Delete Skill

```http
DELETE /skills/{id}
```

---

# 6. Career Goal APIs

## Create Goal

```http
POST /career-goals
```

---

## Get Goals

```http
GET /career-goals
```

---

## Update Goal

```http
PUT /career-goals/{id}
```

---

## Delete Goal

```http
DELETE /career-goals/{id}
```

---

# 7. AI Career Recommendation APIs

## Generate Recommendation

```http
POST /ai/recommend-career
```

Request

```json
{
  "career_id": 5
}
```

Response

```json
{
  "career": {},
  "confidence_score": 92,
  "recommendation": ""
}
```

---

# 8. Skill Gap Analysis APIs

## Analyze Skill Gap

```http
POST /ai/skill-gap
```

Response

```json
{
  "current_skills": [],
  "missing_skills": [],
  "recommendations": []
}
```

---

# 9. Learning Roadmap APIs

## Generate Roadmap

```http
POST /roadmaps/generate
```

---

## Get Roadmaps

```http
GET /roadmaps
```

---

## Roadmap Details

```http
GET /roadmaps/{id}
```

---

## Regenerate Roadmap

```http
POST /roadmaps/{id}/regenerate
```

---

## Delete Roadmap

```http
DELETE /roadmaps/{id}
```

---

# 10. Learning Resource APIs

## Get Resources

```http
GET /resources
```

Optional Query Parameters

* career_id
* category
* difficulty
* search

---

## Resource Details

```http
GET /resources/{id}
```

---

## Create Resource (Admin)

```http
POST /resources
```

---

## Update Resource (Admin)

```http
PUT /resources/{id}
```

---

## Delete Resource (Admin)

```http
DELETE /resources/{id}
```

---

# 11. Interview APIs

## Generate Interview

```http
POST /interviews/generate
```

Request

```json
{
  "career_id": 2,
  "difficulty": "Intermediate"
}
```

---

## Get Interview Sessions

```http
GET /interviews
```

---

## Session Details

```http
GET /interviews/{id}
```

---

# 12. Progress APIs

## Get Progress

```http
GET /progress
```

---

## Update Progress

```http
PUT /progress
```

---

## Complete Roadmap Step

```http
POST /progress/complete-step
```

---

# 13. AI History APIs

## Get AI History

```http
GET /history
```

---

## History Details

```http
GET /history/{id}
```

---

## Delete History

```http
DELETE /history/{id}
```

---

# 14. Dashboard APIs

## User Dashboard

```http
GET /dashboard
```

Returns

* User profile summary
* Career goals
* Roadmap statistics
* Skill progress
* AI activity
* Interview summary

---

# 15. Notification APIs

## Get Notifications

```http
GET /notifications
```

---

## Mark as Read

```http
PUT /notifications/{id}/read
```

---

# 16. Admin APIs

## Users

```http
GET /admin/users
```

```http
PUT /admin/users/{id}
```

```http
DELETE /admin/users/{id}
```

---

## Analytics

```http
GET /admin/analytics
```

---

## Reports

```http
GET /admin/reports
```

---

## System Settings

```http
GET /admin/settings
```

```http
PUT /admin/settings
```

---

# 17. Standard HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Resource Created      |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 422  | Validation Failed     |
| 429  | Too Many Requests     |
| 500  | Internal Server Error |

---

# 18. Standard Error Response

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": {
    "email": [
      "The email field is required."
    ]
  }
}
```

---

# 19. API Security

* Laravel Sanctum authentication
* HTTPS only in production
* CSRF protection where applicable
* Request validation using Form Requests
* Rate limiting
* Authorization using Policies and Gates
* Input sanitization
* Secure environment variables

---

# 20. Versioning Strategy

Current Version

```text
/api/v1
```

Future versions

```text
/api/v2
/api/v3
```

Older API versions should remain available during migration periods to preserve client compatibility.

---

# 21. API Summary

The Aria REST API exposes modular endpoints for authentication, career guidance, AI-powered recommendations, learning management, interview preparation, progress tracking, administration, and reporting. The specification follows REST best practices and is designed to support the React frontend while remaining extensible for future mobile applications and third-party integrations.
