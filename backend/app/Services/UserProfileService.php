<?php

namespace App\Services;

use App\Models\UserProfile;
use Illuminate\Support\Facades\Auth;

class UserProfileService
{
    public function getProfileForUser(int $userId)
    {
        return UserProfile::where('user_id', $userId)->get();
    }

    public function createOrUpdateProfile(int $userId, array $data)
    {
        return UserProfile::updateOrCreate(
            ['user_id' => $userId],
            $data
        );
    }
}
