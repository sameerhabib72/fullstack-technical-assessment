import api from './api';
import { ApiResponse, Testimonial } from '@/types';

export const getTestimonials = async (): Promise<Testimonial[]> => {
    try {
        const response = await api.get<ApiResponse<Testimonial[]>>('/testimonials');
        return response.data.data;
    } catch {
        return [];
    }
};