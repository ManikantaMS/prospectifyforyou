"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, BarChart3, PieChart, Calendar } from "lucide-react"
import { useState } from "react"

export function ExportReports() {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["revenue", "roi", "conversions"])

  const metrics = [
    { id: "revenue", label: "Revenue & Costs", icon: FileText },
    { id: "roi", label: "ROI Analysis", icon: BarChart3 },
    { id: "conversions", label: "Conversion Metrics", icon: PieChart },
    { id: "impressions", label: "Impressions & Reach", icon: BarChart3 },
    { id: "demographics", label: "Demographic Data", icon: FileText },
    { id: "timeline", label: "Campaign Timeline", icon: Calendar },
  ]

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics((prev) => (prev.includes(metricId) ? prev.filter((id) => id !== metricId) : [...prev, metricId]))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="h-5 w-5 text-blue-600" />
          <span>Export Reports</span>
        </CardTitle>
        <CardDescription>Generate and download detailed performance reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Select Metrics to Include</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {metrics.map((metric) => (
                  <div key={metric.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={metric.id}
                      checked={selectedMetrics.includes(metric.id)}
                      onCheckedChange={() => handleMetricToggle(metric.id)}
                    />
                    <label
                      htmlFor={metric.id}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      <metric.icon className="h-4 w-4" />
                      <span>{metric.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Format</label>
                <Select defaultValue="pdf">
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV Data</SelectItem>
                    <SelectItem value="powerpoint">PowerPoint Presentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <Select defaultValue="last-30-days">
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Filter</label>
              <Select defaultValue="all-campaigns">
                <SelectTrigger>
                  <SelectValue placeholder="Select campaigns" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-campaigns">All Campaigns</SelectItem>
                  <SelectItem value="active-only">Active Campaigns Only</SelectItem>
                  <SelectItem value="completed-only">Completed Campaigns Only</SelectItem>
                  <SelectItem value="madrid-campaigns">Madrid Campaigns</SelectItem>
                  <SelectItem value="barcelona-campaigns">Barcelona Campaigns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Export Options */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Export</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Executive Summary
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  ROI Analysis Report
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <PieChart className="mr-2 h-4 w-4" />
                  City Performance Report
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Monthly Summary
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Generate Custom Report
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">Report will be ready in 2-3 minutes</p>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Recent Reports</h3>
          <div className="space-y-3">
            {[
              { name: "January Performance Summary", date: "2024-02-01", size: "2.4 MB", format: "PDF" },
              { name: "Q4 2023 ROI Analysis", date: "2024-01-15", size: "1.8 MB", format: "Excel" },
              { name: "Madrid Campaign Deep Dive", date: "2024-01-10", size: "3.1 MB", format: "PDF" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{report.name}</p>
                    <p className="text-xs text-gray-500">
                      {report.date} • {report.size} • {report.format}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
