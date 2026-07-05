<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiHistory extends Model
{
    protected $fillable = [
        'user_id',
        'feature',
        'prompt',
        'response',
        'tokens_used',
        'execution_time',
    ];

    protected $casts = [
        'response' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
