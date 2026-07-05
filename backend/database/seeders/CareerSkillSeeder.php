<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CareerSkillSeeder extends Seeder
{
    public function run(): void
    {
        // Skill IDs (from SkillSeeder order, 1-indexed):
        // 1=Python, 2=JavaScript, 3=TypeScript, 4=Java, 5=C++, 6=PHP, 7=Go, 8=Rust
        // 9=React, 10=Vue.js, 11=HTML&CSS, 12=Tailwind CSS
        // 13=Node.js, 14=Laravel, 15=Django, 16=SQL, 17=PostgreSQL, 18=MongoDB, 19=Redis
        // 20=Machine Learning, 21=Deep Learning, 22=Pandas, 23=NumPy, 24=TensorFlow, 25=Data Visualization
        // 26=AWS, 27=Docker, 28=Kubernetes, 29=CI/CD Pipelines, 30=Linux
        // 31=Network Security, 32=Penetration Testing, 33=Cryptography
        // 34=System Design, 35=Agile/Scrum, 36=Figma, 37=UX Research
        // 38=RESTful APIs, 39=GraphQL, 40=Git&GitHub

        // Career IDs (from CareerSeeder order):
        // 1=Full-Stack, 2=Backend, 3=Frontend, 4=Mobile
        // 5=Data Scientist, 6=ML Engineer, 7=Data Analyst
        // 8=Cybersecurity Analyst, 9=Penetration Tester
        // 10=DevOps Engineer, 11=Cloud Architect
        // 12=Product Manager, 13=UX/UI Designer

        $careerSkills = [
            // Full-Stack Developer (career 1)
            ['career_id' => 1, 'skill_id' => 2,  'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 1, 'skill_id' => 3,  'priority' => 2, 'required_level' => 'intermediate'],
            ['career_id' => 1, 'skill_id' => 9,  'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 1, 'skill_id' => 11, 'priority' => 1, 'required_level' => 'beginner'],
            ['career_id' => 1, 'skill_id' => 13, 'priority' => 2, 'required_level' => 'intermediate'],
            ['career_id' => 1, 'skill_id' => 16, 'priority' => 2, 'required_level' => 'intermediate'],
            ['career_id' => 1, 'skill_id' => 38, 'priority' => 2, 'required_level' => 'intermediate'],
            ['career_id' => 1, 'skill_id' => 40, 'priority' => 1, 'required_level' => 'beginner'],
            ['career_id' => 1, 'skill_id' => 34, 'priority' => 3, 'required_level' => 'intermediate'],

            // Backend Engineer (career 2)
            ['career_id' => 2, 'skill_id' => 6,  'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 2, 'skill_id' => 14, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 2, 'skill_id' => 16, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 2, 'skill_id' => 17, 'priority' => 2, 'required_level' => 'intermediate'],
            ['career_id' => 2, 'skill_id' => 19, 'priority' => 3, 'required_level' => 'beginner'],
            ['career_id' => 2, 'skill_id' => 38, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 2, 'skill_id' => 34, 'priority' => 2, 'required_level' => 'intermediate'],
            ['career_id' => 2, 'skill_id' => 40, 'priority' => 1, 'required_level' => 'beginner'],

            // Frontend Developer (career 3)
            ['career_id' => 3, 'skill_id' => 2,  'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 3, 'skill_id' => 3,  'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 3, 'skill_id' => 9,  'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 3, 'skill_id' => 11, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 3, 'skill_id' => 12, 'priority' => 2, 'required_level' => 'beginner'],
            ['career_id' => 3, 'skill_id' => 40, 'priority' => 1, 'required_level' => 'beginner'],
            ['career_id' => 3, 'skill_id' => 35, 'priority' => 3, 'required_level' => 'beginner'],

            // Mobile App Developer (career 4)
            ['career_id' => 4, 'skill_id' => 2,  'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 4, 'skill_id' => 3,  'priority' => 2, 'required_level' => 'intermediate'],
            ['career_id' => 4, 'skill_id' => 9,  'priority' => 2, 'required_level' => 'intermediate'],
            ['career_id' => 4, 'skill_id' => 38, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 4, 'skill_id' => 40, 'priority' => 1, 'required_level' => 'beginner'],

            // Data Scientist (career 5)
            ['career_id' => 5, 'skill_id' => 1,  'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 5, 'skill_id' => 20, 'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 5, 'skill_id' => 21, 'priority' => 2, 'required_level' => 'intermediate'],
            ['career_id' => 5, 'skill_id' => 22, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 5, 'skill_id' => 23, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 5, 'skill_id' => 25, 'priority' => 2, 'required_level' => 'intermediate'],
            ['career_id' => 5, 'skill_id' => 16, 'priority' => 2, 'required_level' => 'intermediate'],

            // ML Engineer (career 6)
            ['career_id' => 6, 'skill_id' => 1,  'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 6, 'skill_id' => 20, 'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 6, 'skill_id' => 21, 'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 6, 'skill_id' => 24, 'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 6, 'skill_id' => 27, 'priority' => 2, 'required_level' => 'intermediate'],
            ['career_id' => 6, 'skill_id' => 26, 'priority' => 3, 'required_level' => 'intermediate'],
            ['career_id' => 6, 'skill_id' => 34, 'priority' => 2, 'required_level' => 'advanced'],

            // Data Analyst (career 7)
            ['career_id' => 7, 'skill_id' => 1,  'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 7, 'skill_id' => 16, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 7, 'skill_id' => 22, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 7, 'skill_id' => 25, 'priority' => 1, 'required_level' => 'intermediate'],

            // Cybersecurity Analyst (career 8)
            ['career_id' => 8, 'skill_id' => 31, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 8, 'skill_id' => 33, 'priority' => 2, 'required_level' => 'intermediate'],
            ['career_id' => 8, 'skill_id' => 30, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 8, 'skill_id' => 16, 'priority' => 3, 'required_level' => 'beginner'],

            // Penetration Tester (career 9)
            ['career_id' => 9, 'skill_id' => 32, 'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 9, 'skill_id' => 31, 'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 9, 'skill_id' => 33, 'priority' => 2, 'required_level' => 'advanced'],
            ['career_id' => 9, 'skill_id' => 30, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 9, 'skill_id' => 1,  'priority' => 2, 'required_level' => 'intermediate'],

            // DevOps Engineer (career 10)
            ['career_id' => 10, 'skill_id' => 27, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 10, 'skill_id' => 28, 'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 10, 'skill_id' => 29, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 10, 'skill_id' => 26, 'priority' => 2, 'required_level' => 'intermediate'],
            ['career_id' => 10, 'skill_id' => 30, 'priority' => 1, 'required_level' => 'intermediate'],
            ['career_id' => 10, 'skill_id' => 1,  'priority' => 3, 'required_level' => 'beginner'],

            // Cloud Architect (career 11)
            ['career_id' => 11, 'skill_id' => 26, 'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 11, 'skill_id' => 27, 'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 11, 'skill_id' => 28, 'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 11, 'skill_id' => 34, 'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 11, 'skill_id' => 30, 'priority' => 2, 'required_level' => 'intermediate'],

            // Product Manager (career 12)
            ['career_id' => 12, 'skill_id' => 35, 'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 12, 'skill_id' => 25, 'priority' => 2, 'required_level' => 'intermediate'],
            ['career_id' => 12, 'skill_id' => 37, 'priority' => 2, 'required_level' => 'intermediate'],

            // UX/UI Designer (career 13)
            ['career_id' => 13, 'skill_id' => 36, 'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 13, 'skill_id' => 37, 'priority' => 1, 'required_level' => 'advanced'],
            ['career_id' => 13, 'skill_id' => 11, 'priority' => 2, 'required_level' => 'beginner'],
            ['career_id' => 13, 'skill_id' => 35, 'priority' => 3, 'required_level' => 'beginner'],
        ];

        foreach ($careerSkills as &$cs) {
            $cs['created_at'] = now();
            $cs['updated_at'] = now();
        }

        DB::table('career_skills')->insert($careerSkills);
    }
}
