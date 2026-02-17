// src/app/(public)/privacy-policy/page.jsx - PERFECT FINAL VERSION
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: "Privacy Policy | Softkingo - Data Protection & Privacy",
  description: "Read Softkingo's comprehensive privacy policy. Learn how we collect, use, and protect your personal information in compliance with global privacy standards.",
  alternates: { canonical: "/privacy-policy" }
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* PERFECT HERO */}
      <section className="relative h-[260px] md:h-[320px] lg:h-[380px] bg-cover bg-center bg-no-repeat bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        style={{ backgroundImage: "url('/images/privacy-hero.png')" }}
      >

        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-slate-900 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-[#001322]/45 to-white/10" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
          <div className="w-full">
            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-200/70 mb-3">
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-cyan-400 font-medium">Privacy Policy</span>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              Our Privacy Policy
            </h1>
            <p className="mt-3 max-w-xl text-xs md:text-sm lg:text-base text-slate-100/90 mb-6">
              Protecting your privacy is our commitment. We don't spam, sell, rent, or share your information with third parties.
            </p>

            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-slate-100/80">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span><a href="tel:+917428750870" className="hover:text-emerald-300 transition-colors">Sales: +91-7428750870</a></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span><a href="mailto:info@softkingo.com" className="hover:text-sky-300 transition-colors">Email: info@softkingo.com</a></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE MS WORD STYLE CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-20 prose prose-lg">
        <div className="prose prose-headings:font-bold prose-headings:text-sky-900 prose-headings:font-extrabold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-700 prose-li:text-base prose-li:leading-relaxed prose-a:text-sky-600 hover:prose-a:text-sky-500 prose-a:no-underline hover:prose-a:underline font-serif leading-relaxed">
          
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            At Softkingo Technologies, we are committed to protecting the privacy of our visitors, as we do not spam, sell, rent, or give information to third parties.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            It is intended to describe how we use and process your personal information. Please ensure that by visiting and using softkingo.com, you agree and agree to the policies described in this Privacy Policy.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-12">
            This Privacy Policy also describes how we use your personal information and what happens to the personal information you provide to us. In addition, we update the policies on this page from time to time, so please continue to review the page regularly.
          </p>

          {/* 1. Information that we collect */}
          <h2 className="text-3xl font-bold text-sky-900 mt-16 mb-6 border-b border-sky-200 pb-4">1. Information that we collect</h2>
          
          <h3 className="text-2xl font-bold text-sky-900 mt-12 mb-4">(I) Personal information</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            The personal information that we may collect includes names, contact details, IP addresses, choice of products and services, and other information that identifies you. We may also collect and collect personal information about you at various times, including, but not limited to, the following:
          </p>
          <ul className="text-gray-700 text-lg leading-relaxed space-y-2 mb-8 ml-6">
            <li><span className="text-sky-600 mr-2">•</span>When contacting you as a customer or potential customer.</li>
            <li><span className="text-sky-600 mr-2">•</span>When you want to visit our website or use the platform.</li>
            <li><span className="text-sky-600 mr-2">•</span>When you register as an end-user of our products or services and your account is created.</li>
            <li><span className="text-sky-600 mr-2">•</span>When filling out the "Contact Us" form to contact our experts.</li>
          </ul>

          <h3 className="text-2xl font-bold text-sky-900 mt-12 mb-4">(2) Non-personal data</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            We may collect or collect data or non-personal information about users when they prefer to interact with our site. The information and non-personal data include the name of the browser the user accessed, the type of computer, technical information such as operating systems and Internet service providers, and other similar information via Google Analytics.
          </p>

          {/* 2. Cookies */}
          <h2 className="text-3xl font-bold text-sky-900 mt-16 mb-6 border-b border-sky-200 pb-4">2. Cookies</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Our website does not collect any information about users, except for the information contained in cookies. Speaking of cookies, these are small text files, and they are basically information that is recorded and retrieved about your visit to our website. We use cookies to provide a personalized experience on our website. You will find here how we use cookies:
          </p>
          <ul className="text-gray-700 text-lg leading-relaxed space-y-2 mb-8 ml-6">
            <li><span className="text-sky-600 mr-2">•</span><strong>Session cookies:</strong> In general, session cookies are mainly stored temporarily as long as you use our website;</li>
            <li><span className="text-sky-600 mr-2">•</span><strong>Persistent cookies:</strong> persistent cookies are stored on your device in your cookie settings or until you delete them.</li>
          </ul>
          <p className="text-gray-700 text-lg leading-relaxed">
            You can adjust your computer's settings to refuse any cookie if you wish.
          </p>

          {/* 3. Disclosure */}
          <h2 className="text-3xl font-bold text-sky-900 mt-16 mb-6 border-b border-sky-200 pb-4">3. Disclosure of your information</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            We assure you that we will not disclose your personal collected information to any other party with this privacy policy. Some of the circumstances below may require us to share our share:
          </p>
          <ul className="text-gray-700 text-lg leading-relaxed space-y-2 mb-8 ml-6">
            <li><span className="text-sky-600 mr-2">•</span>In any case, when the buyer has to sell for himself or his own business.</li>
            <li><span className="text-sky-600 mr-2">•</span>We may disclose your personal information when required by law.</li>
            <li><span className="text-sky-600 mr-2">•</span>To protect against fraud and reduce the risk of fraud.</li>
          </ul>
          <p className="text-gray-700 text-lg leading-relaxed">
            SoftKingo Technologies does not sell, trade, or rent users' personal information to third parties. If necessary, we may share general demographics and information not linked to any personal visitor information with our business partners, affiliates, and trusted advertisers for the purposes mentioned above.
          </p>

          {/* 4-7 */}
          <h2 className="text-3xl font-bold text-sky-900 mt-16 mb-6 border-b border-sky-200 pb-4">4. Security</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Here, we make sure that your shared personal or non-personal information is safe and protected from unauthorized access, use, loss, or destruction. The personal or non-personal information you provide is stored on a secure and secure web server managed by Softkingo Technologies. To protect against authorized access, we have used physical, electronic, and managerial procedures to protect and secure the information.
          </p>

          <h2 className="text-3xl font-bold text-sky-900 mt-16 mb-6 border-b border-sky-200 pb-4">5. Third-party link/website</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Softkingo Technologies may connect to third-party websites and services as needed; However, we are not responsible for the privacy statements, practices, or content of third-party websites.
          </p>

          <h2 className="text-3xl font-bold text-sky-900 mt-16 mb-6 border-b border-sky-200 pb-4">6. Changes in the privacy policy</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Softkingo Technologies reserves the right to change, amend or amend this privacy policy at any time without notice. When we change, amend or delete any part of this Privacy Policy, we refer to the updated date at the bottom of this Privacy Policy page.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We encourage our users to keep visiting this page to keep abreast of any changes we make. Your continued use of our website signifies your acceptance of these changes.
          </p>

          <h2 className="text-3xl font-bold text-sky-900 mt-16 mb-6 border-b border-sky-200 pb-4">7. Contact us</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            If you have any questions or concerns regarding our privacy policy, you can contact us through our contact form.
          </p>

          {/* Contact Details */}
          <div className="mt-12 pt-12 border-t border-sky-200 space-y-4 text-lg font-arial">
            <p><strong style={{color: '#0ea5e9'}}>Contact Address:</strong></p>
            <p>New Ashok Nagar, New Delhi - 110096</p>
            <p>H61, Block H, Sector 63, Noida - 201301</p>
            
            <div className="grid md:grid-cols-2 gap-6 pt-6">
              <div>
                <p><strong style={{color: '#0ea5e9'}}>Phone:</strong></p>
                <p><a href="tel:+917428750870" className="text-sky-600 hover:text-sky-500 hover:underline transition-colors font-medium">+91 7428750870</a></p>
                <p><a href="tel:+13124285526" className="text-sky-600 hover:text-sky-500 hover:underline transition-colors font-medium">+1 (312)-428-5526</a></p>
                <p><a href="tel:+911203506011" className="text-sky-600 hover:text-sky-500 hover:underline transition-colors font-medium">HR: 0120-(3506)-011</a></p>
              </div>
              <div>
                <p><strong style={{color: '#0ea5e9'}}>Email:</strong></p>
                <p><a href="mailto:info@softkingo.com" className="text-sky-600 hover:text-sky-500 hover:underline transition-colors font-medium">info@softkingo.com</a></p>
                <p><a href="mailto:sales@softkingo.com" className="text-sky-600 hover:text-sky-500 hover:underline transition-colors font-medium">sales@softkingo.com</a></p>
                <p><a href="mailto:hr@softkingo.com" className="text-sky-600 hover:text-sky-500 hover:underline transition-colors font-medium">hr@softkingo.com</a></p>
              </div>
            </div>
            <p className="pt-6">
              <a href="https://calendly.com/paramhans-softkingo/30min" 
                 className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover-lift border-0" 
                 target="_blank" rel="noopener noreferrer"
              >
                Schedule a Meeting →
              </a>
            </p>
          </div>

          <div className="mt-16 pt-12 border-t border-sky-200 text-center text-sm text-gray-500">
            <p>Last Updated: <span className="font-semibold text-sky-900">January 7, 2026</span></p>
          </div>

        </div>
      </div>

      <style >{`
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        h1, h2, h3 {
          scroll-margin-top: 100px;
        }
      `}</style>
    </>
  );
}
