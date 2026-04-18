import { CalendarDays, MapPin, Video } from 'lucide-react';
import { teacherData } from '../../data/mockdata';

const Lectures = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lectures</h1>
        <p className="text-gray-500 mt-1">Today&apos;s sessions and their delivery mode.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {teacherData.todaySchedule.map((lecture) => (
            <div key={lecture.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wide">
                  {lecture.type}
                </div>
                <h2 className="mt-3 text-lg font-bold text-gray-900">{lecture.subject}</h2>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-1.5" />
                    {lecture.time}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    {lecture.room}
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center text-sm font-medium text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
                <Video className="w-4 h-4 mr-2" />
                {lecture.room.toLowerCase().includes('room') ? 'In-person session' : 'Hybrid session'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lectures;
