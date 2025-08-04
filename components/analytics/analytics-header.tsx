"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, RefreshCw } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { useAnalytics } from "@/lib/analytics-context"

// Utility function for consistent date formatting across server and client
const formatDateConsistently = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function AnalyticsHeader() {
  const { 
    campaignFilter, 
    setCampaignFilter, 
    dateRange, 
    setDateRange, 
    triggerRefresh 
  } = useAnalytics()
  
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    
    // Trigger refresh in all components
    triggerRefresh()
    
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Show success message with current filter info
    const filterText = campaignFilter === "all-campaigns" ? "All Campaigns" : 
                      campaignFilter === "active" ? "Active Campaigns" : 
                      campaignFilter === "completed" ? "Completed Campaigns" : 
                      "Paused Campaigns"
    
    alert(`📊 Analytics data refreshed successfully!\n\nFilter: ${filterText}\nUpdated metrics:\n• Campaign performance data\n• ROI calculations\n• City demographics\n• Real-time conversions`)
    
    setIsRefreshing(false)
  }

  const handleExport = () => {
    const exportData = [
      ['Analytics Export Summary'],
      ['Generated:', new Date().toLocaleString()],
      ['Date Range:', dateRange ? `${formatDateConsistently(dateRange.from!)} - ${formatDateConsistently(dateRange.to!)}` : 'All Time'],
      ['Campaign Filter:', campaignFilter.replace('-', ' ').toUpperCase()],
      [''],
      ['Quick Analytics Overview:'],
      ['Metric', 'Value'],
      ['Total Revenue', '€187,450'],
      ['Active Campaigns', '8'],
      ['Average ROI', '285%'],
      ['Total Conversions', '2,340'],
      ['Top Performing City', 'Barcelona'],
      ['Best Campaign', 'Barcelona Beauty Launch (320% ROI)'],
    ]

    const csvContent = exportData.map(row => Array.isArray(row) ? row.join(',') : row).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `Analytics_Overview_${Date.now()}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Campaign Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track performance, analyze ROI, and optimize your marketing campaigns
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
            <DatePickerWithRange />
            <Select value={campaignFilter} onValueChange={setCampaignFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter campaigns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-campaigns">All Campaigns</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleExport}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
