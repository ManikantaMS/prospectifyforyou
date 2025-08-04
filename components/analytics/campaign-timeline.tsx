"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Clock, MapPin, TrendingUp, Target, Users, AlertTriangle, CheckCircle } from "lucide-react"
import { useAnalytics } from "@/lib/analytics-context"

// Utility function for consistent date formatting across server and client
const formatDateConsistently = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const timelineEvents = [
  {
    date: "2024-01-15",
    time: "09:00",
    event: "Campaign Launch",
    campaign: "Madrid Fashion Week Pop-up",
    city: "Madrid",
    status: "success",
    details: "Campaign successfully launched with €15K budget",
  },
  {
    date: "2024-01-18",
    time: "14:30",
    event: "Milestone Reached",
    campaign: "Madrid Fashion Week Pop-up",
    city: "Madrid",
    status: "success",
    details: "Reached 50% of target conversions in 3 days",
  },
  {
    date: "2024-01-22",
    time: "11:15",
    event: "Campaign Launch",
    campaign: "Barcelona Beauty Launch",
    city: "Barcelona",
    status: "success",
    details: "New campaign started targeting beauty segment",
  },
  {
    date: "2024-01-25",
    time: "16:45",
    event: "Budget Alert",
    campaign: "Valencia Electronics Expo",
    city: "Valencia",
    status: "warning",
    details: "Campaign approaching 80% budget utilization",
  },
  {
    date: "2024-01-28",
    time: "10:20",
    event: "Campaign Paused",
    campaign: "Seville Food Festival",
    city: "Seville",
    status: "paused",
    details: "Campaign paused due to low performance metrics",
  },
  {
    date: "2024-01-30",
    time: "13:00",
    event: "Campaign Completed",
    campaign: "Valencia Electronics Expo",
    city: "Valencia",
    status: "completed",
    details: "Campaign completed successfully with 195% ROI",
  },
]

// Extended timeline for full view
const fullTimelineEvents = [
  ...timelineEvents,
  {
    date: "2024-02-01",
    time: "09:30",
    event: "A/B Test Started",
    campaign: "Madrid Fashion Week Pop-up",
    city: "Madrid",
    status: "success",
    details: "Started testing two creative variations for better CTR",
  },
  {
    date: "2024-02-03",
    time: "15:45",
    event: "Audience Expansion",
    campaign: "Barcelona Beauty Launch",
    city: "Barcelona",
    status: "success",
    details: "Expanded targeting to include similar demographics in nearby cities",
  },
  {
    date: "2024-02-05",
    time: "12:20",
    event: "Budget Optimization",
    campaign: "Madrid Fashion Week Pop-up",
    city: "Madrid",
    status: "success",
    details: "Reallocated budget to high-performing time slots",
  },
  {
    date: "2024-02-07",
    time: "10:00",
    event: "Campaign Launch",
    campaign: "Bilbao Tech Conference",
    city: "Bilbao",
    status: "success",
    details: "New B2B campaign targeting tech professionals",
  },
  {
    date: "2024-02-10",
    time: "14:15",
    event: "Performance Alert",
    campaign: "Barcelona Beauty Launch",
    city: "Barcelona",
    status: "warning",
    details: "CPA increased by 25%, reviewing targeting parameters",
  },
  {
    date: "2024-02-12",
    time: "11:30",
    event: "Creative Refresh",
    campaign: "Valencia Electronics Expo",
    city: "Valencia",
    status: "success",
    details: "Updated ad creatives based on performance data",
  },
  {
    date: "2024-02-15",
    time: "16:00",
    event: "Milestone Achieved",
    campaign: "Bilbao Tech Conference",
    city: "Bilbao",
    status: "success",
    details: "Reached 1000 qualified leads ahead of schedule",
  },
  {
    date: "2024-02-18",
    time: "13:45",
    event: "Campaign Paused",
    campaign: "Barcelona Beauty Launch",
    city: "Barcelona",
    status: "paused",
    details: "Temporarily paused for strategy optimization",
  },
  {
    date: "2024-02-20",
    time: "09:15",
    event: "Campaign Resumed",
    campaign: "Barcelona Beauty Launch",
    city: "Barcelona",
    status: "success",
    details: "Resumed with improved targeting and new creatives",
  },
  {
    date: "2024-02-22",
    time: "17:30",
    event: "ROI Milestone",
    campaign: "Madrid Fashion Week Pop-up",
    city: "Madrid",
    status: "completed",
    details: "Campaign completed with 285% ROI - exceeding targets",
  },
]

