import api from './api';
import { ApiResponse, HeroData } from '@/types';

export const getHeroData = async (): Promise<HeroData | null> => {
    try {
        const response = await api.get<ApiResponse<HeroData>>('/hero');
        return response.data.data;
    } catch {
        return null;
    }
};