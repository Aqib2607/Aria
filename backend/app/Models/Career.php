<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    protected $fillable = [
        'category_id',
        'title',
        'description',
        'average_duration',
        'difficulty',
        'salary_range',
        'demand_level',
        'target_role',
    ];
}
