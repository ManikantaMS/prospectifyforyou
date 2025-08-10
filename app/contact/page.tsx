import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, MapPin, Linkedin, ExternalLink, Phone, Clock } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Contact Us - Prospectify | Get in Touch",
  description: "Contact Prospectify for data-driven marketing solutions. Reach out to our team for inquiries, support, or to learn more about our European city targeting platform.",
  keywords: ["contact prospectify", "support", "inquiries", "data-driven marketing", "european campaigns"],
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader 
          title="Get in Touch"
          subtitle="Ready to revolutionize your marketing campaigns with data-driven insights? We'd love to hear from you and help you discover the perfect European cities for your business."
          showBackButton={true}
          showHomeButton={true}
        />

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a 
                    href="mailto:randomonlinem@gmail.com"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  >
                    randomonlinem@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                  <p className="text-gray-700">
                    Mayor Street Lower,<br />
                    International Financial Services Centre,<br />
                    Dublin 1, Ireland
                  </p>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Linkedin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">LinkedIn</h4>
                  <a 
                    href="https://www.linkedin.com/in/mani-kanta-ms" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 flex items-center space-x-2 transition-colors duration-300"
                  >
                    <span>Connect with us</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                  <p className="text-gray-700">
                    Monday - Friday: 9:00 AM - 6:00 PM (GMT)<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your marketing goals and how we can help..."
                ></textarea>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Don't wait to revolutionize your marketing campaigns. Start your journey with Prospectify today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
            >
              <Link href="/signup">
                Start Free Trial
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 px-8 py-3"
            >
              <Link href="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
