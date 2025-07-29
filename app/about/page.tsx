import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Building2, GraduationCap, Users, Heart, Target, TrendingUp, Linkedin, ExternalLink, Star, BarChart3, Globe } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "About Us - Prospectify | Data-Driven Marketing Solutions",
  description: "Learn about Manikanta MS, founder of Prospectify, and our mission to empower SMB marketing teams with data-driven insights for targeted European campaigns.",
  keywords: ["about prospectify", "manikanta ms", "data-driven marketing", "european campaigns", "SMB marketing"],
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <PageHeader 
          title={
            <>
              About <span className="text-blue-600">Prospectify</span>
            </>
          }
          subtitle={
            <>
              Empowering SMB marketing teams with{" "}
              <span className="text-blue-600 font-semibold">data-driven insights</span>{" "}
              for targeted European campaigns
            </>
          }
          showBackButton={true}
          showHomeButton={true}
        />

        <div className="mt-8 flex justify-center mb-20">
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Founder Profile */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">MM</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Manikanta MS</h2>
                <p className="text-xl text-gray-600">Founder & Lead Strategist</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              An accomplished entrepreneur and business strategist with a strong background in sales, 
              operations, e-commerce, and product development. Currently pursuing an MSc in AI for 
              Business at the National College of Ireland to further leverage AI for business innovation, 
              decision-making, and automation.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gray-700">Lead Analyst at EY</span>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-gray-700">MSc in AI for Business - National College of Ireland</span>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Linkedin className="h-5 w-5 text-blue-600" />
                </div>
                <a 
                  href="https://www.linkedin.com/in/mani-kanta-ms" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 transition-colors duration-300"
                >
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <Separator className="my-8" />

            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">Core Expertise</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "Data-driven Solutions",
                  "Business Strategy", 
                  "AI & Automation",
                  "Product Development",
                  "Analytics",
                  "E-commerce"
                ].map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Mentor Profile - Victor */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">VR</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Victor del Rosal</h2>
                <p className="text-xl text-gray-600">Mentor</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              An acclaimed AI educator and Chief AI Officer at fiveinnolabs, serves as a leading mentor in the AI space. 
              He is a respected lecturer for the Masters in AI for Business at the National College of Ireland, with a decade 
              of teaching experience. Victor is dedicated to demystifying AI and its transformative potential through strategic 
              training programs.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-300">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-700">Chief AI Officer at fiveinnolabs</span>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gray-700">Lecturer - National College of Ireland</span>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-300">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Linkedin className="h-5 w-5 text-green-600" />
                </div>
                <a 
                  href="https://www.linkedin.com/in/victordelrosal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 flex items-center space-x-2 transition-colors duration-300"
                >
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <Separator className="my-8" />

            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">Achievements</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "Author: Humanlike AI",
                  "Author: Disruption",
                  "Distinguished Teaching Award",
                  "AI & Generative AI Expert",
                  "Digital Transformation"
                ].map((achievement) => (
                  <Badge 
                    key={achievement} 
                    variant="secondary"
                    className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-300"
                  >
                    {achievement}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Vision */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-20 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            Prospectify is designed to help small and medium-sized business (SMB) marketing teams 
            identify the best European cities for targeted campaigns using real-time demographic 
            and economic data from trusted sources like Eurostat and INSEE.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Reduce Guesswork</h4>
              <p className="text-gray-600">Eliminate uncertainty in regional targeting with data-backed insights</p>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Improve Campaign ROI</h4>
              <p className="text-gray-600">Maximize return on investment through strategic city selection</p>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Enhance Customer Engagement</h4>
              <p className="text-gray-600">Connect with the right audiences in the right locations</p>
            </div>
          </div>
        </div>

        {/* Community Impact Section */}
                {/* Community Impact */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-20 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Community Impact</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            We believe in building not just a product, but a community of data-driven marketers 
            who can make informed decisions that drive real business growth.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 hover:shadow-lg transition-all duration-300">
              <h4 className="font-semibold text-gray-900 mb-3 text-lg">Educational Resources</h4>
              <p className="text-gray-600">
                We provide comprehensive guides, tutorials, and best practices for using demographic 
                data in marketing campaigns across European markets.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <h4 className="font-semibold text-gray-900 mb-3 text-lg">Data Accessibility</h4>
              <p className="text-gray-600">
                Making complex demographic and economic data accessible and actionable for SMB 
                marketing teams without requiring extensive data science expertise.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Data-Driven</h4>
              <p className="text-gray-600">
                Every recommendation is backed by real, verified data from trusted European sources
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Accessible</h4>
              <p className="text-gray-600">
                Complex data made simple and actionable for marketing teams of all sizes
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Community-First</h4>
              <p className="text-gray-600">
                Building tools that serve the marketing community and drive collective success
              </p>
            </div>
          </div>
        </div>

        {/* Connect Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Let's Connect
            </h2>
            <p className="text-gray-600 text-xl">
              Ready to revolutionize your marketing campaigns? Get in touch with us
            </p>
          </div>

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
              className="flex items-center space-x-3 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 group px-8 py-6 text-lg"
            >
              <a 
                href="https://www.linkedin.com/in/mani-kanta-ms" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                <span>Connect on LinkedIn</span>
                <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="mt-12">
            <div className="flex justify-center space-x-4 mb-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-500"></div>
            </div>
            <p className="text-gray-500 text-sm">
              Join thousands of businesses already using Prospectify
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
