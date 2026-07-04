<?php

namespace App\Services;

use App\Models\LearningRoadmap;
use App\Models\RoadmapStep;
use Illuminate\Support\Facades\DB;

class ProgressService
{
    public function getProgress(int $userId)
    {
        $roadmaps = LearningRoadmap::where('user_id', $userId)->with('steps')->get();
        
        $progress = [];
        foreach ($roadmaps as $roadmap) {
            $totalSteps = $roadmap->steps->count();
            $completedSteps = DB::table('completed_steps')
                ->where('user_id', $userId)
                ->whereIn('roadmap_step_id', $roadmap->steps->pluck('id'))
                ->count();
                
            $percentage = $totalSteps > 0 ? round(($completedSteps / $totalSteps) * 100) : 0;
            
            $progress[] = [
                'roadmap_id' => $roadmap->id,
                'title' => $roadmap->title,
                'total_steps' => $totalSteps,
                'completed_steps' => $completedSteps,
                'percentage' => $percentage,
                'steps' => $roadmap->steps
            ];
        }
        
        return $progress;
    }

    public function completeStep(int $userId, int $stepId)
    {
        $step = RoadmapStep::findOrFail($stepId);
        
        // Ensure not already completed
        $exists = DB::table('completed_steps')
            ->where('user_id', $userId)
            ->where('roadmap_step_id', $stepId)
            ->exists();
            
        if (!$exists) {
            DB::table('completed_steps')->insert([
                'user_id' => $userId,
                'roadmap_step_id' => $stepId,
                'completed_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            $step->completion_status = 'completed';
            $step->save();
        }
        
        return $this->getProgress($userId);
    }
}
