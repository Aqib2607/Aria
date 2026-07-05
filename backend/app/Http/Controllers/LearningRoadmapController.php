<?php

namespace App\Http\Controllers;

use App\Models\LearningRoadmap;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LearningRoadmapController extends Controller
{
    /**
     * Return all roadmaps for the authenticated user, including their steps.
     */
    public function index()
    {
        $userId  = Auth::id() ?? 1;
        $roadmaps = LearningRoadmap::where('user_id', $userId)
            ->with(['steps', 'career'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['data' => $roadmaps]);
    }

    /**
     * Store a newly created roadmap.
     */
    public function store(Request $request)
    {
        $userId = Auth::id() ?? 1;
        $data = $request->validate([
            'career_id'          => 'required|integer|exists:careers,id',
            'title'              => 'required|string',
            'estimated_duration' => 'nullable|string',
            'ai_response'        => 'nullable|array',
        ]);

        $roadmap = LearningRoadmap::create(array_merge($data, [
            'user_id' => $userId,
            'status'  => 'active',
        ]));

        return response()->json(['data' => $roadmap->load('steps')], 201);
    }

    /**
     * Display a single roadmap.
     */
    public function show(string $id)
    {
        $userId  = Auth::id() ?? 1;
        $roadmap = LearningRoadmap::where('user_id', $userId)
            ->with(['steps', 'career'])
            ->findOrFail($id);

        return response()->json(['data' => $roadmap]);
    }

    /**
     * Update a roadmap.
     */
    public function update(Request $request, string $id)
    {
        $userId  = Auth::id() ?? 1;
        $roadmap = LearningRoadmap::where('user_id', $userId)->findOrFail($id);

        $data = $request->validate([
            'title'              => 'sometimes|string',
            'estimated_duration' => 'nullable|string',
            'status'             => 'sometimes|string|in:active,completed,paused',
        ]);

        $roadmap->update($data);

        return response()->json(['data' => $roadmap->fresh('steps')]);
    }

    /**
     * Delete a roadmap.
     */
    public function destroy(string $id)
    {
        $userId  = Auth::id() ?? 1;
        $roadmap = LearningRoadmap::where('user_id', $userId)->findOrFail($id);
        $roadmap->delete();

        return response()->json(['message' => 'Roadmap deleted.']);
    }
}
