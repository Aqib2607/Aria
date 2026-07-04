<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserProfileService;
use Illuminate\Support\Facades\Auth;

class UserProfileController extends Controller
{
    protected UserProfileService $profileService;

    public function __construct(UserProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    public function index()
    {
        $userId = Auth::id() ?? 1; // Fallback to 1 for testing if not auth
        $profiles = $this->profileService->getProfileForUser($userId);
        return response()->json(['data' => $profiles]);
    }

    public function store(Request $request)
    {
        $userId = Auth::id() ?? 1;
        $data = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'headline' => 'nullable|string',
            'bio' => 'nullable|string',
        ]);

        $profile = $this->profileService->createOrUpdateProfile($userId, $data);
        return response()->json(['data' => $profile], 201);
    }
}
