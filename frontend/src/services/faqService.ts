import api from './api';
import { ApiResponse, Faq } from '@/types';

export const getFaqs = async (): Promise<Faq[]> => {
    try {
        const response = await api.get<ApiResponse<Faq[]>>('/faqs');
        return response.data.data;
    } catch {
        return [];
    }
};