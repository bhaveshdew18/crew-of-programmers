import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  ClipboardCheck, 
  Code, 
  FileText, 
  UploadCloud, 
  Video,
  LogOut // <-- Imported the LogOut icon
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // <-- Added for programmatic routing
  
  const isTeacher = location.pathname.includes('/teacher');

  // Dynamic Navigation Items based on the Role
  const navItems = isTeacher 
    ? [
        { name: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
        { name: 'Classrooms', path: '#', icon: BookOpen },
        { name: 'Lectures', path: '#', icon: Video },
        { name: 'Tests & Tasks', path: '#', icon: FileText },
        { name: 'Resources', path: '#', icon: UploadCloud },
        { name: 'Attendance', path: '#', icon: ClipboardCheck },
      ]
    : [
        { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
        { name: 'Classrooms', path: '#', icon: BookOpen },
        { name: 'Schedule', path: '/student/schedule', icon: Calendar },
        { name: 'Attendance', path: '/student/attendance', icon: ClipboardCheck },
        { name: 'Coding Zone', path: '#', icon: Code },
      ];

  const handleLogout = () => {
    // In the future, you will clear the JWT token from localStorage here
    // localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Platform Logo/Brand */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">COPs</h1>
      </div>
      
      {/* Portal Label Indicator */}
      <div className="px-4 py-2 mt-4">
         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">
           {isTeacher ? "Mentor Portal" : "Student Portal"}
         </p>
      </div>

      {/* Dynamic Navigation Links */}
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

      {/* Logout Footer */}
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