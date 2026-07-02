"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminService } from '@/services/adminService';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/admin/Toast';
import { LoadingSpinner } from '@/components/admin/LoadingSpinner';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Edit, Trash2, Plus, ChevronLeft, Check, X, Grid3x3 } from 'lucide-react';

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

const resourceListFields: Record<string, string[]> = {
    hero: ['title', 'cta_text'],
    about: ['title'],
    services: ['title', 'icon'],
    features: ['title'],
    portfolio: ['title', 'category'],
    testimonials: ['client_name', 'company'],
    team: ['name', 'role'],
    faqs: ['question'],
};

export default function ResourceList() {
    const params = useParams();
    const router = useRouter();
    const resource = params.resource as string;
    const label = resourceLabels[resource] || resource;
    const listFields = resourceListFields[resource] || ['title'];

    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const { toasts, removeToast, success, error } = useToast();

    useEffect(() => {
        fetchItems();
    }, [resource]);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const result = await adminService.getAll(resource);
            setItems(result.data || []);
        } catch (err: any) {
            error('Failed to fetch items');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        const result = await adminService.delete(resource, deleteId);
        if (result.success) {
            success('Item deleted successfully');
            await fetchItems();
        } else {
            error(result.error || 'Failed to delete');
        }
        setDeleteId(null);
    };

    const handleToggleStatus = async (id: number) => {
        const result = await adminService.toggleStatus(resource, id);
        if (result.success) {
            success('Status toggled successfully');
            await fetchItems();
        } else {
            error(result.error || 'Failed to toggle status');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <LoadingSpinner size="lg" text={`Loading ${label}...`} />
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

            <ConfirmDialog
                isOpen={!!deleteId}
                title="Delete Item"
                message="Are you sure you want to delete this item? This action cannot be undone."
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/admin/sections')}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{label}</h1>
                        <p className="text-gray-500 dark:text-gray-400">{items.length} items found</p>
                    </div>
                </div>
                <Link
                    href={`/admin/sections/${resource}/new`}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                    <Plus className="w-5 h-5" />
                    Add New
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
                {items.length === 0 ? (
                    <div className="p-12 text-center">
                        <Grid3x3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No items found</p>
                        <Link
                            href={`/admin/sections/${resource}/new`}
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mt-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add your first item
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-slate-800">
                                <tr>
                                    {listFields.map((field) => (
                                        <th key={field} className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {field.replace('_', ' ')}
                                        </th>
                                    ))}
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
                                {items.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                                        {listFields.map((field) => (
                                            <td key={field} className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                {item[field] || '-'}
                                            </td>
                                        ))}
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleStatus(item.id)}
                                                className={`px-3 py-1 text-xs font-medium rounded-full transition ${
                                                    item.is_active !== false
                                                        ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-200'
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200'
                                                }`}
                                            >
                                                {item.is_active !== false ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/sections/${resource}/${item.id}/edit`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteId(item.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}