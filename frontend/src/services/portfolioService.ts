import api from './api';
import { ApiResponse, PortfolioItem } from '@/types';

export const getPortfolio = async (): Promise<PortfolioItem[]> => {
    try {
        const response = await api.get<ApiResponse<PortfolioItem[]>>('/portfolio');
        return response.data.data;
    } catch {
        return [];
    }
};