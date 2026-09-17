// src/app/(public)/terms-conditions/page.jsx
import Link from 'next/link';
import { commonSchemas } from "@/lib/commonSchema";

export const metadata = {
  title: "Terms & Conditions - Legal Terms",
  description: "Read Softkingo's terms and conditions. Understand our service agreements, payment terms, and legal policies for web and app development services.",
  alternates: { canonical: "/terms-conditions" }
};

export default function TermsConditionsPage() {
  return (
    <>
      {/* HERO (same style) */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              ...commonSchemas,
              {
                "@type": "Service",
                "@id": "https://softkingo.com/#mobile-app-development",
                "name": "Mobile App Development",
                "serviceType": "App Development",
                "category": "Software Development Service",
                "description": "Custom mobile app solutions...",

                "areaServed": {
                  "@type": "Place",
                  "name": "Worldwide"
                },
                "isRelatedTo": {
                  "@type": "Thing",
                  "name": "App Development"
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.softkingo.com/terms-conditions#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Softkingo",
                    "item": "https://www.softkingo.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Terms Conditions",
                    "item": "https://www.softkingo.com/terms-conditions"
                  }
                ]
              }      
            ]
          })
        }}
      />
      <section
        className="relative h-[260px] md:h-[320px] lg:h-[380px] bg-cover bg-center bg-no-repeat bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
        style={{ backgroundImage: "url('/images/terms-hero.png')" }} // change image if you want
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
              <span className="text-cyan-400 font-medium">Terms &amp; Conditions</span>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              Terms &amp; Conditions
            </h1>

            <p className="mt-3 max-w-2xl text-xs md:text-sm lg:text-base text-slate-100/90 mb-6">
              Please read these Terms of Service carefully before using softkingo.com.
            </p>

            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-slate-100/80">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  <a href="tel:+917428750870" className="hover:text-emerald-300 transition-colors">
                    Sales: +91-7428750870
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>
                  <a href="mailto:info@softkingo.com" className="hover:text-sky-300 transition-colors">
                    Email: info@softkingo.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE “MS WORD” CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-sky-900 prose-headings:font-extrabold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-700 prose-li:text-base prose-li:leading-relaxed prose-a:text-sky-600 hover:prose-a:text-sky-500 prose-a:no-underline hover:prose-a:underline font-serif leading-relaxed">
          <h2 className="text-3xl font-bold text-sky-900 mt-0 mb-6 border-b border-sky-200 pb-4">
            Use of the Website
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            The website (softkingo.com) is incorporated under the Companies Act 1956, India and has a registered
            office in New Delhi - 110096, India.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            You hereby agree to the terms and conditions stated in the Terms of Service. In any case or situation,
            if you do not agree to these terms and conditions, you are asked not to use the SoftKingo website or
            download any content from it.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            The website, including all content (excluding any third-party content), is the property of Softkingo
            and is protected by global copyright and copyright laws and treaty provisions. You agree to comply
            with all copyright laws of the world to prevent unauthorized copying of content and use of this website.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Softkingo maintains business relationships with thousands of its customers, suppliers, governments,
            and more. We have used terms such as joint ventures, partnerships, and partners to denote business
            relationships involving common interests and activities, and the words may not denote precise legal
            relationships.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-12">
            Regularly, this website may also include links to other websites. These links for more information are
            provided mainly for your convenience. It does not indicate that we endorse this site.
          </p>

          <h2 className="text-3xl font-bold text-sky-900 mt-16 mb-6 border-b border-sky-200 pb-4">
            License use
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            In accordance with the terms and conditions set forth in these Terms and Conditions, Softkingo has
            temporarily permitted only one copy of the Content (Information or Services) on the Softkingo Website
            for personal, non-commercial, and transient viewing. It is a licensing grant, not a transfer of ownership.
            You also agree not to attempt to disrupt or disrupt the operation of the website in any way.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Unless otherwise stated, the website is intended for personal, non-commercial use. Please ensure that
            you do not alter, modify, copy or distribute any information, programs, products or services received
            from this website or create, display, reproduce, publish, license, create derivative works, transfer or sell.
          </p>

          <h2 className="text-3xl font-bold text-sky-900 mt-16 mb-6 border-b border-sky-200 pb-4">
            The Blog
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            This is to inform that individuals (including but not limited to Softkingo employees and referred to as
            &quot;individuals&quot;) may contribute articles, blog content and opinions to this site, at Softkingo&apos;s sole
            discretion. These posts and articles are called &quot;blogs&quot; because the term is easier to understand.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            You agree that these blogs and documents have collected opinions of individuals in their personal capacity
            and do not refer to SoftKingO&apos;s official positions. We have all copyrights in the content of this blog.
          </p>

          <h2 className="text-3xl font-bold text-sky-900 mt-16 mb-6 border-b border-sky-200 pb-4">
            Disclaimer
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            The information on this website is for general purposes only. We are trying to keep this information
            updated and correct. The company does not guarantee the accuracy, completeness, or reliability of any
            advice, opinion, statement or other information displayed or distributed on the site.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            You acknowledge that any reliance on any of these opinions, advice, statements, observations, or
            information is at your own risk. Softkingo reserves the right, at its sole discretion, to correct any errors
            or omissions in any part of the website.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-12">
            Softkingo reserves the right to make any other changes to the website at any time without notifying the
            website, content, products, software, services, or prices (if any).
          </p>

          <h2 className="text-3xl font-bold text-sky-900 mt-16 mb-6 border-b border-sky-200 pb-4">
            Illegal or prohibited use of the site
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            You will not use the site for any purpose that is unlawful or prohibited by the terms of use. You are not
            permitted to use the Website in any way that could damage, disable, invade or impair any SoftKingo Server
            or the network connected to the SoftKingo Server.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            You must not attempt to gain unauthorized access to any section of the website, accounts, computer system,
            or network associated with any software server or any services linked to the website by hacking, password
            mining, or any other form. It should not be included either.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-12">
            Ensure that you are not intentionally trying to obtain content or information or that it is not available on
            the site in any case. If we discover that you have violated these terms, we reserve the right to terminate your
            use of the mobile application development service at any time.
          </p>

          <h2 className="text-3xl font-bold text-sky-900 mt-16 mb-6 border-b border-sky-200 pb-4">
            Modification of the terms of use
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Softkingo reserves the right to change, amend, add or remove any part of the Terms of Service in whole or
            in part at any time. The amendment or amendment to the Terms of Service will be effective after posting
            notice of such changes. If you continue to use the website after changing the terms of use, you will be deemed
            to have accepted those changes.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Softkingo reserves the right to amend, terminate, suspend or discontinue any location services, including
            location service or convenience, without notice. Additionally, Softkingo may also place restrictions on
            features and services. This may restrict your access to certain sections or the entire website without notice.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            You acknowledge and agree that Softkingo may terminate the authorization, rights, and licenses granted to it
            at any time and at any time.
          </p>

          <div className="mt-16 pt-12 border-t border-sky-200 text-center text-sm text-gray-500">
            {/* <p>
              Last Updated: <span className="font-semibold text-sky-900">January 7, 2026</span>
            </p> */}
          </div>
        </div>
      </div>

      <style>{`
        h1, h2, h3 { scroll-margin-top: 100px; }
      `}</style>
    </>
  );
}
