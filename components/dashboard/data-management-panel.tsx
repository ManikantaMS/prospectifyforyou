"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Database, RefreshCw, Download, Upload, AlertCircle, CheckCircle } from "lucide-react"
import { useSupabaseData } from "./supabase-data-provider"

interface DataManagementPanelProps {
  isAdmin?: boolean
}

export function DataManagementPanel({ isAdmin = false }: DataManagementPanelProps) {
  const { cities, loading, error, connectionStatus, refreshData, testConnection, addImportedCities } = useSupabaseData()

  const handleRefresh = async () => {
    await refreshData()
  }

  const handleTestConnection = async () => {
    await testConnection()
  }

  const dataStats = [
    {
      label: "Total Cities",
      value: cities.length,
      description: "Available in database",
    },
    {
      label: "Countries",
      value: new Set(cities.map((city) => city.country)).size,
      description: "Geographic coverage",
    },
    {
      label: "Data Quality",
      value: "98%",
      description: "Completeness score",
    },
    {
      label: "Last Updated",
      value: "2 hours ago",
      description: "Data freshness",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Connection Status - Only for Admins */}
      {isAdmin && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-blue-600" />
              <span>Database Connection</span>
            </CardTitle>
            <CardDescription>Monitor and manage your Supabase connection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {connectionStatus?.success && !connectionStatus?.usingMock ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  )}
                  <div>
                    <h3 className="font-medium">
                      {connectionStatus?.success && !connectionStatus?.usingMock
                        ? "Connected to Supabase"
                        : "Using Mock Data"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {connectionStatus?.success && !connectionStatus?.usingMock
                        ? "Live database connection active"
                        : "Demo mode - no real database connection"}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={connectionStatus?.success && !connectionStatus?.usingMock ? "default" : "secondary"}
                  className={
                    connectionStatus?.success && !connectionStatus?.usingMock
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {connectionStatus?.success && !connectionStatus?.usingMock ? "🟢 LIVE" : "🟡 DEMO"}
                </Badge>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" onClick={handleTestConnection} disabled={loading}>
                  <Database className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
                <Button variant="outline" onClick={handleRefresh} disabled={loading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh Data
                </Button>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Error:</strong> {error}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Statistics */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Data Overview</CardTitle>
          <CardDescription>Current database statistics and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataStats.map((stat, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Management Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Import, export, and manage your demographic data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 bg-transparent"
                onClick={() => {
                  const input = document.createElement('input')
                  input.type = 'file'
                  input.accept = '.csv,.json'
                  input.onchange = async (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0]
                    if (file) {
                      console.log('📥 Importing file:', file.name)
                      
                      try {
                        const text = await file.text()
                        
                        if (file.name.endsWith('.csv')) {
                          // Parse CSV data
                          const lines = text.split('\n').filter(line => line.trim())
                          const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
                          const importedCities = []
                          
                          for (let i = 1; i < lines.length; i++) {
                            const values = lines[i].split(',').map(v => v.trim())
                            const cityData: any = {}
                            
                            headers.forEach((header, index) => {
                              if (values[index]) {
                                // Map common CSV headers to our data structure
                                switch(header) {
                                  case 'city':
                                  case 'name':
                                    cityData.name = values[index]
                                    break
                                  case 'country':
                                    cityData.country = values[index]
                                    break
                                  case 'population':
                                    cityData.population = parseInt(values[index]) || 0
                                    break
                                  case 'median_age':
                                  case 'age':
                                    cityData.median_age = parseFloat(values[index]) || 0
                                    break
                                  case 'median_income':
                                  case 'income':
                                    cityData.median_income = parseFloat(values[index]) || 0
                                    break
                                  case 'education_level':
                                  case 'education':
                                    cityData.education_level = values[index]
                                    break
                                  case 'industry_focus':
                                  case 'industry':
                                    cityData.industry_focus = values[index]
                                    break
                                  default:
                                    cityData[header] = values[index]
                                }
                              }
                            })
                            
                            if (cityData.name && cityData.country) {
                              importedCities.push(cityData)
                            }
                          }
                          
                          console.log('✅ Parsed cities:', importedCities)
                          
                          // Add the imported cities to the current dataset
                          addImportedCities(importedCities)
                          
                          alert(`Successfully imported ${importedCities.length} cities!\n\n${importedCities.map(c => `${c.name} (${c.country})`).join('\n')}\n\nCities have been added to the current dataset.`)
                          
                        } else if (file.name.endsWith('.json')) {
                          // Parse JSON data
                          const jsonData = JSON.parse(text)
                          const importedCities = Array.isArray(jsonData) ? jsonData : [jsonData]
                          
                          console.log('✅ Parsed JSON cities:', importedCities)
                          
                          // Add the imported cities to the current dataset
                          addImportedCities(importedCities)
                          
                          alert(`Successfully imported ${importedCities.length} cities from JSON!\n\nCities have been added to the current dataset.`)
                        }
                        
                      } catch (error) {
                        console.error('❌ Import error:', error)
                        const errorMessage = error instanceof Error ? error.message : 'Invalid file format'
                        alert(`Error importing file: ${errorMessage}`)
                      }
                    }
                  }
                  input.click()
                }}
              >
                <Upload className="h-6 w-6" />
                <span>Import Data</span>
                <span className="text-xs text-gray-500">Upload CSV or JSON files</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 bg-transparent"
                onClick={() => {
                  console.log('📤 Exporting data...')
                  const data = cities.length > 0 ? cities : [
                    { name: 'Madrid', country: 'Spain', population: 6641000 },
                    { name: 'Barcelona', country: 'Spain', population: 5575000 },
                    { name: 'Málaga', country: 'Spain', population: 574654 }
                  ]
                  const csvContent = 'Name,Country,Population\n' + 
                    data.map(city => `${city.name},${city.country || 'Spain'},${city.population || 0}`).join('\n')
                  
                  const blob = new Blob([csvContent], { type: 'text/csv' })
                  const url = window.URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'prospectify-cities.csv'
                  a.click()
                  window.URL.revokeObjectURL(url)
                }}
              >
                <Download className="h-6 w-6" />
                <span>Export Data</span>
                <span className="text-xs text-gray-500">Download current dataset</span>
              </Button>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Data Sources</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-blue-800">Eurostat API</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-800">World Bank Data</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-800">Local Statistics</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Pending
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Sync Status</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Demographic Data</span>
                    <span className="text-sm text-gray-600">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Economic Indicators</span>
                    <span className="text-sm text-gray-600">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Business Metrics</span>
                    <span className="text-sm text-gray-600">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
