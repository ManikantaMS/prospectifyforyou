import { getSupabaseClient, isSupabaseConfigured } from "./supabase"

export interface CityDemographic {
  id: string
  name: string
  country: string
  population: number
  median_age: number
  median_income: number
  education_level: string
  employment_rate: number
  industry_focus: string[]
  growth_rate: number
  cost_of_living_index: number
  business_friendliness_score: number
  match_score?: number
  reasons?: string[]
}

export interface CustomerProfile {
  age_range: [number, number]
  income_range: [number, number]
  education_levels: string[]
  interests: string[]
  location_preferences: string[]
}

// Enhanced mock data for development and fallback
const mockCities: CityDemographic[] = [
  {
    id: "1",
    name: "Madrid",
    country: "Spain",
    population: 6641000,
    median_age: 43.2,
    median_income: 35000,
    education_level: "University",
    employment_rate: 92.5,
    industry_focus: ["Technology", "Finance", "Tourism"],
    growth_rate: 2.1,
    cost_of_living_index: 75,
    business_friendliness_score: 8.2,
    match_score: 95,
    reasons: ["High education level", "Strong tech industry", "Growing population"],
  },
  {
    id: "2",
    name: "Barcelona",
    country: "Spain",
    population: 5575000,
    median_age: 41.8,
    median_income: 32000,
    education_level: "University",
    employment_rate: 89.3,
    industry_focus: ["Technology", "Design", "Tourism"],
    growth_rate: 1.8,
    cost_of_living_index: 72,
    business_friendliness_score: 8.0,
    match_score: 88,
    reasons: ["Creative industry hub", "International appeal", "Young professionals"],
  },
  {
    id: "3",
    name: "Valencia",
    country: "Spain",
    population: 1578000,
    median_age: 42.1,
    median_income: 28000,
    education_level: "High School",
    employment_rate: 87.2,
    industry_focus: ["Agriculture", "Manufacturing", "Services"],
    growth_rate: 1.5,
    cost_of_living_index: 65,
    business_friendliness_score: 7.5,
    match_score: 75,
    reasons: ["Lower cost of living", "Growing services sector", "Strategic location"],
  },
  {
    id: "4",
    name: "Seville",
    country: "Spain",
    population: 1508000,
    median_age: 43.8,
    median_income: 26000,
    education_level: "High School",
    employment_rate: 84.1,
    industry_focus: ["Tourism", "Agriculture", "Aerospace"],
    growth_rate: 1.2,
    cost_of_living_index: 62,
    business_friendliness_score: 7.2,
    match_score: 68,
    reasons: ["Tourism potential", "Aerospace industry", "Cultural significance"],
  },
  {
    id: "5",
    name: "Zaragoza",
    country: "Spain",
    population: 674997,
    median_age: 44.1,
    median_income: 27500,
    education_level: "High School",
    employment_rate: 85.8,
    industry_focus: ["Manufacturing", "Logistics", "Services"],
    growth_rate: 1.3,
    cost_of_living_index: 63,
    business_friendliness_score: 7.3,
    match_score: 72,
    reasons: ["Strategic logistics hub", "Manufacturing base", "Affordable living"],
  },
  {
    id: "6",
    name: "Málaga",
    country: "Spain",
    population: 574654,
    median_age: 42.9,
    median_income: 25800,
    education_level: "High School",
    employment_rate: 82.4,
    industry_focus: ["Tourism", "Technology", "Services"],
    growth_rate: 2.3,
    cost_of_living_index: 68,
    business_friendliness_score: 7.8,
    match_score: 78,
    reasons: ["Growing tech scene", "Tourism infrastructure", "Coastal location"],
  },
]

export class SupabaseDemographicService {
  private client = getSupabaseClient()

