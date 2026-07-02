"use client";
import { useEffect } from 'react';

// PDF 6: Performance monitoring (development only)
export function PerformanceMonitor() {
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') return;
        
        // Monitor Core Web Vitals
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
            }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        
        return () => observer.disconnect();
    }, []);
    
    return null;
}