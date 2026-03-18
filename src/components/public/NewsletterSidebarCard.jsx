'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function NewsletterSidebarCard() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus('loading');

    try {
      const res = await fetch('/api/public/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          formType: 'newsletter',
          formKey: 'blog-sidebar',
          source: 'blog-sidebar'
        }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Newsletter subscription failed:', err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-[2rem] p-8 border border-slate-100 h-full flex flex-col justify-center text-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 backdrop-blur-sm relative z-10">
        <Image src="/images/logo.png" alt="Logo" width={32} height={32} />
      </div>

      <h3 className="relative z-10 text-xl font-bold text-slate-900 mb-2 underline decoration-sky-500 underline-offset-4 decoration-2">
        Subscribe to our blog
      </h3>
      
      <p className="relative z-10 text-slate-600 text-sm mb-6 leading-relaxed">
        Be a part of a thriving community of 500,000+ business owners.
      </p>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your work email"
          required
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-sm text-slate-900 transition-all placeholder:text-slate-400"
        />
        
        <button
          disabled={loading || status === 'success'}
          className={`w-full font-bold py-3 rounded-xl transition-all shadow-md uppercase text-xs tracking-wider flex items-center justify-center gap-2 ${
            status === 'success' 
              ? 'bg-emerald-500 text-white shadow-emerald-100' 
              : 'bg-sky-600 text-white hover:bg-sky-500 shadow-sky-100'
          }`}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : status === 'success' ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Subscribed
            </>
          ) : (
            'Join Now'
          )}
        </button>
        
        {status === 'error' && (
          <p className="text-[10px] text-rose-500 mt-2">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}
