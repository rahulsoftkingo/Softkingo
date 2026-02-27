'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import HireEditor from '../../_components/HireEditor';
import { Loader2 } from 'lucide-react';

export default function EditHirePage() {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/admin/pages/${id}`);
        const result = await res.json();
        if (res.ok) {
          const page = result.page;
          const content = typeof page.contentJson === 'string' ? JSON.parse(page.contentJson) : (page.contentJson || {});

          setData({
            id: page.id,
            title: page.title || '',
            slug: page.slug || '',
            key: page.key || '',
            excerpt: page.excerpt || '',
            status: page.status || 'draft',
            activeSections: page.activeSections || ['hero', 'about', 'features', 'steps', 'services', 'portfolio', 'cta'],
            content: content
          });
        } else {
          alert('Failed to fetch page data');
          router.push('/admin/hire');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        alert('Error loading page');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, router]);

  const handleSave = async (formData) => {
    setSaving(true);
    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        key: formData.key,
        excerpt: formData.excerpt,
        status: formData.status,
        type: 'hire',
        activeSections: formData.activeSections,
        contentJson: JSON.stringify(formData.content || {}),
        seoTitle: formData.title,
        seoDescription: formData.excerpt,
      };

      const res = await fetch(`/api/admin/pages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/hire');
        return;
      }

      const errData = await res.json().catch(() => ({}));
      alert(errData?.error || 'Failed to update page');
    } catch (err) {
      console.error('Save error:', err);
      alert('Error updating page');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <HireEditor
      data={data}
      onBack={() => router.push('/admin/hire')}
      onSave={handleSave}
      loading={saving}
    />
  );
}
