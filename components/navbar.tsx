"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Target, Sparkles } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      {/* Flowing background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-white/50 to-purple-50/30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-20">
          <div className="flex flex-col items-start justify-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <Target className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Prospectify</span>
            </Link>
            <span className="text-xs sm:text-sm text-blue-700 font-semibold ml-12 mt-0.5 tracking-wide">Locate. Engage. Grow.</span>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 text-lg font-medium transition-all duration-200 hover:scale-105 relative group">
              Features
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600 text-lg font-medium transition-all duration-200 hover:scale-105 relative group">
              How it Works
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/resources" className="text-gray-600 hover:text-blue-600 text-lg font-medium transition-all duration-200 hover:scale-105 relative group">
              Resources
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 text-lg font-medium transition-all duration-200 hover:scale-105 relative group">
              Pricing
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/compliance" className="text-gray-600 hover:text-blue-600 text-lg font-medium transition-all duration-200 hover:scale-105 relative group">
              Compliance
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 text-lg font-medium transition-all duration-200 hover:scale-105 relative group">
              About
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 text-lg font-medium transition-all duration-200 hover:scale-105 relative group">
              Contact
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            
            {/* Flowing separator */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            
            <Link href="/login" className="text-blue-700 font-bold text-lg hover:text-blue-800 transition-all duration-200 hover:scale-105 relative group">
              Login
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-60"></div>
            </Link>
            
            <Button asChild className="ml-2 px-6 py-2 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-gray-600 hover:text-blue-600 bg-white/50 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl border-t border-gray-200/50 rounded-b-xl">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link
                href="#features"
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                How it Works
              </Link>
              <Link
                href="/resources"
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/pricing"
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/compliance"
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Compliance
              </Link>
              <Link
                href="/about"
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile auth section */}
              <div className="pt-4 space-y-3 border-t border-gray-200/50">
                <Link
                  href="/login"
                  className="block px-4 py-3 text-blue-700 font-bold hover:bg-blue-50/50 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <div className="px-4">
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
