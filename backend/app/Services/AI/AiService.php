<?php

namespace App\Services\AI;

use App\Models\AiHistory;
use App\Models\UserApiKey;
use Illuminate\Support\Facades\Auth;

class AiService
{
    protected PromptService $promptService;

    public function __construct(PromptService $promptService)
    {
        $this->promptService = $promptService;
    }

    /**
     * Resolve the authenticated user's active API key record.
     */
    protected function getActiveApiKeyRecord(): ?UserApiKey
    {
        $userId = Auth::id();
        if (!$userId) {
            return null;
        }

        return UserApiKey::where('user_id', $userId)
            ->where('is_active', true)
            ->first();
    }

    /**
     * Get the appropriate AI Provider service based on the active provider.
     */
    protected function getProviderService(?UserApiKey $record): AiProviderInterface
    {
        $provider = $record ? $record->provider : 'gemini'; // default to gemini if none set

        return match ($provider) {
            'openai' => new OpenAIService(),
            'groq' => new GroqService(),
            'anthropic' => new AnthropicService(),
            'zenmux' => new ZenmuxService(),
            default => new GeminiService(),
        };
    }

    /**
     * Generate content dynamically using the active provider.
     */
    protected function executeProvider(string $prompt, string $feature): ?array
    {
        $record = $this->getActiveApiKeyRecord();
        $providerService = $this->getProviderService($record);
        $userApiKey = $record ? $record->api_key : null;

        $startTime = microtime(true);
        $response = $providerService->generateContent($prompt, $userApiKey);
        $executionTime = microtime(true) - $startTime;

        $this->logHistory($feature, $prompt, $response, $executionTime);

        return $response;
    }

    /**
     * Get a career recommendation based on user data
     */
    public function getCareerRecommendation(array $userData): ?array
    {
        $prompt = $this->promptService->buildCareerRecommendationPrompt($userData);
        return $this->executeProvider($prompt, 'career_recommendation');
    }

    /**
     * Analyze skill gaps for a given career and current skills
     */
    public function getSkillGapAnalysis(string $careerTitle, array $currentSkills): ?array
    {
        $prompt = $this->promptService->buildSkillGapPrompt($careerTitle, $currentSkills);
        return $this->executeProvider($prompt, 'skill_gap_analysis');
    }

    /**
     * Generate a learning roadmap
     */
    public function generateRoadmap(string $careerTitle, array $missingSkills): ?array
    {
        $prompt = $this->promptService->buildRoadmapPrompt($careerTitle, $missingSkills);
        return $this->executeProvider($prompt, 'learning_roadmap');
    }

    /**
     * Generate interview questions
     */
    public function generateInterviewPrep(string $careerTitle, string $difficulty): ?array
    {
        $prompt = $this->promptService->buildInterviewPrompt($careerTitle, $difficulty);
        return $this->executeProvider($prompt, 'interview_prep');
    }

    /**
     * Generate recommended resources
     */
    public function generateResources(string $careerTitle): ?array
    {
        $prompt = $this->promptService->buildResourcePrompt($careerTitle);
        return $this->executeProvider($prompt, 'resource_recommendation');
    }

    /**
     * Store the interaction in the AI history table
     */
    protected function logHistory(string $feature, string $prompt, ?array $response, float $executionTime): void
    {
        $userId = Auth::id();

        if ($userId) {
            AiHistory::create([
                'user_id'        => $userId,
                'feature'        => $feature,
                'prompt'         => $prompt,
                'response'       => $response,
                'execution_time' => $executionTime,
            ]);
        }
    }
}

