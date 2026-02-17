import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import LeadForm from '@/components/public/LeadForm';
import InquirySection from '@/components/footer/InquirySection';

export const metadata: Metadata = {
  title: "Hire AI Developers | Machine Learning & AI Experts | Softkingo",
  description: "Hire expert AI developers specializing in machine learning, NLP, computer vision, and generative AI. Build intelligent solutions with top AI talent.",
  alternates: { canonical: "/hire/ai-developers" }
};

export default function AIDevelopersPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] md:min-h-[600px]">
        <Image
          src="/images/hire/ai-hero.jpg"
          alt="Hire AI Developers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Content */}
            <div className="text-white space-y-8 animate-fadeInLeft">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm">
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
                <span className="text-gray-400">›</span>
                <Link href="/hire" className="hover:text-cyan-400 transition-colors">
                  Hire Developers
                </Link>
                <span className="text-gray-400">›</span>
                <span className="text-cyan-400">AI Developers</span>
              </nav>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight animate-fadeInUp">
                  Hire World-Class{' '}
                  <span className="text-cyan-400">AI Developers</span>
                </h1>

                <p className="text-gray-300 text-md leading-relaxed animate-fadeInUp animation-delay-200">
                  Transform your business with cutting-edge AI solutions. Our expert AI developers 
                  specialize in machine learning, natural language processing, computer vision, and generative AI 
                  to build intelligent applications that drive innovation and growth.
                </p>
              </div>

              {/* AI Expertise Areas */}
              <div className="space-y-6 animate-fadeInUp animation-delay-400">
                <h3 className="text-xl font-bold text-white mb-4">AI Expertise Areas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-cyan-400 font-semibold mb-2">🧠 Machine Learning</h4>
                    <p className="text-gray-300 text-sm">Predictive models, classification, clustering</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-cyan-400 font-semibold mb-2">💬 Natural Language Processing</h4>
                    <p className="text-gray-300 text-sm">Chatbots, sentiment analysis, text processing</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-cyan-400 font-semibold mb-2">👁️ Computer Vision</h4>
                    <p className="text-gray-300 text-sm">Image recognition, object detection, OCR</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-cyan-400 font-semibold mb-2">🤖 Generative AI</h4>
                    <p className="text-gray-300 text-sm">LLMs, content generation, AI assistants</p>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-4 animate-fadeInUp animation-delay-600">
                <h3 className="text-xl font-bold text-white mb-4">Core Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'Hugging Face', 'scikit-learn', 'Keras', 'Pandas'].map((tech) => (
                    <span key={tech} className="bg-cyan-600/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:ml-auto w-full max-w-md mx-auto lg:mx-0 animate-fadeInRight">
              <LeadForm
                formType="hire"
                formKey='ai-developers'
                serviceName='Hire AI Developers'
                title="Build Your AI Team
"
                subtitle="Get matched with top AI talent in 24 Hours! "
                variant="hero"
                showLogo={true}
                showCompany={false}
                showBudget={false}
                showAttachment={false}
                showNDA={false}
              />
            </div>
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out; }
          .animate-fadeInRight { animation: fadeInRight 0.8s ease-out; }
          .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
          .animation-delay-200 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
          .animation-delay-400 { animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards; }
          .animation-delay-600 { animation-delay: 0.6s; opacity: 0; animation-fill-mode: forwards; }
        `}</style>
      </section>

      {/* Why Choose Our AI Developers */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our{' '}
              <span className="text-cyan-600">AI Developers</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Partner with AI experts who deliver cutting-edge solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-cyan-600 text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cutting-Edge Expertise</h3>
              <p className="text-gray-600">Latest AI frameworks and state-of-the-art ML algorithms</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-cyan-600 text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rapid Development</h3>
              <p className="text-gray-600">Agile methodology with fast iteration and deployment</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-cyan-600 text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Solutions</h3>
              <p className="text-gray-600">Tailored AI solutions for your specific industry needs</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-cyan-600 text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Data Security</h3>
              <p className="text-gray-600">Enterprise-grade security and compliance standards</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-cyan-600 text-3xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock technical support and maintenance</p>
            </div>
          </div>
        </div>
      </section>

      <InquirySection />
    </div>
  );
}
