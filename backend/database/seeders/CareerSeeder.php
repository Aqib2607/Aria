<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CareerSeeder extends Seeder
{
    public function run(): void
    {
        // category_id references: 1=Software Engineering, 2=Data Science & AI,
        // 3=Cybersecurity, 4=Cloud & DevOps, 5=Product Management, 6=UI/UX Design

        $careers = [
            [
                'category_id'       => 1,
                'target_role'       => 'Full-Stack Developer',
                'title'             => 'Full-Stack Web Developer',
                'description'       => 'Build and maintain both front-end and back-end components of web applications. Work with modern frameworks, databases, and cloud services to deliver end-to-end solutions.',
                'average_duration'  => '12-18 months',
                'difficulty'        => 'intermediate',
                'salary_range'      => '$70,000 - $130,000',
                'demand_level'      => 'high',
            ],
            [
                'category_id'       => 1,
                'target_role'       => 'Backend Developer',
                'title'             => 'Backend Software Engineer',
                'description'       => 'Design and implement server-side logic, APIs, and database interactions. Focus on performance, scalability, and security of web services.',
                'average_duration'  => '10-14 months',
                'difficulty'        => 'intermediate',
                'salary_range'      => '$75,000 - $140,000',
                'demand_level'      => 'high',
            ],
            [
                'category_id'       => 1,
                'target_role'       => 'Frontend Developer',
                'title'             => 'Frontend Developer',
                'description'       => 'Create responsive and accessible user interfaces using modern JavaScript frameworks. Collaborate with designers to bring mockups to life.',
                'average_duration'  => '8-12 months',
                'difficulty'        => 'beginner',
                'salary_range'      => '$60,000 - $115,000',
                'demand_level'      => 'high',
            ],
            [
                'category_id'       => 1,
                'target_role'       => 'Mobile Developer',
                'title'             => 'Mobile App Developer',
                'description'       => 'Develop native or cross-platform mobile applications for iOS and Android using frameworks like React Native or Flutter.',
                'average_duration'  => '10-16 months',
                'difficulty'        => 'intermediate',
                'salary_range'      => '$70,000 - $135,000',
                'demand_level'      => 'high',
            ],
            [
                'category_id'       => 2,
                'target_role'       => 'Data Scientist',
                'title'             => 'Data Scientist',
                'description'       => 'Analyze complex datasets to extract meaningful insights. Build and deploy predictive models using machine learning techniques to drive business decisions.',
                'average_duration'  => '14-20 months',
                'difficulty'        => 'advanced',
                'salary_range'      => '$90,000 - $160,000',
                'demand_level'      => 'very high',
            ],
            [
                'category_id'       => 2,
                'target_role'       => 'ML Engineer',
                'title'             => 'Machine Learning Engineer',
                'description'       => 'Design, build, and productionize machine learning systems at scale. Bridge the gap between data science research and engineering.',
                'average_duration'  => '16-24 months',
                'difficulty'        => 'advanced',
                'salary_range'      => '$100,000 - $175,000',
                'demand_level'      => 'very high',
            ],
            [
                'category_id'       => 2,
                'target_role'       => 'Data Analyst',
                'title'             => 'Data Analyst',
                'description'       => 'Collect, process, and perform statistical analyses on data. Create dashboards and reports to communicate findings to stakeholders.',
                'average_duration'  => '8-12 months',
                'difficulty'        => 'intermediate',
                'salary_range'      => '$55,000 - $95,000',
                'demand_level'      => 'high',
            ],
            [
                'category_id'       => 3,
                'target_role'       => 'Security Analyst',
                'title'             => 'Cybersecurity Analyst',
                'description'       => 'Monitor, detect, and respond to security threats and incidents. Implement and maintain security controls to protect organizational assets.',
                'average_duration'  => '12-18 months',
                'difficulty'        => 'intermediate',
                'salary_range'      => '$70,000 - $120,000',
                'demand_level'      => 'very high',
            ],
            [
                'category_id'       => 3,
                'target_role'       => 'Penetration Tester',
                'title'             => 'Ethical Hacker / Penetration Tester',
                'description'       => 'Simulate cyberattacks to identify vulnerabilities in systems, networks, and applications before malicious actors can exploit them.',
                'average_duration'  => '14-20 months',
                'difficulty'        => 'advanced',
                'salary_range'      => '$80,000 - $145,000',
                'demand_level'      => 'high',
            ],
            [
                'category_id'       => 4,
                'target_role'       => 'DevOps Engineer',
                'title'             => 'DevOps Engineer',
                'description'       => 'Streamline software delivery by automating CI/CD pipelines, managing infrastructure as code, and fostering collaboration between dev and ops teams.',
                'average_duration'  => '12-18 months',
                'difficulty'        => 'intermediate',
                'salary_range'      => '$85,000 - $150,000',
                'demand_level'      => 'very high',
            ],
            [
                'category_id'       => 4,
                'target_role'       => 'Cloud Architect',
                'title'             => 'Cloud Solutions Architect',
                'description'       => 'Design and oversee the implementation of cloud-based infrastructure and services. Guide organizations in their cloud migration and optimization strategies.',
                'average_duration'  => '18-24 months',
                'difficulty'        => 'advanced',
                'salary_range'      => '$110,000 - $190,000',
                'demand_level'      => 'very high',
            ],
            [
                'category_id'       => 5,
                'target_role'       => 'Product Manager',
                'title'             => 'Product Manager',
                'description'       => 'Define product vision, strategy, and roadmap. Work cross-functionally with engineering, design, and business teams to deliver products that users love.',
                'average_duration'  => '12-18 months',
                'difficulty'        => 'intermediate',
                'salary_range'      => '$85,000 - $155,000',
                'demand_level'      => 'high',
            ],
            [
                'category_id'       => 6,
                'target_role'       => 'UX Designer',
                'title'             => 'UX/UI Designer',
                'description'       => 'Research, design, and iterate on user experiences. Create wireframes, prototypes, and high-fidelity designs to solve real user problems beautifully.',
                'average_duration'  => '10-14 months',
                'difficulty'        => 'intermediate',
                'salary_range'      => '$65,000 - $120,000',
                'demand_level'      => 'high',
            ],
        ];

        foreach ($careers as &$career) {
            $career['created_at'] = now();
            $career['updated_at'] = now();
        }

        DB::table('careers')->insert($careers);
    }
}
