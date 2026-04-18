import { BookOpen, CalendarDays, Users } from 'lucide-react';
import { teacherData } from '../../data/mockdata';

const Classrooms = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Classrooms</h1>
        <p className="text-gray-500 mt-1">A live overview of your active teaching groups.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {teacherData.classrooms.map((classroom) => (
          <article key={classroom.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              {classroom.batch}
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">{classroom.name}</h2>
            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <p className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-gray-400" />
                {classroom.students} enrolled students
              </p>
              <p className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                Next session: {classroom.nextSession}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Classrooms;
