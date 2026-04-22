"use client";

import React from "react";
import Image from "next/image";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Twitter, 
  Instagram,
  Download,
  Printer
} from "lucide-react";

const ResumePage = () => {
  const handlePrint = () => {
    window.print();
  };

  const resumeData = {
    name: "Ansh Raj Singh",
    title: "Full Stack Engineer & Architect",
    summary: "Innovative Full Stack Engineer & Architect specializing in high-performance web applications and AI-driven solutions. Currently leading enterprise-grade projects at Softkingo, including a sophisticated AI-integrated dating platform utilizing Next.js, FastAPI, and real-time architectures with Redis and WebSockets. Proven track record of building scalable SaaS products from concept to deployment on AWS/VPS.",
    contact: {
      email: "anshrajsingh580@gmail.com",
      phone: "+91 96932 96612",
      location: "Noida / Delhi / Motihari, India",
      website: "anshrajsingh.com",
      github: "anshrajsingh5",
      linkedin: "ansh-raj-singh-913830225",
      twitter: "AnshrajSingh19"
    },
    skills: {
      frontend: ["Next.js", "React.js", "Tailwind CSS", "Framer Motion"],
      backend: ["Python", "Django", "FastAPI", "Node.js", "MySQL", "MongoDB", "Redis", "SQL"],
      devops: ["AWS (EC2, S3)", "Docker", "Nginx", "Linux", "VPS Setup", "CI/CD"],
      tools: ["Git", "Figma", "VS Code", "Postman"]
    },
    experience: [
      {
        company: "Softkingo",
        role: "Full Stack Engineer (Founder's Office)",
        duration: "April 2026 - Present",
        description: "Leading the development of a Dating App (Tinder-style) with advanced AI features.",
        points: [
          "Architected real-time chat and notification systems using WebSockets and Redis.",
          "Implemented AI features including Tinder Premium style user matching and AI chatbots.",
          "Building high-performance frontends with Next.js and backend APIs with FastAPI (Python).",
          "Managing end-to-end deployment on AWS EC2 and VPS with automated workflows.",
          "Utilizing MySQL for robust data management and Framer Motion for premium user experience."
        ]
      }
    ],
    projects: [
      {
        name: "Softkingo",
        desc: "Corporate platform & internal management portals.",
        tech: "Next.js, MySQL, Tailwind CSS, Framer Motion, VPS"
      },
      {
        name: "Dev-Era",
        desc: "Production-ready SaaS kits with Auth & Payments.",
        tech: "Next.js, MongoDB, Tailwind CSS, Framer Motion"
      },
      {
        name: "MavenPeakSolutions",
        desc: "SEO-focused modern agency website.",
        tech: "Next.js, MongoDB, Tailwind CSS, Framer Motion"
      },
      {
        name: "Practivoo",
        desc: "SaaS practice management tool with Super Admin Dashboard.",
        tech: "Next.js, MongoDB, Tailwind CSS, Framer Motion"
      },
      {
        name: "Appbii Tech",
        desc: "Dynamic IT agency site with custom CMS.",
        tech: "Next.js, MongoDB, Tailwind CSS, Framer Motion"
      },
      {
        name: "Corevalent LLC",
        desc: "US-based corporate site with backend panel.",
        tech: "Next.js, MySQL, Tailwind CSS, Framer Motion"
      },
      {
        name: "Virtual Try-On AI",
        desc: "Generative AI marketplace using Python & PyTorch.",
        tech: "Python, PyTorch, Generative AI"
      },
      {
        name: "UK Daily Times",
        desc: "Category-driven news portal with high SEO.",
        tech: "PHP, MySQL, HTML, Tailwind CSS"
      }
    ],
    education: [
      {
        degree: "B.Tech in Computer Science",
        school: "College of Engineering Roorkee (COER)",
        duration: "2021 - 2025"
      },
      {
        degree: "Higher Secondary (12th PCM)",
        school: "CBSE Board",
        duration: "2019 - 2021"
      },
      {
        degree: "Secondary School (10th)",
        school: "Shantiniketan Jubilee School, Motihari",
        duration: "2018 - 2019"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
      {/* Action Buttons - Hidden on Print */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-end gap-4 print:hidden">
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-all shadow-lg hover:shadow-sky-200"
        >
          <Printer size={20} />
          Print Resume
        </button>
      </div>

      {/* Resume Container */}
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row print:shadow-none print:rounded-none">
        
        {/* Left Column (Sidebar) */}
        <div className="w-full md:w-1/3 bg-slate-900 text-white p-8 space-y-10 print:w-[30%] print:p-6 print:bg-slate-900">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full border-4 border-sky-500 overflow-hidden mb-4 relative">
               <Image 
                src="/images/ansh.jpeg" 
                alt={resumeData.name} 
                fill
                className="object-cover"
                priority
              />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{resumeData.name}</h2>
            <p className="text-sky-400 font-medium text-sm mt-1">{resumeData.title}</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 border-b border-gray-700 pb-2">Contact</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="text-sky-400" size={16} />
                <span className="text-gray-300 break-all">{resumeData.contact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-sky-400" size={16} />
                <span className="text-gray-300">{resumeData.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-sky-400" size={16} />
                <span className="text-gray-300">{resumeData.contact.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="text-sky-400" size={16} />
                <span className="text-gray-300">{resumeData.contact.website}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 border-b border-gray-700 pb-2">Technical Skills</h3>
            <div className="space-y-4">
              {Object.entries(resumeData.skills).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-xs font-bold text-sky-400 uppercase mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map(skill => (
                      <span key={skill} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-[11px] font-medium border border-gray-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 border-b border-gray-700 pb-2">Education</h3>
            <div className="space-y-4">
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                  <p className="text-xs text-sky-400">{edu.school}</p>
                  <p className="text-[11px] text-gray-500 italic">{edu.duration}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 border-b border-gray-700 pb-2">Connect</h3>
            <div className="flex gap-4">
              <a href={`https://github.com/${resumeData.contact.github}`} className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href={`https://linkedin.com/in/${resumeData.contact.linkedin}`} className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={`https://x.com/${resumeData.contact.twitter}`} className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (Main) */}
        <div className="w-full md:w-2/3 p-10 space-y-12 print:w-[70%] print:p-8">
          
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 border-l-4 border-sky-500 pl-4">Professional Summary</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {resumeData.summary}
            </p>
          </section>

          <section className="space-y-8">
            <h3 className="text-xl font-bold text-slate-900 border-l-4 border-sky-500 pl-4">Work Experience</h3>
            <div className="space-y-8">
              {resumeData.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l border-gray-200">
                  <div className="absolute w-3 h-3 bg-sky-500 rounded-full -left-[6.5px] top-1.5" />
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{exp.role}</h4>
                      <p className="text-sky-600 font-semibold text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-400 mt-1 sm:mt-0 px-2 py-1 bg-gray-100 rounded-lg">{exp.duration}</span>
                  </div>
                  <p className="text-gray-700 text-sm font-medium mb-3 italic">{exp.description}</p>
                  <ul className="space-y-2 list-disc list-inside text-gray-600 text-sm">
                    {exp.points.map((point, pIdx) => (
                      <li key={pIdx} className="pl-1 marker:text-sky-500">{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-l-4 border-sky-500 pl-4">Key Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resumeData.projects.map((project, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-sky-50 transition-colors group">
                  <h4 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{project.name}</h4>
                  <p className="text-xs text-gray-600 my-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.split(',').map(t => (
                      <span key={t} className="text-[10px] text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded font-medium">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* Global CSS for Print */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .min-h-screen {
            padding: 0 !important;
          }
          header, footer, nav {
            display: none !important;
          }
          .shadow-2xl {
            box-shadow: none !important;
          }
          .rounded-2xl {
            border-radius: 0 !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          @page {
            margin: 0;
            size: auto;
          }
          a {
            text-decoration: none !important;
            color: inherit !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePage;
