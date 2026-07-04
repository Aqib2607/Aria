<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProgressService;
use Illuminate\Support\Facades\Auth;

class ProgressController extends Controller
{
    protected ProgressService $progressService;

    public function __construct(ProgressService $progressService)
    {
        $this->progressService = $progressService;
    }

    public function index()
    {
        $userId = Auth::id() ?? 1; // Fallback for dev
        $progress = $this->progressService->getProgress($userId);
        return response()->json(['data' => $progress]);
    }

    public function completeStep(Request $request)
    {
        $request->validate(['step_id' => 'required|integer']);
        $userId = Auth::id() ?? 1;
        $progress = $this->progressService->completeStep($userId, $request->step_id);
        
        return response()->json([
            'message' => 'Step completed successfully.',
            'data' => $progress
        ]);
    }
}
