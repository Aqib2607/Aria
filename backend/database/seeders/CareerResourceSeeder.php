<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CareerResourceSeeder extends Seeder
{
    public function run(): void
    {
        // Map resources to careers (career_id → resource_ids)
        // Resource IDs from ResourceSeeder (1-indexed order):
        // 1=Odin Project, 2=CS50, 3=Full Stack Open, 4=Traversy Media, 5=Fireship
        // 6=LeetCode, 7=HackerRank, 8=MDN Web Docs, 9=Clean Code
        // 10=ML Specialization, 11=Deep Learning Spec, 12=Kaggle Learn, 13=3Blue1Brown
        // 14=Kaggle Competitions, 15=Hands-On ML
        // 16=Google Cybersecurity, 17=TryHackMe, 18=Hack The Box, 19=OWASP Top 10
        // 20=AWS Cloud Practitioner, 21=Docker & K8s, 22=Kubernetes Docs, 23=TechWorld Nana
        // 24=PM Fundamentals, 25=Inspired Book
        // 26=Google UX Design, 27=Figma Docs, 28=DesignCourse

        $careerResources = [
            // Full-Stack (1)
            ['career_id' => 1, 'resource_id' => 1],
            ['career_id' => 1, 'resource_id' => 3],
            ['career_id' => 1, 'resource_id' => 4],
            ['career_id' => 1, 'resource_id' => 6],
            ['career_id' => 1, 'resource_id' => 8],
            ['career_id' => 1, 'resource_id' => 9],

            // Backend (2)
            ['career_id' => 2, 'resource_id' => 2],
            ['career_id' => 2, 'resource_id' => 6],
            ['career_id' => 2, 'resource_id' => 7],
            ['career_id' => 2, 'resource_id' => 9],

            // Frontend (3)
            ['career_id' => 3, 'resource_id' => 1],
            ['career_id' => 3, 'resource_id' => 4],
            ['career_id' => 3, 'resource_id' => 5],
            ['career_id' => 3, 'resource_id' => 8],

            // Mobile (4)
            ['career_id' => 4, 'resource_id' => 5],
            ['career_id' => 4, 'resource_id' => 6],

            // Data Scientist (5)
            ['career_id' => 5, 'resource_id' => 10],
            ['career_id' => 5, 'resource_id' => 12],
            ['career_id' => 5, 'resource_id' => 13],
            ['career_id' => 5, 'resource_id' => 15],

            // ML Engineer (6)
            ['career_id' => 6, 'resource_id' => 10],
            ['career_id' => 6, 'resource_id' => 11],
            ['career_id' => 6, 'resource_id' => 14],
            ['career_id' => 6, 'resource_id' => 15],

            // Data Analyst (7)
            ['career_id' => 7, 'resource_id' => 12],
            ['career_id' => 7, 'resource_id' => 13],

            // Cybersecurity Analyst (8)
            ['career_id' => 8, 'resource_id' => 16],
            ['career_id' => 8, 'resource_id' => 17],
            ['career_id' => 8, 'resource_id' => 19],

            // Penetration Tester (9)
            ['career_id' => 9, 'resource_id' => 17],
            ['career_id' => 9, 'resource_id' => 18],
            ['career_id' => 9, 'resource_id' => 19],

            // DevOps (10)
            ['career_id' => 10, 'resource_id' => 21],
            ['career_id' => 10, 'resource_id' => 22],
            ['career_id' => 10, 'resource_id' => 23],

            // Cloud Architect (11)
            ['career_id' => 11, 'resource_id' => 20],
            ['career_id' => 11, 'resource_id' => 21],
            ['career_id' => 11, 'resource_id' => 22],

            // Product Manager (12)
            ['career_id' => 12, 'resource_id' => 24],
            ['career_id' => 12, 'resource_id' => 25],

            // UX/UI Designer (13)
            ['career_id' => 13, 'resource_id' => 26],
            ['career_id' => 13, 'resource_id' => 27],
            ['career_id' => 13, 'resource_id' => 28],
        ];

        foreach ($careerResources as &$cr) {
            $cr['created_at'] = now();
            $cr['updated_at'] = now();
        }

        DB::table('career_resources')->insert($careerResources);
    }
}
