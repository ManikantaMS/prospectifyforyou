"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { DateRange } from "react-day-picker"

interface AnalyticsContextType {
  campaignFilter: string
  setCampaignFilter: (filter: string) => void
  dateRange: DateRange | undefined
  setDateRange: (range: DateRange | undefined) => void
  refreshTrigger: number
  triggerRefresh: () => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [campaignFilter, setCampaignFilter] = useState("all-campaigns")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <AnalyticsContext.Provider value={{
      campaignFilter,
      setCampaignFilter,
      dateRange,
      setDateRange,
      refreshTrigger,
      triggerRefresh
    }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

// Helper function to filter data based on campaign type
export function filterCampaignData(data: any[], filter: string) {
  switch (filter) {
    case "active":
      return data.filter(item => item.status === "Active" || item.status === "active")
    case "completed":
      return data.filter(item => item.status === "Completed" || item.status === "completed")
    case "paused":
      return data.filter(item => item.status === "Paused" || item.status === "paused")
    case "all-campaigns":
    default:
      return data
  }
}
