export interface Database {
  public: {
    Tables: {
      cities: {
        Row: {
          id: string
          name: string
          country: string
          nuts_code: string
          latitude: number
          longitude: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          country: string
          nuts_code: string
          latitude: number
          longitude: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          country?: string
          nuts_code?: string
          latitude?: number
          longitude?: number
          created_at?: string
          updated_at?: string
        }
      }
      demographic_data: {
        Row: {
          id: string
          city_id: string
          population: number
          age_15_29: number
          age_30_49: number
          age_50_64: number
          age_65_plus: number
          median_income: number
          average_income: number
          male_population: number
          female_population: number
          higher_education: number
          employment_rate: number
          services_employment: number
          industry_employment: number
          agriculture_employment: number
          data_source: string
          last_updated: string
          created_at: string
        }
        Insert: {
          id?: string
          city_id: string
          population: number
          age_15_29: number
          age_30_49: number
          age_50_64: number
          age_65_plus: number
          median_income: number
          average_income: number
          male_population: number
          female_population: number
          higher_education: number
          employment_rate: number
          services_employment: number
          industry_employment: number
          agriculture_employment: number
          data_source: string
          last_updated?: string
          created_at?: string
        }
        Update: {
          id?: string
          city_id?: string
          population?: number
          age_15_29?: number
          age_30_49?: number
          age_50_64?: number
          age_65_plus?: number
          median_income?: number
          average_income?: number
          male_population?: number
          female_population?: number
          higher_education?: number
          employment_rate?: number
          services_employment?: number
          industry_employment?: number
          agriculture_employment?: number
          data_source?: string
          last_updated?: string
          created_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          user_id: string
          name: string
          industry: string
          target_cities: string[]
          age_min: number
          age_max: number
          gender: string
          min_income: number
          budget: number
          status: "draft" | "active" | "paused" | "completed"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          industry: string
          target_cities: string[]
          age_min: number
          age_max: number
          gender: string
          min_income: number
          budget: number
          status?: "draft" | "active" | "paused" | "completed"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          industry?: string
          target_cities?: string[]
          age_min?: number
          age_max?: number
          gender?: string
          min_income?: number
          budget?: number
          status?: "draft" | "active" | "paused" | "completed"
          created_at?: string
          updated_at?: string
        }
      }
      campaign_performance: {
        Row: {
          id: string
          campaign_id: string
          city_id: string
          impressions: number
          clicks: number
          conversions: number
          revenue: number
          cost: number
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          campaign_id: string
          city_id: string
          impressions: number
          clicks: number
          conversions: number
          revenue: number
          cost: number
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          campaign_id?: string
          city_id?: string
          impressions?: number
          clicks?: number
          conversions?: number
          revenue?: number
          cost?: number
          date?: string
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          company_name: string | null
          industry: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          company_name?: string | null
          industry?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          company_name?: string | null
          industry?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
