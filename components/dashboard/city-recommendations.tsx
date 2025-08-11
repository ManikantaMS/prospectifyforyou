"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, Users, TrendingUp, Euro, GraduationCap, ExternalLink, Building, Calendar, Target } from "lucide-react"
import { demographicService, type CityDemographic } from "@/lib/supabase-demographic-service"
import type { CustomerProfile } from "./customer-profile-form"
import { useSupabaseData } from "./supabase-data-provider"

interface CityRecommendationsProps {
  customerProfile?: CustomerProfile
}

export function CityRecommendations({ customerProfile }: CityRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<CityDemographic[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCity, setSelectedCity] = useState<CityDemographic | null>(null)
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
            <div key={city.id} className="p-5 border-0 rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-900 transition-colors">
                    {city.name}, {city.country}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <Users className="h-4 w-4 mr-1" />
                    Population: {formatNumber(city.population)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <Progress value={city.match_score || 0} className="w-20 h-3" />
                    <span className="text-sm font-bold text-gray-700">{city.match_score || 0}%</span>
                  </div>
                  <Badge className={`text-xs text-white font-semibold px-3 py-1 shadow-lg ${getMatchColor(city.match_score || 0)}`}>
                    {getMatchLabel(city.match_score || 0)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span
                    title="Median age is the midpoint value of the city's population age distribution."
                    style={{ cursor: 'help', borderBottom: '1px dotted #888' }}
                  >
                    Age: {city.median_age}
                  </span>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedCity(city)}>
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-green-600" />
                        <span>{city.name}, {city.country}</span>
                      </DialogTitle>
                      <DialogDescription>
                        Detailed demographics and business information
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* Match Score Section */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Match Score</h3>
                          <Badge className={`text-white ${getMatchColor(city.match_score || 0)}`}>
                            {getMatchLabel(city.match_score || 0)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={city.match_score || 0} className="flex-1 h-3" />
                          <span className="font-semibold">{city.match_score || 0}%</span>
                        </div>
                      </div>

                      {/* Basic Information */}
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          City Overview
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Population:</span>
                              <span className="font-medium">{formatNumber(city.population)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Median Age:</span>
                              <span className="font-medium">{city.median_age} years</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Median Income:</span>
                              <span className="font-medium">€{formatNumber(city.median_income)}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Growth Rate:</span>
                              <span className="font-medium">{city.growth_rate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Business Score:</span>
                              <span className="font-medium">{city.business_friendliness_score}/10</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Cost Index:</span>
                              <span className="font-medium">{city.cost_of_living_index}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Education */}
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          Education Level
                        </h3>
                        <Badge variant="secondary" className="text-sm">
                          {city.education_level}
                        </Badge>
                      </div>

                      {/* Industries */}
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center">
                          <Target className="h-4 w-4 mr-2" />
                          Key Industries
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {city.industry_focus.map((industry, index) => (
                            <Badge key={index} variant="outline" className="text-sm">
                              {industry}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Reasons */}
                      {city.reasons && city.reasons.length > 0 && (
                        <div>
                          <h3 className="font-semibold mb-2">Why This City Matches</h3>
                          <ul className="space-y-2">
                            {city.reasons.map((reason, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-green-600 mt-1 text-sm">✓</span>
                                <span className="text-sm text-gray-700">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Data Source Info */}
                      <div className="pt-4 border-t text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Data source: Eurostat Demographics • Last updated: Today
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
