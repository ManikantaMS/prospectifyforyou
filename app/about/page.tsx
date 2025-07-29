import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Building2, GraduationCap, Users, Heart, Target, TrendingUp, Home, Linkedin, ExternalLink } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us - Prospectify | Data-Driven Marketing Solutions",
  description: "Learn about Manikanta MS, founder of Prospectify, and our mission to empower SMB marketing teams with data-driven insights for targeted European campaigns.",
  keywords: ["about prospectify", "manikanta ms", "data-driven marketing", "european campaigns", "SMB marketing"],
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Navigation Back to Home */}
        <div className="mb-8">
          <Button variant="outline" asChild className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <Link href="/">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="relative">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-fade-in">
              About Prospectify
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-3xl opacity-20 animate-pulse"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Empowering SMB marketing teams with 
            <span className="text-blue-400 font-semibold"> data-driven insights </span>
            for targeted European campaigns
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Founder Profile */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 group">
            <CardHeader className="pb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">MM</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                </div>
                <div>
                  <CardTitle className="text-3xl text-white group-hover:text-blue-300 transition-colors duration-300">
                    Manikanta MS
                  </CardTitle>
                  <CardDescription className="text-xl text-gray-300">
                    Founder & Lead Strategist
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                An accomplished entrepreneur and business strategist with a strong background in sales, 
                operations, e-commerce, and product development. Currently pursuing an MSc in AI for 
                Business at the National College of Ireland to further leverage AI for business innovation, 
                decision-making, and automation.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="text-gray-300">Lead Analyst at EY</span>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="text-gray-300">MSc in AI for Business - National College of Ireland</span>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-blue-400" />
                  </div>
                  <a 
                    href="https://www.linkedin.com/in/mani-kanta-ms" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center space-x-2 transition-colors duration-300 group"
                  >
                    <span>Connect on LinkedIn</span>
                    <ExternalLink className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>

              <Separator className="my-8 bg-white/20" />

              <div>
                <h4 className="font-semibold text-white mb-4 text-lg">Core Expertise</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Data-driven Solutions",
                    "Business Strategy", 
                    "AI & Automation",
                    "Product Development",
                    "Analytics",
                    "E-commerce"
                  ].map((skill, index) => (
                    <Badge 
                      key={skill} 
                      className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30 text-blue-300 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Vision */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 group">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-white group-hover:text-blue-300 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl">Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                Prospectify is designed to help small and medium-sized business (SMB) marketing teams 
                identify the best European cities for targeted campaigns using real-time demographic 
                and economic data from trusted sources like Eurostat and INSEE.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Reduce Guesswork</h4>
                    <p className="text-gray-300">Eliminate uncertainty in regional targeting with data-backed insights</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Improve Campaign ROI</h4>
                    <p className="text-gray-300">Maximize return on investment through strategic city selection</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <Users className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Enhance Customer Engagement</h4>
                    <p className="text-gray-300">Connect with the right audiences in the right locations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Impact Section */}
        <Card className="mb-16 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:shadow-pink-500/20 transition-all duration-500">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl">Community Impact</span>
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Beyond business, we believe in giving back to the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-blue-400" />
                </div>
                <h4 className="font-semibold text-white mb-3 text-xl">Education & Literacy</h4>
                <p className="text-gray-300 leading-relaxed">
                  Volunteering with the India Literacy Project, helping train students in using 
                  low-cost science kits to make quality education more accessible.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-purple-400" />
                </div>
                <h4 className="font-semibold text-white mb-3 text-xl">Cybersecurity Awareness</h4>
                <p className="text-gray-300 leading-relaxed">
                  Conducting awareness sessions for school children on cybersecurity, educating 
                  them about online threats and digital safety practices.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <Card className="mb-16 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-3xl mb-2">Our Values</CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              The principles that guide our work and commitment to excellence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-3 text-xl">Data-Driven Excellence</h4>
                <p className="text-gray-300 leading-relaxed">
                  We believe in the power of accurate data to drive informed business decisions
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-3 text-xl">Customer Success</h4>
                <p className="text-gray-300 leading-relaxed">
                  Your success is our success. We're committed to delivering measurable results
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-3 text-xl">Continuous Innovation</h4>
                <p className="text-gray-300 leading-relaxed">
                  We continuously evolve our platform to meet changing market needs
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connect Section */}
        <Card className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-md border-white/30 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-white text-4xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let's Connect
            </CardTitle>
            <CardDescription className="text-gray-300 text-xl">
              Ready to revolutionize your marketing campaigns? Get in touch with us
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <Button 
                asChild 
                size="lg" 
                className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group px-8 py-6 text-lg"
              >
                <Link href="/signup">
                  <Target className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Start Your Journey</span>
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 group px-8 py-6 text-lg"
              >
                <a 
                  href="https://www.linkedin.com/in/mani-kanta-ms" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
            </div>
            
            {/* Decorative elements */}
            <div className="mt-12 text-center">
              <div className="flex justify-center space-x-4 mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-500"></div>
              </div>
              <p className="text-gray-400 text-sm">
                Join thousands of businesses already using Prospectify
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
