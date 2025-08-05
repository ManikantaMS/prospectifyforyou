'use client';

import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';

interface ChatStep {
  id: string;
  message?: string;
  options?: Array<{
    value: string;
    label: string;
    trigger: string;
  }>;
}

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  options?: Array<{
    value: string;
    label: string;
    trigger: string;
  }>;
}

// Chat flow data
const chatSteps: Record<string, ChatStep> = {
  '1': {
    id: '1',
    message: 'Hi! 👋 Any events happening that might be interesting for your new product? \n\nI can help you find events, analyze ROI, and create campaigns. What interests you?',
    options: [
      { value: 'smartwatch', label: '⌚ Smartwatch Launch', trigger: 'smartwatch' },
      { value: 'coffee', label: '☕ Premium Coffee', trigger: 'coffee' },
      { value: 'events', label: '🎯 Find Events', trigger: '2' },
      { value: 'roi', label: '📊 ROI Analysis', trigger: '10' },
      { value: 'campaign', label: '🚀 Create Campaign', trigger: '15' },
    ],
  },
  'smartwatch': {
    id: 'smartwatch',
    message: '⌚ Perfect timing! Based on your smartwatch profile:\n\nTOP RECOMMENDATIONS:\n🥇 Consumer Electronics Expo (Copenhagen) - March 20\n• 89% match rate • 15K tech enthusiasts\n• Avg booth ROI: 340% • Digital synergy: HIGH\n\n🥈 Marathon Events (Multiple cities) - April 5-12\n• 76% match rate • 45K fitness enthusiasts\n• Perfect for smartwatch demos\n\nWould you like me to create an integrated campaign strategy?',
    options: [
      { value: 'create_smartwatch_campaign', label: '🚀 Create Campaign', trigger: 'smartwatch_campaign' },
      { value: 'view_events', label: '🎪 View All Events', trigger: 'redirect_events' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  'coffee': {
    id: 'coffee',
    message: '☕ Great news! Berlin Food & Beverage Expo (Apr 15-17)\n• 12K attendees, 73% match for premium food brands\n• Historical success: 4.2x ROI for coffee vendors\n• Booth cost: €2,500 vs potential revenue: €10,500\n\nShould I create a hybrid campaign?\n🎯 Digital: Target Berlin coffee enthusiasts (2 weeks before)\n🏪 Physical: Premium coffee stall at expo\n📱 Mobile: Lead capture app for visitors',
    options: [
      { value: 'create_coffee_campaign', label: '🚀 Create Hybrid Campaign', trigger: 'coffee_campaign' },
      { value: 'physical_marketing', label: '🏪 View Physical Marketing', trigger: 'redirect_physical' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  'smartwatch_campaign': {
    id: 'smartwatch_campaign',
    message: '✅ Created "Smartwatch Innovation Campaign":\n📅 Dates: Mar 1-20 (pre-event marketing)\n🎯 Target: Tech enthusiasts & fitness lovers\n💰 Budget: €4,500\n📍 Focus: Copenhagen + Marathon events\n\nCampaign includes:\n• Pre-event digital targeting\n• Premium expo booth\n• Interactive smartwatch demos\n• Lead capture system',
    options: [
      { value: 'view_campaign', label: '📊 View Campaign Dashboard', trigger: 'redirect_dashboard' },
      { value: 'physical_setup', label: '🏪 Setup Physical Stall', trigger: 'redirect_physical' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  'coffee_campaign': {
    id: 'coffee_campaign',
    message: '✅ Created "Berlin Coffee Experience Campaign":\n📅 Timeline: 4 weeks pre-event + event days\n🎯 Hybrid Strategy:\n\nDIGITAL (2 weeks before):\n• Target Berlin coffee enthusiasts\n• Social media teasers\n• Email marketing to expo attendees\n\nPHYSICAL (Event days):\n• Premium coffee stall\n• Live brewing demonstrations\n• QR code lead capture\n\nExpected ROI: 420%',
    options: [
      { value: 'view_campaign', label: '📊 View Campaign Dashboard', trigger: 'redirect_dashboard' },
      { value: 'book_stall', label: '🏪 Book Physical Stall', trigger: 'redirect_physical' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  'redirect_events': {
    id: 'redirect_events',
    message: '🎪 Great! You can find all events in the "🎪 Events" tab above. Click on it to explore events, see ROI projections, and register for the ones that match your business!',
    options: [
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  'redirect_physical': {
    id: 'redirect_physical',
    message: '🏪 Perfect! Check out the "Physical Marketing" tab above to book stalls, manage locations, track foot traffic, and analyze your physical marketing ROI!',
    options: [
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  'redirect_dashboard': {
    id: 'redirect_dashboard',
    message: '📊 Excellent! You can monitor all your campaign performance in the "📊 Analytics" tab above. Track ROI, leads, conversions, and location performance!',
    options: [
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  '2': {
    id: '2',
    message: 'Great! What type of events are you looking for?',
    options: [
      { value: 'tech', label: 'Technology & Innovation', trigger: '3' },
      { value: 'marketing', label: 'Marketing & Sales', trigger: '4' },
      { value: 'business', label: 'Business & Networking', trigger: '5' },
      { value: 'all', label: 'Show all events', trigger: '6' },
    ],
  },
  '3': {
    id: '3',
    message: '🏆 Stockholm Tech Conference 2024\n📍 March 15-17 | 2,500 attendees\n💰 €3,500 | ROI Score: 8.5/10\n\n🌟 Copenhagen Innovation Fair\n📍 May 20-22 | 3,200 attendees\n💰 €4,200 | ROI Score: 9.1/10',
    options: [
      { value: 'more_info', label: '📋 Get Details', trigger: '21' },
      { value: 'roi_calc', label: '📊 Calculate ROI', trigger: '10' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  '4': {
    id: '4',
    message: '🎯 Berlin Marketing Summit\n📍 April 8-10 | 1,800 attendees\n💰 €2,800 | ROI Score: 7.8/10\n\nFocuses on digital marketing and lead generation.',
    options: [
      { value: 'more_info', label: '📋 Get Details', trigger: '21' },
      { value: 'roi_calc', label: '📊 Calculate ROI', trigger: '10' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  '5': {
    id: '5',
    message: 'Perfect for networking! Our business events have 40% higher networking ROI than average.',
    options: [
      { value: 'show_events', label: 'Show Events', trigger: '6' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  '6': {
    id: '6',
    message: 'Top Events by ROI:\n🥇 Copenhagen Innovation (9.1)\n🥈 Stockholm Tech (8.5)\n🥉 Berlin Marketing (7.8)',
    options: [
      { value: 'details', label: '📋 Event Details', trigger: '21' },
      { value: 'roi', label: '📊 ROI Analysis', trigger: '10' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  '10': {
    id: '10',
    message: 'Let\'s calculate your ROI! What\'s your primary goal?',
    options: [
      { value: 'leads', label: '🎯 Generate Leads', trigger: '11' },
      { value: 'brand', label: '🏢 Brand Awareness', trigger: '12' },
      { value: 'sales', label: '💰 Direct Sales', trigger: '13' },
    ],
  },
  '11': {
    id: '11',
    message: '🎯 Lead Generation ROI:\nCopenhagen: 180-220 leads\nCost per lead: €19-24\nProjected ROI: 340%',
    options: [
      { value: 'create_campaign', label: '🚀 Create Campaign', trigger: '15' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  '12': {
    id: '12',
    message: '🏢 Brand Awareness ROI:\n15,000+ impressions\n50,000+ social reach\nBrand value increase: €25k-€40k',
    options: [
      { value: 'create_campaign', label: '🚀 Create Campaign', trigger: '15' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  '13': {
    id: '13',
    message: '💰 Sales ROI:\nAverage deal: €2,400\nConversion: 8-12%\nRevenue: €45k-€68k\nROI: 280-420%',
    options: [
      { value: 'create_campaign', label: '🚀 Create Campaign', trigger: '15' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  '15': {
    id: '15',
    message: 'Let\'s create a winning campaign! What type?',
    options: [
      { value: 'event_campaign', label: '🎯 Event-Specific', trigger: '16' },
      { value: 'multi_campaign', label: '🌐 Multi-Event', trigger: '17' },
      { value: 'digital_campaign', label: '💻 Digital Only', trigger: '18' },
    ],
  },
  '16': {
    id: '16',
    message: '🎯 "Copenhagen Innovation Showcase"\n📅 8 weeks timeline\n💰 Expected ROI: 340%\n✅ Campaign created!',
    options: [
      { value: 'dashboard', label: '📊 View Dashboard', trigger: '22' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  '17': {
    id: '17',
    message: '🌐 "Nordic Tech Tour 2024"\n📍 3 cities: Stockholm → Berlin → Copenhagen\n💰 €11k investment → €95k+ return\n✅ Multi-event campaign ready!',
    options: [
      { value: 'dashboard', label: '📊 View Dashboard', trigger: '22' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  '18': {
    id: '18',
    message: '💻 "Virtual Event Amplification"\n📧 12-email sequence\n📱 Social media campaign\n📊 Expected: 150-200 leads',
    options: [
      { value: 'dashboard', label: '📊 View Dashboard', trigger: '22' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  '20': {
    id: '20',
    message: '❓ Prospectify AI helps you:\n🔍 Find perfect events (94% accuracy)\n📊 Calculate precise ROI\n🚀 Create custom campaigns\n💡 I learn from each interaction!',
    options: [
      { value: 'features', label: '✨ Key Features', trigger: '23' },
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  '21': {
    id: '21',
    message: 'For detailed event information, visit our dashboard or contact our team at support@prospectify.ai',
    options: [
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  '22': {
    id: '22',
    message: '📊 Campaign Dashboard:\n🎯 Active Campaigns: 1\n📈 Leads Generated: Starting soon!\n💰 ROI Tracking: Live\n\nDashboard: /dashboard',
    options: [
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
  '23': {
    id: '23',
    message: '✨ Key Features:\n🔍 Smart Event Discovery\n📊 ROI Prediction (94% accuracy)\n🚀 Campaign Automation\n📈 Performance Tracking\n💡 AI Learning System',
    options: [
      { value: 'back', label: '🏠 Main Menu', trigger: '1' },
    ],
  },
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize with welcome message
      const welcomeStep = chatSteps['1'];
      if (welcomeStep.message) {
        setMessages([{
          id: '1',
          text: welcomeStep.message,
          isBot: true,
          options: welcomeStep.options
        }]);
      }
    }
  }, [isOpen, messages.length]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  const handleOptionClick = (option: { value: string; label: string; trigger: string }) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: option.label,
      isBot: false
    };

    // Get bot response
    const nextStep = chatSteps[option.trigger];
    const botMessage: ChatMessage = {
      id: nextStep.id,
      text: nextStep.message || 'I understand. How else can I help you?',
      isBot: true,
      options: nextStep.options
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {isOpen ? (
        <div className="w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Prospectify AI</h3>
            <button 
              onClick={toggleChat}
              className="p-1 rounded hover:bg-white/20 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  message.isBot 
                    ? 'bg-blue-500 text-white self-start' 
                    : 'bg-gray-100 text-gray-800 self-end ml-auto'
                }`}>
                  {message.text}
                </div>
                {message.options && message.isBot && (
                  <div className="flex flex-col gap-2 mt-2">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className="text-left p-2 border-2 border-blue-500 text-blue-500 rounded-full text-xs hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button 
          onClick={toggleChat}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center relative"
        >
          {hasNewMessage && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-semibold">
              1
            </div>
          )}
          <MessageCircle size={24} color="white" />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
