<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AI\AiService;
use App\Models\LearningRoadmap;
use App\Models\UserSkill;
use App\Models\CareerRecommendation;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Exception;

class AiController extends Controller
{
    protected AiService $aiService;

    public function __construct(AiService $aiService)
    {
        $this->aiService = $aiService;
    }

    /**
     * POST /ai/recommend-career or /api/v1/ai/recommend-career
     */
    public function recommendCareer(Request $request): JsonResponse
    {
        $userId = Auth::id();

        // Support flexible inputs: skills (array or comma-separated string), career_id, bio, education
        $rawSkills = $request->input('skills');
        if (is_string($rawSkills)) {
            $skills = array_filter(array_map('trim', explode(',', $rawSkills)));
        } elseif (is_array($rawSkills)) {
            $skills = $rawSkills;
        } else {
            // Fallback to saved user_skills if available
            $skills = $userId
                ? UserSkill::where('user_id', $userId)->join('skills', 'user_skills.skill_id', '=', 'skills.id')->pluck('skills.name')->toArray()
                : [];
        }

        $payload = [
            'skills'     => $skills,
            'bio'        => $request->input('bio', 'Tech enthusiast looking for career development'),
            'education'  => $request->input('education', 'Software Development / Computer Science'),
            'career_id'  => $request->input('career_id'),
        ];

        try {
            $response = $this->aiService->getCareerRecommendation($payload);
            if (!$response) {
                throw new Exception('Failed to generate career recommendation from AI service.');
            }
            return response()->json([
                'success' => true,
                'data'    => $response,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * POST /ai/skill-gap or /ai/analyze-skills
     */
    public function analyzeSkills(Request $request): JsonResponse
    {
        $userId = Auth::id();

        $careerTitle = $request->input('career_title') ?? $request->input('target_role');
        if (!$careerTitle && $userId) {
            $latest = CareerRecommendation::where('user_id', $userId)->latest()->first();
            $careerTitle = $latest ? $latest->recommended_career : 'Full Stack Developer';
        }
        $careerTitle = $careerTitle ?: 'Full Stack Developer';

        $rawSkills = $request->input('current_skills') ?? $request->input('skills');
        if (is_string($rawSkills)) {
            $currentSkills = array_filter(array_map('trim', explode(',', $rawSkills)));
        } elseif (is_array($rawSkills)) {
            $currentSkills = $rawSkills;
        } else {
            $currentSkills = $userId
                ? UserSkill::where('user_id', $userId)->join('skills', 'user_skills.skill_id', '=', 'skills.id')->pluck('skills.name')->toArray()
                : ['HTML', 'CSS', 'JavaScript'];
        }

        try {
            $response = $this->aiService->getSkillGapAnalysis($careerTitle, $currentSkills);
            if (!$response) {
                throw new Exception('Failed to analyze skill gaps from AI service.');
            }
            return response()->json([
                'success' => true,
                'data'    => $response,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * POST /roadmaps/generate or /ai/generate-roadmap
     */
    public function generateRoadmap(Request $request): JsonResponse
    {
        $userId = Auth::id();

        $careerTitle = $request->input('career_title') ?? $request->input('target_role') ?? 'Software Engineer';
        $rawMissing = $request->input('missing_skills') ?? $request->input('skills') ?? ['Advanced Backend Architecture', 'System Design'];

        if (is_string($rawMissing)) {
            $missingSkills = array_filter(array_map('trim', explode(',', $rawMissing)));
        } else {
            $missingSkills = (array) $rawMissing;
        }

        try {
            $response = $this->aiService->generateRoadmap($careerTitle, $missingSkills);
            if (!$response) {
                throw new Exception('Failed to generate roadmap from AI service.');
            }
            return response()->json([
                'success' => true,
                'data'    => $response,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * POST /roadmaps/{id}/regenerate
     */
    public function regenerateRoadmap(Request $request, $id): JsonResponse
    {
        $userId = Auth::id();
        $roadmap = LearningRoadmap::where('user_id', $userId)->find($id);

        $careerTitle = $roadmap ? $roadmap->title : 'Software Engineer';
        $missingSkills = ['Advanced Best Practices', 'Optimization'];

        try {
            $response = $this->aiService->generateRoadmap($careerTitle, $missingSkills);
            if (!$response) {
                throw new Exception('Failed to regenerate roadmap.');
            }

            if ($roadmap) {
                $roadmap->update([
                    'ai_response' => $response,
                    'version'     => $roadmap->version + 1,
                ]);
            }

            return response()->json([
                'success' => true,
                'data'    => $response,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * POST /interviews/generate or /ai/prep-interview
     */
    public function prepInterview(Request $request): JsonResponse
    {
        $careerTitle = $request->input('career_title') ?? $request->input('target_role') ?? 'Full Stack Developer';
        $difficulty  = $request->input('difficulty', 'Intermediate');

        try {
            $response = $this->aiService->generateInterviewPrep($careerTitle, $difficulty);
            if (!$response) {
                throw new Exception('Failed to generate interview questions.');
            }
            return response()->json([
                'success' => true,
                'data'    => $response,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * POST /resources/generate or /ai/generate-resources
     */
    public function generateResources(Request $request): JsonResponse
    {
        $careerTitle = $request->input('career_title') ?? $request->input('target_role') ?? 'Full Stack Developer';

        try {
            $response = $this->aiService->generateResources($careerTitle);
            if (!$response) {
                throw new Exception('Failed to generate learning resources.');
            }
            return response()->json([
                'success' => true,
                'data'    => $response,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
