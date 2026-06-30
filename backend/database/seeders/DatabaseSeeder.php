<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HeroSection;
use App\Models\AboutSection;
use App\Models\Service;
use App\Models\Feature;
use App\Models\PortfolioItem;
use App\Models\Testimonial;
use App\Models\TeamMember;
use App\Models\Faq;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Hero Section
        HeroSection::create([
            'title' => 'Future-Ready Digital Solutions',
            'subtitle' => 'We build high-performance websites and applications that drive business growth.',
            'cta_text' => 'Start Your Project',
            'cta_url' => '#contact',
            'background_image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
        ]);

        // 2. About Section
        AboutSection::create([
            'title' => 'Transforming Ideas into Reality',
            'body' => 'With over 10 years of experience, our team of experts provides top-notch digital services to clients worldwide.',
            'image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
            'mission' => 'To empower businesses through technology.',
            'vision' => 'To be the global leader in digital innovation.'
        ]);

        // 3. Services (Min 6 Required)
        $services = [
            ['title' => 'Web Development', 'description' => 'Scalable Next.js and Laravel applications.', 'icon' => 'Code'],
            ['title' => 'Mobile Apps', 'description' => 'Cross-platform apps for iOS and Android.', 'icon' => 'Smartphone'],
            ['title' => 'UI/UX Design', 'description' => 'User-centric designs that convert visitors.', 'icon' => 'Palette'],
            ['title' => 'Cloud Solutions', 'description' => 'Secure AWS and Azure cloud management.', 'icon' => 'Cloud'],
            ['title' => 'SEO Strategy', 'description' => 'Rank higher on Google and drive organic traffic.', 'icon' => 'Search'],
            ['title' => 'AI Integration', 'description' => 'Automate your workflow with Smart AI tools.', 'icon' => 'Cpu'],
        ];
        foreach ($services as $idx => $s) {
            Service::create(array_merge($s, ['sort_order' => $idx, 'is_active' => true]));
        }

        // 4. Features (Min 4 Required)
        $features = [
            ['title' => 'Fast Performance', 'description' => 'Optimized for speed and efficiency.', 'icon' => 'Zap'],
            ['title' => 'Secure Data', 'description' => 'Bank-grade security for your information.', 'icon' => 'ShieldCheck'],
            ['title' => '24/7 Support', 'description' => 'Our experts are always here to help.', 'icon' => 'Headphones'],
            ['title' => 'Modern Tech', 'description' => 'Built with the latest stable technologies.', 'icon' => 'Rocket'],
        ];
        foreach ($features as $idx => $f) {
            Feature::create(array_merge($f, ['sort_order' => $idx]));
        }

        // 5. Portfolio Items
        PortfolioItem::create([
            'title' => 'E-commerce Platform',
            'description' => 'A full-featured online store built with Next.js.',
            'image' => 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80',
            'category' => 'Web App',
            'sort_order' => 1
        ]);

        // 6. Testimonials
        Testimonial::create([
            'client_name' => 'John Doe',
            'role' => 'CEO',
            'company' => 'Tech Corp',
            'quote' => 'They delivered our project on time and exceeded our expectations.',
            'rating' => 5
        ]);

        // 7. Team Members
        TeamMember::create([
            'name' => 'Sarah Connor',
            'role' => 'Lead Developer',
            'bio' => 'Expert in Full Stack Development with 8 years of experience.',
            'photo' => 'https://i.pravatar.cc/150?u=sarah',
            'linkedin_url' => 'https://linkedin.com',
            'sort_order' => 1
        ]);

        // 8. FAQs
        Faq::create([
            'question' => 'How long does a project take?',
            'answer' => 'Typically 4-8 weeks depending on the complexity.',
            'category' => 'General',
            'sort_order' => 1
        ]);
    }
}