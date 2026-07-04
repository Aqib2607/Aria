# 08_AI_Integration_Document.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**Primary AI Provider:** Google Gemini API

**Backend:** Laravel

**Database:** MySQL

---

# 1. Overview

The Artificial Intelligence layer is the core intelligence engine of Aria. It enables personalized career guidance, learning roadmap generation, skill-gap analysis, interview preparation, and intelligent educational recommendations.

The Laravel backend acts as the only communication gateway between the frontend and Google Gemini API. The frontend never communicates directly with the AI provider.

---

# 2. AI Architecture

```text
React Frontend
        │
        ▼
Laravel REST API
        │
        ▼
AI Service Layer
        │
        ▼
Prompt Builder
        │
        ▼
Google Gemini API
        │
        ▼
Response Validator
        │
        ▼
Response Formatter
        │
        ▼
MySQL Database
        │
        ▼
React Frontend
```

---

# 3. AI Responsibilities

Aria AI is responsible for:

* Career recommendation
* Skill-gap analysis
* Learning roadmap generation
* Interview question generation
* Learning resource recommendation
* Personalized career advice
* Roadmap regeneration
* Learning guidance

---

# 4. AI Service Layer

The backend should contain a dedicated AI Service Layer.

Suggested structure:

```text
app/
 ├── Services/
 │     ├── AI/
 │     │      GeminiService.php
 │     │      PromptService.php
 │     │      ResponseFormatter.php
 │     │      ValidationService.php
 │     │      TokenEstimator.php
 │     │      RetryService.php
```

Responsibilities

* Build prompts
* Call Gemini API
* Validate responses
* Parse structured output
* Handle errors
* Store AI history

---

# 5. Prompt Engineering Strategy

Every AI request should follow a structured prompt.

Prompt sections include:

* System role
* User profile
* Career goal
* Current skills
* Context
* Expected output format
* Validation instructions

This ensures consistency across all AI-generated responses.

---

# 6. AI Modules

## Career Recommendation

Inputs

* Education
* Skills
* Interests
* Career goal

Output

* Recommended career
* Explanation
* Confidence level
* Required skills

---

## Skill Gap Analysis

Inputs

* Selected career
* Existing skills

Output

* Missing skills
* Improvement suggestions
* Priority order

---

## Learning Roadmap

Inputs

* Career
* Missing skills
* Learning preference

Output

* Learning phases
* Weekly milestones
* Monthly milestones
* Estimated duration
* Resources

---

## Interview Preparation

Inputs

* Career
* Difficulty

Output

* Technical questions
* Behavioral questions
* Coding questions
* Model answers
* Explanations

---

## Resource Recommendation

Inputs

* Career
* Missing skills

Output

* Courses
* Documentation
* Books
* Videos
* Practice platforms

---

# 7. Prompt Templates

Each AI feature should maintain its own prompt template.

Examples

* Career Prompt
* Roadmap Prompt
* Skill Analysis Prompt
* Interview Prompt
* Resource Prompt

Prompt templates should be configurable without modifying business logic.

---

# 8. Response Format

AI responses should always be transformed into structured JSON before being stored or returned.

Example

```json
{
  "career": "Backend Developer",
  "confidence": 91,
  "required_skills": [
    "Laravel",
    "REST API",
    "MySQL"
  ]
}
```

The frontend should consume only validated JSON objects.

---

# 9. Response Validation

Before storing AI output:

Validate

* JSON format
* Required fields
* Empty responses
* Invalid values
* Duplicate items
* Maximum length

Reject responses that fail validation.

---

# 10. AI History

Every AI interaction should be recorded.

Store

* User ID
* Feature
* Prompt
* Response
* Timestamp
* Execution time
* Token estimate
* Status

This supports analytics, debugging, and regeneration.

---

# 11. Retry Strategy

If Gemini returns an invalid response:

1. Retry once automatically.
2. Attempt prompt simplification.
3. Return a user-friendly error if the second attempt fails.
4. Log the failure.

Avoid infinite retry loops.

---

# 12. Error Handling

Possible failures

* Network timeout
* API unavailable
* Invalid API key
* Rate limit exceeded
* Invalid response
* Malformed JSON

Every failure should generate:

* Error log
* User-friendly message
* Retry option where appropriate

---

# 13. Performance Optimization

Recommended practices

* Reuse prompt templates.
* Cache static reference data.
* Minimize prompt size.
* Send only relevant user information.
* Avoid duplicate requests.
* Queue long-running AI tasks if necessary.

---

# 14. Security

Never expose:

* Gemini API Key
* Prompt templates
* Internal system instructions

Security measures

* Store API keys in environment variables.
* Call Gemini only from Laravel.
* Validate all user input.
* Sanitize prompt content.
* Apply request rate limiting.

---

# 15. AI Usage Limits

Recommended safeguards

* Daily request limits per user
* Maximum prompt size
* Maximum response size
* Timeout threshold
* Abuse detection

These controls help manage operational cost and protect the service.

---

# 16. Logging

Log

* Request ID
* User ID
* AI module
* Response time
* Success or failure
* Error details
* Retry count

Do not log sensitive credentials.

---

# 17. Future AI Expansion

The AI layer should support multiple providers through an abstraction interface.

Potential providers

* OpenAI
* Anthropic Claude
* Groq
* DeepSeek
* Azure OpenAI

The rest of the application should continue using a common AI service interface regardless of the provider.

---

# 18. Best Practices

* Keep prompts modular.
* Separate prompt generation from business logic.
* Return structured responses.
* Validate every response.
* Handle failures gracefully.
* Version prompt templates.
* Monitor AI usage and performance.

---

# 19. AI Workflow Summary

```text
User Action
      │
      ▼
Laravel Controller
      │
      ▼
AI Service
      │
      ▼
Prompt Builder
      │
      ▼
Gemini API
      │
      ▼
Response Validator
      │
      ▼
Formatter
      │
      ▼
Database
      │
      ▼
Frontend Response
```

---

# 20. Integration Summary

The AI Integration layer is designed to isolate all AI-specific functionality from the rest of the application. By centralizing prompt generation, API communication, validation, formatting, logging, and error handling within Laravel services, Aria achieves a secure, maintainable, and extensible architecture. This approach enables future migration to additional AI providers with minimal impact on the frontend or business logic while ensuring consistent, reliable, and structured AI-powered career guidance.
