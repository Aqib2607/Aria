<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class LearningRoadmap extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'career_id',
        'title',
        'version',
        'estimated_duration',
        'ai_response',
        'status',
    ];

    protected $casts = [
        'ai_response' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function career(): BelongsTo
    {
        return $this->belongsTo(Career::class);
    }

    public function steps(): HasMany
    {
        return $this->hasMany(RoadmapStep::class, 'roadmap_id')->orderBy('sequence');
    }
}
