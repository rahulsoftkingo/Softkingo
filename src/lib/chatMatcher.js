// src/lib/chatMatcher.js
import { responsePatterns, genericFallbackResponse } from '@/data/chatPatterns';

export function getFallbackResponse(userMessage) {
  if (!userMessage || typeof userMessage !== 'string') return genericFallbackResponse;
  
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // High-priority exact or multi-word matches first
  for (const pattern of responsePatterns) {
    if (pattern.keywords.some(keyword => {
      const lowerKW = keyword.toLowerCase();
      // Use word boundary check or simple inclusion for resilience
      return lowerMessage.includes(lowerKW);
    })) {
      const responses = pattern.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  return genericFallbackResponse;
}
