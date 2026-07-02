"use client";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface ToastProps {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    onRemove: (id: string) => void;
}

const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

const colors = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-700 dark:text-yellow-400',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-400',
};

const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
};

export function Toast({ id, type, message, onRemove }: ToastProps) {
    const Icon = icons[type];

    return (
        <div className={`flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg ${colors[type]} animate-slide-in-right`}>
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColors[type]}`} />
            <p className="flex-1 text-sm">{message}</p>
            <button
                onClick={() => onRemove(id)}
                className="p-1 hover:bg-black/5 rounded-lg transition"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}