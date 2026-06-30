"use client";

import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

// Custom inline SVG replacements for Lucide brand icons matching exact sizing/stroke
const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-muted/80 dark:bg-muted/30 text-foreground mt-auto border-t border-border">
            {/* Back to Top */}
            <div className="relative">
                <button
                    onClick={scrollToTop}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-200 hover:scale-110 min-h-[44px] min-w-[44px]"
                    aria-label="Back to top"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            <span className="text-primary">The Design</span> Firm
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Building future-ready digital experiences <br />with Next.js and Laravel.
                        </p>
                        {/* Social links */}
                        <div className="flex space-x-2 mt-4">
                            <a href="#" className="p-2 bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
                        <ul className="space-y-3 text-muted-foreground text-sm">
                            <li><a href="#about" className="hover:text-primary transition-colors duration-200 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                About
                            </a></li>
                            <li><a href="#services" className="hover:text-primary transition-colors duration-200 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                Services
                            </a></li>
                            <li><a href="#portfolio" className="hover:text-primary transition-colors duration-200 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                Portfolio
                            </a></li>
                            <li><a href="#team" className="hover:text-primary transition-colors duration-200 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                Team
                            </a></li>
                            <li><a href="#contact" className="hover:text-primary transition-colors duration-200 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                Contact
                            </a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-foreground">Contact Info</h4>
                        <ul className="space-y-3 text-muted-foreground text-sm">
                            <li className="flex items-start gap-3 hover:text-primary transition-colors duration-200">
                                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <span>P.E.C.H.S., Karachi, 75400, Pakistan</span>
                            </li>
                            <li className="flex items-center gap-3 hover:text-primary transition-colors duration-200">
                                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                                <a href="mailto:info@thedesignsfirm.com">info@thedesignsfirm.com</a>
                            </li>
                            <li className="flex items-center gap-3 hover:text-primary transition-colors duration-200">
                                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                                <a href="tel:+923001234567">+92 300 1234567</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-border pt-6 text-center">
                    <p className="text-muted-foreground text-sm">
                        &copy; {new Date().getFullYear()} The Design Firm. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;