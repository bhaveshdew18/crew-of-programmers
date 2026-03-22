import React from 'react';
import { studentData } from '../../data/mockData';
import { ClipboardCheck, CheckCircle, XCircle } from 'lucide-react';

const Attendance = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Tracker</h1>
        <p className="text-gray-500 mt-1">Review your subject-wise attendance and recent history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <ClipboardCheck className="w-5 h-5 mr-2 text-blue-600" /> Subject Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentData.subjectAttendance?.map((sub, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-semibold text-gray-800 truncate">{sub.subject}</h4>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">{sub.percentage}%</span>
                    <p className="text-xs text-gray-500 mt-1">{sub.attended} / {sub.total} Classes Attended</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center ${sub.percentage >= 75 ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600'}`}>
                    {sub.percentage >= 75 ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Scans</h3>
          <div className="space-y-4">
            {studentData.attendanceHistory?.map((record) => (
              <div key={record.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{record.subject}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{record.date}</p>
                </div>
                {record.status === 'Present' ? (
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" /> Present
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center">
                    <XCircle className="w-3 h-3 mr-1" /> Absent
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;