"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, BarChart3, PieChart, Calendar } from "lucide-react"
import { useState } from "react"

export function ExportReports() {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["revenue", "roi", "conversions"])
  const [reportFormat, setReportFormat] = useState("pdf")
  const [timePeriod, setTimePeriod] = useState("last30days")
  const [campaignFilter, setCampaignFilter] = useState("all")

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

  // Quick export functions
  const generateExecutiveSummary = () => {
    const summaryData = [
      ['Metric', 'Value', 'Change'],
      ['Total Revenue', '€187,450', '+15.3%'],
      ['Total Campaigns', '12', '+2'],
      ['Average ROI', '285%', '+12%'],
      ['Total Conversions', '2,340', '+18.7%'],
      ['Cost per Acquisition', '€18.50', '-8.2%'],
      ['Active Cities', '8', '+1'],
    ]

    const csvContent = summaryData.map(row => row.join(',')).join('\n')
    downloadFile(csvContent, 'Executive_Summary_Report.csv', 'text/csv')
  }

  const generateROIReport = () => {
    const roiData = [
      ['Campaign', 'City', 'Investment', 'Revenue', 'ROI', 'Status'],
      ['Madrid Fashion Week Pop-up', 'Madrid', '€15,000', '€42,750', '285%', 'Completed'],
      ['Barcelona Beauty Launch', 'Barcelona', '€10,000', '€32,000', '320%', 'Active'],
      ['Valencia Electronics Expo', 'Valencia', '€8,500', '€21,250', '250%', 'Active'],
      ['Bilbao Tech Conference', 'Bilbao', '€12,000', '€30,000', '250%', 'Active'],
      ['Seville Food Festival', 'Seville', '€6,000', '€18,000', '300%', 'Paused'],
    ]

    const csvContent = roiData.map(row => row.join(',')).join('\n')
    downloadFile(csvContent, 'ROI_Analysis_Report.csv', 'text/csv')
  }

  const generateCityPerformanceReport = () => {
    const cityData = [
      ['City', 'Campaigns', 'Total Spend', 'Revenue', 'ROI', 'Conversions', 'Top Demographic'],
      ['Madrid', '3', '€28,000', '€79,800', '285%', '890', '25-34 Urban Professionals'],
      ['Barcelona', '2', '€18,500', '€59,200', '320%', '620', '18-24 Students'],
      ['Valencia', '2', '€15,000', '€37,500', '250%', '410', '35-44 Families'],
      ['Bilbao', '1', '€12,000', '€30,000', '250%', '320', '25-34 Tech Workers'],
      ['Seville', '1', '€6,000', '€18,000', '300%', '180', '45-54 Food Enthusiasts'],
    ]

    const csvContent = cityData.map(row => row.join(',')).join('\n')
    downloadFile(csvContent, 'City_Performance_Report.csv', 'text/csv')
  }

  const generateMonthlySummary = () => {
    const monthlyData = [
      ['Month', 'Active Campaigns', 'Total Spend', 'Revenue', 'Conversions', 'ROI'],
      ['January 2024', '8', '€45,000', '€128,250', '1,420', '285%'],
      ['February 2024', '10', '€52,000', '€145,600', '1,580', '280%'],
      ['March 2024', '12', '€58,000', '€162,400', '1,720', '280%'],
      ['April 2024', '9', '€41,000', '€115,800', '1,240', '282%'],
    ]

    const csvContent = monthlyData.map(row => row.join(',')).join('\n')
    downloadFile(csvContent, 'Monthly_Summary_Report.csv', 'text/csv')
  }

  const generateCustomReport = () => {
    const reportData = [
      ['Report Configuration'],
      ['Generated:', new Date().toLocaleString()],
      ['Format:', reportFormat.toUpperCase()],
      ['Time Period:', timePeriod.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())],
      ['Campaign Filter:', campaignFilter === 'all' ? 'All Campaigns' : campaignFilter],
      ['Selected Metrics:', selectedMetrics.join(', ')],
      [''],
      ['Sample Data:'],
      ['Campaign', 'Performance', 'ROI', 'Status'],
      ['Madrid Fashion Week', 'Excellent', '285%', 'Completed'],
      ['Barcelona Beauty Launch', 'Outstanding', '320%', 'Active'],
      ['Valencia Electronics', 'Good', '250%', 'Active'],
    ]

    const csvContent = reportData.map(row => Array.isArray(row) ? row.join(',') : row).join('\n')
    downloadFile(csvContent, `Custom_Report_${Date.now()}.csv`, 'text/csv')
  }

  const downloadRecentReport = (reportName: string) => {
    const reportData = [
      ['Recent Report Download'],
      ['Report:', reportName],
      ['Downloaded:', new Date().toLocaleString()],
      [''],
      ['This is a sample report download.'],
      ['In a real application, this would contain the actual report data.'],
    ]

    const csvContent = reportData.map(row => Array.isArray(row) ? row.join(',') : row).join('\n')
    const fileName = reportName.replace(/\s+/g, '_') + '_Download.csv'
    downloadFile(csvContent, fileName, 'text/csv')
  }

  const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const link = document.createElement('a')
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', fileName)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
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
                <Select value={reportFormat} onValueChange={setReportFormat}>
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
                <Select value={timePeriod} onValueChange={setTimePeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="last90days">Last 90 Days</SelectItem>
                    <SelectItem value="lastyear">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Filter</label>
              <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select campaigns" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="active">Active Campaigns Only</SelectItem>
                  <SelectItem value="completed">Completed Campaigns Only</SelectItem>
                  <SelectItem value="madrid">Madrid Campaigns</SelectItem>
                  <SelectItem value="barcelona">Barcelona Campaigns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Export Options */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Export</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-transparent" 
                  size="sm"
                  onClick={generateExecutiveSummary}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Executive Summary
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-transparent" 
                  size="sm"
                  onClick={generateROIReport}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  ROI Analysis Report
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-transparent" 
                  size="sm"
                  onClick={generateCityPerformanceReport}
                >
                  <PieChart className="mr-2 h-4 w-4" />
                  City Performance Report
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-transparent" 
                  size="sm"
                  onClick={generateMonthlySummary}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Monthly Summary
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                size="lg"
                onClick={generateCustomReport}
              >
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
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => downloadRecentReport(report.name)}
                >
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
