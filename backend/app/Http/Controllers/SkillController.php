<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserSkill;
use Illuminate\Support\Facades\Auth;

class SkillController extends Controller
{
    /**
     * Display a listing of the user's skills.
     */
    public function index()
    {
        $userId = Auth::id() ?? 1;
        $skills = UserSkill::where('user_id', $userId)
            ->join('skills', 'user_skills.skill_id', '=', 'skills.id')
            ->select('skills.id', 'skills.name', 'skills.description', 'skills.level', 'user_skills.proficiency_level')
            ->get();

        return response()->json(['data' => $skills]);
    }
}
