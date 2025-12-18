'use client';

import { useEffect, useState } from 'react';

// Generic image field with upload + URL + preview
// function ImageField({ label, name, value, onChange, placeholder }) {
//  const handleFile = async (e) => {
//   const file = e.target.files?.[0];
//   if (!file) return;
//   try {
//     const fd = new FormData();
//     fd.append('file', file);
//     const res = await fetch('/api/admin/media/upload', {
//       method: 'POST',
//       body: fd,
//     });
//     if (!res.ok) {
//       console.error('Upload failed');
//       return;
//     }
//     const data = await res.json();
//     const url = data.url; // /uploads/xyz.png
//     onChange({ target: { name, value: url } });
//   } finally {
//     e.target.value = '';
//   }
// };


//   return (
//     <div className="space-y-1.5">
//       <label className="block text-xs font-medium text-slate-700">
//         {label}
//       </label>
//       <input
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
//         placeholder={placeholder}
//       />
//       <div className="flex items-center gap-2 mt-0.5">
//         <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
//           <span className="rounded-full border border-slate-300 px-2 py-0.5 bg-white">
//             Upload
//           </span>
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleFile}
//           />
//           <span>Choose image</span>
//         </label>
//         {value && (
//           <span className="text-[11px] text-slate-400 truncate max-w-[160px]">
//             {value}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

function ImageField({ label, name, value, onChange, placeholder }) {
  const [previewError, setPreviewError] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) {
        console.error('Upload failed');
        return;
      }
      const data = await res.json();
      const url = data.url; // e.g. /uploads/xyz.png
      setPreviewError(false);
      onChange({ target: { name, value: url } });
    } finally {
      e.target.value = '';
    }
  };

  const showPreview = value && !previewError;

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-slate-700">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={(e) => {
          setPreviewError(false);
          onChange(e);
        }}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
        placeholder={placeholder}
      />
      <div className="flex items-center gap-3 mt-0.5">
        <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
          <span className="rounded-full border border-slate-300 px-2 py-0.5 bg-white">
            Upload
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
          <span>Choose image</span>
        </label>

        {showPreview ? (
          <div className="flex items-center gap-1.5">
            <div className="h-8 w-8 rounded-md border border-slate-200 overflow-hidden bg-slate-50">
              <img
                src={value}
                alt="preview"
                className="h-full w-full object-cover"
                onError={() => setPreviewError(true)}
              />
            </div>
            <span className="text-[11px] text-slate-400 truncate max-w-[120px]">
              {value}
            </span>
          </div>
        ) : value ? (
          <span className="text-[11px] text-rose-500">
            Preview not available
          </span>
        ) : null}
      </div>
    </div>
  );
}


