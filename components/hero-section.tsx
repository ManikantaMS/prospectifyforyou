import { Button } from "@/components/ui/button"
import { ArrowRight, Target, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  onGetDemo?: () => void
}

export function HeroSection({ onGetDemo }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 h-[80vh] flex items-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
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
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-blue-900/30 to-indigo-900/50"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Find Your Perfect
            <span className="text-blue-400 block">Target Market</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto drop-shadow-md">
            Discover ideal markets, manage events, book physical campaigns, and track performance with AI-powered 
            insights and comprehensive marketing intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" onClick={onGetDemo} className="bg-blue-600 hover:bg-blue-700 shadow-lg">
              Get Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" asChild className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 shadow-lg">
              <a href="#how-it-works">How It Works</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <Target className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">500+</h3>
              <p className="text-gray-200">Cities Analyzed</p>
            </div>
            <div className="text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">95%</h3>
              <p className="text-gray-200">Accuracy Rate</p>
            </div>
            <div className="text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">10K+</h3>
              <p className="text-gray-200">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
