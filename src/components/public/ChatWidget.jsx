


'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [visitorInfo, setVisitorInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [showInfoForm, setShowInfoForm] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [agentTyping, setAgentTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const pollingIntervalRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const unread = messages.filter(m => (m.sender === 'bot' || m.sender === 'agent') && !m.isRead).length;
      setUnreadCount(unread);
    } else {
      setUnreadCount(0);
    }
  }, [isOpen, messages]);

  // Load conversation from localStorage
  useEffect(() => {
    const savedConversation = localStorage.getItem('chatConversation');
    if (savedConversation) {
      const data = JSON.parse(savedConversation);
      setConversationId(data.id);
      setMessages(data.messages || []);
      setVisitorInfo(data.visitorInfo || {});
      setShowInfoForm(false);
    }
  }, []);

  // Real-time polling for new messages
  useEffect(() => {
    if (!conversationId || showInfoForm) return;

    const pollMessages = async () => {
      try {
        const res = await fetch(`/api/chat/conversation?id=${conversationId}`);
        if (!res.ok) return;
        
        const data = await res.json();
        const serverMessages = data.conversation.messages || [];
        
        // Convert server messages to widget format
        const formattedMessages = serverMessages.map(msg => ({
          id: msg.id,
          content: msg.content,
          sender: msg.sender,
          senderName: msg.senderName,
          type: msg.type || 'text',
          fileUrl: msg.fileUrl,
          fileName: msg.fileName,
          timestamp: new Date(msg.createdAt),
          isRead: msg.isRead,
        }));

        // Only update if messages changed
        if (JSON.stringify(formattedMessages) !== JSON.stringify(messages)) {
          setMessages(formattedMessages);
          saveConversation(conversationId, formattedMessages, visitorInfo);
          
          // Mark new messages as read if chat is open
          if (isOpen) {
            markMessagesAsRead();
          }
        }
      } catch (error) {
        console.error('Poll messages error:', error);
      }
    };

    // Poll every 3 seconds
    pollMessages();
    pollingIntervalRef.current = setInterval(pollMessages, 3000);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [conversationId, showInfoForm, isOpen]);

  const markMessagesAsRead = async () => {
    if (!conversationId) return;
    
    try {
      await fetch('/api/chat/message', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId }),
      });
    } catch (error) {
      console.error('Mark read error:', error);
    }
  };

  const saveConversation = (convId, msgs, info) => {
    localStorage.setItem('chatConversation', JSON.stringify({
      id: convId,
      messages: msgs,
      visitorInfo: info,
    }));
  };

  const startConversation = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/chat/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorInfo),
      });

      if (!res.ok) throw new Error('Failed to start conversation');

      const data = await res.json();
      setConversationId(data.conversationId);
      
      const welcomeMsg = {
        id: Date.now(),
        content: `Hi ${visitorInfo.name}! 👋 How can I help you today?`,
        sender: 'bot',
        type: 'text',
        timestamp: new Date(),
        isRead: false,
      };
      
      setMessages([welcomeMsg]);
      setShowInfoForm(false);
      saveConversation(data.conversationId, [welcomeMsg], visitorInfo);
    } catch (error) {
      console.error('Start conversation error:', error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
  };

  const uploadFile = async () => {
    if (!selectedFile) return null;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('conversationId', conversationId);

    try {
      const res = await fetch('/api/chat/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() && !selectedFile) return;

    let fileUrl = null;
    let fileName = null;

    if (selectedFile) {
      fileUrl = await uploadFile();
      fileName = selectedFile.name;
    }

    const userMessage = {
      id: Date.now(),
      content: input || `Sent file: ${fileName}`,
      sender: 'user',
      type: selectedFile ? 'file' : 'text',
      fileUrl,
      fileName,
      timestamp: new Date(),
      isRead: true,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setSelectedFile(null);
    setIsTyping(true);

    // Save to database
    try {
      await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          content: userMessage.content,
          sender: 'user',
          type: userMessage.type,
          fileUrl,
          fileName,
        }),
      });

      saveConversation(conversationId, newMessages, visitorInfo);
    } catch (error) {
      console.error('Send message error:', error);
    }

    // Get AI response
    setTimeout(async () => {
      try {
        const res = await fetch('/api/chat/response', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: input,
            conversationId,
            history: messages.slice(-5).map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.content,
            })),
          }),
        });

        const data = await res.json();
        
        const botResponse = {
          id: Date.now() + 1,
          content: data.response,
          sender: 'bot',
          type: 'text',
          timestamp: new Date(),
          isRead: false,
        };

        const updatedMessages = [...newMessages, botResponse];
        setMessages(updatedMessages);
        saveConversation(conversationId, updatedMessages, visitorInfo);
      } catch (error) {
        console.error('Get response error:', error);
      } finally {
        setIsTyping(false);
      }
    }, 1500);
  };

  const handleTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    fetch('/api/chat/typing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId, isTyping: true }),
    });

    typingTimeoutRef.current = setTimeout(() => {
      fetch('/api/chat/typing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, isTyping: false }),
      });
    }, 3000);
  };

  const endChat = async () => {
    if (window.confirm('Are you sure you want to end this chat?')) {
      try {
        await fetch('/api/chat/conversation', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversationId,
            status: 'closed',
          }),
        });

        localStorage.removeItem('chatConversation');
        setMessages([]);
        setConversationId(null);
        setShowInfoForm(true);
        setIsOpen(false);
      } catch (error) {
        console.error('End chat error:', error);
      }
    }
  };

  // const quickReplies = [
  //   { text: 'View Services', value: 'I want to know about your services' },
  //   { text: 'Get Quote', value: 'I need a quote for my project' },
  //   { text: 'Contact Info', value: 'How can I contact you?' },
  //   { text: 'Portfolio', value: 'Show me your previous work' },
  // ];
  const quickReplies = [
  { text: 'View Services', value: 'VIEW_SERVICES' },
  { text: 'Get Quote', value: 'GET_QUOTE' },
  { text: 'Contact Info', value: 'CONTACT_INFO' },
  { text: 'Portfolio', value: 'VIEW_PORTFOLIO' },
];


  const emojis = ['😊', '👍', '❤️', '🎉', '🔥', '💯', '✅', '❌', '🤔', '👋'];

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-22 lg:bottom-18 right-6 z-50 group"
          aria-label="Open chat"
        >
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-sky-500 animate-ping opacity-75"></span>
            <div className="relative w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-700 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4  bg-rose-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold shadow-lg">
                {unreadCount}
              </span>
            )}
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-12 md:bottom-6 right-6 z-50 w-[320px] md:w-[400px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[600px]'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  {/* <span className="text-2xl"></span> */}
                  <img src='/images/logo.png' />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-sky-700"></span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Support Assistant</h3>
                <div className="flex items-center gap-1.5 text-xs text-sky-100">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  {agentTyping ? 'Support is typing...' : 'Online'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 rounded-lg hover:bg-sky-800 transition-colors flex items-center justify-center"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMinimized ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-sky-800 transition-colors flex items-center justify-center"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Info Form */}
              {showInfoForm ? (
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                  <div className="max-w-sm mx-auto">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-3xl">👋</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">Welcome!</h3>
                      <p className="text-sm text-slate-600 mt-1">Let's get started. Tell us about yourself.</p>
                    </div>

                    <form onSubmit={startConversation} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={visitorInfo.name}
                          onChange={(e) => setVisitorInfo({ ...visitorInfo, name: e.target.value })}
                          required
                          placeholder="John Doe"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={visitorInfo.email}
                          onChange={(e) => setVisitorInfo({ ...visitorInfo, email: e.target.value })}
                          required
                          placeholder="john@example.com"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={visitorInfo.phone}
                          onChange={(e) => setVisitorInfo({ ...visitorInfo, phone: e.target.value })}
                          placeholder="+91 1234567890"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-lg"
                      >
                        Start Chat
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <>
                  {/* Messages - Rest of the component remains same */}
                  <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                            msg.sender === 'user'
                              ? 'bg-sky-600 text-white rounded-br-sm'
                              : msg.sender === 'agent'
                              ? 'bg-emerald-600 text-white rounded-bl-sm'
                              : 'bg-white text-slate-800 shadow-sm rounded-bl-sm'
                          }`}
                        >
                          {msg.senderName && msg.sender === 'agent' && (
                            <p className="text-xs opacity-90 mb-1 font-semibold">
                              {msg.senderName}
                            </p>
                          )}
                          {msg.type === 'file' && msg.fileUrl && (
                            <div className="mb-2">
                              {msg.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                <img src={msg.fileUrl} alt={msg.fileName} className="max-w-full rounded-lg mb-1" />
                              ) : (
                                <a
                                  href={msg.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 p-2 bg-slate-100 rounded-lg hover:bg-slate-200"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  <span className="text-xs">{msg.fileName}</span>
                                </a>
                              )}
                            </div>
                          )}
                          <p className="text-sm whitespace-pre-line">{msg.content}</p>
                          <span className={`text-xs mt-1 block ${
                            msg.sender === 'user' || msg.sender === 'agent' ? 'opacity-75' : 'text-slate-400'
                          }`}>
                            {new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Replies */}
                  {messages.length <= 2 && (
                    <div className="px-4 py-2 bg-white border-t border-slate-200">
                      <p className="text-xs text-slate-500 mb-2">Quick replies:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickReplies.map((reply, idx) => (
                          <button
                            key={idx}
                            onClick={() => setInput(reply.value)}
                            className="px-3 py-1.5 text-xs font-medium text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-full transition-colors"
                          >
                            {reply.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* File Preview */}
                  {selectedFile && (
                    <div className="px-4 py-2 bg-amber-50 border-t border-amber-200">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          <span className="text-xs text-amber-900 truncate">{selectedFile.name}</span>
                        </div>
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="text-amber-600 hover:text-amber-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Emoji Picker */}
                  {showEmojiPicker && (
                    <div className="px-4 py-2 bg-white border-t border-slate-200">
                      <div className="flex flex-wrap gap-2">
                        {emojis.map((emoji, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setInput(input + emoji);
                              setShowEmojiPicker(false);
                            }}
                            className="w-8 h-8 hover:bg-slate-100 rounded-lg transition-colors text-lg"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <form onSubmit={sendMessage} className="p-4 bg-white border-t border-slate-200">
                    <div className="flex items-end gap-2">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-9 h-9  items-center justify-center text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors hidden flex"
                          title="Attach file"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileSelect}
                          className="hidden"
                          accept="image/*,.pdf,.doc,.docx"
                        />
                        <button
                          type="button"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                          title="Add emoji"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                          handleTyping();
                        }}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2.5 bg-slate-100 rounded-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      <button
                        type="submit"
                        disabled={!input.trim() && !selectedFile}
                        className="w-10 h-10 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors shadow-lg flex-shrink-0"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      {/* <p className="text-xs text-slate-400">
                        Powered by AI Assistant
                      </p> */}
                      <button
                        type="button"
                        onClick={endChat}
                        className="text-xs text-rose-500 hover:text-rose-600 font-medium"
                      >
                        End Chat
                      </button>
                    </div>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
