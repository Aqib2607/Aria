# 20_Admin_Manual.md

# Aria

## AI-Powered Career Guidance & Learning Roadmap Assistant

**Version:** 1.0

**Audience:** System Administrators

---

# 1. Introduction

The Admin Panel enables authorized administrators to manage the Aria platform, monitor system activity, maintain learning content, configure AI behavior, and oversee user operations.

Only users assigned the **Administrator** role can access the Admin Dashboard.

---

# 2. Administrator Responsibilities

Administrators are responsible for:

* Managing users
* Managing career paths
* Managing skill libraries
* Managing learning resources
* Monitoring AI usage
* Viewing reports and analytics
* Configuring system settings
* Maintaining platform security
* Monitoring system health

---

# 3. Admin Login

Steps

1. Open the Login page.
2. Enter administrator credentials.
3. Complete authentication.
4. Access the Admin Dashboard.

Unauthorized users must not be able to access administrative routes.

---

# 4. Admin Dashboard

The dashboard provides an overview of platform activity.

Widgets

* Total Users
* Active Users
* Total Career Paths
* AI Requests
* Learning Resources
* Interview Sessions
* System Health
* Recent Activities

---

# 5. User Management

Navigation

**Admin → Users**

Available Actions

* View user details
* Search users
* Filter users
* Edit user information
* Activate accounts
* Suspend accounts
* Delete accounts (Soft Delete)
* View user activity
* View AI history

Search Filters

* Name
* Email
* Status
* Registration Date
* Career Goal

---

# 6. Career Management

Navigation

**Admin → Careers**

Functions

* Create career
* Update career
* Archive career
* Delete career
* Categorize careers

Career Information

* Title
* Description
* Category
* Difficulty
* Estimated Duration
* Demand Level
* Salary Range
* Required Skills

---

# 7. Skill Library Management

Navigation

**Admin → Skills**

Functions

* Add skill
* Edit skill
* Delete skill
* Categorize skills
* Assign skills to careers

Each skill should include:

* Skill Name
* Description
* Category
* Required Level

---

# 8. Learning Resource Management

Navigation

**Admin → Resources**

Supported Resources

* Courses
* Videos
* Documentation
* Books
* Practice Platforms
* Certifications

Functions

* Create resource
* Update resource
* Archive resource
* Delete resource
* Assign resources to careers

Resource Information

* Title
* URL
* Provider
* Category
* Difficulty
* Description

---

# 9. AI Prompt Management

Navigation

**Admin → AI Settings**

Administrators can manage:

* Career Recommendation Prompt
* Skill Gap Prompt
* Learning Roadmap Prompt
* Interview Prompt
* Resource Recommendation Prompt

Guidelines

* Maintain version history.
* Test changes before production use.
* Keep prompts modular.
* Document every modification.

---

# 10. AI Usage Monitoring

Navigation

**Admin → AI Analytics**

Monitor

* Total AI Requests
* Daily Usage
* Average Response Time
* Failed Requests
* Retry Count
* Token Consumption (Estimated)
* Most Used AI Features

---

# 11. Report Management

Navigation

**Admin → Reports**

Available Reports

* User Registration Report
* User Activity Report
* Career Popularity Report
* Skill Demand Report
* AI Usage Report
* Roadmap Generation Report
* Interview Activity Report
* System Activity Report

Export Formats

* PDF
* Excel
* CSV

---

# 12. Notification Management

Navigation

**Admin → Notifications**

Functions

* Broadcast announcements
* Schedule notifications (future)
* View delivery status
* Remove outdated notifications

---

# 13. Role & Permission Management

Navigation

**Admin → Roles**

Roles

* Administrator
* User

Future Roles

* Mentor
* Moderator
* Super Administrator

Permission Examples

* Manage Users
* Manage Careers
* Manage Skills
* Manage Resources
* Configure AI
* View Reports
* Manage Settings

---

# 14. System Settings

Navigation

**Admin → Settings**

Configuration Areas

Application

* Platform Name
* Maintenance Mode
* Time Zone
* Language

Authentication

* Password Policy
* Email Verification
* Session Timeout

AI

* Gemini API Configuration
* Prompt Templates
* Request Limits
* Timeout Values

Email

* SMTP Configuration
* Sender Information

Notifications

* Email Notifications
* In-App Notifications

---

# 15. Activity Logs

Navigation

**Admin → Activity Logs**

Logged Events

* User Login
* Profile Updates
* AI Requests
* Career Updates
* Resource Changes
* Administrator Actions
* System Errors

Log Details

* Timestamp
* User
* Action
* Module
* IP Address
* Status

---

# 16. Security Management

Administrator Responsibilities

* Monitor failed login attempts
* Review suspicious activities
* Manage account suspensions
* Review audit logs
* Rotate credentials when necessary

Security Recommendations

* Use strong passwords.
* Enable HTTPS.
* Limit administrator accounts.
* Review logs regularly.

---

# 17. Backup & Recovery

Administrators should:

* Verify daily database backups.
* Test backup restoration procedures.
* Maintain backup retention policies.
* Verify file storage backups.

---

# 18. Troubleshooting

## AI Not Responding

Possible Causes

* Invalid API key
* Service unavailable
* Network issues

Actions

* Verify API configuration.
* Review AI logs.
* Retry requests.

---

## Database Issues

Possible Causes

* Connection failure
* Migration problems

Actions

* Verify database credentials.
* Check migration status.
* Review server logs.

---

## User Login Problems

Actions

* Verify account status.
* Reset password if required.
* Confirm email verification.

---

# 19. Maintenance Checklist

Daily

* Review error logs.
* Monitor AI usage.
* Verify system availability.

Weekly

* Review reports.
* Check backups.
* Update learning resources.

Monthly

* Review permissions.
* Optimize database.
* Rotate credentials if required.
* Update dependencies.

---

# 20. Best Practices

* Follow the principle of least privilege.
* Record all administrative changes.
* Test configuration changes before deployment.
* Regularly review AI prompt performance.
* Keep learning resources current.
* Monitor analytics to improve platform quality.

---

# 21. Emergency Procedures

If a critical issue occurs:

1. Enable maintenance mode.
2. Identify the affected service.
3. Restore from backup if necessary.
4. Verify system integrity.
5. Disable maintenance mode after validation.
6. Document the incident.

---

# 22. Admin Manual Summary

The Aria Admin Manual provides operational guidance for managing users, careers, skills, AI services, learning resources, analytics, security, and system configuration. By following these procedures, administrators can ensure the platform remains secure, reliable, and efficient while delivering a consistent AI-powered career guidance experience.
