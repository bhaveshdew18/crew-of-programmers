import apiClient from './apiClient';

export const attendanceService = {
  markAttendance: (attendanceData) => {
    return apiClient.post('/attendance/mark', attendanceData);
  },

  getAttendanceByUser: (userId) => {
    return apiClient.get(`/attendance/user/${userId}`);
  },

  getAttendanceByClass: (classId) => {
    return apiClient.get(`/attendance/class/${classId}`);
  },

  getAttendanceByDate: (date) => {
    return apiClient.get('/attendance/date', {
      params: { date },
    });
  },
};
