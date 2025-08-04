"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Key, 
  Smartphone, 
  Lock, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  EyeOff,
  Calendar,
  MapPin,
  Monitor
} from "lucide-react"

const loginSessions = [
  {
    id: 1,
    device: "Chrome on MacBook Pro",
    location: "San Francisco, CA",
    lastActive: "Now (current session)",
    ipAddress: "192.168.1.100",
    isCurrent: true
  },
  {
    id: 2,
    device: "Safari on iPhone 14",
    location: "San Francisco, CA",
    lastActive: "2 hours ago",
    ipAddress: "192.168.1.101",
    isCurrent: false
  },
  {
    id: 3,
    device: "Chrome on Windows",
    location: "Oakland, CA",
    lastActive: "1 day ago",
    ipAddress: "10.0.0.45",
    isCurrent: false
  }
]

export function ProfileSecurity() {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    loginNotifications: true,
    sessionTimeout: true,
    passwordVisible: false,
    newPassword: "",
    confirmPassword: ""
  })

  const handleSecurityChange = (key: string, value: boolean | string) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Security & Access</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            Password
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900">Strong Password</p>
                  <p className="text-sm text-green-700">Last changed 2 months ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </div>
            
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={securitySettings.passwordVisible ? "text" : "password"}
                      value={securitySettings.newPassword}
                      onChange={(e) => handleSecurityChange("newPassword", e.target.value)}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => handleSecurityChange("passwordVisible", !securitySettings.passwordVisible)}
                    >
                      {securitySettings.passwordVisible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={securitySettings.passwordVisible ? "text" : "password"}
                    value={securitySettings.confirmPassword}
                    onChange={(e) => handleSecurityChange("confirmPassword", e.target.value)}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={!securitySettings.newPassword || securitySettings.newPassword !== securitySettings.confirmPassword}>
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Smartphone className="h-4 w-4 mr-2" />
            Two-Factor Authentication
          </h3>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${securitySettings.twoFactorEnabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                <Shield className={`h-5 w-5 ${securitySettings.twoFactorEnabled ? 'text-green-600' : 'text-gray-500'}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  2FA is {securitySettings.twoFactorEnabled ? 'enabled' : 'disabled'}
                </p>
                <p className="text-sm text-gray-500">
                  {securitySettings.twoFactorEnabled 
                    ? 'Using authenticator app for additional security'
                    : 'Add an extra layer of security to your account'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {securitySettings.twoFactorEnabled && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Active
                </Badge>
              )}
              <Switch
                checked={securitySettings.twoFactorEnabled}
                onCheckedChange={(checked) => handleSecurityChange("twoFactorEnabled", checked)}
              />
            </div>
          </div>
        </div>

        {/* Security Preferences */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Security Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="loginNotifications" className="text-sm font-medium">
                  Login Notifications
                </Label>
                <p className="text-sm text-gray-500">Get notified of new login attempts</p>
              </div>
              <Switch
                id="loginNotifications"
                checked={securitySettings.loginNotifications}
                onCheckedChange={(checked) => handleSecurityChange("loginNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sessionTimeout" className="text-sm font-medium">
                  Auto Session Timeout
                </Label>
                <p className="text-sm text-gray-500">Log out after 30 minutes of inactivity</p>
              </div>
              <Switch
                id="sessionTimeout"
                checked={securitySettings.sessionTimeout}
                onCheckedChange={(checked) => handleSecurityChange("sessionTimeout", checked)}
              />
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Monitor className="h-4 w-4 mr-2" />
            Active Sessions
          </h3>
          <div className="space-y-3">
            {loginSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Monitor className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900">{session.device}</p>
                      {session.isCurrent && (
                        <Badge variant="secondary" className="text-xs">Current</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {session.location}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {session.lastActive}
                      </span>
                    </div>
                  </div>
                </div>
                {!session.isCurrent && (
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Log out all other sessions
            </Button>
          </div>
        </div>

        {/* Account Actions */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
          <div className="flex justify-end mb-4">
            <Button onClick={() => console.log('Saving security settings...', securitySettings)}>
              Save Security Settings
            </Button>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Key className="h-4 w-4 mr-2" />
              Download Account Data
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
