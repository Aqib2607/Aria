<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // ── Detect the real user already in the database ────────────────────────
        // After migrate:fresh --seed the real registered user keeps their data.
        // We seed career/roadmap/AI history etc. for them rather than creating
        // a duplicate account with a different email.
        $realUser = DB::table('users')->where('role', '!=', 'admin')->first();

        // ── Admin user ───────────────────────────────────────────────────────────
        $adminExists = DB::table('users')->where('email', 'admin@aria.com')->exists();
        $adminId = $adminExists
            ? DB::table('users')->where('email', 'admin@aria.com')->value('id')
            : DB::table('users')->insertGetId([
                'name'              => 'Aria Admin',
                'email'             => 'admin@aria.com',
                'password'          => Hash::make('password'),
                'role'              => 'admin',
                'email_verified_at' => now(),
                'created_at'        => now(),
                'updated_at'        => now(),
            ]);

        if (!DB::table('user_profiles')->where('user_id', $adminId)->exists()) {
            DB::table('user_profiles')->insert([
                'user_id'         => $adminId,
                'phone'           => '+880-1700-000001',
                'date_of_birth'   => '1990-01-15',
                'gender'          => 'male',
                'university'      => 'Bangladesh University of Engineering and Technology',
                'degree'          => 'B.Sc. in Computer Science',
                'graduation_year' => 2012,
                'bio'             => 'Platform administrator and career guidance expert with 10+ years in tech education.',
                'created_at'      => now(),
                'updated_at'      => now(),
            ]);
        }

        // ── Demo student 1 ───────────────────────────────────────────────────────
        // Use the real registered user if one exists; otherwise create aqib@aria.com
        if ($realUser) {
            $student1Id = $realUser->id;
        } else {
            $student1Id = DB::table('users')->insertGetId([
                'name'              => 'Aqib Jawwad',
                'email'             => 'aqib@aria.com',
                'password'          => Hash::make('password'),
                'role'              => 'user',
                'email_verified_at' => now(),
                'created_at'        => now(),
                'updated_at'        => now(),
            ]);
        }

        // Ensure profile exists for student 1
        if (!DB::table('user_profiles')->where('user_id', $student1Id)->exists()) {
            DB::table('user_profiles')->insert([
                'user_id'         => $student1Id,
                'phone'           => '+880-1700-000002',
                'date_of_birth'   => '2000-06-15',
                'gender'          => 'male',
                'university'      => 'North South University',
                'degree'          => 'B.Sc. in Computer Science & Engineering',
                'graduation_year' => 2023,
                'bio'             => 'Aspiring full-stack developer passionate about building scalable web applications and exploring the intersection of AI and software engineering.',
                'created_at'      => now(),
                'updated_at'      => now(),
            ]);
        }

        // Skills for student 1 — only if not already seeded
        if (!DB::table('user_skills')->where('user_id', $student1Id)->exists()) {
            $student1Skills = [
                ['user_id' => $student1Id, 'skill_id' => 2,  'proficiency_level' => 'intermediate', 'experience_months' => 18],
                ['user_id' => $student1Id, 'skill_id' => 3,  'proficiency_level' => 'beginner',      'experience_months' => 6],
                ['user_id' => $student1Id, 'skill_id' => 9,  'proficiency_level' => 'intermediate', 'experience_months' => 12],
                ['user_id' => $student1Id, 'skill_id' => 11, 'proficiency_level' => 'advanced',     'experience_months' => 24],
                ['user_id' => $student1Id, 'skill_id' => 12, 'proficiency_level' => 'intermediate', 'experience_months' => 10],
                ['user_id' => $student1Id, 'skill_id' => 40, 'proficiency_level' => 'intermediate', 'experience_months' => 20],
                ['user_id' => $student1Id, 'skill_id' => 16, 'proficiency_level' => 'beginner',     'experience_months' => 8],
            ];
            foreach ($student1Skills as &$s) {
                $s['created_at'] = now();
                $s['updated_at'] = now();
            }
            DB::table('user_skills')->insert($student1Skills);
        }

        // Career recommendation — only if not already seeded
        if (!DB::table('career_recommendations')->where('user_id', $student1Id)->exists()) {
            DB::table('career_recommendations')->insert([
                'user_id'            => $student1Id,
                'recommended_career' => 'Full-Stack Web Developer',
                'confidence_score'   => 87,
                'ai_response'        => json_encode([
                    'summary'    => 'Based on your strong React and JavaScript skills, a Full-Stack Developer role is an excellent fit.',
                    'strengths'  => ['React', 'HTML & CSS', 'JavaScript'],
                    'gaps'       => ['Node.js', 'PostgreSQL', 'System Design'],
                    'next_steps' => 'Focus on building backend proficiency with Node.js and explore RESTful API design.',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Skill gap analysis
        if (!DB::table('skill_gap_analyses')->where('user_id', $student1Id)->exists()) {
            DB::table('skill_gap_analyses')->insert([
                'user_id'         => $student1Id,
                'career_id'       => 1,
                'current_skills'  => json_encode(['JavaScript', 'TypeScript', 'React', 'HTML & CSS', 'Tailwind CSS', 'Git & GitHub', 'SQL']),
                'missing_skills'  => json_encode(['Node.js', 'PostgreSQL', 'RESTful APIs', 'System Design']),
                'recommendations' => json_encode([
                    'Build a REST API project using Node.js and Express.',
                    'Complete a PostgreSQL tutorial and connect it to your Node project.',
                    'Study system design fundamentals via books or online courses.',
                    'Deploy your project to a cloud provider like Vercel or Railway.',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Learning roadmap — only if none exist for this user
        if (!DB::table('learning_roadmaps')->where('user_id', $student1Id)->exists()) {
            $roadmapId = DB::table('learning_roadmaps')->insertGetId([
                'user_id'            => $student1Id,
                'career_id'          => 1,
                'title'              => 'Full-Stack Developer Roadmap',
                'version'            => 1,
                'estimated_duration' => '6 months',
                'ai_response'        => json_encode([
                    'generated_by' => 'Aria AI',
                    'note'         => 'Personalized based on your existing React and JavaScript skills.',
                ]),
                'status'     => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $steps = [
                ['title' => 'Master Node.js Fundamentals',     'description' => 'Learn Node.js runtime, event loop, modules, and npm. Build a simple HTTP server.', 'sequence' => 1, 'estimated_hours' => 40, 'completion_status' => 'completed'],
                ['title' => 'RESTful API Design with Express',  'description' => 'Build production-ready REST APIs using Express.js with JWT authentication.',          'sequence' => 2, 'estimated_hours' => 50, 'completion_status' => 'in_progress'],
                ['title' => 'PostgreSQL & Database Design',     'description' => 'Learn relational DB design, SQL queries, and connect PostgreSQL to Node.js.',           'sequence' => 3, 'estimated_hours' => 40, 'completion_status' => 'pending'],
                ['title' => 'TypeScript Deep Dive',             'description' => 'Advance TypeScript skills: generics, decorators, and advanced type patterns.',           'sequence' => 4, 'estimated_hours' => 30, 'completion_status' => 'pending'],
                ['title' => 'System Design Fundamentals',       'description' => 'Study load balancing, caching, microservices, and scalable architectures.',              'sequence' => 5, 'estimated_hours' => 60, 'completion_status' => 'pending'],
                ['title' => 'Deploy a Full-Stack Project',      'description' => 'Build and deploy a capstone full-stack application using your full skill set.',          'sequence' => 6, 'estimated_hours' => 80, 'completion_status' => 'pending'],
            ];

            $stepIds = [];
            foreach ($steps as $step) {
                $stepIds[] = DB::table('roadmap_steps')->insertGetId(array_merge($step, [
                    'roadmap_id' => $roadmapId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]));
            }

            // Mark first step as completed
            DB::table('completed_steps')->insert([
                'roadmap_step_id' => $stepIds[0],
                'user_id'         => $student1Id,
                'completed_at'    => now()->subDays(5),
                'created_at'      => now()->subDays(5),
                'updated_at'      => now()->subDays(5),
            ]);

            // Progress log
            DB::table('progress_logs')->insert([
                'user_id'              => $student1Id,
                'roadmap_id'           => $roadmapId,
                'completed_percentage' => 17,
                'completed_skills'     => json_encode(['Node.js Fundamentals']),
                'created_at'           => now(),
                'updated_at'           => now(),
            ]);
        }

        // Activity logs
        if (!DB::table('activity_logs')->where('user_id', $student1Id)->exists()) {
            $activities = [
                ['action' => 'login',                 'module' => 'auth',      'ip_address' => '192.168.1.1', 'device' => 'Chrome on Windows'],
                ['action' => 'career_recommendation', 'module' => 'career',    'ip_address' => '192.168.1.1', 'device' => 'Chrome on Windows'],
                ['action' => 'skill_gap_analysis',    'module' => 'skill_gap', 'ip_address' => '192.168.1.1', 'device' => 'Chrome on Windows'],
                ['action' => 'roadmap_generated',     'module' => 'roadmap',   'ip_address' => '192.168.1.1', 'device' => 'Chrome on Windows'],
                ['action' => 'step_completed',        'module' => 'roadmap',   'ip_address' => '192.168.1.1', 'device' => 'Chrome on Windows'],
            ];
            foreach ($activities as &$activity) {
                $activity['user_id']    = $student1Id;
                $activity['created_at'] = now()->subDays(rand(0, 6));
                $activity['updated_at'] = now();
            }
            DB::table('activity_logs')->insert($activities);
        }

        // Notifications
        if (!DB::table('notifications')->where('user_id', $student1Id)->exists()) {
            $notifications = [
                ['title' => 'Welcome to Aria! 🎉',         'message' => 'Your account is set up. Start by getting your career recommendation.',         'status' => 'read'],
                ['title' => 'Career Recommendation Ready',  'message' => 'Your AI-powered career recommendation is ready. Check it out!',                 'status' => 'read'],
                ['title' => 'Roadmap Generated',            'message' => 'Your personalized Full-Stack Developer roadmap has been created.',              'status' => 'read'],
                ['title' => 'Step Completed! 🏆',           'message' => 'You completed "Master Node.js Fundamentals". Keep up the momentum!',            'status' => 'unread'],
                ['title' => 'Weekly Progress Update',       'message' => "You are 17% through your roadmap. You're on track — keep going!",               'status' => 'unread'],
            ];
            foreach ($notifications as &$n) {
                $n['user_id']    = $student1Id;
                $n['created_at'] = now()->subDays(rand(0, 6));
                $n['updated_at'] = now();
            }
            DB::table('notifications')->insert($notifications);
        }

        // AI history
        if (!DB::table('ai_histories')->where('user_id', $student1Id)->exists()) {
            $aiHistories = [
                ['feature' => 'career_recommendation', 'prompt' => 'Based on my skills in React, JavaScript, and HTML/CSS, what career should I pursue?', 'response' => json_encode(['career' => 'Full-Stack Web Developer', 'confidence' => 87]), 'tokens_used' => 512, 'execution_time' => 1.84],
                ['feature' => 'skill_gap_analysis',    'prompt' => 'What skills am I missing to become a Full-Stack Developer?',                          'response' => json_encode(['missing' => ['Node.js', 'PostgreSQL', 'System Design']]),          'tokens_used' => 384, 'execution_time' => 1.21],
                ['feature' => 'roadmap_generation',    'prompt' => 'Generate a learning roadmap for me to become a Full-Stack Developer.',                 'response' => json_encode(['roadmap' => 'Full-Stack Developer Roadmap', 'steps' => 6]),           'tokens_used' => 768, 'execution_time' => 2.45],
            ];
            foreach ($aiHistories as &$ah) {
                $ah['user_id']    = $student1Id;
                $ah['created_at'] = now()->subDays(rand(0, 4));
                $ah['updated_at'] = now();
            }
            DB::table('ai_histories')->insert($aiHistories);
        }

        // Interview session
        if (!DB::table('interview_sessions')->where('user_id', $student1Id)->exists()) {
            $sessionId = DB::table('interview_sessions')->insertGetId([
                'user_id'         => $student1Id,
                'career_id'       => 1,
                'difficulty'      => 'medium',
                'total_questions' => 5,
                'score'           => 4,
                'created_at'      => now()->subDays(2),
                'updated_at'      => now()->subDays(2),
            ]);

            $questions = [
                ['question' => 'Explain the difference between == and === in JavaScript.',  'answer' => '=== checks type and value equality, == only checks value after type coercion.',         'explanation' => 'Always prefer === to avoid unexpected type coercion bugs.',      'type' => 'conceptual'],
                ['question' => 'What is the event loop in Node.js?',                        'answer' => 'A mechanism that allows Node.js to perform non-blocking I/O operations.',                 'explanation' => 'The event loop processes callback queues after synchronous code runs.', 'type' => 'conceptual'],
                ['question' => 'What are React hooks and why were they introduced?',        'answer' => 'Functions like useState and useEffect that let you use state in functional components.', 'explanation' => 'Hooks allow stateful logic without class components.',             'type' => 'conceptual'],
                ['question' => 'What is a foreign key in SQL?',                             'answer' => 'A column that references the primary key of another table to create a relationship.',    'explanation' => 'Foreign keys enforce referential integrity between tables.',       'type' => 'conceptual'],
                ['question' => 'What is the difference between GET and POST HTTP methods?', 'answer' => 'GET retrieves data; POST submits data to create or update a resource.',                  'explanation' => 'GET is idempotent and cacheable; POST is not.',                   'type' => 'conceptual'],
            ];
            foreach ($questions as $q) {
                DB::table('interview_questions')->insert(array_merge($q, [
                    'session_id' => $sessionId,
                    'created_at' => now()->subDays(2),
                    'updated_at' => now()->subDays(2),
                ]));
            }
        }

        // ── Demo student 2 ───────────────────────────────────────────────────────
        $sara = DB::table('users')->where('email', 'sara@aria.com')->first();
        if (!$sara) {
            $student2Id = DB::table('users')->insertGetId([
                'name'              => 'Sara Ahmed',
                'email'             => 'sara@aria.com',
                'password'          => Hash::make('password'),
                'role'              => 'user',
                'email_verified_at' => now(),
                'created_at'        => now()->subDays(3),
                'updated_at'        => now()->subDays(3),
            ]);

            DB::table('user_profiles')->insert([
                'user_id'         => $student2Id,
                'phone'           => '+880-1700-000003',
                'date_of_birth'   => '2001-03-22',
                'gender'          => 'female',
                'university'      => 'BRAC University',
                'degree'          => 'B.Sc. in Computer Science',
                'graduation_year' => 2024,
                'bio'             => 'Data science enthusiast with a love for statistics and machine learning.',
                'created_at'      => now()->subDays(3),
                'updated_at'      => now()->subDays(3),
            ]);

            DB::table('notifications')->insert([
                'user_id'    => $student2Id,
                'title'      => 'Welcome to Aria! 🎉',
                'message'    => 'Your account is all set. Start by taking the career quiz to get your personalized recommendation.',
                'status'     => 'unread',
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subDays(3),
            ]);
        }
    }
}
