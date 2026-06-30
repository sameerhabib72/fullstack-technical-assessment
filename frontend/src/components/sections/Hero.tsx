"use client";
import Image from 'next/image';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

interface HeroData {
    id?: number;
    title?: string;
    subtitle?: string;
    cta_text?: string;
    cta_url?: string;
    background_image?: string;
    is_active?: boolean;
}

interface HeroProps {
    data: HeroData | null;
}

const fallbackHero = {
    title: 'Building Digital Experiences That Drive Success',
    subtitle: 'We are a creative digital agency helping businesses build powerful online presence and achieve measurable growth through innovative solutions.',
    cta_text: 'Get Started',
    cta_url: '#services',
    background_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
};

const Hero = ({ data }: HeroProps) => {
    const heroData = data || fallbackHero;

    return (
        <section className="relative min-h-screen w-full flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={heroData.background_image || fallbackHero.background_image}
                    alt={heroData.title || "Hero Background"}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-3xl animate-fade-in-up">
                    {/* Badge */}
                    {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-white/80 text-sm font-medium">Available for projects</span>
                    </div> */}

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
                        {heroData.title || fallbackHero.title}
                    </h1>
                    
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                        {heroData.subtitle || fallbackHero.subtitle}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href={heroData.cta_url || '#services'}
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-base transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 group"
                        >
                            {heroData.cta_text || 'Our Services'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-semibold text-base transition-all duration-200 hover:bg-white/10"
                        >
                            <Play className="w-5 h-5" />
                            Contact Us
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
                        <div>
                            <div className="text-3xl font-bold text-white">10+</div>
                            <div className="text-sm text-gray-400">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">500+</div>
                            <div className="text-sm text-gray-400">Projects Delivered</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">98%</div>
                            <div className="text-sm text-gray-400">Client Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float hidden sm:block">
                <ChevronDown className="w-6 h-6 text-white/50" />
            </div>
        </section>
    );
};

export default Hero;