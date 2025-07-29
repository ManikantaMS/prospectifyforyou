"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  MoreHorizontal, 
  Play, 
  Pause, 
  BarChart3, 
  Edit, 
  Copy, 
  Trash2,
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const mockCampaigns = [
  {
    id: 1,
    name: "Summer Tech Promotion",
    status: "active",
    targetCities: ["San Francisco", "Seattle", "Austin"],
    budget: "$15,000",
    spent: "$8,240",
    progress: 55,
    startDate: "2025-07-01",
    endDate: "2025-08-31",
    impressions: "234.5K",
    clicks: "12.3K",
    conversions: "456",
    ctr: "5.2%",
    demographics: "Tech professionals, 25-40, $75K+"
  },
  {
    id: 2,
    name: "Healthcare Awareness Campaign",
    status: "active",
    targetCities: ["Boston", "Denver", "Portland"],
    budget: "$22,000",
    spent: "$11,200",
    progress: 51,
    startDate: "2025-06-15",
    endDate: "2025-09-15",
    impressions: "189.2K",
    clicks: "8.9K",
    conversions: "312",
    ctr: "4.7%",
    demographics: "Healthcare workers, 28-50, $60K+"
  },
  {
    id: 3,
    name: "Student Discount Drive",
    status: "paused",
    targetCities: ["Madison", "Ann Arbor", "Chapel Hill"],
    budget: "$8,500",
    spent: "$3,100",
    progress: 36,
    startDate: "2025-07-10",
    endDate: "2025-08-20",
    impressions: "156.8K",
    clicks: "15.2K",
    conversions: "892",
    ctr: "9.7%",
    demographics: "College students, 18-25, <$30K"
  },
  {
    id: 4,
    name: "Luxury Retail Expansion",
    status: "completed",
    targetCities: ["Manhattan", "Beverly Hills", "Miami"],
    budget: "$45,000",
    spent: "$44,850",
    progress: 100,
    startDate: "2025-05-01",
    endDate: "2025-06-30",
    impressions: "567.3K",
    clicks: "18.4K",
    conversions: "1,234",
    ctr: "3.2%",
    demographics: "High income, 30-55, $150K+"
  },
  {
    id: 5,
    name: "Green Energy Initiative",
    status: "draft",
    targetCities: ["Phoenix", "Las Vegas", "Tucson"],
    budget: "$18,000",
    spent: "$0",
    progress: 0,
    startDate: "2025-08-01",
    endDate: "2025-10-31",
    impressions: "0",
    clicks: "0",
    conversions: "0",
    ctr: "0%",
    demographics: "Eco-conscious, 25-45, $50K+"
  }
]

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
    case "paused":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Paused</Badge>
    case "completed":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>
    case "draft":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export function CampaignList() {
  const [campaigns, setCampaigns] = useState(mockCampaigns)

  const handleStatusChange = (id: number, newStatus: string) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id ? { ...campaign, status: newStatus } : campaign
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">All Campaigns</h3>
        <div className="text-sm text-gray-500">
          {campaigns.length} campaigns total
        </div>
      </div>

      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    {getStatusBadge(campaign.status)}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {campaign.targetCities.join(", ")}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {campaign.startDate} - {campaign.endDate}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {campaign.spent} / {campaign.budget}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Campaign
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/analytics">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {campaign.status === "active" ? (
                      <DropdownMenuItem onClick={() => handleStatusChange(campaign.id, "paused")}>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause Campaign
                      </DropdownMenuItem>
                    ) : campaign.status === "paused" ? (
                      <DropdownMenuItem onClick={() => handleStatusChange(campaign.id, "active")}>
                        <Play className="h-4 w-4 mr-2" />
                        Resume Campaign
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Campaign
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget Progress</span>
                    <span className="font-medium">{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>

                {/* Demographics */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-900 mb-1">Target Demographics</div>
                  <div className="text-sm text-gray-600">{campaign.demographics}</div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{campaign.impressions}</div>
                    <div className="text-xs text-gray-500">Impressions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{campaign.clicks}</div>
                    <div className="text-xs text-gray-500">Clicks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{campaign.conversions}</div>
                    <div className="text-xs text-gray-500">Conversions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{campaign.ctr}</div>
                    <div className="text-xs text-gray-500">CTR</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
