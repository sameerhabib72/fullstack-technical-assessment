"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminService } from '@/services/adminService';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/admin/Toast';
import { LoadingSpinner } from '@/components/admin/LoadingSpinner';
import { StatsCard } from '@/components/admin/StatsCard';
import { 
    LayoutDashboard, 
    Layers, 
    Users, 
    MessageSquare,
    Briefcase,
    Star,
    Image,
    HelpCircle,
    Plus,
    TrendingUp,
    Clock,
    Mail,
    CheckCircle,
    ArrowRight
} from 'lucide-react';

const sections = [
    { name: 'Hero', icon: LayoutDashboard, href: '/admin/sections/hero', count: 1, color: 'blue' },
    { name: 'About', icon: Layers, href: '/admin/sections/about', count: 1, color: 'purple' },
    { name: 'Services', icon: Briefcase, href: '/admin/sections/services', count: 6, color: 'green' },
    { name: 'Features', icon: Star, href: '/admin/sections/features', count: 4, color: 'yellow' },
    { name: 'Portfolio', icon: Image, href: '/admin/sections/portfolio', count: 6, color: 'pink' },
    { name: 'Testimonials', icon: MessageSquare, href: '/admin/sections/testimonials', count: 3, color: 'indigo' },
    { name: 'Team', icon: Users, href: '/admin/sections/team', count: 4, color: 'orange' },
    { name: 'FAQ', icon: HelpCircle, href: '/admin/sections/faqs', count: 4, color: 'red' },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalSections: 0,
        totalItems: 0,
        messages: 0,
        unread: 0,
    });
    const [loading, setLoading] = useState(true);
    const { toasts, removeToast, success, error } = useToast();

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const result = await adminService.getStats();
            if (result.success) {
                setStats(result.data);
            } else {
                error('Failed to load stats');
            }
        } catch (err: any) {
            error(err.message || 'Failed to load dashboard');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <LoadingSpinner size="lg" text="Loading dashboard..." />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your website.</p>
                </div>
                <Link
                    href="/admin/sections"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Manage Sections
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    label="Total Sections"
                    value={stats.totalSections}
                    icon={Layers}
                    color="blue"
                    subtitle="All available sections"
                />
                <StatsCard
                    label="Total Items"
                    value={stats.totalItems}
                    icon={LayoutDashboard}
                    color="purple"
                    subtitle="Across all sections"
                />
                <StatsCard
                    label="Messages"
                    value={stats.messages}
                    icon={Mail}
                    color="green"
                    subtitle="Total received"
                />
                <StatsCard
                    label="Unread"
                    value={stats.unread}
                    icon={Clock}
                    color="red"
                    subtitle="Need attention"
                />
            </div>

            {/* Quick Access */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Quick Access
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <Link
                                key={section.name}
                                href={section.href}
                                className="group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 hover:shadow-xl hover:border-blue-500 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 bg-${section.color}-50 dark:bg-${section.color}-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition`}>
                                        <Icon className={`w-5 h-5 text-${section.color}-600 dark:text-${section.color}-400`} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{section.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{section.count} items</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                                    Manage
                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}