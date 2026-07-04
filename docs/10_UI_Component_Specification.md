# 10_UI_Component_Specification.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**Frontend:** React + TypeScript

**UI Framework:** Tailwind CSS

**Icon Library:** Lucide React

---

# 1. Overview

This document defines all reusable UI components used throughout Aria. Each component follows a consistent design language to ensure maintainability, accessibility, responsiveness, and scalability.

---

# 2. Design Principles

Every component should be:

* Reusable
* Responsive
* Accessible
* Consistent
* Lightweight
* Theme-aware (Light & Dark Mode)

---

# 3. Buttons

## Types

### Primary Button

Purpose

* Main actions
* Submit forms
* Generate AI responses

States

* Default
* Hover
* Active
* Loading
* Disabled

Example

* Generate Roadmap
* Save Profile
* Analyze Skills

---

### Secondary Button

Purpose

Secondary actions

Examples

* Cancel
* Edit
* View Details

---

### Outline Button

Purpose

Low-priority actions

Examples

* Learn More
* View History

---

### Icon Button

Purpose

Compact actions

Examples

* Delete
* Edit
* Refresh
* Download

---

# 4. Text Inputs

Supported Types

* Text
* Email
* Password
* Number
* Search
* URL

Features

* Placeholder
* Label
* Helper Text
* Error Message
* Character Counter

Validation States

* Default
* Focus
* Success
* Error
* Disabled

---

# 5. Textarea

Usage

* Bio
* AI prompts
* Career description
* Feedback

Features

* Auto resize
* Character counter
* Validation

---

# 6. Dropdown Select

Used For

* Career selection
* Difficulty level
* Categories
* Skills

Features

* Searchable
* Keyboard navigation
* Clear selection
* Disabled state

---

# 7. Checkbox

Usage

* Accept terms
* Multi-select filters
* Notifications

States

* Checked
* Unchecked
* Disabled

---

# 8. Radio Button

Usage

Single-choice selection

Examples

* Experience Level
* Preferred Learning Style

---

# 9. Toggle Switch

Used For

* Dark Mode
* Email Notifications
* AI Recommendations
* Privacy Settings

---

# 10. Cards

## Dashboard Card

Displays

* Statistics
* Progress
* Summary

---

## Career Card

Displays

* Career Name
* Description
* Difficulty
* Demand Level

Actions

* View
* Select

---

## Resource Card

Displays

* Title
* Provider
* Category
* Difficulty

Actions

* Open
* Save

---

## AI Result Card

Displays

* Recommendation
* Confidence Score
* Explanation
* Action Buttons

---

## Interview Question Card

Displays

* Question
* Difficulty
* Type
* Show Answer Button

---

# 11. Progress Indicators

## Linear Progress

Used For

* Roadmap Completion
* Skill Completion

---

## Circular Progress

Used For

* Dashboard Summary
* Overall Completion

---

# 12. Navigation Components

## Top Navigation

Contains

* Logo
* Menu
* Notifications
* User Menu

---

## Sidebar

Contains

* Dashboard
* Career Goals
* Skills
* Roadmaps
* Interviews
* Resources
* History
* Settings

---

## Mobile Navigation

Bottom Navigation

Drawer Menu

---

# 13. Breadcrumb

Example

Dashboard

↓

Roadmaps

↓

Roadmap Details

---

# 14. Tables

Features

* Sorting
* Filtering
* Pagination
* Search
* Export

Used In

* Admin Dashboard
* User Management
* AI History
* Reports

---

# 15. Modal Dialogs

## Confirmation Modal

Examples

* Delete
* Logout
* Archive

---

## Details Modal

Examples

* Career Details
* Resource Details

---

## Success Modal

Examples

* Roadmap Generated
* Profile Updated

---

## Error Modal

Examples

* AI Failure
* Validation Error

---

# 16. Notification Components

Types

* Success
* Error
* Warning
* Information

Display

* Toast Notification
* Notification Panel

---

# 17. Badges

Examples

* Beginner
* Intermediate
* Advanced
* Completed
* In Progress
* Recommended

---

# 18. Tabs

Examples

Profile

* Personal
* Education
* Skills
* Security

Dashboard

* Overview
* Progress
* History

---

# 19. Accordion

Used For

* FAQs
* Learning Modules
* AI Explanations

---

# 20. Timeline

Used In

* Learning Roadmaps
* Progress History

Features

* Completed Steps
* Current Step
* Upcoming Steps

---

# 21. Charts

Supported Charts

* Line Chart
* Bar Chart
* Doughnut Chart
* Area Chart

Dashboard Usage

* Learning Progress
* AI Usage
* Career Statistics

---

# 22. Search Components

Features

* Live Search
* Suggestions
* Filters
* Recent Searches

Used In

* Careers
* Resources
* Skills

---

# 23. Pagination

Features

* Previous
* Next
* Page Numbers
* Page Size Selector

---

# 24. Empty State Component

Examples

* No Roadmap
* No Skills
* No History
* No Notifications

Contents

* Illustration
* Message
* Action Button

---

# 25. Loading Components

Types

* Skeleton Loader
* Spinner
* Progress Bar

Used During

* AI Processing
* Data Fetching
* Authentication

---

# 26. Error Component

Displays

* Error Icon
* Friendly Message
* Retry Button

Examples

* Network Failure
* AI Service Error
* Permission Denied

---

# 27. File Upload Component

Future Module

Supports

* Resume Upload
* Profile Picture
* Certificates

Validation

* File Type
* File Size
* Upload Status

---

# 28. Theme Support

Light Mode

* White backgrounds
* Dark text
* Soft shadows

Dark Mode

* Dark backgrounds
* Light text
* High contrast

---

# 29. Accessibility Requirements

Every component must support:

* Keyboard navigation
* Screen readers
* Focus indicators
* ARIA labels
* High contrast
* Responsive touch targets

---

# 30. Component Naming Convention

Examples

* ButtonPrimary
* DashboardCard
* CareerCard
* ResourceCard
* ProgressBar
* RoadmapTimeline
* InterviewQuestionCard
* NotificationToast

---

# 31. Component Folder Structure

```text
src/
└── components/
    ├── common/
    ├── layout/
    ├── dashboard/
    ├── career/
    ├── roadmap/
    ├── interview/
    ├── resources/
    ├── admin/
    ├── profile/
    └── ui/
```

---

# 32. Reusability Guidelines

Components should:

* Accept configurable props
* Avoid business logic
* Be stateless where possible
* Support composition
* Follow React best practices

---

# 33. UI Component Summary

The Aria UI Component Specification establishes a scalable design system that promotes consistency, reusability, and accessibility across the application. By defining standardized behaviors, states, and structures for each component, the frontend can be developed efficiently while maintaining a cohesive user experience across desktop, tablet, and mobile platforms.
