# 26_Final_Project_Report.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Final Year Project Report**

**Department of Computer Science & Engineering**

---

# Title Page

**Project Title**

**Aria: AI-Powered Career Guidance & Learning Roadmap Assistant**

Submitted in partial fulfillment of the requirements for the degree of Bachelor of Science in Computer Science & Engineering.

Prepared By:

* Student Name:
* Student ID:
* Department:
* University:

Supervisor:

* Name:
* Designation:

Submission Date:

---

# Abstract

Career planning is one of the most significant challenges faced by students and graduates due to the rapidly evolving job market and the abundance of learning resources. Traditional career guidance methods often fail to provide personalized recommendations tailored to an individual's skills, interests, and career aspirations.

Aria is an AI-powered web application developed to address this challenge. The platform utilizes Google Gemini AI to recommend suitable career paths, perform skill-gap analysis, generate personalized learning roadmaps, recommend educational resources, prepare interview questions, and monitor learning progress.

The application is built using React and TypeScript for the frontend, Laravel for the backend, MySQL for database management, and Laravel Sanctum for secure authentication. The system follows a modular architecture designed for maintainability, scalability, and future enhancement.

---

# Acknowledgement

Express gratitude to:

* Project Supervisor
* Department Faculty
* University
* Team Members
* Open-source Communities
* Family and Friends

---

# Table of Contents

1. Introduction
2. Literature Review
3. Problem Statement
4. Objectives
5. Scope
6. Requirement Analysis
7. System Design
8. Database Design
9. Implementation
10. Testing
11. Results
12. Limitations
13. Future Work
14. Conclusion
15. References
16. Appendices

---

# Chapter 1 – Introduction

## Background

The increasing demand for technology professionals has created numerous career opportunities. However, selecting an appropriate career path requires understanding industry demands, skill requirements, and learning strategies.

Artificial Intelligence provides an opportunity to automate career guidance by analyzing user information and generating personalized recommendations.

---

## Motivation

Students frequently encounter challenges such as:

* Uncertainty in career selection
* Lack of structured learning plans
* Limited interview preparation
* Information overload from online learning resources

Aria aims to simplify these processes using AI.

---

# Chapter 2 – Literature Review

Existing solutions include:

* LinkedIn Career Explorer
* Coursera Career Academy
* Google Career Certificates
* Roadmap.sh
* Interview preparation platforms

Identified limitations:

* Limited personalization
* Fragmented learning resources
* Minimal AI-driven roadmap generation
* Lack of integrated career planning

Aria addresses these gaps by combining multiple career development services within a unified AI-powered platform.

---

# Chapter 3 – Problem Statement

Current career guidance approaches often lack:

* Personalized recommendations
* Dynamic skill-gap analysis
* AI-generated learning plans
* Centralized progress tracking
* Integrated interview preparation

This results in inefficient career planning and slower professional development.

---

# Chapter 4 – Objectives

Primary Objective

Develop an AI-powered web platform that delivers personalized career guidance.

Specific Objectives

* Secure authentication
* User profile management
* Career recommendation
* Skill-gap analysis
* Learning roadmap generation
* Interview preparation
* Progress tracking
* Administrative management

---

# Chapter 5 – Scope

Included Features

* User authentication
* Profile management
* Career goals
* Skill management
* AI recommendations
* Learning roadmap
* Learning resources
* Interview preparation
* Progress tracking
* Dashboard
* Notifications
* Admin panel

Excluded Features

* Mobile application
* Payment gateway
* Live mentoring
* Video conferencing

---

# Chapter 6 – Requirement Analysis

Functional Requirements

* User registration
* Login
* Profile management
* Career recommendation
* Skill analysis
* Roadmap generation
* Progress tracking
* Administration

Non-Functional Requirements

* Security
* Scalability
* Performance
* Reliability
* Usability
* Maintainability

Reference

See:

* SRS
* PRD
* Functional Specification

---

# Chapter 7 – System Design

Architecture

```text
React Frontend
        │
Laravel REST API
        │
Service Layer
        │
Repository Layer
        │
MySQL Database
        │
Google Gemini API
```

Design Characteristics

* Layered Architecture
* REST APIs
* Modular Services
* Secure Authentication
* AI Integration

---

# Chapter 8 – Database Design

Database

MySQL

Major Tables

* users
* user_profiles
* careers
* skills
* user_skills
* career_skills
* learning_roadmaps
* roadmap_steps
* interview_sessions
* interview_questions
* resources
* ai_histories
* notifications
* progress_logs
* activity_logs

Database normalization follows relational database design principles with foreign key constraints to ensure integrity.

---

# Chapter 9 – Implementation

Frontend

* React
* TypeScript
* Tailwind CSS

Backend

* Laravel 12
* Sanctum
* REST APIs

Database

* MySQL

Artificial Intelligence

* Google Gemini API

Development followed Agile methodology with six iterative sprints.

---

# Chapter 10 – Testing

Testing Activities

* Unit Testing
* Integration Testing
* API Testing
* System Testing
* Security Testing
* Performance Testing
* User Acceptance Testing

Outcome

All critical functional modules passed testing before deployment.

---

# Chapter 11 – Results

Project Deliverables

* Secure Authentication
* AI Career Recommendation
* Skill Gap Analysis
* Learning Roadmap
* Interview Preparation
* Progress Dashboard
* Administrative Portal

The system successfully demonstrated the feasibility of AI-assisted career planning.

---

# Chapter 12 – Limitations

Current limitations include:

* Dependency on external AI services
* Web-only deployment
* English-focused AI interactions
* No offline functionality
* Limited third-party integrations

---

# Chapter 13 – Future Work

Future enhancements include:

* Resume Analyzer
* AI Resume Builder
* Job Recommendation Engine
* Internship Portal
* Mentor Marketplace
* Voice Assistant
* Mobile Application
* Multi-language Support
* Company-specific interview preparation
* AI Career Chatbot

---

# Chapter 14 – Conclusion

Aria demonstrates how Artificial Intelligence can improve career planning through personalized recommendations, structured learning paths, and interview preparation. The modular architecture, secure backend, responsive frontend, and AI-driven features provide a strong foundation for future expansion into a production-ready career development platform.

The project successfully meets its academic objectives while offering practical value for students and lifelong learners.

---

# References

Technical References

* Laravel Documentation
* React Documentation
* TypeScript Documentation
* Tailwind CSS Documentation
* MySQL Documentation
* Google Gemini API Documentation
* IEEE Software Engineering Standards

Academic References

* Research papers on AI in education
* Career recommendation systems
* Intelligent tutoring systems
* Learning analytics

---

# Appendices

Appendix A

* Screenshots

Appendix B

* Database Schema

Appendix C

* API Documentation

Appendix D

* Test Cases

Appendix E

* User Manual

Appendix F

* Admin Manual

Appendix G

* Deployment Guide

---

# Project Outcomes

| Objective                | Status      |
| ------------------------ | ----------- |
| Secure Authentication    | ✓ Completed |
| AI Career Recommendation | ✓ Completed |
| Skill Gap Analysis       | ✓ Completed |
| Learning Roadmap         | ✓ Completed |
| Interview Preparation    | ✓ Completed |
| Progress Tracking        | ✓ Completed |
| Admin Dashboard          | ✓ Completed |
| Documentation            | ✓ Completed |

---

# Final Report Summary

The **Aria Final Project Report** serves as the complete academic record of the project, documenting its motivation, requirements, architecture, implementation, testing, outcomes, and future direction. Together with the accompanying technical documents, it provides a comprehensive reference for academic evaluation, future maintenance, and continued development of the platform.
