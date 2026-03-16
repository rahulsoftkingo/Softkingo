'use client';

import { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Trash2, 
  Calendar, 
  User, 
  Mail, 
  MessageSquare, 
  Clock,
  Loader2,
  Plus,
  AlertCircle,
  Timer,
  Tag
} from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function TicketEditModal({ open, onClose, onSaved, ticket = null, users = [], prefillFromLead = null }) {
  const isEdit = !!ticket;
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];
  const isAdminOrManager = roles.some((r) => ['admin', 'manager'].includes(r));

  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    channel: 'internal',
    ownerId: '',
    requesterId: '',
    leadId: '',
    dueDate: '',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  // Work Logs State
  const [workLogs, setWorkLogs] = useState([]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [logForm, setLogForm] = useState({
    description: '',
    startTime: '',
    endTime: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [logSaving, setLogSaving] = useState(false);

  // Notes/Comments State
  const [comments, setComments] = useState([]);
  const [note, setNote] = useState('');
  const [noteVisibility, setNoteVisibility] = useState('internal');
  const [noteSaving, setNoteSaving] = useState(false);

  useEffect(() => {
    if (ticket) {
      setForm({
        title: ticket.title || '',
        description: ticket.description || '',
        status: ticket.status || 'open',
        priority: ticket.priority || 'medium',
        channel: ticket.channel || 'internal',
        ownerId: ticket.ownerId ? String(ticket.ownerId) : '',
        requesterId: ticket.requesterId ? String(ticket.requesterId) : '',
        leadId: ticket.leadId ? String(ticket.leadId) : '',
        dueDate: ticket.dueDate ? new Date(ticket.dueDate).toISOString().split('T')[0] : '',
      });
      setComments(ticket.comments || []);
      fetchWorkLogs();
    } else {
      setForm({
        title: prefillFromLead?.title || '',
        description: '',
        status: 'open',
        priority: 'medium',
        channel: 'internal',
        ownerId: '',
        requesterId: '',
        leadId: prefillFromLead?.leadId || '',
        dueDate: '',
      });
      setComments([]);
      setWorkLogs([]);
    }
    setError('');
    setNote('');
    setActiveTab('general');
  }, [ticket, prefillFromLead, open]);

  const fetchWorkLogs = async () => {
    if (!ticket?.id) return;
    try {
      const res = await fetch(`/api/admin/work-logs?ticketId=${ticket.id}`);
      if (res.ok) {
        const data = await res.json();
        setWorkLogs(data);
      }
    } catch (err) {
      console.error('Fetch work logs error', err);
    }
  };

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const url = isEdit ? `/api/admin/tickets/${ticket.id}` : '/api/admin/tickets';
      const method = isEdit ? 'PATCH' : 'POST';
      
      const payload = {
        ...form,
        ownerId: form.ownerId ? Number(form.ownerId) : null,
        requesterId: form.requesterId ? Number(form.requesterId) : null,
        leadId: form.leadId ? Number(form.leadId) : null,
        dueDate: form.dueDate || null,
      };
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to save ticket');
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
    if (!ticket || !note.trim()) return;
    setNoteSaving(true);
    try {
      const res = await fetch(`/api/admin/tickets/${ticket.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'note',
          visibility: noteVisibility,
          content: note,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setComments((prev) => [data, ...prev]);
        setNote('');
      } else {
        throw new Error('Failed to save note');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setNoteSaving(false);
    }
  };

  const handleAddWorkLog = async (e) => {
    e.preventDefault();
    if (!ticket?.id || !logForm.description.trim()) return;
    setLogSaving(true);
    try {
      const res = await fetch('/api/admin/work-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...logForm, ticketId: ticket.id }),
      });
      if (res.ok) {
        const data = await res.json();
        setWorkLogs((prev) => [data, ...prev]);
        setLogForm({
          description: '',
          startTime: '',
          endTime: '',
          date: new Date().toISOString().split('T')[0],
        });
        setShowLogForm(false);
      } else {
        throw new Error('Failed to add log');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLogSaving(false);
    }
  };

  const deleteWorkLog = async (id) => {
    if (!confirm('Remove this work log?')) return;
    try {
      const res = await fetch(`/api/admin/work-logs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setWorkLogs((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error('Delete work log error', err);
    }
  };

  const handleDeleteTicket = async () => {
    if (!isAdminOrManager || !isEdit) return;
    if (!confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) return;
    
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/tickets/${ticket.id}`, { method: 'DELETE' });
      if (res.ok) {
        onSaved();
        onClose();
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Delete failed');
      }
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const formatDuration = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  const totalMins = workLogs.reduce((acc, curr) => acc + (curr.duration || 0), 0);

  const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'waiting', label: 'Waiting' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-slate-500' },
    { value: 'medium', label: 'Medium', color: 'text-sky-600' },
    { value: 'high', label: 'High', color: 'text-amber-600' },
    { value: 'urgent', label: 'Urgent', color: 'text-rose-600' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-sky-600" />
              {isEdit ? `Edit Ticket: ${ticket.title}` : 'Create New Ticket'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEdit ? `Ticket ID: #${ticket.id} · Created on ${new Date(ticket.createdAt).toLocaleDateString()}` : 'Describe the issue to create a ticket'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          {[
            { id: 'general', label: 'Ticket Details' },
            { id: 'timelogs', label: 'Work logs', hide: !isEdit },
            { id: 'notes', label: 'Internal Notes', hide: !isEdit }
          ].filter(t => !t.hide).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === tab.id 
                  ? 'text-sky-600 border-sky-600 bg-white' 
                  : 'text-slate-500 border-transparent hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="p-6 sm:p-8">
            
            {activeTab === 'general' && (
              <form id="ticket-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
                {/* Basic Info */}
                <div className="space-y-5">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Basic Information</h3>
                  <div className="grid gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Ticket Title</label>
                      <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        placeholder="Brief summary of the issue"
                        className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Detailed Description</label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Explain the problem in detail..."
                        className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Operations */}
                <div className="space-y-5">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Status & Assignment</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Status</label>
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 shadow-sm bg-white"
                      >
                        {statusOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Priority</label>
                      <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 shadow-sm bg-white"
                      >
                        {priorityOptions.map(opt => (
                          <option key={opt.value} value={opt.value} className={opt.color}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Assigned Owner</label>
                      <select
                        name="ownerId"
                        value={form.ownerId}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 shadow-sm bg-white"
                      >
                        <option value="">Unassigned</option>
                        {users.map((u) => (
                          <option key={u.id} value={u.id}>{u.name || u.username}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Due Date</label>
                      <input
                        name="dueDate"
                        type="date"
                        value={form.dueDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 shadow-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Channel</label>
                      <select
                        name="channel"
                        value={form.channel}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 shadow-sm bg-white"
                      >
                        <option value="internal">Internal Task</option>
                        <option value="email">Email</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="web">Website Form</option>
                      </select>
                    </div>
                    {isEdit && (
                       <div className="bg-slate-50 border border-slate-100 rounded-md p-3 text-[11px] text-slate-500 space-y-1">
                          <p className="flex justify-between"><span>Requester:</span> <span className="font-bold text-slate-700">{ticket.requester?.name || ticket.requester?.email || 'System'}</span></p>
                          <p className="flex justify-between"><span>Lead Linked:</span> <span className="font-bold text-slate-700">{ticket.lead?.name || 'None'}</span></p>
                       </div>
                    )}
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'timelogs' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Time Logging</h3>
                    <p className="text-xs text-slate-500">Record work done on this ticket</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Invested</p>
                    <p className="text-xl font-black text-sky-600">{formatDuration(totalMins)}</p>
                  </div>
                </div>

                {!showLogForm ? (
                  <button 
                    onClick={() => setShowLogForm(true)}
                    className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-sky-400 hover:bg-sky-50 transition-all group"
                  >
                    <Plus className="h-6 w-6 text-slate-300 mx-auto group-hover:text-sky-500 transition-colors" />
                    <span className="text-xs font-bold text-slate-400 group-hover:text-sky-600 tracking-wider uppercase">Log New Activity</span>
                  </button>
                ) : (
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4 shadow-inner">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Working Date</label>
                        <div className="relative">
                           <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                           <input
                             type="date"
                             value={logForm.date}
                             onChange={(e) => setLogForm({ ...logForm, date: e.target.value })}
                             className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500/10 outline-none"
                           />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Start Time</label>
                          <input
                            type="time"
                            value={logForm.startTime}
                            onChange={(e) => setLogForm({ ...logForm, startTime: e.target.value })}
                            className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500/10 outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">End Time</label>
                          <input
                            type="time"
                            value={logForm.endTime}
                            onChange={(e) => setLogForm({ ...logForm, endTime: e.target.value })}
                            className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500/10 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Activity Log</label>
                      <textarea
                        value={logForm.description}
                        onChange={(e) => setLogForm({ ...logForm, description: e.target.value })}
                        placeholder="What specific tasks were completed?"
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500/10 outline-none resize-none"
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <button onClick={() => setShowLogForm(false)} className="text-xs font-bold text-slate-500 hover:text-slate-700 px-4 py-2">Cancel</button>
                      <button 
                        onClick={handleAddWorkLog} 
                        disabled={logSaving || !logForm.description.trim()}
                        className="bg-slate-800 text-white text-xs font-bold px-6 py-2 rounded-md hover:bg-slate-700 disabled:bg-slate-300 shadow-lg shadow-slate-100 transition-all"
                      >
                        {logSaving ? 'Saving...' : 'Confirm Log'}
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">Recent Intervals</h4>
                   {workLogs.length === 0 && !showLogForm && (
                      <div className="text-center py-10">
                        <Clock className="h-10 w-10 text-slate-100 mx-auto mb-3" />
                         <p className="text-sm text-slate-400 italic">No time logs recorded for this ticket.</p>
                      </div>
                   )}
                   <div className="grid gap-3">
                      {workLogs.map(log => (
                        <div key={log.id} className="group bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:border-sky-300 transition-all flex justify-between items-start">
                           <div className="space-y-1">
                              <div className="flex items-center gap-3">
                                 <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(log.date).toLocaleDateString()}
                                 </span>
                                 <span className="text-[10px] font-bold text-sky-600 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded flex items-center gap-1">
                                    <Timer className="h-3 w-3" />
                                    {log.startTime && log.endTime ? `${log.startTime} - ${log.endTime}` : `${log.duration} mins`}
                                 </span>
                              </div>
                              <p className="text-sm text-slate-700 font-medium leading-relaxed">{log.description}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight italic">Estimated: {formatDuration(log.duration)}</p>
                           </div>
                           <button 
                             onClick={() => deleteWorkLog(log.id)}
                             className="p-2 text-slate-200 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                           >
                             <Trash2 className="h-4 w-4" />
                           </button>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="space-y-4 p-5 bg-slate-50 border border-slate-100 rounded-xl shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                       <MessageSquare className="h-4 w-4 text-sky-500" />
                       Add Discussion / Internal Note
                    </label>
                    <div className="flex items-center bg-white border border-slate-200 rounded-full p-1 shadow-sm">
                       <button 
                         onClick={() => setNoteVisibility('internal')}
                         className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${noteVisibility === 'internal' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                       >
                         Internal
                       </button>
                       <button 
                         onClick={() => setNoteVisibility('public')}
                         className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${noteVisibility === 'public' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-emerald-600'}`}
                       >
                         Public
                       </button>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Type your update here..."
                      rows={2}
                      className="flex-1 px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sky-500 transition-all shadow-sm resize-none bg-white"
                    />
                    <button
                      onClick={addNote}
                      disabled={noteSaving || !note.trim()}
                      className="h-fit self-end p-3 rounded-lg bg-slate-800 text-white hover:bg-slate-700 disabled:bg-slate-300 transition-all shadow-md active:scale-95"
                    >
                      {noteSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-5">
                   <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">History & Comments</h3>
                   {comments.length === 0 && (
                      <div className="text-center py-16 opacity-30">
                         <MessageSquare className="h-12 w-12 mx-auto mb-4" />
                         <p className="text-sm font-bold uppercase tracking-widest">No entries yet</p>
                      </div>
                   )}
                   <div className="space-y-5">
                      {comments.map((comm) => (
                        <div key={comm.id} className={`flex gap-4 ${comm.visibility === 'public' ? 'bg-emerald-50/30' : ''} p-1 rounded-lg transition-colors`}>
                           <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 border-white shadow-sm shrink-0 ${comm.visibility === 'public' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                              <User className="h-5 w-5" />
                           </div>
                           <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                 <div>
                                    <span className="text-xs font-black text-slate-800 mr-2">{comm.createdBy?.name || comm.createdBy?.username || 'System'}</span>
                                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${comm.visibility === 'public' ? 'bg-emerald-100 border-emerald-200 text-emerald-700' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                                       {comm.visibility}
                                    </span>
                                 </div>
                                 <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {new Date(comm.createdAt).toLocaleString()}
                                 </span>
                              </div>
                              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                                 <p className="text-sm text-slate-600 leading-relaxed">{comm.content}</p>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
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
                onClick={handleDeleteTicket}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-100 transition-all font-sans"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Terminate Ticket</span>
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              disabled={saving}
              className="flex-1 sm:flex-none px-6 py-2 rounded-md text-xs font-bold text-slate-500 hover:text-slate-800 transition-all"
            >
              Close
            </button>
            <button
              form="ticket-form"
              type="submit"
              disabled={saving}
              onClick={(e) => {
                if(activeTab !== 'general') {
                   e.preventDefault();
                   handleSubmit(e);
                }
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-2 rounded-md text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-xl shadow-sky-100 transition-all"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              <span>{saving ? 'Processing...' : isEdit ? 'Save Changes' : 'Initialize Ticket'}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-rose-600 text-white px-4 py-3 rounded-md text-xs font-bold shadow-2xl animate-in fade-in slide-in-from-bottom-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                 <AlertCircle className="h-4 w-4" />
                 {error}
              </span>
              <button onClick={() => setError('')} className="p-1 hover:bg-white/10 rounded"><X className="h-4 w-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
