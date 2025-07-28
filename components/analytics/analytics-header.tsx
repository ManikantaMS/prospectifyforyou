"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, RefreshCw } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"

export function AnalyticsHeader() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Campaign Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track performance, analyze ROI, and optimize your marketing campaigns
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
            <DatePickerWithRange />
            <Select defaultValue="all-campaigns">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter campaigns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-campaigns">All Campaigns</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
