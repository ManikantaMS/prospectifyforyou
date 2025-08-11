import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, TrendingUp, Users, Target, Sparkles } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Inc.",
      content:
        "Prospectify helped us identify 3 new markets that increased our revenue by 40% in just 6 months. The demographic insights were spot-on!",
      rating: 5,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      icon: Target
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "GrowthCorp",
      content:
        "The AI-powered recommendations saved us months of market research. We expanded to 5 new cities with confidence and saw immediate results.",
      rating: 5,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      icon: TrendingUp
    },
    {
      name: "Emily Rodriguez",
      role: "Business Development",
      company: "ScaleUp Solutions",
      content:
        "The real-time analytics and customer profiling features are game-changers. We can now make data-driven expansion decisions quickly.",
      rating: 5,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      icon: Users
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Flowing background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-10 right-1/4 w-20 h-20 bg-cyan-300/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-10 left-1/4 w-28 h-28 bg-green-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Flowing pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-blue-600 mr-3 animate-pulse" />
            <span className="text-blue-600 font-semibold text-lg tracking-wide uppercase">Testimonials</span>
            <Sparkles className="w-8 h-8 text-blue-600 ml-3 animate-pulse" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
            Trusted by Growing Businesses
          </h2>
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            See how companies like yours are using Prospectify to accelerate their growth with 
            <span className="text-blue-600 font-semibold"> AI-powered intelligence</span> and 
            <span className="text-purple-600 font-semibold"> data-driven expansion</span>.
          </p>
          
          {/* Decorative flowing line */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-4 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`group relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-gradient-to-br ${testimonial.bgGradient} backdrop-blur-sm overflow-hidden animate-fadeIn`}
              style={{animationDelay: `${index * 0.2}s`}}
            >
              {/* Flowing glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Flowing border glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
              
              {/* Floating quote icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-lg border border-white/40">
                <Quote className={`w-6 h-6 bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`} style={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }} />
              </div>
              
              <CardContent className="p-8 relative">
                {/* Flowing star rating */}
                <div className="flex mb-6 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-5 w-5 text-yellow-400 fill-current animate-pulse mr-1" 
                      style={{animationDelay: `${i * 0.1}s`}}
                    />
                  ))}
                </div>
                
                {/* Enhanced testimonial content */}
                <p className="text-gray-700 mb-8 italic text-lg leading-relaxed group-hover:text-gray-800 transition-colors">
                  "{testimonial.content}"
                </p>
                
                {/* Profile section with icon */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.company}
                    </p>
                  </div>
                  
                  {/* Company icon */}
                  <div className={`p-3 bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 group-hover:scale-110 transition-transform duration-300`}>
                    <testimonial.icon className={`w-6 h-6 bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`} style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }} />
                  </div>
                </div>
              </CardContent>
              
              {/* Flowing bottom shine */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Card>
          ))}
        </div>
        
        {/* Flowing CTA section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <Users className="w-6 h-6 text-white mr-3 group-hover:animate-pulse" />
            <span className="text-white font-semibold text-lg">Join Thousands of Successful Businesses</span>
            <Sparkles className="w-6 h-6 text-white ml-3 animate-pulse" />
          </div>
          <p className="text-gray-600 mt-4 text-lg">
            Experience AI-powered growth intelligence today
          </p>
        </div>
      </div>
    </section>
  )
}
