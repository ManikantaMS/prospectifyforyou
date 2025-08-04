import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { PerformanceOverview } from "@/components/analytics/performance-overview"
import CampaignMetrics from "@/components/analytics/campaign-metrics"
import { ROIAnalysis } from "@/components/analytics/roi-analysis"
import { CityPerformance } from "@/components/analytics/city-performance"
import { CampaignTimeline } from "@/components/analytics/campaign-timeline"
import { ExportReports } from "@/components/analytics/export-reports"
import { SocialMediaIntegration } from "@/components/dashboard/social-media-integration"
import { AnalyticsProvider } from "@/lib/analytics-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BarChart3, Zap } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  return (
    <AnalyticsProvider>
      <div className="min-h-screen bg-gray-50">
        <AnalyticsHeader />
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
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Campaign Analytics</h1>
              </div>
            </div>
          </div>

        {/* Page Description */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">📊 What You're Viewing</h2>
          <p className="text-sm text-blue-700">
            This shows detailed analytics for your demographic-based marketing campaigns. 
            After selecting target cities based on customer demographics, track campaign performance, 
            ROI, and city-specific results here. Connect your social media accounts to pull real campaign data.
          </p>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Campaign Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Social Media Integration</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-8">
            <PerformanceOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CampaignMetrics />
              </div>
              <div className="lg:col-span-1">
                <ROIAnalysis />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CityPerformance />
              <CampaignTimeline />
            </div>
            <div>
              <ExportReports />
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-8">
            <SocialMediaIntegration />
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </AnalyticsProvider>
  )
}
