<?php

namespace App\Services;

use App\Models\User;
use App\Models\Career;
use App\Models\AiHistory;

class AdminService
{
    public function getAllUsers()
    {
        return User::all();
    }

    public function updateUserRole(int $userId, string $role)
    {
        $user = User::findOrFail($userId);
        $user->role = $role;
        $user->save();
        return $user;
    }

    public function deleteUser(int $userId)
    {
        $user = User::findOrFail($userId);
        return $user->delete();
    }

    public function getAnalytics()
    {
        return [
            'total_users' => User::count(),
            'total_careers' => Career::count(),
            'total_ai_requests' => AiHistory::count(),
        ];
    }
}
