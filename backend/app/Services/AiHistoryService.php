<?php

namespace App\Services;

use App\Models\AiHistory;

class AiHistoryService
{
    public function getHistoryForUser(int $userId)
    {
        return AiHistory::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
