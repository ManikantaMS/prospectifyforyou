import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, MapPin, Users, Zap, Shield, Globe } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: MapPin,
      title: "Smart City Recommendations",
      description: "AI-powered analysis of demographic data to find the perfect cities for your target market.",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Live demographic insights and market trends to make informed business decisions.",
    },
    {
      icon: Users,
      title: "Customer Profiling",
      description: "Create detailed customer profiles and find cities with matching demographics.",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get market recommendations in seconds, not weeks of manual research.",
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Enterprise-grade security to protect your business intelligence and customer data.",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Access demographic data from cities worldwide for international expansion.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Market Intelligence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to identify and analyze your target markets with precision and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
