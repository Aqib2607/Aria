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
use App\Http\Controllers\AiController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    return redirect('/dashboard?verified=1');
})->middleware(['signed'])->name('verification.verify');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Core Resource Models
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

    // Direct Base AI Endpoints
    Route::post('/ai/recommend-career', [AiController::class, 'recommendCareer']);
    Route::post('/ai/analyze-skills', [AiController::class, 'analyzeSkills']);
    Route::post('/ai/skill-gap', [AiController::class, 'analyzeSkills']);
    Route::post('/ai/generate-roadmap', [AiController::class, 'generateRoadmap']);
    Route::post('/roadmaps/generate', [AiController::class, 'generateRoadmap']);
    Route::post('/roadmaps/{id}/regenerate', [AiController::class, 'regenerateRoadmap']);
    Route::post('/ai/prep-interview', [AiController::class, 'prepInterview']);
    Route::post('/interviews/generate', [AiController::class, 'prepInterview']);
    Route::post('/ai/generate-resources', [AiController::class, 'generateResources']);
    Route::post('/resources/generate', [AiController::class, 'generateResources']);
    Route::get('/history', [AiHistoryController::class, 'index']);
    Route::get('/history/{id}', [AiHistoryController::class, 'show']);
    Route::delete('/history/{id}', [AiHistoryController::class, 'destroy']);

    // Documented Versioned API Group (/api/v1/...)
    Route::prefix('v1')->group(function () {
        Route::post('/ai/recommend-career', [AiController::class, 'recommendCareer']);
        Route::post('/ai/skill-gap', [AiController::class, 'analyzeSkills']);
        Route::post('/roadmaps/generate', [AiController::class, 'generateRoadmap']);
        Route::post('/roadmaps/{id}/regenerate', [AiController::class, 'regenerateRoadmap']);
        Route::post('/interviews/generate', [AiController::class, 'prepInterview']);
        Route::post('/resources/generate', [AiController::class, 'generateResources']);
        Route::get('/history', [AiHistoryController::class, 'index']);
        Route::get('/history/{id}', [AiHistoryController::class, 'show']);
        Route::delete('/history/{id}', [AiHistoryController::class, 'destroy']);

        Route::get('/profile', [UserProfileController::class, 'index']);
        Route::put('/profile', [UserProfileController::class, 'store']);
        Route::get('/careers', [CareerController::class, 'index']);
        Route::post('/careers', [CareerController::class, 'store']);
        Route::get('/skills', [SkillController::class, 'index']);
        Route::post('/skills', [SkillController::class, 'store']);
        Route::get('/roadmaps', [LearningRoadmapController::class, 'index']);
        Route::get('/roadmaps/{id}', [LearningRoadmapController::class, 'show']);
        Route::delete('/roadmaps/{id}', [LearningRoadmapController::class, 'destroy']);
    });
});

Route::middleware(['auth:sanctum', 'is_admin'])->prefix('admin')->group(function () {
    Route::get('/users', [AdminController::class, 'getUsers']);
    Route::put('/users/{id}', [AdminController::class, 'updateUser']);
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
    Route::get('/analytics', [AdminController::class, 'getAnalytics']);
});
