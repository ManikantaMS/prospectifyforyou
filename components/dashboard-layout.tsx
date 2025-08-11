"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import TrulyAIDashboardChatbot from "@/components/truly-ai-dashboard-chatbot"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
      {/* Dashboard AI Chatbot - Available across all dashboard pages */}
      <TrulyAIDashboardChatbot />
    </div>
  )
}
