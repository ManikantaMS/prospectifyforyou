"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Target } from "lucide-react"

export interface CustomerProfile {
  age_range: [number, number]
  income_range: [number, number]
  education_levels: string[]
  interests: string[]
  location_preferences: string[]
}

interface CustomerProfileFormProps {
  onProfileChange?: (profile: CustomerProfile) => void
}

export function CustomerProfileForm({ onProfileChange }: CustomerProfileFormProps) {
  const [profile, setProfile] = useState<CustomerProfile>({
    age_range: [25, 45],
    income_range: [30000, 60000],
    education_levels: ["University"],
    interests: ["Technology"],
    location_preferences: ["Urban"],
  })

  const educationOptions = ["High School", "University", "Graduate", "Professional"]

  const interestOptions = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Retail",
    "Manufacturing",
    "Tourism",
    "Real Estate",
    "Food & Beverage",
    "Entertainment",
  ]

  const locationOptions = ["Urban", "Suburban", "Rural", "Coastal", "Mountain", "Metropolitan"]

  const handleEducationChange = (education: string, checked: boolean) => {
    const newEducationLevels = checked
      ? [...profile.education_levels, education]
      : profile.education_levels.filter((e) => e !== education)

    const newProfile = { ...profile, education_levels: newEducationLevels }
    setProfile(newProfile)
    onProfileChange?.(newProfile)
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    const newInterests = checked ? [...profile.interests, interest] : profile.interests.filter((i) => i !== interest)

    const newProfile = { ...profile, interests: newInterests }
    setProfile(newProfile)
    onProfileChange?.(newProfile)
  }

  const handleLocationChange = (location: string, checked: boolean) => {
    const newLocationPreferences = checked
      ? [...profile.location_preferences, location]
      : profile.location_preferences.filter((l) => l !== location)

    const newProfile = { ...profile, location_preferences: newLocationPreferences }
    setProfile(newProfile)
    onProfileChange?.(newProfile)
  }

  const handleAgeRangeChange = (index: number, value: string) => {
    const newAgeRange: [number, number] = [...profile.age_range]
    newAgeRange[index] = Number.parseInt(value) || 0
    const newProfile = { ...profile, age_range: newAgeRange }
    setProfile(newProfile)
    onProfileChange?.(newProfile)
  }

  const handleIncomeRangeChange = (index: number, value: string) => {
    const newIncomeRange: [number, number] = [...profile.income_range]
    newIncomeRange[index] = Number.parseInt(value) || 0
    const newProfile = { ...profile, income_range: newIncomeRange }
    setProfile(newProfile)
    onProfileChange?.(newProfile)
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5 text-blue-600" />
          <span>Customer Profile</span>
        </CardTitle>
        <CardDescription>Define your ideal customer to get personalized city recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Age Range */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Age Range</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min age"
              value={profile.age_range[0]}
              onChange={(e) => handleAgeRangeChange(0, e.target.value)}
              className="w-24"
            />
            <span className="text-gray-500">to</span>
            <Input
              type="number"
              placeholder="Max age"
              value={profile.age_range[1]}
              onChange={(e) => handleAgeRangeChange(1, e.target.value)}
              className="w-24"
            />
            <span className="text-sm text-gray-500">years</span>
          </div>
        </div>

        {/* Income Range */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Annual Income Range (€)</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min income"
              value={profile.income_range[0]}
              onChange={(e) => handleIncomeRangeChange(0, e.target.value)}
              className="w-32"
            />
            <span className="text-gray-500">to</span>
            <Input
              type="number"
              placeholder="Max income"
              value={profile.income_range[1]}
              onChange={(e) => handleIncomeRangeChange(1, e.target.value)}
              className="w-32"
            />
          </div>
        </div>

        {/* Education Levels */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Education Levels</Label>
          <div className="grid grid-cols-2 gap-3">
            {educationOptions.map((education) => (
              <div key={education} className="flex items-center space-x-2">
                <Checkbox
                  id={`education-${education}`}
                  checked={profile.education_levels.includes(education)}
                  onCheckedChange={(checked) => handleEducationChange(education, checked as boolean)}
                />
                <Label htmlFor={`education-${education}`} className="text-sm">
                  {education}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Industry Interests</Label>
          <div className="grid grid-cols-2 gap-3 max-h-32 overflow-y-auto">
            {interestOptions.map((interest) => (
              <div key={interest} className="flex items-center space-x-2">
                <Checkbox
                  id={`interest-${interest}`}
                  checked={profile.interests.includes(interest)}
                  onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                />
                <Label htmlFor={`interest-${interest}`} className="text-sm">
                  {interest}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Location Preferences */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Location Preferences</Label>
          <div className="grid grid-cols-2 gap-3">
            {locationOptions.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${location}`}
                  checked={profile.location_preferences.includes(location)}
                  onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                />
                <Label htmlFor={`location-${location}`} className="text-sm">
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full" onClick={() => onProfileChange?.(profile)}>
          <Target className="h-4 w-4 mr-2" />
          Find Matching Cities
        </Button>
      </CardContent>
    </Card>
  )
}
