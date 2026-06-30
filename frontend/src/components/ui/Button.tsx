import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    className = '',
    disabled = false,
    type = 'button',
}: ButtonProps) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 min-h-[44px]';
    
    const variants = {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/30',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
        return (
            <a href={href} className={`${classes} hover:cursor-pointer`} >
                {children}
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} className={`${classes} hover:cursor-pointer`} disabled={disabled}>
            {children}
        </button>
    );
};