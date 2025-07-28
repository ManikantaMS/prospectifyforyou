"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { DollarSign, TrendingUp, Target } from "lucide-react"

const roiData = [
  { name: "Madrid", value: 285, color: "#0073EA" },
  { name: "Barcelona", value: 320, color: "#00CA72" },
  { name: "Valencia", value: 195, color: "#F5A623" },
  { name: "Seville", value: 140, color: "#FF3C41" },
]

const budgetAllocation = [
  { category: "Pop-up Stores", budget: 45000, spent: 38200, roi: 275 },
  { category: "Digital Marketing", budget: 25000, spent: 22100, roi: 340 },
  { category: "Events & Activations", budget: 18000, spent: 15800, roi: 220 },
  { category: "Outdoor Advertising", budget: 12000, spent: 9500, roi: 185 },
]

export function ROIAnalysis() {
  return (
    <div className="space-y-6">
      {/* ROI by City */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>ROI by City</span>
          </CardTitle>
          <CardDescription>Return on investment across target cities</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              madrid: { label: "Madrid", color: "#0073EA" },
              barcelona: { label: "Barcelona", color: "#00CA72" },
              valencia: { label: "Valencia", color: "#F5A623" },
              seville: { label: "Seville", color: "#FF3C41" },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roiData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {roiData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "ROI"]} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="mt-4 space-y-2">
            {roiData.map((city, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: city.color }} />
                  <span className="text-sm text-gray-600">{city.name}</span>
                </div>
                <span className="text-sm font-medium">{city.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            <span>Budget Analysis</span>
          </CardTitle>
          <CardDescription>Spending efficiency by campaign type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetAllocation.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{item.category}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-green-600">{item.roi}%</span>
                    <p className="text-xs text-gray-500">ROI</p>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>
                    €{item.spent.toLocaleString()} / €{item.budget.toLocaleString()}
                  </span>
                  <span>{Math.round((item.spent / item.budget) * 100)}%</span>
                </div>
                <Progress value={(item.spent / item.budget) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-yellow-600" />
            <span>Key Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">Top Performer</p>
              <p className="text-xs text-green-600">Barcelona campaigns show 320% ROI - 15% above average</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Optimization Opportunity</p>
              <p className="text-xs text-blue-600">
                Digital marketing has highest ROI at 340% - consider budget reallocation
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Budget Alert</p>
              <p className="text-xs text-yellow-600">Seville campaigns underperforming - review targeting strategy</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
