"use client"

import { Bell, Search, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SettingsHeader() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
          </div>
          <div className="flex items-center space-x-4">
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
