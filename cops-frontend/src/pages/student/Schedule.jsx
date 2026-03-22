import React from 'react';
import { studentData } from '../../data/mockData';
import { Calendar as CalendarIcon, Clock, MapPin, Video } from 'lucide-react';

const Schedule = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Weekly Schedule</h1>
        <p className="text-gray-500 mt-1">Manage your upcoming lectures and lab sessions.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {studentData.fullSchedule?.map((session) => (
            <div key={session.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg hidden sm:block">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                      {session.day}
                    </span>
                    <span className="text-xs font-medium text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full">
                      {session.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">{session.subject}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {session.time}</span>
                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {session.room}</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center justify-center py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                <Video className="w-4 h-4 mr-2" />
                Join Class
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;