import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, MapPin, Users, Zap, Shield, Globe, Bot, Brain, Sparkles, TrendingUp, Eye, Lock } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "Truly AI-Powered Analytics",
      description: "AI-generated insights using advanced Gemini AI technology for real-time market analysis and strategic recommendations.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      iconBg: "from-purple-100 to-pink-100"
    },
    {
      icon: MapPin,
      title: "Smart City Intelligence",
      description: "AI-driven demographic analysis with real-time data processing to identify perfect target markets and growth opportunities.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      iconBg: "from-blue-100 to-cyan-100"
    },
    {
      icon: Bot,
      title: "Enterprise AI Assistant",
      description: "Sophisticated chatbot with role-based access, contextual understanding, and genuine AI responses for business intelligence.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      iconBg: "from-green-100 to-emerald-100"
    },
    {
      icon: BarChart3,
      title: "Event Discovery & Analytics",
      description: "Discover high-ROI events, manage physical campaigns, and track performance with predictive analytics and foot traffic insights.",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      iconBg: "from-orange-100 to-red-100"
    },
    {
      icon: Zap,
      title: "Physical Marketing Hub",
      description: "Complete campaign management with AI-optimized stall booking, lead tracking, and real-time performance optimization.",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      iconBg: "from-yellow-100 to-orange-100"
    },
    {
      icon: Shield,
      title: "Enterprise Security & Privacy",
      description: "Bank-grade security with end-to-end encryption, GDPR compliance, and secure data processing for business intelligence.",
      gradient: "from-gray-600 to-gray-800",
      bgGradient: "from-gray-50 to-slate-50",
      iconBg: "from-gray-100 to-slate-100"
    },
    {
      icon: TrendingUp,
      title: "Predictive Market Insights",
      description: "AI-powered trend forecasting with 6-12 month predictions, market opportunity analysis, and growth trajectory modeling.",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
      iconBg: "from-indigo-100 to-purple-100"
    },
    {
      icon: Eye,
      title: "Real-Time Intelligence",
      description: "Live dashboard with instant insights, system health monitoring, user behavior analysis, and performance metrics.",
      gradient: "from-teal-500 to-blue-500",
      bgGradient: "from-teal-50 to-blue-50",
      iconBg: "from-teal-100 to-blue-100"
    },
    {
      icon: Globe,
      title: "Comprehensive ROI Analytics",
      description: "Cross-platform performance tracking with detailed attribution, campaign optimization, and multi-channel ROI analysis.",
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-50 to-pink-50",
      iconBg: "from-rose-100 to-pink-100"
    },
  ]

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-blue-600 mr-3 animate-pulse" />
            <span className="text-blue-600 font-semibold text-lg tracking-wide uppercase">Features</span>
            <Sparkles className="w-8 h-8 text-blue-600 ml-3 animate-pulse" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
            Powerful Features for Market Intelligence
          </h2>
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Everything you need to identify and analyze your target markets with 
            <span className="text-blue-600 font-semibold"> AI-powered precision</span> and 
            <span className="text-purple-600 font-semibold"> enterprise-grade confidence</span>.
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="h-2 w-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-4"></div>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`group relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm overflow-hidden`}
            >
              {/* Glossy overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Animated border glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
              
              <CardHeader className="relative pb-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-5 bg-gradient-to-br ${feature.iconBg} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 border border-white/50`}>
                    <feature.icon className={`h-10 w-10 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent drop-shadow-sm`} style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors mb-2 leading-tight">
                      {feature.title}
                    </CardTitle>
                    <div className={`h-1 w-12 bg-gradient-to-r ${feature.gradient} rounded-full opacity-60 group-hover:opacity-100 group-hover:w-20 transition-all duration-300`}></div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative pt-0">
                <CardDescription className="text-gray-700 text-base leading-relaxed group-hover:text-gray-800 transition-colors">
                  {feature.description}
                </CardDescription>
                
                {/* Hover indicator */}
                <div className="flex items-center mt-4 text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                  <span className="group-hover:underline">Learn more</span>
                  <Zap className="w-4 h-4 ml-1 group-hover:text-yellow-500 transition-colors" />
                </div>
              </CardContent>
              
              {/* Bottom shine effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Card>
          ))}
        </div>
        
        {/* Bottom CTA section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Bot className="w-6 h-6 text-white mr-3" />
            <span className="text-white font-semibold text-lg">Experience AI-Powered Intelligence</span>
            <Sparkles className="w-6 h-6 text-white ml-3 animate-pulse" />
          </div>
          <p className="text-gray-600 mt-4 text-lg">
            Join thousands of businesses making data-driven decisions with Prospectify
          </p>
        </div>
      </div>
    </section>
  )
}
