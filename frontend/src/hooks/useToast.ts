"use client";
import { useState, useCallback } from 'react';

interface Toast {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
}

export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((type: Toast['type'], message: string, duration: number = 3000) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, type, message, duration }]);
        
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const success = (message: string) => addToast('success', message);
    const error = (message: string) => addToast('error', message);
    const warning = (message: string) => addToast('warning', message);
    const info = (message: string) => addToast('info', message);

    return { toasts, removeToast, success, error, warning, info };
}