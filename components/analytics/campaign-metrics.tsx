"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Eye, MousePointer, DollarSign, Calendar, MapPin, Target, Users, BarChart3, TrendingDown } from "lucide-react"
import { useAnalytics, filterCampaignData } from "@/lib/analytics-context"

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

export default function CampaignMetrics() {
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaignData[0] | null>(null)
  const { campaignFilter, refreshTrigger } = useAnalytics()
  const [filteredCampaigns, setFilteredCampaigns] = useState(campaignData)

  // Update filtered campaigns when filter or refresh trigger changes
  useEffect(() => {
    const filtered = filterCampaignData(campaignData, campaignFilter)
    setFilteredCampaigns(filtered)
  }, [campaignFilter, refreshTrigger])

  // Export campaign data as CSV
  const handleExportData = (campaign: typeof campaignData[0]) => {
    const csvData = [
      ['Metric', 'Value'],
      ['Campaign ID', campaign.id],
      ['Campaign Name', campaign.name],
      ['Target City', campaign.city],
      ['Status', campaign.status],
      ['Budget', campaign.budget],
      ['Spent', campaign.spent],
      ['Impressions', campaign.impressions],
      ['Clicks', campaign.clicks],
      ['Conversions', campaign.conversions],
      ['ROI', campaign.roi],
      ['Progress', `${campaign.progress}%`],
      ['Click-through Rate', '5.02%'],
      ['Conversion Rate', '4.80%'],
      ['Cost per Click', '€1.01'],
      ['Cost per Acquisition', '€21.02'],
      ['Start Date', 'January 15, 2024'],
      ['End Date', 'March 15, 2024'],
      ['Target Location', 'Madrid, Spain'],
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `${campaign.name.replace(/\s+/g, '_')}_Analytics_Report.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Generate optimization recommendations
  const handleOptimizeCampaign = (campaign: typeof campaignData[0]) => {
    const optimizationSuggestions = [
      "🎯 Increase budget allocation by 15% for peak performance hours (2-6 PM)",
      "📍 Expand targeting to include nearby cities with similar demographics",
      "💡 A/B test creative variations to improve click-through rate",
      "⏰ Adjust bid strategy for better cost per acquisition",
      "📊 Focus spending on high-converting audience segments",
      "🔄 Implement dynamic retargeting for cart abandoners",
    ]

    const recommendations = optimizationSuggestions.slice(0, 4).join('\n\n')
    
    alert(`🚀 CAMPAIGN OPTIMIZATION RECOMMENDATIONS\n\nFor: ${campaign.name}\nCurrent ROI: ${campaign.roi}\n\n${recommendations}\n\n💡 Would you like to apply these optimizations automatically?`)
  }
  
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
            <Badge variant="secondary" className="ml-auto">
              {filteredCampaigns.length} {campaignFilter === "all-campaigns" ? "Total" : campaignFilter}
            </Badge>
          </CardTitle>
          <CardDescription>
            Detailed performance metrics for each campaign
            {campaignFilter !== "all-campaigns" && ` (${campaignFilter} only)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCampaigns.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No campaigns found for the selected filter.</p>
                <p className="text-sm">Try selecting a different campaign type.</p>
              </div>
            ) : (
              filteredCampaigns.map((campaign, index) => (
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedCampaign(campaign)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-2">
                            <Target className="h-5 w-5 text-blue-600" />
                            <span>{campaign.name}</span>
                            <Badge
                              variant={
                                campaign.status === "Active" ? "default" :
                                campaign.status === "Completed" ? "secondary" : "destructive"
                              }
                              className={getStatusColor(campaign.status)}
                            >
                              {campaign.status}
                            </Badge>
                          </DialogTitle>
                          <DialogDescription>
                            Campaign ID: {campaign.id} • Target City: {campaign.city}
                          </DialogDescription>
                        </DialogHeader>
                        
                        {/* Campaign Details Content */}
                        <div className="space-y-6 mt-6">
                          {/* Budget & Performance Overview */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <DollarSign className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-900">Budget</span>
                              </div>
                              <p className="text-2xl font-bold text-blue-900">{campaign.budget}</p>
                              <p className="text-sm text-blue-700">Spent: {campaign.spent}</p>
                            </div>
                            
                            <div className="bg-green-50 p-4 rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium text-green-900">ROI</span>
                              </div>
                              <p className="text-2xl font-bold text-green-900">{campaign.roi}</p>
                              <p className="text-sm text-green-700">Return on Investment</p>
                            </div>
                            
                            <div className="bg-orange-50 p-4 rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <Eye className="h-4 w-4 text-orange-600" />
                                <span className="text-sm font-medium text-orange-900">Impressions</span>
                              </div>
                              <p className="text-2xl font-bold text-orange-900">{campaign.impressions}</p>
                              <p className="text-sm text-orange-700">Total Views</p>
                            </div>
                            
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <Users className="h-4 w-4 text-purple-600" />
                                <span className="text-sm font-medium text-purple-900">Conversions</span>
                              </div>
                              <p className="text-2xl font-bold text-purple-900">{campaign.conversions}</p>
                              <p className="text-sm text-purple-700">Total Sales</p>
                            </div>
                          </div>
                          
                          {/* Budget Progress */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-3">Budget Utilization</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-medium">{campaign.progress}%</span>
                              </div>
                              <Progress value={campaign.progress} className="h-3" />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Spent: {campaign.spent}</span>
                                <span>Budget: {campaign.budget}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Performance Metrics */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900">Key Metrics</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-white border rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <MousePointer className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm text-gray-600">Click-through Rate</span>
                                  </div>
                                  <span className="font-semibold">5.02%</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white border rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-gray-600">Conversion Rate</span>
                                  </div>
                                  <span className="font-semibold">4.80%</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white border rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <DollarSign className="h-4 w-4 text-purple-600" />
                                    <span className="text-sm text-gray-600">Cost per Click</span>
                                  </div>
                                  <span className="font-semibold">€1.01</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white border rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <Target className="h-4 w-4 text-red-600" />
                                    <span className="text-sm text-gray-600">Cost per Acquisition</span>
                                  </div>
                                  <span className="font-semibold">€21.02</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900">Campaign Timeline</h4>
                              <div className="space-y-3">
                                <div className="flex items-center space-x-3 p-3 bg-white border rounded-lg">
                                  <Calendar className="h-4 w-4 text-blue-600" />
                                  <div>
                                    <p className="text-sm font-medium">Start Date</p>
                                    <p className="text-xs text-gray-500">January 15, 2024</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-white border rounded-lg">
                                  <Calendar className="h-4 w-4 text-green-600" />
                                  <div>
                                    <p className="text-sm font-medium">End Date</p>
                                    <p className="text-xs text-gray-500">March 15, 2024</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-white border rounded-lg">
                                  <MapPin className="h-4 w-4 text-orange-600" />
                                  <div>
                                    <p className="text-sm font-medium">Target Location</p>
                                    <p className="text-xs text-gray-500">{campaign.city}, Spain</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Mini Performance Chart */}
                          <div className="bg-white border rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-4">Performance Trend</h4>
                            <div className="h-48">
                              <ChartContainer
                                config={{
                                  clicks: {
                                    label: "Clicks",
                                    color: "#3b82f6",
                                  },
                                  conversions: {
                                    label: "Conversions", 
                                    color: "#10b981",
                                  },
                                }}
                                className="h-full w-full"
                              >
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={performanceData.slice(0, 4)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Line 
                                      type="monotone" 
                                      dataKey="clicks" 
                                      stroke="#3b82f6" 
                                      strokeWidth={2}
                                      name="Clicks"
                                    />
                                    <Line 
                                      type="monotone" 
                                      dataKey="conversions" 
                                      stroke="#10b981" 
                                      strokeWidth={2}
                                      name="Conversions"
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </ChartContainer>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex justify-between items-center pt-4 border-t">
                            <div className="flex space-x-2">
                              <Badge variant="outline" className="text-xs">
                                Last updated: 2 hours ago
                              </Badge>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleExportData(campaign)}
                              >
                                <BarChart3 className="h-4 w-4 mr-2" />
                                Export Data
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleOptimizeCampaign(campaign)}
                              >
                                <Target className="h-4 w-4 mr-2" />
                                Optimize Campaign
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
