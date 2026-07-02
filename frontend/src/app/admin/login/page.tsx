"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/adminService';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/admin/Toast';
import { LoadingSpinner } from '@/components/admin/LoadingSpinner';
// import { ThemeToggle } from '@/components/admin/ThemeToggle';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';

export default function AdminLogin() {
    const [email, setEmail] = useState('admin@thedesignsfirm.com');
    const [password, setPassword] = useState('password123');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { toasts, removeToast, success, error } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await adminService.login(email, password);
            if (result.success) {
                success('Login successful! Redirecting...');
                setTimeout(() => router.push('/admin/dashboard'), 500);
            } else {
                error(result.error || 'Invalid credentials. Please try again.');
            }
        } catch (err: any) {
            error(err.message || 'Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-4 transition-colors">
            <div className="fixed top-4 right-4 z-50">
                {/* <ThemeToggle /> */}
            </div>

            <div className="fixed top-4 right-16 z-50 space-y-3 max-w-md">
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} onRemove={removeToast} />
                ))}
            </div>

            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 transition-colors">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-blue-600 dark:text-blue-500" />
                    </div>
                    <h2 className="text-3xl font-bold">
                        <span className="text-blue-600 dark:text-blue-500">The</span>
                        <span className="text-gray-900 dark:text-white">Design</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Admin Login</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors"
                                placeholder="admin@thedesignsfirm.com"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-12 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <LoadingSpinner size="sm" /> : 'Login'}
                    </button>
                </form>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg transition-colors">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        Demo Credentials:<br />
                        Email: admin@thedesignsfirm.com<br />
                        Password: password123
                    </p>
                </div>
            </div>
        </div>
    );
}