  async getCitiesWithDemographics(countryFilter?: string, minIncome?: number, maxIncome?: number): Promise<CityDemographic[]> {
    console.log("🏙️ Getting cities with demographics...")

    // Check if Supabase is configured
    if (!isSupabaseConfigured() || !this.client) {
      console.log("🎭 Using mock data - Supabase not configured")
      return mockCities
    }

    try {
      console.log("🔍 Attempting to fetch from Supabase database...")

      // Add timeout to prevent hanging (increased to 30 seconds)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Database query timeout - falling back to mock data")), 30000)
      )

      // Step 1: Fetch cities first with filters, order, and limit for better performance
      console.log("📍 Fetching cities with filters...")
      let citiesQuery = this.client
        .from("cities")
        .select("id, name, country, nuts_code, latitude, longitude")

      // Apply filters early for better performance
      if (countryFilter) {
        citiesQuery = citiesQuery.eq("country", countryFilter)
      }

      const citiesQueryPromise = citiesQuery
        .order("name", { ascending: true })
        .limit(20)

      const { data: cities, error: citiesError } = (await Promise.race([citiesQueryPromise, timeoutPromise])) as any

      if (citiesError) {
        console.error("❌ Cities query error:", citiesError)
        console.log("🔄 Falling back to mock data")
        return mockCities
      }

      if (!cities || cities.length === 0) {
        console.log("📭 No cities returned, using mock data")
        return mockCities
      }

      // Step 2: Fetch demographic data for the selected cities
      console.log("📊 Fetching demographic data for selected cities...")
      const cityIds = cities.map((city: any) => city.id)

      let demographicQuery = this.client
        .from("demographic_data")
        .select(`
          city_id,
          population,
          age_15_29,
          age_30_49,
          age_50_64,
          age_65_plus,
          median_income,
          average_income,
          male_population,
          female_population,
          higher_education,
          employment_rate,
          services_employment,
          industry_employment,
          agriculture_employment
        `)
        .in("city_id", cityIds)

      // Apply income filters if provided
      if (minIncome !== undefined) {
        demographicQuery = demographicQuery.gte("median_income", minIncome)
      }
      if (maxIncome !== undefined) {
        demographicQuery = demographicQuery.lte("median_income", maxIncome)
      }

      const { data: demographics, error: demographicsError } = (await Promise.race([demographicQuery, timeoutPromise])) as any

      if (demographicsError) {
        console.error("❌ Demographics query error:", demographicsError)
        console.log("🔄 Falling back to mock data")
        return mockCities
      }

      if (!demographics || demographics.length === 0) {
        console.log("📭 No demographic data returned, using mock data")
        return mockCities
      }

      // Step 3: Combine cities with their demographic data
      const demographicsMap = new Map()
      demographics.forEach((demo: any) => {
        demographicsMap.set(demo.city_id, demo)
      })

      // Transform the data to match CityDemographic interface
      const transformedData: CityDemographic[] = cities
        .filter((city: any) => demographicsMap.has(city.id))
        .map((city: any) => {
          const demo = demographicsMap.get(city.id)
          return {
            id: city.id,
            name: city.name,
            country: city.country,
            population: demo.population,
            median_age: Math.round((demo.age_30_49 / demo.population) * 40 + (demo.age_50_64 / demo.population) * 55), // Estimated
            median_income: demo.median_income,
            education_level: demo.higher_education > demo.population * 0.5 ? "University" : "High School", // Convert to string
            employment_rate: demo.employment_rate,
            industry_focus: demo.services_employment > demo.industry_employment ? ["Services"] : ["Industry"], // Convert to array
            growth_rate: 2.1, // Mock data for now
            cost_of_living_index: 75, // Mock data for now
            business_friendliness_score: 7.5, // Mock data for now
            match_score: 0,
            reasons: []
          }
        })

      console.log(`✅ Successfully fetched and transformed ${transformedData.length} cities from Supabase`)
      return transformedData
    } catch (error) {
      console.error("❌ Error fetching cities:", error)

      if (error instanceof Error) {
        if (error.message.includes("timeout")) {
          console.log("⏱️ Query timed out - using mock data")
        } else if (error.message.includes("Failed to fetch")) {
          console.log("🌐 Network connection failed - using mock data")
        }
      }

      console.log("🔄 Falling back to mock data")
      return mockCities
    }
  }

  async getCityRecommendations(profile: CustomerProfile): Promise<CityDemographic[]> {
    console.log("🎯 Getting city recommendations for profile:", profile)

    try {
      // Extract filters from customer profile for better performance
      const countryFilter = profile.location_preferences.length > 0 ? profile.location_preferences[0] : undefined
      const [minIncome, maxIncome] = profile.income_range

      // Use optimized query with early filtering
      const cities = await this.getCitiesWithDemographics(
        countryFilter,
        minIncome > 0 ? minIncome : undefined,
        maxIncome < Number.MAX_SAFE_INTEGER ? maxIncome : undefined
      )

      // Calculate match scores based on customer profile
      const citiesWithScores = cities.map((city) => {
        let score = 0
        const reasons: string[] = []

        // Age matching
        const cityMedianAge = city.median_age
        const [minAge, maxAge] = profile.age_range
        if (cityMedianAge >= minAge && cityMedianAge <= maxAge) {
          score += 25
          reasons.push(`Median age (${cityMedianAge}) matches target range`)
        }

        // Income matching
        const cityMedianIncome = city.median_income
        const [minIncome, maxIncome] = profile.income_range
        if (cityMedianIncome >= minIncome && cityMedianIncome <= maxIncome) {
          score += 30
          reasons.push(`Income level (€${cityMedianIncome.toLocaleString()}) fits target range`)
        }

        // Education matching
        if (profile.education_levels.includes(city.education_level)) {
          score += 20
          reasons.push(`Education level (${city.education_level}) matches requirements`)
        }

        // Industry/Interest matching
        const industryMatches = city.industry_focus.filter((industry) =>
          profile.interests.some(
            (interest) =>
              industry.toLowerCase().includes(interest.toLowerCase()) ||
              interest.toLowerCase().includes(industry.toLowerCase()),
          ),
        )
        if (industryMatches.length > 0) {
          score += 15
          reasons.push(`Industry focus matches interests: ${industryMatches.join(", ")}`)
        }

        // Business environment bonus
        if (city.business_friendliness_score > 7.5) {
          score += 10
          reasons.push(`High business friendliness score (${city.business_friendliness_score})`)
        }

        return {
          ...city,
          match_score: Math.min(score, 100),
          reasons,
        }
      })

      // Sort by match score and return top recommendations
      const recommendations = citiesWithScores.sort((a, b) => (b.match_score || 0) - (a.match_score || 0)).slice(0, 10)

      console.log(`✅ Generated ${recommendations.length} city recommendations`)
      return recommendations
    } catch (error) {
      console.error("❌ Error generating recommendations:", error)
      // Return mock recommendations with scores
      return mockCities.map((city) => ({
        ...city,
        match_score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        reasons: ["Mock recommendation", "Based on sample data"],
      }))
    }
  }

  async getCityById(id: string): Promise<CityDemographic | null> {
    console.log("🔍 Getting city by ID:", id)

    try {
      if (!isSupabaseConfigured() || !this.client) {
        const mockCity = mockCities.find((city) => city.id === id)
        return mockCity || null
      }

      const { data, error } = await this.client
        .from("cities")
        .select(`
          id,
          name,
          country,
          nuts_code,
          latitude,
          longitude,
          demographic_data (
            population,
            age_15_29,
            age_30_49,
            age_50_64,
            age_65_plus,
            median_income,
            average_income,
            male_population,
            female_population,
            higher_education,
            employment_rate,
            services_employment,
            industry_employment,
            agriculture_employment
          )
        `)
        .eq("id", id)
        .single()

      if (error) {
        console.error("❌ Error fetching city:", error)
        return mockCities.find((city) => city.id === id) || null
      }

      if (!data.demographic_data || data.demographic_data.length === 0) {
        console.log("📭 No demographic data for city")
        return mockCities.find((city) => city.id === id) || null
      }

      // Transform the joined data
      const demo = data.demographic_data[0] as any
      const transformedCity: CityDemographic = {
        id: data.id as string,
        name: data.name as string,
        country: data.country as string,
        population: demo.population,
        median_age: Math.round((demo.age_30_49 / demo.population) * 40 + (demo.age_50_64 / demo.population) * 55),
        median_income: demo.median_income,
        education_level: demo.higher_education > demo.population * 0.5 ? "University" : "High School",
        employment_rate: demo.employment_rate,
        industry_focus: demo.services_employment > demo.industry_employment ? ["Services"] : ["Industry"],
        growth_rate: 2.1,
        cost_of_living_index: 75,
        business_friendliness_score: 7.5,
        match_score: 0,
        reasons: []
      }

      return transformedCity
    } catch (error) {
      console.error("❌ Error in getCityById:", error)
      return mockCities.find((city) => city.id === id) || null
    }
  }

  async searchCities(query: string): Promise<CityDemographic[]> {
    console.log("🔍 Searching cities with query:", query)

    try {
      const cities = await this.getCitiesWithDemographics() // No filters for search - get all cities

      const filteredCities = cities.filter(
        (city) =>
          city.name.toLowerCase().includes(query.toLowerCase()) ||
          city.country.toLowerCase().includes(query.toLowerCase()) ||
          city.industry_focus.some((industry) => industry.toLowerCase().includes(query.toLowerCase())),
      )

      console.log(`✅ Found ${filteredCities.length} cities matching "${query}"`)
      return filteredCities
    } catch (error) {
      console.error("❌ Error searching cities:", error)
      return mockCities.filter((city) => city.name.toLowerCase().includes(query.toLowerCase()))
    }
  }
}

// Export singleton instance
export const demographicService = new SupabaseDemographicService()