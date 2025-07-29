"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    campaignUpdates: true,
    analyticsReports: true,
    systemAlerts: true,
    marketingEmails: false,
    weeklyDigest: true,
    frequency: "daily"
  })

  const handleToggle = (setting: string) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Notification Preferences</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notification Channels */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Channels</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <Label htmlFor="email-notifications" className="text-sm font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-4 w-4 text-gray-500" />
                <div>
                  <Label htmlFor="push-notifications" className="text-sm font-medium">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-gray-500">Browser and app notifications</p>
                </div>
              </div>
              <Switch
                id="push-notifications"
                checked={notifications.pushNotifications}
                onCheckedChange={() => handleToggle("pushNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-4 w-4 text-gray-500" />
                <div>
                  <Label htmlFor="sms-notifications" className="text-sm font-medium">
                    SMS Notifications
                  </Label>
                  <p className="text-sm text-gray-500">Critical alerts via text message</p>
                </div>
              </div>
              <Switch
                id="sms-notifications"
                checked={notifications.smsNotifications}
                onCheckedChange={() => handleToggle("smsNotifications")}
              />
            </div>
          </div>
        </div>

        {/* Notification Types */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">What to be notified about</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="campaign-updates" className="text-sm font-medium">
                  Campaign Updates
                </Label>
                <p className="text-sm text-gray-500">Status changes, completion alerts</p>
              </div>
              <Switch
                id="campaign-updates"
                checked={notifications.campaignUpdates}
                onCheckedChange={() => handleToggle("campaignUpdates")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics-reports" className="text-sm font-medium">
                  Analytics Reports
                </Label>
                <p className="text-sm text-gray-500">Performance insights and ROI updates</p>
              </div>
              <Switch
                id="analytics-reports"
                checked={notifications.analyticsReports}
                onCheckedChange={() => handleToggle("analyticsReports")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="system-alerts" className="text-sm font-medium">
                  System Alerts
                </Label>
                <p className="text-sm text-gray-500">Service updates and maintenance</p>
              </div>
              <Switch
                id="system-alerts"
                checked={notifications.systemAlerts}
                onCheckedChange={() => handleToggle("systemAlerts")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weekly-digest" className="text-sm font-medium">
                  Weekly Digest
                </Label>
                <p className="text-sm text-gray-500">Summary of your marketing performance</p>
              </div>
              <Switch
                id="weekly-digest"
                checked={notifications.weeklyDigest}
                onCheckedChange={() => handleToggle("weeklyDigest")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing-emails" className="text-sm font-medium">
                  Marketing Emails
                </Label>
                <p className="text-sm text-gray-500">Tips, best practices, and product updates</p>
              </div>
              <Switch
                id="marketing-emails"
                checked={notifications.marketingEmails}
                onCheckedChange={() => handleToggle("marketingEmails")}
              />
            </div>
          </div>
        </div>

        {/* Email Frequency */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Email Frequency</h3>
          <div className="max-w-xs">
            <Label htmlFor="frequency">Digest Frequency</Label>
            <Select 
              value={notifications.frequency} 
              onValueChange={(value) => setNotifications(prev => ({ ...prev, frequency: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
