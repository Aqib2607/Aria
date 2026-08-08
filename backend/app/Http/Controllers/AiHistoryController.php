<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AiHistoryService;
use App\Models\AiHistory;
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

    public function destroy($id)
    {
        $userId = Auth::id() ?? 1;
        $historyItem = AiHistory::where('id', $id)->where('user_id', $userId)->first();

        if (!$historyItem) {
            return response()->json(['message' => 'History record not found'], 404);
        }

        $historyItem->delete();
        return response()->json(['message' => 'History item deleted successfully']);
    }
}
