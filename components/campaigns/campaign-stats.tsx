"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, Target, TrendingUp, Clock, CheckCircle } from "lucide-react"

const stats = [
  {
    title: "Active Campaigns",
    value: "12",
    change: "+2 this week",
    icon: Activity,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Total Reach",
    value: "47.2K",
    change: "+12% from last month",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Conversion Rate",
    value: "3.8%",
    change: "+0.5% improvement",
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    title: "ROI",
    value: "245%",
    change: "+18% this quarter",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
]

export function CampaignStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
