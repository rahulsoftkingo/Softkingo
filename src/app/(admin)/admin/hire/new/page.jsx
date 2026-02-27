'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HireEditor from '../_components/HireEditor';

export default function NewHirePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialData = {
    title: '',
    slug: '',
    key: 'hire-',
    excerpt: '',
    status: 'draft',
    activeSections: ['hero', 'about', 'features', 'steps', 'services', 'portfolio', 'cta'],
    content: {
      metrics: { avgTime: '48 Hours', network: '100+ Experts', rating: '4.9/5' },
      profileSection: { enabled: true, profileFeatures: [], images: {} },
      ctaBanner: { enabled: true, buttonText: 'Book a Free Demo', buttonHref: '#lead-form' },
      comparisonSection: { enabled: true, columns: [], rows: [] },
      modelsSection: { enabled: true, models: [] },
      whyHireSection: { enabled: true, items: [] },
      businessTypesSection: { enabled: true, items: [] },
      pricingSection: { enabled: true, plans: [] },
      footerFormSection: { enabled: true }
    }
  };

  const handleSave = async (formData) => {
    setLoading(true);
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

      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/hire');
        return;
      }

      const errData = await res.json().catch(() => ({}));
      alert(errData?.error || 'Failed to create page');
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving page');
    } finally {
      setLoading(false);
    }
  };

  return (
    <HireEditor
      data={initialData}
      onBack={() => router.push('/admin/hire')}
      onSave={handleSave}
      loading={loading}
    />
  );
}
