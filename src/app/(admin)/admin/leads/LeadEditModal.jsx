'use client';

import { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Trash2, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Tag, 
  Clock,
  Loader2,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function LeadEditModal({ open, onClose, onSaved, lead = null, users = [] }) {
  const isEdit = !!lead;
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];
  const isAdminOrManager = roles.some((r) => ['admin', 'manager'].includes(r));

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    source: 'website',
    campaign: '',
    message: '',
    status: 'new',
    ownerId: '',
    nextFollowUp: '',
    tags: '',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [activities, setActivities] = useState([]);
  const [note, setNote] = useState('');
  const [noteSaving, setNoteSaving] = useState(false);

  useEffect(() => {
    if (lead) {
      setForm({
        name: lead.name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        whatsapp: lead.whatsapp || '',
        source: lead.source || 'website',
        campaign: lead.campaign || '',
        message: lead.message || '',
        status: lead.status || 'new',
        ownerId: lead.ownerId ? String(lead.ownerId) : '',
        nextFollowUp: lead.nextFollowUp ? new Date(lead.nextFollowUp).toISOString().split('T')[0] : '',
        tags: lead.tags || '',
      });
      setActivities(lead.activities || []);
    } else {
      setForm({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        source: 'manual',
        campaign: '',
        message: '',
        status: 'new',
        ownerId: '',
        nextFollowUp: '',
        tags: '',
      });
      setActivities([]);
    }
  }, [lead]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const url = isEdit ? `/api/admin/leads/${lead.id}` : '/api/admin/leads';
      const method = isEdit ? 'PATCH' : 'POST';
      
      const payload = {
        ...form,
        ownerId: form.ownerId ? Number(form.ownerId) : null,
      };
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to save lead');
      }

      onSaved();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const addNote = async () => {
    if (!note.trim() || !isEdit) return;
    setNoteSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'note', content: note }),
      });
      if (res.ok) {
        const data = await res.json();
        setActivities((prev) => [data, ...prev]);
        setNote('');
      }
    } catch (err) {
      console.error('Note error', err);
    } finally {
      setNoteSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isAdminOrManager || !isEdit) return;
    if (!confirm('Are you sure you want to delete this lead?')) return;
    
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, { method: 'DELETE' });
      if (res.ok) {
        onSaved();
        onClose();
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const statusOptions = [
    { value: 'new', label: 'New Lead', color: 'bg-blue-100 text-blue-700' },
    { value: 'contacted', label: 'Contacted', color: 'bg-amber-100 text-amber-700' },
    { value: 'qualified', label: 'Qualified', color: 'bg-emerald-100 text-emerald-700' },
    { value: 'lost', label: 'Lost', color: 'bg-slate-100 text-slate-700' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              {isEdit ? <Clock className="h-5 w-5 text-sky-600" /> : <Plus className="h-5 w-5 text-sky-600" />}
              {isEdit ? `Edit Lead: ${lead.name}` : 'Create New Lead'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEdit ? `Lead ID: #${lead.id} · Registered on ${new Date(lead.createdAt).toLocaleDateString()}` : 'Enter lead details to get started'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {['general', 'notes', isAdminOrManager && 'metadata'].filter(Boolean).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === tab 
                    ? 'text-sky-600 border-sky-600 bg-white' 
                    : 'text-slate-500 border-transparent hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'general' && (
              <form id="lead-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Section */}
                <div className="space-y-5">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Contact Details</h3>
                  <div className="grid gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-sky-500" />
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full pl-10 pr-4 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-sky-500" />
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">Phone</label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+1..."
                          className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">WhatsApp</label>
                        <input
                          name="whatsapp"
                          value={form.whatsapp}
                          onChange={handleChange}
                          placeholder="+1..."
                          className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operations Section */}
                <div className="space-y-5">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Status & Assignment</h3>
                  <div className="grid gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Lead Status</label>
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm bg-white"
                      >
                        {statusOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Assigned Agent</label>
                      <select
                        name="ownerId"
                        value={form.ownerId}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm bg-white"
                      >
                        <option value="">Unassigned</option>
                        {users.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name || u.username}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Next Follow-up Date</label>
                      <div className="relative group">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-sky-500" />
                        <input
                          name="nextFollowUp"
                          type="date"
                          value={form.nextFollowUp}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Requirement / Remarks</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter detailed client requirements or internal remarks..."
                    className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm resize-none"
                  />
                </div>
              </form>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {isEdit ? (
                  <>
                    <div className="space-y-3 p-4 bg-slate-50 border border-slate-100 rounded-md">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">New Internal Note</label>
                      <div className="flex gap-2">
                        <textarea
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="Log a call, objection, or update..."
                          rows={2}
                          className="flex-1 px-4 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:border-sky-500 transition-all shadow-sm resize-none bg-white"
                        />
                        <button
                          onClick={addNote}
                          disabled={noteSaving || !note.trim()}
                          className="h-fit self-end p-2.5 rounded-md bg-slate-800 text-white hover:bg-slate-700 disabled:bg-slate-300 transition-all shadow-sm"
                        >
                          {noteSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Interaction History</h4>
                        <span className="text-[10px] font-bold text-slate-400">{activities.length} entries</span>
                      </div>
                      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {activities.length === 0 && (
                          <p className="text-sm text-slate-400 italic text-center py-10">No activities recorded yet.</p>
                        )}
                        {activities.map((act) => (
                          <div key={act.id} className="relative pl-6 pb-6 border-l-2 border-slate-100 last:border-0 last:pb-0">
                            <div className="absolute left-[-9px] top-1 h-4 w-4 rounded-full bg-white border-2 border-sky-500 flex items-center justify-center">
                               <div className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                            </div>
                            <div className="bg-white border border-slate-100 rounded-md p-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                  {act.createdBy?.name || 'System'}
                                </span>
                                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(act.createdAt).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{act.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-lg">
                    <MessageSquare className="h-10 w-10 text-slate-200 mx-auto mb-4" />
                    <p className="text-sm text-slate-400">Activity logging is available after lead creation.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'metadata' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2 mb-4">Marketing Analytics</h3>
                    <div className="grid gap-4">
                      {[
                        { label: 'Source', value: form.source },
                        { label: 'Campaign', value: form.campaign || 'None' },
                        { label: 'UTM Source', value: lead?.utmSource || '—' },
                        { label: 'UTM Medium', value: lead?.utmMedium || '—' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-50">
                          <span className="text-xs font-medium text-slate-500">{item.label}</span>
                          <span className="text-xs font-bold text-slate-700">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2 mb-4">Tags</h3>
                    <div className="relative group">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-sky-500" />
                      <input 
                        name="tags"
                        value={form.tags}
                        onChange={handleChange}
                        placeholder="urgent, high-ticket, website..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2 mb-4">System Context</h3>
                    <div className="grid gap-3">
                      {[
                        { label: 'Form Type', value: lead?.formType || 'General Inquiry' },
                        { label: 'Form Key', value: lead?.formKey || 'Manual Entry' },
                        { label: 'Budget Level', value: lead?.budgetLabel || 'Not disclosed' },
                        { label: 'NDA Status', value: lead?.ndaAccepted ? 'Accepted' : 'Not required' },
                        { label: 'Attachment', value: lead?.attachmentName || 'No files' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-50">
                          <span className="text-xs font-medium text-slate-500">{item.label}</span>
                          <span className={`text-xs font-bold ${item.label === 'Budget Level' ? 'text-emerald-600' : 'text-slate-700'}`}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {isEdit && (
                    <div className="p-4 bg-sky-50 rounded-md border border-sky-100">
                       <p className="text-[10px] font-bold text-sky-600 uppercase tracking-wider mb-2">Connected Resources</p>
                       <button 
                         onClick={() => {
                            const params = new URLSearchParams({
                                leadId: String(lead.id),
                                title: `Tickets: ${lead.name}`,
                            });
                            window.open(`/admin/tickets?${params.toString()}`, '_blank');
                         }}
                         className="flex items-center justify-between w-full text-xs font-bold text-sky-700 hover:text-sky-800"
                       >
                         Manage Support Tickets
                         <ExternalLink className="h-3 w-3" />
                       </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <div className="flex items-center gap-3">
            {isEdit && isAdminOrManager && (
              <button
                onClick={handleDelete}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-100 transition-all"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Lead</span>
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              disabled={saving}
              className="flex-1 sm:flex-none px-6 py-2 rounded-md text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all border border-transparent"
            >
              Cancel
            </button>
            <button
              form="lead-form"
              type="submit"
              disabled={saving}
              onClick={(e) => {
                if(activeTab !== 'general') {
                   e.preventDefault();
                   handleSubmit(e);
                }
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-2 rounded-md text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-100 transition-all"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              <span>{saving ? 'Processing...' : isEdit ? 'Update Details' : 'Create Lead'}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-rose-600 text-white px-4 py-3 rounded-md text-xs font-bold shadow-xl animate-in fade-in slide-in-from-bottom-4 flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError('')}><X className="h-4 w-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