export default function CaseStudyDrawer({ open, onClose, onSaved, caseStudy }) {
  const isEdit = !!caseStudy;

  const [form, setForm] = useState({
    slug: '',
    title: '',
    subtitle: '',
    logo: '',
    heroBgImage: '',
    heroMockups: '',
    // branding
    primaryColor: '#0EA5E9',
    secondaryColor: '#0B3250',
    accentColor: '#22C55E',
    primaryFont: 'DM Sans',
    // client typography (for About Client section)
    clientHeadingFont: 'DM Sans',
    clientBodyFont: 'DM Sans',
    // team
    teamSize: '06 People',
    teamRoles: 'PM / TL / Devs / Designers / QA',
    teamTimeline: '60 Days',
    teamDuration: 'Design + Development',
    // client
    clientName: '',
    clientSubtitle: '',
    clientLocation: '',
    clientIndustry: '',
    clientAvatar: '',
    // technologies (repeatable)
    techBackgroundImage: '/images/tech-bg.jpg',
    techItems: [{ name: 'React JS', icon: '/images/tech/react-js.png' }],
    // overview
    overviewDescription: '',
    overviewMockup: '/images/case-studies/overview-phone.png',
    // requirements (line based)
    requirementsText: '',
    requirementsMockup: '/images/case-studies/requirements-phone.png',
    // goals
    goalsBackgroundImage: '/images/case-studies/goals-bg.jpg',
    goalsText: '',
    // challenges
    challengeText: '',
    solutionText: '',
    // app screens (fully structured)
    appScreensTitle: 'How Your App Looks When It Is Ready',
    appScreensCategories: [
      {
        id: 'customer',
        name: 'Customer App',
        screens: [
          { name: 'Home', image: '/images/case-studies/screen1.png' },
        ],
      },
    ],
    // results blocks (each block = position + mockup + lines)
    resultsBlocks: [
      {
        position: 'left',
        mockup: '/images/case-studies/screen1.png',
        items: ['Example result'],
      },
    ],
    // find your app
    findTitle: '',
    findDescription: '',
    findMockup: '/images/case-studies/find-app-phone.png',
    // SEO
    seoTitle: '',
    seoDescription: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Load existing caseStudy -> map JSON to form
  useEffect(() => {
    if (caseStudy) {
      const branding = safeParse(caseStudy.brandingJson, {});
      const team = safeParse(caseStudy.teamJson, {});
      const client = safeParse(caseStudy.clientJson, {});
      const technologies = safeParse(caseStudy.technologiesJson, {});
      const overview = safeParse(caseStudy.overviewJson, {});
      const requirements = safeParse(caseStudy.requirementsJson, {});
      const goals = safeParse(caseStudy.goalsJson, {});
      const challenges = safeParse(caseStudy.challengesJson, {});
      const appScreens = safeParse(caseStudy.appScreensJson, {});
      const resultsBlocks = safeParse(caseStudy.resultsJson, []);
      const findYourApp = safeParse(caseStudy.findYourAppJson, {});

      setForm((prev) => ({
        ...prev,
        slug: caseStudy.slug || '',
        title: caseStudy.title || '',
        subtitle: caseStudy.subtitle || '',
        logo: caseStudy.logo || '',
        heroBgImage: caseStudy.heroBgImage || '',
        heroMockups: caseStudy.heroMockups || '',
        primaryColor: branding.primaryColor || prev.primaryColor,
        secondaryColor: branding.secondaryColor || prev.secondaryColor,
        accentColor: branding.accentColor || prev.accentColor,
        primaryFont: branding.primaryFont || prev.primaryFont,
        clientHeadingFont:
          branding.clientHeadingFont || prev.clientHeadingFont,
        clientBodyFont: branding.clientBodyFont || prev.clientBodyFont,
        teamSize: team.size || prev.teamSize,
        teamRoles: team.roles || prev.teamRoles,
        teamTimeline: team.timeline || prev.teamTimeline,
        teamDuration: team.duration || prev.teamDuration,
        clientName: client.name || '',
        clientSubtitle: client.subtitle || '',
        clientLocation: client.location || '',
        clientIndustry: client.industry || '',
        clientAvatar: client.avatar || '',
        techBackgroundImage:
          technologies.backgroundImage || prev.techBackgroundImage,
        techItems: technologies.items && technologies.items.length
          ? technologies.items
          : prev.techItems,
        overviewDescription: overview.description || '',
        overviewMockup: overview.mockup || prev.overviewMockup,
        requirementsText: (requirements.items || [])
          .map((i) => `${i.title}: ${i.description}`)
          .join('\n'),
        requirementsMockup: requirements.mockup || prev.requirementsMockup,
        goalsBackgroundImage:
          goals.backgroundImage || prev.goalsBackgroundImage,
        goalsText: (goals.items || []).join('\n'),
        challengeText: challenges.challenge || '',
        solutionText: challenges.solution || '',
        appScreensTitle: appScreens.title || prev.appScreensTitle,
        appScreensCategories:
          appScreens.categories && appScreens.categories.length
            ? appScreens.categories
            : prev.appScreensCategories,
        resultsBlocks:
          resultsBlocks && resultsBlocks.length
            ? resultsBlocks
            : prev.resultsBlocks,
        findTitle: findYourApp.title || '',
        findDescription: findYourApp.description || '',
        findMockup: findYourApp.mockup || prev.findMockup,
        seoTitle: caseStudy.seoTitle || '',
        seoDescription: caseStudy.seoDescription || '',
      }));
    } else {
      // reset minimal for new
      setForm((prev) => ({
        ...prev,
        slug: '',
        title: '',
        subtitle: '',
        clientName: '',
        clientSubtitle: '',
        clientLocation: '',
        clientIndustry: '',
        clientAvatar: '',
        overviewDescription: '',
        requirementsText: '',
        goalsText: '',
        challengeText: '',
        solutionText: '',
        findTitle: '',
        findDescription: '',
        seoTitle: '',
        seoDescription: '',
      }));
    }
    setError('');
  }, [caseStudy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ====== repeatable helpers ======

  // Tech
  const addTechItem = () =>
    setForm((prev) => ({
      ...prev,
      techItems: [...prev.techItems, { name: '', icon: '' }],
    }));

  const updateTechItem = (index, field, value) =>
    setForm((prev) => {
      const copy = [...prev.techItems];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, techItems: copy };
    });

  const removeTechItem = (index) =>
    setForm((prev) => ({
      ...prev,
      techItems: prev.techItems.filter((_, i) => i !== index),
    }));

  // App screens
  const addAppCategory = () =>
    setForm((prev) => ({
      ...prev,
      appScreensCategories: [
        ...prev.appScreensCategories,
        { id: `cat-${Date.now()}`, name: '', screens: [] },
      ],
    }));

  const updateAppCategory = (index, field, value) =>
    setForm((prev) => {
      const copy = [...prev.appScreensCategories];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, appScreensCategories: copy };
    });

  const removeAppCategory = (index) =>
    setForm((prev) => ({
      ...prev,
      appScreensCategories: prev.appScreensCategories.filter(
        (_, i) => i !== index,
      ),
    }));

  const addAppScreen = (catIndex) =>
    setForm((prev) => {
      const copy = [...prev.appScreensCategories];
      const screens = copy[catIndex].screens || [];
      screens.push({
        name: '',
        image: '',
      });
      copy[catIndex] = { ...copy[catIndex], screens };
      return { ...prev, appScreensCategories: copy };
    });

  const updateAppScreen = (catIndex, screenIndex, field, value) =>
    setForm((prev) => {
      const copy = [...prev.appScreensCategories];
      const screens = [...(copy[catIndex].screens || [])];
      screens[screenIndex] = {
        ...screens[screenIndex],
        [field]: value,
      };
      copy[catIndex] = { ...copy[catIndex], screens };
      return { ...prev, appScreensCategories: copy };
    });

  const removeAppScreen = (catIndex, screenIndex) =>
    setForm((prev) => {
      const copy = [...prev.appScreensCategories];
      const screens = (copy[catIndex].screens || []).filter(
        (_, i) => i !== screenIndex,
      );
      copy[catIndex] = { ...copy[catIndex], screens };
      return { ...prev, appScreensCategories: copy };
    });

  // Results blocks
  const addResultBlock = () =>
    setForm((prev) => ({
      ...prev,
      resultsBlocks: [
        ...prev.resultsBlocks,
        {
          position: 'left',
          mockup: '/images/case-studies/screen1.png',
          items: ['New metric'],
        },
      ],
    }));

  const updateResultBlockField = (index, field, value) =>
    setForm((prev) => {
      const copy = [...prev.resultsBlocks];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, resultsBlocks: copy };
    });

  const updateResultBlockItemsText = (index, value) =>
    setForm((prev) => {
      const copy = [...prev.resultsBlocks];
      copy[index] = {
        ...copy[index],
        items: value
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      };
      return { ...prev, resultsBlocks: copy };
    });

  const removeResultBlock = (index) =>
    setForm((prev) => ({
      ...prev,
      resultsBlocks: prev.resultsBlocks.filter((_, i) => i !== index),
    }));

  // ====== build JSON for API ======

  function buildBrandingJson() {
    const {
      primaryColor,
      secondaryColor,
      accentColor,
      primaryFont,
      clientHeadingFont,
      clientBodyFont,
    } = form;
    const colors = [
      { name: 'Primary', hex: primaryColor },
      { name: 'Secondary', hex: secondaryColor },
      { name: 'Accent', hex: accentColor },
    ];
    return JSON.stringify(
      {
        primaryColor,
        secondaryColor,
        accentColor,
        primaryFont,
        clientHeadingFont,
        clientBodyFont,
        colors,
      },
      null,
      2,
    );
  }

  function buildTeamJson() {
    return JSON.stringify(
      {
        size: form.teamSize,
        roles: form.teamRoles,
        timeline: form.teamTimeline,
        duration: form.teamDuration,
      },
      null,
      2,
    );
  }

  function buildClientJson() {
    return JSON.stringify(
      {
        name: form.clientName,
        subtitle: form.clientSubtitle,
        location: form.clientLocation,
        industry: form.clientIndustry,
        avatar: form.clientAvatar,
      },
      null,
      2,
    );
  }

  function buildTechnologiesJson() {
    const items = form.techItems.filter((t) => t.name);
    return JSON.stringify(
      {
        backgroundImage: form.techBackgroundImage,
        items,
      },
      null,
      2,
    );
  }

  function buildOverviewJson() {
    return JSON.stringify(
      {
        description: form.overviewDescription,
        mockup: form.overviewMockup,
      },
      null,
      2,
    );
  }

  function buildRequirementsJson() {
    const items = (form.requirementsText || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [title, ...rest] = line.split(':');
        return {
          title: (title || '').trim(),
          description: rest.join(':').trim(),
        };
      })
      .filter((i) => i.title);
    return JSON.stringify(
      {
        items,
        mockup: form.requirementsMockup,
      },
      null,
      2,
    );
  }

  function buildGoalsJson() {
    const items = (form.goalsText || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    return JSON.stringify(
      {
        backgroundImage: form.goalsBackgroundImage,
        items,
      },
      null,
      2,
    );
  }

  function buildChallengesJson() {
    return JSON.stringify(
      {
        challenge: form.challengeText,
        solution: form.solutionText,
      },
      null,
      2,
    );
  }

  function buildAppScreensJson() {
    return JSON.stringify(
      {
        title: form.appScreensTitle,
        categories: form.appScreensCategories.map((c) => ({
          id: c.id || slugify(c.name || 'category'),
          name: c.name,
          screens: (c.screens || []).filter((s) => s.name && s.image),
        })),
      },
      null,
      2,
    );
  }

  function buildResultsJson() {
    const blocks = form.resultsBlocks
      .map((b) => ({
        position: b.position || 'left',
        mockup: b.mockup,
        items: (b.items || []).filter(Boolean),
      }))
      .filter((b) => b.items && b.items.length);
    return JSON.stringify(blocks, null, 2);
  }

  function buildFindYourAppJson() {
    return JSON.stringify(
      {
        title: form.findTitle,
        description: form.findDescription,
        mockup: form.findMockup,
      },
      null,
      2,
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.slug.trim() || !form.title.trim()) {
      setError('Slug and title are required.');
      return;
    }

    setSaving(true);
    setError('');

    const url = isEdit
      ? `/api/admin/case-studies/${caseStudy.id}`
      : '/api/admin/case-studies';
    const method = isEdit ? 'PATCH' : 'POST';

    const payload = {
      slug: form.slug,
      title: form.title,
      subtitle: form.subtitle || null,
      logo: form.logo || null,
      heroBgImage: form.heroBgImage || null,
      heroMockups: form.heroMockups || null,
      brandingJson: buildBrandingJson(),
      teamJson: buildTeamJson(),
      clientJson: buildClientJson(),
      technologiesJson: buildTechnologiesJson(),
      overviewJson: buildOverviewJson(),
      requirementsJson: buildRequirementsJson(),
      goalsJson: buildGoalsJson(),
      challengesJson: buildChallengesJson(),
      appScreensJson: buildAppScreensJson(),
      resultsJson: buildResultsJson(),
      findYourAppJson: buildFindYourAppJson(),
      seoTitle: form.seoTitle || null,
      seoDescription: form.seoDescription || null,
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message || 'Failed to save case study.');
      setSaving(false);
      return;
    }

    setSaving(false);
    onSaved();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div
        className="flex-1 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="w-full max-w-xl bg-white h-full shadow-[0_18px_45px_rgba(15,23,42,0.25)] p-5 sm:p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              {isEdit ? 'Edit case study' : 'Add case study'}
            </h2>
            <p className="text-xs text-slate-500">
              All sections are customizable; images and JSON are generated for
              you.
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

        <form onSubmit={handleSubmit} className="space-y-5 pb-6">
          {/* Basics, Hero, Branding, Team, Client, Tech, Overview, Requirements, Goals, Challenges, App screens, Results, CTA, SEO */}
          {/* Basics */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Basics
            </p>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Slug
              </label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="lovelocal-grocery-app"
              />
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
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Subtitle
              </label>
              <textarea
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                rows={2}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </section>

          {/* Hero */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Hero visuals
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ImageField
                label="Logo URL"
                name="logo"
                value={form.logo}
                onChange={handleChange}
                placeholder="/images/case-studies/logo.png"
              />
              <ImageField
                label="Hero background image"
                name="heroBgImage"
                value={form.heroBgImage}
                onChange={handleChange}
                placeholder="/images/case-studies/hero-bg.png"
              />
              <ImageField
                label="Hero mockup image"
                name="heroMockups"
                value={form.heroMockups}
                onChange={handleChange}
                placeholder="/images/case-studies/screen1.png"
              />
            </div>
          </section>

          {/* Branding + client fonts */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Branding & fonts
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="block text-[11px] text-slate-600">
                  Primary color
                </label>
                <input
                  type="color"
                  name="primaryColor"
                  value={form.primaryColor}
                  onChange={handleChange}
                  className="h-9 w-full rounded border border-slate-200"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] text-slate-600">
                  Secondary
                </label>
                <input
                  type="color"
                  name="secondaryColor"
                  value={form.secondaryColor}
                  onChange={handleChange}
                  className="h-9 w-full rounded border border-slate-200"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] text-slate-600">
                  Accent
                </label>
                <input
                  type="color"
                  name="accentColor"
                  value={form.accentColor}
                  onChange={handleChange}
                  className="h-9 w-full rounded border border-slate-200"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Primary font
                </label>
                <input
                  name="primaryFont"
                  value={form.primaryFont}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="DM Sans"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Client heading font
                </label>
                <input
                  name="clientHeadingFont"
                  value={form.clientHeadingFont}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="DM Sans"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Client body font
                </label>
                <input
                  name="clientBodyFont"
                  value={form.clientBodyFont}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="DM Sans"
                />
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Team
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Team size
                </label>
                <input
                  name="teamSize"
                  value={form.teamSize}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Timeline
                </label>
                <input
                  name="teamTimeline"
                  value={form.teamTimeline}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Roles
              </label>
              <input
                name="teamRoles"
                value={form.teamRoles}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Duration label
              </label>
              <input
                name="teamDuration"
                value={form.teamDuration}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </section>

          {/* Client */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Client
            </p>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Name
              </label>
              <input
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Subtitle
              </label>
              <input
                name="clientSubtitle"
                value={form.clientSubtitle}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="is an entrepreneur"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Location
                </label>
                <input
                  name="clientLocation"
                  value={form.clientLocation}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Australia"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">
                  Industry
                </label>
                <input
                  name="clientIndustry"
                  value={form.clientIndustry}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="E‑Commerce"
                />
              </div>
            </div>
            <ImageField
              label="Avatar URL"
              name="clientAvatar"
              value={form.clientAvatar}
              onChange={handleChange}
              placeholder="/images/client-avatar.png"
            />
          </section>

          {/* Technology with repeatable items */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Technology
            </p>
            <ImageField
              label="Background image URL"
              name="techBackgroundImage"
              value={form.techBackgroundImage}
              onChange={handleChange}
              placeholder="/images/tech-bg.jpg"
            />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-700">
                  Tech items
                </span>
                <button
                  type="button"
                  onClick={addTechItem}
                  className="text-[11px] text-sky-700 hover:text-sky-900"
                >
                  Add item
                </button>
              </div>
              <div className="space-y-2">
                {form.techItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)_auto] gap-2 items-center"
                  >
                    <input
                      value={item.name}
                      onChange={(e) =>
                        updateTechItem(idx, 'name', e.target.value)
                      }
                      placeholder="React JS"
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <input
                      value={item.icon}
                      onChange={(e) =>
                        updateTechItem(idx, 'icon', e.target.value)
                      }
                      placeholder="/images/tech/react-js.png"
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeTechItem(idx)}
                      className="text-[11px] text-rose-600 hover:text-rose-700 px-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Overview */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Overview
            </p>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Description
              </label>
              <textarea
                name="overviewDescription"
                value={form.overviewDescription}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <ImageField
              label="Overview mockup"
              name="overviewMockup"
              value={form.overviewMockup}
              onChange={handleChange}
              placeholder="/images/case-studies/overview-phone.png"
            />
          </section>

          {/* Requirements */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Requirements
            </p>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Points (one per line, "Title: Description")
              </label>
              <textarea
                name="requirementsText"
                value={form.requirementsText}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <ImageField
              label="Requirements mockup"
              name="requirementsMockup"
              value={form.requirementsMockup}
              onChange={handleChange}
              placeholder="/images/case-studies/requirements-phone.png"
            />
          </section>

          {/* Goals */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Goals
            </p>
            <ImageField
              label="Goals background"
              name="goalsBackgroundImage"
              value={form.goalsBackgroundImage}
              onChange={handleChange}
              placeholder="/images/case-studies/goals-bg.jpg"
            />
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Goals (one per line)
              </label>
              <textarea
                name="goalsText"
                value={form.goalsText}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </section>

          {/* Challenges */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Challenges & solution
            </p>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Challenge
              </label>
              <textarea
                name="challengeText"
                value={form.challengeText}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Solution
              </label>
              <textarea
                name="solutionText"
                value={form.solutionText}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </section>

          {/* App screens: categories + screens */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                App screens (for carousel)
              </p>
              <button
                type="button"
                onClick={addAppCategory}
                className="text-[11px] text-sky-700 hover:text-sky-900"
              >
                Add category
              </button>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Section title
              </label>
              <input
                name="appScreensTitle"
                value={form.appScreensTitle}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="space-y-3">
              {form.appScreensCategories.map((cat, cIdx) => (
                <div
                  key={cat.id || cIdx}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-3 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <input
                      value={cat.name}
                      onChange={(e) =>
                        updateAppCategory(cIdx, 'name', e.target.value)
                      }
                      placeholder="Customer App"
                      className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeAppCategory(cIdx)}
                      className="text-[11px] text-rose-600 hover:text-rose-700 px-2"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-slate-500">
                      Screens
                    </span>
                    <button
                      type="button"
                      onClick={() => addAppScreen(cIdx)}
                      className="text-[11px] text-sky-700 hover:text-sky-900"
                    >
                      Add screen
                    </button>
                  </div>
                  <div className="space-y-2 mt-1">
                    {(cat.screens || []).map((scr, sIdx) => (
                      <div
                        key={sIdx}
                        className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)_auto] gap-2 items-center"
                      >
                        <input
                          value={scr.name}
                          onChange={(e) =>
                            updateAppScreen(
                              cIdx,
                              sIdx,
                              'name',
                              e.target.value,
                            )
                          }
                          placeholder="Home Page"
                          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <input
                          value={scr.image}
                          onChange={(e) =>
                            updateAppScreen(
                              cIdx,
                              sIdx,
                              'image',
                              e.target.value,
                            )
                          }
                          placeholder="/images/case-studies/screen1.png"
                          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeAppScreen(cIdx, sIdx)}
                          className="text-[11px] text-rose-600 hover:text-rose-700 px-2"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Results blocks */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Result blocks
              </p>
              <button
                type="button"
                onClick={addResultBlock}
                className="text-[11px] text-sky-700 hover:text-sky-900"
              >
                Add block
              </button>
            </div>
            <div className="space-y-3">
              {form.resultsBlocks.map((b, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-3 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <select
                      value={b.position}
                      onChange={(e) =>
                        updateResultBlockField(idx, 'position', e.target.value)
                      }
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeResultBlock(idx)}
                      className="text-[11px] text-rose-600 hover:text-rose-700 px-2"
                    >
                      Remove
                    </button>
                  </div>
                  <ImageField
                    label="Mockup image"
                    name={`resultsBlocks-${idx}-mockup`}
                    value={b.mockup}
                    onChange={(e) =>
                      updateResultBlockField(idx, 'mockup', e.target.value)
                    }
                    placeholder="/images/case-studies/screen1.png"
                  />
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-700">
                      Points (one per line)
                    </label>
                    <textarea
                      value={(b.items || []).join('\n')}
                      onChange={(e) =>
                        updateResultBlockItemsText(idx, e.target.value)
                      }
                      rows={3}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Find your app CTA */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Find your app CTA
            </p>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Title
              </label>
              <input
                name="findTitle"
                value={form.findTitle}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Description
              </label>
              <textarea
                name="findDescription"
                value={form.findDescription}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <ImageField
              label="Mockup image"
              name="findMockup"
              value={form.findMockup}
              onChange={handleChange}
              placeholder="/images/case-studies/find-app-phone.png"
            />
          </section>

          {/* SEO */}
          <section className="space-y-3 border border-slate-100 rounded-xl p-3.5 bg-slate-50/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              SEO
            </p>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                SEO title
              </label>
              <input
                name="seoTitle"
                value={form.seoTitle}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                SEO description
              </label>
              <textarea
                name="seoDescription"
                value={form.seoDescription}
                onChange={handleChange}
                rows={2}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
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
              {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create case study'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// helpers
function safeParse(str, fallback) {
  if (!str) return fallback;
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

function slugify(str) {
  return (str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
