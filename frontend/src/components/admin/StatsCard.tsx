"use client";
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    label: string;
    value: number;
    icon: LucideIcon;
    color: 'blue' | 'green' | 'purple' | 'red' | 'yellow' | 'indigo' | 'pink' | 'orange';
    subtitle?: string;
}

const colors = {
    blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
    red: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    indigo: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    pink: 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400',
    orange: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400',
};

export function StatsCard({ label, value, icon: Icon, color, subtitle }: StatsCardProps) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${colors[color]} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}