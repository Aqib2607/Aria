<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            // Programming languages
            ['name' => 'Python',              'description' => 'General-purpose programming language widely used in data science and web development.', 'level' => 'beginner',     'status' => 'active'],
            ['name' => 'JavaScript',          'description' => 'Core language of the web for building interactive front-end and back-end applications.', 'level' => 'beginner',     'status' => 'active'],
            ['name' => 'TypeScript',          'description' => 'Typed superset of JavaScript that compiles to plain JavaScript.',                       'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'Java',                'description' => 'Strongly-typed object-oriented language used in enterprise applications.',               'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'C++',                 'description' => 'Systems programming language known for performance-critical applications.',               'level' => 'advanced',     'status' => 'active'],
            ['name' => 'PHP',                 'description' => 'Server-side scripting language designed for web development.',                            'level' => 'beginner',     'status' => 'active'],
            ['name' => 'Go',                  'description' => 'Statically typed, compiled language designed for simplicity and efficiency.',             'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'Rust',                'description' => 'Systems language focused on safety, speed, and concurrency.',                             'level' => 'advanced',     'status' => 'active'],

            // Frontend
            ['name' => 'React',               'description' => 'JavaScript library for building user interfaces.',                                       'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'Vue.js',              'description' => 'Progressive JavaScript framework for building UIs.',                                      'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'HTML & CSS',          'description' => 'Foundational languages for structuring and styling web pages.',                           'level' => 'beginner',     'status' => 'active'],
            ['name' => 'Tailwind CSS',        'description' => 'Utility-first CSS framework for rapid UI development.',                                   'level' => 'beginner',     'status' => 'active'],

            // Backend & Databases
            ['name' => 'Node.js',             'description' => 'JavaScript runtime for building server-side applications.',                               'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'Laravel',             'description' => 'PHP web framework with elegant syntax for web artisans.',                                 'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'Django',              'description' => 'High-level Python web framework that encourages rapid development.',                       'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'SQL',                 'description' => 'Structured Query Language for managing relational databases.',                             'level' => 'beginner',     'status' => 'active'],
            ['name' => 'PostgreSQL',          'description' => 'Advanced open-source relational database system.',                                        'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'MongoDB',             'description' => 'NoSQL document database for flexible data storage.',                                      'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'Redis',               'description' => 'In-memory data store used for caching and messaging.',                                    'level' => 'intermediate', 'status' => 'active'],

            // Data Science & ML
            ['name' => 'Machine Learning',    'description' => 'Building algorithms that learn patterns from data.',                                      'level' => 'advanced',     'status' => 'active'],
            ['name' => 'Deep Learning',       'description' => 'Neural network-based machine learning techniques.',                                       'level' => 'advanced',     'status' => 'active'],
            ['name' => 'Pandas',              'description' => 'Python library for data manipulation and analysis.',                                      'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'NumPy',               'description' => 'Python library for numerical computations.',                                             'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'TensorFlow',          'description' => 'Open-source machine learning framework by Google.',                                       'level' => 'advanced',     'status' => 'active'],
            ['name' => 'Data Visualization',  'description' => 'Representing data insights graphically using tools like Matplotlib or Tableau.',          'level' => 'intermediate', 'status' => 'active'],

            // Cloud & DevOps
            ['name' => 'AWS',                 'description' => 'Amazon Web Services cloud computing platform.',                                           'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'Docker',              'description' => 'Platform for developing, shipping, and running applications in containers.',               'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'Kubernetes',          'description' => 'Container orchestration system for automating deployment and scaling.',                    'level' => 'advanced',     'status' => 'active'],
            ['name' => 'CI/CD Pipelines',     'description' => 'Automated workflows for building, testing, and deploying software.',                      'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'Linux',               'description' => 'Open-source operating system widely used in servers and development.',                    'level' => 'beginner',     'status' => 'active'],

            // Security
            ['name' => 'Network Security',    'description' => 'Protecting computer networks from unauthorized access and attacks.',                      'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'Penetration Testing', 'description' => 'Simulating cyberattacks to evaluate system security.',                                   'level' => 'advanced',     'status' => 'active'],
            ['name' => 'Cryptography',        'description' => 'Techniques for securing information using encryption.',                                   'level' => 'advanced',     'status' => 'active'],

            // Soft Skills / Other
            ['name' => 'System Design',       'description' => 'Designing scalable and maintainable software architectures.',                             'level' => 'advanced',     'status' => 'active'],
            ['name' => 'Agile / Scrum',       'description' => 'Iterative project management methodologies for software teams.',                          'level' => 'beginner',     'status' => 'active'],
            ['name' => 'Figma',               'description' => 'Collaborative interface design tool.',                                                    'level' => 'beginner',     'status' => 'active'],
            ['name' => 'UX Research',         'description' => 'Investigating user needs and behaviors to inform product design.',                         'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'RESTful APIs',        'description' => 'Designing and consuming REST-based web services.',                                        'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'GraphQL',             'description' => 'Query language for APIs and a runtime for fulfilling queries.',                            'level' => 'intermediate', 'status' => 'active'],
            ['name' => 'Git & GitHub',        'description' => 'Version control and collaboration tools for software development.',                        'level' => 'beginner',     'status' => 'active'],
        ];

        foreach ($skills as &$skill) {
            $skill['created_at'] = now();
            $skill['updated_at'] = now();
        }

        DB::table('skills')->insert($skills);
    }
}
