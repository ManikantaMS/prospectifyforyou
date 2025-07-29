"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

const availableCities = [
  "San Francisco", "Seattle", "Austin", "Boston", "Denver", "Portland",
  "Madison", "Ann Arbor", "Chapel Hill", "Manhattan", "Beverly Hills",
  "Miami", "Phoenix", "Las Vegas", "Tucson", "Chicago", "Atlanta"
]

const demographicTemplates = [
  { id: "tech", label: "Tech Professionals", description: "25-40 years, $75K+, Tech industry" },
  { id: "healthcare", label: "Healthcare Workers", description: "28-50 years, $60K+, Healthcare" },
  { id: "students", label: "College Students", description: "18-25 years, <$30K, Education" },
  { id: "luxury", label: "High Income", description: "30-55 years, $150K+, Luxury market" },
  { id: "eco", label: "Eco-conscious", description: "25-45 years, $50K+, Environmental focus" },
  { id: "custom", label: "Custom Demographics", description: "Define your own targeting" }
]

interface CreateCampaignDialogProps {
  children: React.ReactNode
}

export function CreateCampaignDialog({ children }: CreateCampaignDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    startDate: "",
    endDate: "",
    demographics: ""
  })

  const handleCitySelect = (city: string) => {
    if (!selectedCities.includes(city)) {
      setSelectedCities([...selectedCities, city])
    }
  }

  const handleCityRemove = (city: string) => {
    setSelectedCities(selectedCities.filter(c => c !== city))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Creating campaign:", { ...formData, targetCities: selectedCities })
    setOpen(false)
    // Reset form
    setFormData({
      name: "",
      description: "",
      budget: "",
      startDate: "",
      endDate: "",
      demographics: ""
    })
    setSelectedCities([])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
          <DialogDescription>
            Set up a new marketing campaign with demographic targeting for specific cities.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campaign Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Campaign Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Summer Tech Promotion"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your campaign goals and strategy..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          {/* Target Cities */}
          <div className="space-y-3">
            <Label>Target Cities *</Label>
            <Select onValueChange={handleCitySelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select cities to target" />
              </SelectTrigger>
              <SelectContent>
                {availableCities
                  .filter(city => !selectedCities.includes(city))
                  .map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
            
            {selectedCities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedCities.map((city) => (
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
          <div className="space-y-3">
            <Label>Target Demographics *</Label>
            <Select onValueChange={(value) => {
              const template = demographicTemplates.find(t => t.id === value)
              if (template && template.id !== "custom") {
                setFormData({ ...formData, demographics: template.description })
              } else {
                setFormData({ ...formData, demographics: "" })
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose demographic template or custom" />
              </SelectTrigger>
              <SelectContent>
                {demographicTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div>
                      <div className="font-medium">{template.label}</div>
                      <div className="text-xs text-gray-500">{template.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Textarea
              placeholder="Describe your target demographics (age, income, interests, etc.)"
              value={formData.demographics}
              onChange={(e) => setFormData({ ...formData, demographics: e.target.value })}
              rows={2}
              required
            />
          </div>

          {/* Budget and Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="budget">Budget *</Label>
              <Input
                id="budget"
                placeholder="$10,000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!formData.name || selectedCities.length === 0 || !formData.demographics}
            >
              Create Campaign
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
