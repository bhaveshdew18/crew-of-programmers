import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, ClipboardCheck, Loader, XCircle } from 'lucide-react';
import { attendanceService } from '../../api/attendanceService';
import { studentData } from '../../data/mockdata';
import { useAuth } from '../../context/useAuth';

const isPresentStatus = (status) => String(status || '').toUpperCase() === 'PRESENT';

const Attendance = () => {
  const { user } = useAuth();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);

        if (!user?.id) {
          setAttendanceData(studentData.attendanceHistory);
          setUsingFallback(true);
          setError('User ID is unavailable. Showing fallback attendance history.');
          return;
        }

        const response = await attendanceService.getAttendanceByUser(user.id);
        const records = response?.data?.data || [];

        setAttendanceData(records.length ? records : studentData.attendanceHistory);
        setUsingFallback(records.length === 0);
        setError(records.length === 0 ? 'Attendance endpoint returned no records. Showing fallback data.' : '');
      } catch (requestError) {
        setAttendanceData(studentData.attendanceHistory);
        setUsingFallback(true);
        setError(requestError.response?.data?.message || 'Live attendance is unavailable. Showing fallback data.');
        console.error('Error fetching attendance:', requestError);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-6 h-6 text-blue-600 animate-spin" />
        <div className="ml-3 text-lg text-gray-600">Loading attendance data...</div>
      </div>
    );
  }

  const subjectMap = new Map();

  attendanceData.forEach((record) => {
    const subject = record.className || record.subject || 'Unknown Class';

    if (!subjectMap.has(subject)) {
      subjectMap.set(subject, { attended: 0, total: 0 });
    }

    const summary = subjectMap.get(subject);
    summary.total += 1;

    if (isPresentStatus(record.status)) {
      summary.attended += 1;
    }
  });

  const subjectAttendance = Array.from(subjectMap).map(([subject, summary]) => ({
    subject,
    percentage: summary.total > 0 ? Math.round((summary.attended / summary.total) * 100) : 0,
    attended: summary.attended,
    total: summary.total,
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Tracker</h1>
        <p className="text-gray-500 mt-1">Review your subject-wise attendance and recent history.</p>
      </div>

      {error && (
        <div className={`p-4 rounded-lg border flex items-start ${usingFallback ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
          <AlertCircle className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${usingFallback ? 'text-amber-600' : 'text-red-600'}`} />
          <div>
            <p className={`font-medium ${usingFallback ? 'text-amber-900' : 'text-red-800'}`}>
              {usingFallback ? 'Fallback attendance active' : 'Error loading attendance'}
            </p>
            <p className={`text-sm mt-1 ${usingFallback ? 'text-amber-800' : 'text-red-700'}`}>{error}</p>
          </div>
        </div>
      )}

      {attendanceData.length === 0 ? (
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">No attendance records found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <ClipboardCheck className="w-5 h-5 mr-2 text-blue-600" />
              Subject Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectAttendance.map((subject) => (
                <div key={subject.subject} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="font-semibold text-gray-800 truncate">{subject.subject}</h4>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <span className="text-3xl font-bold text-gray-900">{subject.percentage}%</span>
                      <p className="text-xs text-gray-500 mt-1">{subject.attended} / {subject.total} Classes Attended</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center ${subject.percentage >= 75 ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600'}`}>
                      {subject.percentage >= 75 ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Scans</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {attendanceData.slice(0, 10).map((record) => (
                <div key={record.id ?? `${record.className}-${record.date}`} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{record.className || record.subject}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(record.date || record.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {isPresentStatus(record.status) ? (
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
      )}
    </div>
  );
};

export default Attendance;
