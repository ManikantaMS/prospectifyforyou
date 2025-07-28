// Eurostat API integration for real demographic data
export interface EurostatDataPoint {
  geo: string
  time: string
  value: number
  unit?: string
}

export interface DemographicData {
  population: number
  ageGroups: {
    [key: string]: number
  }
  income: {
    median: number
    average: number
  }
  gender: {
    male: number
    female: number
  }
  education: {
    [level: string]: number
  }
  employment: {
    rate: number
    sectors: {
      [sector: string]: number
    }
  }
}

export interface CityDemographics {
  city: string
  country: string
  nuts_code: string
  data: DemographicData
  lastUpdated: string
}

class EurostatAPI {
  private baseUrl = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data"
  private cache = new Map<string, { data: any; timestamp: number }>()
  private cacheTimeout = 1000 * 60 * 60 // 1 hour

  private getCachedData(key: string) {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data
    }
    return null
  }

  private setCachedData(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() })
  }

  async fetchDataset(dataset: string, params: Record<string, string> = {}): Promise<any> {
    const cacheKey = `${dataset}-${JSON.stringify(params)}`
    const cached = this.getCachedData(cacheKey)
    if (cached) return cached

    try {
      const queryParams = new URLSearchParams({
        format: "JSON",
        lang: "EN",
        ...params,
      })

      const response = await fetch(`${this.baseUrl}/${dataset}?${queryParams}`)

      if (!response.ok) {
        throw new Error(`Eurostat API error: ${response.status}`)
      }

      const data = await response.json()
      this.setCachedData(cacheKey, data)
      return data
    } catch (error) {
      console.error("Error fetching Eurostat data:", error)
      // Return mock data for development
      return this.getMockData(dataset)
    }
  }

  async getPopulationData(nutsCodes: string[]): Promise<EurostatDataPoint[]> {
    const data = await this.fetchDataset("demo_r_pjangrp3", {
      geo: nutsCodes.join(","),
      time: "2023",
      age: "TOTAL",
      sex: "T",
    })

    return this.parseEurostatResponse(data)
  }

  async getIncomeData(nutsCodes: string[]): Promise<EurostatDataPoint[]> {
    const data = await this.fetchDataset("ilc_di04", {
      geo: nutsCodes.join(","),
      time: "2023",
      indic_il: "MED_E",
    })

    return this.parseEurostatResponse(data)
  }

  async getAgeGroupData(nutsCodes: string[]): Promise<EurostatDataPoint[]> {
    const data = await this.fetchDataset("demo_r_pjangrp3", {
      geo: nutsCodes.join(","),
      time: "2023",
      age: "Y15-29,Y30-49,Y50-64,Y65-MAX",
      sex: "T",
    })

    return this.parseEurostatResponse(data)
  }

  async getEducationData(nutsCodes: string[]): Promise<EurostatDataPoint[]> {
    const data = await this.fetchDataset("edat_lfse_04", {
      geo: nutsCodes.join(","),
      time: "2023",
      isced11: "ED3-8",
    })

    return this.parseEurostatResponse(data)
  }

  async getEmploymentData(nutsCodes: string[]): Promise<EurostatDataPoint[]> {
    const data = await this.fetchDataset("lfst_r_lfe2emprt", {
      geo: nutsCodes.join(","),
      time: "2023",
      sex: "T",
      age: "Y20-64",
    })

    return this.parseEurostatResponse(data)
  }

  private parseEurostatResponse(data: any): EurostatDataPoint[] {
    if (!data || !data.value) return []

    const dimensions = data.dimension
    const values = data.value

    const result: EurostatDataPoint[] = []

    Object.keys(values).forEach((key) => {
      const indices = key.split(":").map(Number)
      const geoIndex = indices[dimensions.geo.category.index]
      const timeIndex = indices[dimensions.time.category.index]

      const geo = dimensions.geo.category.label[Object.keys(dimensions.geo.category.label)[geoIndex]]
      const time = dimensions.time.category.label[Object.keys(dimensions.time.category.label)[timeIndex]]

      result.push({
        geo,
        time,
        value: values[key] || 0,
      })
    })

    return result
  }

  private getMockData(dataset: string): any {
    // Mock data for development when API is unavailable
    const mockData = {
      demo_r_pjangrp3: {
        value: {
          "0:0:0:0": 3223334,
          "1:0:0:0": 1620343,
          "2:0:0:0": 794875,
          "3:0:0:0": 688440,
        },
        dimension: {
          geo: {
            category: {
              index: { ES30: 0, ES51: 1, ES52: 2, ES61: 3 },
              label: { ES30: "Madrid", ES51: "Barcelona", ES52: "Valencia", ES61: "Seville" },
            },
          },
          time: {
            category: {
              index: { "2023": 0 },
              label: { "2023": "2023" },
            },
          },
        },
      },
    }

    return mockData[dataset] || { value: {}, dimension: {} }
  }
}

export const eurostatAPI = new EurostatAPI()
