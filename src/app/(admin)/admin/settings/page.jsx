// app/admin/settings/page.jsx
// export default function SettingsHome() {
//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold text-slate-900">General Settings</h2>
//       <p className="text-slate-600 mt-2">Configure site-wide options here.</p>
//     </div>
//   );
// }



// app/admin/test-site-health/page.jsx
'use client';
import React, { useState } from 'react'; 
// import { useState, useCallback } from 'react';
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

  // 🚀 ALL YOUR SITE ROUTES (from build log)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-slate-200/50">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl shadow-lg border border-sky-400/30">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Site Health Dashboard</h1>
                <p className="text-xs text-slate-500">Production readiness • {ALL_ROUTES.length} routes tested</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 ml-auto">
              <button 
                onClick={runAll}
                disabled={loading || isRunning}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 transition-all duration-200 h-10"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Scan All ({ALL_ROUTES.length} routes)
                  </>
                )}
              </button>
              <button 
                onClick={() => setResults({})}
                className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border h-10"
              >
                Reset
              </button>
              <button 
                onClick={copyResults}
                className="flex items-center gap-1 px-6 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border h-10"
              >
                <Download className="w-3 h-3" />
                Export JSON
              </button>
            </div>
          </div>

          {Object.keys(results).length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-emerald-50/80 to-sky-50/80 rounded-xl border-2 border-white/50">
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-600 mb-1">{overallScore}%</div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Health Score</div>
              </div>
              <div className="text-center border-l border-white/40">
                <div className="text-3xl font-black text-slate-900 mb-1">
                  {Object.values(results).filter(r => r.success).length}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Passed</div>
              </div>
              <div className="text-center border-l border-white/40">
                <div className="text-3xl font-black text-slate-900 mb-1">
                  {Object.keys(results).length}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Tests</div>
              </div>
              <div className="text-center border-l border-white/40">
                <div className="text-2xl font-black text-amber-600 mb-1">
                  {Object.values(results).filter(r => !r.success && !r.error).length}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Issues</div>
              </div>
            </div>
          )}
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {testConfigs.map(({ key, name, icon: Icon, weight, run }) => {
            const result = results[key];
            const status = getStatus(result);
            
            return (
              <div key={key} className="group bg-white/90 backdrop-blur-xl shadow-lg hover:shadow-xl rounded-xl p-4 border border-slate-200/50 hover:border-sky-300/70 hover:-translate-y-1 transition-all duration-300 h-48 flex flex-col cursor-pointer relative overflow-hidden"
                onClick={() => !result && runTest({ key, name, icon: Icon, weight, run })}
              >
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold shadow-md z-10 ${status.bg} ${status.text} border border-white/50`}>
                  {result ? (result.success ? 'PASS' : result.error ? 'ERR' : 'WARN') : `${weight}pt`}
                </div>

                <div className="flex items-center gap-3 mb-3 mt-2">
                  <div className={`p-2 rounded-lg shadow-md border flex-shrink-0 transition-all group-hover:scale-105 ${
                    result ? `${status.bg} ${status.text}` : 'bg-gradient-to-r from-sky-500 to-sky-600 shadow-sky-400/50'
                  }`}>
                    {result ? React.createElement(status.icon, { className: "w-5 h-5" }) : <Icon className="w-5 h-5 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xs text-slate-900 truncate">{name}</h3>
                    {result && (
                      <p className="text-xs text-slate-500 truncate">
                        {new Date(result.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    )}
                  </div>
                </div>

                {result && (
                  <div className="space-y-1 mb-4">
                    {result.score !== undefined && (
                      <div className="text-center">
                        <div className="text-lg font-black text-slate-900">{result.score}%</div>
                        <div className="text-xs text-slate-500 truncate">{result.details}</div>
                      </div>
                    )}
                    {result.total !== undefined && (
                      <div className="text-xs grid grid-cols-2 gap-2 text-center">
                        <div className="font-bold text-slate-900">{result.ok || 0}</div>
                        <div className="font-bold text-slate-900">{result.total}</div>
                        <div className="text-slate-500">OK</div>
                        <div className="text-slate-500">Total</div>
                      </div>
                    )}
                  </div>
                )}

                {!result ? (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      runTest({ key, name, icon: Icon, weight, run });
                    }}
                    className="mt-auto flex items-center justify-center gap-2 px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs rounded-xl border-2 border-sky-200 hover:border-sky-300 transition-all duration-200 h-10 shadow-sm hover:shadow-md"
                  >
                    <Play className="w-3 h-3" />
                    Test Now
                  </button>
                ) : (
                  <details className="mt-auto">
                    <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors w-full text-left text-xs font-medium text-slate-700 flex items-center gap-1">
                      Details <ChevronDown className="w-3 h-3 transition-transform" />
                    </summary>
                    <div className="mt-2 pt-2 border-t border-slate-200/50 text-xs space-y-1 max-h-20 overflow-y-auto">
                      {result.details && <div className="text-slate-700">{result.details}</div>}
                      {result.routes && result.routes.slice(0, 3).map((r, i) => (
                        <div key={i} className={`text-xs p-1 rounded ${r.ok ? 'text-emerald-700 bg-emerald-50/50' : 'text-red-700 bg-red-50/50'}`}>
                          {r.route?.slice(-20)}: {r.ok ? 'OK' : 'FAIL'}
                        </div>
                      ))}
                      {result.checks && Object.entries(result.checks).map(([k, v]) => (
                        <div key={k} className={`text-xs flex items-center gap-1 ${v ? 'text-emerald-700' : 'text-red-700'}`}>
                          {v ? '✅' : '❌'} {k}
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Fix Tips */}
        {/* Quick Fix Tips */}
{Object.keys(results).length > 0 && overallScore < 80 && (
  <div className="bg-gradient-to-r from-amber-50 to-red-50/30 border-2 border-amber-200/50 rounded-2xl p-6">
    <h3 className="font-bold text-sm text-amber-900 mb-3 flex items-center gap-2">
      <AlertTriangle className="w-5 h-5" />
      Quick Fixes ({100-overallScore}pts needed)
    </h3>
    <div className="space-y-1 text-xs text-amber-800">
      {getFixTips().map((tip, i) => (
        <div key={i}>{tip}</div>
      ))}
    </div>
  </div>
)}

      </div>
    </div>
  );
}
