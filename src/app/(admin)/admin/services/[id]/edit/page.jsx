'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ServicePageEditor from '../../_components/ServicePageEditor';

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    if (id) {
      loadService();
    }
  }, [id]);

  const loadService = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/services/${id}`);
      const data = await res.json();

      if (data.service) {
        const json = JSON.parse(data.service.contentJson || '{}');
        const content = json.content || {};
        const activeSections = json.activeSections || [];

        setServiceData({
          id: data.service.id,
          title: data.service.title,
          slug: data.service.slug,
          excerpt: data.service.excerpt || '',
          status: data.service.status,
          seoTitle: data.service.seoTitle || '',
          seoDescription: data.service.seoDescription || '',
          seoImage: data.service.seoImage || '',
          activeSections: activeSections.length > 0 ? activeSections : null,
          content: {
            ...content, // Preserve all fields
            heroTitle: content.heroTitle || data.service.title,
            heroSubtitle: content.heroSubtitle || '',
            heroBg: content.heroBg || '/images/services/default-bg.png',
            stats: content.stats || {
              years: "6+",
              yearsLabel: "Years of Experience",
              projects: "400+",
              projectsLabel: "Projects Completed",
              team: "50+",
              teamLabel: "Expert Team Members",
              rating: "5.0",
              ratingLabel: "Client Rating"
            },
            portfolioTitle: content.portfolioTitle || 'Our Portfolio',
            portfolioSubtitle: content.portfolioSubtitle || '',
            portfolioCategory: content.portfolioCategory || '',
            services: content.services || {
              title: 'Our Services',
              subtitle: 'Comprehensive solutions for your business',
              categories: []
            },
            techStack: content.techStack || content.tech || {
              title: 'Technology Stack',
              subtitle: 'Cutting-edge technologies we use',
              tabs: []
            },
            process: content.process || {
              title: 'Our Process',
              subtitle: 'Streamlined development methodology',
              items: []
            },
            solutions: content.solutions || {
              title: 'Industry Solutions',
              subtitle: 'Customized for your needs',
              items: []
            },
            industrySection: content.industrySection || {
              title: 'Industries We Serve',
              subtitle: 'Tailored for every sector',
              items: []
            },
            highlight: content.highlight || {
              title: 'Solution Highlights',
              subtitle: 'What makes us stand out',
              tabs: []
            },
            faq: content.faq || {
              title: 'Frequently Asked Questions',
              subtitle: 'Everything you need to know',
              items: []
            },
            userGuide: content.userGuide || {
              title: 'User Guide',
              subtitle: 'Technical Documentation',
              sections: []
            },
            awards: content.awards || {
              title: 'Our',
              gradientText: 'Awards & Recognitions',
              subtitle: 'Our commitment to excellence.',
              items: []
            },
            inquiry: content.inquiry || {
              tagline: 'GET IN TOUCH',
              titlePrefix: "Let's ",
              title: 'Connect',
              subtitle: "Reach out to us from anywhere in the world."
            },
          }
        });
      }
    } catch (error) {
      console.error('Load service error:', error);
      alert('Failed to load service');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (!serviceData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">Service Not Found</h2>
          <button
            onClick={() => router.push('/admin/services')}
            className="mt-4 text-sky-600 font-bold"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <ServicePageEditor
      data={serviceData}
      onBack={() => router.push('/admin/services')}
    />
  );
}
