'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useChatPolling } from '@/hooks/useChatPolling';

export default function OptimizedChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [visitorInfo, setVisitorInfo] = useState({});
  const [conversationId, setConversationId] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  // Load saved conversation on mount
  useEffect(() => {
    const savedConversation = localStorage.getItem('chatConversation');
    const savedVisitorInfo = localStorage.getItem('chatVisitorInfo');

    if (savedConversation) {
      const data = JSON.parse(savedConversation);
      setConversationId(data.id);
      setShowInfoForm(false);
    }

    if (savedVisitorInfo) {
      setVisitorInfo(JSON.parse(savedVisitorInfo));
    }
  }, []);

  // Use optimized polling hook
  const { messages, isLoading, refetch } = useChatPolling(
    conversationId,
    !showInfoForm && isOpen, // Only poll when chat is open and form is not shown
    15000 // Increased to 15 seconds
  );

  const createConversation = async () => {
    try {
      const res = await fetch('/api/chat/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorInfo),
      });

      if (res.ok) {
        const data = await res.json();
        setConversationId(data.id);
        setShowInfoForm(false);
        localStorage.setItem('chatVisitorInfo', JSON.stringify(visitorInfo));
      }
    } catch (error) {
      console.error('Create conversation error:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversationId) return;

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          content: newMessage.trim(),
          sender: 'visitor',
          type: 'text'
        }),
      });

      if (res.ok) {
        setNewMessage('');
        refetch(); // Refetch immediately after sending
      }
    } catch (error) {
      console.error('Send message error:', error);
    }
  };

  const markMessagesAsRead = async () => {
    if (!conversationId) return;

    try {
      await fetch('/api/chat/message', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId }),
      });
    } catch (error) {
      console.error('Mark as read error:', error);
    }
  };

  // Mark messages as read when chat opens
  useEffect(() => {
    if (isOpen && conversationId) {
      markMessagesAsRead();
    }
  }, [isOpen, conversationId]);

  return (
    <div className="fixed bottom-[100px] lg:bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-sky-600 hover:bg-sky-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-96 h-[600px] flex flex-col">
          {/* Header */}
          <div className="bg-sky-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold">Live Chat</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {showInfoForm ? (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Start a Conversation</h3>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border rounded-lg"
                  onChange={(e) => setVisitorInfo({ ...visitorInfo, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 border rounded-lg"
                  onChange={(e) => setVisitorInfo({ ...visitorInfo, email: e.target.value })}
                />
                <button
                  onClick={createConversation}
                  className="w-full bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Start Chat
                </button>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${message.sender === 'visitor'
                        ? 'bg-sky-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Message Input */}
          {!showInfoForm && (
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-sky-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
