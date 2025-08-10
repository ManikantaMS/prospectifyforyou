import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface CTASectionProps {
  onGetDemo?: () => void
}

export function CTASection({ onGetDemo }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Find Your Next Market?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Join thousands of businesses using Prospectify to make smarter expansion decisions. Start your free trial
          today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" onClick={onGetDemo}>
            Get Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
