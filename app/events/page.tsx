"use client"

import { Suspense, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, TrendingUp, Smartphone } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface Event {
  id: string
  title: string
  date: string
  location: string
  attendees: number
  matchRate: number
  roi: number
  category: string
  cost: number
  status: 'recommended' | 'registered' | 'completed'
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Consumer Electronics Expo',
    date: 'March 20-22, 2024',
    location: 'Copenhagen',
    attendees: 15000,
    matchRate: 89,
    roi: 340,
    category: 'Technology',
    cost: 4500,
    status: 'recommended'
  },
  {
    id: '2',
    title: 'Berlin Tech Summit',
    date: 'March 15-17, 2024',
    location: 'Berlin',
    attendees: 25000,
    matchRate: 78,
    roi: 340,
    category: 'Technology',
    cost: 3500,
    status: 'recommended'
  },
  {
    id: '3',
    title: 'Stockholm Innovation Fair',
    date: 'May 20-22, 2024',
    location: 'Stockholm',
    attendees: 12000,
    matchRate: 85,
    roi: 290,
    category: 'Innovation',
    cost: 2800,
    status: 'registered'
  }
]

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">🎪 Events</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">📅 Event Calendar</TabsTrigger>
          <TabsTrigger value="registered">🎯 My Events</TabsTrigger>
          <TabsTrigger value="roi">📊 ROI Tracker</TabsTrigger>
          <TabsTrigger value="checkin">📱 Mobile Check-in</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockEvents.map((event) => (
              <Card key={event.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Badge variant={event.status === 'recommended' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {event.date}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        {event.attendees.toLocaleString()} attendees
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Match Rate: {event.matchRate}%</span>
                      <span className="flex items-center text-green-600">
                        <TrendingUp className="mr-1 h-4 w-4" />
                        {event.roi}% ROI
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">€{event.cost.toLocaleString()}</span>
                      <Button size="sm" onClick={() => setSelectedEvent(event)}>
                        {event.status === 'registered' ? 'View Details' : 'Register'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="registered" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🎯 My Registered Events</CardTitle>
              <CardDescription>Events you're participating in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvents.filter(e => e.status === 'registered').map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.date} • {event.location}</p>
                    </div>
                    <Badge variant="secondary">Registered</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📊 Event ROI Tracker</CardTitle>
              <CardDescription>Track performance across all events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">340%</div>
                    <div className="text-sm text-muted-foreground">Average ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">52K</div>
                    <div className="text-sm text-muted-foreground">Total Attendees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">€10.8K</div>
                    <div className="text-sm text-muted-foreground">Total Investment</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checkin" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📱 Mobile Check-in</CardTitle>
              <CardDescription>QR code scanning and lead capture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Smartphone className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Mobile check-in features coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </DashboardLayout>
  )
}
