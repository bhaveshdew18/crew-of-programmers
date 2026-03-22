import React from 'react';
import { studentData } from '../../data/mockData';
import { CheckCircle, Code, Clock, Video } from 'lucide-react';
import ActivityChart from './ActivityChart';

const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {studentData.name}! 👋</h1>
        <p className="text-gray-500 mt-1">Here is your academic and coding overview for today.</p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Attendance Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Overall Attendance</p>
            <h3 className="text-2xl font-bold text-gray-900">{studentData.attendancePercentage}%</h3>
          </div>
        </div>

        {/* Coding Progress Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Code className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Problems Solved</p>
            <h3 className="text-2xl font-bold text-gray-900">{studentData.problemsSolved}</h3>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Placeholder for Chart */}
        <div className="lg:col-span-2">
           <ActivityChart />
        </div>

        {/* Right Column: Upcoming Classes */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-500" />
            Upcoming Classes
          </h3>
          <div className="space-y-4">
            {studentData.upcomingClasses.map((cls) => (
              <div key={cls.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 hover:bg-white transition-colors">
                <h4 className="font-semibold text-gray-800">{cls.subject}</h4>
                <p className="text-sm text-gray-500 mt-1">{cls.time} • {cls.instructor}</p>
                <button className="mt-3 w-full flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
                  <Video className="w-4 h-4 mr-2" />
                  Join via Meet
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;