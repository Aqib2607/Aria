<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSkill extends Model
{
    protected $fillable = ['user_id', 'skill_id', 'proficiency_level', 'experience_months'];

    public function skill(): BelongsTo
    {
        return $this->belongsTo(Skill::class);
    }
}
