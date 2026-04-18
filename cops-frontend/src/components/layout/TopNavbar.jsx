import { Bell, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { isTeacherRole } from '../../utils/roles';

const titleMap = {
  '/student/dashboard': 'Student Dashboard',
  '/student/classrooms': 'Student Classrooms',
  '/student/schedule': 'Weekly Schedule',
  '/student/attendance': 'Attendance Tracker',
  '/student/coding-zone': 'Coding Zone',
  '/teacher/dashboard': 'Teacher Dashboard',
  '/teacher/classrooms': 'Teacher Classrooms',
  '/teacher/lectures': 'Teacher Lectures',
  '/teacher/tasks': 'Tests and Tasks',
  '/teacher/resources': 'Resource Library',
  '/teacher/attendance': 'Attendance Console',
};

const TopNavbar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isTeacher = isTeacherRole(user?.role);
  const pageTitle = titleMap[location.pathname] || (isTeacher ? 'Teacher Portal' : 'Student Portal');

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-gray-800">{pageTitle}</h2>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
          <div className="flex flex-col text-right">
            <span className="text-sm font-medium text-gray-900">
              {user?.fullName || (isTeacher ? 'Teacher' : 'Student')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full mt-0.5 inline-block">
              {isTeacher ? 'TEACHER' : 'STUDENT'}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
