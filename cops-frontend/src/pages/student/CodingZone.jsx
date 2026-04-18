import { Code2, CircleCheck, Flame, Layers3 } from 'lucide-react';
import { codingChallenges, studentData } from '../../data/mockdata';

const CodingZone = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Coding Zone</h1>
        <p className="text-gray-500 mt-1">Track problem solving momentum and keep your next practice queue visible.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center text-sm text-gray-500">
            <CircleCheck className="w-4 h-4 mr-2 text-green-600" />
            Problems Solved
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">{studentData.problemsSolved}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center text-sm text-gray-500">
            <Flame className="w-4 h-4 mr-2 text-orange-500" />
            Weekly Streak
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">6 days</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center text-sm text-gray-500">
            <Layers3 className="w-4 h-4 mr-2 text-blue-600" />
            Focus Topics
          </div>
          <p className="mt-3 text-lg font-semibold text-gray-900">Arrays, Graphs, DP</p>
        </div>
      </div>

      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Practice Queue</h2>
            <p className="text-sm text-gray-500 mt-1">A short list of problems to keep the next session focused.</p>
          </div>
          <div className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
            <Code2 className="w-4 h-4 mr-2" />
            Practice Ready
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {codingChallenges.map((challenge) => (
            <article key={challenge.id} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">{challenge.difficulty}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {challenge.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm font-medium text-blue-700">{challenge.status}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CodingZone;
