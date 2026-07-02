import api from './api';

class AdminService {
    private token: string | null = null;

    setToken(token: string) {
        this.token = token;
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    async login(email: string, password: string) {
        try {
            const response = await api.post('/login', { email, password });
            if (response.data.success) {
                const token = response.data.data.token;
                this.setToken(token);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                return response.data;
            }
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return error.response.data;
            }
            throw new Error('Network error. Please check your connection.');
        }
    }

    async logout() {
        try {
            await api.post('/logout');
        } catch (error) {
        }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUser(): any {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    // ============================================
    // Dashboard Stats
    // ============================================

    async getStats() {
        try {
            // Get counts from different resources
            const [hero, about, services, features, portfolio, testimonials, team, faqs, messages] = await Promise.all([
                this.getAll('hero'),
                this.getAll('about'),
                this.getAll('services'),
                this.getAll('features'),
                this.getAll('portfolio'),
                this.getAll('testimonials'),
                this.getAll('team'),
                this.getAll('faqs'),
                this.getMessages().catch(() => ({ data: [] })),
            ]);

            return {
                success: true,
                data: {
                    totalSections: 9,
                    totalItems: 
                        (hero.data?.length || 0) +
                        (about.data?.length || 0) +
                        (services.data?.length || 0) +
                        (features.data?.length || 0) +
                        (portfolio.data?.length || 0) +
                        (testimonials.data?.length || 0) +
                        (team.data?.length || 0) +
                        (faqs.data?.length || 0),
                    messages: messages.data?.length || 0,
                    unread: messages.data?.filter((m: any) => !m.is_read).length || 0,
                }
            };
        } catch (error) {
            return {
                success: false,
                data: {
                    totalSections: 0,
                    totalItems: 0,
                    messages: 0,
                    unread: 0,
                }
            };
        }
    }

    // ============================================
    // Generic CRUD Methods
    // ============================================

    async getAll(resource: string, params?: any) {
        try {
            const response = await api.get(`/${resource}`, { params });
            return response.data;
        } catch (error) {
            return { data: [] };
        }
    }

    async getOne(resource: string, id: number) {
        const response = await api.get(`/${resource}/${id}`);
        return response.data;
    }

    async create(resource: string, data: any) {
        const response = await api.post(`/${resource}`, data);
        return response.data;
    }

    async update(resource: string, id: number, data: any) {
        const response = await api.put(`/${resource}/${id}`, data);
        return response.data;
    }

    async delete(resource: string, id: number) {
        const response = await api.delete(`/${resource}/${id}`);
        return response.data;
    }

    async toggleStatus(resource: string, id: number) {
        const response = await api.patch(`/${resource}/${id}/toggle-status`);
        return response.data;
    }

    // ============================================
    // Contact Messages
    // ============================================

    async getMessages() {
        try {
            const response = await api.get('/contact/messages');
            return response.data;
        } catch (error) {
            return { data: [] };
        }
    }

    async markMessageAsRead(id: number) {
        const response = await api.put(`/contact/messages/${id}/read`);
        return response.data;
    }

    async deleteMessage(id: number) {
        const response = await api.delete(`/contact/messages/${id}`);
        return response.data;
    }

    async getUnreadCount() {
        try {
            const response = await api.get('/contact/unread-count');
            return response.data;
        } catch (error) {
            return { data: { count: 0 } };
        }
    }
}

export const adminService = new AdminService();