export function CampaignTimeline() {
  const [showFullTimeline, setShowFullTimeline] = useState(false)
  const { campaignFilter, refreshTrigger } = useAnalytics()
  const [filteredEvents, setFilteredEvents] = useState(timelineEvents)
  const [filteredFullEvents, setFilteredFullEvents] = useState(fullTimelineEvents)

  // Filter timeline events based on campaign filter
  useEffect(() => {
    const filterTimelineEvents = (events: typeof timelineEvents) => {
      if (campaignFilter === "all-campaigns") return events
      
      // Map campaign filter to campaign names or statuses
      const campaignMappings: { [key: string]: string[] } = {
        "active": ["Madrid Fashion Week Pop-up", "Barcelona Beauty Launch", "Bilbao Tech Conference"],
        "completed": ["Valencia Electronics Expo", "Granada Art Exhibition"],
        "paused": ["Seville Food Festival"]
      }
      
      const relevantCampaigns = campaignMappings[campaignFilter] || []
      return events.filter(event => 
        relevantCampaigns.some(campaign => event.campaign.includes(campaign.split(' ')[0]))
      )
    }

    setFilteredEvents(filterTimelineEvents(timelineEvents))
    setFilteredFullEvents(filterTimelineEvents(fullTimelineEvents))
  }, [campaignFilter, refreshTrigger])
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "paused":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "paused":
        return <Clock className="h-4 w-4 text-red-600" />
      case "completed":
        return <Target className="h-4 w-4 text-blue-600" />
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-purple-600" />
          <span>Campaign Timeline</span>
        </CardTitle>
        <CardDescription>Recent campaign activities and milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No timeline events found for the selected filter.</p>
              <p className="text-sm">Try selecting a different campaign type.</p>
            </div>
          ) : (
            filteredEvents.map((event, index) => (
            <div key={index} className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-b-0">
              <div className="flex-shrink-0 mt-1">
                <div
                  className={`p-2 rounded-full ${
                    event.status === "success"
                      ? "bg-green-100"
                      : event.status === "warning"
                        ? "bg-yellow-100"
                        : event.status === "paused"
                          ? "bg-red-100"
                          : event.status === "completed"
                            ? "bg-blue-100"
                            : "bg-gray-100"
                  }`}
                >
                  {getStatusIcon(event.status)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900">{event.event}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(event.status)} variant="secondary">
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDateConsistently(event.date)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {event.time}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.city}
                  </span>
                </div>

                <p className="text-sm font-medium text-gray-700 mb-1">{event.campaign}</p>
                <p className="text-sm text-gray-600">{event.details}</p>
              </div>
            </div>
            ))
          )}
        </div>

        <div className="mt-4 text-center">
          <Dialog open={showFullTimeline} onOpenChange={setShowFullTimeline}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                View Full Timeline →
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span>Complete Campaign Timeline</span>
                </DialogTitle>
                <DialogDescription>
                  Comprehensive view of all campaign activities, milestones, and performance events
                </DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="h-[60vh] w-full">
                <div className="space-y-4 pr-4">
                  {filteredFullEvents.map((event, index) => (
                    <div key={index} className="flex space-x-4 pb-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.status === "success"
                              ? "bg-green-100"
                              : event.status === "warning"
                                ? "bg-yellow-100"
                                : event.status === "paused"
                                  ? "bg-red-100"
                                  : event.status === "completed"
                                    ? "bg-blue-100"
                                    : "bg-gray-100"
                          }`}
                        >
                          {getStatusIcon(event.status)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-900">{event.event}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(event.status)} variant="secondary">
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDateConsistently(event.date)}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.time}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.city}
                          </span>
                        </div>

                        <p className="text-sm font-medium text-gray-700 mb-1">{event.campaign}</p>
                        <p className="text-sm text-gray-600">{event.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-500">
                  Showing {filteredFullEvents.length} events 
                  {campaignFilter === "all-campaigns" ? "across all campaigns" : `for ${campaignFilter} campaigns`}
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFullTimeline(false)}
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
