import api from './api';
import { ApiResponse, HeroData, AboutData, Service, PortfolioItem, Testimonial, TeamMember, Faq } from '@/types';

export const landingService = {
    getHero: () => api.get<ApiResponse<HeroData>>('/hero').then(res => res.data.data),
    getAbout: () => api.get<ApiResponse<AboutData>>('/about').then(res => res.data.data),
    getServices: () => api.get<ApiResponse<Service[]>>('/services').then(res => res.data.data),
    getPortfolio: () => api.get<ApiResponse<PortfolioItem[]>>('/portfolio').then(res => res.data.data),
    getTestimonials: () => api.get<ApiResponse<Testimonial[]>>('/testimonials').then(res => res.data.data),
    getTeam: () => api.get<ApiResponse<TeamMember[]>>('/team').then(res => res.data.data),
    getFaqs: () => api.get<ApiResponse<Faq[]>>('/faqs').then(res => res.data.data),
    submitContact: (data: any) => api.post('/contact', data),
};