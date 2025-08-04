"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface Campaign {
  id: number
  name: string
  status: "active" | "paused" | "completed" | "draft"
  targetCities: string[]
  budget: string
  spent: string
  progress: number
  startDate: string
  endDate: string
  impressions: string
  clicks: string
  conversions: string
  ctr: string
  demographics: string
  description?: string
}

interface CampaignContextType {
  campaigns: Campaign[]
  searchTerm: string
  statusFilter: string
  filteredCampaigns: Campaign[]
  addCampaign: (campaign: Pick<Campaign, 'name' | 'description' | 'status' | 'targetCities' | 'budget' | 'startDate' | 'endDate' | 'demographics'>) => void
  updateCampaign: (id: number, updates: Partial<Campaign>) => void
  deleteCampaign: (id: number) => void
  setSearchTerm: (term: string) => void
  setStatusFilter: (status: string) => void
  notifications: Notification[]
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void
  removeNotification: (id: number) => void
}

interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  timestamp: Date
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined)

const mockCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Volvo Car Campaign",
    status: "active",
    targetCities: ["Stockholm", "Gothenburg", "Oslo"],
    budget: "$25,000",
    spent: "$5,200",
    progress: 21,
    startDate: "2025-08-01",
    endDate: "2025-10-31",
    impressions: "89.3K",
    clicks: "4.2K",
    conversions: "187",
    ctr: "4.7%",
    demographics: "Car enthusiasts, 30-55, $60K+",
    description: "Premium automotive campaign for Volvo targeting Scandinavian markets"
  },
  {
    id: 2,
    name: "Summer Tech Promotion",
    status: "active",
    targetCities: ["San Francisco", "Seattle", "Austin"],
    budget: "$15,000",
    spent: "$8,240",
    progress: 55,
    startDate: "2025-07-01",
    endDate: "2025-08-31",
    impressions: "234.5K",
    clicks: "12.3K",
    conversions: "456",
    ctr: "5.2%",
    demographics: "Tech professionals, 25-40, $75K+"
  },
  {
    id: 3,
    name: "Healthcare Awareness Campaign",
    status: "active",
    targetCities: ["Boston", "Denver", "Portland"],
    budget: "$22,000",
    spent: "$11,200",
    progress: 51,
    startDate: "2025-06-15",
    endDate: "2025-09-15",
    impressions: "189.2K",
    clicks: "8.9K",
    conversions: "312",
    ctr: "4.7%",
    demographics: "Healthcare workers, 28-50, $60K+"
  },
  {
    id: 4,
    name: "Student Discount Drive",
    status: "paused",
    targetCities: ["Madison", "Ann Arbor", "Chapel Hill"],
    budget: "$8,500",
    spent: "$3,100",
    progress: 36,
    startDate: "2025-07-10",
    endDate: "2025-08-20",
    impressions: "156.8K",
    clicks: "15.2K",
    conversions: "892",
    ctr: "9.7%",
    demographics: "College students, 18-25, <$30K"
  },
  {
    id: 5,
    name: "Luxury Retail Expansion",
    status: "completed",
    targetCities: ["Manhattan", "Beverly Hills", "Miami"],
    budget: "$45,000",
    spent: "$44,850",
    progress: 100,
    startDate: "2025-05-01",
    endDate: "2025-06-30",
    impressions: "567.3K",
    clicks: "18.4K",
    conversions: "1,234",
    ctr: "3.2%",
    demographics: "High income, 30-55, $150K+"
  },
  {
    id: 6,
    name: "Green Energy Initiative",
    status: "draft",
    targetCities: ["Phoenix", "Las Vegas", "Tucson"],
    budget: "$18,000",
    spent: "$0",
    progress: 0,
    startDate: "2025-08-01",
    endDate: "2025-10-31",
    impressions: "0",
    clicks: "0",
    conversions: "0",
    ctr: "0%",
    demographics: "Eco-conscious, 25-45, $50K+"
  }
]

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Filter campaigns based on search term and status
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.targetCities.some(city => 
                           city.toLowerCase().includes(searchTerm.toLowerCase())
                         ) ||
                         campaign.demographics.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const addCampaign = (newCampaign: Pick<Campaign, 'name' | 'description' | 'status' | 'targetCities' | 'budget' | 'startDate' | 'endDate' | 'demographics'>) => {
    const campaign: Campaign = {
      ...newCampaign,
      id: Math.max(...campaigns.map(c => c.id), 0) + 1,
      spent: "$0",
      progress: 0,
      impressions: "0",
      clicks: "0",
      conversions: "0",
      ctr: "0%"
    }
    
    setCampaigns(prev => [...prev, campaign])
    addNotification(`Campaign "${campaign.name}" created successfully!`, 'success')
  }

  const updateCampaign = (id: number, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, ...updates } : campaign
    ))
    addNotification('Campaign updated successfully!', 'success')
  }

  const deleteCampaign = (id: number) => {
    const campaign = campaigns.find(c => c.id === id)
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id))
    if (campaign) {
      addNotification(`Campaign "${campaign.name}" deleted successfully!`, 'success')
    }
  }

  const addNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const notification: Notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    }
    setNotifications(prev => [...prev, notification])
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(notification.id)
    }, 5000)
  }

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <CampaignContext.Provider value={{
      campaigns,
      searchTerm,
      statusFilter,
      filteredCampaigns,
      addCampaign,
      updateCampaign,
      deleteCampaign,
      setSearchTerm,
      setStatusFilter,
      notifications,
      addNotification,
      removeNotification
    }}>
      {children}
    </CampaignContext.Provider>
  )
}

export function useCampaigns() {
  const context = useContext(CampaignContext)
  if (context === undefined) {
    throw new Error('useCampaigns must be used within a CampaignProvider')
  }
  return context
}
