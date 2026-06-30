import api from './api';
import { ApiResponse, Service } from '@/types';

export const getServices = async (): Promise<Service[]> => {
    try {
        const response = await api.get<ApiResponse<Service[]>>('/services');
        return response.data.data;
    } catch {
        return [];
    }
};