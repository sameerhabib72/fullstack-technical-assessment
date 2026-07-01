import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export const Card = ({ children, className = '', hover = true }: CardProps) => {
    const baseStyles = 'bg-card text-card-foreground rounded-xl border border-border shadow-sm';
    const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-2 transition-all duration-300' : '';
    
    return (
        <div className={`${baseStyles} ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
};
