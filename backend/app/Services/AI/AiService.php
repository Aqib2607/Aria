<?php

namespace App\Services\AI;

use App\Models\AiHistory;
use Illuminate\Support\Facades\Auth;

class AiService
{
    protected GeminiService $geminiService;
    protected PromptService $promptService;

    public function __construct(GeminiService $geminiService, PromptService $promptService)
    {
        $this->geminiService = $geminiService;
        $this->promptService = $promptService;
    }

    /**
     * Get a career recommendation based on user data
     */
    public function getCareerRecommendation(array $userData): ?array
    {
        $prompt = $this->promptService->buildCareerRecommendationPrompt($userData);
        $startTime = microtime(true);
        
        $response = $this->geminiService->generateContent($prompt);
        
        $executionTime = microtime(true) - $startTime;
        $this->logHistory('career_recommendation', $prompt, $response, $executionTime);

        return $response;
    }

    /**
     * Analyze skill gaps for a given career and current skills
     */
    public function getSkillGapAnalysis(string $careerTitle, array $currentSkills): ?array
    {
        $prompt = $this->promptService->buildSkillGapPrompt($careerTitle, $currentSkills);
        $startTime = microtime(true);
        
        $response = $this->geminiService->generateContent($prompt);
        
        $executionTime = microtime(true) - $startTime;
        $this->logHistory('skill_gap_analysis', $prompt, $response, $executionTime);

        return $response;
    }

    /**
     * Generate a learning roadmap
     */
    public function generateRoadmap(string $careerTitle, array $missingSkills): ?array
    {
        $prompt = $this->promptService->buildRoadmapPrompt($careerTitle, $missingSkills);
        $startTime = microtime(true);
        
        $response = $this->geminiService->generateContent($prompt);
        
        $executionTime = microtime(true) - $startTime;
        $this->logHistory('learning_roadmap', $prompt, $response, $executionTime);

        return $response;
    }

    /**
     * Generate interview questions
     */
    public function generateInterviewPrep(string $careerTitle, string $difficulty): ?array
    {
        $prompt = $this->promptService->buildInterviewPrompt($careerTitle, $difficulty);
        $startTime = microtime(true);
        
        $response = $this->geminiService->generateContent($prompt);
        
        $executionTime = microtime(true) - $startTime;
        $this->logHistory('interview_prep', $prompt, $response, $executionTime);

        return $response;
    }

    /**
     * Generate recommended resources
     */
    public function generateResources(string $careerTitle): ?array
    {
        $prompt = $this->promptService->buildResourcePrompt($careerTitle);
        $startTime = microtime(true);
        
        $response = $this->geminiService->generateContent($prompt);
        
        $executionTime = microtime(true) - $startTime;
        $this->logHistory('resource_recommendation', $prompt, $response, $executionTime);

        return $response;
    }

    /**
     * Store the interaction in the AI history table
     */
    protected function logHistory(string $feature, string $prompt, ?array $response, float $executionTime): void
    {
        $userId = Auth::id();
        
        if ($userId) {
            AiHistory::create([
                'user_id' => $userId,
                'feature' => $feature,
                'prompt' => $prompt,
                'response' => $response,
                'execution_time' => $executionTime,
            ]);
        }
    }
}
