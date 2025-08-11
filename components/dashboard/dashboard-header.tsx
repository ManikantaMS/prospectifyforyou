"use client"

import { Button } from "@/components/ui/button"
import { Target, User, Settings, LogOut, Shield } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const { logout, isAdmin } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      console.log("🚪 Logout initiated...")
      await logout()
      // Force navigation after logout
      window.location.href = "/"
    } catch (error) {
      console.error("Logout error:", error)
      // Force logout even if there's an error
      window.location.href = "/"
    }
  }

  return (
    <header className="bg-gradient-to-r from-white via-blue-50/30 to-purple-50/30 shadow-lg border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 cursor-default group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Target className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">Prospectify</span>
            </div>
            <div className="hidden md:block">
              <nav className="flex space-x-1">
                <Link href="/dashboard" className="px-4 py-2 rounded-lg text-gray-900 font-medium hover:bg-blue-100 hover:text-blue-900 transition-all duration-200">
                  Dashboard
                </Link>
                <Link href="/dashboard/analytics" className="px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-100 hover:text-blue-900 transition-all duration-200">
                  Analytics
                </Link>
                <Link href="/dashboard/campaigns" className="px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-100 hover:text-blue-900 transition-all duration-200">
                  Campaigns
                </Link>
              </nav>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAdmin && (
              <Button variant="ghost" size="sm" asChild className="hover:bg-purple-100 hover:text-purple-900 transition-all duration-200">
                <Link href="/admin">
                  <div className="p-1 rounded-md bg-purple-100 mr-2">
                    <Shield className="h-4 w-4 text-purple-600" />
                  </div>
                  Admin
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild className="hover:bg-blue-100 hover:text-blue-900 transition-all duration-200">
              <Link href="/dashboard/settings">
                <div className="p-1 rounded-md bg-gray-100 mr-2">
                  <Settings className="h-4 w-4 text-gray-600" />
                </div>
                Settings
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="hover:bg-green-100 hover:text-green-900 transition-all duration-200">
              <Link href="/dashboard/profile">
                <div className="p-1 rounded-md bg-green-100 mr-2">
                  <User className="h-4 w-4 text-green-600" />
                </div>
                Profile
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 hover:text-red-900 transition-all duration-200 shadow-sm"
            >
              <div className="p-1 rounded-md bg-red-100 mr-2">
                <LogOut className="h-4 w-4 text-red-600" />
              </div>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
