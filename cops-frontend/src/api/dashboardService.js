import apiClient from './apiClient';

export const dashboardService = {
  getStats: () => {
    return apiClient.get('/dashboard/stats');
  },
  getWeeklyActivity: () => {
    return apiClient.get('/dashboard/activity');
  },
  getTeacherStats: () => {
    return apiClient.get('/dashboard/teacher-stats');
  },
};
