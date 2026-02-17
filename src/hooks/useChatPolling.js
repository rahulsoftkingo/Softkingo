'use client';

import { useEffect, useRef, useState } from 'react';

export const useChatPolling = (conversationId, isEnabled = true, interval = 10000) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const pollingIntervalRef = useRef(null);
  const lastMessageCountRef = useRef(0);
  const visibilityChangeRef = useRef(null);

  const fetchMessages = async () => {
    if (!conversationId || !isEnabled) return;
    
    // Avoid multiple simultaneous requests
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      const res = await fetch(`/api/chat/conversation?id=${conversationId}`);
      
      if (!res.ok) return;
      
      const data = await res.json();
      const serverMessages = data.conversation?.messages || [];
      
      // Only update if messages changed and count is different
      if (serverMessages.length !== lastMessageCountRef.current) {
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

        setMessages(formattedMessages);
        lastMessageCountRef.current = serverMessages.length;
        
        // Save to localStorage
        localStorage.setItem('chatConversation', JSON.stringify({
          id: conversationId,
          messages: formattedMessages,
          visitorInfo: JSON.parse(localStorage.getItem('chatVisitorInfo') || '{}')
        }));
      }
    } catch (error) {
      console.error('Chat polling error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }
    
    if (conversationId && isEnabled) {
      fetchMessages(); // Initial fetch
      pollingIntervalRef.current = setInterval(fetchMessages, interval);
    }
  };

  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  // Handle visibility change to reduce polling when tab is not visible
  const handleVisibilityChange = () => {
    if (document.hidden) {
      stopPolling();
    } else {
      startPolling();
    }
  };

  useEffect(() => {
    if (conversationId && isEnabled) {
      startPolling();
      
      // Add visibility change listener
      visibilityChangeRef.current = handleVisibilityChange;
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      return () => {
        stopPolling();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    } else {
      stopPolling();
    }
  }, [conversationId, isEnabled, interval]);

  return {
    messages,
    isLoading,
    refetch: fetchMessages,
    startPolling,
    stopPolling
  };
};
