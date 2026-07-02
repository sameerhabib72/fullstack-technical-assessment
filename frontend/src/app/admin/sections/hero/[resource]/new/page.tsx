"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/adminService';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/admin/Toast';
import { ChevronLeft, Save } from 'lucide-react';

const heroFields = [
    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Enter hero title' },
    { name: 'subtitle', label: 'Subtitle', type: 'textarea', required: true, placeholder: 'Enter hero subtitle' },
    { name: 'cta_text', label: 'CTA Button Text', type: 'text', required: true, placeholder: 'e.g. Get Started' },
    { name: 'cta_url', label: 'CTA URL', type: 'text', required: true, placeholder: 'e.g. #contact' },
    { name: 'background_image', label: 'Background Image URL', type: 'text', required: true, placeholder: 'https://images.unsplash.com/...' },
];

export default function CreateHero() {
    const router = useRouter();
    const [formData, setFormData] = useState<any>({
        is_active: true,
    });
    const [saving, setSaving] = useState(false);
    const { toasts, removeToast, success, error } = useToast();

    const handleChange = (name: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        
        try {
            const result = await adminService.create('hero', formData);
            if (result.success) {
                success('Hero created successfully!');
                setTimeout(() => router.push('/admin/sections/hero'), 500);
            } else {
                error(result.error || 'Failed to create hero');
            }
        } catch (err: any) {
            error(err.message || 'Failed to create');
        } finally {
            setSaving(false);
        }
    };

    const renderField = (field: any) => {
        const value = formData[field.name] ?? '';

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

    return (
        <div>
            <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} onRemove={removeToast} />
                ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => router.push('/admin/sections/hero')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Hero Section</h1>
                    <p className="text-gray-500 dark:text-gray-400">Add new hero section</p>
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

                {/* is_active toggle */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Status
                    </label>
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => handleChange('is_active', true)}
                            className={`px-4 py-2 rounded-lg transition font-medium ${
                                formData.is_active === true
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-200 dark:bg-slate-700 text-gray-500 hover:bg-gray-300'
                            }`}
                        >
                            Active
                        </button>
                        <button
                            type="button"
                            onClick={() => handleChange('is_active', false)}
                            className={`px-4 py-2 rounded-lg transition font-medium ${
                                formData.is_active === false
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-200 dark:bg-slate-700 text-gray-500 hover:bg-gray-300'
                            }`}
                        >
                            Inactive
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
                >
                    <Save className="w-5 h-5" />
                    {saving ? 'Creating...' : 'Create Hero'}
                </button>
            </form>
        </div>
    );
}