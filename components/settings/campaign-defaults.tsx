"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Target, DollarSign, Calendar, Users } from "lucide-react"

export function CampaignDefaults() {
  const [defaults, setDefaults] = useState({
    defaultBudget: "10000",
    campaignDuration: "30",
    autoOptimization: true,
    bidStrategy: "maximize_conversions",
    targetAgeMin: "25",
    targetAgeMax: "45",
    defaultCities: ["San Francisco", "Seattle", "Austin"],
    demographicTemplate: "tech",
    budgetType: "total",
    autoRenewal: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setDefaults(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>Campaign Defaults</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget Defaults */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Budget Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="defaultBudget">Default Campaign Budget ($)</Label>
              <Input
                id="defaultBudget"
                type="number"
                value={defaults.defaultBudget}
                onChange={(e) => handleInputChange("defaultBudget", e.target.value)}
                placeholder="10000"
              />
            </div>
            <div>
              <Label htmlFor="budgetType">Budget Type</Label>
              <Select 
                value={defaults.budgetType} 
                onValueChange={(value) => handleInputChange("budgetType", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="total">Total Campaign Budget</SelectItem>
                  <SelectItem value="daily">Daily Budget</SelectItem>
                  <SelectItem value="weekly">Weekly Budget</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Campaign Duration */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Duration & Scheduling
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="campaignDuration">Default Duration (days)</Label>
              <Input
                id="campaignDuration"
                type="number"
                value={defaults.campaignDuration}
                onChange={(e) => handleInputChange("campaignDuration", e.target.value)}
                placeholder="30"
              />
            </div>
            <div className="flex items-center justify-between pt-6">
              <div>
                <Label htmlFor="autoRenewal" className="text-sm font-medium">
                  Auto-renewal
                </Label>
                <p className="text-sm text-gray-500">Automatically renew successful campaigns</p>
              </div>
              <Switch
                id="autoRenewal"
                checked={defaults.autoRenewal}
                onCheckedChange={(checked) => handleInputChange("autoRenewal", checked)}
              />
            </div>
          </div>
        </div>

        {/* Targeting Defaults */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Default Targeting
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="targetAgeMin">Min Age</Label>
                <Input
                  id="targetAgeMin"
                  type="number"
                  value={defaults.targetAgeMin}
                  onChange={(e) => handleInputChange("targetAgeMin", e.target.value)}
                  placeholder="25"
                />
              </div>
              <div>
                <Label htmlFor="targetAgeMax">Max Age</Label>
                <Input
                  id="targetAgeMax"
                  type="number"
                  value={defaults.targetAgeMax}
                  onChange={(e) => handleInputChange("targetAgeMax", e.target.value)}
                  placeholder="45"
                />
              </div>
              <div>
                <Label htmlFor="demographicTemplate">Default Demographics</Label>
                <Select 
                  value={defaults.demographicTemplate} 
                  onValueChange={(value) => handleInputChange("demographicTemplate", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Tech Professionals</SelectItem>
                    <SelectItem value="healthcare">Healthcare Workers</SelectItem>
                    <SelectItem value="students">College Students</SelectItem>
                    <SelectItem value="luxury">High Income</SelectItem>
                    <SelectItem value="eco">Eco-conscious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Settings */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Optimization Settings</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="bidStrategy">Bid Strategy</Label>
              <Select 
                value={defaults.bidStrategy} 
                onValueChange={(value) => handleInputChange("bidStrategy", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maximize_conversions">Maximize Conversions</SelectItem>
                  <SelectItem value="target_cpa">Target CPA</SelectItem>
                  <SelectItem value="maximize_clicks">Maximize Clicks</SelectItem>
                  <SelectItem value="manual_cpc">Manual CPC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoOptimization" className="text-sm font-medium">
                  Auto-optimization
                </Label>
                <p className="text-sm text-gray-500">Let AI optimize your campaigns automatically</p>
              </div>
              <Switch
                id="autoOptimization"
                checked={defaults.autoOptimization}
                onCheckedChange={(checked) => handleInputChange("autoOptimization", checked)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
