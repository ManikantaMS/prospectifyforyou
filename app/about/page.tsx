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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Navigation Back to Home */}
        <div className="mb-8">
          <Button variant="outline" asChild className="flex items-center space-x-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Prospectify</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering SMB marketing teams with data-driven insights for targeted European campaigns
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Founder Profile */}
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">MM</span>
                </div>
                <div>
                  <CardTitle className="text-2xl">Manikanta MS</CardTitle>
                  <CardDescription className="text-lg">Founder & Lead Strategist</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-6">
                An accomplished entrepreneur and business strategist with a strong background in sales, 
                operations, e-commerce, and product development. Currently pursuing an MSc in AI for 
                Business at the National College of Ireland to further leverage AI for business innovation, 
                decision-making, and automation.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Lead Analyst at EY</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">MSc in AI for Business - National College of Ireland</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="h-5 w-5 text-blue-600" />
                  <a 
                    href="https://www.linkedin.com/in/mani-kanta-ms" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 transition-colors"
                  >
                    <span>Connect on LinkedIn</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Core Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Data-driven Solutions",
                    "Business Strategy", 
                    "AI & Automation",
                    "Product Development",
                    "Analytics",
                    "E-commerce"
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Vision */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-blue-600" />
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-6">
                Prospectify is designed to help small and medium-sized business (SMB) marketing teams 
                identify the best European cities for targeted campaigns using real-time demographic 
                and economic data from trusted sources like Eurostat and INSEE.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Reduce Guesswork</h4>
                    <p className="text-gray-600 text-sm">Eliminate uncertainty in regional targeting with data-backed insights</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Improve Campaign ROI</h4>
                    <p className="text-gray-600 text-sm">Maximize return on investment through strategic city selection</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Enhance Customer Engagement</h4>
                    <p className="text-gray-600 text-sm">Connect with the right audiences in the right locations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Impact Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-red-500" />
              <span>Community Impact</span>
            </CardTitle>
            <CardDescription>
              Beyond business, we believe in giving back to the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Education & Literacy</h4>
                <p className="text-gray-700">
                  Volunteering with the India Literacy Project, helping train students in using 
                  low-cost science kits to make quality education more accessible.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Cybersecurity Awareness</h4>
                <p className="text-gray-700">
                  Conducting awareness sessions for school children on cybersecurity, educating 
                  them about online threats and digital safety practices.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Our Values</CardTitle>
            <CardDescription>
              The principles that guide our work and commitment to excellence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Data-Driven Excellence</h4>
                <p className="text-gray-600 text-sm">
                  We believe in the power of accurate data to drive informed business decisions
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Customer Success</h4>
                <p className="text-gray-600 text-sm">
                  Your success is our success. We're committed to delivering measurable results
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Continuous Innovation</h4>
                <p className="text-gray-600 text-sm">
                  We continuously evolve our platform to meet changing market needs
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connect Section */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Let's Connect</CardTitle>
            <CardDescription>
              Ready to revolutionize your marketing campaigns? Get in touch with us
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button asChild size="lg" className="flex items-center space-x-2">
                <Link href="/signup">
                  <Target className="h-5 w-5" />
                  <span>Start Your Journey</span>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild className="flex items-center space-x-2">
                <a 
                  href="https://www.linkedin.com/in/mani-kanta-ms" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
