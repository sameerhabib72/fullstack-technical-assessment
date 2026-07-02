"use client";
import Link from 'next/link';
import { 
    LayoutDashboard, 
    Layers, 
    Users, 
    MessageSquare,
    Briefcase,
    Star,
    Image,
    HelpCircle,
    ArrowRight,
    Grid3x3
} from 'lucide-react';

const sections = [
    { name: 'Hero Section', icon: LayoutDashboard, href: '/admin/sections/hero', count: 'Single', color: 'blue' },
    { name: 'About Section', icon: Layers, href: '/admin/sections/about', count: 'Single', color: 'purple' },
    { name: 'Services', icon: Briefcase, href: '/admin/sections/services', count: 'Multiple', color: 'green' },
    { name: 'Features', icon: Star, href: '/admin/sections/features', count: 'Multiple', color: 'yellow' },
    { name: 'Portfolio', icon: Image, href: '/admin/sections/portfolio', count: 'Multiple', color: 'pink' },
    { name: 'Testimonials', icon: MessageSquare, href: '/admin/sections/testimonials', count: 'Multiple', color: 'indigo' },
    { name: 'Team', icon: Users, href: '/admin/sections/team', count: 'Multiple', color: 'orange' },
    { name: 'FAQ', icon: HelpCircle, href: '/admin/sections/faqs', count: 'Multiple', color: 'red' },
];

const colors = {
    blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    purple: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
    green: 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    pink: 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400',
    indigo: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    orange: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400',
    red: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400',
};

export default function AllSections() {
    return (
        <div>
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Grid3x3 className="w-8 h-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Sections</h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Manage all website sections from one place</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <Link
                            key={section.name}
                            href={section.href}
                            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 hover:shadow-xl hover:border-blue-500 transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[section.color as keyof typeof colors]}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{section.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{section.count} record</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                                Manage Section
                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}