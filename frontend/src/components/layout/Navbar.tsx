"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Team', href: '#team' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Contact', href: '#contact' },
    ];

    if (!mounted) {
        return (
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        <span className="text-2xl font-bold">
                            <span className="text-primary">The desi</span>
                            <span className="text-foreground">gn farm</span>
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-muted rounded-lg animate-pulse"></div>
                            <div className="w-9 h-9 bg-muted rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-background/95 backdrop-blur-md shadow-lg'
                        : 'bg-background/80 backdrop-blur-sm'
                } border-b border-border`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 group">
                            <span className="text-2xl md:text-3xl font-bold">
                                {/* <span className="text-primary">Nex</span>The Design Firm
                                <span className="text-foreground">ora</span> */}
                                
                            <span className="text-primary">The Des</span>
                            <span className="text-foreground">ign Firm</span>
                            </span>
                            <span className="hidden sm:block text-[10px] text-muted-foreground tracking-widest uppercase">
                                Digital Agency
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-lg transition-all duration-200"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button
                                onClick={toggleTheme}
                                className="ml-2 p-2.5 rounded-lg bg-muted text-foreground/80 hover:bg-muted/80 transition-all duration-200"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-5 h-5" />
                                ) : (
                                    <Moon className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {/* Mobile Controls */}
                        <div className="flex md:hidden items-center gap-1">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg bg-muted text-foreground/80 hover:bg-muted/80 transition-all duration-200"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-5 h-5" />
                                ) : (
                                    <Moon className="w-5 h-5" />
                                )}
                            </button>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-lg text-foreground/80 hover:bg-muted transition-all duration-200"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden bg-background border-t border-border transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-lg transition-all duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="h-16 md:h-20"></div>
        </>
    );
};

export default Navbar;