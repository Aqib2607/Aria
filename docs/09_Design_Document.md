# 09_Design_Document.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**Frontend:** React + TypeScript

---

# 1. Design Philosophy

Aria should feel like a modern, intelligent, and trustworthy career mentor rather than a traditional educational platform.

The design should emphasize:

* Professionalism
* Simplicity
* Clarity
* Accessibility
* Human-centered interactions
* AI-first experience

Design principles:

* Clean interfaces
* Minimal visual clutter
* High readability
* Consistent spacing
* Responsive layouts
* Smooth micro-interactions

---

# 2. Brand Identity

## Brand Name

Aria

## Tagline

**Your AI Career Mentor**

## Brand Personality

* Intelligent
* Helpful
* Trustworthy
* Modern
* Motivational
* Professional

---

# 3. Visual Style

Overall style:

* Modern SaaS
* Glassmorphism (light usage)
* Soft shadows
* Rounded corners
* Spacious layouts
* Clean typography
* Minimal gradients

Avoid:

* Heavy skeuomorphism
* Dark cluttered interfaces
* Excessive animations
* Busy dashboards

---

# 4. Color Palette

## Primary

```text
#2563EB
```

Blue

Used for:

* Primary buttons
* Links
* Active navigation
* Progress

---

## Secondary

```text
#10B981
```

Green

Used for:

* Success
* Completed milestones
* Positive indicators

---

## Accent

```text
#F59E0B
```

Amber

Used for:

* Highlights
* Warnings
* AI recommendations

---

## Error

```text
#EF4444
```

---

## Background

```text
#F8FAFC
```

---

## Card

```text
#FFFFFF
```

---

## Text

Primary

```text
#111827
```

Secondary

```text
#6B7280
```

---

# 5. Typography

Primary Font

Inter

Fallback

sans-serif

---

## Heading Sizes

H1

48px

H2

36px

H3

30px

H4

24px

---

## Body

16px

---

## Small

14px

---

## Caption

12px

---

# 6. Spacing System

Base unit

8px

Spacing scale

* 4px
* 8px
* 16px
* 24px
* 32px
* 48px
* 64px

---

# 7. Border Radius

Small

8px

Medium

12px

Large

20px

Buttons

12px

Cards

16px

Inputs

12px

---

# 8. Shadows

Cards

Soft elevation

Hover

Medium elevation

Modals

Large elevation

---

# 9. Grid System

Desktop

12 Columns

Tablet

8 Columns

Mobile

4 Columns

Container Width

1280px

---

# 10. Responsive Breakpoints

Mobile

0–639px

Tablet

640–1023px

Laptop

1024–1279px

Desktop

1280px+

---

# 11. Navigation

Top Navigation

Contains

* Logo
* Dashboard
* Career
* Roadmaps
* Interview
* Resources
* Profile

Dashboard Navigation

Desktop

Left Sidebar

Mobile

Bottom Navigation + Drawer

---

# 12. Page Structure

## Landing Page

Sections

* Hero
* Features
* How It Works
* AI Benefits
* Testimonials
* FAQ
* CTA
* Footer

---

## Authentication

Pages

* Login
* Register
* Forgot Password
* Reset Password

---

## Dashboard

Widgets

* Welcome Card
* Career Goal
* Skill Progress
* Roadmap Progress
* AI Activity
* Learning Statistics
* Recent Recommendations

---

## Profile

Sections

* Personal
* Education
* Skills
* Preferences
* Security

---

## Career Recommendation

Components

* Career Selector
* Recommendation Card
* Confidence Score
* Explanation
* Action Buttons

---

## Skill Gap

Components

* Current Skills
* Missing Skills
* Progress Bars
* Improvement Suggestions

---

## Learning Roadmap

Components

* Timeline
* Learning Phases
* Weekly Goals
* Monthly Goals
* Resource Cards

---

## Interview Preparation

Components

* Difficulty Selector
* Question Cards
* Answer Section
* Explanation Panel

---

## Learning Resources

Cards

* Course
* Video
* Documentation
* Book
* Practice Platform

Filters

* Category
* Difficulty
* Career

---

## Admin Dashboard

Widgets

* User Analytics
* AI Usage
* Reports
* Resource Management
* Career Management

---

# 13. Component Library

Buttons

* Primary
* Secondary
* Outline
* Text
* Icon

Inputs

* Text Field
* Password
* Search
* Textarea
* Select

Cards

* Dashboard Card
* Career Card
* Resource Card
* AI Result Card

Tables

* Responsive
* Sortable
* Searchable
* Paginated

Badges

* Success
* Warning
* Error
* Info

Progress

* Linear
* Circular

Charts

* Line
* Bar
* Doughnut

Modals

* Confirmation
* Details
* Delete
* Success

---

# 14. Icons

Library

Lucide React

Style

* Minimal
* Outline
* Consistent stroke width

---

# 15. Animation Guidelines

Duration

150–300ms

Effects

* Fade
* Slide
* Scale
* Progress animation

Avoid

* Long animations
* Distracting effects

---

# 16. Accessibility

Follow WCAG 2.1 AA principles:

* Keyboard navigation
* Screen reader support
* Sufficient color contrast
* Focus indicators
* Semantic HTML
* Form labels
* Error messaging

---

# 17. Dark Mode

Supported

Theme Colors

Background

```text
#111827
```

Card

```text
#1F2937
```

Primary Text

```text
#F9FAFB
```

Secondary Text

```text
#D1D5DB
```

---

# 18. Empty States

Examples

* No roadmap yet
* No skills added
* No AI history
* No notifications

Each state should include:

* Illustration
* Short description
* Primary action

---

# 19. Error States

Display

* Friendly message
* Retry button
* Support option if needed

Never expose technical stack traces.

---

# 20. Design Tokens

Primary Color

Blue

Success

Green

Warning

Amber

Danger

Red

Radius

12px

Spacing Unit

8px

Animation

200ms

Font

Inter

---

# 21. UX Principles

* Minimize user effort.
* Guide users with clear CTAs.
* Prioritize readability.
* Keep AI interactions transparent.
* Maintain consistency across pages.
* Provide immediate feedback for user actions.

---

# 22. Future Enhancements

* AI chat assistant panel
* Voice interaction
* Interactive onboarding
* Gamification
* Personalized dashboard themes
* Mobile-first enhancements

---

# 23. Design Summary

The Aria design system delivers a clean, professional, and approachable experience centered on intelligent career guidance. By combining a consistent design language, responsive layouts, accessible components, and modern UI patterns, the platform provides a scalable foundation for React development while reinforcing user trust and engagement throughout the career planning journey.
