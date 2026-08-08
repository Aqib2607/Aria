<?php

namespace App\Services;

use App\Models\Career;
use App\Models\CareerRecommendation;
use App\Models\Skill;
use App\Models\UserSkill;

class CareerService
{
    /**
     * Get the user's career recommendations (their chosen goals) and saved skills.
     */
    public function getCareersForUser(int $userId): array
    {
        $recommendations = CareerRecommendation::where('user_id', $userId)
            ->orderBy('updated_at', 'desc')
            ->get();

        $userSkills = UserSkill::where('user_id', $userId)
            ->join('skills', 'user_skills.skill_id', '=', 'skills.id')
            ->pluck('skills.name')
            ->toArray();

        $skillsString = implode(', ', $userSkills);

        if ($recommendations->isNotEmpty()) {
            return $recommendations->map(fn($r) => [
                'id'                    => $r->id,
                'target_role'           => $r->recommended_career,
                'confidence_score'      => $r->confidence_score,
                'ai_response'           => $r->ai_response,
                'current_skills'        => $userSkills,
                'current_skills_string' => $skillsString,
                'created_at'            => $r->created_at,
            ])->values()->toArray();
        }

        if (!empty($userSkills)) {
            return [[
                'id'                    => 0,
                'target_role'           => '',
                'current_skills'        => $userSkills,
                'current_skills_string' => $skillsString,
            ]];
        }

        return [];
    }

    public function createCareer(int $userId, array $data): CareerRecommendation
    {
        $targetRole = $data['target_role'];

        $recommendation = CareerRecommendation::updateOrCreate(
            ['user_id' => $userId],
            [
                'recommended_career' => $targetRole,
                'confidence_score'   => $data['confidence_score'] ?? 100,
                'ai_response'        => $data['ai_response'] ?? null,
            ]
        );

        if (isset($data['current_skills'])) {
            $rawSkills = $data['current_skills'];
            $skillNames = is_array($rawSkills)
                ? $rawSkills
                : array_filter(array_map('trim', explode(',', $rawSkills)));

            UserSkill::where('user_id', $userId)->delete();

            foreach ($skillNames as $name) {
                if (empty($name)) continue;
                $skill = Skill::firstOrCreate(['name' => $name]);
                UserSkill::firstOrCreate([
                    'user_id'  => $userId,
                    'skill_id' => $skill->id,
                ]);
            }
        }

        return $recommendation;
    }
}
