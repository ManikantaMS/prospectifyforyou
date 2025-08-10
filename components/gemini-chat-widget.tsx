'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface GeminiChatWidgetProps {
  className?: string;
}

export default function GeminiChatWidget({ className = '' }: GeminiChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        text: 'Hi! 👋 I\'m your AI assistant for Prospectify. I can help you find the best European cities for your business, discover events, analyze demographics, and create marketing campaigns. What would you like to know?',
        isBot: true,
        timestamp: new Date(),
      }]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    const typingMessage: ChatMessage = {
      id: `typing-${Date.now()}`,
      text: 'Thinking...',
      isBot: true,
      timestamp: new Date(),
      isTyping: true,
    };

    setMessages(prev => [...prev, userMessage, typingMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage.trim(),
          includeDataContext: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const botResponse: ChatMessage = {
        id: Date.now().toString(),
        text: data.response,
        isBot: true,
        timestamp: new Date(),
      };

      // Remove typing message and add bot response
      setMessages(prev => prev.filter(msg => !msg.isTyping).concat(botResponse));

    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error. Please try again or check if your Gemini API key is configured correctly.',
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => prev.filter(msg => !msg.isTyping).concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      text: 'Hi! 👋 I\'m your AI assistant for Prospectify. I can help you find the best European cities for your business, discover events, analyze demographics, and create marketing campaigns. What would you like to know?',
      isBot: true,
      timestamp: new Date(),
    }]);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-96 h-[500px] flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <span className="font-semibold">Prospectify AI Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="text-blue-100 hover:text-white text-sm px-2 py-1 rounded"
                title="Clear chat"
              >
                Clear
              </button>
              <button
                onClick={toggleChat}
                className="text-blue-100 hover:text-white"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot && (
                      <Bot size={16} className="mt-0.5 flex-shrink-0" />
                    )}
                    {!message.isBot && (
                      <User size={16} className="mt-0.5 flex-shrink-0 text-blue-100" />
                    )}
                    <div className="flex-1">
                      {message.isTyping ? (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about cities, demographics, events..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Powered by Gemini AI with live European demographic data
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
