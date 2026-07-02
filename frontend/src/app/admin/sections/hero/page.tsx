"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/adminService';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/admin/Toast';
import { LoadingSpinner } from '@/components/admin/LoadingSpinner';
import { ChevronLeft, Save } from 'lucide-react';

const heroFields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'subtitle', label: 'Subtitle', type: 'textarea', required: true },
    { name: 'cta_text', label: 'CTA Button Text', type: 'text', required: true },
    { name: 'cta_url', label: 'CTA URL', type: 'text', required: true },
    { name: 'background_image', label: 'Background Image URL', type: 'text', required: true },
];

export default function HeroSection() {
    const router = useRouter();
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { toasts, removeToast, success, error } = useToast();

    useEffect(() => {
        fetchHero();
    }, []);

    const fetchHero = async () => {
        try {
            setLoading(true);
            // ✅ Get hero from API - use getOne or getAll
            const result = await adminService.getOne('hero', 1);
            
            if (result.success && result.data) {
                setItem(result.data);
            } else {
                // ✅ If no hero exists, create empty object
                setItem({});
            }
        } catch (err: any) {
            // ✅ If error (404), set empty object for new hero
            setItem({});
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (name: string, value: any) => {
        setItem((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        
        try {
            const isUpdate = item?.id;
            const data = {
                ...item,
                is_active: true,
            };
                        
            let result;
            if (isUpdate) {
                result = await adminService.update('hero', item.id, data);
            } else {
                result = await adminService.create('hero', data);
            }
                        
            if (result.success) {
                success('Hero section saved successfully!');
                await fetchHero();
            } else {
                error(result.error || 'Failed to save');
            }
        } catch (err: any) {
            error(err.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    const renderField = (field: any) => {
        const value = item?.[field.name] ?? '';
        
        if (field.type === 'textarea') {
            return (
                <textarea
                    value={value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white min-h-[100px] transition"
                    rows={4}
                />
            );
        }
        return (
            <input
                type="text"
                value={value}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition"
            />
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <LoadingSpinner size="lg" text="Loading Hero Section..." />
            </div>
        );
    }

    return (
        <div>
            <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} onRemove={removeToast} />
                ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => router.push('/admin/sections')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hero Section</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        {item?.id ? 'Edit hero section' : 'Create hero section'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 space-y-5">
                {heroFields.map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {renderField(field)}
                    </div>
                ))}

                {/* ✅ Show status */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        item?.is_active !== false
                            ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                        {item?.is_active !== false ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                        (Hero is always active when saved)
                    </span>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
                >
                    <Save className="w-5 h-5" />
                    {saving ? 'Saving...' : item?.id ? 'Update Hero' : 'Create Hero'}
                </button>
            </form>
        </div>
    );
}