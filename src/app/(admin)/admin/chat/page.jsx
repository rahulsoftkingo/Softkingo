'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import {
  MessageSquare,
  Send,
  X,
  Search,
  Filter,
  MoreVertical,
  Clock,
  CheckCheck,
  Paperclip,
  Phone,
  Mail,
  ArrowLeft
} from 'lucide-react';

export default function AdminChatPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('active');
  const [replyInput, setReplyInput] = useState('');
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileList, setShowMobileList] = useState(true);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle Socket Connection
  useEffect(() => {
    socketRef.current = io();

    socketRef.current.on('connect', () => {
      console.log('Admin Socket Connected');
      socketRef.current.emit('join-admin');
    });

    socketRef.current.on('new-message-alert', (data) => {
      // Reload conversations list to show unread/last msg
      loadConversations();

      // If we are looking at this conversation, update messages
      if (selectedConv && data.conversationId === selectedConv.id) {
        setMessages(prev => {
          // Avoid duplicates
          if (prev.some(m => m.id === data.id || (m.content === data.content && m.sender === data.sender))) {
            return prev;
          }
          return [...prev, {
            ...data,
            id: Date.now() + Math.random(),
            createdAt: data.timestamp || new Date()
          }];
        });
      }
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [selectedConv]);

  useEffect(() => {
    loadConversations();
  }, [filter]);

  const loadConversations = async () => {
    try {
      const res = await fetch(`/api/admin/chat/conversations?status=${filter}`);
      const data = await res.json();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error('Load conversations error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId, silent = false) => {
    try {
      const res = await fetch(`/api/chat/conversation?id=${conversationId}`);
      const data = await res.json();
      setMessages(data.conversation.messages || []);
      if (!silent) {
        setSelectedConv(data.conversation);
        setShowMobileList(false);
      }

      // Mark as read
      await fetch('/api/chat/message', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId }),
      });
    } catch (error) {
      console.error('Load messages error:', error);
    }
  };

  const sendReply = async (e) => {
    e.preventDefault();
    if (!replyInput.trim() || !selectedConv) return;

    setSending(true);
    const content = replyInput;
    const conversationId = selectedConv.id;

    try {
      // 1. Save to database via API
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          content,
          sender: 'agent',
          senderName: 'Support Team',
        }),
      });

      if (res.ok) {
        // 2. Emit via socket for INSTANT delivery
        if (socketRef.current) {
          socketRef.current.emit('agent-reply', {
            conversationId,
            content,
            agentName: 'Support Team'
          });
        }

        // 3. Update local state instantly
        setMessages(prev => [...prev, {
          id: Date.now(),
          content,
          sender: 'agent',
          senderName: 'Support Team',
          createdAt: new Date()
        }]);

        setReplyInput('');
      }
    } catch (error) {
      console.error('Send reply error:', error);
    } finally {
      setSending(false);
    }
  };

  const closeConversation = async (convId) => {
    if (!window.confirm('Close this conversation?')) return;

    try {
      await fetch('/api/chat/conversation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: convId,
          status: 'closed',
        }),
      });

      loadConversations();
      if (selectedConv?.id === convId) {
        setSelectedConv(null);
        setMessages([]);
        setShowMobileList(true);
      }
    } catch (error) {
      console.error('Close conversation error:', error);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-slate-100 text-slate-600 border-slate-200',
      normal: 'bg-blue-50 text-blue-600 border-blue-200',
      high: 'bg-orange-50 text-orange-600 border-orange-200',
      urgent: 'bg-rose-50 text-rose-600 border-rose-200',
    };
    return colors[priority] || colors.normal;
  };

  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-emerald-500'
      : 'bg-slate-400';
  };

  const filteredConversations = conversations.filter(conv =>
    conv.visitorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.visitorEmail?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diff = now - messageDate;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return messageDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return messageDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/admin')}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
                Chat Support
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push('/admin')}
            className="hidden lg:flex px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className={`${showMobileList ? 'flex' : 'hidden'
          } lg:flex w-full lg:w-96 bg-white border-r border-slate-200 flex-col`}>
          {/* Search & Filter */}
          <div className="p-4 space-y-3 border-b border-slate-200 flex-shrink-0">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              {[
                { value: 'active', label: 'Active', icon: '🟢' },
                { value: 'closed', label: 'Closed', icon: '⚪' },
                { value: 'all', label: 'All', icon: '📋' }
              ].map((status) => (
                <button
                  key={status.value}
                  onClick={() => setFilter(status.value)}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all ${filter === status.value
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <span className="mr-1">{status.icon}</span>
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-600">No conversations found</p>
                <p className="text-xs text-slate-500 mt-1">
                  {searchQuery ? 'Try a different search' : 'New chats will appear here'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredConversations.map((conv) => {
                  const lastMessage = conv.messages?.[0];
                  const unreadCount = conv.messages?.filter(m => !m.isRead && m.sender === 'user').length || 0;

                  return (
                    <button
                      key={conv.id}
                      onClick={() => loadMessages(conv.id)}
                      className={`w-full text-left p-4 transition-all hover:bg-slate-50 ${selectedConv?.id === conv.id
                        ? 'bg-sky-50 border-l-4 border-sky-600'
                        : 'border-l-4 border-transparent'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-semibold text-lg">
                            {conv.visitorName?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 ${getStatusColor(conv.status)} rounded-full border-2 border-white`}></span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-sm text-slate-900 truncate">
                              {conv.visitorName || 'Anonymous User'}
                            </h3>
                            <span className="text-xs text-slate-500 flex-shrink-0">
                              {formatTime(conv.updatedAt)}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 truncate mb-2">
                            {conv.visitorEmail}
                          </p>

                          {lastMessage && (
                            <p className="text-xs text-slate-500 truncate">
                              {lastMessage.sender === 'user' ? '💬 ' : '✅ '}
                              {lastMessage.content}
                            </p>
                          )}

                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getPriorityColor(conv.priority)}`}>
                              {conv.priority}
                            </span>
                            {unreadCount > 0 && (
                              <span className="px-2 py-0.5 bg-rose-500 text-white text-xs font-bold rounded-full">
                                {unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div className={`${showMobileList ? 'hidden' : 'flex'
          } lg:flex flex-1 flex-col bg-white`}>
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowMobileList(true)}
                      className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>

                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-semibold">
                        {selectedConv.visitorName?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <span className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(selectedConv.status)} rounded-full border-2 border-white`}></span>
                    </div>

                    <div>
                      <h2 className="font-semibold text-sm sm:text-base text-slate-900">
                        {selectedConv.visitorName || 'Anonymous User'}
                      </h2>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{selectedConv.visitorEmail}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedConv.visitorPhone && (
                      <a
                        href={`tel:${selectedConv.visitorPhone}`}
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                        title="Call"
                      >
                        <Phone className="w-4 h-4 text-slate-600" />
                      </a>
                    )}
                    <button
                      onClick={() => closeConversation(selectedConv.id)}
                      className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      <span className="hidden sm:inline">Close</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50">
                {/* Date separator */}
                <div className="flex items-center justify-center">
                  <span className="px-3 py-1 bg-white text-xs text-slate-500 rounded-full shadow-sm border border-slate-200">
                    {new Date(selectedConv.createdAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                {messages.map((msg, index) => {
                  const showAvatar = index === 0 || messages[index - 1].sender !== msg.sender;
                  const isUser = msg.sender === 'user';
                  const isAgent = msg.sender === 'agent';

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${showAvatar ? 'mt-4' : 'mt-1'
                        }`}
                    >
                      {!isUser && showAvatar && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-xs mr-2 flex-shrink-0">
                          ST
                        </div>
                      )}

                      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%] sm:max-w-[60%]`}>
                        {showAvatar && msg.senderName && (
                          <span className="text-xs font-medium text-slate-600 mb-1 px-1">
                            {msg.senderName}
                          </span>
                        )}

                        <div
                          className={`rounded-2xl px-4 py-2.5 shadow-sm ${isUser
                            ? 'bg-sky-600 text-white rounded-br-md'
                            : isAgent
                              ? 'bg-emerald-600 text-white rounded-bl-md'
                              : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md'
                            }`}
                        >
                          {msg.type === 'file' && msg.fileUrl && (
                            <a
                              href={msg.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 mb-2 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                            >
                              <Paperclip className="w-4 h-4" />
                              <span className="text-xs truncate">{msg.fileName}</span>
                            </a>
                          )}
                          <p className="text-sm leading-relaxed whitespace-pre-line break-words">
                            {msg.content}
                          </p>
                          <div className={`flex items-center gap-1.5 mt-1 text-xs ${isUser || isAgent ? 'opacity-75' : 'text-slate-400'
                            }`}>
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(msg.createdAt)}</span>
                            {msg.isRead && isUser && (
                              <CheckCheck className="w-3.5 h-3.5 text-sky-300" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Reply Input */}
              <form
                onSubmit={sendReply}
                className="bg-white border-t border-slate-200 p-4 flex-shrink-0"
              >
                <div className="flex items-end gap-2">
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors flex-shrink-0"
                    title="Attach file"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>

                  <div className="flex-1 relative">
                    <textarea
                      value={replyInput}
                      onChange={(e) => {
                        setReplyInput(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendReply(e);
                        }
                      }}
                      placeholder="Type your message... (Shift+Enter for new line)"
                      rows={1}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none max-h-[120px]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!replyInput.trim() || sending}
                    className="w-10 h-10 sm:w-auto sm:px-4 sm:py-3 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 flex-shrink-0"
                  >
                    {sending ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span className="hidden sm:inline">Send</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Press Enter to send • Shift+Enter for new line
                </p>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-slate-50">
              <div className="text-center px-4">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <MessageSquare className="w-10 h-10 text-sky-600" />
                </div>
                <p className="text-lg font-semibold text-slate-700 mb-2">
                  No conversation selected
                </p>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Choose a conversation from the list to start chatting with customers
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
