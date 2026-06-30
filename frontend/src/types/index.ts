/**
 * Generic API Response Wrapper
 * PDF Section 4.3: Consistent response envelope
 */
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: Record<string, string[]>; // Validation errors ke liye
}

/**
 * 1. Hero Section Type
 * PDF Section 4.2
 */
export interface HeroData {
    id: number;
    title: string;
    subtitle: string;
    cta_text: string;
    cta_url: string;
    background_image: string;
    is_active: boolean;
}

/**
 * 2. About Section Type
 * PDF Section 4.2
 */
export interface AboutData {
    id: number;
    title: string;
    body: string;
    image: string;
    mission: string;
    vision: string;
}

/**
 * 3. Service Type
 * PDF Section 3 & 4.2
 */
export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string; // Lucide icon name ya class name
    sort_order: number;
    is_active: boolean;
}

/**
 * 4. Feature Type
 * PDF Section 4.2
 */
export interface Feature {
    id: number;
    title: string;
    description: string;
    icon: string;
    sort_order: number;
}

/**
 * 5. Portfolio / Work Type
 * PDF Section 3 & 4.2
 */
export interface PortfolioItem {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    url?: string;
    sort_order: number;
}

/**
 * 6. Testimonial Type
 * PDF Section 4.2
 */
export interface Testimonial {
    id: number;
    client_name: string;
    role: string;
    company: string;
    quote: string;
    avatar: string;
    rating: number;
}

/**
 * 7. Team Member Type
 * PDF Section 4.2
 */
export interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    photo: string;
    linkedin_url?: string;
    twitter_url?: string;
    sort_order: number;
}

/**
 * 8. FAQ Type
 * PDF Section 4.2
 */
export interface Faq {
    id: number;
    question: string;
    answer: string;
    category?: string;
    sort_order: number;
    is_active: boolean;
}

/**
 * 9. Contact Message Type (For Submission)
 * PDF Section 3.1
 */
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

/**
 * Contact Message Response from API
 */
export interface ContactMessage extends ContactFormData {
    id: number;
    is_read: boolean;
    created_at: string;
}