"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import WaitlistForm from "@/components/waitlist-form"

export default function HomePage() {
  const [showWaitlist, setShowWaitlist] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {showWaitlist ? (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
          <WaitlistForm onClose={() => setShowWaitlist(false)} />
        </div>
      ) : (
        <>
          <HeroSection onGetDemo={() => setShowWaitlist(true)} />
          <FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <CTASection onGetDemo={() => setShowWaitlist(true)} />
          <Footer />
        </>
      )}
    </div>
  )
}
