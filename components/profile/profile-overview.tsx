"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Edit
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

export function ProfileOverview() {
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
                <AvatarFallback className="text-xl font-semibold">DU</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold text-gray-900">Demo User</h3>
              <p className="text-gray-600">Marketing Manager</p>
              <Badge variant="secondary" className="mt-2">Pro Account</Badge>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">demo@prospectify.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Building className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Prospectify Demo</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Joined November 2024</span>
              </div>
            </div>

            {/* Action Button */}
            <Button className="w-full" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
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
