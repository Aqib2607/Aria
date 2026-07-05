<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CareerCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Software Engineering', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Data Science & AI',    'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Cybersecurity',        'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Cloud & DevOps',       'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Product Management',   'created_at' => now(), 'updated_at' => now()],
            ['name' => 'UI/UX Design',         'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('career_categories')->insert($categories);
    }
}
