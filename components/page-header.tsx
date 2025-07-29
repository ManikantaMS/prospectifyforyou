"use client"

import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Target } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

interface PageHeaderProps {
  title?: string | ReactNode
  subtitle?: string | ReactNode
  showHomeButton?: boolean
  showBackButton?: boolean
  showLogo?: boolean
  className?: string
}

export function PageHeader({ 
  title, 
  subtitle, 
  showHomeButton = true, 
  showBackButton = true, 
  showLogo = false,
  className = "" 
}: PageHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    // Try to go back in history, fallback to home
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <div className={`mb-8 ${className}`}>
      {/* Navigation Row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {showLogo && (
            <Link href="/" className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Prospectify</span>
            </Link>
          )}
          
          {showBackButton && (
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center space-x-2 bg-white hover:bg-gray-50 transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          )}
          
          {showHomeButton && !showBackButton && (
            <Button 
              variant="outline" 
              asChild 
              className="flex items-center space-x-2 bg-white hover:bg-gray-50 transition-colors duration-300"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>
          )}
        </div>

        {/* Home button on the right if we have back button */}
        {showBackButton && showHomeButton && (
          <Button 
            variant="ghost" 
            size="sm"
            asChild 
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
          >
            <Link href="/" className="flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </Button>
        )}
      </div>

      {/* Title Section */}
      {(title || subtitle) && (
        <div className="text-center">
          {title && (
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
