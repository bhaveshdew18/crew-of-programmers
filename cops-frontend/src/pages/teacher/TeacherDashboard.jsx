import React from 'react';
import { Users, Calendar, BookOpen } from 'lucide-react';

const TeacherDashboard = () => {
  // Stripped down to just subject and time
  const upcomingClasses = [
    { id: 1, subject: "Data Structures & Algorithms", time: "10:00 AM" },
    { id: 2, subject: "C++ Advanced Lab", time: "02:00 PM" },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your active classes and daily schedule.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-lg">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Students</p>
            <h3 className="text-2xl font-bold text-gray-900">124</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-4 bg-green-100 text-green-600 rounded-lg">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Classrooms</p>
            <h3 className="text-2xl font-bold text-gray-900">4</h3>
          </div>
        </div>
      </div>

      {/* Today's Schedule - Subject and Time Only */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-gray-500" /> Today's Schedule
        </h3>
        <div className="space-y-4">
          {upcomingClasses.map(cls => (
            <div key={cls.id} className="flex items-center p-4 border border-gray-100 rounded-lg bg-gray-50">
              <div className="p-3 bg-white rounded-lg border border-gray-200 mr-4">
                <Calendar className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{cls.subject}</h4>
                <p className="text-sm text-gray-500 mt-0.5">{cls.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;