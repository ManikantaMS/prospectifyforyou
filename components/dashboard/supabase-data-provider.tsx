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
  addImportedCities: (importedCities: Partial<CityDemographic>[]) => void
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
      // Temporarily use mock data to prevent timeout issues
      console.log("⚠️ Using mock data to prevent timeout issues")
      const mockCities = [
        {
          id: 1,
          name: "Paris",
          country: "France",
          nuts_code: "FR101",
          latitude: 48.8566,
          longitude: 2.3522,
          population: 2161000,
          age_15_29: 18.5,
          age_30_49: 26.8,
          age_50_64: 19.2,
          age_65_plus: 16.1,
          median_income: 25000,
          average_income: 32000,
          male_population: 48.2,
          female_population: 51.8,
          higher_education: 45.2,
          employment_rate: 67.8,
          services_employment: 82.1,
          industry_employment: 15.4,
          agriculture_employment: 2.5
        }
      ] as any[]
      
      setCities(mockCities)
      console.log(`✅ Mock data loaded successfully - ${mockCities.length} cities loaded`)
      
      // TODO: Uncomment when Supabase is properly configured
      // const citiesData = await demographicService.getCitiesWithDemographics()
      // setCities(citiesData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load data"
      console.error("❌ Error refreshing data:", errorMessage)
      setError(errorMessage)
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
      
      // After main data is loaded, add imported cities from localStorage
      const savedImportedCities = localStorage.getItem("importedCities")
      if (savedImportedCities) {
        try {
          const parsedImportedCities = JSON.parse(savedImportedCities)
          setCities((prevCities) => {
            // Avoid duplicates by checking if imported cities are already loaded
            const existingIds = new Set(prevCities.map(c => c.id))
            const newImportedCities = parsedImportedCities.filter((city: CityDemographic) => !existingIds.has(city.id))
            
            if (newImportedCities.length > 0) {
              console.log(`✅ Loaded ${newImportedCities.length} imported cities from localStorage`)
              return [...prevCities, ...newImportedCities]
            }
            return prevCities
          })
        } catch (error) {
          console.error("❌ Failed to parse imported cities from localStorage", error)
        }
      }
    }

    initializeData()
  }, [])

  const addImportedCities = (importedCities: Partial<CityDemographic>[]) => {
    console.log("📥 Adding imported cities to current dataset:", importedCities)

    const newCities = importedCities.map((city, index) => ({
      id: `imported-${Date.now()}-${index}`,
      name: city.name || 'Unknown City',
      country: city.country || 'Unknown Country',
      population: city.population || 0,
      median_age: city.median_age || 35,
      median_income: city.median_income || 30000,
      education_level: city.education_level || 'High School',
      employment_rate: 85,
      industry_focus: city.industry_focus ? (Array.isArray(city.industry_focus) ? city.industry_focus : [city.industry_focus]) : ['Services'],
      growth_rate: 1.5,
      cost_of_living_index: 70,
      business_friendliness_score: 7.0,
    })) as CityDemographic[]

    // Add to current cities in state
    setCities((prevCities) => {
      const existingKeys = new Set(prevCities.map(c => `${c.name}-${c.country}`))
      const uniqueNewCities = newCities.filter(city => !existingKeys.has(`${city.name}-${city.country}`))
      
      console.log(`✅ Added ${uniqueNewCities.length} new cities (${newCities.length - uniqueNewCities.length} duplicates filtered)`)
      return [...prevCities, ...uniqueNewCities]
    })

    // Store only the new imported cities in localStorage (append to existing)
    const existingImportedCities = localStorage.getItem("importedCities")
    const currentImported = existingImportedCities ? JSON.parse(existingImportedCities) : []
    const updatedImported = [...currentImported, ...newCities]
    localStorage.setItem("importedCities", JSON.stringify(updatedImported))
    console.log("💾 Saved imported cities to localStorage")
  }

  const value: SupabaseDataContextType = {
    cities,
    loading,
    error,
    connectionStatus,
    refreshData,
    testConnection,
    addImportedCities,
  }

  return <SupabaseDataContext.Provider value={value}>{children}</SupabaseDataContext.Provider>
}
