import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Brain, Target, TrendingUp } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Data",
      description: "Import your customer data or create detailed customer profiles using our intuitive interface.",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description:
        "Our advanced AI algorithms analyze demographic patterns and market trends to understand your ideal customer.",
    },
    {
      icon: Target,
      title: "Get Recommendations",
      description:
        "Receive ranked city recommendations with detailed demographic breakdowns and market potential scores.",
    },
    {
      icon: TrendingUp,
      title: "Track Performance",
      description: "Monitor your expansion success with real-time analytics and performance tracking tools.",
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
