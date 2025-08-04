import { CampaignHeader } from "@/components/campaigns/campaign-header"
import { CampaignList } from "@/components/campaigns/campaign-list"
import { CampaignStats } from "@/components/campaigns/campaign-stats"
import { CreateCampaignDialog } from "@/components/campaigns/create-campaign-dialog"
import { CampaignProvider } from "@/lib/campaign-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Megaphone } from "lucide-react"
import Link from "next/link"

export default function CampaignsPage() {
  return (
    <CampaignProvider>
      <div className="min-h-screen bg-gray-50">
        <CampaignHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Navigation & Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard" className="flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Megaphone className="h-5 w-5 text-green-600" />
                <h1 className="text-2xl font-bold text-gray-900">Campaign Management</h1>
              </div>
            </div>
            <CreateCampaignDialog>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </CreateCampaignDialog>
          </div>

          {/* Page Description */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <h2 className="text-sm font-semibold text-green-900 mb-2">🎯 Campaign Management</h2>
            <p className="text-sm text-green-700">
              Create and manage marketing campaigns for your target cities. Use demographic insights 
              to launch targeted campaigns and track their performance over time.
            </p>
          </div>

          {/* Campaign Stats */}
          <CampaignStats />

          {/* Campaign List */}
          <div className="mt-8">
            <CampaignList />
          </div>
        </div>
      </div>
    </CampaignProvider>
  )
}
