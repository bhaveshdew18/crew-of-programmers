import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  ClipboardCheck,
  Code,
  FileText,
  LayoutDashboard,
  LogOut,
  UploadCloud,
  Video,
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { isTeacherRole } from '../../utils/roles';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const isTeacher = isTeacherRole(user?.role);

  const navItems = isTeacher
    ? [
        { name: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
        { name: 'Classrooms', path: '/teacher/classrooms', icon: BookOpen },
        { name: 'Lectures', path: '/teacher/lectures', icon: Video },
        { name: 'Tests & Tasks', path: '/teacher/tasks', icon: FileText },
        { name: 'Resources', path: '/teacher/resources', icon: UploadCloud },
        { name: 'Attendance', path: '/teacher/attendance', icon: ClipboardCheck },
      ]
    : [
        { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
        { name: 'Classrooms', path: '/student/classrooms', icon: BookOpen },
        { name: 'Schedule', path: '/student/schedule', icon: Calendar },
        { name: 'Attendance', path: '/student/attendance', icon: ClipboardCheck },
        { name: 'Coding Zone', path: '/student/coding-zone', icon: Code },
      ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex-col h-screen sticky top-0 hidden lg:flex">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">COPs</h1>
      </div>

      <div className="px-4 py-2 mt-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">
          {isTeacher ? 'Teacher Portal' : 'Student Portal'}
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
