"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MapPin, TrendingUp, Users, Euro } from "lucide-react"

const cityPerformanceData = [
  { city: "Madrid", revenue: 52500, conversions: 1050, roi: 285, growth: 12 },
  { city: "Barcelona", revenue: 47500, conversions: 950, roi: 320, growth: 18 },
  { city: "Valencia", revenue: 35000, conversions: 700, roi: 195, growth: 8 },
  { city: "Seville", revenue: 21600, conversions: 432, roi: 140, growth: -3 },
]

const cityDetails = [
  {
    city: "Madrid",
    campaigns: 8,
    avgCost: "€18.50",
    conversionRate: "4.9%",
    topCategory: "Fashion",
    performance: "Excellent",
    trend: "up",
  },
  {
    city: "Barcelona",
    campaigns: 6,
    avgCost: "€16.20",
    conversionRate: "5.2%",
    topCategory: "Beauty",
    performance: "Excellent",
    trend: "up",
  },
  {
    city: "Valencia",
    campaigns: 5,
    avgCost: "€14.80",
    conversionRate: "4.1%",
    topCategory: "Electronics",
    performance: "Good",
    trend: "up",
  },
  {
    city: "Seville",
    campaigns: 4,
    avgCost: "€19.90",
    conversionRate: "3.2%",
    topCategory: "Food & Beverage",
    performance: "Needs Improvement",
    trend: "down",
  },
]

export function CityPerformance() {
  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Excellent":
        return "bg-green-100 text-green-800"
      case "Good":
        return "bg-blue-100 text-blue-800"
      case "Needs Improvement":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          <span>City Performance Analysis</span>
        </CardTitle>
        <CardDescription>Detailed performance metrics by target city</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Revenue Chart */}
        <div className="mb-6">
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
              conversions: {
                label: "Conversions",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue (€)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* City Details */}
        <div className="space-y-4">
          {cityDetails.map((city, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="font-semibold text-gray-900">{city.city}</h3>
                    <Badge className={getPerformanceColor(city.performance)}>{city.performance}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">{city.campaigns} active campaigns</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className={`h-4 w-4 ${city.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                    <span className={`text-sm font-medium ${city.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {cityPerformanceData.find((c) => c.city === city.city)?.growth}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">vs last month</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div className="flex items-center space-x-2">
                  <Euro className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{city.avgCost}</p>
                    <p className="text-xs text-gray-500">Avg Cost/Conv</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{city.conversionRate}</p>
                    <p className="text-xs text-gray-500">Conv Rate</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{city.topCategory}</p>
                    <p className="text-xs text-gray-500">Top Category</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {cityPerformanceData.find((c) => c.city === city.city)?.roi}%
                    </p>
                    <p className="text-xs text-gray-500">ROI</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Performance Score</span>
                  <span className="font-medium">{cityPerformanceData.find((c) => c.city === city.city)?.roi}%</span>
                </div>
                <Progress value={cityPerformanceData.find((c) => c.city === city.city)?.roi || 0} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
