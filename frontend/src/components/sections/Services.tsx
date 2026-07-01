import * as LucideIcons from 'lucide-react';

interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    sort_order?: number;
    is_active?: boolean;
}

interface ServicesProps {
    services: Service[];
}

const defaultServices = [
    { id: 1, title: 'Web Development', description: 'Modern, responsive, and high-performance websites built for your business.', icon: 'Globe' },
    { id: 2, title: 'Mobile Apps', description: 'Custom mobile applications for iOS and Android that deliver great experiences.', icon: 'Smartphone' },
    { id: 3, title: 'UI/UX Design', description: 'Beautiful and intuitive designs that enhance user experience and engagement.', icon: 'Palette' },
    { id: 4, title: 'Digital Marketing', description: 'Data-driven marketing strategies that increase visibility and ROI.', icon: 'Megaphone' },
    { id: 5, title: 'Cloud Solutions', description: 'Scalable and secure cloud infrastructure for your growing business.', icon: 'Cloud' },
    { id: 6, title: 'Support & Maintenance', description: '24/7 support and maintenance to keep your business running smoothly.', icon: 'Headphones' },
];

const Services = ({ services }: ServicesProps) => {
    const displayServices = services && services.length > 0 ? services : defaultServices;

    const getIcon = (iconName: string) => {
        const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Settings;
        return IconComponent;
    };

    return (
        <section id="services" className="section-padding bg-muted/50 transition-colors">
            <div className="container-custom">
                <div className="section-header">
                    <span className="badge">What We Do</span>
                    <h2>We Provide End-to-End Digital Solutions</h2>
                    <p>Tailored to your business needs. We deliver excellence across every service.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayServices.map((service, index) => {
                        const IconComponent = getIcon(service.icon);
                        return (
                            <div
                                key={`service-${service.id}`}
                                className="card card-hover p-8 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                    <IconComponent size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform hover:cursor-pointer">
                                    Learn More
                                    <LucideIcons.ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
