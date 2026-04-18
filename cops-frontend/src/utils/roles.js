export const normalizeRole = (role) => {
  if (!role) {
    return 'STUDENT';
  }

  const normalized = String(role).trim().toUpperCase();

  if (normalized === 'MENTOR' || normalized === 'TEACHER') {
    return 'TEACHER';
  }

  return 'STUDENT';
};

export const toApiRole = (role) => normalizeRole(role);

export const toFormRole = (role) => (
  normalizeRole(role) === 'TEACHER' ? 'mentor' : 'student'
);

export const isTeacherRole = (role) => normalizeRole(role) === 'TEACHER';

export const getDashboardPath = (role) => (
  isTeacherRole(role) ? '/teacher/dashboard' : '/student/dashboard'
);
