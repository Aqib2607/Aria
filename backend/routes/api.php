<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\LearningRoadmapController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\AiHistoryController;
use App\Http\Controllers\UserApiKeyController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    // This route needs to exist so Laravel can generate the verification email URL.
    // In a real SPA, it would redirect to the frontend to handle the token.
    return redirect('/dashboard?verified=1');
})->middleware(['signed'])->name('verification.verify');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Core Models
    Route::apiResource('profiles', UserProfileController::class);
    Route::apiResource('careers', CareerController::class);
    Route::apiResource('skills', SkillController::class);
    Route::apiResource('roadmaps', LearningRoadmapController::class);
    Route::apiResource('resources', ResourceController::class);
    Route::apiResource('ai-histories', AiHistoryController::class);
    Route::get('api-keys', [UserApiKeyController::class, 'index']);
    Route::post('api-keys', [UserApiKeyController::class, 'store']);
    Route::delete('api-keys/{provider}', [UserApiKeyController::class, 'destroy']);
    Route::post('api-keys/{provider}/active', [UserApiKeyController::class, 'setActive']);

    Route::get('/progress', [\App\Http\Controllers\ProgressController::class, 'index']);
    Route::post('/progress/complete-step', [\App\Http\Controllers\ProgressController::class, 'completeStep']);
    
    Route::get('/notifications', [\App\Http\Controllers\NotificationController::class, 'index']);
    Route::put('/notifications/{id}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead']);
    
    // AI Endpoints
    Route::post('/ai/recommend-career', [\App\Http\Controllers\AiController::class, 'recommendCareer']);
    Route::post('/ai/analyze-skills', [\App\Http\Controllers\AiController::class, 'analyzeSkills']);
    Route::post('/ai/generate-roadmap', [\App\Http\Controllers\AiController::class, 'generateRoadmap']);
    Route::post('/ai/prep-interview', [\App\Http\Controllers\AiController::class, 'prepInterview']);
    Route::post('/ai/generate-resources', [\App\Http\Controllers\AiController::class, 'generateResources']);
});

Route::middleware(['auth:sanctum', 'is_admin'])->prefix('admin')->group(function () {
    Route::get('/users', [AdminController::class, 'getUsers']);
    Route::put('/users/{id}', [AdminController::class, 'updateUser']);
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
    Route::get('/analytics', [AdminController::class, 'getAnalytics']);
});
