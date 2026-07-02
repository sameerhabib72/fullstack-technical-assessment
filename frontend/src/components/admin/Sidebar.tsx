"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
    LayoutDashboard, 
    Layers, 
    Users, 
    MessageSquare,
    LogOut,
    Briefcase,
    Star,
    Image,
    HelpCircle,
    Home,
    Shield
} from 'lucide-react';
// import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
    onLogout: () => void;
}

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { name: 'Sections', icon: Layers, href: '/admin/sections' },
    { name: 'Messages', icon: MessageSquare, href: '/admin/messages' },
];

const sectionItems = [
    { name: 'Hero', icon: LayoutDashboard, href: '/admin/sections/hero' },
    { name: 'About', icon: Layers, href: '/admin/sections/about' },
    { name: 'Services', icon: Briefcase, href: '/admin/sections/services' },
    { name: 'Features', icon: Star, href: '/admin/sections/features' },
    { name: 'Portfolio', icon: Image, href: '/admin/sections/portfolio' },
    { name: 'Testimonials', icon: MessageSquare, href: '/admin/sections/testimonials' },
    { name: 'Team', icon: Users, href: '/admin/sections/team' },
    { name: 'FAQ', icon: HelpCircle, href: '/admin/sections/faqs' },
];

export function Sidebar({ onLogout }: SidebarProps) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        return pathname === href || pathname?.startsWith(href + '/');
    };

    return (
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 fixed h-full overflow-y-auto z-50 flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-slate-800">
                <Link href="/admin/dashboard" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">TheDesign</span>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 tracking-wider uppercase">Admin Panel</p>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
                <div>
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-2">
                        Main
                    </p>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                                    isActive(item.href)
                                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                <div>
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-2">
                        Sections
                    </p>
                    {sectionItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                                    isActive(item.href)
                                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-slate-800 space-y-2">
                {/* <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
                    <ThemeToggle />
                </div> */}
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}