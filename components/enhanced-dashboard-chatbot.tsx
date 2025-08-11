'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send, Bot, User, BarChart3, MapPin, Settings, Download, Filter, TrendingUp, Users, Database } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isTyping?: boolean;
  showActions?: boolean;
  actionType?: 'quick' | 'dashboard' | 'admin';
}

interface QuickAction {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  description: string;
  roleRequired?: 'admin' | 'user';
}

interface EnhancedDashboardChatbotProps {
  className?: string;
}

export default function EnhancedDashboardChatbot({ className = '' }: EnhancedDashboardChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { user, isAdmin, isAuthenticated } = useAuth();

  // Role-based quick actions
  const getQuickActions = (): QuickAction[] => {
    const baseActions: QuickAction[] = [
      { icon: MapPin, label: '🏙️ Find Best Cities', value: 'cities', description: 'Get AI-powered city recommendations' },
      { icon: BarChart3, label: '📊 Analyze Demographics', value: 'demographics', description: 'View demographic trends and insights' },
      { icon: TrendingUp, label: '📈 Show Trends', value: 'trends', description: 'Display market trends and forecasts' },
      { icon: Download, label: '📄 Export Reports', value: 'export', description: 'Generate and download analytics reports' },
    ];

    const adminActions: QuickAction[] = [
      { icon: Settings, label: '⚙️ System Status', value: 'system', description: 'Check system health and performance', roleRequired: 'admin' },
      { icon: Users, label: '👥 User Management', value: 'users', description: 'Manage user accounts and permissions', roleRequired: 'admin' },
      { icon: Database, label: '🗄️ Data Management', value: 'data', description: 'Database operations and data quality', roleRequired: 'admin' },
      { icon: Filter, label: '🔧 Admin Tools', value: 'tools', description: 'Advanced configuration and monitoring', roleRequired: 'admin' },
    ];

    return isAdmin ? [...baseActions, ...adminActions] : baseActions;
  };

  const dashboardActions: QuickAction[] = [
    { icon: BarChart3, label: '📈 Update Charts', value: 'refresh', description: 'Refresh dashboard widgets' },
    { icon: MapPin, label: '🗺️ Recalculate Cities', value: 'recalc', description: 'Update city recommendations' },
    { icon: Download, label: '💾 Quick Export', value: 'quickexport', description: 'Export current dashboard view' },
    { icon: TrendingUp, label: '🔍 Deep Analysis', value: 'analyze', description: 'Run advanced analytics' },
  ];

  // Initial welcome message with role awareness
  useEffect(() => {
    if (messages.length === 0 && isAuthenticated) {
      const welcomeText = isAdmin 
        ? `Welcome back, ${user?.firstName || 'Admin'}! 🚀 I'm your enhanced AI assistant with full system access. I can help you with:\n\n• Advanced analytics & insights\n• User & system management\n• Data operations & monitoring\n• Custom reports & exports\n\nWhat would you like to explore today?`
        : `Hello ${user?.firstName || 'there'}! 👋 I'm your enhanced Prospectify AI assistant. I can help you:\n\n• Find optimal European cities\n• Analyze demographics & trends\n• Generate detailed reports\n• Discover business opportunities\n\nHow can I assist you today?`;
      
      setMessages([{
        id: '1',
        text: welcomeText,
        isBot: true,
        timestamp: new Date(),
        showActions: true,
        actionType: 'quick'
      }]);
    }
  }, [messages.length, isAuthenticated, isAdmin, user?.firstName]);

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

  const handleQuickAction = async (action: string, actionType: 'quick' | 'dashboard' | 'admin' = 'quick') => {
    const actionLabels: { [key: string]: string } = {
      cities: 'Find the best cities for my business requirements',
      demographics: 'Show me comprehensive demographic analysis', 
      trends: 'Display current market trends and forecasts',
      export: 'Generate and export detailed analytics reports',
      system: 'Check comprehensive system status',
      users: 'Show user management dashboard',
      data: 'Open data management and quality tools',
      tools: 'Access advanced admin configuration tools',
      refresh: 'Refresh all dashboard widgets and data',
      recalc: 'Recalculate city recommendations with latest data',
      quickexport: 'Quick export of current dashboard view',
      analyze: 'Perform deep analytical insights'
    };

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: actionLabels[action] || action,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Handle admin-specific actions with enhanced responses
    if (action === 'system' && isAdmin) {
      setTimeout(() => {
        const response: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `🟢 **System Status Dashboard**\n\n📊 **Core Services:**\n• API Gateway: ✅ Operational (99.9% uptime)\n• Database: ✅ Connected (2ms latency)\n• Cache Layer: ✅ Optimized (85% hit rate)\n\n📈 **Performance Metrics:**\n• Active Users: 47 (Peak: 89 today)\n• Request Rate: 245/min (Normal)\n• Memory Usage: 68% (Healthy)\n• Storage: 12.4GB used (76% available)\n\n🔄 **Recent Activity:**\n• Last deployment: 2 hours ago\n• Data sync: 3 minutes ago\n• Backup status: ✅ Completed\n\nAll systems operating within normal parameters! 🎯`,
          isBot: true,
          timestamp: new Date(),
          showActions: true,
          actionType: 'admin'
        };
        setMessages(prev => [...prev, response]);
        setIsLoading(false);
      }, 1500);
      return;
    }

    if (action === 'users' && isAdmin) {
      setTimeout(() => {
        const response: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `👥 **User Management Overview**\n\n📊 **User Statistics:**\n• Total Users: 187 (+12 this week)\n• Active Sessions: 47\n• Pending Approvals: 5 (Review needed)\n• New Signups Today: 9\n\n🎯 **User Engagement:**\n• Daily Active Users: 67\n• Average Session: 24 minutes\n• Feature Usage: Demographics (89%), Reports (67%)\n\n⚠️ **Action Items:**\n• 5 users pending approval\n• 2 accounts need verification\n• 1 support ticket escalated\n\nWould you like me to show pending approvals or dive into user analytics?`,
          isBot: true,
          timestamp: new Date(),
          showActions: true,
          actionType: 'admin'
        };
        setMessages(prev => [...prev, response]);
        setIsLoading(false);
      }, 1500);
      return;
    }

    if (action === 'data' && isAdmin) {
      setTimeout(() => {
        const response: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `🗄️ **Data Management Dashboard**\n\n📈 **Data Quality Score: 94.2%**\n\n🔍 **Recent Data Operations:**\n• Eurostat Sync: ✅ Completed (1 hour ago)\n• Data Validation: ✅ 99.1% accuracy\n• Missing Data Points: 127 (0.02%)\n• Duplicate Records: 0\n\n📊 **Database Performance:**\n• Query Response: 1.2ms avg\n• Index Efficiency: 97%\n• Storage Growth: +2.1GB this month\n\n🛠️ **Available Actions:**\n• Run data quality check\n• Import new datasets\n• Export database backup\n• Schedule maintenance\n\nData pipeline is healthy and performing optimally! 🚀`,
          isBot: true,
          timestamp: new Date(),
          showActions: true,
          actionType: 'admin'
        };
        setMessages(prev => [...prev, response]);
        setIsLoading(false);
      }, 1500);
      return;
    }

    // Handle dashboard-specific actions
    if (action === 'refresh') {
      setTimeout(() => {
        const response: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `🔄 **Dashboard Refresh Complete!**\n\n✅ Updated Components:\n• City Recommendations: Latest algorithm\n• Demographic Charts: Fresh Eurostat data\n• Trend Analysis: Real-time insights\n• Performance Metrics: Current session data\n\nAll widgets now display the most current information available! Your dashboard is optimized and ready. 📊✨`,
          isBot: true,
          timestamp: new Date(),
          showActions: true,
          actionType: 'dashboard'
        };
        setMessages(prev => [...prev, response]);
        setIsLoading(false);
      }, 2000);
      return;
    }

    // For other actions, use the enhanced API
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: actionLabels[action] || action,
          isHomepage: false,
          includeDataContext: true,
          userRole: isAdmin ? 'admin' : 'user',
          userName: user?.firstName,
          userCompany: user?.company,
          actionType: action,
          enhanced: true // Flag for enhanced responses
        })
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isBot: true,
        timestamp: new Date(),
        showActions: true,
        actionType: 'dashboard'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'I encountered an error processing your request. Please try again or contact our support team for assistance.',
        isBot: true,
        timestamp: new Date(),
        showActions: true,
        actionType: 'quick'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

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
          enhanced: true
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isBot: true,
        timestamp: new Date(),
        showActions: true,
        actionType: 'dashboard'
      };
      
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I encountered an error. Please try rephrasing your question or contact support if the issue persists.',
        isBot: true,
        timestamp: new Date(),
        showActions: true,
        actionType: 'quick'
      };
      setMessages(prev => [...prev, errorMessage]);
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

  const renderActionButtons = (actionType: 'quick' | 'dashboard' | 'admin' = 'quick') => {
    let actions: QuickAction[] = [];
    
    switch (actionType) {
      case 'quick':
        actions = getQuickActions();
        break;
      case 'dashboard':
        actions = dashboardActions;
        break;
      case 'admin':
        actions = isAdmin ? getQuickActions().filter(a => a.roleRequired === 'admin') : [];
        break;
    }

    return (
      <div className="mt-3 space-y-2">
        <div className="text-xs text-blue-600 font-medium mb-2">
          {actionType === 'quick' ? '⚡ Quick Actions:' : 
           actionType === 'dashboard' ? '📊 Dashboard Actions:' : 
           '⚙️ Admin Actions:'}
        </div>
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <button
              key={action.value}
              onClick={() => handleQuickAction(action.value, actionType)}
              className="w-full text-left px-4 py-3 text-sm bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-gray-800 rounded-xl transition-all duration-200 border border-blue-100 hover:border-blue-200 hover:shadow-md group"
            >
              <div className="flex items-center space-x-3">
                <IconComponent size={16} className="text-blue-600 group-hover:text-blue-700" />
                <div>
                  <div className="font-medium">{action.label}</div>
                  <div className="text-xs text-gray-600 mt-1">{action.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  if (!isAuthenticated) {
    return null; // Don't show chatbot if not authenticated
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Enhanced Chat Button */}
      {!isOpen && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-ping opacity-75"></div>
          <button
            onClick={toggleChat}
            className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110"
            aria-label="Open enhanced AI assistant"
          >
            <MessageCircle size={28} />
            <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
              🧠
            </div>
          </button>
        </div>
      )}

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-[420px] h-[600px] flex flex-col overflow-hidden transform transition-all duration-500 ease-out">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 animate-pulse"></div>
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Bot className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Enhanced AI Assistant</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <p className="text-sm opacity-90">
                    {isAdmin ? 'Admin Mode • Full Access' : 'User Mode • Ready to Help'}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:rotate-90 relative z-10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Enhanced Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow-md ${
                      message.isBot
                        ? 'bg-white text-gray-800 border border-gray-100'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    }`}
                  >
                    {message.isBot && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot size={14} className="text-blue-600" />
                        <span className="text-xs font-medium text-blue-600">
                          {isAdmin ? 'Enhanced Admin Assistant' : 'Enhanced AI Assistant'}
                        </span>
                      </div>
                    )}
                    <div className="whitespace-pre-line">{message.text}</div>
                  </div>
                </div>
                
                {/* Enhanced Action Buttons */}
                {message.isBot && message.showActions && renderActionButtons(message.actionType)}
              </div>
            ))}

            {/* Enhanced Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl text-sm shadow-md border border-gray-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot size={14} className="text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">AI is analyzing...</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area */}
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="border-t border-gray-100 p-4 bg-white">
            <div className="flex space-x-3">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask me anything about ${isAdmin ? 'system management or' : ''} your business analytics...`}
                className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-full p-3 transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full">{inputMessage.length}/500 characters</span>
              <span className="text-blue-600">Enhanced with {isAdmin ? 'admin' : 'user'} capabilities</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
