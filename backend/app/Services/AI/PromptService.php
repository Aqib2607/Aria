<?php

namespace App\Services\AI;

class PromptService
{
    /**
     * Build the prompt for Career Recommendation
     */
    public function buildCareerRecommendationPrompt(array $userData): string
    {
        $skills = implode(', ', $userData['skills'] ?? []);
        $bio = $userData['bio'] ?? 'Not provided';
        $education = $userData['education'] ?? 'Not provided';

        return <<<PROMPT
You are Aria, an expert AI career advisor. 
Based on the following user profile, recommend the most suitable tech career path.

User Profile:
- Current Skills: {$skills}
- Bio/Interests: {$bio}
- Education: {$education}

Expected Output (JSON only):
{
  "career": "Career Title",
  "confidence": 95,
  "required_skills": ["Skill 1", "Skill 2"],
  "explanation": "Why this is a good fit."
}
PROMPT;
    }

    /**
     * Build the prompt for Skill Gap Analysis
     */
    public function buildSkillGapPrompt(string $careerTitle, array $currentSkills): string
    {
        $skillsList = implode(', ', $currentSkills);

        return <<<PROMPT
You are Aria, an expert tech career advisor.
The user wants to become a "{$careerTitle}" and currently has the following skills: {$skillsList}.

Identify their skill gaps.

Expected Output (JSON only):
{
  "missing_skills": ["Skill A", "Skill B"],
  "recommendations": ["Recommendation 1", "Recommendation 2"]
}
PROMPT;
    }

    /**
     * Build the prompt for Learning Roadmap Generation
     */
    public function buildRoadmapPrompt(string $careerTitle, array $missingSkills): string
    {
        $skillsList = implode(', ', $missingSkills);

        return <<<PROMPT
You are Aria, an expert learning path generator.
Create a structured learning roadmap for becoming a "{$careerTitle}", focusing on these missing skills: {$skillsList}.

Expected Output (JSON only):
{
  "title": "Roadmap to {$careerTitle}",
  "estimated_duration": "3 months",
  "phases": [
    {
      "title": "Phase 1: Basics",
      "estimated_hours": 40,
      "description": "Learn the fundamentals",
      "skills_covered": ["Skill A"]
    }
  ]
}
PROMPT;
    }

    /**
     * Build the prompt for Interview Preparation
     */
    public function buildInterviewPrompt(string $careerTitle, string $difficulty): string
    {
        return <<<PROMPT
You are Aria, a senior technical interviewer.
Generate a mock interview session for a "{$careerTitle}" role at a "{$difficulty}" level.

Generate exactly 3 questions.

Expected Output (JSON only):
{
  "questions": [
    {
      "question": "Question text here?",
      "type": "Technical",
      "explanation": "What the interviewer is looking for."
    }
  ]
}
PROMPT;
    }

    /**
     * Build the prompt for Resource Recommendation
     */
    public function buildResourcePrompt(string $careerTitle): string
    {
        return <<<PROMPT
You are Aria, an expert career advisor.
Curate a list of exactly 5 highly recommended learning resources for a "{$careerTitle}".

Expected Output (JSON only):
{
  "resources": [
    {
      "title": "Resource title",
      "url": "https://example.com",
      "provider": "Provider Name",
      "type": "Course/Book/Video",
      "difficulty": "Beginner/Intermediate/Advanced"
    }
  ]
}
PROMPT;
    }
}
