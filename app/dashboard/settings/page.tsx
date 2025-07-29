import { SettingsHeader } from "@/components/settings/settings-header"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { CampaignDefaults } from "@/components/settings/campaign-defaults"
import { IntegrationSettings } from "@/components/settings/integration-settings"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SettingsHeader />
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
              <SettingsIcon className="h-5 w-5 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            </div>
          </div>
        </div>

        {/* Page Description */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8">
          <h2 className="text-sm font-semibold text-purple-900 mb-2">⚙️ Account Settings</h2>
          <p className="text-sm text-purple-700">
            Manage your account preferences, notification settings, campaign defaults, 
            and integrations for your demographic marketing platform.
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Settings */}
          <ProfileSettings />
          
          {/* Notification Settings */}
          <NotificationSettings />
          
          {/* Campaign Defaults */}
          <CampaignDefaults />
          
          {/* Integration Settings */}
          <IntegrationSettings />
        </div>
      </div>
    </div>
  )
}
