<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AiHistoryService;
use Illuminate\Support\Facades\Auth;

class AiHistoryController extends Controller
{
    protected AiHistoryService $aiHistoryService;

    public function __construct(AiHistoryService $aiHistoryService)
    {
        $this->aiHistoryService = $aiHistoryService;
    }

    public function index()
    {
        $userId = Auth::id() ?? 1;
        $history = $this->aiHistoryService->getHistoryForUser($userId);
        return response()->json(['data' => $history]);
    }
}
