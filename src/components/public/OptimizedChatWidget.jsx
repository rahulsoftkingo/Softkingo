'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { io } from 'socket.io-client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ImagePlus, X, Send, Paperclip, Loader2 } from 'lucide-react';

export default function OptimizedChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [visitorInfo, setVisitorInfo] = useState({ name: '', email: '' });
  const [conversationId, setConversationId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [attachedImage, setAttachedImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const socketRef = useRef(null);
  const scrollRef = useRef(null);

  // Initialize Socket.io
  useEffect(() => {
    // Only initialize socket in browser
    if (typeof window !== 'undefined') {
      socketRef.current = io({
        transports: ['websocket']
      });

      socketRef.current.on('connect', () => {
        console.log('Socket connected');
        // We handle room joining in a separate effect that watches conversationId
      });

      socketRef.current.on('receive-message', (message) => {
        setMessages((prev) => {
          // Prevent duplicates if the message was added locally
          if (message.sender === 'visitor' && prev.some(m => m.content === message.content && Math.abs(new Date(m.timestamp) - new Date(message.timestamp)) < 2000)) {
            return prev;
          }
          return [...prev, {
            ...message,
            id: Date.now() + Math.random(),
            timestamp: new Date(message.timestamp)
          }];
        });
        setIsTyping(false);
      });

      socketRef.current.on('error', (err) => {
        console.error('Socket error:', err);
        setIsTyping(false);
      });
    }

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  // Room Joining Logic (Handles refreshes and id changes)
  useEffect(() => {
    if (socketRef.current && conversationId) {
      socketRef.current.emit('join-conversation', conversationId);
      console.log('Joined room:', conversationId);
    }
  }, [conversationId, socketRef.current]);

  // Load saved conversation and messages
  useEffect(() => {
    const savedConversation = localStorage.getItem('chatConversation');
    const savedVisitorInfo = localStorage.getItem('chatVisitorInfo');

    if (savedConversation) {
      const data = JSON.parse(savedConversation);
      setConversationId(data.conversationId || data.id);
      fetchMessages(data.conversationId || data.id);
    } else {
      setShowInfoForm(true);
    }

    if (savedVisitorInfo) {
      setVisitorInfo(JSON.parse(savedVisitorInfo));
    }
  }, []);

  const fetchMessages = async (id) => {
    try {
      const res = await fetch(`/api/chat/message?conversationId=${id}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.map(m => ({
          ...m,
          timestamp: new Date(m.createdAt)
        })));
      }
    } catch (error) {
      console.error('Fetch messages error:', error);
    }
  };

  const createConversation = async () => {
    if (!visitorInfo.name || !visitorInfo.email) return;

    try {
      const res = await fetch('/api/chat/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorInfo),
      });

      if (res.ok) {
        const data = await res.json();
        setConversationId(data.conversationId);
        setShowInfoForm(false);
        localStorage.setItem('chatConversation', JSON.stringify(data));
        localStorage.setItem('chatVisitorInfo', JSON.stringify(visitorInfo));

        if (data.resumed) {
          fetchMessages(data.conversationId);
        } else {
          setMessages([]);
        }

        if (socketRef.current) {
          socketRef.current.emit('join-conversation', data.conversationId);
        }
      }
    } catch (error) {
      console.error('Create conversation error:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage({
          base64: reader.result,
          mimeType: file.type,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetChat = async () => {
    if (window.confirm('Are you sure you want to end this chat and start a new one?')) {
      // 1. If we have a conversationId, mark it as closed on the server
      if (conversationId) {
        try {
          await fetch('/api/chat/conversation', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ conversationId, status: 'closed' }),
          });
        } catch (e) {
          console.error('Failed to close conversation:', e);
        }
      }

      // 2. Clear local storage
      localStorage.removeItem('chatConversation');
      // We keep visitorInfo (name/email) for convenience, 
      // but clear conversation specific data.
      
      // 3. Reset state
      setConversationId(null);
      setMessages([]);
      setShowInfoForm(true);
      
      // 4. Leave the old room
      if (socketRef.current && conversationId) {
        socketRef.current.emit('leave-conversation', conversationId);
      }
    }
  };

  const sendMessage = async () => {
    if ((!newMessage.trim() && !attachedImage) || !conversationId) return;

    const messageData = {
      conversationId,
      message: newMessage.trim(),
      image: attachedImage,
      sender: 'visitor'
    };

    // Add user message locally immediately
    const localMsg = {
      id: Date.now(),
      content: newMessage.trim(),
      sender: 'visitor',
      timestamp: new Date(),
      image: attachedImage ? attachedImage.base64 : null
    };

    setMessages(prev => [...prev, localMsg]);
    setNewMessage('');
    setAttachedImage(null);
    setIsTyping(true);

    // Save to DB via standard API first (to keep history)
    try {
      await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          content: localMsg.content,
          sender: 'visitor',
          type: attachedImage ? 'image' : 'text',
          fileUrl: attachedImage ? attachedImage.name : null
        }),
      });
    } catch (e) {
      console.error('Failed to save to DB:', e);
    }

    // Send via socket for AI response
    if (socketRef.current) {
      socketRef.current.emit('send-message', {
        ...messageData,
        visitorName: visitorInfo.name
      });
    }
  };

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  return (
    <div className="fixed bottom-[100px] lg:bottom-4 right-4 z-50 font-sans">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-sky-600 hover:bg-sky-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
        >
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white"></span>
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-medium">Chat with us</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[380px] h-[600px] flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white p-5 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-100 overflow-hidden">
                  <Image src="/images/logo.png" alt="Softkingo" width={32} height={32} className="object-contain" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-sky-700"></div>
              </div>
              <div>
                <span className="font-bold text-sm block">Softkingo AI Assistance</span>
                <span className="text-[10px] text-sky-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  AI Support Online
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetChat}
                title="New Chat"
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <div className="flex flex-col items-center">
                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                   </svg>
                </div>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 custom-scrollbar">
            {showInfoForm ? (
              <div className="space-y-5 p-2 py-4 animate-in fade-in duration-500">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-bold text-slate-800">Hi there! 👋</h3>
                  <p className="text-sm text-slate-500">How can we help you today? Please introduce yourself.</p>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition-all shadow-sm"
                      value={visitorInfo.name}
                      onChange={(e) => setVisitorInfo({ ...visitorInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 ml-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. john@example.com"
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition-all shadow-sm"
                      value={visitorInfo.email}
                      onChange={(e) => setVisitorInfo({ ...visitorInfo, email: e.target.value })}
                    />
                  </div>
                </div>
                <button
                  onClick={createConversation}
                  disabled={!visitorInfo.name || !visitorInfo.email}
                  className="w-full bg-sky-600 text-white p-3.5 rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg hover:shadow-sky-200 disabled:opacity-50 active:scale-[0.98]"
                >
                  Start Conversation
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-6">
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-3 py-1 rounded-full font-medium uppercase tracking-wider">
                    Today
                  </span>
                </div>

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'visitor' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div
                      className={`max-w-[85%] space-y-1 ${message.sender === 'visitor' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`p-3.5 rounded-2xl shadow-sm text-sm ${message.sender === 'visitor'
                          ? 'bg-sky-600 text-white rounded-tr-none'
                          : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                          }`}
                      >
                        {message.image && (
                          <div className="mb-2 rounded-lg overflow-hidden border border-white/20">
                            <img src={message.image} alt="attached" className="max-w-full h-auto" />
                          </div>
                        )}
                        <div className={`prose prose-sm max-w-none ${message.sender === 'visitor' ? 'prose-invert' : 'prose-slate'}`}>
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start animate-pulse">
                    <div className="bg-white border border-slate-100 p-3.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Message Input */}
          {!showInfoForm && (
            <div className="p-4 bg-white border-t border-slate-100 space-y-3">
              {attachedImage && (
                <div className="relative inline-block animate-in zoom-in duration-200">
                  <div className="h-16 w-16 rounded-xl border border-sky-100 overflow-hidden shadow-md">
                    <img src={attachedImage.base64} alt="preview" className="object-cover h-full w-full" />
                  </div>
                  <button
                    onClick={() => setAttachedImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg border-2 border-white hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 transition-all focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-50 shadow-inner">
                <label className="p-2 hover:bg-slate-200 rounded-full transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <ImagePlus className="w-5 h-5 text-slate-500 group-hover:text-sky-600" />
                </label>

                <textarea
                  rows="1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask something..."
                  className="flex-1 bg-transparent border-none focus:ring-0 outline-none p-2 text-sm resize-none custom-scrollbar max-h-32 text-slate-700"
                ></textarea>

                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() && !attachedImage}
                  className="bg-sky-600 text-white p-2.5 rounded-xl hover:bg-sky-700 disabled:opacity-30 transition-all shadow-md active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-center text-slate-400 font-medium uppercase tracking-tighter">
                Powered by Softkingo AI Assistant
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
