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
        <div className="flex justify-between h-20">
          <div className="flex flex-col items-start justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <Target className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Prospectify</span>
            </Link>
            <span className="text-xs sm:text-sm text-blue-700 font-semibold ml-12 mt-0.5 tracking-wide">Locate. Engage. Grow.</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 text-lg">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-lg">
              How it Works
            </Link>
            <Link href="/resources" className="text-gray-600 hover:text-gray-900 text-lg">
              Resources
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 text-lg">
              Pricing
            </Link>
            <Link href="/compliance" className="text-gray-600 hover:text-gray-900 text-lg">
              Compliance
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 text-lg">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-lg">
              Contact
            </Link>
            <Link href="/login" className="text-blue-700 font-bold text-lg underline underline-offset-4 hover:text-blue-800 transition">
              Login
            </Link>
            <Button asChild className="ml-2 px-5 py-2 text-lg">
              <Link href="/signup">Sign Up</Link>
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
                href="/resources"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/compliance"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Compliance
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Contact
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
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
