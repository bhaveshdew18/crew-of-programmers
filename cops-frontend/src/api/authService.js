import apiClient from './apiClient';
import { toApiRole } from '../utils/roles';

export const authService = {
  register: (data) => apiClient.post('/users/register', {
    fullName: data.fullName,
    email: data.email,
    password: data.password,
    role: toApiRole(data.role),
  }),

  login: (email, password, role) => apiClient.post('/users/login', {
    email,
    password,
    role: toApiRole(role),
  }),

  getAllUsers: () => apiClient.get('/users/all'),
};
