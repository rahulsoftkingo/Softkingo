'use client';

import { useEffect, useState } from 'react';

const DEFAULT_BADGES_TEMPLATE = `{
  "play": {
    "id": "project-play",
    "src": "/images/badges/google-play.png",
    "href": "https://play.google.com/store/apps/details?id=com.example"
  },
  "app": {
    "id": "project-appstore",
    "src": "/images/badges/app-store.png",
    "href": "https://apps.apple.com/app/id000000000"
  },
  "web": {
    "id": "project-web",
    "src": "/images/badges/web-badge.png",
    "href": "https://example.com"
  }
}`;

export default function ProjectDrawer({
  open,
  onClose,
  onSaved,
  project,
  caseStudies,
}) {
  const isEdit = !!project;

  const [form, setForm] = useState({
    key: '',
    type: 'app',
    title: '',
    category: '',
    description: '',
    techStack: '',
    platforms: '',
    country: '',
    bgImage: '',
    bgColor: '',
    icon: '',
    phoneMockup: '',
    badgesJson: DEFAULT_BADGES_TEMPLATE,
    caseStudyId: '',
  });

  // 3-color gradient builder
  const [colorStart, setColorStart] = useState('#0ea5e9');
  const [colorMiddle, setColorMiddle] = useState('#22d3ee');
  const [colorEnd, setColorEnd] = useState('#0369a1');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setForm({
        key: project.key || '',
        type: project.type || 'app',
        title: project.title || '',
        category: project.category || '',
        description: project.description || '',
        techStack: project.techStack || '',
        platforms: project.platforms || '',
        country: project.country || '',
        bgImage: project.bgImage || '',
        bgColor: project.bgColor || '',
        icon: project.icon || '',
        phoneMockup: project.phoneMockup || '',
        badgesJson: project.badgesJson || DEFAULT_BADGES_TEMPLATE,
        caseStudyId: project.caseStudyId ? String(project.caseStudyId) : '',
      });

      if (project.bgColor?.includes('#')) {
        const matches = project.bgColor.match(/#([0-9a-fA-F]{3,8})/g) || [];
        setColorStart(matches[0] || '#0ea5e9');
        setColorMiddle(matches[1] || '#22d3ee');
        setColorEnd(matches[2] || '#0369a1');
      }
    } else {
      setForm({
        key: '',
        type: 'app',
        title: '',
        category: '',
        description: '',
        techStack: '',
        platforms: '',
        country: '',
        bgImage: '',
        bgColor: '',
        icon: '',
        phoneMockup: '',
        badgesJson: DEFAULT_BADGES_TEMPLATE,
        caseStudyId: '',
      });
      setColorStart('#0ea5e9');
      setColorMiddle('#22d3ee');
      setColorEnd('#0369a1');
    }
    setError('');
  }, [project]);

  // Sync bgColor from 3-color gradient
  useEffect(() => {
    const gradient = `linear-gradient(135deg, ${colorStart} 0%, ${colorMiddle} 50%, ${colorEnd} 100%)`;
    setForm((prev) => ({ ...prev, bgColor: gradient }));
  }, [colorStart, colorMiddle, colorEnd]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBadgesTemplate = () => {
    setForm((prev) => ({ ...prev, badgesJson: DEFAULT_BADGES_TEMPLATE }));
  };

  // File upload handler placeholder – wire to your real upload API
  const handleUpload = async (e, targetField) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Example placeholder – replace with your actual upload logic:
      // const formData = new FormData();
      // formData.append('file', file);
      // const res = await fetch('/api/admin/media/upload', { method: 'POST', body: formData });
      // const data = await res.json();
      // const url = data.url;

      const url = `/uploads/${file.name}`; // temporary placeholder

      setForm((prev) => ({ ...prev, [targetField]: url }));
    } catch (err) {
      console.error(err);
      setError('Image upload failed. Please try again.');
    } finally {
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.key.trim() || !form.title.trim() || !form.type.trim()) {
      setError('Key, title and type are required.');
      return;
    }

    let badges = null;
    if (form.badgesJson && form.badgesJson.trim()) {
      try {
        badges = JSON.parse(form.badgesJson);
      } catch {
        setError('Badges JSON is invalid. Please paste valid JSON.');
        return;
      }
    }

    setSaving(true);
    setError('');

    const url = isEdit
      ? `/api/admin/portfolio-projects/${project.id}`
      : '/api/admin/portfolio-projects';
    const method = isEdit ? 'PATCH' : 'POST';

    const payload = {
      key: form.key,
      type: form.type,
      title: form.title,
      category: form.category || null,
      description: form.description || null,
      techStack: form.techStack || null,
      platforms: form.platforms || null,
      country: form.country || null,
      bgImage: form.bgImage || null,
      bgColor: form.bgColor || null,
      icon: form.icon || null,
      phoneMockup: form.phoneMockup || null,
      badges,
      caseStudyId: form.caseStudyId ? Number(form.caseStudyId) : null,
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message || 'Failed to save project.');
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
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              {isEdit ? 'Edit portfolio project' : 'Add portfolio project'}
            </h2>
            <p className="text-xs text-slate-500">
              Configure how this project appears in the public portfolio grid and
              hero carousel.
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basics */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Basics
            </p>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Project key
              </label>
              <input
                name="key"
                value={form.key}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="lovelocal-grocery-app"
              />
              <p className="text-[11px] text-slate-400">
                Stable identifier used in frontend. Keep it URL-friendly and
                immutable.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-700">
                  Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="app">App</option>
                  <option value="web">Web</option>
                  <option value="saas">SaaS</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-700">
                  Category
                </label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="E-Commerce, Education, Taxi..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Short description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="One or two lines describing the product."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-700">
                  Tech stack
                </label>
                <input
                  name="techStack"
                  value={form.techStack}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Flutter, Node.js, MongoDB"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-700">
                  Platforms
                </label>
                <input
                  name="platforms"
                  value={form.platforms}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="iOS · Android · Web"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-700">
                  Country
                </label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="India, US..."
                />
              </div>
            </div>
          </section>

          {/* Visual configuration */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Visuals
            </p>

            {/* Background preview */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div
                className="h-16 w-full"
                style={{
                  background:
                    form.bgColor ||
                    'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
                }}
              />
              <div className="px-3 py-2 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Background preview</span>
                <span className="truncate max-w-[180px]">
                  {form.bgColor || 'Default blue gradient'}
                </span>
              </div>
            </div>

            {/* 3-color gradient builder */}
            <div className="space-y-2">
              <p className="text-[11px] font-medium text-slate-600">
                Gradient colors
              </p>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-500">
                    Start
                  </label>
                  <input
                    type="color"
                    value={colorStart}
                    onChange={(e) => setColorStart(e.target.value)}
                    className="h-8 w-full rounded border border-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-500">
                    Middle
                  </label>
                  <input
                    type="color"
                    value={colorMiddle}
                    onChange={(e) => setColorMiddle(e.target.value)}
                    className="h-8 w-full rounded border border-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-500">
                    End
                  </label>
                  <input
                    type="color"
                    value={colorEnd}
                    onChange={(e) => setColorEnd(e.target.value)}
                    className="h-8 w-full rounded border border-slate-200"
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Adjust the three colors above to generate a custom gradient
                background.
              </p>
            </div>

            {/* Image URLs + upload buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Background image */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Background image URL
                </label>
                <input
                  name="bgImage"
                  value={form.bgImage}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="/images/portfolio/bg-1.png"
                />
                <label className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
                  <span className="rounded-full border border-slate-300 px-2 py-0.5 bg-white">
                    Upload
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUpload(e, 'bgImage')}
                  />
                  <span>Choose image and update URL</span>
                </label>
              </div>

              {/* Icon image */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Icon image URL
                </label>
                <input
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="/images/portfolio/project-icon.png"
                />
                <label className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
                  <span className="rounded-full border border-slate-300 px-2 py-0.5 bg-white">
                    Upload
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUpload(e, 'icon')}
                  />
                  <span>Upload icon and update URL</span>
                </label>
              </div>

              {/* Phone mockup */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Phone mockup URL
                </label>
                <input
                  name="phoneMockup"
                  value={form.phoneMockup}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="/images/portfolio/project-phone.png"
                />
                <label className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
                  <span className="rounded-full border border-slate-300 px-2 py-0.5 bg-white">
                    Upload
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUpload(e, 'phoneMockup')}
                  />
                  <span>Upload mockup and update URL</span>
                </label>
              </div>
            </div>
          </section>

          {/* Badges JSON */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Store badges
              </p>
              <button
                type="button"
                onClick={handleBadgesTemplate}
                className="text-[11px] text-sky-700 hover:text-sky-900"
              >
                Reset template
              </button>
            </div>
            <textarea
              name="badgesJson"
              value={form.badgesJson}
              onChange={handleChange}
              rows={6}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-mono leading-snug focus:outline-none focus:ring-2 focus:ring-sky-500"
              spellCheck={false}
            />
            <p className="text-[11px] text-slate-400">
              {/* Paste a JSON object with keys like "play", "app", "web". Each
              entry uses image URLs in de>src</code> and an optional link URL
              in de>href</code>. Example is prefilled above. */}kok
            </p>
          </section>

          {/* Case study link */}
          <section className="space-y-2 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <label className="block text-xs font-medium text-slate-700">
              Linked case study (optional)
            </label>
            <select
              name="caseStudyId"
              value={form.caseStudyId}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">Not linked</option>
              {caseStudies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title || c.slug}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400">
              When linked, the portfolio card can show a “View case study” button
              that points to /case-studies/[slug].
            </p>
          </section>

          {error && (
            <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between pt-1 pb-3">
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
              {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
