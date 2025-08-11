import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Search, Calendar, TrendingUp, Bot, Sparkles, ArrowRight } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Bot,
      title: "Chat with AI Assistant",
      description: "Start conversations with our truly AI-powered assistant to define business goals, analyze markets, and get intelligent recommendations.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      iconBg: "from-blue-100 to-cyan-100"
    },
    {
      icon: Search,
      title: "Discover AI Insights",
      description: "Get real-time AI-powered city recommendations, market analysis, and event discovery tailored to your target demographics.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      iconBg: "from-purple-100 to-pink-100"
    },
    {
      icon: Calendar,
      title: "Smart Campaign Management",
      description: "Book events, manage physical marketing stalls, and execute campaigns with AI optimization and predictive insights.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      iconBg: "from-green-100 to-emerald-100"
    },
    {
      icon: TrendingUp,
      title: "Intelligent Analytics",
      description: "Monitor performance with AI-driven analytics, predictive modeling, real-time insights, and comprehensive ROI tracking.",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      iconBg: "from-orange-100 to-red-100"
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-200/30 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-blue-600 mr-3 animate-pulse" />
            <span className="text-blue-600 font-semibold text-lg tracking-wide uppercase">How It Works</span>
            <Sparkles className="w-8 h-8 text-blue-600 ml-3 animate-pulse" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
            AI-Powered Business Intelligence
          </h2>
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Four intelligent steps to discover market opportunities and accelerate growth with 
            <span className="text-blue-600 font-semibold"> advanced AI technology</span>.
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="h-2 w-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-4"></div>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className={`group text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-gradient-to-br ${step.bgGradient} backdrop-blur-sm overflow-hidden h-full`}>
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated border glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
                
                <CardHeader className="relative pb-4">
                  <div className="flex justify-center mb-6">
                    <div className={`p-7 bg-gradient-to-br ${step.iconBg} rounded-3xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 relative border border-white/50`}>
                      <step.icon className={`h-12 w-12 bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent drop-shadow-sm`} style={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      }} />
                      
                      {/* Step number badge */}
                      <div className={`absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-white`}>
                        {index + 1}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs font-bold text-gray-500 mb-3 tracking-wider uppercase">
                    STEP {index + 1}
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors mb-2 leading-tight">
                    {step.title}
                  </CardTitle>
                  
                  <div className={`h-1 w-16 bg-gradient-to-r ${step.gradient} rounded-full mx-auto opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-300`}></div>
                </CardHeader>
                
                <CardContent className="relative">
                  <CardDescription className="text-gray-700 text-base leading-relaxed group-hover:text-gray-800 transition-colors">
                    {step.description}
                  </CardDescription>
                </CardContent>
                
                {/* Bottom shine effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Card>
              
              {/* Arrow connector for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="bg-white rounded-full p-2 shadow-lg">
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Bot className="w-6 h-6 text-white mr-3" />
            <span className="text-white font-semibold text-lg">Ready to Experience AI Intelligence?</span>
            <Sparkles className="w-6 h-6 text-white ml-3 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
