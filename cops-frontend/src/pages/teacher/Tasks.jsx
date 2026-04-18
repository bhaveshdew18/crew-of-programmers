import { ClipboardList, Clock3 } from 'lucide-react';
import { teacherData } from '../../data/mockdata';

const Tasks = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tests and Tasks</h1>
        <p className="text-gray-500 mt-1">Review assignments that need grading attention or deadline follow-up.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teacherData.tasks.map((task) => (
          <article key={task.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                  <ClipboardList className="w-3.5 h-3.5 mr-1.5" />
                  {task.course}
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">{task.title}</h2>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                {task.status}
              </span>
            </div>
            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <p className="flex items-center">
                <Clock3 className="w-4 h-4 mr-2 text-gray-400" />
                Due on {task.dueDate}
              </p>
              <p>{task.submissions} of {task.totalStudents} submissions received</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
