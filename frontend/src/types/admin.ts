export interface Field {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'boolean' | 'url' | 'email' | 'phone';
    required?: boolean;
    placeholder?: string;
}

export interface ResourceConfig {
    name: string;
    label: string;
    icon: string;
    fields: Field[];
    listFields: string[];
}

export const SECTION_CONFIGS: Record<string, ResourceConfig> = {
    hero: {
        name: 'hero',
        label: 'Hero Section',
        icon: 'Layers',
        listFields: ['title', 'is_active'],
        fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', required: true },
            { name: 'cta_text', label: 'CTA Button Text', type: 'text', required: true },
            { name: 'cta_url', label: 'CTA Button URL', type: 'url', required: true },
            { name: 'background_image', label: 'Background Image URL', type: 'url', required: true },
            { name: 'is_active', label: 'Active', type: 'boolean' },
        ],
    },
    about: {
        name: 'about',
        label: 'About Section',
        icon: 'Info',
        listFields: ['title'],
        fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'body', label: 'Body Content', type: 'textarea', required: true },
            { name: 'image', label: 'Image URL', type: 'url' },
            { name: 'mission', label: 'Mission', type: 'textarea' },
            { name: 'vision', label: 'Vision', type: 'textarea' },
        ],
    },
    services: {
        name: 'services',
        label: 'Services',
        icon: 'Briefcase',
        listFields: ['title', 'is_active'],
        fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea', required: true },
            { name: 'icon', label: 'Icon Name (Globe, Smartphone, etc.)', type: 'text', required: true },
            { name: 'sort_order', label: 'Sort Order', type: 'number' },
            { name: 'is_active', label: 'Active', type: 'boolean' },
        ],
    },
    features: {
        name: 'features',
        label: 'Features',
        icon: 'Star',
        listFields: ['title'],
        fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea', required: true },
            { name: 'icon', label: 'Icon Name (Zap, ShieldCheck, etc.)', type: 'text', required: true },
            { name: 'sort_order', label: 'Sort Order', type: 'number' },
        ],
    },
    portfolio: {
        name: 'portfolio',
        label: 'Portfolio',
        icon: 'Image',
        listFields: ['title', 'category'],
        fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'image', label: 'Image URL', type: 'url', required: true },
            { name: 'category', label: 'Category', type: 'text', required: true },
            { name: 'url', label: 'Project URL', type: 'url' },
            { name: 'sort_order', label: 'Sort Order', type: 'number' },
        ],
    },
    testimonials: {
        name: 'testimonials',
        label: 'Testimonials',
        icon: 'MessageSquare',
        listFields: ['client_name', 'company'],
        fields: [
            { name: 'client_name', label: 'Client Name', type: 'text', required: true },
            { name: 'role', label: 'Role', type: 'text', required: true },
            { name: 'company', label: 'Company', type: 'text', required: true },
            { name: 'quote', label: 'Quote', type: 'textarea', required: true },
            { name: 'avatar', label: 'Avatar URL', type: 'url' },
            { name: 'rating', label: 'Rating (1-5)', type: 'number' },
        ],
    },
    team: {
        name: 'team',
        label: 'Team Members',
        icon: 'Users',
        listFields: ['name', 'role'],
        fields: [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'role', label: 'Role', type: 'text', required: true },
            { name: 'bio', label: 'Bio', type: 'textarea' },
            { name: 'photo', label: 'Photo URL', type: 'url', required: true },
            { name: 'linkedin_url', label: 'LinkedIn URL', type: 'url' },
            { name: 'twitter_url', label: 'Twitter URL', type: 'url' },
            { name: 'sort_order', label: 'Sort Order', type: 'number' },
        ],
    },
    faqs: {
        name: 'faqs',
        label: 'FAQs',
        icon: 'HelpCircle',
        listFields: ['question', 'is_active'],
        fields: [
            { name: 'question', label: 'Question', type: 'text', required: true },
            { name: 'answer', label: 'Answer', type: 'textarea', required: true },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'sort_order', label: 'Sort Order', type: 'number' },
            { name: 'is_active', label: 'Active', type: 'boolean' },
        ],
    },
};