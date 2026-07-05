<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResourceCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Online Course',    'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Documentation',    'created_at' => now(), 'updated_at' => now()],
            ['name' => 'YouTube Channel',  'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Book',             'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Practice Platform','created_at' => now(), 'updated_at' => now()],
            ['name' => 'Blog / Article',   'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('resource_categories')->insert($categories);
    }
}
