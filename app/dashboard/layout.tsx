"use client"

import TrulyAIDashboardChatbot from "@/components/truly-ai-dashboard-chatbot"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      {/* Dashboard AI Chatbot - Available across all dashboard pages */}
      <TrulyAIDashboardChatbot />
    </>
  )
}
