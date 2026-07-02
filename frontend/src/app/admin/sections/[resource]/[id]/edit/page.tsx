"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { adminService } from '@/services/adminService';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/admin/Toast';
import { LoadingSpinner } from '@/components/admin/LoadingSpinner';
import { ChevronLeft, Save } from 'lucide-react';

const resourceLabels: Record<string, string> = {
    hero: 'Hero Section',
    about: 'About Section',
    services: 'Services',
    features: 'Features',
    portfolio: 'Portfolio',
    testimonials: 'Testimonials',
    team: 'Team Members',
    faqs: 'FAQs',
};

// ✅ Hero specific fields
const heroFields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'subtitle', label: 'Subtitle', type: 'textarea', required: true },
    { name: 'cta_text', label: 'CTA Button Text', type: 'text', required: true },
    { name: 'cta_url', label: 'CTA URL', type: 'text', required: true },
    { name: 'background_image', label: 'Background Image URL', type: 'text', required: true },
];

const resourceFields: Record<string, any[]> = {
    hero: heroFields,
    about: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'body', label: 'Body Content', type: 'textarea', required: true },
        { name: 'image', label: 'Image URL', type: 'text' },
        { name: 'mission', label: 'Mission', type: 'textarea' },
        { name: 'vision', label: 'Vision', type: 'textarea' },
    ],
    services: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'icon', label: 'Icon Name', type: 'text', required: true },
        { name: 'sort_order', label: 'Sort Order', type: 'number' },
    ],
    features: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'icon', label: 'Icon Name', type: 'text', required: true },
        { name: 'sort_order', label: 'Sort Order', type: 'number' },
    ],
    portfolio: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'image', label: 'Image URL', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'text', required: true },
        { name: 'url', label: 'Project URL', type: 'text' },
        { name: 'sort_order', label: 'Sort Order', type: 'number' },
    ],
    testimonials: [
        { name: 'client_name', label: 'Client Name', type: 'text', required: true },
        { name: 'role', label: 'Role', type: 'text', required: true },
        { name: 'company', label: 'Company', type: 'text', required: true },
        { name: 'quote', label: 'Quote', type: 'textarea', required: true },
        { name: 'avatar', label: 'Avatar URL', type: 'text' },
        { name: 'rating', label: 'Rating (1-5)', type: 'number' },
    ],
    team: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'role', label: 'Role', type: 'text', required: true },
        { name: 'bio', label: 'Bio', type: 'textarea' },
        { name: 'photo', label: 'Photo URL', type: 'text', required: true },
        { name: 'linkedin_url', label: 'LinkedIn URL', type: 'text' },
        { name: 'twitter_url', label: 'Twitter URL', type: 'text' },
        { name: 'sort_order', label: 'Sort Order', type: 'number' },
    ],
    faqs: [
        { name: 'question', label: 'Question', type: 'text', required: true },
        { name: 'answer', label: 'Answer', type: 'textarea', required: true },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'sort_order', label: 'Sort Order', type: 'number' },
    ],
};

export default function EditResource() {
    const params = useParams();
    const router = useRouter();
    const resource = params.resource as string;
    const id = parseInt(params.id as string);
    const label = resourceLabels[resource] || resource;
    const fields = resourceFields[resource] || [];

    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { toasts, removeToast, success, error } = useToast();

    useEffect(() => {
        if (resource && id) {
            fetchItem();
        }
    }, [resource, id]);

    const fetchItem = async () => {
        try {
            setLoading(true);
            const result = await adminService.getOne(resource, id);
            setItem(result.data || {});
        } catch (err: any) {
            error(err.message || 'Failed to fetch item');
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
            const result = await adminService.update(resource, id, item);
            
            if (result.success) {
                success(`${label} updated successfully!`);
                setTimeout(() => router.push(`/admin/sections/${resource}`), 500);
            } else {
                error(result.error || 'Failed to update item');
            }
        } catch (err: any) {
            error(err.message || 'Failed to update');
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
        if (field.type === 'number') {
            return (
                <input
                    type="number"
                    value={value}
                    onChange={(e) => handleChange(field.name, parseInt(e.target.value) || 0)}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition"
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
                <LoadingSpinner size="lg" text={`Loading ${label}...`} />
            </div>
        );
    }

    if (!fields.length) {
        return (
            <div className="text-center py-10 text-red-500">
                Resource "{resource}" not found
            </div>
        );
    }

    if (!item) {
        return (
            <div className="text-center py-10 text-gray-500">
                Item not found
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
                    onClick={() => router.push(`/admin/sections/${resource}`)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Edit {label}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">Update {label.toLowerCase()} details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 space-y-5">
                {fields.map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {renderField(field)}
                    </div>
                ))}

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {saving ? 'Saving...' : 'Update Item'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push(`/admin/sections/${resource}`)}
                        className="px-6 py-3 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}