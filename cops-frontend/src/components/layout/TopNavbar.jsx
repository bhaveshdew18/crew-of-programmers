import { Bell, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const TopNavbar = () => {
  const location = useLocation();
  
  // Detects if the user is a Mentor/Teacher based on the URL path
  const isTeacher = location.pathname.includes('/teacher');

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      
      {/* Dynamic Portal Title */}
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {isTeacher ? 'Teacher Portal' : 'Student Portal'}
        </h2>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        
        {/* Dynamic User Profile & Role Badge */}
        <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
          <div className="flex flex-col text-right">
            <span className="text-sm font-medium text-gray-900">
              {isTeacher ? 'Teacher Name' : 'Student Name'}
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