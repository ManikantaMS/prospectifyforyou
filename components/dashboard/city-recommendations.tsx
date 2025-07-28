"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MapPin, Users, TrendingUp, Euro, GraduationCap, ExternalLink } from "lucide-react"
import { demographicService, type CityDemographic } from "@/lib/supabase-demographic-service"
import type { CustomerProfile } from "./customer-profile-form"
import { useSupabaseData } from "./supabase-data-provider"

interface CityRecommendationsProps {
  customerProfile?: CustomerProfile
}

export function CityRecommendations({ customerProfile }: CityRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<CityDemographic[]>([])
  const [loading, setLoading] = useState(false)
  const { cities } = useSupabaseData()

  const defaultProfile: CustomerProfile = {
    age_range: [25, 45],
    income_range: [30000, 60000],
    education_levels: ["University"],
    interests: ["Technology"],
    location_preferences: ["Urban"],
  }

  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true)
      try {
        const profile = customerProfile || defaultProfile
        const recs = await demographicService.getCityRecommendations(profile)
        setRecommendations(recs)
      } catch (error) {
        console.error("Error loading recommendations:", error)
        // Fallback to showing all cities if recommendations fail
        setRecommendations(cities.slice(0, 4))
      } finally {
        setLoading(false)
      }
    }

    loadRecommendations()
  }, [customerProfile, cities])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  const getMatchColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getMatchLabel = (score: number) => {
    if (score >= 80) return "Excellent Match"
    if (score >= 60) return "Good Match"
    return "Fair Match"
  }

  if (loading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <span>City Recommendations</span>
          </CardTitle>
          <CardDescription>Loading personalized recommendations...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-green-600" />
          <span>City Recommendations</span>
        </CardTitle>
        <CardDescription>Top cities matching your customer profile ({recommendations.length} found)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.slice(0, 4).map((city) => (
            <div key={city.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {city.name}, {city.country}
                  </h3>
                  <p className="text-sm text-gray-600">Population: {formatNumber(city.population)}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <Progress value={city.match_score || 0} className="w-16 h-2" />
                    <span className="text-sm font-medium">{city.match_score || 0}%</span>
                  </div>
                  <Badge className={`text-xs text-white ${getMatchColor(city.match_score || 0)}`}>
                    {getMatchLabel(city.match_score || 0)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>Age: {city.median_age}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Euro className="h-4 w-4 text-gray-500" />
                  <span>€{formatNumber(city.median_income)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-gray-500" />
                  <span>{city.education_level}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  <span>{city.growth_rate}% growth</span>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-1">Key Industries:</p>
                <div className="flex flex-wrap gap-1">
                  {city.industry_focus.slice(0, 3).map((industry, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>

              {city.reasons && city.reasons.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-1">Why this city:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {city.reasons.slice(0, 2).map((reason, index) => (
                      <li key={index} className="flex items-start space-x-1">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                  <span>Business Score: {city.business_friendliness_score}/10</span>
                  <span>Cost Index: {city.cost_of_living_index}</span>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Details
                </Button>
              </div>
            </div>
          ))}

          {recommendations.length === 0 && (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No recommendations found</p>
              <p className="text-sm text-gray-500">Try adjusting your customer profile criteria</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
