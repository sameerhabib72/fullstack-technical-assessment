"use client";
import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { PortfolioItem } from '@/types';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { url } from 'inspector';

interface PortfolioProps {
    items: PortfolioItem[];
}

const defaultItems = [
    { id: 1, title: 'Filtle – Fitness Website', category: 'Web Development', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80', description: '' ,url: 'https://example.com/filtle' },
    { id: 2, title: 'Shopmax – eCommerce App', category: 'Mobile App', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80', description: '' ,url: 'https://example.com/shopmax' },
    { id: 3, title: 'Finova – SaaS Platform', category: 'Web Development', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80', description: '' ,url: 'https://example.com/finova' },
    { id: 4, title: 'Travelia – Travel Website', category: 'Web Design', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80', description: '' ,url: 'https://example.com/travelia' },
    { id: 5, title: 'Foodly – Restaurant App', category: 'Mobile App', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80', description: '' ,url: 'https://example.com/foodly' },
    { id: 6, title: 'EcoTrack – Dashboard', category: 'Web Development', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80', description: '' ,url: 'https://example.com/ecotrack' },
];

export const Portfolio = ({ items }: PortfolioProps) => {
    const [filter, setFilter] = useState('All');

    const displayItems = items && items.length > 0 ? items : defaultItems;
    const categories = ['All', ...new Set(displayItems.map(i => i.category))];
    const filteredItems = filter === 'All' ? displayItems : displayItems.filter(i => i.category === filter);

    return (
        <section id="portfolio" className="section-padding bg-muted/50 transition-colors">
            <div className="container-custom">
                <SectionHeader
                    badge="Our Recent Work"
                    title="Projects We Are Proud Of"
                    subtitle="Each project is a testament to our commitment to excellence."
                />

                {/* PDF 3: Filter by category (bonus) */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] hover:cursor-pointer ${
                                filter === cat
                                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item, index) => (
                        <div
                            key={`portfolio-${item.id}`}
                            className="group relative overflow-hidden rounded-xl bg-muted animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative w-full h-[250px] sm:h-[280px] overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title} // PDF 5.1 - Alt text
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    quality={90}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div>
                                        <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                                            {item.category}
                                        </span>
                                        <h4 className="text-white text-xl font-bold mt-1">
                                            {item.title}
                                        </h4>
                                        <a
                                            href={item.url || '#'}
                                            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mt-2"
                                        >
                                            View Project
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;