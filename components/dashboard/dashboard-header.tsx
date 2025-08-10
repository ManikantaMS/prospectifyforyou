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
    await logout()
    router.push("/")
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 cursor-default">
              <Target className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Prospectify</span>
            </div>
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
            {isAdmin && (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
