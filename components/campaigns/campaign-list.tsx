"use client"

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
import { useCampaigns } from "@/lib/campaign-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
  const { filteredCampaigns, updateCampaign, searchTerm, statusFilter } = useCampaigns()
  const router = useRouter()

  const handleStatusChange = (id: number, newStatus: "active" | "paused" | "completed" | "draft") => {
    updateCampaign(id, { status: newStatus })
  }

  const handleViewAnalytics = (campaignId: number) => {
    router.push('/dashboard/analytics')
  }

  const getFilterDescription = () => {
    let description = `${filteredCampaigns.length} campaigns`
    if (searchTerm) {
      description += ` matching "${searchTerm}"`
    }
    if (statusFilter !== "all") {
      description += ` with status "${statusFilter}"`
    }
    return description
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">All Campaigns</h3>
        <div className="text-sm text-gray-500">
          {getFilterDescription()}
        </div>
      </div>

      {filteredCampaigns.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            {searchTerm || statusFilter !== "all" ? (
              <div>
                <p className="text-lg font-medium mb-2">No campaigns found</p>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-medium mb-2">No campaigns yet</p>
                <p>Create your first campaign to get started</p>
              </div>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredCampaigns.map((campaign) => (
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
                      <DropdownMenuItem onClick={() => handleViewAnalytics(campaign.id)}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate Campaign
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
      )}
    </div>
  )
}
