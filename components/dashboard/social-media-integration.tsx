"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  ExternalLink, 
  Key, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  TrendingUp,
  DollarSign,
  Eye,
  MousePointer,
  Users,
  Facebook,
  Chrome,
  Instagram,
  Linkedin,
  Twitter
} from "lucide-react"

interface SocialAccount {
  id: string
  platform: string
  name: string
  accountId: string
  status: 'connected' | 'disconnected' | 'pending'
  lastSync: string
  campaigns: number
  spend: string
  icon: any
  color: string
}

interface CampaignData {
  id: string
  name: string
  platform: string
  status: string
  budget: string
  spent: string
  impressions: string
  clicks: string
  conversions: string
  ctr: string
  cpc: string
  roas: string
}

const socialAccounts: SocialAccount[] = [
  {
    id: "google-ads",
    platform: "Google Ads",
    name: "Fashion Brand EU",
    accountId: "123-456-7890",
    status: "connected",
    lastSync: "2 minutes ago",
    campaigns: 8,
    spend: "€12,450",
    icon: Chrome,
    color: "text-blue-600"
  },
  {
    id: "facebook-ads",
    platform: "Facebook Ads",
    name: "Fashion Brand",
    accountId: "987654321",
    status: "connected", 
    lastSync: "5 minutes ago",
    campaigns: 12,
    spend: "€8,200",
    icon: Facebook,
    color: "text-blue-500"
  },
  {
    id: "instagram-ads",
    platform: "Instagram Ads",
    name: "Fashion Brand",
    accountId: "456789123",
    status: "disconnected",
    lastSync: "Never",
    campaigns: 0,
    spend: "€0",
    icon: Instagram,
    color: "text-pink-500"
  },
  {
    id: "linkedin-ads",
    platform: "LinkedIn Ads",
    name: "Fashion Brand B2B",
    accountId: "789123456",
    status: "pending",
    lastSync: "Connecting...",
    campaigns: 3,
    spend: "€2,100",
    icon: Linkedin,
    color: "text-blue-700"
  }
]

const campaignData: CampaignData[] = [
  {
    id: "1",
    name: "Madrid Fashion Week - Search",
    platform: "Google Ads",
    status: "Active",
    budget: "€5,000",
    spent: "€3,200",
    impressions: "124K", 
    clicks: "8,400",
    conversions: "340",
    ctr: "6.77%",
    cpc: "€0.38",
    roas: "4.2x"
  },
  {
    id: "2", 
    name: "Barcelona Beauty Launch",
    platform: "Facebook Ads",
    status: "Active",
    budget: "€3,500",
    spent: "€2,800",
    impressions: "98K",
    clicks: "5,200", 
    conversions: "180",
    ctr: "5.31%",
    cpc: "€0.54",
    roas: "3.8x"
  },
  {
    id: "3",
    name: "Valencia Electronics Expo", 
    platform: "Google Ads",
    status: "Paused",
    budget: "€2,000",
    spent: "€1,950",
    impressions: "65K",
    clicks: "3,400",
    conversions: "85",
    ctr: "5.23%", 
    cpc: "€0.57",
    roas: "2.1x"
  }
]

