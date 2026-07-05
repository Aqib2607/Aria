<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RoadmapStep extends Model
{
    protected $fillable = [
        'roadmap_id',
        'title',
        'description',
        'sequence',
        'estimated_hours',
        'completion_status',
        'resource_url',
    ];

    public function roadmap(): BelongsTo
    {
        return $this->belongsTo(LearningRoadmap::class, 'roadmap_id');
    }
}
