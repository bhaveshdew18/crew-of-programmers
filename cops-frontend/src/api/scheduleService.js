import apiClient from './apiClient';

export const scheduleService = {
  getAllSchedules: () => {
    return apiClient.get('/schedule/all');
  },
  getSchedulesByClass: (classId) => {
    return apiClient.get(`/schedule/class/${classId}`);
  },
};
