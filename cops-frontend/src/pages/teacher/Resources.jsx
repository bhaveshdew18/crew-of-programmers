import { useState } from 'react';
import { FileStack, Upload } from 'lucide-react';
import { teacherData } from '../../data/mockdata';

const Resources = () => {
  const [resources, setResources] = useState(teacherData.resources);
  const [formData, setFormData] = useState({
    title: '',
    type: 'PDF',
    audience: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.audience.trim()) {
      return;
    }

    setResources((current) => [
      {
        id: `res-${Date.now()}`,
        title: formData.title.trim(),
        type: formData.type,
        audience: formData.audience.trim(),
        updatedAt: new Date().toISOString().slice(0, 10),
      },
      ...current,
    ]);

    setFormData({
      title: '',
      type: 'PDF',
      audience: '',
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
        <p className="text-gray-500 mt-1">Manage course material inventory directly from the frontend.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900">Resource Library</h2>
          <div className="mt-5 space-y-3">
            {resources.map((resource) => (
              <article key={resource.id} className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">{resource.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{resource.audience} · Updated {resource.updatedAt}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-600">
                  {resource.type}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900">Add Resource</h2>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Title</span>
              <input
                value={formData.title}
                onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="Week 7 Revision Notes"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Type</span>
              <select
                value={formData.type}
                onChange={(event) => setFormData((current) => ({ ...current, type: event.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option>PDF</option>
                <option>Slides</option>
                <option>Sheet</option>
                <option>Link</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Audience</span>
              <input
                value={formData.audience}
                onChange={(event) => setFormData((current) => ({ ...current, audience: event.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="Database Systems"
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              Save Resource
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            <div className="flex items-center">
              <FileStack className="w-4 h-4 mr-2" />
              Resources added here persist for the current session and keep the workflow usable without a backend endpoint.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;
