<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResourceSeeder extends Seeder
{
    public function run(): void
    {
        // category_id: 1=Online Course, 2=Documentation, 3=YouTube Channel,
        //              4=Book, 5=Practice Platform, 6=Blog/Article

        $resources = [
            // Software Engineering
            ['category_id' => 1, 'title' => 'The Odin Project',                  'url' => 'https://www.theodinproject.com',        'provider' => 'The Odin Project', 'resource_type' => 'course',    'difficulty' => 'beginner'],
            ['category_id' => 1, 'title' => 'CS50: Introduction to Computer Science', 'url' => 'https://cs50.harvard.edu/x/',       'provider' => 'Harvard / edX',    'resource_type' => 'course',    'difficulty' => 'beginner'],
            ['category_id' => 1, 'title' => 'Full Stack Open',                    'url' => 'https://fullstackopen.com',             'provider' => 'University of Helsinki', 'resource_type' => 'course', 'difficulty' => 'intermediate'],
            ['category_id' => 3, 'title' => 'Traversy Media',                     'url' => 'https://www.youtube.com/@TraversyMedia','provider' => 'YouTube',          'resource_type' => 'video',     'difficulty' => 'beginner'],
            ['category_id' => 3, 'title' => 'Fireship',                           'url' => 'https://www.youtube.com/@Fireship',     'provider' => 'YouTube',          'resource_type' => 'video',     'difficulty' => 'intermediate'],
            ['category_id' => 5, 'title' => 'LeetCode',                           'url' => 'https://leetcode.com',                  'provider' => 'LeetCode',         'resource_type' => 'practice',  'difficulty' => 'intermediate'],
            ['category_id' => 5, 'title' => 'HackerRank',                         'url' => 'https://www.hackerrank.com',            'provider' => 'HackerRank',       'resource_type' => 'practice',  'difficulty' => 'beginner'],
            ['category_id' => 2, 'title' => 'MDN Web Docs',                       'url' => 'https://developer.mozilla.org',         'provider' => 'Mozilla',          'resource_type' => 'docs',      'difficulty' => 'beginner'],
            ['category_id' => 4, 'title' => 'Clean Code by Robert C. Martin',     'url' => 'https://www.oreilly.com/library/view/clean-code-a/9780136083238/', 'provider' => "O'Reilly", 'resource_type' => 'book', 'difficulty' => 'intermediate'],

            // Data Science & AI
            ['category_id' => 1, 'title' => 'Machine Learning Specialization',    'url' => 'https://www.coursera.org/specializations/machine-learning-introduction', 'provider' => 'Coursera / DeepLearning.AI', 'resource_type' => 'course', 'difficulty' => 'intermediate'],
            ['category_id' => 1, 'title' => 'Deep Learning Specialization',       'url' => 'https://www.coursera.org/specializations/deep-learning', 'provider' => 'Coursera / DeepLearning.AI', 'resource_type' => 'course', 'difficulty' => 'advanced'],
            ['category_id' => 1, 'title' => 'Kaggle Learn',                       'url' => 'https://www.kaggle.com/learn',          'provider' => 'Kaggle',           'resource_type' => 'course',    'difficulty' => 'beginner'],
            ['category_id' => 3, 'title' => '3Blue1Brown - Neural Networks',      'url' => 'https://www.youtube.com/@3blue1brown',  'provider' => 'YouTube',          'resource_type' => 'video',     'difficulty' => 'intermediate'],
            ['category_id' => 5, 'title' => 'Kaggle Competitions',                'url' => 'https://www.kaggle.com/competitions',   'provider' => 'Kaggle',           'resource_type' => 'practice',  'difficulty' => 'advanced'],
            ['category_id' => 4, 'title' => 'Hands-On Machine Learning with Scikit-Learn', 'url' => 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/', 'provider' => "O'Reilly", 'resource_type' => 'book', 'difficulty' => 'intermediate'],

            // Cybersecurity
            ['category_id' => 1, 'title' => 'Google Cybersecurity Certificate',   'url' => 'https://www.coursera.org/professional-certificates/google-cybersecurity', 'provider' => 'Coursera / Google', 'resource_type' => 'course', 'difficulty' => 'beginner'],
            ['category_id' => 5, 'title' => 'TryHackMe',                          'url' => 'https://tryhackme.com',                 'provider' => 'TryHackMe',        'resource_type' => 'practice',  'difficulty' => 'beginner'],
            ['category_id' => 5, 'title' => 'Hack The Box',                       'url' => 'https://www.hackthebox.com',            'provider' => 'Hack The Box',     'resource_type' => 'practice',  'difficulty' => 'advanced'],
            ['category_id' => 2, 'title' => 'OWASP Top 10',                       'url' => 'https://owasp.org/www-project-top-ten/','provider' => 'OWASP',            'resource_type' => 'docs',      'difficulty' => 'intermediate'],

            // Cloud & DevOps
            ['category_id' => 1, 'title' => 'AWS Cloud Practitioner Essentials',  'url' => 'https://aws.amazon.com/training/learn-about/cloud-practitioner/', 'provider' => 'AWS', 'resource_type' => 'course', 'difficulty' => 'beginner'],
            ['category_id' => 1, 'title' => 'Docker & Kubernetes: The Practical Guide', 'url' => 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/', 'provider' => 'Udemy', 'resource_type' => 'course', 'difficulty' => 'intermediate'],
            ['category_id' => 2, 'title' => 'Kubernetes Documentation',           'url' => 'https://kubernetes.io/docs/',           'provider' => 'CNCF',             'resource_type' => 'docs',      'difficulty' => 'advanced'],
            ['category_id' => 3, 'title' => 'TechWorld with Nana - DevOps',       'url' => 'https://www.youtube.com/@TechWorldwithNana', 'provider' => 'YouTube',     'resource_type' => 'video',     'difficulty' => 'intermediate'],

            // Product Management
            ['category_id' => 1, 'title' => 'Product Management Fundamentals',    'url' => 'https://www.coursera.org/learn/uva-darden-digital-product-management', 'provider' => 'Coursera', 'resource_type' => 'course', 'difficulty' => 'beginner'],
            ['category_id' => 4, 'title' => 'Inspired: How to Create Tech Products', 'url' => 'https://www.svpg.com/books/inspired-how-to-create-tech-products-customers-love-2nd-edition/', 'provider' => 'SVPG', 'resource_type' => 'book', 'difficulty' => 'intermediate'],

            // UI/UX Design
            ['category_id' => 1, 'title' => 'Google UX Design Certificate',       'url' => 'https://www.coursera.org/professional-certificates/google-ux-design', 'provider' => 'Coursera / Google', 'resource_type' => 'course', 'difficulty' => 'beginner'],
            ['category_id' => 2, 'title' => 'Figma Documentation',                'url' => 'https://help.figma.com',               'provider' => 'Figma',            'resource_type' => 'docs',      'difficulty' => 'beginner'],
            ['category_id' => 3, 'title' => 'DesignCourse',                       'url' => 'https://www.youtube.com/@DesignCourse', 'provider' => 'YouTube',          'resource_type' => 'video',     'difficulty' => 'beginner'],
        ];

        foreach ($resources as &$resource) {
            $resource['created_at'] = now();
            $resource['updated_at'] = now();
        }

        DB::table('resources')->insert($resources);
    }
}
