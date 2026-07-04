<?php

namespace App\Services;

use App\Models\Career;

class CareerService
{
    public function getCareersForUser(int $userId)
    {
        return Career::where('user_id', $userId)->get();
    }

    public function createCareer(int $userId, array $data)
    {
        $data['user_id'] = $userId;
        return Career::create($data);
    }
}
