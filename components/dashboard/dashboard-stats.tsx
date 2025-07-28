"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, MapPin, Target, Database, Activity } from "lucide-react"
import { useSupabaseData } from "./supabase-data-provider"

export function DashboardStats() {
  const { cities, loading, connectionStatus } = useSupabaseData()

  const stats = [
    {
      title: "Cities Analyzed",
      value: loading ? "..." : cities.length.toString(),
      description: "Available in database",
      icon: MapPin,
      trend: "+12%",
      color: "text-blue-600",
    },
    {
      title: "Market Opportunities",
      value: loading ? "..." : Math.floor(cities.length * 0.7).toString(),
      description: "High-potential markets",
      icon: Target,
      trend: "+8%",
      color: "text-green-600",
    },
    {
      title: "Active Campaigns",
      value: "24",
      description: "Currently running",
      icon: Activity,
      trend: "+15%",
      color: "text-purple-600",
    },
    {
      title: "Success Rate",
      value: "94%",
      description: "Recommendation accuracy",
      icon: TrendingUp,
      trend: "+2%",
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Connection Status Banner */}
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
        <div className="flex items-center space-x-3">
          <Database className="h-5 w-5 text-gray-600" />
          <div>
            <h3 className="font-medium text-gray-900">Database Status</h3>
            <p className="text-sm text-gray-600">
              {connectionStatus?.usingMock
                ? "Running in demo mode with mock data"
                : connectionStatus?.success
                  ? "Connected to live Supabase database"
                  : "Attempting to connect..."}
            </p>
          </div>
        </div>
        <Badge
          variant={connectionStatus?.success && !connectionStatus?.usingMock ? "default" : "secondary"}
          className={
            connectionStatus?.success && !connectionStatus?.usingMock
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }
        >
          {connectionStatus?.success && !connectionStatus?.usingMock ? "🟢 LIVE" : "🟡 DEMO"}
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs">{stat.description}</CardDescription>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  {stat.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
