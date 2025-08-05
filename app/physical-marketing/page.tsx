"use client"

import { Suspense, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, TrendingUp, Store, BarChart3, DollarSign } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface PhysicalCampaign {
  id: string
  name: string
  location: string
  stallType: string
  footTraffic: number
  leads: number
  cost: number
  revenue: number
  status: 'active' | 'planned' | 'completed'
}

const mockCampaigns: PhysicalCampaign[] = [
  {
    id: '1',
    name: 'Berlin Tech Summit Stall',
    location: 'Berlin Convention Center',
    stallType: 'Premium Corner',
    footTraffic: 2500,
    leads: 340,
    cost: 3500,
    revenue: 12500,
    status: 'active'
  },
  {
    id: '2',
    name: 'Copenhagen Innovation Stand',
    location: 'Copenhagen Expo',
    stallType: 'Standard',
    footTraffic: 1800,
    leads: 220,
    cost: 2500,
    revenue: 8900,
    status: 'completed'
  }
]

export default function PhysicalMarketingPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">🏪 Physical Marketing</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Store className="mr-2 h-4 w-4" />
            Book Stall
          </Button>
        </div>
      </div>

      <Tabs defaultValue="stalls" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stalls">🎪 Event Stalls</TabsTrigger>
          <TabsTrigger value="analytics">📍 Location Analytics</TabsTrigger>
          <TabsTrigger value="leads">👥 Lead Management</TabsTrigger>
          <TabsTrigger value="traffic">📊 Foot Traffic</TabsTrigger>
          <TabsTrigger value="roi">💰 Physical ROI</TabsTrigger>
        </TabsList>

        <TabsContent value="stalls" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mockCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{campaign.location}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Stall Type:</span>
                        <div className="font-medium">{campaign.stallType}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Foot Traffic:</span>
                        <div className="font-medium">{campaign.footTraffic.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Leads Generated:</span>
                        <div className="font-medium text-blue-600">{campaign.leads}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ROI:</span>
                        <div className="font-medium text-green-600">
                          {Math.round((campaign.revenue / campaign.cost) * 100)}%
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-sm text-muted-foreground">Cost: </span>
                        <span className="font-semibold">€{campaign.cost.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Revenue: </span>
                        <span className="font-semibold text-green-600">€{campaign.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📍 Location Analytics</CardTitle>
              <CardDescription>Performance by location and venue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">Berlin</div>
                    <div className="text-sm text-muted-foreground">Top Performing</div>
                    <div className="text-lg font-semibold text-green-600">257% ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">Copenhagen</div>
                    <div className="text-sm text-muted-foreground">High Conversion</div>
                    <div className="text-lg font-semibold text-blue-600">12.2% CVR</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">Stockholm</div>
                    <div className="text-sm text-muted-foreground">Upcoming</div>
                    <div className="text-lg font-semibold text-orange-600">Planned</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>👥 Lead Management</CardTitle>
              <CardDescription>Capture and manage leads from physical events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">560</div>
                    <div className="text-sm text-muted-foreground">Total Leads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">68</div>
                    <div className="text-sm text-muted-foreground">Converted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">12.1%</div>
                    <div className="text-sm text-muted-foreground">Conversion Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">€21.4K</div>
                    <div className="text-sm text-muted-foreground">Revenue</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📊 Foot Traffic Data</CardTitle>
              <CardDescription>Real-time visitor analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Live foot traffic tracking coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>💰 Physical ROI Tracking</CardTitle>
              <CardDescription>Complete financial performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Investment Breakdown</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Stall Bookings:</span>
                        <span className="font-medium">€6,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Materials & Setup:</span>
                        <span className="font-medium">€1,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Staff & Travel:</span>
                        <span className="font-medium">€800</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Total Investment:</span>
                        <span className="font-semibold">€8,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Revenue Generated</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Direct Sales:</span>
                        <span className="font-medium text-green-600">€15,400</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Follow-up Sales:</span>
                        <span className="font-medium text-green-600">€6,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Total Revenue:</span>
                        <span className="font-semibold text-green-600">€21,400</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold text-lg">ROI:</span>
                        <span className="font-semibold text-lg text-green-600">267.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </DashboardLayout>
  )
}
