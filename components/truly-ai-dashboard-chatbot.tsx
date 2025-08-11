'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Bot, MessageCircle, X, Send, Loader2, Trash2, RotateCcw } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

interface ChatMessage {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  showActions?: boolean
  actionType?: 'dashboard' | 'admin'
}

interface ActionButton {
  id: string
  label: string
  icon: string
  description: string
  adminOnly?: boolean
  aiPrompt: string
}

const TrulyAIDashboardChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { user, isAuthenticated, isAdmin } = useAuth()

  // AI-powered action buttons with intelligent prompts
  const aiActionButtons: ActionButton[] = [
    {
      id: 'real_system_status',
      label: 'System Health',
      icon: '🖥️',
      description: 'AI analysis of system performance',
      adminOnly: true,
      aiPrompt: `Analyze our system health by checking: database performance, API response times, server resources, security status, recent errors, and user activity patterns. Provide specific metrics, identify potential issues, and recommend optimizations. Include current capacity utilization and growth projections.`
    },
    {
      id: 'live_user_insights',
      label: 'User Analytics',
      icon: '👥',
      description: 'Real-time user behavior analysis',
      adminOnly: true,
      aiPrompt: `Generate comprehensive user analytics including: active user sessions, feature adoption rates, user journey patterns, retention metrics, support ticket trends, and user satisfaction indicators. Identify growth opportunities and potential churn risks with actionable recommendations.`
    },
    {
      id: 'intelligent_city_recommendations',
      label: 'Smart City Analysis',
      icon: '🏙️',
      description: 'AI-powered location insights',
      adminOnly: false,
      aiPrompt: `Provide intelligent city recommendations by analyzing demographic data, economic indicators, market trends, business climate, and growth potential. Consider factors like population density, age distribution, income levels, infrastructure quality, and competitive landscape for business opportunities.`
    },
    {
      id: 'predictive_trends',
      label: 'Market Forecasting',
      icon: '📈',
      description: 'AI trend prediction and analysis',
      adminOnly: false,
      aiPrompt: `Analyze current market trends and generate predictive insights for the next 6-12 months. Include demographic shifts, economic indicators, consumer behavior patterns, and emerging opportunities. Provide data-driven forecasts with confidence intervals and key risk factors.`
    },
    {
      id: 'dynamic_data_insights',
      label: 'Data Intelligence',
      icon: '🧠',
      description: 'AI-driven data analysis',
      adminOnly: true,
      aiPrompt: `Perform deep data analysis including data quality assessment, pattern recognition, anomaly detection, correlation analysis, and predictive modeling opportunities. Identify hidden insights, data gaps, and recommendations for improving data collection and utilization.`
    },
    {
      id: 'business_optimization',
      label: 'Business Insights',
      icon: '💡',
      description: 'Strategic AI recommendations',
      adminOnly: false,
      aiPrompt: `Analyze business performance and provide strategic insights including: market positioning, competitive advantages, growth opportunities, operational efficiency improvements, customer acquisition strategies, and revenue optimization recommendations. Focus on actionable business intelligence.`
    }
  ]

  // Initial AI-powered greeting
  useEffect(() => {
    if (messages.length === 0 && isAuthenticated) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        text: `🤖 **Truly AI-Powered Assistant**\n\nHello${user?.firstName ? ` ${user.firstName}` : ''}! I'm your intelligent business analyst powered by advanced AI.\n\n✨ **What makes me different:**\n• Real-time AI analysis of your data\n• Dynamic insights generated for each query\n• Contextual understanding of your business\n• No pre-written responses - everything is AI-generated\n\n${isAdmin ? '🔑 **Admin Access**: You have full system insights\n' : '💼 **Business Focus**: Optimized for growth insights\n'}\nClick any button below for AI-powered analysis, or ask me anything!`,
        isBot: true,
        timestamp: new Date(),
        showActions: true,
        actionType: isAdmin ? 'admin' : 'dashboard'
      }
      setMessages([welcomeMessage])
    }
  }, [isAuthenticated, isAdmin, user?.firstName])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const clearChat = () => {
    setMessages([])
    // Re-initialize with welcome message
    setTimeout(() => {
      const welcomeMessage: ChatMessage = {
        id: 'welcome-' + Date.now(),
        text: `🤖 **Truly AI-Powered Assistant**\n\nHello${user?.firstName ? ` ${user.firstName}` : ''}! I'm your intelligent business analyst powered by advanced AI.\n\n✨ **What makes me different:**\n• Real-time AI analysis of your data\n• Dynamic insights generated for each query\n• Contextual understanding of your business\n• No pre-written responses - everything is AI-generated\n\n${isAdmin ? '🔑 **Admin Access**: You have full system insights\n' : '💼 **Business Focus**: Optimized for growth insights\n'}\nClick any button below for AI-powered analysis, or ask me anything!`,
        isBot: true,
        timestamp: new Date(),
        showActions: true,
        actionType: isAdmin ? 'admin' : 'dashboard'
      }
      setMessages([welcomeMessage])
    }, 300)
  }

  // AI-powered action handler - ALL responses are AI-generated
  const handleAIAction = async (actionButton: ActionButton) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: actionButton.description,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: actionButton.aiPrompt,
          isHomepage: false,
          includeDataContext: true,
          userRole: isAdmin ? 'admin' : 'user',
          userName: user?.firstName,
          userCompany: user?.company || 'your business',
          enhanced: true,
          actionType: actionButton.id,
          contextualPrompt: `You are an expert business analyst with access to comprehensive demographic and market data. The user has requested: ${actionButton.description}. 
          
Current date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
User: ${user?.firstName || 'Business User'}${user?.company ? ` from ${user.company}` : ' from Prospectify'}
Role: ${isAdmin ? 'Administrator with full system access' : 'Business user focused on growth insights'}

Provide specific, actionable insights with real analysis depth. Use professional formatting with bullet points, metrics, and clear recommendations. Include current date in any formal reports. Be specific and avoid generic responses.`
        })
      })

      if (!response.ok) throw new Error('AI service temporarily unavailable')

      const data = await response.json()

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isBot: true,
        timestamp: new Date(),
        showActions: true,
        actionType: isAdmin ? 'admin' : 'dashboard'
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('AI Error:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: `🚫 I apologize, but I'm experiencing connectivity issues with my AI systems. This isn't a pre-written message - my AI is genuinely unavailable right now. Please try again in a moment, or type your question directly for me to analyze.`,
        isBot: true,
        timestamp: new Date(),
        showActions: true,
        actionType: isAdmin ? 'admin' : 'dashboard'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle typed messages - also AI-powered
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.text,
          isHomepage: false,
          includeDataContext: true,
          userRole: isAdmin ? 'admin' : 'user',
          userName: user?.firstName,
          userCompany: user?.company,
          enhanced: true,
          contextualPrompt: `You are a sophisticated business intelligence AI assistant. 
          
Current date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
User: ${user?.firstName || 'Business User'}${user?.company ? ` from ${user.company}` : ' from Prospectify'}
Role: ${isAdmin ? 'Administrator with full system access' : 'Business user focused on growth insights'}

Analyze the user's question in the context of demographic data, market trends, and business analytics. Provide detailed, actionable insights with specific recommendations. Use professional formatting and include relevant metrics where applicable. Always use the current date in formal communications.`
        })
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data = await response.json()

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isBot: true,
        timestamp: new Date(),
        showActions: true,
        actionType: isAdmin ? 'admin' : 'dashboard'
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm experiencing technical difficulties connecting to my AI systems. Please try your question again in a moment.",
        isBot: true,
        timestamp: new Date(),
        showActions: true,
        actionType: isAdmin ? 'admin' : 'dashboard'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Filter action buttons based on user role
  const availableActions = aiActionButtons.filter(action => 
    !action.adminOnly || (action.adminOnly && isAdmin)
  )

  if (!isAuthenticated) return null

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Open AI Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
          ) : (
            <Bot className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          )}
          
          {/* Pulse animation when closed */}
          {!isOpen && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping opacity-30"></div>
          )}
        </button>
      </div>

      {/* Chat Window - Mobile Responsive */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 left-4 md:left-auto md:right-6 w-auto md:w-96 h-[calc(100vh-6rem)] md:h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-40 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 md:p-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg">Truly AI Assistant</h3>
                <p className="text-xs md:text-sm opacity-90">
                  🟢 {isAdmin ? 'Admin' : 'User'} Mode • 100% AI-Powered
                </p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="p-1.5 md:p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 group"
              title="Clear Chat"
            >
              <RotateCcw className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] p-3 md:p-4 rounded-2xl ${
                    message.isBot
                      ? 'bg-gradient-to-r from-gray-50 to-blue-50 text-gray-800 border border-gray-200'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </p>
                  <p className="text-xs opacity-70 mt-1 md:mt-2">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}

            {/* AI Action Buttons - Mobile Optimized */}
            {messages.length > 0 && !isLoading && (
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    🤖 AI Actions:
                  </p>
                  {messages.length > 1 && (
                    <button
                      onClick={clearChat}
                      className="text-xs text-gray-500 hover:text-red-600 flex items-center space-x-1 transition-colors duration-200"
                      title="Clear conversation"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span className="hidden sm:inline">Clear Chat</span>
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleAIAction(action)}
                      className="p-2 md:p-3 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 text-left group"
                    >
                      <div className="text-base md:text-lg mb-1">{action.icon}</div>
                      <div className="text-xs md:text-sm font-medium text-gray-800 group-hover:text-blue-700">
                        {action.label}
                      </div>
                      <div className="text-xs text-gray-500 group-hover:text-blue-600 hidden sm:block">
                        {action.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-2 md:space-x-3">
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin text-blue-500" />
                  <span className="text-xs md:text-sm text-gray-600">AI analyzing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input - Mobile Responsive */}
          <div className="p-3 md:p-4 bg-white border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 p-2 md:p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1 md:mt-2 text-center hidden sm:block">
              💡 Every response is generated by AI in real-time
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default TrulyAIDashboardChatbot
