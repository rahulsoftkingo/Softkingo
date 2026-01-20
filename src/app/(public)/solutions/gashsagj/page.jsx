// src/app/(public)/solutions/tinder-clone-app-development/page.jsx
// 🔥 EXACT Softkingo Tinder Clone Page Recreation

import Link from "next/link";
import { 
  FaHeart, FaUsers, FaMobileAlt, FaShieldAlt, FaClock, 
  FaCode, FaRocket, FaArrowRight, FaCheckCircle 
} from "react-icons/fa";

export const dynamic = "force-static";

export async function generateMetadata() {
  return {
    title: "Tinder Clone App Development - Softkingo",
    description: "Launch your Tinder clone dating app with complete source code, iOS/Android apps, admin panel, real-time chat & swipe matching. Ready in 4 weeks.",
  };
}

export default function TinderClonePage() {
  return (
    <>
      {/* HERO SECTION - Exact Softkingo Style */}
      <section className="relative min-h-[300px] md:min-h-[400px] bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-6 max-w-2xl">
            <Link href="/" className="hover:text-pink-300 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/solutions" className="hover:text-pink-300 transition-colors">Solutions</Link>
            <span>›</span>
            <span className="font-semibold text-pink-300">Tinder Clone</span>
          </nav>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Tinder Clone App
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              Launch your dating revolution with our battle-tested Tinder clone. 
              Complete source code with swipe matching, real-time chat & geolocation.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                <span className="font-semibold text-white">🚀 Production Ready</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 flex items-center gap-2">
                <span className="text-white font-semibold">4-6 Weeks Delivery</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 flex items-center gap-2">
                <FaHeart className="text-pink-300" />
                <span className="text-white font-semibold">500+ Projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SOFTKINGO SECTION */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              Why Choose Softkingo?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tinder clone development by experts who've built 500+ clone apps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="group p-8 rounded-3xl bg-white border border-slate-100 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Free Consultation</h3>
              <p className="text-slate-600">30-minute free consultation to understand your dating app vision</p>
            </div>

            <div className="group p-8 rounded-3xl bg-white border border-slate-100 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110">
                <FaShieldAlt className="text-xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">NDA Protected</h3>
              <p className="text-slate-600">100% confidentiality with signed NDA for your app idea</p>
            </div>

            <div className="group p-8 rounded-3xl bg-white border border-slate-100 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-500 hover:-translate-y-2 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110">
                <FaCode className="text-xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Expert Team</h3>
              <p className="text-slate-600">10+ years experience building Tinder clones & dating platforms</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Complete Tinder Clone Solution
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything included - Customer apps, admin panel, source code & 6 months support
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {[
              { icon: "💖", title: "Swipe Matching", desc: "Left/right swipes, super likes, instant notifications" },
              { icon: "💬", title: "Real-time Chat", desc: "Instant messaging, photo sharing, typing indicators" },
              { icon: "📱", title: "iOS + Android", desc: "Native apps for both platforms with unified code" },
              { icon: "🔒", title: "Admin Panel", desc: "Complete web dashboard for user & match management" },
              { icon: "🌍", title: "Geolocation", desc: "GPS-based matching with distance filters" },
              { icon: "💳", title: "Payment System", desc: "Stripe/Razorpay integration for premium features" },
              { icon: "🔔", title: "Push Notifications", desc: "FCM integration for match & message alerts" },
              { icon: "💾", title: "Source Code", desc: "100% ownership of complete source code" }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-slate-200 hover:border-pink-300 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Development Process</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Proven 4-step process that delivered 500+ successful clone apps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understand your business needs & app requirements" },
              { step: "02", title: "Strategy", desc: "Create wireframes & development roadmap" },
              { step: "03", title: "Development", desc: "Build iOS/Android apps + admin panel" },
              { step: "04", title: "Launch", desc: "Deploy to stores + 6 months free support" }
            ].map((step, i) => (
              <div key={i} className="group text-center p-8">
                <div className="w-20 h-20 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-110 transition-all">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-slate-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-r from-pink-600 to-rose-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Launch Your <span className="text-yellow-300">Dating App</span>?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-white/90">
            Get your complete Tinder clone with source code in just 4 weeks
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/contact" className="group bg-white text-rose-600 px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center gap-3">
              Start Your Project 
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link href="#demo" className="px-12 py-6 border-2 border-white/50 rounded-3xl font-semibold text-lg hover:bg-white/10 hover:border-white transition-all">
              Live Demo
            </Link>
          </div>

          {/* INCLUDES */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 max-w-4xl mx-auto border border-white/20">
            <h3 className="text-3xl font-bold mb-12 text-center">What's Included</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                "iOS & Android Dating Apps",
                "Web Admin Panel", 
                "Complete Source Code",
                "Push Notifications",
                "Payment Gateway",
                "6 Months Free Support",
                "App Store Deployment",
                "NDA Protection"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4">
                  <FaCheckCircle className="text-emerald-400 text-xl flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NOTICE */}
      <div className="p-12 bg-gradient-to-r from-yellow-50 to-pink-50 border-t-4 border-yellow-300 rounded-t-3xl mx-8 -mt-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-yellow-900 mb-4">
            ✨ Admin Panel Auto-Generated
          </h3>
          <p className="text-lg text-yellow-800 mb-6">
            This Tinder clone page was created automatically. Edit this file for custom content:
          </p>
          <code className="bg-white px-6 py-3 rounded-2xl text-lg font-mono border-2 border-yellow-200 block mx-auto">
            src/app/(public)/solutions/tinder-clone-app-development/page.jsx
          </code>
        </div>
      </div>
    </>
  );
}
