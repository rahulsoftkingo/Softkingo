import ImageUploadComponent from '@/components/admin/ImageUploadComponent';

export default function EmployeeDrawer({ open, onClose, onSaved, editing }) {
  const isEdit = !!editing;
  const [form, setForm] = useState({
    name: '',
    title: '',
    department: '',
    photo: '',
    email: '',
    phone: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || '',
        title: editing.title || '',
        department: editing.department || '',
        photo: editing.photo || '',
        email: editing.email || '',
        phone: editing.phone || '',
      });
    } else {
      setForm({
        name: '',
        title: '',
        department: '',
        photo: '',
        email: '',
        phone: '',
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const url = isEdit
      ? `/api/admin/employees/${editing.id}`
      : '/api/admin/employees';
    const method = isEdit ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message || 'Failed to save employee.');
      setSaving(false);
      return;
    }

    setSaving(false);
    onSaved();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div
        className="flex-1 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="w-full max-w-md bg-white h-full shadow-[0_18px_45px_rgba(15,23,42,0.25)] p-5 sm:p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              {isEdit ? 'Edit employee' : 'Add employee'}
            </h2>
            <p className="text-xs text-slate-500">
              Internal employee directory item.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo */}
          <div className="space-y-2">
            <ImageUploadComponent
              value={form.photo}
              onChange={(value) => setForm(prev => ({ ...prev, photo: value }))}
              placeholder="/images/employees/photo.png"
              title="Profile Photo"
              showRecent={true}
              folder="employees"
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Full name"
              required
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="e.g. Backend Developer"
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              Department
            </label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="e.g. Engineering, Support"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="employee@softkingo.com"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              Phone
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="+91…"
            />
          </div>

          {error && (
            <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-500 disabled:bg-sky-300"
            >
              {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
