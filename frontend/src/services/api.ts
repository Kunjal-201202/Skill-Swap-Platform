import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  refresh: () => api.post('/auth/refresh'),
  changePassword: (data: any) => api.post('/auth/change-password', data),
  getCurrentUser: () => api.get('/auth/me'),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  addSkillOffered: (data: any) => api.post('/users/skills/offered', data),
  addSkillWanted: (data: any) => api.post('/users/skills/wanted', data),
  removeSkillOffered: (skillId: string) => api.delete(`/users/skills/offered/${skillId}`),
  removeSkillWanted: (skillId: string) => api.delete(`/users/skills/wanted/${skillId}`),
  searchUsers: (params: any) => api.get('/users/search', { params }),
  getUser: (userId: string) => api.get(`/users/${userId}`),
};

// Swap API
export const swapAPI = {
  getSwaps: (params: any) => api.get('/swaps', { params }),
  getSwap: (swapId: string) => api.get(`/swaps/${swapId}`),
  createSwap: (data: any) => api.post('/swaps', data),
  respondToSwap: (swapId: string, data: any) => api.put(`/swaps/${swapId}/respond`, data),
  completeSwap: (swapId: string) => api.put(`/swaps/${swapId}/complete`),
  cancelSwap: (swapId: string) => api.put(`/swaps/${swapId}/cancel`),
  rateSwap: (swapId: string, data: any) => api.post(`/swaps/${swapId}/rate`, data),
  sendSwapMessage: (swapId: string, message: string) => api.post(`/swaps/${swapId}/messages`, { message }),
};

// Admin API
export const adminAPI = {
  getAdminStats: (params: any) => api.get('/admin/stats', { params }),
  getAdminActivity: () => api.get('/admin/activity'),
  getAdminUsers: (params: any) => api.get('/admin/users', { params }),
  getFlaggedContent: (params: any) => api.get('/admin/flagged-content', { params }),
  getAdminAnalytics: (params: any) => api.get('/admin/analytics', { params }),
  getTopSkills: () => api.get('/admin/top-skills'),
  getLocationStats: () => api.get('/admin/location-stats'),
  suspendUser: (userId: string) => api.put(`/admin/users/${userId}/suspend`),
  activateUser: (userId: string) => api.put(`/admin/users/${userId}/activate`),
  deleteUser: (userId: string) => api.delete(`/admin/users/${userId}`),
  resolveReport: (reportId: string, data: any) => api.put(`/admin/reports/${reportId}/resolve`, data),
  deleteContent: (contentType: string, contentId: string) => api.delete(`/admin/content/${contentType}/${contentId}`),
};

// Main API service object
const apiService = {
  // Auth methods
  register: authAPI.register,
  login: authAPI.login,
  logout: authAPI.logout,
  refresh: authAPI.refresh,
  changePassword: authAPI.changePassword,
  getCurrentUser: authAPI.getCurrentUser,

  // User methods
  getProfile: userAPI.getProfile,
  updateProfile: userAPI.updateProfile,
  addSkillOffered: userAPI.addSkillOffered,
  addSkillWanted: userAPI.addSkillWanted,
  removeSkillOffered: userAPI.removeSkillOffered,
  removeSkillWanted: userAPI.removeSkillWanted,
  searchUsers: userAPI.searchUsers,
  getUser: userAPI.getUser,

  // Swap methods
  getSwaps: swapAPI.getSwaps,
  getSwap: swapAPI.getSwap,
  createSwap: swapAPI.createSwap,
  respondToSwap: swapAPI.respondToSwap,
  completeSwap: swapAPI.completeSwap,
  cancelSwap: swapAPI.cancelSwap,
  rateSwap: swapAPI.rateSwap,
  sendSwapMessage: swapAPI.sendSwapMessage,

  // Admin methods
  getAdminStats: adminAPI.getAdminStats,
  getAdminActivity: adminAPI.getAdminActivity,
  getAdminUsers: adminAPI.getAdminUsers,
  getFlaggedContent: adminAPI.getFlaggedContent,
  getAdminAnalytics: adminAPI.getAdminAnalytics,
  getTopSkills: adminAPI.getTopSkills,
  getLocationStats: adminAPI.getLocationStats,
  suspendUser: adminAPI.suspendUser,
  activateUser: adminAPI.activateUser,
  deleteUser: adminAPI.deleteUser,
  resolveReport: adminAPI.resolveReport,
  deleteContent: adminAPI.deleteContent,
};

export default apiService; 