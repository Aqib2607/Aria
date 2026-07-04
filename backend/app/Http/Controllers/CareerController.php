<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CareerService;
use Illuminate\Support\Facades\Auth;

class CareerController extends Controller
{
    protected CareerService $careerService;

    public function __construct(CareerService $careerService)
    {
        $this->careerService = $careerService;
    }

    public function index()
    {
        $userId = Auth::id() ?? 1;
        $careers = $this->careerService->getCareersForUser($userId);
        return response()->json(['data' => $careers]);
    }

    public function store(Request $request)
    {
        $userId = Auth::id() ?? 1;
        $data = $request->validate([
            'target_role' => 'required|string',
            'industry' => 'nullable|string',
            'desired_salary' => 'nullable|numeric',
        ]);

        $career = $this->careerService->createCareer($userId, $data);
        return response()->json(['data' => $career], 201);
    }
}
