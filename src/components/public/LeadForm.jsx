'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Upload, Shield } from 'lucide-react';
import Image from 'next/image';

export default function LeadForm({
  formType = 'inquiry',
  formKey = 'general',
  serviceName = '',
  title = 'Get in Touch',
  subtitle = "We'll get back to you soon!",
  variant = 'hero', // 'hero' | 'solid' | 'light'
  showLogo = true,
  showCompany = false,
  showBudget = false,
  showAttachment = false,
  showNDA = false,
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '',
    budget: 0,
    attachmentName: '',
    ndaAccepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        attachmentName: file.name,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const urlParams = new URLSearchParams(window.location.search);

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
        company: formData.company || null,
        budgetLabel: formData.budget > 0 ? `$${formData.budget}` : null,
        attachmentName: formData.attachmentName || null,
        ndaAccepted: formData.ndaAccepted || null,
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

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        company: '',
        budget: 0,
        attachmentName: '',
        ndaAccepted: false,
      });

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

  // Enhanced variant styles
  const variants = {
    hero: {
      container: 'bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-black/20',
      title: 'text-white',
      subtitle: 'text-slate-300',
      subtitleIdle: 'text-slate-400',
      subtitleSuccess: 'text-emerald-400',
      subtitleError: 'text-rose-400',
      input: 'bg-slate-900/50 backdrop-blur-sm border border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/50',
      button: 'bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 shadow-lg shadow-cyan-500/30',
      privacy: 'text-slate-400',
      logoGradient: 'from-cyan-50 to-sky-100',
      budgetLabel: 'text-slate-300',
      budgetValue: 'text-cyan-400',
      sliderTrack: 'bg-slate-800',
      sliderFilled: 'bg-gradient-to-r from-cyan-500 to-sky-500',
      sliderThumb: 'bg-cyan-400 border-slate-700',
      uploadBox: 'bg-slate-900/50 border-slate-700 hover:border-cyan-500 text-slate-400',
      checkbox: 'border-slate-700 text-cyan-500',
    },
    solid: {
      container: 'bg-white border border-slate-200 shadow-xl',
      title: 'text-slate-900',
      subtitle: 'text-slate-600',
      subtitleIdle: 'text-slate-500',
      subtitleSuccess: 'text-emerald-600',
      subtitleError: 'text-rose-600',
      input: 'bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/30 hover:border-slate-400',
      button: 'bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 shadow-lg hover:shadow-xl',
      privacy: 'text-slate-500',
      logoGradient: 'from-cyan-100 to-sky-50',
      budgetLabel: 'text-slate-700',
      budgetValue: 'text-cyan-600',
      sliderTrack: 'bg-slate-200',
      sliderFilled: 'bg-gradient-to-r from-cyan-500 to-sky-500',
      sliderThumb: 'bg-cyan-500 border-white',
      uploadBox: 'bg-slate-50 border-slate-300 hover:border-cyan-500 text-slate-600',
      checkbox: 'border-slate-300 text-cyan-500',
    },
    light: {
      container: 'bg-gradient-to-br from-sky-50 via-white to-cyan-50 border border-sky-200 shadow-lg',
      title: 'text-slate-900',
      subtitle: 'text-slate-600',
      subtitleIdle: 'text-slate-500',
      subtitleSuccess: 'text-emerald-600',
      subtitleError: 'text-rose-600',
      input: 'bg-white border border-sky-300 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-400/40 hover:border-sky-400',
      button: 'bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 shadow-lg hover:shadow-cyan-500/30',
      privacy: 'text-slate-500',
      logoGradient: 'from-cyan-100 to-sky-100',
      budgetLabel: 'text-slate-700',
      budgetValue: 'text-cyan-600',
      sliderTrack: 'bg-sky-100',
      sliderFilled: 'bg-gradient-to-r from-cyan-500 to-sky-500',
      sliderThumb: 'bg-cyan-500 border-white',
      uploadBox: 'bg-white border-sky-300 hover:border-cyan-500 text-slate-600',
      checkbox: 'border-sky-300 text-cyan-500',
    },
  };

  const style = variants[variant];

  return (
    <div className={`${style.container} rounded-2xl p-5 md:p-10 transition-all duration-300`}>
      {/* Header with Logo */}
      <div className="flex flex-col text-center items-center gap-3 mb-6">
        {showLogo && (
          <div className={`w-14 h-14 bg-gradient-to-br ${style.logoGradient}  rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300`}>
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
              <p className={`text-sm ${style.subtitleSuccess}`}>
                {statusMessage}
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center justify-center gap-1.5">
              <AlertCircle className={`w-4 h-4 ${style.subtitleError}`} />
              <p className={`text-sm ${style.subtitleError}`}>
                {statusMessage}
              </p>
            </div>
          )}

          {status === 'idle' && (
            <p className={`text-sm ${style.subtitleIdle}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name & Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full ${style.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-200`}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone (10 digits) *"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            maxLength="10"
            className={`w-full ${style.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-200`}
          />
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleChange}
          required
          className={`w-full ${style.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-200`}
        />

        {/* Company (Optional) */}
        {showCompany && (
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className={`w-full ${style.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-200`}
          />
        )}

        {/* Budget Slider (Optional) */}
        {showBudget && (
          <div className="py-2">
            <div className="flex items-center justify-between mb-3">
              <label className={`text-sm font-medium ${style.budgetLabel}`}>
                Project Budget:
              </label>
              <span className={`text-base font-bold ${style.budgetValue}`}>
                ${formData.budget.toLocaleString()}
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                name="budget"
                min="0"
                max="100000"
                step="1000"
                value={formData.budget}
                onChange={handleChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:w-5 
                  [&::-webkit-slider-thumb]:h-5 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:border-2
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-all
                  [&::-webkit-slider-thumb]:hover:scale-110
                  [&::-moz-range-thumb]:w-5 
                  [&::-moz-range-thumb]:h-5 
                  [&::-moz-range-thumb]:rounded-full 
                  [&::-moz-range-thumb]:border-2
                  [&::-moz-range-thumb]:shadow-lg
                  [&::-moz-range-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, 
                    ${variant === 'hero' ? '#06b6d4' : '#06b6d4'} ${(formData.budget / 100000) * 100}%, 
                    ${variant === 'hero' ? 'rgb(30 41 59)' : 'rgb(226 232 240)'} ${(formData.budget / 100000) * 100}%)`
                }}
              />
              <style >{`
                input[type="range"]::-webkit-slider-thumb {
                  background: ${variant === 'hero' ? 'linear-gradient(to br, #22d3ee, #0ea5e9)' : 'linear-gradient(to br, #06b6d4, #0ea5e9)'};
                  border-color: ${variant === 'hero' ? 'rgb(51 65 85)' : 'white'};
                }
                input[type="range"]::-moz-range-thumb {
                  background: ${variant === 'hero' ? 'linear-gradient(to br, #22d3ee, #0ea5e9)' : 'linear-gradient(to br, #06b6d4, #0ea5e9)'};
                  border-color: ${variant === 'hero' ? 'rgb(51 65 85)' : 'white'};
                }
              `}</style>
            </div>
          </div>
        )}

        {/* File Upload (Optional) */}
        {showAttachment && (
          <div>
            <label className={`block cursor-pointer`}>
              <div className={`${style.uploadBox} border-2 border-dashed rounded-xl px-4 py-3 text-center transition-all duration-200 flex items-center justify-center gap-2`}>
                <Upload className="w-4 h-4" />
                <span className="text-sm">
                  {formData.attachmentName || 'Upload Document (Optional)'}
                </span>
              </div>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
            </label>
          </div>
        )}

        {/* Message */}
        <textarea
          name="message"
          placeholder="Tell us about your project... *"
          value={formData.message}
          onChange={handleChange}
          required
          rows={3}
          className={`w-full ${style.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none transition-all duration-200`}
        />

        {/* NDA Checkbox (Optional) */}
        {showNDA && (
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="ndaAccepted"
              checked={formData.ndaAccepted}
              onChange={handleChange}
              className={`mt-0.5 w-4 h-4 rounded ${style.checkbox} focus:ring-2 focus:ring-cyan-500 cursor-pointer`}
            />
            <span className={`text-xs ${style.privacy} flex items-center gap-1`}>
              <Shield className="w-3 h-3" />
              I agree to sign an NDA if required
            </span>
          </label>
        )}

        {/* Submit Button */}
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

        {/* Privacy Note */}
        {/* <p className={`text-[11px] text-center pt-1 ${style.privacy}`}>
           Your information is secure. We respect your privacy.
        </p> */}
      </form>
    </div>
  );
}




























// // Full featured form with all options
// <LeadForm
//   formType="inquiry"
//   formKey="enterprise-contact"
//   serviceName="Enterprise Solutions"
//   title="Get Enterprise Quote"
//   subtitle="Share your requirements for a custom quote"
//   variant="hero"
//   showLogo={true}
//   showCompany={true}
//   showBudget={true}
//   showAttachment={true}
//   showNDA={true}
// />

// // Service page - with budget
// <LeadForm
//   formType="service"
//   formKey="mobile-app-development"
//   serviceName="Mobile App Development"
//   title="Book a Free Consultation"
//   subtitle="Response within 1 Business Day!"
//   variant="hero"
//   showLogo={true}
//   showCompany={true}
//   showBudget={true}
// />

// // Simple contact form
// <LeadForm
//   formType="contact"
//   formKey="contact-page"
//   title="Get In Touch"
//   subtitle="We're here to help!"
//   variant="solid"
//   showLogo={false}
//   showCompany={false}
//   showBudget={false}
// />

// // Ebook download
// <LeadForm
//   formType="ebook"
//   formKey="ai-ml-guide"
//   serviceName="AI & ML Solutions Guide"
//   title="Get this Ebook"
//   subtitle="Share details and download instantly"
//   variant="light"
//   showLogo={true}
//   showCompany={true}
//   showBudget={false}
// />
