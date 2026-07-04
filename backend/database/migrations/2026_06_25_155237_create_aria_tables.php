<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('phone')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('gender')->nullable();
            $table->string('university')->nullable();
            $table->string('degree')->nullable();
            $table->year('graduation_year')->nullable();
            $table->text('bio')->nullable();
            $table->string('profile_photo')->nullable();
            $table->timestamps();
        });

        Schema::create('career_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('career_categories')->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('average_duration')->nullable();
            $table->string('difficulty')->nullable();
            $table->string('salary_range')->nullable();
            $table->string('demand_level')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('level')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('career_skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('career_id')->constrained('careers')->cascadeOnDelete();
            $table->foreignId('skill_id')->constrained('skills')->cascadeOnDelete();
            $table->integer('priority')->default(1);
            $table->string('required_level')->nullable();
            $table->timestamps();
        });

        Schema::create('user_skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('skill_id')->constrained('skills')->cascadeOnDelete();
            $table->string('proficiency_level')->nullable();
            $table->integer('experience_months')->default(0);
            $table->timestamps();
        });

        Schema::create('career_recommendations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('recommended_career');
            $table->integer('confidence_score')->default(0);
            $table->json('ai_response')->nullable();
            $table->timestamps();
        });

        Schema::create('skill_gap_analyses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('career_id')->constrained('careers')->cascadeOnDelete();
            $table->json('current_skills')->nullable();
            $table->json('missing_skills')->nullable();
            $table->json('recommendations')->nullable();
            $table->timestamps();
        });

        Schema::create('learning_roadmaps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('career_id')->constrained('careers')->cascadeOnDelete();
            $table->string('title');
            $table->integer('version')->default(1);
            $table->string('estimated_duration')->nullable();
            $table->json('ai_response')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('roadmap_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('roadmap_id')->constrained('learning_roadmaps')->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('sequence');
            $table->integer('estimated_hours')->default(0);
            $table->string('completion_status')->default('pending');
            $table->timestamps();
        });

        Schema::create('resource_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('resource_categories')->nullOnDelete();
            $table->string('title');
            $table->string('url');
            $table->string('provider')->nullable();
            $table->string('resource_type')->nullable();
            $table->string('difficulty')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('career_resources', function (Blueprint $table) {
            $table->id();
            $table->foreignId('career_id')->constrained('careers')->cascadeOnDelete();
            $table->foreignId('resource_id')->constrained('resources')->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('interview_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('career_id')->constrained('careers')->cascadeOnDelete();
            $table->string('difficulty');
            $table->integer('total_questions')->default(0);
            $table->integer('score')->default(0);
            $table->timestamps();
        });

        Schema::create('interview_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('interview_sessions')->cascadeOnDelete();
            $table->text('question');
            $table->text('answer')->nullable();
            $table->text('explanation')->nullable();
            $table->string('type')->nullable();
            $table->timestamps();
        });

        Schema::create('progress_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('roadmap_id')->constrained('learning_roadmaps')->cascadeOnDelete();
            $table->integer('completed_percentage')->default(0);
            $table->json('completed_skills')->nullable();
            $table->timestamps();
        });

        Schema::create('completed_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('roadmap_step_id')->constrained('roadmap_steps')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamp('completed_at')->useCurrent();
            $table->timestamps();
        });

        Schema::create('ai_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('feature');
            $table->text('prompt');
            $table->json('response')->nullable();
            $table->integer('tokens_used')->default(0);
            $table->float('execution_time')->default(0);
            $table->timestamps();
        });

        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('title');
            $table->text('message');
            $table->string('status')->default('unread');
            $table->timestamps();
        });

        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('action');
            $table->string('module')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('device')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('ai_histories');
        Schema::dropIfExists('completed_steps');
        Schema::dropIfExists('progress_logs');
        Schema::dropIfExists('interview_questions');
        Schema::dropIfExists('interview_sessions');
        Schema::dropIfExists('career_resources');
        Schema::dropIfExists('resources');
        Schema::dropIfExists('resource_categories');
        Schema::dropIfExists('roadmap_steps');
        Schema::dropIfExists('learning_roadmaps');
        Schema::dropIfExists('skill_gap_analyses');
        Schema::dropIfExists('career_recommendations');
        Schema::dropIfExists('user_skills');
        Schema::dropIfExists('career_skills');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('careers');
        Schema::dropIfExists('career_categories');
        Schema::dropIfExists('user_profiles');
    }
};
