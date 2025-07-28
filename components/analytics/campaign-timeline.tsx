"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, TrendingUp } from "lucide-react"

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

export function CampaignTimeline() {
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
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "paused":
        return <Clock className="h-4 w-4 text-red-600" />
      case "completed":
        return <TrendingUp className="h-4 w-4 text-blue-600" />
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
          {timelineEvents.map((event, index) => (
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
                    {new Date(event.date).toLocaleDateString()}
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

        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View Full Timeline →</button>
        </div>
      </CardContent>
    </Card>
  )
}
