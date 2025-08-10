"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from "@/hooks/use-toast"
import { 
  User, 
  Mail, 
  Building, 
  MapPin, 
  Calendar, 
  Target, 
  BarChart3, 
  Trophy,
  Clock,
  Edit,
  Save,
  X
} from "lucide-react"

const userStats = [
  {
    label: "Campaigns Created",
    value: "24",
    change: "+3 this month",
    icon: Target,
    color: "text-blue-600"
  },
  {
    label: "Total Reach",
    value: "142.5K",
    change: "+18% growth",
    icon: BarChart3,
    color: "text-green-600"
  },
  {
    label: "Best ROI",
    value: "340%",
    change: "Luxury campaign",
    icon: Trophy,
    color: "text-yellow-600"
  },
  {
    label: "Account Age",
    value: "8 months",
    change: "Since Nov 2024",
    icon: Clock,
    color: "text-purple-600"
  }
]

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "E-commerce",
  "Manufacturing",
  "Consulting",
  "Real Estate",
  "Education",
  "Marketing & Advertising",
  "Other"
]

export function ProfileOverview() {
  const { user } = useAuth()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    company: user?.company || '',
    industry: user?.industry || ''
  })

  const supabase = createClientComponentClient()

  const handleSaveProfile = async () => {
    if (!user?.id) return

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('users')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          company_name: formData.company,
          industry: formData.industry
        })
        .eq('id', user.id)

      if (error) throw error

      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
      })
      
      setIsEditOpen(false)
      // Trigger a page refresh to show updated data
      window.location.reload()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase()
    }
    return 'DU'
  }

  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`
    }
    if (user?.firstName) {
      return user.firstName
    }
    return user?.email?.split('@')[0] || 'Demo User'
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Profile Card */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture & Basic Info */}
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                <AvatarFallback className="text-xl font-semibold">{getInitials()}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold text-gray-900">{getDisplayName()}</h3>
              <p className="text-gray-600">{user?.company ? `${user.company}` : 'Marketing Manager'}</p>
              <Badge variant="secondary" className="mt-2">
                {user?.role === 'admin' ? 'Admin Account' : 'Pro Account'}
              </Badge>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{user?.email || 'No email set'}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Building className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{user?.company || 'No company set'}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{user?.industry || 'No industry set'}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Joined November 2024</span>
              </div>
            </div>

            {/* Action Button */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Edit Profile</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      disabled
                      className="bg-gray-100"
                      placeholder="Email cannot be changed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email is managed by your account settings</p>
                  </div>

                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select 
                      value={formData.industry} 
                      onValueChange={(value) => handleInputChange('industry', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditOpen(false)}
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveProfile} 
                      disabled={isLoading}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-3 bg-white rounded-lg">
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                      <div className="text-xs text-gray-500">{stat.change}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Achievement Badges */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Achievements</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-yellow-700 border-yellow-300 bg-yellow-50">
                  🏆 Campaign Expert
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">
                  📊 Analytics Pro
                </Badge>
                <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                  🎯 High Conversion
                </Badge>
                <Badge variant="outline" className="text-purple-700 border-purple-300 bg-purple-50">
                  💡 Early Adopter
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
