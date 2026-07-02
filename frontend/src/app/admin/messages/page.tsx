"use client";
import { useEffect, useState } from 'react';
import { adminService } from '@/services/adminService';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/admin/Toast';
import { LoadingSpinner } from '@/components/admin/LoadingSpinner';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Mail, CheckCircle, Trash2, Clock, Inbox, User, Building, Calendar } from 'lucide-react';

export default function MessagesPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const { toasts, removeToast, success, error } = useToast();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const result = await adminService.getMessages();
            setMessages(result.data || []);
        } catch (err) {
            error('Failed to fetch messages');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id: number) => {
        const result = await adminService.markMessageAsRead(id);
        if (result.success) {
            success('Message marked as read');
            await fetchMessages();
        } else {
            error(result.error || 'Failed to mark as read');
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        const result = await adminService.deleteMessage(deleteId);
        if (result.success) {
            success('Message deleted successfully');
            await fetchMessages();
        } else {
            error(result.error || 'Failed to delete message');
        }
        setDeleteId(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <LoadingSpinner size="lg" text="Loading messages..." />
            </div>
        );
    }

    const unreadCount = messages.filter(m => !m.is_read).length;

    return (
        <div>
            <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} onRemove={removeToast} />
                ))}
            </div>

            <ConfirmDialog
                isOpen={!!deleteId}
                title="Delete Message"
                message="Are you sure you want to delete this message? This action cannot be undone."
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Messages</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {messages.length} total messages ({unreadCount} unread)
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
                            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{messages.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-xl">
                            <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Unread</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{unreadCount}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-xl">
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Read</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{messages.length - unreadCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
                {messages.length === 0 ? (
                    <div className="p-12 text-center">
                        <Inbox className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">Messages will appear here when someone contacts you</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200 dark:divide-slate-800">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`p-6 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition ${
                                    !msg.is_read ? 'bg-blue-50 dark:bg-blue-500/5' : ''
                                }`}
                            >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center flex-wrap gap-3 mb-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                {msg.name}
                                            </h3>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                <Building className="w-3 h-3" />
                                                {msg.company || 'N/A'}
                                            </span>
                                            {!msg.is_read && (
                                                <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-600 text-white rounded-full">
                                                    New
                                                </span>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                                <Mail className="w-3 h-3 text-gray-400" />
                                                {msg.subject}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{msg.message}</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(msg.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {!msg.is_read && (
                                            <button
                                                onClick={() => handleMarkAsRead(msg.id)}
                                                className="p-2.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-xl transition"
                                                title="Mark as read"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => setDeleteId(msg.id)}
                                            className="p-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}