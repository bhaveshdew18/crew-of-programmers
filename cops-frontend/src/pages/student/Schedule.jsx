import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, Clock, Loader, MapPin, Video } from 'lucide-react';
import { scheduleService } from '../../api/scheduleService';
import { studentData } from '../../data/mockdata';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const response = await scheduleService.getAllSchedules();
        const nextSchedules = response?.data?.data || [];

        setSchedules(nextSchedules.length ? nextSchedules : studentData.fullSchedule);
        setUsingFallback(nextSchedules.length === 0);
        setError(nextSchedules.length === 0 ? 'Schedule endpoint returned no items. Showing fallback data.' : '');
      } catch (requestError) {
        setSchedules(studentData.fullSchedule);
        setUsingFallback(true);
        setError('Live schedule is unavailable. Showing fallback timetable.');
        console.error('Error fetching schedules:', requestError);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Weekly Schedule</h1>
        <p className="text-gray-500 mt-1">Manage your upcoming lectures and lab sessions.</p>
      </div>

      {error && (
        <div className={`px-4 py-3 rounded-lg border ${usingFallback ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-red-50 border-red-200 text-red-700'}`}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="ml-2 text-gray-600">Loading schedules...</span>
        </div>
      ) : schedules.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-gray-500">
          No schedules available
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {schedules.map((session) => (
              <div key={session.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg hidden sm:block">
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                        {session.day || 'N/A'}
                      </span>
                      <span className="text-xs font-medium text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full">
                        {session.type || 'Lecture'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">{session.subject || 'Subject'}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {session.time || 'TBD'}</span>
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {session.room || 'Online'}</span>
                    </div>
                  </div>
                </div>

                {session.meetLink ? (
                  <a
                    href={session.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Join Class
                  </a>
                ) : (
                  <div className="flex items-center justify-center py-2 px-6 bg-gray-100 text-gray-600 font-medium rounded-lg">
                    Room Details
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
