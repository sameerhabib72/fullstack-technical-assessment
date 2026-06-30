import api from './api';
import { ApiResponse, TeamMember } from '@/types';

export const getTeam = async (): Promise<TeamMember[]> => {
    try {
        const response = await api.get<ApiResponse<TeamMember[]>>('/team');
        return response.data.data;
    } catch {
        return [];
    }
};