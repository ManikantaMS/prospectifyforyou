"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MapPin, TrendingUp, Users, Euro, ExternalLink, Download } from "lucide-react"

export function FallbackCityRecommendations() {
  const mockRecommendations = [
    {
      city: "Madrid",
      country: "Spain",
      nuts_code: "ES30",
      matchScore: 95,
      data: {
        population: 3223334,
        ageGroups: { "15-29": 805834, "30-49": 1128167, "50-64": 805834, "65+": 483500 },
        income: { median: 45200, average: 52000 },
        employment: { rate: 78.5 },
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      city: "Barcelona",
      country: "Spain",
      nuts_code: "ES51",
      matchScore: 92,
      data: {
        population: 1620343,
        ageGroups: { "15-29": 405086, "30-49": 567120, "50-64": 405086, "65+": 243051 },
        income: { median: 42800, average: 49220 },
        employment: { rate: 76.2 },
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      city: "Valencia",
      country: "Spain",
      nuts_code: "ES52",
      matchScore: 87,
      data: {
        population: 794875,
        ageGroups: { "15-29": 198719, "30-49": 278206, "50-64": 198719, "65+": 119231 },
        income: { median: 38900, average: 44735 },
        employment: { rate: 74.8 },
      },
      lastUpdated: new Date().toISOString(),
    },
  ]

  const getMatchColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 80) return "bg-blue-100 text-blue-800"
    if (score >= 70) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getMatchLabel = (score: number) => {
    if (score >= 90) return "Excellent"
    if (score >= 80) return "Very Good"
    if (score >= 70) return "Good"
    return "Fair"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <span>City Recommendations</span>
              <Badge variant="outline" className="ml-2">
                Demo Mode
              </Badge>
            </CardTitle>
            <CardDescription>Cities ranked by demographic data for Fashion in Spain</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Map
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockRecommendations.map((city, index) => (
            <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{city.city}</h3>
                    <Badge className={getMatchColor(city.matchScore)}>{getMatchLabel(city.matchScore)}</Badge>
                    <Badge variant="outline">NUTS: {city.nuts_code}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">{city.country}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{city.matchScore}%</div>
                  <p className="text-xs text-gray-500">Match Score</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Demographic Match</span>
                  <span>{city.matchScore}%</span>
                </div>
                <Progress value={city.matchScore} className="h-2" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{city.data.population.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Total Population</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {Math.round(city.data.population * 0.3).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Target Audience</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Euro className="h-4 w-4 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">€{city.data.income.median.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Median Income</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">#{index + 1}</p>
                    <p className="text-xs text-gray-500">Ranking</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-xs text-gray-500">
                  Demo data • Updated: {new Date(city.lastUpdated).toLocaleDateString()}
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Plan Campaign
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900">Demo Mode</h4>
              <p className="text-sm text-blue-700 mt-1">
                This is demo data. Connect Supabase to get real-time Eurostat demographic data updated every 30 minutes.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
