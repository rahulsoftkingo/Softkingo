'use client';

import { useState, useEffect } from 'react';
import {
  Search, Filter, Download, Eye, Trash2, CheckCircle, Clock, XCircle,
  Briefcase, Plus, MapPin, DollarSign, Layers, Star, Edit, Save, X, ChevronRight
} from 'lucide-react';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewing: 'bg-blue-100 text-blue-800',
  shortlisted: 'bg-purple-100 text-purple-800',
  rejected: 'bg-red-100 text-red-800',
  hired: 'bg-green-100 text-green-800',
};

const statusIcons = {
  pending: Clock,
  reviewing: Eye,
  shortlisted: CheckCircle,
  rejected: XCircle,
  hired: CheckCircle,
};

const jobStatusColors = {
  active: 'bg-emerald-100 text-emerald-800',
  inactive: 'bg-slate-100 text-slate-800',
  filled: 'bg-blue-100 text-blue-800',
};

export default function CareerAdmin() {
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'jobs'

  // Applications State
  const [applications, setApplications] = useState([]);
  const [appsLoading, setAppsLoading] = useState(true);
  const [appSearch, setAppSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showAppDetails, setShowAppDetails] = useState(false);

  // Jobs State
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    department: '',
    location: '',
    experience: '',
    type: 'Full Time',
    salary: '',
    description: '',
    requirements: '',
    status: 'active',
    featured: false,
    order: 0
  });

  useEffect(() => {
    if (activeTab === 'applications') {
      fetchApplications();
    } else {
      fetchJobs();
    }
  }, [activeTab, currentPage, statusFilter]);

  const fetchApplications = async () => {
    try {
      setAppsLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
      });
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/career?${params}`);
      const data = await response.json();
      if (response.ok) {
        setApplications(data.applications || []);
        setTotalPages(data.pagination?.pages || 1);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setAppsLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      setJobsLoading(true);
      const response = await fetch('/api/admin/jobs');
      const data = await response.json();
      if (response.ok) {
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setJobsLoading(false);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/career/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        fetchApplications();
        if (selectedApplication?.id === id) {
          setSelectedApplication(prev => ({ ...prev, status }));
        }
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const deleteApplication = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      const response = await fetch(`/api/career/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchApplications();
        setShowAppDetails(false);
      }
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingJob ? `/api/admin/jobs/${editingJob.id}` : '/api/admin/jobs';
      const method = editingJob ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobFormData),
      });

      if (response.ok) {
        setShowJobModal(false);
        setEditingJob(null);
        fetchJobs();
      }
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const deleteJob = async (id) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;
    try {
      const response = await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
      if (response.ok) fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const openEditJob = (job) => {
    setEditingJob(job);
    setJobFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      experience: job.experience,
      type: job.type || 'Full Time',
      salary: job.salary || '',
      description: job.description || '',
      requirements: job.requirements || '',
      status: job.status,
      featured: job.featured,
      order: job.order
    });
    setShowJobModal(true);
  };

  const filteredApplications = applications.filter(app =>
    app.firstName.toLowerCase().includes(appSearch.toLowerCase()) ||
    app.lastName.toLowerCase().includes(appSearch.toLowerCase()) ||
    app.email.toLowerCase().includes(appSearch.toLowerCase()) ||
    app.position.toLowerCase().includes(appSearch.toLowerCase())
  );

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Career Management</h1>
          <p className="text-slate-500 mt-1">Manage job openings and candidate applications</p>
        </div>

        {activeTab === 'jobs' && (
          <button
            onClick={() => {
              setEditingJob(null);
              setJobFormData({
                title: '', department: '', location: '', experience: '',
                type: 'Full Time', salary: '', description: '', requirements: '',
                status: 'active', featured: false, order: 0
              });
              setShowJobModal(true);
            }}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all font-medium shadow-sm active:scale-95"
          >
            <Plus size={18} /> Add New Job
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <button
          onClick={() => setActiveTab('applications')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'applications'
              ? 'text-slate-900 border-slate-900 bg-white'
              : 'text-slate-400 border-transparent hover:text-slate-600'
            }`}
        >
          <Briefcase size={18} /> Applications
          {applications.length > 0 && (
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] ml-1">
              {applications.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'jobs'
              ? 'text-slate-900 border-slate-900 bg-white'
              : 'text-slate-400 border-transparent hover:text-slate-600'
            }`}
        >
          <Layers size={18} /> Job Postings
          {jobs.length > 0 && (
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] ml-1">
              {jobs.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'applications' ? (
        <>
          {/* Applications Filter */}
          <div className="bg-white rounded-3xl p-6 mb-8 border border-slate-100 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border-none rounded-2xl px-6 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-900 min-w-[200px]"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
            </div>
          </div>

          {/* Applications Content */}
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            {appsLoading ? (
              <div className="py-20 flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin"></div>
                <p className="text-slate-400 font-medium">Fetching applications...</p>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="py-20 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                  <Briefcase className="text-slate-300" size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No applications found</h3>
                <p className="text-slate-500 max-w-xs">No candidates have applied yet or match your filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Candidate</th>
                      <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Position</th>
                      <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-8 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <div>
                            <p className="font-bold text-slate-900">{app.firstName} {app.lastName}</p>
                            <p className="text-xs text-slate-500">{app.email}</p>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <p className="text-sm font-semibold text-slate-700">{app.position}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">{app.experience}</p>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[app.status]}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-sm text-slate-500">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => { setSelectedApplication(app); setShowAppDetails(true); }} className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-900 shadow-sm border border-transparent hover:border-slate-100"><Eye size={18} /></button>
                            <button onClick={() => deleteApplication(app.id)} className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-red-600 shadow-sm border border-transparent hover:border-slate-100"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Jobs Tab Content */
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          {jobsLoading ? (
            <div className="py-20 flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin"></div>
              <p className="text-slate-400 font-medium">Fetching jobs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="py-24 flex flex-col items-center gap-6 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                <Layers className="text-slate-300" size={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">No job openings yet</h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-2 text-sm">Create your first job posting to start receiving applications.</p>
              </div>
              <button
                onClick={() => setShowJobModal(true)}
                className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-xl hover:shadow-slate-200 transition-all active:scale-95"
              >
                Create Job Opening
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Job Details</th>
                    <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Featured</th>
                    <th className="px-8 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div>
                          <p className="font-bold text-slate-900 text-base">{job.title}</p>
                          <div className="flex items-center gap-3 mt-1 text-slate-400">
                            <span className="flex items-center gap-1 text-[11px] font-medium"><MapPin size={12} /> {job.location}</span>
                            <span className="flex items-center gap-1 text-[11px] font-medium"><Briefcase size={12} /> {job.experience}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-semibold text-slate-700">
                        {job.department}
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{job.type}</p>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${jobStatusColors[job.status]}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        {job.featured ? <span className="text-amber-500 flex items-center gap-1 text-[11px] font-bold"><Star size={14} fill="currentColor" /> Featured</span> : <span className="text-slate-300">No</span>}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEditJob(job)} className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-sky-600 shadow-sm border border-transparent hover:border-slate-100"><Edit size={18} /></button>
                          <button onClick={() => deleteJob(job.id)} className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-red-600 shadow-sm border border-transparent hover:border-slate-100"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* App Details Media Modal */}
      {showAppDetails && selectedApplication && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[40px] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Application Details</h2>
                <p className="text-slate-500 text-sm">Submitted on {new Date(selectedApplication.createdAt).toLocaleDateString()}</p>
              </div>
              <button onClick={() => setShowAppDetails(false)} className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-sm hover:rotate-90 transition-all border border-slate-100"><X size={20} /></button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Basic Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Candidate Information</h3>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                      <div><label className="text-[10px] font-bold text-sky-600 uppercase">Full Name</label><p className="font-bold text-slate-900">{selectedApplication.firstName} {selectedApplication.lastName}</p></div>
                      <div><label className="text-[10px] font-bold text-sky-600 uppercase">Email Address</label><p className="font-bold text-slate-900">{selectedApplication.email}</p></div>
                      <div><label className="text-[10px] font-bold text-sky-600 uppercase">Phone Number</label><p className="font-bold text-slate-900">{selectedApplication.phone || 'N/A'}</p></div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Professional Link</h3>
                    <div className="space-y-3">
                      {selectedApplication.linkedinUrl && (
                        <a href={selectedApplication.linkedinUrl} target="_blank" className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50 transition-all group">
                          <span className="text-sm font-bold text-slate-700">LinkedIn Profile</span>
                          <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                        </a>
                      )}
                      {selectedApplication.portfolioUrl && (
                        <a href={selectedApplication.portfolioUrl} target="_blank" className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50 transition-all group">
                          <span className="text-sm font-bold text-slate-700">Portfolio Website</span>
                          <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Job Details</h3>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                      <div><label className="text-[10px] font-bold text-sky-600 uppercase">Position Applied</label><p className="font-bold text-slate-900">{selectedApplication.position}</p></div>
                      <div><label className="text-[10px] font-bold text-sky-600 uppercase">Total Experience</label><p className="font-bold text-slate-900">{selectedApplication.experience || 'N/A'}</p></div>
                      <div><label className="text-[10px] font-bold text-sky-600 uppercase">Education</label><p className="font-bold text-slate-900">{selectedApplication.education || 'N/A'}</p></div>
                    </div>
                  </div>

                  {selectedApplication.resumeUrl && (
                    <a
                      href={selectedApplication.resumeUrl}
                      target="_blank"
                      className="flex items-center gap-4 p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl text-white hover:shadow-xl hover:shadow-slate-200 transition-all active:scale-95 group"
                    >
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Download size={24} /></div>
                      <div>
                        <p className="font-bold">Download Resume</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">CLICK TO VIEW ATTACHMENT</p>
                      </div>
                    </a>
                  )}
                </div>

                {/* Cover Letter Full Width */}
                <div className="md:col-span-2">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Cover Letter / Message</h3>
                  <div className="p-8 bg-white rounded-[32px] border border-slate-100 text-slate-600 text-sm leading-relaxed min-h-[150px]">
                    {selectedApplication.coverLetter || 'No cover letter provided.'}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Application Status</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(statusColors).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateApplicationStatus(selectedApplication.id, status)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${selectedApplication.status === status
                          ? 'bg-slate-900 text-white shadow-lg'
                          : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'
                        }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Edit/Create Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[40px] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-2xl font-bold text-slate-900">{editingJob ? 'Edit Job Posting' : 'Create New Job Opening'}</h2>
              <button onClick={() => setShowJobModal(false)} className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-sm hover:rotate-90 transition-all border border-slate-100"><X size={20} /></button>
            </div>

            <form onSubmit={handleJobSubmit} className="overflow-y-auto flex-1 custom-scrollbar">
              <div className="p-8 space-y-8">
                {/* Core Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Basic Information</label>
                    <input
                      type="text" required placeholder="Job Title (e.g. Senior Frontend Developer)"
                      value={jobFormData.title} onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-slate-900 font-medium"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <select
                        required value={jobFormData.department} onChange={(e) => setJobFormData({ ...jobFormData, department: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-slate-900 font-medium appearance-none"
                      >
                        <option value="">Department</option>
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="BA">Business Analysis</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                      <input
                        type="text" required placeholder="Location"
                        value={jobFormData.location} onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Requirements & Perks</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text" required placeholder="Experience (e.g. 3-5 Years)"
                        value={jobFormData.experience} onChange={(e) => setJobFormData({ ...jobFormData, experience: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-slate-900 font-medium"
                      />
                      <select
                        value={jobFormData.type} onChange={(e) => setJobFormData({ ...jobFormData, type: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-slate-900 font-medium appearance-none"
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                    <input
                      type="text" placeholder="Salary Range (Optional)"
                      value={jobFormData.salary} onChange={(e) => setJobFormData({ ...jobFormData, salary: e.target.value })}
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-slate-900 font-medium"
                    />
                  </div>
                </div>

                {/* Description & Requirements */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Job Description</label>
                    <textarea
                      placeholder="Write a clear description of the role..." rows="4"
                      value={jobFormData.description} onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                      className="w-full bg-slate-50 border-none rounded-[32px] p-6 text-sm focus:ring-2 focus:ring-slate-900 font-medium"
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Requirements (One per line)</label>
                    <textarea
                      placeholder="List the essential skills and qualifications..." rows="4"
                      value={jobFormData.requirements} onChange={(e) => setJobFormData({ ...jobFormData, requirements: e.target.value })}
                      className="w-full bg-slate-50 border-none rounded-[32px] p-6 text-sm focus:ring-2 focus:ring-slate-900 font-medium"
                    ></textarea>
                  </div>
                </div>

                {/* Status and Misc */}
                <div className="flex flex-wrap items-center gap-8 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</label>
                    <select
                      value={jobFormData.status} onChange={(e) => setJobFormData({ ...jobFormData, status: e.target.value })}
                      className="bg-white border-none rounded-xl px-4 py-2 text-xs font-bold focus:ring-2 focus:ring-slate-900 appearance-none shadow-sm"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="filled">Filled</option>
                    </select>
                  </div>

                  <div className="flex-1 flex items-center gap-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox" className="w-5 h-5 rounded-md border-slate-200 text-slate-900 focus:ring-slate-900"
                        checked={jobFormData.featured} onChange={(e) => setJobFormData({ ...jobFormData, featured: e.target.checked })}
                      />
                      <div className="flex items-center gap-1.5 font-bold text-sm text-slate-700 group-hover:text-slate-900">
                        <Star size={16} className={jobFormData.featured ? 'fill-amber-400 text-amber-400' : 'text-slate-300'} />
                        Featured Job
                      </div>
                    </label>

                    <div className="flex items-center gap-3">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sort Order</label>
                      <input
                        type="number" value={jobFormData.order} onChange={(e) => setJobFormData({ ...jobFormData, order: parseInt(e.target.value) })}
                        className="w-20 bg-white border-none rounded-xl px-4 py-2 text-[11px] font-bold focus:ring-2 focus:ring-slate-900 text-center shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-4">
                <button type="button" onClick={() => setShowJobModal(false)} className="px-8 py-3 rounded-2xl font-bold text-slate-500 hover:text-slate-700 transition-all">Cancel</button>
                <button type="submit" className="flex items-center gap-2 bg-slate-900 text-white px-10 py-3 rounded-2xl font-bold hover:shadow-xl shadow-slate-200 transition-all active:scale-95">
                  <Save size={18} /> {editingJob ? 'Save Changes' : 'Create Posting'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}
