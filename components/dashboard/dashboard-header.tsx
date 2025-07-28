"use client"

import { Button } from "@/components/ui/button"
import { Target, User, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Prospectify</span>
            </Link>
            <div className="hidden md:block">
              <nav className="flex space-x-8">
                <Link href="/dashboard" className="text-gray-900 font-medium">
                  Dashboard
                </Link>
                <Link href="/dashboard/analytics" className="text-gray-600 hover:text-gray-900">
                  Analytics
                </Link>
                <Link href="/dashboard/campaigns" className="text-gray-600 hover:text-gray-900">
                  Campaigns
                </Link>
              </nav>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <LogOut className="h-4 w-4 mr-2" />
                Exit Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
