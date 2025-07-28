"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { isSupabaseConfigured } from "@/lib/supabase"
import { AlertTriangle, Database, ExternalLink, Settings } from "lucide-react"
import { useState, useEffect } from "react"

export function SupabaseConfigAlert() {
  const [isConfigured, setIsConfigured] = useState(true)
  const [showSetup, setShowSetup] = useState(false)

  useEffect(() => {
    setIsConfigured(isSupabaseConfigured())
  }, [])

  if (isConfigured) {
    return null
  }

  return (
    <div className="mb-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>Supabase is not configured. The app is running in demo mode with mock data.</span>
          <Button variant="outline" size="sm" onClick={() => setShowSetup(!showSetup)}>
            <Settings className="h-4 w-4 mr-2" />
            Setup Guide
          </Button>
        </AlertDescription>
      </Alert>

      {showSetup && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Supabase Setup Guide</span>
            </CardTitle>
            <CardDescription>Follow these steps to connect your Supabase database for live data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Step 1: Create Supabase Project</h4>
                <p className="text-sm text-blue-700 mb-3">Go to Supabase and create a new project</p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Supabase Dashboard
                  </a>
                </Button>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Step 2: Get Your Keys</h4>
                <p className="text-sm text-green-700 mb-3">Copy your project URL and anon key from Settings → API</p>
                <div className="bg-green-100 p-3 rounded text-sm font-mono">
                  <div>NEXT_PUBLIC_SUPABASE_URL=https://supabase-fuchsia-jacket.supabase.co</div>
                  <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key</div>
                  <div>SUPABASE_SERVICE_ROLE_KEY=your_service_role_key</div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Step 3: Run Database Scripts</h4>
                <p className="text-sm text-purple-700 mb-3">Execute the SQL scripts to create tables and seed data</p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" disabled>
                    Run create-tables.sql
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Run seed-cities.sql
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-2">Step 4: Restart Application</h4>
                <p className="text-sm text-yellow-700">
                  After adding environment variables, restart your development server
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
