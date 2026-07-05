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

        try {
            $response = $this->aiService->getCareerRecommendation($request->all());
            if (!$response) throw new \Exception('Failed to generate recommendation');
            return response()->json(['data' => $response]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function analyzeSkills(Request $request): JsonResponse
    {
        $request->validate([
            'career_title' => 'required|string',
            'current_skills' => 'required|array'
        ]);

        try {
            $response = $this->aiService->getSkillGapAnalysis($request->career_title, $request->current_skills);
            if (!$response) throw new \Exception('Failed to analyze skill gaps');
            return response()->json(['data' => $response]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function generateRoadmap(Request $request): JsonResponse
    {
        $request->validate([
            'career_title' => 'required|string',
            'missing_skills' => 'required|array'
        ]);

        try {
            $response = $this->aiService->generateRoadmap($request->career_title, $request->missing_skills);
            if (!$response) throw new \Exception('Failed to generate roadmap');
            return response()->json(['data' => $response]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function prepInterview(Request $request): JsonResponse
    {
        $request->validate([
            'career_title' => 'required|string',
            'difficulty' => 'required|string|in:Beginner,Intermediate,Advanced'
        ]);

        try {
            $response = $this->aiService->generateInterviewPrep($request->career_title, $request->difficulty);
            if (!$response) throw new \Exception('Failed to generate interview questions');
            return response()->json(['data' => $response]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function generateResources(Request $request): JsonResponse
    {
        $request->validate([
            'career_title' => 'required|string'
        ]);

        try {
            $response = $this->aiService->generateResources($request->career_title);
            if (!$response) throw new \Exception('Failed to generate resources');
            return response()->json(['data' => $response]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
