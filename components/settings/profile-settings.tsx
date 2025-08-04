"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Building, MapPin, Camera } from "lucide-react"

export function ProfileSettings() {
  const [profile, setProfile] = useState({
    firstName: "Demo",
    lastName: "User",
    email: "demo@prospectify.com",
    company: "Prospectify Demo",
    jobTitle: "Marketing Manager",
    location: "San Francisco, CA",
    bio: "Experienced marketing professional focused on demographic targeting and customer acquisition.",
    phone: "+1 (555) 123-4567",
    website: "https://prospectify.com",
    photo: ""
  })

  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>("/placeholder-user.jpg")

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Profile Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Feature Description */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-blue-900 text-sm">
          Manage your personal and professional information, update your profile photo, and keep your account details up to date. This section helps personalize your experience and ensures your contact details are accurate for notifications and collaboration.
        </div>
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={photoPreview} alt="Profile" />
            <AvatarFallback className="text-lg font-semibold">DU</AvatarFallback>
          </Avatar>
          <div>
            <input
              type="file"
              accept="image/*"
              id="photo-upload"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
            <Button variant="outline" size="sm" onClick={() => document.getElementById("photo-upload")?.click()}>
              <Camera className="h-4 w-4 mr-2" />
              Change Photo
            </Button>
            <p className="text-sm text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={profile.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={profile.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={profile.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>

        {/* Professional Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="company"
                  value={profile.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={profile.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={profile.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              rows={3}
              placeholder="Tell us about yourself and your marketing goals..."
            />
          </div>
        </div>

        {/* Save Button */}
        {/* Auto-optimization Feature */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🤖</span>
            AI Auto-optimization Settings
          </h3>
          <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <Label htmlFor="autoOptimization" className="text-sm font-medium flex items-center">
                  Enable Auto-optimization
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">AI Powered</span>
                </Label>
                <p className="text-sm text-green-700 mt-1">
                  <strong>Let AI optimize your campaigns automatically for best results.</strong>
                </p>
                <div className="mt-2 text-xs text-green-800">
                  When enabled, Prospectify's AI will:
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Automatically adjust campaign budgets and bids</li>
                    <li>Optimize demographic targeting based on performance</li>
                    <li>Improve ad placement and timing</li>
                    <li>Learn from successful campaigns to boost ROI</li>
                  </ul>
                </div>
              </div>
              <Switch
                id="autoOptimization"
                checked={true}
                onCheckedChange={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t pt-6">
          <div className="flex justify-end">
            <Button 
              onClick={() => {
                // Handle save profile logic
                console.log("Profile updated:", profile, photoFile)
                // Show success toast in real implementation
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
