<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CareerRecommendation extends Model
{
    protected $fillable = [
        'user_id',
        'recommended_career',
        'confidence_score',
        'ai_response',
    ];

    protected $casts = [
        'ai_response'      => 'array',
        'confidence_score' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
