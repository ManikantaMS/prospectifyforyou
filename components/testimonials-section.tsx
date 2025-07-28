import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Inc.",
      content:
        "Prospectify helped us identify 3 new markets that increased our revenue by 40% in just 6 months. The demographic insights were spot-on!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "GrowthCorp",
      content:
        "The AI-powered recommendations saved us months of market research. We expanded to 5 new cities with confidence and saw immediate results.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Business Development",
      company: "ScaleUp Solutions",
      content:
        "The real-time analytics and customer profiling features are game-changers. We can now make data-driven expansion decisions quickly.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Trusted by Growing Businesses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how companies like yours are using Prospectify to accelerate their growth and expansion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
