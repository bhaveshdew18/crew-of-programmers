import { useState } from 'react';
import { AlertCircle, CheckCircle2, ClipboardCheck } from 'lucide-react';
import { attendanceService } from '../../api/attendanceService';

const initialForm = {
  userId: '',
  classId: '',
  status: 'PRESENT',
};

const TeacherAttendance = () => {
  const [formData, setFormData] = useState(initialForm);
  const [submissions, setSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setError('');

    const payload = {
      userId: Number(formData.userId),
      classId: Number(formData.classId),
      status: formData.status,
    };

    try {
      const response = await attendanceService.markAttendance(payload);
      const savedRecord = response?.data?.data ?? {
        ...payload,
        date: new Date().toISOString().slice(0, 10),
      };

      setSubmissions((current) => [savedRecord, ...current]);
      setMessage('Attendance marked successfully.');
      setFormData(initialForm);
    } catch (requestError) {
      const queuedRecord = {
        id: Date.now(),
        ...payload,
        date: new Date().toISOString().slice(0, 10),
        queued: true,
      };

      setSubmissions((current) => [queuedRecord, ...current]);
      setError(
        requestError.response?.data?.message ||
        'Backend mark failed. The record has been queued locally so the flow remains usable.'
      );
      setFormData(initialForm);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-500 mt-1">Mark daily attendance and keep a visible submission log.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6">
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900">Mark Attendance</h2>

          {message && (
            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 flex items-start">
              <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              {message}
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 flex items-start">
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Student User ID</span>
              <input
                type="number"
                min="1"
                value={formData.userId}
                onChange={(event) => setFormData((current) => ({ ...current, userId: event.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="3"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Class ID</span>
              <input
                type="number"
                min="1"
                value={formData.classId}
                onChange={(event) => setFormData((current) => ({ ...current, classId: event.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="1"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Status</span>
              <select
                value={formData.status}
                onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
                <option value="LATE">Late</option>
              </select>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              <ClipboardCheck className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
            </button>
          </form>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900">Submission Log</h2>
          <div className="mt-5 space-y-3">
            {submissions.length === 0 ? (
              <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-6 text-sm text-gray-500">
                No attendance submissions yet.
              </div>
            ) : (
              submissions.map((record) => (
                <article key={record.id ?? `${record.userId}-${record.classId}-${record.date}`} className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">Student #{record.userId} · Class #{record.classId}</p>
                      <p className="text-sm text-gray-500 mt-1">{record.date || 'Today'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-blue-700">{record.status}</p>
                      {record.queued && <p className="text-xs text-amber-700 mt-1">Queued locally</p>}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherAttendance;
