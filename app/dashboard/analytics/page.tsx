import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { PerformanceOverview } from "@/components/analytics/performance-overview"
import { CampaignMetrics } from "@/components/analytics/campaign-metrics"
import { ROIAnalysis } from "@/components/analytics/roi-analysis"
import { CityPerformance } from "@/components/analytics/city-performance"
import { CampaignTimeline } from "@/components/analytics/campaign-timeline"
import { ExportReports } from "@/components/analytics/export-reports"
import { Breadcrumb } from "@/components/breadcrumb"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AnalyticsHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb 
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Analytics", current: true }
          ]}
        />
        <PerformanceOverview />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <CampaignMetrics />
          </div>
          <div className="lg:col-span-1">
            <ROIAnalysis />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <CityPerformance />
          <CampaignTimeline />
        </div>
        <div className="mt-8">
          <ExportReports />
        </div>
      </div>
    </div>
  )
}
