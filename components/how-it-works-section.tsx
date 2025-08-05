import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Search, Calendar, TrendingUp } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Chat with AI Assistant",
      description: "Start by chatting with our AI assistant to define your business goals and target customers.",
    },
    {
      icon: Search,
      title: "Discover Opportunities",
      description:
        "Get AI-powered city recommendations and discover relevant events for your target market.",
    },
    {
      icon: Calendar,
      title: "Book & Manage Campaigns",
      description:
        "Register for events, book physical marketing stalls, and manage your campaigns from one dashboard.",
    },
    {
      icon: TrendingUp,
      title: "Track Performance",
      description: "Monitor campaign success with real-time analytics, lead tracking, and ROI insights.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How Prospectify Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Four simple steps to discover your next market opportunity and accelerate your business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-full">
                    <step.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-sm font-semibold text-blue-600 mb-2">STEP {index + 1}</div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
