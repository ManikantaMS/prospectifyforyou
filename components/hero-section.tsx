import { Button } from "@/components/ui/button"
import { ArrowRight, Target, TrendingUp, Users, Sparkles, Bot, Brain } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  onGetDemo?: () => void
}

export function HeroSection({ onGetDemo }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 h-[85vh] flex items-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Vimeo Video Background */}
      <div className="absolute inset-0 z-0">
        <div style={{padding: "75% 0 0 0", position: "relative", height: "100%"}}>
          <iframe
            src="https://player.vimeo.com/video/1108858054?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}
            title="Hero2"
          ></iframe>
        </div>
        {/* Enhanced Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-blue-900/40 to-indigo-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-500/20 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          {/* AI Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-lg rounded-full border border-white/20 shadow-xl mb-8">
            <Bot className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-semibold text-sm">AI-Powered Intelligence</span>
            <Sparkles className="w-5 h-5 text-white ml-2 animate-pulse" />
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
            Find Your Perfect
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent block animate-pulse">
              Target Market
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-200 mb-10 max-w-4xl mx-auto drop-shadow-md leading-relaxed">
            Discover ideal markets, manage events, book physical campaigns, and track performance with 
            <span className="text-blue-300 font-semibold"> advanced AI insights</span> and 
            <span className="text-purple-300 font-semibold"> comprehensive marketing intelligence</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={onGetDemo} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 text-lg px-8 py-4"
            >
              Get AI Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="border-2 border-white/40 bg-white/10 backdrop-blur-lg text-white hover:bg-white hover:text-gray-900 shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-4"
            >
              <a href="#how-it-works">How It Works</a>
            </Button>
          </div>

          {/* Enhanced Stats with Glassmorphism - Moved down to show more video */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40">
            <div className="group text-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl">
                  <Target className="h-12 w-12 text-blue-400 group-hover:text-blue-300 transition-colors" />
                </div>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">500+</h3>
              <p className="text-gray-200 font-medium">Cities Analyzed</p>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-4 opacity-60 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="group text-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl">
                  <Brain className="h-12 w-12 text-green-400 group-hover:text-green-300 transition-colors" />
                </div>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mb-2">95%</h3>
              <p className="text-gray-200 font-medium">AI Accuracy Rate</p>
              <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mt-4 opacity-60 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="group text-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl">
                  <Users className="h-12 w-12 text-purple-400 group-hover:text-purple-300 transition-colors" />
                </div>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">10K+</h3>
              <p className="text-gray-200 font-medium">Happy Customers</p>
              <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4 opacity-60 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
