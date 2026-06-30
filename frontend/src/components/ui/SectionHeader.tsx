interface SectionHeaderProps {
    badge?: string;
    title: string;
    subtitle?: string;
    className?: string;
}

export const SectionHeader = ({ badge, title, subtitle, className = '' }: SectionHeaderProps) => {
    return (
        <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 ${className}`}>
            {badge && (
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                    {badge}
                </span>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 text-foreground">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-4 text-muted-foreground text-base sm:text-lg">
                    {subtitle}
                </p>
            )}
        </div>
    );
};