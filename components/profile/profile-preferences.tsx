"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { 
  Settings, 
  Monitor, 
  Sun, 
  Moon, 
  Globe, 
  Calendar,
  Bell,
  Eye,
  Palette
} from "lucide-react"

export function ProfilePreferences() {
  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    timezone: "America/Los_Angeles",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
    emailDigest: true,
    autoSave: true,
    compactView: false,
    showTips: true,
    marketingUpdates: false
  })

  const handlePreferenceChange = (key: string, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case "light":
        return Sun
      case "dark":
        return Moon
      default:
        return Monitor
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Preferences</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Appearance */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select 
                value={preferences.theme} 
                onValueChange={(value) => handlePreferenceChange("theme", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center">
                      <Sun className="h-4 w-4 mr-2" />
                      Light
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center">
                      <Moon className="h-4 w-4 mr-2" />
                      Dark
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center">
                      <Monitor className="h-4 w-4 mr-2" />
                      System
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between pt-6">
              <div>
                <Label htmlFor="compactView" className="text-sm font-medium">
                  Compact View
                </Label>
                <p className="text-sm text-gray-500">Use condensed layout</p>
              </div>
              <Switch
                id="compactView"
                checked={preferences.compactView}
                onCheckedChange={(checked) => handlePreferenceChange("compactView", checked)}
              />
            </div>
          </div>
        </div>

        {/* Localization */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Localization
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="language">Language</Label>
              <Select 
                value={preferences.language} 
                onValueChange={(value) => handlePreferenceChange("language", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select 
                value={preferences.timezone} 
                onValueChange={(value) => handlePreferenceChange("timezone", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select 
                value={preferences.dateFormat} 
                onValueChange={(value) => handlePreferenceChange("dateFormat", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  <SelectItem value="DD MMM YYYY">DD MMM YYYY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select 
                value={preferences.currency} 
                onValueChange={(value) => handlePreferenceChange("currency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="CAD">CAD (C$)</SelectItem>
                  <SelectItem value="AUD">AUD (A$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Interface Options */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            Interface Options
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoSave" className="text-sm font-medium">
                  Auto-save
                </Label>
                <p className="text-sm text-gray-500">Automatically save changes</p>
              </div>
              <Switch
                id="autoSave"
                checked={preferences.autoSave}
                onCheckedChange={(checked) => handlePreferenceChange("autoSave", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showTips" className="text-sm font-medium">
                  Show Tips
                </Label>
                <p className="text-sm text-gray-500">Display helpful tips and onboarding</p>
              </div>
              <Switch
                id="showTips"
                checked={preferences.showTips}
                onCheckedChange={(checked) => handlePreferenceChange("showTips", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailDigest" className="text-sm font-medium">
                  Email Digest
                </Label>
                <p className="text-sm text-gray-500">Weekly summary of your activity</p>
              </div>
              <Switch
                id="emailDigest"
                checked={preferences.emailDigest}
                onCheckedChange={(checked) => handlePreferenceChange("emailDigest", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketingUpdates" className="text-sm font-medium">
                  Marketing Updates
                </Label>
                <p className="text-sm text-gray-500">Product news and feature updates</p>
              </div>
              <Switch
                id="marketingUpdates"
                checked={preferences.marketingUpdates}
                onCheckedChange={(checked) => handlePreferenceChange("marketingUpdates", checked)}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t pt-6">
          <div className="flex justify-end">
            <Button>
              Save Preferences
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
