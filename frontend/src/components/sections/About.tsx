import Image from 'next/image';
import { Target, Eye, Shield, ArrowRight } from 'lucide-react';

interface AboutData {
    id?: number;
    title?: string;
    body?: string;
    image?: string;
    mission?: string;
    vision?: string;
}

interface AboutProps {
    data: AboutData | null;
}

const fallbackAbout = {
    title: 'Transforming Ideas into Reality',
    body: 'With over 10 years of experience, our team of experts provides top-notch digital services to clients worldwide.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
    mission: 'To empower businesses through technology.',
    vision: 'To be the global leader in digital innovation.',
};

const About = ({ data }: AboutProps) => {
    const aboutData = data || fallbackAbout;

    const features = [
        { icon: Target, title: 'Our Mission', desc: aboutData.mission || fallbackAbout.mission },
        { icon: Eye, title: 'Our Vision', desc: aboutData.vision || fallbackAbout.vision },
        { icon: Shield, title: 'Our Values', desc: 'Innovation, integrity, and excellence in everything we do.' },
    ];

    return (
        <section id="about" className="section-padding bg-background transition-colors">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image */}
                    <div className="relative animate-slide-in-left">
                        <div className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src={aboutData.image || fallbackAbout.image}
                                alt="About Us"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                quality={90}
                            />
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg">
                            <div className="text-2xl font-bold">10+</div>
                            <div className="text-xs opacity-80">Years of Excellence</div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="animate-slide-in-right">
                        <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                            About Us
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-6 text-foreground">
                            {aboutData.title || fallbackAbout.title}
                        </h2>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            {aboutData.body || fallbackAbout.body}
                        </p>

                        <div className="space-y-4 mb-8">
                            {features.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors duration-300"
                                    >
                                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">{item.title}</h4>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <a
                            href="#services"
                            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200 group"
                        >
                            Learn More About Us
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
