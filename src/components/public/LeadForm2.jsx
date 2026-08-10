'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function LeadForm2({
  formType = 'inquiry',
  formKey = 'general',
  serviceName = '',
  title = 'Get in Touch',
  subtitle = "We'll get back to you soon!",
  variant = 'hero', // 'hero' | 'solid' | 'light'
  showLogo = true,
}) {
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    message: '', // Added message to state
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const urlParams = new URLSearchParams(window.location.search);

      const payload = {
        name: formData.company, // company acts as the primary identifier here
        email: formData.email,
        company: formData.company,
        message: formData.message, // Added message to API payload
        formType,
        formKey,
        source: 'website',
        campaign: serviceName || null,
        utmSource: urlParams.get('utm_source') || null,
        utmMedium: urlParams.get('utm_medium') || null,
        utmCampaign: urlParams.get('utm_campaign') || null,
        tags: serviceName ? `service:${serviceName}` : null,
      };

      const res = await fetch('/api/public/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit');
      }

      setStatus('success');
      setStatusMessage('🎉 Thank you! We will contact you within 24 hours.');
      setFormData({ company: '', email: '', message: '' }); // Reset message on success

      if (window.gtag) {
        window.gtag('event', 'form_submission', {
          form_type: formType,
          form_key: formKey,
        });
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const variants = {
    hero: {
      container: 'bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-black/20',
      title: 'text-white',
      subtitleIdle: 'text-slate-400',
      subtitleSuccess: 'text-emerald-400',
      subtitleError: 'text-rose-400',
      input: 'bg-slate-900/50 backdrop-blur-sm border border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/50',
      button: 'bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 shadow-lg shadow-cyan-500/30',
      logoGradient: 'from-cyan-50 to-sky-100',
    },
    solid: {
      container: 'bg-white border border-slate-200 w-[324px] sm:w-full shadow-xl',
      title: 'text-slate-900',
      subtitleIdle: 'text-slate-500',
      subtitleSuccess: 'text-emerald-600',
      subtitleError: 'text-rose-600',
      input: 'bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/30 hover:border-slate-400',
      button: 'bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 shadow-lg hover:shadow-xl',
      logoGradient: 'from-cyan-100 to-sky-50',
    },
    light: {
      container: 'bg-gradient-to-br from-sky-50 via-white to-cyan-50 border border-sky-200 shadow-lg',
      title: 'text-slate-900',
      subtitleIdle: 'text-slate-500',
      subtitleSuccess: 'text-emerald-600',
      subtitleError: 'text-rose-600',
      input: 'bg-white border border-sky-300 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-400/40 hover:border-sky-400',
      button: 'bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 shadow-lg hover:shadow-cyan-500/30',
      logoGradient: 'from-cyan-100 to-sky-100',
    },
  };

  const style = variants[variant];

  return (
    <div className={`${style.container} rounded-2xl p-5 md:p-10 transition-all duration-300`}>
      <div className="flex flex-col text-center items-center gap-3 mb-6">
        {showLogo && (
          <div className={`w-14 h-14 bg-gradient-to-br ${style.logoGradient} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300`}>
            <Image
              src='/images/logo.png'
              alt="Softkingo Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        )}

        <div>
          <h3 className={`text-lg md:text-xl font-bold mb-1 ${style.title}`}>
            {title}
          </h3>

          {status === 'success' && (
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle className={`w-4 h-4 ${style.subtitleSuccess}`} />
              <p className={`text-sm ${style.subtitleSuccess}`}>{statusMessage}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center justify-center gap-1.5">
              <AlertCircle className={`w-4 h-4 ${style.subtitleError}`} />
              <p className={`text-sm ${style.subtitleError}`}>{statusMessage}</p>
            </div>
          )}

          {status === 'idle' && (
            <p className={`text-sm ${style.subtitleIdle}`}>{subtitle}</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="company"
          placeholder="Company Name *"
          value={formData.company}
          onChange={handleChange}
          required
          className={`w-full ${style.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-200`}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleChange}
          required
          className={`w-full ${style.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-200`}
        />

        {/* Added Textarea Field for Message */}
        <textarea
          name="message"
          rows={3}
          placeholder="How can we help you? (Message) *"
          value={formData.message}
          onChange={handleChange}
          required
          className={`w-full ${style.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-200 resize-none`}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${style.button} disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span className="text-sm">Talk To Our Experts</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}