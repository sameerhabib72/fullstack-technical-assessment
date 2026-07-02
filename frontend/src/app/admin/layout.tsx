"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';
import { Toast } from '@/components/admin/Toast';
import { useToast } from '@/hooks/useToast';
import { LoadingSpinner } from '@/components/admin/LoadingSpinner';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const { toasts, removeToast, success, error } = useToast();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && pathname !== '/admin/login') {
            router.push('/admin/login');
        }
        setLoading(false);
    }, [pathname, router]);

    const handleLogout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            success('Logged out successfully');
        } catch (err) {
            error('Failed to logout');
        }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => router.push('/admin/login'), 500);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
                <LoadingSpinner size="lg" text="Loading..." />
            </div>
        );
    }

    if (pathname === '/admin/login') {
        return (
            <>
                <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
                    {toasts.map(toast => (
                        <Toast key={toast.id} {...toast} onRemove={removeToast} />
                    ))}
                </div>
                {children}
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex">
            <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} onRemove={removeToast} />
                ))}
            </div>

            <Sidebar onLogout={handleLogout} />
            <main className="ml-64 flex-1 p-8 min-h-screen">
                {children}
            </main>
        </div>
    );
}