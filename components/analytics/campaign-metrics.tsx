"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Eye, MousePointer, DollarSign, Calendar, MapPin } from "lucide-react"

const performanceData = [
  { date: "Jan", impressions: 180000, clicks: 8640, conversions: 432, revenue: 21600 },
  { date: "Feb", impressions: 220000, clicks: 11000, conversions: 550, revenue: 27500 },
  { date: "Mar", impressions: 280000, clicks: 14000, conversions: 700, revenue: 35000 },
  { date: "Apr", impressions: 320000, clicks: 16000, conversions: 800, revenue: 40000 },
  { date: "May", impressions: 380000, clicks: 19000, conversions: 950, revenue: 47500 },
  { date: "Jun", impressions: 420000, clicks: 21000, conversions: 1050, revenue: 52500 },
]

const campaignData = [
  {
    id: "CAMP-001",
    name: "Madrid Fashion Week Pop-up",
    status: "Active",
    city: "Madrid",
    budget: "€15,000",
    spent: "€12,400",
    impressions: "245K",
    clicks: "12.3K",
    conversions: "590",
    roi: "285%",
    progress: 83,
  },
  {
    id: "CAMP-002",
    name: "Barcelona Beauty Launch",
    status: "Active",
    city: "Barcelona",
    budget: "€10,000",
    spent: "€8,750",
    impressions: "180K",
    clicks: "9.2K",
    conversions: "420",
    roi: "320%",
    progress: 88,
  },
  {
    id: "CAMP-003",
    name: "Valencia Electronics Expo",
    status: "Completed",
    city: "Valencia",
    budget: "€8,000",
    spent: "€7,950",
    impressions: "120K",
    clicks: "6.8K",
    conversions: "310",
    roi: "195%",
    progress: 99,
  },
  {
    id: "CAMP-004",
    name: "Seville Food Festival",
    status: "Paused",
    city: "Seville",
    budget: "€5,000",
    spent: "€2,100",
    impressions: "45K",
    clicks: "2.1K",
    conversions: "95",
    roi: "140%",
    progress: 42,
  },
]

export function CampaignMetrics() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Performance Trends</span>
          </CardTitle>
          <CardDescription>Monthly campaign performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              impressions: {
                label: "Impressions",
                color: "hsl(var(--chart-1))",
              },
              clicks: {
                label: "Clicks",
                color: "hsl(var(--chart-2))",
              },
              conversions: {
                label: "Conversions",
                color: "hsl(var(--chart-3))",
              },
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="impressions"
                  stroke="var(--color-impressions)"
                  strokeWidth={2}
                  name="Impressions"
                />
                <Line type="monotone" dataKey="clicks" stroke="var(--color-clicks)" strokeWidth={2} name="Clicks" />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  stroke="var(--color-conversions)"
                  strokeWidth={2}
                  name="Conversions"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Campaign List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <span>Active Campaigns</span>
          </CardTitle>
          <CardDescription>Detailed performance metrics for each campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaignData.map((campaign, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                      <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {campaign.city}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {campaign.id}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{campaign.roi}</div>
                    <p className="text-xs text-gray-500">ROI</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{campaign.spent}</p>
                      <p className="text-xs text-gray-500">of {campaign.budget}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{campaign.impressions}</p>
                      <p className="text-xs text-gray-500">Impressions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MousePointer className="h-4 w-4 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{campaign.clicks}</p>
                      <p className="text-xs text-gray-500">Clicks</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{campaign.conversions}</p>
                      <p className="text-xs text-gray-500">Conversions</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget Progress</span>
                    <span className="font-medium">{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
