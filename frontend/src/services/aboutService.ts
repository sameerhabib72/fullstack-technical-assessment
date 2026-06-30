import api from './api';
import { ApiResponse, AboutData } from '@/types';

export const getAboutData = async (): Promise<AboutData | null> => {
    try {
        const response = await api.get<ApiResponse<AboutData>>('/about');
        return response.data.data;
    } catch {
        return null;
    }
};