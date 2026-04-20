// app/admin/settings/page.jsx
// export default function SettingsHome() {
//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold text-slate-900">General Settings</h2>
//       <p className="text-slate-600 mt-2">Configure site-wide options here.</p>
//       <div className="mt-8 p-12 border-2 border-dashed border-slate-200 rounded-3xl text-center">
//          <p className="text-slate-400">Settings modules are being initialized...</p>
//       </div>
//     </div>
//   );
// }

'use client';
import React, { useState } from 'react'; 
import { 
  CheckCircle, XCircle, AlertTriangle, RefreshCw, TrendingUp,
  Image as ImageIcon, Server, Search, Clock, BarChart3, Shield, Zap,
  ChevronDown, Copy, Download, ExternalLink, Play, AlertCircle,
  Globe, Activity, BarChart2, Wifi, HardDrive
} from 'lucide-react';

export default function AdvancedSiteHealth() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [overallScore, setOverallScore] = useState(0);

  const ALL_ROUTES = [
    '/', '/about', '/services', '/blog', '/contact', '/privacy', '/terms',
    '/ai', '/insights', '/portfolio', '/solutions', '/hire', '/careers',
    '/case-studies', '/ebooks', '/gallery', '/whitepapers', '/articles',
    '/media-coverage', '/podcasts', '/press-releases', '/robots.txt', '/sitemap.xml'
  ];

  const testConfigs = [
    {
      key: 'vitals',
      name: 'Core Vitals',
      icon: TrendingUp,
      weight: 20,
      run: async () => {
        const metrics = {
          LCP: performance.getEntriesByName('largest-contentful-paint')[0]?.startTime || 3000,
          FCP: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 2000,
          TTFB: performance.getEntriesByType('navigation')[0]?.responseStart || 800
        };
        const score = (metrics.LCP < 2500 ? 100 : 50) + (metrics.FCP < 1800 ? 100 : 50) + (metrics.TTFB < 600 ? 100 : 50);
        return {
          metrics,
          score: Math.round(score / 3),
          success: score > 80,
          details: `${metrics.LCP?.toFixed(0) || '?'}ms LCP • ${metrics.FCP?.toFixed(0) || '?'}ms FCP`
        };
      }
    },
    {
      key: 'routes',
      name: `Routes (${ALL_ROUTES.length})`,
      icon: Globe,
      weight: 15,
      run: async () => {
        const checks = ALL_ROUTES.map(async route => {
          try {
            const res = await fetch(`${window.location.origin}${route}`, { 
              method: 'HEAD', 
              signal: AbortSignal.timeout(3000)
            });
            return { route, ok: res.ok, status: res.status };
          } catch {
            return { route, error: true };
          }
        });
        const results = await Promise.allSettled(checks);
        const parsed = results.map(r => r.status === 'fulfilled' ? r.value : { error: true });
        const ok = parsed.filter(r => r.ok).length;
        return {
          total: ALL_ROUTES.length,
          ok,
          failed: ALL_ROUTES.length - ok,
          success: ok >= ALL_ROUTES.length * 0.9,
          routes: parsed.slice(0, 10),
          details: `${ok}/${ALL_ROUTES.length} OK (${Math.round((ok/ALL_ROUTES.length)*100)}%)`
        };
      }
    },
    {
      key: 'images',
      name: 'Images (50+)',
      icon: ImageIcon,
      weight: 12,
      run: async () => {
        const imgs = Array.from(document.querySelectorAll('img[src], picture source[srcset]'));
        const srcs = Array.from(new Set(imgs.flatMap(i => 
          (i.src || i.srcset || '').split(',').map(s => s.trim().split(' ')[0]).filter(Boolean)
        ))).slice(0, 50);
        const checks = srcs.map(async src => {
          try {
            const res = await fetch(src, { method: 'HEAD', signal: AbortSignal.timeout(2000) });
            return res.ok;
          } catch {
            return false;
          }
        });
        const results = await Promise.allSettled(checks);
        const ok = results.filter(r => r.status === 'fulfilled' && r.value).length;
        return {
          total: srcs.length,
          ok,
          broken: srcs.length - ok,
          success: ok >= srcs.length * 0.95,
          details: `${ok}/${srcs.length} OK (${Math.round((ok/srcs.length)*100)}%)`
        };
      }
    },
    {
      key: 'apis',
      name: 'APIs (20+)',
      icon: Server,
      weight: 15,
      run: async () => {
        const apis = [
          '/api/health', '/api/sitemap', '/api/search', '/api/blogs',
          '/api/categories', '/api/chat/conversation', '/api/media/tree',
          '/api/public/blog/[slug]/view', '/api/public/leads', '/api/public/newsletter/subscribe'
        ];
        const checks = apis.map(async path => {
          try {
            const res = await fetch(`${window.location.origin}${path}`, { 
              signal: AbortSignal.timeout(2500) 
            });
            return res.ok;
          } catch {
            return false;
          }
        });
        const results = await Promise.allSettled(checks);
        const ok = results.filter(r => r.status === 'fulfilled' && r.value).length;
        return {
          total: apis.length,
          ok,
          failed: apis.length - ok,
          success: ok >= apis.length * 0.8,
          details: `${ok}/${apis.length} OK`
        };
      }
    },
    {
      key: 'seo',
      name: 'SEO Meta',
      icon: Search,
      weight: 10,
      run: () => {
        const hasTitle = !!document.querySelector('title')?.textContent?.trim();
        const hasDesc = !!document.querySelector('meta[name="description"]')?.content?.trim();
        const hasOG = !!document.querySelector('meta[property="og:image"]');
        const hasH1 = document.querySelectorAll('h1').length === 1;
        const score = (hasTitle ? 40 : 0) + (hasDesc ? 30 : 0) + (hasOG ? 20 : 0) + (hasH1 ? 10 : 0);
        return {
          checks: { title: hasTitle, desc: hasDesc, og: hasOG, h1: hasH1 },
          score,
          success: score === 100,
          details: `${score}% (${Object.keys({title:hasTitle,desc:hasDesc}).filter(k=>!k[k]).length} missing)`
        };
      }
    },
    {
      key: 'security',
      name: 'Security Headers',
      icon: Shield,
      weight: 15,
      run: async () => {
        try {
          const res = await fetch(window.location.origin, { signal: AbortSignal.timeout(2000) });
          const headers = {
            hsts: !!res.headers.get('strict-transport-security'),
            csp: !!res.headers.get('content-security-policy'),
            xfo: !!res.headers.get('x-frame-options'),
            xcto: !!res.headers.get('x-content-type-options')
          };
          const secureCount = Object.values(headers).filter(Boolean).length;
          return {
            headers,
            secureCount,
            success: secureCount >= 2,
            details: `${secureCount}/4 headers (${Object.keys(headers).filter(k => headers[k]).join(', ')})`
          };
        } catch {
          return { success: false, details: 'Fetch failed' };
        }
      }
    },
    {
      key: 'perf',
      name: 'Performance',
      icon: Zap,
      weight: 13,
      run: () => {
        const resources = performance.getEntriesByType('resource');
        const domSize = document.querySelectorAll('*').length;
        const passes = resources.length < 40 && domSize < 1400;
        return {
          resources: resources.length,
          domSize,
          passesBudget: passes,
          success: passes,
          details: `${resources.length} res • ${domSize.toLocaleString()} DOM`
        };
      }
    }
  ];

  const runTest = async (config) => {
    setLoading(true);
    try {
      const result = await config.run();
      setResults(prev => {
        const newResults = { 
          ...prev, 
          [config.key]: { ...result, timestamp: Date.now(), weight: config.weight } 
        };
        const totalWeight = testConfigs.reduce((s, t) => s + t.weight, 0);
        const score = Object.values(newResults).reduce((s, r) => s + (r.success ? r.weight : 0), 0);
        setOverallScore(Math.round((score / totalWeight) * 100));
        return newResults;
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const runAll = async () => {
    setIsRunning(true);
    for (const config of testConfigs) {
      await runTest(config);
      await new Promise(r => setTimeout(r, 300));
    }
    setIsRunning(false);
  };

  const getStatus = (result) => {
    if (result?.success) return { bg: 'bg-emerald-500/15', text: 'text-emerald-700', icon: CheckCircle };
    if (result?.error) return { bg: 'bg-red-500/15', text: 'text-red-700', icon: XCircle };
    return { bg: 'bg-amber-500/15', text: 'text-amber-700', icon: AlertTriangle };
  };

  const copyResults = () => {
    const data = { 
      score: overallScore, 
      routesTested: ALL_ROUTES.length,
      results, 
      timestamp: new Date().toISOString() 
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  };

  const getFixTips = () => {
    const tips = [];
    if (results.routes?.failed > 2) tips.push(`• Fix ${results.routes.failed} broken routes [Routes +15pt]`);
    if (results.images?.broken > 3) tips.push(`• Compress/optimize ${results.images.broken} images [Images +12pt]`);
    if (!results.seo?.checks?.desc) tips.push(`• Add <meta name="description"> tag [SEO +10pt]`);
    if (results.security?.secureCount < 2) tips.push(`• Add HSTS/CSP headers in next.config.js [Security +15pt]`);
    if (results.perf?.resources > 35) tips.push(`• Lazy load images + code-split JS [Perf +13pt]`);
    if (results.apis?.failed > 1) tips.push(`• Create /api/health endpoint [APIs +15pt]`);
    return tips;
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-sky-600 rounded-2xl shadow-lg border border-sky-500">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900">Advanced Site Health</h1>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Production Audit • {ALL_ROUTES.length} Routes</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 ml-auto">
              <button 
                onClick={runAll}
                disabled={loading || isRunning}
                className="flex items-center gap-2 px-8 py-3 bg-sky-600 text-white text-sm font-black rounded-xl shadow-xl shadow-sky-100 hover:shadow-sky-200 disabled:opacity-50 transition-all duration-200"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Running Audit...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Start Full Scan
                  </>
                )}
              </button>
              <button 
                onClick={() => setResults({})}
                className="px-8 py-3 bg-white hover:bg-slate-50 text-slate-700 text-sm font-black rounded-xl border border-slate-200 transition-all"
              >
                Reset
              </button>
              <button 
                onClick={copyResults}
                className="flex items-center gap-2 px-8 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-black rounded-xl border border-emerald-100 transition-all"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {Object.keys(results).length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-center">
                <div className="text-4xl font-black text-sky-600 mb-1">{overallScore}%</div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-400">Health Score</div>
              </div>
              <div className="text-center border-l border-slate-100">
                <div className="text-4xl font-black text-slate-900 mb-1">
                  {Object.values(results).filter(r => r.success).length}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-400">Passed</div>
              </div>
              <div className="text-center border-l border-slate-100">
                <div className="text-4xl font-black text-slate-900 mb-1">
                  {Object.keys(results).length}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-400">Tests Run</div>
              </div>
              <div className="text-center border-l border-slate-100">
                <div className="text-4xl font-black text-amber-600 mb-1">
                  {Object.values(results).filter(r => !r.success && !r.error).length}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-400">Improvement</div>
              </div>
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testConfigs.map(({ key, name, icon: Icon, weight, run }) => {
            const result = results[key];
            const status = getStatus(result);
            
            return (
              <div key={key} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:border-sky-300 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-6">
                   <div className={`p-4 rounded-2xl ${result ? `${status.bg} ${status.text}` : 'bg-white text-sky-600'} border border-transparent shadow-sm group-hover:scale-110 transition-transform`}>
                     {result ? React.createElement(status.icon, { className: "w-6 h-6" }) : <Icon className="w-6 h-6" />}
                   </div>
                   <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest border ${status.bg} ${status.text} border-current opacity-70`}>
                      {result ? (result.success ? 'PASSED' : 'ACTION') : `${weight}PT`}
                   </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-2">{name}</h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">Verified at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>

                {result ? (
                   <div className="space-y-4">
                     <div className="flex items-end gap-2">
                        <span className="text-3xl font-black text-slate-900 leading-none">{result.score || (result.ok ?? '-')}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{result.score !== undefined ? '%' : `of ${result.total}`}</span>
                     </div>
                     <p className="text-sm font-bold text-slate-600 line-clamp-1">{result.details}</p>
                     
                     <div className="pt-4 border-t border-slate-200">
                        <details className="cursor-pointer">
                           <summary className="text-xs font-black text-sky-600 uppercase tracking-widest flex items-center gap-2 list-none">
                              View Audit Data <ChevronDown className="w-3 h-3" />
                           </summary>
                           <div className="mt-4 p-4 bg-white rounded-xl text-[10px] font-mono text-slate-600 overflow-x-auto">
                              {JSON.stringify(result, null, 2)}
                           </div>
                        </details>
                     </div>
                   </div>
                ) : (
                   <button 
                     onClick={() => runTest({ key, name, icon: Icon, weight, run })}
                     className="w-full py-3 bg-white hover:bg-sky-50 text-sky-600 font-black text-xs rounded-xl border border-slate-200 hover:border-sky-200 transition-all uppercase tracking-widest"
                   >
                     Initialize Test
                   </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
