'use client'

import React, { useState, useEffect, useRef } from 'react'
import { X, MessageCircle, Send, Bot } from 'lucide-react'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  showActions?: boolean // New property for showing action buttons
}

interface ChatBotProps {
  isHomepage?: boolean
}

export default function HomePageChatBot({ isHomepage = true }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversationSummary, setConversationSummary] = useState('')
  const [lastActivity, setLastActivity] = useState(Date.now())
  const [userName, setUserName] = useState('')
  const [hasAskedName, setHasAskedName] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Session expiry (10 minutes)
  useEffect(() => {
    const checkExpiry = setInterval(() => {
      if (Date.now() - lastActivity > 10 * 60 * 1000) {
        setMessages([])
        setConversationSummary('')
        setLastActivity(Date.now())
      }
    }, 60000) // Check every minute

    return () => clearInterval(checkExpiry)
  }, [lastActivity])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: '1',
        text: '👋 Hello! I am your Prospectify assistant. How are you doing today? What\'s your name?',
        isBot: true,
        timestamp: new Date(),
        showActions: false
      }])
    }
  }, [isOpen, messages.length])

  const quickActions = [
    { label: '📄 About Prospectify', value: 'about' },
    { label: '🚀 See Features', value: 'features' },
    { label: '📅 Book Demo', value: 'demo' },
    { label: '💰 Click Here for Pricing', value: 'pricing' },
    { label: '📞 Contact Us', value: 'contact' },
  ]

  const followUpActions = [
    { label: '🚀 See Features', value: 'features' },
    { label: '📅 Book Demo', value: 'demo' },
    { label: '💰 Click Here for Pricing', value: 'pricing' },
    { label: '📞 Contact Us', value: 'contact' },
    { label: '❓ Ask Something Else', value: 'other' },
  ]

  const handleQuickAction = async (action: string) => {
    if (action === 'other') {
      // Just show message that they can type anything
      const botMessage: Message = {
        id: Date.now().toString(),
        text: `Feel free to type any question, ${userName}! I'm here to help you.`,
        isBot: true,
        timestamp: new Date(),
        showActions: false
      }
      setMessages(prev => [...prev, botMessage])
      return
    }

    // Handle navigation actions
    if (action === 'pricing') {
      // Add user message first
      const userMessage: Message = {
        id: Date.now().toString(),
        text: 'Click here for pricing',
        isBot: false,
        timestamp: new Date()
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Great choice, ${userName}! I'm opening our pricing page for you. You'll find all our flexible plans there! 💰`,
        isBot: true,
        timestamp: new Date(),
        showActions: true
      }
      
      setMessages(prev => [...prev, userMessage, botMessage])
      
      // Navigate to pricing page
      setTimeout(() => {
        window.open('/pricing', '_blank')
      }, 1000)
      return
    }

    if (action === 'features') {
      // Add user message first
      const userMessage: Message = {
        id: Date.now().toString(),
        text: 'See features',
        isBot: false,
        timestamp: new Date()
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Perfect, ${userName}! Let me show you our amazing features. 🚀`,
        isBot: true,
        timestamp: new Date(),
        showActions: true
      }
      
      setMessages(prev => [...prev, userMessage, botMessage])
      
      // Scroll to features section on current page
      setTimeout(() => {
        const featuresSection = document.querySelector('#features')
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 1000)
      return
    }

    if (action === 'demo') {
      // Add user message first
      const userMessage: Message = {
        id: Date.now().toString(),
        text: 'Book demo',
        isBot: false,
        timestamp: new Date()
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Excellent, ${userName}! I'm taking you to our signup page to book your demo. 📅`,
        isBot: true,
        timestamp: new Date(),
        showActions: true
      }
      
      setMessages(prev => [...prev, userMessage, botMessage])
      
      // Navigate to signup page
      setTimeout(() => {
        window.open('/signup', '_blank')
      }, 1000)
      return
    }

    // For 'about' and 'contact', use API
    const actionMessages = {
      about: 'Tell me about Prospectify',
      contact: 'How can I contact you?'
    }

    const userMessage = actionMessages[action as keyof typeof actionMessages]
    if (userMessage) {
      await sendMessage(userMessage)
    }
  }

  const sendMessage = async (messageText: string = inputMessage) => {
    if (!messageText.trim()) return

    setLastActivity(Date.now())
    
    // Trim input to 300 characters
    const trimmedMessage = messageText.slice(0, 300)
    
    // Check if this is a name input (first interaction after greeting)
    if (!hasAskedName && !userName && messages.length === 1) {
      setUserName(trimmedMessage)
      setHasAskedName(true)
      
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: trimmedMessage,
        isBot: false,
        timestamp: new Date()
      }
      
      // Add bot welcome message with name
      const welcomeMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Nice to meet you, ${trimmedMessage}! 😊 I hope you're having a wonderful day. How can I help you learn about Prospectify today?`,
        isBot: true,
        timestamp: new Date(),
        showActions: true
      }
      
      setMessages(prev => [...prev, userMessage, welcomeMessage])
      setInputMessage('')
      return
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedMessage,
      isBot: false,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Summarize context if conversation is long
      let summary = conversationSummary
      if (messages.length > 6) {
        summary = `Previous: User asked about ${messages.slice(-3).map(m => m.isBot ? 'bot replied' : m.text.slice(0, 20)).join(', ')}`
        setConversationSummary(summary)
      }

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedMessage,
          isHomepage: true,
          includeDataContext: false, // Don't include heavy data context for homepage
          conversationSummary: summary,
          userName: userName // Send user name to API
        })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isBot: true,
        timestamp: new Date(),
        showActions: true // Show follow-up actions after each response
      }
      
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again or contact us directly.',
        isBot: true,
        timestamp: new Date(),
        showActions: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage()
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <div className="relative">
          {/* Floating pulse effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping opacity-75"></div>
          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110"
            aria-label="Open chat"
          >
            <MessageCircle size={28} />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
              💬
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-96 h-[500px] flex flex-col overflow-hidden transform transition-all duration-500 ease-out animate-in slide-in-from-bottom-5 zoom-in-95">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between relative overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Bot className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Prospectify Assistant</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-sm opacity-90">Online & Ready to Help!</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:rotate-90 relative z-10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message, index) => (
              <div key={message.id}>
                <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow-md ${
                      message.isBot
                        ? 'bg-white text-gray-800 border border-gray-100'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    }`}
                  >
                    {message.isBot && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Bot size={14} className="text-blue-600" />
                        <span className="text-xs font-medium text-blue-600">Assistant</span>
                      </div>
                    )}
                    {message.text}
                  </div>
                </div>
                
                {/* Show action buttons after bot messages */}
                {message.isBot && message.showActions && (
                  <div className="mt-3 space-y-2">
                    {(hasAskedName && userName ? followUpActions : quickActions).map((action) => (
                      <button
                        key={action.value}
                        onClick={() => handleQuickAction(action.value)}
                        className="w-full text-left px-4 py-3 text-sm bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 rounded-xl transition-all duration-200 border border-blue-100 hover:border-blue-200 hover:shadow-md"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Quick Actions (only show initially before name is provided) */}
            {messages.length === 1 && !hasAskedName && (
              <div className="space-y-2">
                <div className="text-xs text-gray-500 text-center mb-2 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                  👆 Please tell me your name first!
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl text-sm shadow-md border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Bot size={14} className="text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">Assistant is typing</span>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-100 p-4 bg-white">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value.slice(0, 300))} // Limit input
                placeholder={
                  !hasAskedName 
                    ? "Please enter your name..." 
                    : userName 
                      ? "Type your message..."
                      : "Ask me anything about Prospectify..."
                }
                className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-full p-3 transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full">{inputMessage.length}/300 characters</span>
              {userName && (
                <button
                  type="button"
                  onClick={() => {
                    setMessages([])
                    setUserName('')
                    setHasAskedName(false)
                    setConversationSummary('')
                  }}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  🔄 Start new chat
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
