import { useEffect, useState } from 'react';
import { AlertCircle, BookOpen, Calendar, Loader, Users } from 'lucide-react';
import { dashboardService } from '../../api/dashboardService';
import { teacherData } from '../../data/mockdata';

const TeacherDashboard = () => {
  const [stats, setStats] = useState(teacherData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchTeacherStats = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getTeacherStats();
        const nextStats = response?.data?.data;

        setStats({
          ...teacherData,
          ...nextStats,
          todaySchedule: nextStats?.todaySchedule?.length ? nextStats.todaySchedule : teacherData.todaySchedule,
        });
        setUsingFallback(false);
        setError('');
      } catch (requestError) {
        setStats(teacherData);
        setUsingFallback(true);
        setError('Live teacher statistics are unavailable. Showing fallback data.');
        console.error('Error fetching teacher stats:', requestError);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherStats();
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your active classes and daily schedule.</p>
      </div>

      {error && (
        <div className={`px-4 py-3 rounded-lg border ${usingFallback ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-red-50 border-red-200 text-red-700'}`}>
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="ml-2 text-gray-600">Loading dashboard...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-lg">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalStudents}</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
              <div className="p-4 bg-green-100 text-green-600 rounded-lg">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Classrooms</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.activeClassrooms}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-gray-500" />
              Today&apos;s Schedule
            </h3>
            {stats.todaySchedule.length === 0 ? (
              <div className="text-center text-gray-500 py-6">No classes scheduled for today</div>
            ) : (
              <div className="space-y-4">
                {stats.todaySchedule.map((currentClass) => (
                  <div key={currentClass.id} className="flex items-center p-4 border border-gray-100 rounded-lg bg-gray-50">
                    <div className="p-3 bg-white rounded-lg border border-gray-200 mr-4">
                      <Calendar className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{currentClass.subject || 'Subject'}</h4>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {currentClass.time || currentClass.day || 'Time TBD'} · {currentClass.room || 'Room TBD'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherDashboard;
