<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AI\AiService;
use Illuminate\Http\JsonResponse;

class AiController extends Controller
{
    protected AiService $aiService;

    public function __construct(AiService $aiService)
    {
        $this->aiService = $aiService;
    }

    public function recommendCareer(Request $request): JsonResponse
    {
        $request->validate([
            'skills' => 'required|array',
            'bio' => 'nullable|string',
            'education' => 'nullable|string'
        ]);

        $response = $this->aiService->getCareerRecommendation($request->all());

        if (!$response) {
            return response()->json(['message' => 'Failed to generate recommendation'], 500);
        }

        return response()->json(['data' => $response]);
    }

    public function analyzeSkills(Request $request): JsonResponse
    {
        $request->validate([
            'career_title' => 'required|string',
            'current_skills' => 'required|array'
        ]);

        $response = $this->aiService->getSkillGapAnalysis($request->career_title, $request->current_skills);

        if (!$response) {
            return response()->json(['message' => 'Failed to analyze skill gaps'], 500);
        }

        return response()->json(['data' => $response]);
    }

    public function generateRoadmap(Request $request): JsonResponse
    {
        $request->validate([
            'career_title' => 'required|string',
            'missing_skills' => 'required|array'
        ]);

        $response = $this->aiService->generateRoadmap($request->career_title, $request->missing_skills);

        if (!$response) {
            return response()->json(['message' => 'Failed to generate roadmap'], 500);
        }

        return response()->json(['data' => $response]);
    }

    public function prepInterview(Request $request): JsonResponse
    {
        $request->validate([
            'career_title' => 'required|string',
            'difficulty' => 'required|string|in:Beginner,Intermediate,Advanced'
        ]);

        $response = $this->aiService->generateInterviewPrep($request->career_title, $request->difficulty);

        if (!$response) {
            return response()->json(['message' => 'Failed to generate interview questions'], 500);
        }

        return response()->json(['data' => $response]);
    }

    public function generateResources(Request $request): JsonResponse
    {
        $request->validate([
            'career_title' => 'required|string'
        ]);

        $response = $this->aiService->generateResources($request->career_title);

        if (!$response) {
            return response()->json(['message' => 'Failed to generate resources'], 500);
        }

        return response()->json(['data' => $response]);
    }
}
