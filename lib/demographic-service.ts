import { eurostatAPI, type CityDemographics, type DemographicData } from "./eurostat-api"

// NUTS codes for major Spanish cities
const SPANISH_CITIES_NUTS = {
  Madrid: "ES30",
  Barcelona: "ES51",
  Valencia: "ES52",
  Seville: "ES61",
  Zaragoza: "ES24",
  Málaga: "ES61",
  Murcia: "ES62",
  Palma: "ES53",
  "Las Palmas": "ES70",
  Bilbao: "ES21",
}

// Similar mappings for other EU countries
const FRENCH_CITIES_NUTS = {
  Paris: "FR10",
  Lyon: "FR71",
  Marseille: "FR93",
  Toulouse: "FR62",
  Nice: "FR93",
  Nantes: "FR51",
  Strasbourg: "FR42",
  Montpellier: "FR81",
}

const GERMAN_CITIES_NUTS = {
  Berlin: "DE30",
  Hamburg: "DE60",
  Munich: "DE21",
  Cologne: "DEA2",
  Frankfurt: "DE71",
  Stuttgart: "DE11",
  Düsseldorf: "DEA1",
  Dortmund: "DEA5",
}

export class DemographicService {
  private static instance: DemographicService
  private cache = new Map<string, CityDemographics>()

  static getInstance(): DemographicService {
    if (!DemographicService.instance) {
      DemographicService.instance = new DemographicService()
    }
    return DemographicService.instance
  }

  async getCityDemographics(city: string, country: string): Promise<CityDemographics | null> {
    const cacheKey = `${city}-${country}`

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    try {
      const nutsCode = this.getNutsCode(city, country)
      if (!nutsCode) {
        throw new Error(`NUTS code not found for ${city}, ${country}`)
      }

      const [populationData, incomeData, ageData, educationData, employmentData] = await Promise.all([
        eurostatAPI.getPopulationData([nutsCode]),
        eurostatAPI.getIncomeData([nutsCode]),
        eurostatAPI.getAgeGroupData([nutsCode]),
        eurostatAPI.getEducationData([nutsCode]),
        eurostatAPI.getEmploymentData([nutsCode]),
      ])

      const demographics: CityDemographics = {
        city,
        country,
        nuts_code: nutsCode,
        data: this.processDemographicData(populationData, incomeData, ageData, educationData, employmentData),
        lastUpdated: new Date().toISOString(),
      }

      this.cache.set(cacheKey, demographics)
      return demographics
    } catch (error) {
      console.error(`Error fetching demographics for ${city}:`, error)
      return this.getMockCityData(city, country)
    }
  }

  async getMultipleCitiesDemographics(cities: Array<{ city: string; country: string }>): Promise<CityDemographics[]> {
    const promises = cities.map(({ city, country }) => this.getCityDemographics(city, country))
    const results = await Promise.all(promises)
    return results.filter((result) => result !== null) as CityDemographics[]
  }

  async getCitiesByTargetProfile(profile: {
    country: string
    industry: string
    ageMin: number
    ageMax: number
    gender: string
    minIncome: number
  }): Promise<CityDemographics[]> {
    const cities = this.getCitiesForCountry(profile.country)
    const demographics = await this.getMultipleCitiesDemographics(cities)

    return demographics
      .map((city) => ({
        ...city,
        matchScore: this.calculateMatchScore(city, profile),
      }))
      .sort((a, b) => (b as any).matchScore - (a as any).matchScore)
      .slice(0, 10) // Top 10 matches
  }

  private getNutsCode(city: string, country: string): string | null {
    const countryMappings = {
      Spain: SPANISH_CITIES_NUTS,
      France: FRENCH_CITIES_NUTS,
      Germany: GERMAN_CITIES_NUTS,
    }

    const mapping = countryMappings[country as keyof typeof countryMappings]
    return mapping?.[city as keyof typeof mapping] || null
  }

  private getCitiesForCountry(country: string): Array<{ city: string; country: string }> {
    const countryMappings = {
      Spain: Object.keys(SPANISH_CITIES_NUTS),
      France: Object.keys(FRENCH_CITIES_NUTS),
      Germany: Object.keys(GERMAN_CITIES_NUTS),
    }

    const cities = countryMappings[country as keyof typeof countryMappings] || []
    return cities.map((city) => ({ city, country }))
  }