export function SocialMediaIntegration() {
  const [showConnectDialog, setShowConnectDialog] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string>("")
  const [syncing, setSyncing] = useState<string>("")

  const handleConnect = (platformId: string) => {
    setSelectedPlatform(platformId)
    setShowConnectDialog(true)
  }

  const handleSync = (platformId: string) => {
    setSyncing(platformId)
    // Simulate API call
    setTimeout(() => {
      setSyncing("")
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      connected: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800", 
      disconnected: "bg-gray-100 text-gray-800"
    }
    return variants[status] || variants.disconnected
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Social Media Integration</h2>
          <p className="text-gray-600">Connect your advertising accounts to import real campaign data</p>
        </div>
        <Button onClick={() => handleSync("all")} disabled={!!syncing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
          Sync All Accounts
        </Button>
      </div>

      {/* Integration Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {socialAccounts.map((account) => {
          const Icon = account.icon
          return (
            <Card key={account.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className={`h-5 w-5 ${account.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{account.platform}</CardTitle>
                      <CardDescription>{account.name}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(account.status)}
                    <Badge className={getStatusBadge(account.status)}>
                      {account.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Account ID</p>
                    <p className="font-medium">{account.accountId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Sync</p>
                    <p className="font-medium">{account.lastSync}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Active Campaigns</p>
                    <p className="font-medium">{account.campaigns}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Spend</p>
                    <p className="font-medium">{account.spend}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  {account.status === 'connected' ? (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSync(account.id)}
                        disabled={syncing === account.id}
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${syncing === account.id ? 'animate-spin' : ''}`} />
                        Sync Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => handleConnect(account.id)} className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Connect Account
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Campaign Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Campaign Performance</CardTitle>
          <CardDescription>Real-time metrics from your connected social media accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Total Impressions</span>
                    </div>
                    <p className="text-2xl font-bold">287K</p>
                    <p className="text-xs text-green-600">↑ 12% vs last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <MousePointer className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">Total Clicks</span>
                    </div>
                    <p className="text-2xl font-bold">17.0K</p>
                    <p className="text-xs text-green-600">↑ 8% vs last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-600">Conversions</span>
                    </div>
                    <p className="text-2xl font-bold">605</p>
                    <p className="text-xs text-green-600">↑ 15% vs last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-gray-600">Total Spend</span>
                    </div>
                    <p className="text-2xl font-bold">€20.7K</p>
                    <p className="text-xs text-gray-600">of €30K budget</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="campaigns" className="space-y-4">
              <div className="space-y-4">
                {campaignData.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{campaign.name}</h4>
                          <p className="text-sm text-gray-600">{campaign.platform}</p>
                        </div>
                        <Badge className={campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Budget / Spent</p>
                          <p className="font-medium">{campaign.budget} / {campaign.spent}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Impressions</p>
                          <p className="font-medium">{campaign.impressions}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">CTR</p>
                          <p className="font-medium">{campaign.ctr}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">ROAS</p>
                          <p className="font-medium text-green-600">{campaign.roas}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Budget Utilization</span>
                          <span>{Math.round((parseFloat(campaign.spent.replace('€', '').replace(',', '')) / parseFloat(campaign.budget.replace('€', '').replace(',', ''))) * 100)}%</span>
                        </div>
                        <Progress value={Math.round((parseFloat(campaign.spent.replace('€', '').replace(',', '')) / parseFloat(campaign.budget.replace('€', '').replace(',', ''))) * 100)} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Platform Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Chrome className="h-4 w-4 text-blue-600" />
                        <span>Google Ads</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">€12,450</p>
                        <p className="text-sm text-gray-600">8 campaigns</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Facebook className="h-4 w-4 text-blue-500" />
                        <span>Facebook Ads</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">€8,200</p>
                        <p className="text-sm text-gray-600">12 campaigns</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Linkedin className="h-4 w-4 text-blue-700" />
                        <span>LinkedIn Ads</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">€2,100</p>
                        <p className="text-sm text-gray-600">3 campaigns</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Average Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average CTR</span>
                      <span className="font-semibold">5.77%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average CPC</span>
                      <span className="font-semibold">€0.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average ROAS</span>
                      <span className="font-semibold text-green-600">3.4x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conversion Rate</span>
                      <span className="font-semibold">3.56%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Connection Dialog */}
      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Social Media Account</DialogTitle>
            <DialogDescription>
              Enter your API credentials to connect your advertising account
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client-id">Client ID</Label>
              <Input id="client-id" placeholder="Enter your client ID" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-secret">Client Secret</Label>
              <Input id="client-secret" type="password" placeholder="Enter your client secret" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-id">Account ID</Label>
              <Input id="account-id" placeholder="Enter your account ID" />
            </div>
            <div className="flex space-x-2 pt-4">
              <Button onClick={() => setShowConnectDialog(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect Account
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
