export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: Record<string, string[]>;
}

export interface HeroData {
    id: number;
    title: string;
    subtitle: string;
    cta_text: string;
    cta_url: string;
    background_image: string;
    is_active: boolean;
}

export interface AboutData {
    id: number;
    title: string;
    body: string;
    image: string;
    mission: string;
    vision: string;
}

export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    sort_order: number;
    is_active: boolean;
}

export interface Feature {
    id: number;
    title: string;
    description: string;
    icon: string;
    sort_order: number;
}

export interface PortfolioItem {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    url?: string;
    sort_order: number;
}
export interface Testimonial {
    id: number;
    client_name: string;
    role: string;
    company: string;
    quote: string;
    avatar?: string;
    rating: number;
}

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    photo: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    sort_order: number;
}
export interface Faq {
    id: number;
    question: string;
    answer: string;
    category?: string;
    sort_order: number;
    is_active: boolean;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export interface ContactMessage extends ContactFormData {
    id: number;
    is_read: boolean;
    created_at: string;
}

export interface SEOData {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    canonical?: string;
}