  private processDemographicData(
    populationData: any[],
    incomeData: any[],
    ageData: any[],
    educationData: any[],
    employmentData: any[],
  ): DemographicData {
    const population = populationData[0]?.value || 0
    const medianIncome = incomeData[0]?.value || 35000

    // Process age groups
    const ageGroups: { [key: string]: number } = {}
    ageData.forEach((item) => {
      if (item.geo && item.value) {
        ageGroups[item.geo] = item.value
      }
    })

    // Calculate gender distribution (approximate)
    const maleRatio = 0.49
    const femaleRatio = 0.51

    return {
      population,
      ageGroups: {
        "15-29": ageGroups["Y15-29"] || population * 0.25,
        "30-49": ageGroups["Y30-49"] || population * 0.35,
        "50-64": ageGroups["Y50-64"] || population * 0.25,
        "65+": ageGroups["Y65-MAX"] || population * 0.15,
      },
      income: {
        median: medianIncome,
        average: medianIncome * 1.15,
      },
      gender: {
        male: Math.round(population * maleRatio),
        female: Math.round(population * femaleRatio),
      },
      education: {
        "Higher Education": educationData[0]?.value || population * 0.35,
        "Secondary Education": population * 0.45,
        "Primary Education": population * 0.2,
      },
      employment: {
        rate: employmentData[0]?.value || 75,
        sectors: {
          Services: population * 0.65,
          Industry: population * 0.25,
          Agriculture: population * 0.1,
        },
      },
    }
  }

  private calculateMatchScore(city: CityDemographics, profile: any): number {
    let score = 0
    const data = city.data

    // Age matching
    const targetAgeGroup = this.getAgeGroup(profile.ageMin, profile.ageMax)
    const agePopulation = data.ageGroups[targetAgeGroup] || 0
    const ageScore = (agePopulation / data.population) * 100
    score += ageScore * 0.3

    // Income matching
    const incomeScore = data.income.median >= profile.minIncome ? 100 : (data.income.median / profile.minIncome) * 100
    score += Math.min(incomeScore, 100) * 0.3

    // Population density score
    const populationScore = Math.min((data.population / 1000000) * 100, 100)
    score += populationScore * 0.2

    // Industry-specific adjustments
    const industryMultiplier = this.getIndustryMultiplier(profile.industry, city.city)
    score *= industryMultiplier

    // Gender matching
    if (profile.gender !== "all") {
      const genderPopulation = profile.gender === "female" ? data.gender.female : data.gender.male
      const genderScore = (genderPopulation / data.population) * 100
      score += genderScore * 0.2
    }

    return Math.min(Math.round(score), 100)
  }

  private getAgeGroup(min: number, max: number): string {
    if (min >= 15 && max <= 29) return "15-29"
    if (min >= 30 && max <= 49) return "30-49"
    if (min >= 50 && max <= 64) return "50-64"
    if (min >= 65) return "65+"
    return "30-49" // default
  }

  private getIndustryMultiplier(industry: string, city: string): number {
    const industryMultipliers: { [key: string]: { [key: string]: number } } = {
      fashion: {
        Madrid: 1.2,
        Barcelona: 1.15,
        Paris: 1.25,
        Milan: 1.3,
      },
      food: {
        Barcelona: 1.1,
        Lyon: 1.15,
        Bologna: 1.2,
      },
      electronics: {
        Munich: 1.2,
        Stuttgart: 1.15,
        Eindhoven: 1.25,
      },
    }

    return industryMultipliers[industry]?.[city] || 1.0
  }

  private getMockCityData(city: string, country: string): CityDemographics {
    // Fallback mock data when API is unavailable
    const mockPopulations: { [key: string]: number } = {
      Madrid: 3223334,
      Barcelona: 1620343,
      Valencia: 794875,
      Seville: 688440,
    }

    const population = mockPopulations[city] || 500000

    return {
      city,
      country,
      nuts_code: this.getNutsCode(city, country) || "UNKNOWN",
      data: {
        population,
        ageGroups: {
          "15-29": Math.round(population * 0.25),
          "30-49": Math.round(population * 0.35),
          "50-64": Math.round(population * 0.25),
          "65+": Math.round(population * 0.15),
        },
        income: {
          median: 35000,
          average: 40250,
        },
        gender: {
          male: Math.round(population * 0.49),
          female: Math.round(population * 0.51),
        },
        education: {
          "Higher Education": Math.round(population * 0.35),
          "Secondary Education": Math.round(population * 0.45),
          "Primary Education": Math.round(population * 0.2),
        },
        employment: {
          rate: 75,
          sectors: {
            Services: Math.round(population * 0.65),
            Industry: Math.round(population * 0.25),
            Agriculture: Math.round(population * 0.1),
          },
        },
      },
      lastUpdated: new Date().toISOString(),
    }
  }
}

export const demographicService = DemographicService.getInstance()
