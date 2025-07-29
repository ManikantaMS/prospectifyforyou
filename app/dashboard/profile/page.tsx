import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileOverview } from "@/components/profile/profile-overview"
import { ProfileActivity } from "@/components/profile/profile-activity"
import { ProfilePreferences } from "@/components/profile/profile-preferences"
import { ProfileSecurity } from "@/components/profile/profile-security"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation & Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            </div>
          </div>
        </div>

        {/* Page Description */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">👤 Profile Management</h2>
          <p className="text-sm text-blue-700">
            View and manage your personal information, activity history, and account preferences. 
            Keep your profile up-to-date for better campaign targeting recommendations.
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Overview */}
          <ProfileOverview />
          
          {/* Recent Activity */}
          <ProfileActivity />
          
          {/* Preferences */}
          <ProfilePreferences />
          
          {/* Security Settings */}
          <ProfileSecurity />
        </div>
      </div>
    </div>
  )
}
