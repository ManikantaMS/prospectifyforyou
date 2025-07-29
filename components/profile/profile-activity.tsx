"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Activity, 
  Play, 
  Pause, 
  BarChart3, 
  Plus, 
  Settings, 
  User,
  Eye,
  Calendar
} from "lucide-react"

const recentActivity = [
  {
    id: 1,
    type: "campaign_created",
    title: "Created 'Summer Tech Promotion' campaign",
    description: "Targeting San Francisco, Seattle, Austin",
    timestamp: "2 hours ago",
    icon: Plus,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    id: 2,
    type: "campaign_paused",
    title: "Paused 'Student Discount Drive' campaign",
    description: "Budget optimization needed",
    timestamp: "1 day ago",
    icon: Pause,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100"
  },
  {
    id: 3,
    type: "analytics_viewed",
    title: "Viewed analytics dashboard",
    description: "Healthcare campaign performance review",
    timestamp: "2 days ago",
    icon: BarChart3,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    id: 4,
    type: "profile_updated",
    title: "Updated profile information",
    description: "Changed company and job title",
    timestamp: "3 days ago",
    icon: User,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    id: 5,
    type: "campaign_completed",
    title: "Completed 'Luxury Retail Expansion' campaign",
    description: "340% ROI achieved",
    timestamp: "5 days ago",
    icon: BarChart3,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    id: 6,
    type: "settings_changed",
    title: "Updated notification preferences",
    description: "Enabled weekly digest emails",
    timestamp: "1 week ago",
    icon: Settings,
    color: "text-gray-600",
    bgColor: "bg-gray-100"
  }
]

const activityStats = [
  { label: "Actions Today", value: "8", change: "+2 from yesterday" },
  { label: "This Week", value: "34", change: "+12% from last week" },
  { label: "Login Streak", value: "15 days", change: "Personal best!" }
]

function getActivityIcon(type: string) {
  switch (type) {
    case "campaign_created":
      return Plus
    case "campaign_paused":
      return Pause
    case "campaign_resumed":
      return Play
    case "analytics_viewed":
      return BarChart3
    case "profile_updated":
      return User
    case "settings_changed":
      return Settings
    default:
      return Activity
  }
}

export function ProfileActivity() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Activity Stats */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Activity Stats</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activityStats.map((stat, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.change}</div>
              </div>
            ))}
            
            <div className="pt-4 border-t">
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                View Full History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Feed */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = getActivityIcon(activity.type)
                return (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.title}
                        </p>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {activity.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 pt-4 border-t text-center">
              <Button variant="outline" size="sm">
                Load More Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
