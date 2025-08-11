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
      <div className={`flex items-center justify-between p-4 rounded-xl border-0 shadow-sm transition-all duration-200 ${
        connectionStatus?.success && !connectionStatus?.usingMock
          ? 'bg-gradient-to-r from-green-50 to-emerald-50' 
          : 'bg-gradient-to-r from-amber-50 to-yellow-50'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            connectionStatus?.success && !connectionStatus?.usingMock
              ? 'bg-green-100' 
              : 'bg-amber-100'
          }`}>
            <Database className={`h-5 w-5 ${
              connectionStatus?.success && !connectionStatus?.usingMock
                ? 'text-green-600' 
                : 'text-amber-600'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Database Status</h3>
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
          className={`font-bold tracking-wide ${
            connectionStatus?.success && !connectionStatus?.usingMock
              ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200"
              : "bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-200"
          }`}
        >
          {connectionStatus?.success && !connectionStatus?.usingMock ? "🟢 LIVE" : "🟡 DEMO"}
        </Badge>
      </div>

      {/* Stats Grid */}
            {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${
                  stat.color === 'text-blue-600' ? 'from-blue-100 to-blue-200' :
                  stat.color === 'text-green-600' ? 'from-green-100 to-green-200' :
                  stat.color === 'text-purple-600' ? 'from-purple-100 to-purple-200' :
                  'from-orange-100 to-orange-200'
                }`}>
                  <IconComponent className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {stat.description}
                  </p>
                  <Badge variant="secondary" className={`text-xs px-2 py-1 ${
                    stat.color === 'text-blue-600' ? 'bg-blue-100 text-blue-700' :
                    stat.color === 'text-green-600' ? 'bg-green-100 text-green-700' :
                    stat.color === 'text-purple-600' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
