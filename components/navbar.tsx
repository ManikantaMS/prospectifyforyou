"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Target } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Prospectify</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900">
              How it Works
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="#features"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                How it Works
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/login"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <div className="px-3 py-2">
                <Button asChild className="w-full">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
