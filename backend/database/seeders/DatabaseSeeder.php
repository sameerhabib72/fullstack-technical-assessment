<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{
    HeroSection,
    AboutSection,
    Service,
    Feature,
    PortfolioItem,
    Testimonial,
    TeamMember,
    Faq,
    User
};
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin User
        User::create([
            'name' => 'Admin',
            'email' => 'admin@thedesignsfirm.com',
            'password' => Hash::make('password123'),
        ]);

        // Hero
        HeroSection::create([
            'title' => 'Building Digital Experiences That Drive Success',
            'subtitle' => 'We are a creative digital agency helping businesses build powerful online presence.',
            'cta_text' => 'Get Started',
            'cta_url' => '#contact',
            'background_image' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
            'is_active' => true,
        ]);

        // About
        AboutSection::create([
            'title' => 'Transforming Ideas into Reality',
            'body' => 'With over 10 years of experience, our team of experts provides top-notch digital services to clients worldwide.',
            'image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
            'mission' => 'To empower businesses through technology.',
            'vision' => 'To be the global leader in digital innovation.',
        ]);

        // Services
        $services = [
            ['title' => 'Web Development', 'description' => 'Modern, responsive, and high-performance websites.', 'icon' => 'Globe'],
            ['title' => 'Mobile Apps', 'description' => 'Custom mobile applications for iOS and Android.', 'icon' => 'Smartphone'],
            ['title' => 'UI/UX Design', 'description' => 'Beautiful and intuitive designs for user engagement.', 'icon' => 'Palette'],
            ['title' => 'Digital Marketing', 'description' => 'Data-driven marketing strategies for growth.', 'icon' => 'Megaphone'],
            ['title' => 'Cloud Solutions', 'description' => 'Scalable and secure cloud infrastructure.', 'icon' => 'Cloud'],
            ['title' => 'Support & Maintenance', 'description' => '24/7 support to keep your business running.', 'icon' => 'Headphones'],
        ];
        foreach ($services as $index => $service) {
            Service::create(array_merge($service, ['sort_order' => $index, 'is_active' => true]));
        }

        // Features
        $features = [
            ['title' => 'Fast Performance', 'description' => 'Optimized for speed and efficiency.', 'icon' => 'Zap'],
            ['title' => 'Secure Data', 'description' => 'Bank-grade security for your information.', 'icon' => 'ShieldCheck'],
            ['title' => '24/7 Support', 'description' => 'Our experts are always here to help.', 'icon' => 'Headphones'],
            ['title' => 'Modern Tech', 'description' => 'Built with the latest stable technologies.', 'icon' => 'Rocket'],
        ];
        foreach ($features as $index => $feature) {
            Feature::create(array_merge($feature, ['sort_order' => $index]));
        }

        // Portfolio
        $portfolio = [
            ['title' => 'Filtle – Fitness Website', 'category' => 'Web Development', 'image' => 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80'],
            ['title' => 'Shopmax – eCommerce App', 'category' => 'Mobile App', 'image' => 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80'],
            ['title' => 'Finova – SaaS Platform', 'category' => 'Web Development', 'image' => 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80'],
            ['title' => 'Travelia – Travel Website', 'category' => 'Web Design', 'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80'],
            ['title' => 'Foodly – Restaurant App', 'category' => 'Mobile App', 'image' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80'],
        ];
        foreach ($portfolio as $index => $item) {
            PortfolioItem::create(array_merge($item, ['description' => '', 'sort_order' => $index]));
        }

        // Testimonials
        $testimonials = [
            ['client_name' => 'Michael Johnson', 'role' => 'CEO', 'company' => 'Filtle', 'quote' => 'Transformed our online presence!', 'rating' => 5],
            ['client_name' => 'Sarah Williams', 'role' => 'Marketing Head', 'company' => 'Shopmax', 'quote' => 'Professional and result-driven. Highly recommended.', 'rating' => 5],
            ['client_name' => 'David Brown', 'role' => 'Founder', 'company' => 'Finova', 'quote' => 'Their innovative solutions helped our SaaS grow fast.', 'rating' => 5],
        ];
        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }

        // Team
        $team = [
            ['name' => 'James Carter', 'role' => 'CEO & Founder', 'photo' => 'https://i.pravatar.cc/150?u=james', 'bio' => 'Tech visionary with 15+ years of experience.'],
            ['name' => 'Sophia Martinez', 'role' => 'Creative Director', 'photo' => 'https://i.pravatar.cc/150?u=sophia', 'bio' => 'Award-winning designer with a passion for innovation.'],
            ['name' => 'Daniel Wilson', 'role' => 'Lead Developer', 'photo' => 'https://i.pravatar.cc/150?u=daniel', 'bio' => 'Full-stack expert specializing in scalable solutions.'],
            ['name' => 'Olivia Taylor', 'role' => 'Marketing Lead', 'photo' => 'https://i.pravatar.cc/150?u=olivia', 'bio' => 'Strategic marketing professional driving growth.'],
        ];
        foreach ($team as $index => $member) {
            TeamMember::create(array_merge($member, ['sort_order' => $index]));
        }

        // FAQs
        $faqs = [
            ['question' => 'What services do you offer?', 'answer' => 'We offer web development, mobile apps, UI/UX design, digital marketing, cloud solutions, and 24/7 support.', 'category' => 'General'],
            ['question' => 'How long does a project take?', 'answer' => 'Typically 4-8 weeks depending on the complexity and scope.', 'category' => 'Timeline'],
            ['question' => 'Do you offer ongoing support?', 'answer' => 'Yes, we provide 24/7 support and maintenance packages.', 'category' => 'Support'],
            ['question' => 'How do we get started?', 'answer' => 'Simply contact us through the form and we will schedule a consultation.', 'category' => 'Getting Started'],
        ];
        foreach ($faqs as $index => $faq) {
            Faq::create(array_merge($faq, ['sort_order' => $index, 'is_active' => true]));
        }
    }
}