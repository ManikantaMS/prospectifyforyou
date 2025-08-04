"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, Target, TrendingUp, Clock, CheckCircle } from "lucide-react"
import { useCampaigns } from "@/lib/campaign-context"

export function CampaignStats() {
  const { campaigns } = useCampaigns()
  
  const activeCampaigns = campaigns.filter(c => c.status === "active").length
  const completedCampaigns = campaigns.filter(c => c.status === "completed").length
  const draftCampaigns = campaigns.filter(c => c.status === "draft").length
  const pausedCampaigns = campaigns.filter(c => c.status === "paused").length
  
  const stats = [
    {
      title: "Active Campaigns",
      value: activeCampaigns.toString(),
      change: `${draftCampaigns} drafts ready`,
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Total Campaigns",
      value: campaigns.length.toString(),
      change: `${pausedCampaigns} paused`,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Completed",
      value: completedCampaigns.toString(),
      change: "All time completed",
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Success Rate",
      value: campaigns.length > 0 ? `${Math.round((completedCampaigns / campaigns.length) * 100)}%` : "0%",
      change: "Completion rate",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ]

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
