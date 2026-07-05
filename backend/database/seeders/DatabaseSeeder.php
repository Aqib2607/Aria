<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Lookup / reference tables first
        $this->call(CareerCategorySeeder::class);
        $this->call(ResourceCategorySeeder::class);
        $this->call(SkillSeeder::class);

        // 2. Main entity tables
        $this->call(CareerSeeder::class);
        $this->call(ResourceSeeder::class);

        // 3. Pivot tables
        $this->call(CareerSkillSeeder::class);
        $this->call(CareerResourceSeeder::class);

        // 4. Users and all related user data
        $this->call(UserSeeder::class);
    }
}
