import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Check, Star, Zap, Crown, Rocket } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for small businesses testing the waters",
      icon: Star,
      features: [
        "5 city recommendations per month",
        "Basic demographic data",
        "Email support",
        "Standard analytics",
        "1 user account",
      ],
      limitations: ["Limited to Spain only", "No export functionality", "Basic insights only"],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Professional",
      price: "€29",
      period: "/month",
      description: "Ideal for growing marketing teams",
      icon: Zap,
      features: [
        "Unlimited city recommendations",
        "Full EU demographic data",
        "Priority email support",
        "Advanced analytics & insights",
        "Up to 5 user accounts",
        "Campaign tracking",
        "Data export (PDF, Excel)",
        "Custom industry filters",
        "Real-time data updates",
      ],
      cta: "Start 14-Day Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "€99",
      period: "/month",
      description: "For large teams and agencies",
      icon: Crown,
      features: [
        "Everything in Professional",
        "Unlimited user accounts",
        "Phone & chat support",
        "Custom integrations",
        "API access",
        "White-label reports",
        "Dedicated account manager",
        "Custom data sources",
        "Advanced predictive analytics",
        "SLA guarantee",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="h-8 w-8 text-blue-600 mr-3" />
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              Simple, Transparent Pricing
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">Choose Your Perfect Plan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. All plans include access to official EU demographic data and our powerful
            city recommendation engine.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              No setup fees
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              Cancel anytime
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              14-day free trial
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "border-2 border-blue-500 shadow-xl scale-105" : "border shadow-lg"} hover:shadow-xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      plan.popular ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <plan.icon className={`h-8 w-8 ${plan.popular ? "text-blue-600" : "text-gray-600"}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-500">{plan.period}</span>}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"
                    }`}
                    size="lg"
                    asChild
                  >
                    <Link href="/signup">{plan.cta}</Link>
                  </Button>

                  {plan.name === "Starter" && (
                    <p className="text-center text-sm text-gray-500 mt-4">No credit card required</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
                <p className="text-gray-600">
                  Yes! Professional and Enterprise plans come with a 14-day free trial. No credit card required.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How fresh is the demographic data?</h3>
                <p className="text-gray-600">
                  Our data is updated every 30 minutes from official Eurostat and national statistical sources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
