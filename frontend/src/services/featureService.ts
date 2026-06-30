import api from './api';
import { ApiResponse, Feature } from '@/types';

export const getFeatures = async (): Promise<Feature[]> => {
    try {
        const response = await api.get<ApiResponse<Feature[]>>('/features');
        return response.data.data;
    } catch {
        return [];
    }
};