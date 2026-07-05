<?php

namespace App\Services;

use App\Models\Career;
use App\Models\CareerRecommendation;

class CareerService
{
    /**
     * Get the user's career recommendations (their chosen goals),
     * falling back to the global careers catalog if none exist.
     */
    public function getCareersForUser(int $userId): array
    {
        // Fetch the user's AI-generated career recommendations
        $recommendations = CareerRecommendation::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        if ($recommendations->isNotEmpty()) {
            return $recommendations->map(fn($r) => [
                'id'                 => $r->id,
                'target_role'        => $r->recommended_career,
                'confidence_score'   => $r->confidence_score,
                'ai_response'        => $r->ai_response,
                'created_at'         => $r->created_at,
            ])->values()->toArray();
        }

        // No recommendations yet — return empty so the widget shows "No target set"
        return [];
    }

    public function createCareer(int $userId, array $data): CareerRecommendation
    {
        return CareerRecommendation::create([
            'user_id'            => $userId,
            'recommended_career' => $data['target_role'],
            'confidence_score'   => $data['confidence_score'] ?? 0,
            'ai_response'        => $data['ai_response'] ?? null,
        ]);
    }
}
