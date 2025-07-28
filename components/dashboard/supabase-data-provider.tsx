"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { demographicService, type CityDemographic } from "@/lib/supabase-demographic-service"
import { testSupabaseConnection } from "@/lib/supabase"

interface SupabaseDataContextType {
  cities: CityDemographic[]
  loading: boolean
  error: string | null
  connectionStatus: {
    success: boolean
    error: string | null
    usingMock: boolean
    needsSetup?: boolean
  } | null
  refreshData: () => Promise<void>
  testConnection: () => Promise<void>
}

const SupabaseDataContext = createContext<SupabaseDataContextType | undefined>(undefined)

export function useSupabaseData() {
  const context = useContext(SupabaseDataContext)
  if (context === undefined) {
    throw new Error("useSupabaseData must be used within a SupabaseDataProvider")
  }
  return context
}

interface SupabaseDataProviderProps {
  children: ReactNode
}

export function SupabaseDataProvider({ children }: SupabaseDataProviderProps) {
  const [cities, setCities] = useState<CityDemographic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean
    error: string | null
    usingMock: boolean
    needsSetup?: boolean
  } | null>(null)

  const refreshData = async () => {
    console.log("🔄 Refreshing data...")
    setLoading(true)
    setError(null)

    try {
      const citiesData = await demographicService.getCitiesWithDemographics()
      setCities(citiesData)
      console.log(`✅ Data refreshed successfully - ${citiesData.length} cities loaded`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load data"
      console.error("❌ Error refreshing data:", errorMessage)
      setError(errorMessage)
      // Set empty array on error to prevent crashes
      setCities([])
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    console.log("🧪 Testing Supabase connection...")
    try {
      const result = await testSupabaseConnection()
      setConnectionStatus(result)
      console.log("🧪 Connection test result:", result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Connection test failed"
      console.error("❌ Connection test error:", errorMessage)
      setConnectionStatus({
        success: false,
        error: errorMessage,
        usingMock: true,
      })
    }
  }

  useEffect(() => {
    console.log("🚀 SupabaseDataProvider initializing...")

    const initializeData = async () => {
      // Test connection first
      await testConnection()
      // Then load data
      await refreshData()
    }

    initializeData()
  }, [])

  const value: SupabaseDataContextType = {
    cities,
    loading,
    error,
    connectionStatus,
    refreshData,
    testConnection,
  }

  return <SupabaseDataContext.Provider value={value}>{children}</SupabaseDataContext.Provider>
}
