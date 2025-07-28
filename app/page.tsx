import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
