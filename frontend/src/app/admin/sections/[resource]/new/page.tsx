"use client";
import { useParams, useRouter } from 'next/navigation';
import { adminService } from '@/services/adminService';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/admin/Toast';
import { LoadingSpinner } from '@/components/admin/LoadingSpinner';
import { ChevronLeft, Save, Plus } from 'lucide-react';
import { useState } from 'react';

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

const resourceFields: Record<string, any[]> = {
    hero: [
        { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Enter hero title' },
        { name: 'subtitle', label: 'Subtitle', type: 'textarea', required: true, placeholder: 'Enter hero subtitle' },
        { name: 'cta_text', label: 'CTA Button Text', type: 'text', required: true, placeholder: 'e.g. Get Started' },
        { name: 'cta_url', label: 'CTA URL', type: 'text', required: true, placeholder: 'e.g. #contact' },
        { name: 'background_image', label: 'Background Image URL', type: 'text', required: true, placeholder: 'https://images.unsplash.com/...' },
    ],
    about: [
        { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Enter about title' },
        { name: 'body', label: 'Body Content', type: 'textarea', required: true, placeholder: 'Enter about content' },
        { name: 'image', label: 'Image URL', type: 'text', placeholder: 'https://images.unsplash.com/...' },
        { name: 'mission', label: 'Mission', type: 'textarea', placeholder: 'Enter mission statement' },
        { name: 'vision', label: 'Vision', type: 'textarea', placeholder: 'Enter vision statement' },
    ],
    services: [
        { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Enter service title' },
        { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Enter service description' },
        { name: 'icon', label: 'Icon Name', type: 'text', required: true, placeholder: 'e.g. Globe, Smartphone' },
        { name: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '0' },
    ],
    features: [
        { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Enter feature title' },
        { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Enter feature description' },
        { name: 'icon', label: 'Icon Name', type: 'text', required: true, placeholder: 'e.g. Zap, ShieldCheck' },
        { name: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '0' },
    ],
    portfolio: [
        { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Enter project title' },
        { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter project description' },
        { name: 'image', label: 'Image URL', type: 'text', required: true, placeholder: 'https://images.unsplash.com/...' },
        { name: 'category', label: 'Category', type: 'text', required: true, placeholder: 'e.g. Web Development' },
        { name: 'url', label: 'Project URL', type: 'text', placeholder: 'https://example.com' },
        { name: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '0' },
    ],
    testimonials: [
        { name: 'client_name', label: 'Client Name', type: 'text', required: true, placeholder: 'Enter client name' },
        { name: 'role', label: 'Role', type: 'text', required: true, placeholder: 'e.g. CEO' },
        { name: 'company', label: 'Company', type: 'text', required: true, placeholder: 'Enter company name' },
        { name: 'quote', label: 'Quote', type: 'textarea', required: true, placeholder: 'Enter testimonial quote' },
        { name: 'avatar', label: 'Avatar URL', type: 'text', placeholder: 'https://i.pravatar.cc/150?u=...' },
        { name: 'rating', label: 'Rating (1-5)', type: 'number', placeholder: '5' },
    ],
    team: [
        { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Enter member name' },
        { name: 'role', label: 'Role', type: 'text', required: true, placeholder: 'e.g. Lead Developer' },
        { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Enter member bio' },
        { name: 'photo', label: 'Photo URL', type: 'text', required: true, placeholder: 'https://i.pravatar.cc/150?u=...' },
        { name: 'linkedin_url', label: 'LinkedIn URL', type: 'text', placeholder: 'https://linkedin.com/...' },
        { name: 'twitter_url', label: 'Twitter URL', type: 'text', placeholder: 'https://twitter.com/...' },
        { name: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '0' },
    ],
    faqs: [
        { name: 'question', label: 'Question', type: 'text', required: true, placeholder: 'Enter FAQ question' },
        { name: 'answer', label: 'Answer', type: 'textarea', required: true, placeholder: 'Enter FAQ answer' },
        { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g. General' },
        { name: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '0' },
    ],
};

export default function CreateResource() {
    const params = useParams();
    const router = useRouter();
    const resource = params.resource as string;
    const label = resourceLabels[resource] || resource;
    const fields = resourceFields[resource] || [];

    const [formData, setFormData] = useState<any>({});
    const [saving, setSaving] = useState(false);
    const { toasts, removeToast, success, error } = useToast();

    const handleChange = (name: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const result = await adminService.create(resource, formData);
        if (result.success) {
            success(`${label} created successfully!`);
            setTimeout(() => router.push(`/admin/sections/${resource}`), 500);
        } else {
            error(result.error || 'Failed to create item');
        }
        setSaving(false);
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

    if (!fields.length) {
        return <div className="text-center py-10 text-red-500">Resource not found</div>;
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
                        Create {label}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">Add a new {label.toLowerCase()}</p>
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

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
                >
                    <Save className="w-5 h-5" />
                    {saving ? 'Creating...' : 'Create Item'}
                </button>
            </form>
        </div>
    );
}