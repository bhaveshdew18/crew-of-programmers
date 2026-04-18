import { useEffect, useState } from 'react';
import { AlertCircle, BookOpen, CheckCircle, Clock, Code, Loader, Video } from 'lucide-react';
import ActivityChart from './ActivityChart';
import { dashboardService } from '../../api/dashboardService';
import { studentData } from '../../data/mockdata';
import { useAuth } from '../../context/useAuth';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(studentData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getStats();
        const nextData = response?.data?.data;

        setDashboardData({
          ...studentData,
          ...nextData,
          totalClasses: nextData?.totalClasses ?? studentData.totalClasses,
          upcomingClasses: nextData?.upcomingClasses?.length ? nextData.upcomingClasses : studentData.upcomingClasses,
        });
        setUsingFallback(false);
        setError('');
      } catch (requestError) {
        setDashboardData(studentData);
        setUsingFallback(true);
        setError(requestError.response?.data?.message || 'Live dashboard data is unavailable. Showing fallback data.');
        console.error('Error fetching dashboard:', requestError);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
        <div className="ml-3 text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.fullName || 'Student'}!</h1>
        <p className="text-gray-500 mt-1">Here is your academic and coding overview for today.</p>
      </div>

      {error && (
        <div className={`p-4 rounded-lg border flex items-start ${usingFallback ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
          <AlertCircle className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${usingFallback ? 'text-amber-600' : 'text-red-600'}`} />
          <div>
            <p className={`font-medium ${usingFallback ? 'text-amber-900' : 'text-red-800'}`}>
              {usingFallback ? 'Fallback dashboard active' : 'Error loading dashboard'}
            </p>
            <p className={`text-sm mt-1 ${usingFallback ? 'text-amber-800' : 'text-red-700'}`}>{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Overall Attendance</p>
            <h3 className="text-2xl font-bold text-gray-900">{dashboardData.attendancePercentage || 0}%</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Code className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Problems Solved</p>
            <h3 className="text-2xl font-bold text-gray-900">{dashboardData.problemsSolved || 0}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Classes</p>
            <h3 className="text-2xl font-bold text-gray-900">{dashboardData.totalClasses || 0}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-500" />
            Upcoming Classes
          </h3>
          <div className="space-y-4">
            {dashboardData.upcomingClasses?.length ? (
              dashboardData.upcomingClasses.map((currentClass) => (
                <div key={currentClass.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 hover:bg-white transition-colors">
                  <h4 className="font-semibold text-gray-800">{currentClass.subject}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {currentClass.time} · {currentClass.instructor || currentClass.room || 'Faculty'}
                  </p>
                  {currentClass.meetLink ? (
                    <a
                      href={currentClass.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 w-full flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Join via Meet
                    </a>
                  ) : (
                    <div className="mt-3 w-full flex items-center justify-center py-2 px-4 bg-gray-100 text-gray-600 text-sm font-medium rounded-md">
                      Room: {currentClass.room || 'See schedule'}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No upcoming classes today</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
