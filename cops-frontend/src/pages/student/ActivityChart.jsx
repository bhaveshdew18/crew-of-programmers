import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Activity, AlertCircle, Loader } from 'lucide-react';
import { dashboardService } from '../../api/dashboardService';
import { studentData } from '../../data/mockdata';

const ActivityChart = () => {
  const [activityData, setActivityData] = useState(studentData.weeklyActivity);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getWeeklyActivity();
        setActivityData(response?.data?.data?.length ? response.data.data : studentData.weeklyActivity);
        setError('');
      } catch (requestError) {
        setActivityData(studentData.weeklyActivity);
        setError('Live activity data is unavailable. Showing fallback data.');
        console.error('Error fetching activity:', requestError);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full min-h-[350px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-600" />
          Weekly Learning Activity
        </h3>
      </div>

      {error && (
        <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-2 rounded text-sm flex items-start">
          <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center flex-1">
          <Loader className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      ) : (
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} dy={10} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area
                type="monotone"
                dataKey="problems"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorProblems)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ActivityChart;
