"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { useCampaigns, Campaign } from "@/lib/campaign-context"

const availableCities = [
  "San Francisco", "Seattle", "Austin", "Boston", "Denver", "Portland",
  "Madison", "Ann Arbor", "Chapel Hill", "Manhattan", "Beverly Hills",
  "Miami", "Phoenix", "Las Vegas", "Tucson", "Chicago", "Atlanta",
  "Stockholm", "Gothenburg", "Oslo"
]

const demographicTemplates = [
  { id: "tech", label: "Tech Professionals", description: "Tech professionals, 25-40, $75K+" },
  { id: "healthcare", label: "Healthcare Workers", description: "Healthcare workers, 28-50, $60K+" },
  { id: "students", label: "College Students", description: "College students, 18-25, <$30K" },
  { id: "luxury", label: "High Income", description: "High income, 30-55, $150K+" },
  { id: "eco", label: "Eco-conscious", description: "Eco-conscious, 25-45, $50K+" },
  { id: "automotive", label: "Car Enthusiasts", description: "Car enthusiasts, 30-55, $60K+" },
  { id: "custom", label: "Custom Demographics", description: "Define your own targeting" }
]

interface EditCampaignDialogProps {
  campaign: Campaign | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditCampaignDialog({ campaign, open, onOpenChange }: EditCampaignDialogProps) {
  const { updateCampaign } = useCampaigns()
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    startDate: "",
    endDate: "",
    demographics: "",
    status: "draft" as "active" | "paused" | "completed" | "draft"
  })

  // Initialize form data when campaign changes
  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name,
        description: campaign.description || "",
        budget: campaign.budget.replace(/[$,]/g, ""), // Remove $ and commas
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        demographics: campaign.demographics,
        status: campaign.status
      })
      setSelectedCities([...campaign.targetCities])
    }
  }, [campaign])

  const handleCitySelect = (city: string) => {
    if (!selectedCities.includes(city)) {
      setSelectedCities([...selectedCities, city])
    }
  }

  const handleCityRemove = (city: string) => {
    setSelectedCities(selectedCities.filter(c => c !== city))
  }

  const handleDemographicSelect = (templateId: string) => {
    const template = demographicTemplates.find(t => t.id === templateId)
    if (template && template.id !== "custom") {
      setFormData(prev => ({ ...prev, demographics: template.description }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !campaign) return

    updateCampaign(campaign.id, {
      name: formData.name.trim(),
      description: formData.description.trim(),
      budget: `$${formData.budget.replace(/[^0-9]/g, "")}`,
      startDate: formData.startDate,
      endDate: formData.endDate,
      demographics: formData.demographics,
      targetCities: selectedCities,
      status: formData.status
    })

    onOpenChange(false)
  }

  const handleReset = () => {
    if (campaign) {
      setFormData({
        name: campaign.name,
        description: campaign.description || "",
        budget: campaign.budget.replace(/[$,]/g, ""),
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        demographics: campaign.demographics,
        status: campaign.status
      })
      setSelectedCities([...campaign.targetCities])
    }
  }

  if (!campaign) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Campaign</DialogTitle>
          <DialogDescription>
            Update your campaign settings and targeting preferences.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campaign Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter campaign name"
              required
            />
          </div>

          {/* Campaign Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your campaign goals and target audience"
              rows={3}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Campaign Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget and Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                placeholder="25000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Target Cities */}
          <div className="space-y-2">
            <Label>Target Cities</Label>
            <Select onValueChange={handleCitySelect}>
              <SelectTrigger>
                <SelectValue placeholder="Add target cities" />
              </SelectTrigger>
              <SelectContent>
                {availableCities
                  .filter(city => !selectedCities.includes(city))
                  .map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
            
            {selectedCities.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCities.map(city => (
                  <Badge key={city} variant="secondary" className="flex items-center gap-1">
                    {city}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleCityRemove(city)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Demographics */}
          <div className="space-y-2">
            <Label>Demographics Template</Label>
            <Select onValueChange={handleDemographicSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template or use custom" />
              </SelectTrigger>
              <SelectContent>
                {demographicTemplates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="demographics">Demographics</Label>
            <Textarea
              id="demographics"
              value={formData.demographics}
              onChange={(e) => setFormData(prev => ({ ...prev, demographics: e.target.value }))}
              placeholder="e.g., Tech professionals, 25-40 years, $75K+ annual income"
              rows={2}
              required
            />
          </div>

          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset Changes
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Campaign</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
