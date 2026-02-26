'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AiAssistancePage() {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [currentPolicy, setCurrentPolicy] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        fetchPolicy();
    }, []);

    const fetchPolicy = async () => {
        try {
            const res = await fetch('/api/admin/ai-assistance/upload');
            const data = await res.json();
            if (data.content) {
                setCurrentPolicy(data.content);
            }
        } catch (error) {
            console.error('Failed to fetch policy:', error);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true);
        setStatus({ type: '', message: '' });

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/admin/ai-assistance/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({ type: 'success', message: 'AI assistance rules updated successfully!' });
                setCurrentPolicy(data.textPreview);
                fetchPolicy(); // Refresh full content
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to upload policy.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'An error occurred during upload.' });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">AI Assistance (Training System)</h1>
                    <p className="text-slate-500 mt-1">Upload the mission and rules PDF for the AI Assistant</p>
                </div>
                <div className="p-2 bg-sky-100 rounded-lg">
                    <ShieldCheck className="h-6 w-6 text-sky-600" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Upload Section */}
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Upload New Policy</h2>
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-sky-400 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                                <p className="text-xs text-slate-500 truncate">
                                    {file ? file.name : 'Click or drag PDF here'}
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={!file || isUploading}
                                className="w-full flex items-center justify-center gap-2 bg-sky-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="h-4 w-4" />
                                        Update AI Knowledge
                                    </>
                                )}
                            </button>
                        </form>

                        {status.message && (
                            <div className={`mt-4 p-3 rounded-lg flex items-start gap-2 text-sm ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                {status.type === 'success' ? <CheckCircle2 className="h-4 w-4 mt-0.5" /> : <AlertCircle className="h-4 w-4 mt-0.5" />}
                                <span>{status.message}</span>
                            </div>
                        )}
                    </div>

                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                        <h3 className="text-xs font-bold text-amber-800 uppercase flex items-center gap-2 mb-2">
                            <ShieldCheck className="h-3 w-3" />
                            Security Reminder
                        </h3>
                        <p className="text-xs text-amber-700 leading-relaxed">
                            This section is restricted to <strong>System Admins</strong>. The uploaded document directly controls how the AI represents the company.
                        </p>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="md:col-span-2 space-y-4">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col">
                        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4 flex items-center justify-between">
                            Extracted Policy Content
                            {currentPolicy && <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">Live Active Rules</span>}
                        </h2>

                        <div className="flex-1 bg-slate-50 rounded-lg p-4 font-mono text-xs overflow-y-auto max-h-[500px] text-slate-700 whitespace-pre-wrap leading-relaxed border border-slate-100">
                            {currentPolicy || (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50 space-y-2">
                                    <FileText className="h-12 w-12" />
                                    <p>No policy document uploaded yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
