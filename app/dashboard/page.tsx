"use client"

import { Suspense, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { CustomerProfileForm, type CustomerProfile } from "@/components/dashboard/customer-profile-form"
import { CityRecommendations } from "@/components/dashboard/city-recommendations"
import { DataManagementPanel } from "@/components/dashboard/data-management-panel"
import { SupabaseStatusChecker } from "@/components/dashboard/supabase-status-checker"
import { SupabaseDataProvider } from "@/components/dashboard/supabase-data-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ApprovalPendingAlert } from "@/components/approval-pending-alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, TrendingUp, Smartphone, Store, BarChart3, DollarSign, Search, Eye, Shield, Lock, FileText } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

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
  }
]

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
    name: 'Copenhagen Expo Booth',
    location: 'Bella Center Copenhagen',
    stallType: 'Standard Booth',
    footTraffic: 1800,
    leads: 285,
    cost: 2800,
    revenue: 9500,
    status: 'completed'
  },
  {
    id: '3',
    name: 'Stockholm Innovation Stand',
    location: 'Stockholm International Fairs',
    stallType: 'Premium Corner',
    footTraffic: 3200,
    leads: 420,
    cost: 4200,
    revenue: 15800,
    status: 'active'
  },
  {
    id: '4',
    name: 'Oslo Digital Pavilion',
    location: 'Oslo Spektrum Arena',
    stallType: 'Large Pavilion',
    footTraffic: 4500,
    leads: 650,
    cost: 6500,
    revenue: 22400,
    status: 'planned'
  }
]
import { DashboardLayout } from "@/components/dashboard-layout"

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px] mb-2" />
              <Skeleton className="h-3 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user, isApproved, isAdmin } = useAuth()
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | undefined>(undefined)

  const handleProfileChange = (profile: CustomerProfile) => {
    console.log("Profile updated:", profile)
    setCustomerProfile(profile)
  }

  // Show approval pending alert if user is not approved
  if (user && !isApproved) {
    return <ApprovalPendingAlert />
  }

  return (
    <SupabaseDataProvider>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardHeader />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gradient-to-r from-gray-50 to-blue-50/50 p-1 h-auto rounded-xl shadow-sm border border-gray-200">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-900 text-gray-600 hover:text-gray-900 transition-all duration-200 rounded-lg px-4 py-2 font-medium"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="recommendations" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-900 text-gray-600 hover:text-gray-900 transition-all duration-200 rounded-lg px-4 py-2 font-medium"
            >
              City Finder
            </TabsTrigger>
            <TabsTrigger 
              value="physical-marketing" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-900 text-gray-600 hover:text-gray-900 transition-all duration-200 rounded-lg px-4 py-2 font-medium"
            >
              Physical Marketing
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-900 text-gray-600 hover:text-gray-900 transition-all duration-200 rounded-lg px-4 py-2 font-medium"
            >
              🎪 Events
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-900 text-gray-600 hover:text-gray-900 transition-all duration-200 rounded-lg px-4 py-2 font-medium"
            >
              📊 Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="data" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-900 text-gray-600 hover:text-gray-900 transition-all duration-200 rounded-lg px-4 py-2 font-medium"
            >
              Data Management
            </TabsTrigger>
            <TabsTrigger 
              value="compliance" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-900 text-gray-600 hover:text-gray-900 transition-all duration-200 rounded-lg px-4 py-2 font-medium"
            >
              🛡️ Compliance
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger 
                value="configuration" 
                className="data-[state=active]:bg-purple-100 data-[state=active]:shadow-md data-[state=active]:text-purple-900 text-gray-600 hover:text-purple-700 transition-all duration-200 rounded-lg px-4 py-2 font-medium border border-purple-200"
              >
                Configuration
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <ErrorBoundary>
              <Suspense fallback={<DashboardSkeleton />}>
                <DashboardStats />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Customer Profile</CardTitle>
                      <CardDescription>
                        Define your target customer to get personalized city recommendations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <CustomerProfileForm onProfileChange={handleProfileChange} />
                    </CardContent>
                  </Card>

                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Quick Recommendations</CardTitle>
                      <CardDescription>Top cities based on your current profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CityRecommendations customerProfile={customerProfile} />
                    </CardContent>
                  </Card>
                </div>
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <ErrorBoundary>
              <Suspense fallback={<DashboardSkeleton />}>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="md:col-span-1">
                    <CardHeader>
                      <CardTitle>Customer Profile</CardTitle>
                      <CardDescription>Adjust your target customer profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CustomerProfileForm onProfileChange={handleProfileChange} />
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>City Recommendations</CardTitle>
                      <CardDescription>Cities ranked by match score for your target customer</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CityRecommendations customerProfile={customerProfile} />
                    </CardContent>
                  </Card>
                </div>
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="physical-marketing" className="space-y-4">
            <ErrorBoundary>
              <Suspense fallback={<DashboardSkeleton />}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">🏪 Physical Marketing Management</h3>
                    <p className="text-sm text-muted-foreground">Manage your event stalls, bookings, and on-ground campaigns</p>
                  </div>
                  <Button 
                    className="flex items-center"
                    onClick={() => alert('🏪 Book New Stall - Available Options:\n\n📍 UPCOMING EVENTS:\n• Munich Trade Show - Aug 15-18\n• Hamburg Tech Expo - Sep 10-12\n• Vienna Innovation Fair - Oct 5-7\n• Amsterdam Digital Summit - Nov 20-22\n\n💼 STALL TYPES:\n• Standard Booth (3x3m) - €2,500\n• Premium Corner (4x4m) - €4,200\n• Large Pavilion (6x6m) - €6,500\n• Executive Suite (8x4m) - €8,000\n\n✅ INCLUDED SERVICES:\n• Setup & breakdown assistance\n• Basic furniture package\n• Power & internet connectivity\n• Lead capture system\n• Marketing material display\n\n🎯 NEXT STEPS:\n1. Select preferred events\n2. Choose stall type & location\n3. Customize package options\n4. Confirm booking & payment\n\nWould you like to proceed with booking?')}
                  >
                    <Store className="mr-2 h-4 w-4" />
                    Book New Stall
                  </Button>
                </div>

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
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Stall Type:</span>
                              <div className="font-medium">{campaign.stallType}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Status:</span>
                              <div className="font-medium capitalize">{campaign.status}</div>
                            </div>
                          </div>
                          
                          <div className="border-t pt-3">
                            <div className="text-sm text-muted-foreground mb-2">Quick Stats:</div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="text-center p-2 bg-blue-50 rounded">
                                <div className="font-semibold text-blue-600">{campaign.footTraffic.toLocaleString()}</div>
                                <div className="text-blue-600">Visitors</div>
                              </div>
                              <div className="text-center p-2 bg-green-50 rounded">
                                <div className="font-semibold text-green-600">{campaign.leads}</div>
                                <div className="text-green-600">Leads</div>
                              </div>
                              <div className="text-center p-2 bg-purple-50 rounded">
                                <div className="font-semibold text-purple-600">
                                  {Math.round((campaign.revenue / campaign.cost) * 100)}%
                                </div>
                                <div className="text-purple-600">ROI</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => alert(`Viewing analytics for ${campaign.name}:\n\n• Total Visitors: ${campaign.footTraffic.toLocaleString()}\n• Leads Generated: ${campaign.leads}\n• Revenue: €${campaign.revenue.toLocaleString()}\n• ROI: ${Math.round((campaign.revenue / campaign.cost) * 100)}%\n• Conversion Rate: ${((campaign.leads / campaign.footTraffic) * 100).toFixed(1)}%`)}
                            >
                              <BarChart3 className="mr-2 h-4 w-4" />
                              View Analytics
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => alert(`Managing stall: ${campaign.name}\n\nOptions:\n• Update stall details\n• Modify booking dates\n• Change stall type\n• Add staff assignments\n• Update materials list\n• Set up logistics`)}
                            >
                              Manage Stall
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Add New Stall Card */}
                  <Card className="border-dashed border-2 hover:border-blue-500 transition-colors cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center h-64">
                      <Store className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold text-lg mb-2">Book New Event Stall</h3>
                      <p className="text-sm text-muted-foreground text-center mb-4">
                        Expand your physical presence at upcoming events
                      </p>
                      <Button onClick={() => alert('🚀 Event Booking System\n\n📋 STEP 1: SELECT EVENT\n• Browse 15+ upcoming events\n• Filter by location, date, industry\n• View attendee demographics\n• Check availability status\n\n📋 STEP 2: CHOOSE STALL\n• Compare stall types & sizes\n• View floor plans & locations\n• See included amenities\n• Calculate ROI projections\n\n📋 STEP 3: CUSTOMIZE PACKAGE\n• Add premium services\n• Request additional equipment\n• Schedule setup appointments\n• Choose catering options\n\n📋 STEP 4: COMPLETE BOOKING\n• Secure payment processing\n• Receive confirmation details\n• Access event dashboard\n• Get pre-event checklist\n\n💡 SPECIAL OFFERS:\n• 15% discount for multiple events\n• Free setup for premium booths\n• Complimentary lead scanning\n\nReady to start booking?')}>
                        <Store className="mr-2 h-4 w-4" />
                        Book Stall
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Action Cards */}
                <div className="grid gap-4 md:grid-cols-3 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">📍 Location Scouting</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3">Find the best venues for your next campaign</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => alert('🗺️ Location Scouting Intelligence\n\n📊 DEMOGRAPHIC ANALYSIS:\n• Age distribution mapping\n• Income level analysis\n• Lifestyle preferences\n• Shopping behavior patterns\n\n🚶 FOOT TRAFFIC DATA:\n• Peak hours identification\n• Seasonal trends\n• Daily/weekly patterns\n• Event impact analysis\n\n🏢 VENUE INSIGHTS:\n• Competition density\n• Rental costs comparison\n• Amenities availability\n• Accessibility ratings\n\n📈 SUCCESS PREDICTORS:\n• Historical performance\n• Similar brand results\n• Market saturation levels\n• Growth potential scores\n\n🎯 RECOMMENDATIONS:\n• Top 5 venue matches\n• Optimal timing suggestions\n• Budget recommendations\n• ROI projections\n\nGenerating location report...')}
                      >
                        Scout Locations
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">📊 Lead Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3">Manage and follow up with captured leads</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => alert('📊 Lead Management Dashboard\n\n👥 CURRENT LEADS: 847\n• Hot leads: 156 (18.4%)\n• Warm leads: 284 (33.5%)\n• Cold leads: 407 (48.1%)\n\n📈 CONVERSION TRACKING:\n• Email responses: 67%\n• Phone call success: 43%\n• Meeting scheduled: 28%\n• Deals closed: 12.3%\n\n🔄 FOLLOW-UP STATUS:\n• Pending follow-up: 234\n• Scheduled callbacks: 89\n• Waiting for response: 145\n• In negotiation: 67\n\n🎯 LEAD SOURCES:\n• Event stalls: 340 (40.1%)\n• Digital campaigns: 298 (35.2%)\n• Referrals: 134 (15.8%)\n• Cold outreach: 75 (8.9%)\n\n⚡ QUICK ACTIONS:\n• Send bulk email campaign\n• Schedule callback reminders\n• Export lead database\n• Update lead scoring\n• Generate conversion report\n\nOpening lead management system...')}
                      >
                        Manage Leads
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">🎯 Campaign Setup</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3">Set up materials and staff for events</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => alert('🎯 Campaign Setup Assistant\n\n📋 SETUP CHECKLIST:\n✅ Event registration confirmed\n✅ Stall location assigned\n⏳ Marketing materials (in progress)\n⏳ Staff scheduling\n❌ Equipment rental\n❌ Logistics planning\n\n🎨 DESIGN SERVICES:\n• Custom stall layouts\n• Brand-consistent displays\n• Interactive demo stations\n• Digital presentation screens\n• Lead capture kiosks\n\n👥 STAFFING SUPPORT:\n• Event staff recruitment\n• Training program delivery\n• Schedule optimization\n• Performance tracking\n• Real-time communication\n\n📦 LOGISTICS MANAGEMENT:\n• Equipment transportation\n• Setup/breakdown coordination\n• Storage solutions\n• Timeline management\n• Contingency planning\n\n💼 MARKETING MATERIALS:\n• Brochures and flyers\n• Branded giveaways\n• Business cards\n• Product samples\n• Digital presentations\n\n🚀 LAUNCH READY:\nExpected completion: 3-5 business days\nNext milestone: Staff training session\n\nStarting campaign setup wizard...')}
                      >
                        Setup Campaign
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <ErrorBoundary>
              <Suspense fallback={<DashboardSkeleton />}>
                {/* Search Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">🎪 Event Discovery & Registration</h3>
                    <p className="text-sm text-muted-foreground">Find and register for events in malls, venues, and event spaces</p>
                  </div>
                </div>

                {/* Location Search */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Search className="mr-2 h-5 w-5" />
                      Search Events by Location
                    </CardTitle>
                    <CardDescription>
                      Find events in specific cities, malls, or venues
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-4">
                      <input 
                        type="text" 
                        placeholder="Search by city, mall, or venue name..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Button onClick={() => alert('🔍 Location Search Results\n\n📍 SEARCH RESULTS:\n\n🏬 SHOPPING MALLS:\n• Berlin - Alexa Shopping Center\n• Hamburg - Europa Passage\n• Munich - Maximilianstrasse\n• Frankfurt - MyZeil Mall\n\n🏢 CONVENTION CENTERS:\n• Stockholm International Fairs\n• Copenhagen Bella Center\n• Oslo Spektrum Arena\n• Helsinki Messukeskus\n\n🎪 EVENT VENUES:\n• Vienna Austria Center\n• Amsterdam RAI\n• Zurich Exhibition Center\n• Brussels Expo\n\n📊 FILTERING OPTIONS:\n• By attendee count (1K-50K)\n• By industry focus\n• By event duration\n• By success rate (75%+)\n• By ROI potential (200%+)\n\n✨ SMART RECOMMENDATIONS:\n• Events matching your profile: 12\n• High ROI opportunities: 8\n• New venue discoveries: 5\n\nRefining search results...')}>
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                    </div>
                    
                    {/* Quick Filters */}
                    <div className="flex gap-2 flex-wrap">
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() => alert('🏬 Shopping Mall Events\n\nFiltered Results:\n• Berlin Mall Tech Expo\n• Copenhagen Shopping Festival\n• Hamburg Pop-up Market\n• Munich Fashion Week Mall\n• Stockholm Lifestyle Fair\n\n📊 Key Stats:\n• Average footfall: 18,500/day\n• Target demographic: 25-45 years\n• Success rate: 82%\n• Average ROI: 290%')}
                      >
                        Shopping Malls
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() => alert('🏢 Convention Center Events\n\nFiltered Results:\n• Stockholm Innovation Fair\n• Oslo Digital Summit\n• Munich Trade Show\n• Copenhagen Business Expo\n• Helsinki Tech Conference\n\n📊 Key Stats:\n• Professional audience: 95%\n• B2B focus: High\n• Success rate: 94%\n• Average ROI: 380%')}
                      >
                        Convention Centers
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() => alert('💻 Tech Events\n\nFiltered Results:\n• Berlin Tech Summit\n• Stockholm Innovation Fair\n• Oslo Digital Summit\n• Copenhagen DevCon\n• Munich AI Expo\n\n📊 Key Stats:\n• Tech professionals: 87%\n• Decision makers: 65%\n• Success rate: 91%\n• Average ROI: 420%')}
                      >
                        Tech Events
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() => alert('📈 Trade Shows\n\nFiltered Results:\n• Munich Trade Show\n• Hamburg Industrial Fair\n• Stockholm Business Expo\n• Copenhagen Import/Export\n• Oslo Maritime Summit\n\n📊 Key Stats:\n• International reach: 75%\n• Industry leaders: 82%\n• Success rate: 88%\n• Average ROI: 350%')}
                      >
                        Trade Shows
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() => alert('🎪 Pop-up Events\n\nFiltered Results:\n• Hamburg Pop-up Market\n• Berlin Street Festival\n• Copenhagen Design Week\n• Stockholm Art Fair\n• Oslo Food Festival\n\n📊 Key Stats:\n• Creative audience: 78%\n• Trendy demographics: 85%\n• Success rate: 75%\n• Average ROI: 250%')}
                      >
                        Pop-up Events
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Event Cards with Mall/Venue Details */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      id: "mall-1",
                      title: "Berlin Mall Tech Expo",
                      location: "Alexa Shopping Center, Berlin",
                      venue: "Central Atrium - Level 2",
                      date: "Mar 15-17, 2024",
                      attendees: 8500,
                      matchRate: 92,
                      roi: 340,
                      cost: 2800,
                      status: "recommended",
                      type: "Shopping Mall Event",
                      footfall: "25,000 daily",
                      demographics: "Tech-savvy shoppers, 25-45 age",
                      successRate: 89
                    },
                    {
                      id: "venue-1", 
                      title: "Stockholm Innovation Fair",
                      location: "Stockholm International Fairs",
                      venue: "Hall A - Premium Booth Area",
                      date: "Apr 20-22, 2024",
                      attendees: 12000,
                      matchRate: 88,
                      roi: 380,
                      cost: 3200,
                      status: "available",
                      type: "Convention Center",
                      footfall: "15,000 professional visitors",
                      demographics: "Business professionals, startups",
                      successRate: 94
                    },
                    {
                      id: "mall-2",
                      title: "Copenhagen Shopping Festival", 
                      location: "Fisketorvet Shopping Center",
                      venue: "Main Plaza - Ground Floor",
                      date: "May 5-7, 2024",
                      attendees: 6200,
                      matchRate: 85,
                      roi: 290,
                      cost: 2100,
                      status: "available",
                      type: "Shopping Mall Event",
                      footfall: "18,000 daily shoppers",
                      demographics: "Fashion & lifestyle focused",
                      successRate: 82
                    },
                    {
                      id: "venue-2",
                      title: "Oslo Digital Summit",
                      location: "Oslo Spektrum Arena",
                      venue: "Exhibition Hall B",
                      date: "Jun 12-14, 2024", 
                      attendees: 15000,
                      matchRate: 95,
                      roi: 420,
                      cost: 4500,
                      status: "registered",
                      type: "Arena Event",
                      footfall: "Tech industry professionals",
                      demographics: "Digital leaders, CTOs, developers",
                      successRate: 97
                    },
                    {
                      id: "mall-3",
                      title: "Hamburg Pop-up Market",
                      location: "Europa Passage Hamburg",
                      venue: "Quartier 206 - Pop-up Space",
                      date: "Jul 8-10, 2024",
                      attendees: 4800,
                      matchRate: 78,
                      roi: 250,
                      cost: 1800,
                      status: "available",
                      type: "Pop-up Event",
                      footfall: "12,000 trendy shoppers",
                      demographics: "Young professionals, millennials",
                      successRate: 75
                    },
                    {
                      id: "venue-3",
                      title: "Munich Trade Show",
                      location: "Messe München",
                      venue: "Hall 14 - International Pavilion",
                      date: "Aug 15-18, 2024",
                      attendees: 22000,
                      matchRate: 91,
                      roi: 450,
                      cost: 5200,
                      status: "recommended",
                      type: "Trade Show",
                      footfall: "Global industry professionals",
                      demographics: "B2B decision makers, 30-55 age",
                      successRate: 96
                    }
                  ].map((event) => (
                    <Card key={event.id} className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{event.title}</CardTitle>
                          <Badge variant={event.status === 'recommended' ? 'default' : event.status === 'registered' ? 'secondary' : 'outline'}>
                            {event.status}
                          </Badge>
                        </div>
                        <CardDescription className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-3 w-3" />
                            <span className="text-xs">{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Store className="h-3 w-3" />
                            <span className="text-xs font-medium">{event.venue}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {/* Event Basic Info */}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span className="text-xs">{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            <span className="text-xs">{event.attendees.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Event Type */}
                        <div className="bg-blue-50 px-2 py-1 rounded text-xs font-medium text-blue-700">
                          {event.type}
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <div className="font-semibold text-green-600">{event.matchRate}%</div>
                            <div className="text-gray-600">Match Rate</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <div className="font-semibold text-green-600">{event.roi}%</div>
                            <div className="text-gray-600">Expected ROI</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <div className="font-semibold text-blue-600">{event.successRate}%</div>
                            <div className="text-gray-600">Success Rate</div>
                          </div>
                        </div>

                        {/* Location Details */}
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div><strong>Footfall:</strong> {event.footfall}</div>
                          <div><strong>Audience:</strong> {event.demographics}</div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2 border-t">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => alert(`Event Details: ${event.title}\n\nLocation: ${event.location}\nVenue: ${event.venue}\nDate: ${event.date}\nExpected Attendees: ${event.attendees.toLocaleString()}\n\nFootfall: ${event.footfall}\nTarget Audience: ${event.demographics}\nMatch Rate: ${event.matchRate}%\nSuccess Rate: ${event.successRate}%\nExpected ROI: ${event.roi}%\n\nCost: €${event.cost.toLocaleString()}\n\nWould you like to register for this event?`)}
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            View Details
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => alert(`Registration for: ${event.title}\n\n✅ Registration successful!\n\nNext steps:\n• Payment processing: €${event.cost.toLocaleString()}\n• Booth assignment confirmation\n• Event materials preparation\n• Staff scheduling\n• Setup date: ${event.date.split(',')[0]} (day before)\n\nYou'll receive a confirmation email shortly.`)}
                          >
                            {event.status === 'registered' ? 'View Booking' : 'Register'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <ErrorBoundary>
              <Suspense fallback={<DashboardSkeleton />}>
                {/* Overview Stats Row */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total ROI</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">340%</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">€21.4K</div>
                      <p className="text-xs text-muted-foreground">+18% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">560</div>
                      <p className="text-xs text-muted-foreground">+25% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">12.1%</div>
                      <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Physical Marketing Stats Section */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Store className="mr-2 h-5 w-5" />
                        Physical Marketing Performance
                      </CardTitle>
                      <CardDescription>Real-world event and stall performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 border rounded">
                            <div className="text-xl font-bold text-green-600">357%</div>
                            <div className="text-sm text-muted-foreground">Physical ROI</div>
                          </div>
                          <div className="text-center p-3 border rounded">
                            <div className="text-xl font-bold">€12.5K</div>
                            <div className="text-sm text-muted-foreground">Stall Revenue</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 border rounded">
                            <div className="text-xl font-bold text-blue-600">2,500</div>
                            <div className="text-sm text-muted-foreground">Foot Traffic</div>
                          </div>
                          <div className="text-center p-3 border rounded">
                            <div className="text-xl font-bold text-orange-600">340</div>
                            <div className="text-sm text-muted-foreground">Stall Leads</div>
                          </div>
                        </div>

                        <div className="border-t pt-3">
                          <h4 className="font-semibold mb-2">Active Campaigns</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Berlin Tech Summit</span>
                              <Badge variant="default">Active</Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Copenhagen Expo</span>
                              <Badge variant="secondary">Completed</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Location Performance Analysis</CardTitle>
                      <CardDescription>ROI and performance by city and venue</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 border rounded">
                            <div>
                              <div className="font-medium">Berlin</div>
                              <div className="text-sm text-muted-foreground">Convention Center</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-green-600">357% ROI</div>
                              <div className="text-sm text-muted-foreground">€3.5K → €12.5K</div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 border rounded">
                            <div>
                              <div className="font-medium">Copenhagen</div>
                              <div className="text-sm text-muted-foreground">Expo Center</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-green-600">340% ROI</div>
                              <div className="text-sm text-muted-foreground">€2.5K → €8.9K</div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 border rounded">
                            <div>
                              <div className="font-medium">Stockholm</div>
                              <div className="text-sm text-muted-foreground">Innovation Fair</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-orange-600">Planned</div>
                              <div className="text-sm text-muted-foreground">€2.8K budget</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Campaign Breakdown Section */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Digital vs Physical</CardTitle>
                      <CardDescription>Performance comparison</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Digital Campaigns</span>
                          <span className="font-semibold text-blue-600">280% ROI</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Physical Campaigns</span>
                          <span className="font-semibold text-green-600">357% ROI</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Hybrid Campaigns</span>
                          <span className="font-semibold text-purple-600">420% ROI</span>
                        </div>
                        <div className="border-t pt-2 mt-3">
                          <div className="text-xs text-muted-foreground">
                            💡 Hybrid campaigns show 20% higher ROI
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Lead Sources</CardTitle>
                      <CardDescription>Where your leads come from</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Event Stalls</span>
                          <div className="text-right">
                            <div className="font-semibold">340 leads</div>
                            <div className="text-xs text-muted-foreground">60.7%</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Digital Campaigns</span>
                          <div className="text-right">
                            <div className="font-semibold">150 leads</div>
                            <div className="text-xs text-muted-foreground">26.8%</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Referrals</span>
                          <div className="text-right">
                            <div className="font-semibold">70 leads</div>
                            <div className="text-xs text-muted-foreground">12.5%</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Cost Analysis</CardTitle>
                      <CardDescription>Investment breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Stall Bookings</span>
                            <span className="font-medium">€6,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Digital Ads</span>
                            <span className="font-medium">€1,500</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Materials & Setup</span>
                            <span className="font-medium">€1,200</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Staff & Travel</span>
                            <span className="font-medium">€800</span>
                          </div>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total Investment</span>
                            <span>€9,500</span>
                          </div>
                          <div className="flex justify-between font-semibold text-green-600">
                            <span>Total Revenue</span>
                            <span>€32,300</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <ErrorBoundary>
              <Suspense fallback={<DashboardSkeleton />}>
                <DataManagementPanel isAdmin={isAdmin} />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <ErrorBoundary>
              <Suspense fallback={<DashboardSkeleton />}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">🛡️ Compliance Dashboard</h3>
                      <p className="text-sm text-muted-foreground">Monitor regulatory compliance and data protection status</p>
                    </div>
                    <Button 
                      onClick={() => alert('📋 Compliance Audit Report\n\n✅ GDPR COMPLIANCE: 100%\n• Data processing agreements: Updated\n• Privacy policies: Current\n• User consent tracking: Active\n• Data retention policies: Compliant\n\n✅ SECURITY STANDARDS: 98%\n• SSL/TLS encryption: Enabled\n• Multi-factor authentication: Active\n• Security monitoring: 24/7\n• Vulnerability scans: Weekly\n\n✅ DATA GOVERNANCE: 100%\n• Data classification: Complete\n• Access controls: Configured\n• Audit logging: Enabled\n• Backup procedures: Tested\n\n⚠️ PENDING ACTIONS:\n• Annual security assessment (Due: Aug 15)\n• Staff training updates (Due: Aug 30)\n• Third-party vendor review (Due: Sep 15)\n\n📊 COMPLIANCE SCORE: 99.2%\n\nLast audit: July 1, 2024\nNext review: October 1, 2024')}
                      variant="outline"
                    >
                      Generate Audit Report
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-sm">
                          <Shield className="mr-2 h-4 w-4 text-green-600" />
                          GDPR Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Data Processing</span>
                            <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>User Consent</span>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Data Retention</span>
                            <Badge className="bg-green-100 text-green-800">Policy Applied</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-sm">
                          <Lock className="mr-2 h-4 w-4 text-blue-600" />
                          Security Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Encryption</span>
                            <Badge className="bg-blue-100 text-blue-800">AES-256 Active</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Access Control</span>
                            <Badge className="bg-blue-100 text-blue-800">MFA Enabled</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Monitoring</span>
                            <Badge className="bg-blue-100 text-blue-800">24/7 Active</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-sm">
                          <FileText className="mr-2 h-4 w-4 text-purple-600" />
                          Documentation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full justify-start text-xs"
                            onClick={() => window.open('/privacy', '_blank')}
                          >
                            Privacy Policy
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full justify-start text-xs"
                            onClick={() => window.open('/terms', '_blank')}
                          >
                            Terms of Service
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full justify-start text-xs"
                            onClick={() => window.open('/compliance', '_blank')}
                          >
                            Compliance Framework
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Compliance Activities</CardTitle>
                      <CardDescription>Latest compliance actions and updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { date: '2024-08-01', action: 'Privacy Policy Updated', status: 'completed', type: 'policy' },
                          { date: '2024-07-28', action: 'Security Audit Completed', status: 'completed', type: 'audit' },
                          { date: '2024-07-25', action: 'GDPR Training Session', status: 'completed', type: 'training' },
                          { date: '2024-07-20', action: 'Data Retention Review', status: 'completed', type: 'review' },
                          { date: '2024-08-15', action: 'Annual Security Assessment', status: 'pending', type: 'assessment' }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${activity.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'}`} />
                              <div>
                                <div className="font-medium text-sm">{activity.action}</div>
                                <div className="text-xs text-muted-foreground">{activity.date}</div>
                              </div>
                            </div>
                            <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                              {activity.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          {isAdmin && (
            <TabsContent value="configuration" className="space-y-4">
              <ErrorBoundary>
                <SupabaseStatusChecker />
              </ErrorBoundary>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </SupabaseDataProvider>
  )
}
