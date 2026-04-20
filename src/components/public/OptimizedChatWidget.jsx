'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { io } from 'socket.io-client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ImagePlus, X, Send, Paperclip, Loader2 } from 'lucide-react';

export default function OptimizedChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(null); // 'name', 'phone', 'email', null (complete)
  const [visitorInfo, setVisitorInfo] = useState({ name: '', email: '', phone: '' });
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

        // Play sound if message is from admin/bot and not from self
        if (message.sender !== 'visitor') {
          playNotificationSound();
        }
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

    if (savedVisitorInfo) {
      setVisitorInfo(JSON.parse(savedVisitorInfo));
    }

    if (savedConversation) {
      const data = JSON.parse(savedConversation);
      setConversationId(data.conversationId || data.id);
      fetchMessages(data.conversationId || data.id);
      setOnboardingStep(null);
    } else {
      // If no conversation but we have info, we can skip onboarding but still need to create conversation
      // However, usually we start onboarding if no savedConversation exists.
      if (savedVisitorInfo) {
        // We have info, just create the conversation
        const info = JSON.parse(savedVisitorInfo);
        createConversation(info);
      } else {
        // Prepare onboarding step but don't add messages yet
        // They will be added with animation in the auto-open logic or manual click
        setOnboardingStep('name');
      }
    }
  }, []);

  const [greetingTriggered, setGreetingTriggered] = useState(false);

  // Auto-open logic after 10 seconds
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const chatTriggered = sessionStorage.getItem('chatAutoTriggered');
    if (chatTriggered) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem('chatAutoTriggered', 'true');
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Animated Greeting Observer: Triggers when chat opens for the first time
  useEffect(() => {
    if (isOpen && !greetingTriggered && messages.length === 0 && onboardingStep === 'name') {
      setGreetingTriggered(true);

      // Sequence: Short pause -> Typing -> Message + Sound -> Next Question
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage("Hii! Welcome to Softkingo. How can we help you today?");
          playNotificationSound();
          
          setTimeout(() => {
            addBotMessage("Before we start, could you please tell me your full name?");
          }, 1200);
        }, 1500);
      }, 600);
    }
  }, [isOpen, greetingTriggered, messages.length, onboardingStep]);

  const playNotificationSound = () => {
    try {
      // Using the local user-provided sound file
      const audioUrl = "/audio/live-chat.mp3";
      const audio = new Audio(audioUrl);
      audio.volume = 0.4;

      const startPlay = () => {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            console.log("Autoplay blocked. Sound will trigger on first user interaction.");
            
            const playOnInteraction = () => {
              audio.play().catch(() => {});
              window.removeEventListener('click', playOnInteraction);
              window.removeEventListener('touchstart', playOnInteraction);
            };
            window.addEventListener('click', playOnInteraction, { once: true });
            window.addEventListener('touchstart', playOnInteraction, { once: true });
          });
        }
      };

      startPlay();
    } catch (err) {
      console.error("Audio playback error:", err);
    }
  };

  const addBotMessage = (content) => {
    setMessages((prev) => [...prev, {
      id: Date.now() + Math.random(),
      content,
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

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

  const createConversation = async (info = null) => {
    const dataToUse = info || { name: visitorInfo.name || 'Guest', email: visitorInfo.email || 'guest@example.com' };

    try {
      const res = await fetch('/api/chat/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToUse),
      });

      if (res.ok) {
        const data = await res.json();
        setConversationId(data.conversationId);
        localStorage.setItem('chatConversation', JSON.stringify(data));

        if (info) {
          localStorage.setItem('chatVisitorInfo', JSON.stringify(info));
        }

        if (data.resumed) {
          fetchMessages(data.conversationId);
        }

        if (socketRef.current) {
          socketRef.current.emit('join-conversation', data.conversationId);
        }
        return data.conversationId;
      }
    } catch (error) {
      console.error('Create conversation error:', error);
    }
    return null;
  };

  const updateVisitorDetails = async (id, details) => {
    try {
      await fetch('/api/chat/conversation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: id, ...details }),
      });

      const newInfo = { ...visitorInfo, ...details };
      setVisitorInfo(newInfo);
      localStorage.setItem('chatVisitorInfo', JSON.stringify(newInfo));
    } catch (error) {
      console.error('Update visitor details error:', error);
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
      setOnboardingStep('name');
      addBotMessage("Chat has been reset. Let's start over! What is your full name?");

      // 4. Leave the old room
      if (socketRef.current && conversationId) {
        socketRef.current.emit('leave-conversation', conversationId);
      }
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() && !attachedImage) return;

    const content = newMessage.trim();

    // Add user message locally immediately
    const localMsg = {
      id: Date.now(),
      content: content,
      sender: 'visitor',
      timestamp: new Date(),
      image: attachedImage ? attachedImage.base64 : null
    };

    setMessages(prev => [...prev, localMsg]);
    setNewMessage('');
    setAttachedImage(null);

    // Handle Onboarding Steps
    if (onboardingStep) {
      handleOnboarding(content);
      return;
    }

    if (!conversationId) return;

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
        conversationId,
        message: content,
        image: attachedImage,
        sender: 'visitor',
        visitorName: visitorInfo.name
      });
    }
  };

  const handleOnboarding = async (content) => {
    const trimmed = content.trim();

    if (onboardingStep === 'name') {
      // Validate Name: Min 3 chars, letters only (roughly), not common short answers
      const isValid = trimmed.length >= 2 && /^[a-zA-Z\s.-]+$/.test(trimmed) && !['yes', 'no', 'ok', 'okay', 'hi', 'hello'].includes(trimmed.toLowerCase());

      if (!isValid) {
        addBotMessage("Please enter your actual full name so I can address you properly. 👋");
        return;
      }

      setVisitorInfo(prev => ({ ...prev, name: trimmed }));
      setOnboardingStep('phone');

      const id = await createConversation({ name: trimmed, email: 'guest@example.com' });

      setTimeout(() => {
        addBotMessage(`Nice to meet you, ${trimmed}! Could you please share your mobile number?`);
      }, 500);
    }
    else if (onboardingStep === 'phone') {
      // Validate Phone: At least 10 digits
      const digits = trimmed.replace(/\D/g, '');
      const isValid = digits.length >= 10;

      if (!isValid) {
        addBotMessage("That doesn't look like a valid mobile number. Please enter at least 10 digits (e.g., 9876543210).");
        return;
      }

      setVisitorInfo(prev => ({ ...prev, phone: trimmed }));
      setOnboardingStep('email');

      if (conversationId) {
        await updateVisitorDetails(conversationId, { phone: trimmed });
      }

      setTimeout(() => {
        addBotMessage("Great! And finally, what is your email address?");
      }, 500);
    }
    else if (onboardingStep === 'email') {
      // Validate Email: Standard pattern
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

      if (!isValid) {
        addBotMessage("Please enter a valid email address (e.g., name@example.com).");
        return;
      }

      setVisitorInfo(prev => ({ ...prev, email: trimmed }));
      setOnboardingStep(null);

      if (conversationId) {
        await updateVisitorDetails(conversationId, { email: trimmed });
      }

      setTimeout(() => {
        addBotMessage("Thank you! I've connected you to our AI Assistant. How can I help you today?");
      }, 500);
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
          className="bg-white hover:bg-sky-50 text-sky-600 rounded-full shadow-2xl hover:shadow-sky-200 transition-all duration-300 hover:scale-110 flex items-center group border-2 border-sky-500 overflow-hidden"
        >
          <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden flex-shrink-0 bg-white">
            <Image
              src="/images/bot.png"
              alt="Chat"
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
            <span className="absolute bottom-1 right-1 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:px-4 transition-all duration-500 ease-in-out whitespace-nowrap font-bold text-sky-700">
            Chat with AI
          </span>
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
                  <Image src="/images/bot.png" alt="Softkingo Bot" width={40} height={40} className="object-cover" />
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
                    {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
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
          </div>

          {/* Message Input */}
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
            <p className="text-[9px] text-center text-slate-400 font-medium uppercase ">
              Powered by Softkingo AI Assistant
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
