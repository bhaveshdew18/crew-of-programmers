import { BookOpen, Clock, MapPin, Users } from 'lucide-react';
import { buildStudentClassrooms, studentData } from '../../data/mockdata';

const classrooms = buildStudentClassrooms(studentData.fullSchedule);

const Classrooms = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Classrooms</h1>
        <p className="text-gray-500 mt-1">Browse each subject and its upcoming sessions in one place.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {classrooms.map((classroom) => (
          <section key={classroom.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-blue-700 bg-blue-50">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                  {classroom.instructor}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-3">{classroom.subject}</h2>
              </div>
              <div className="text-sm text-gray-500 flex items-center">
                <Users className="w-4 h-4 mr-1.5" />
                Active
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {classroom.sessions.map((session) => (
                <div key={session.id} className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-gray-900">{session.day}</span>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{session.type}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1.5" />
                      {session.time}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1.5" />
                      {session.room}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Classrooms;
