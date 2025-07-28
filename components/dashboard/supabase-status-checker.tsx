"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { isSupabaseConfigured } from "@/lib/supabase"
import { CheckCircle, XCircle, AlertTriangle, Database, RefreshCw, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import { useSupabaseData } from "./supabase-data-provider"
import { DatabaseSetupGuide } from "./database-setup-guide"

export function SupabaseStatusChecker() {
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null)
  const [envVars, setEnvVars] = useState<{
    supabaseUrl: string
    supabaseAnonKey: string
    hasServiceKey: boolean
  } | null>(null)
  const [checking, setChecking] = useState(false)
  const { connectionStatus, testConnection } = useSupabaseData()

  const checkConfiguration = () => {
    setChecking(true)

    // Check configuration status
    const configured = isSupabaseConfigured()
    setIsConfigured(configured)

    // Get environment variable info (safely)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY

    setEnvVars({
      supabaseUrl,
      supabaseAnonKey,
      hasServiceKey,
    })

    setTimeout(() => setChecking(false), 500)
  }

  useEffect(() => {
    checkConfiguration()
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleTestConnection = async () => {
    setChecking(true)
    await testConnection()
    setChecking(false)
  }

  if (isConfigured === null) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 animate-pulse" />
            <span>Checking Supabase configuration...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Supabase Configuration Status</span>
              </CardTitle>
              <CardDescription>Checking your fuchsia-jacket project connection</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleTestConnection} disabled={checking}>
              <RefreshCw className={`h-4 w-4 mr-2 ${checking ? "animate-spin" : ""}`} />
              Test Connection
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Overall Status */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {connectionStatus?.success ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
                <div>
                  <h3 className="font-semibold text-lg">
                    {connectionStatus?.success ? "✅ Supabase Connected" : "⚠️ Supabase Connection Issue"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {connectionStatus?.success
                      ? "Using live database with real-time data"
                      : connectionStatus?.needsSetup
                        ? "Database tables need to be created"
                        : "Running in demo mode with mock data"}
                  </p>
                </div>
              </div>
              <Badge
                variant={connectionStatus?.success ? "default" : "destructive"}
                className={`text-sm font-bold ${
                  connectionStatus?.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {connectionStatus?.success ? "🟢 LIVE" : "🔴 DEMO"}
              </Badge>
            </div>

            {/* Environment Variables Check */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Environment Variables Status:</h4>

              <div className="grid gap-3">
                {/* Supabase URL */}
                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {envVars?.supabaseUrl && envVars.supabaseUrl.includes("supabase-fuchsia-jacket") ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <div>
                      <p className="text-sm font-medium">NEXT_PUBLIC_SUPABASE_URL</p>
                      <p className="text-xs text-gray-500 font-mono">{envVars?.supabaseUrl || "Not set"}</p>
                      {envVars?.supabaseUrl && !envVars.supabaseUrl.includes("supabase-fuchsia-jacket") && (
                        <p className="text-xs text-red-600">❌ Should contain "supabase-fuchsia-jacket"</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        envVars?.supabaseUrl && envVars.supabaseUrl.includes("supabase-fuchsia-jacket")
                          ? "default"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {envVars?.supabaseUrl && envVars.supabaseUrl.includes("supabase-fuchsia-jacket")
                        ? "✅ Correct"
                        : "❌ Wrong"}
                    </Badge>
                    {envVars?.supabaseUrl && (
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(envVars.supabaseUrl)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Anon Key */}
                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {envVars?.supabaseAnonKey &&
                    envVars.supabaseAnonKey.length > 50 &&
                    envVars.supabaseAnonKey.startsWith("eyJ") ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <div>
                      <p className="text-sm font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
                      <p className="text-xs text-gray-500 font-mono">
                        {envVars?.supabaseAnonKey ? `${envVars.supabaseAnonKey.substring(0, 20)}...` : "Not set"}
                      </p>
                      {envVars?.supabaseAnonKey && !envVars.supabaseAnonKey.startsWith("eyJ") && (
                        <p className="text-xs text-red-600">❌ Should start with "eyJ"</p>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={
                      envVars?.supabaseAnonKey &&
                      envVars.supabaseAnonKey.length > 50 &&
                      envVars.supabaseAnonKey.startsWith("eyJ")
                        ? "default"
                        : "destructive"
                    }
                    className="text-xs"
                  >
                    {envVars?.supabaseAnonKey &&
                    envVars.supabaseAnonKey.length > 50 &&
                    envVars.supabaseAnonKey.startsWith("eyJ")
                      ? "✅ Valid"
                      : "❌ Invalid"}
                  </Badge>
                </div>

                {/* Service Role Key */}
                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {envVars?.hasServiceKey ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    )}
                    <div>
                      <p className="text-sm font-medium">SUPABASE_SERVICE_ROLE_KEY</p>
                      <p className="text-xs text-gray-500">
                        {envVars?.hasServiceKey ? "✅ Configured (hidden for security)" : "⚠️ Not set (optional)"}
                      </p>
                    </div>
                  </div>
                  <Badge variant={envVars?.hasServiceKey ? "default" : "secondary"} className="text-xs">
                    {envVars?.hasServiceKey ? "✅ Set" : "Optional"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Connection Status Details */}
            {connectionStatus && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Connection Test Results:</h4>

                {connectionStatus.success ? (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Perfect! 🎉</strong> Your fuchsia-jacket project is connected and the app is using live
                      Supabase data.
                    </AlertDescription>
                  </Alert>
                ) : connectionStatus.needsSetup ? (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Database Setup Required:</strong> {connectionStatus.error}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert>
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Connection Failed:</strong> {connectionStatus.error}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Expected Values for fuchsia-jacket */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Expected Values for fuchsia-jacket:</h4>
              <div className="space-y-2 text-sm">
                <div className="font-mono text-blue-800">
                  <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>
                  <br />
                  https://supabase-fuchsia-jacket.supabase.co
                </div>
                <div className="font-mono text-blue-800">
                  <strong>Keys should start with:</strong> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                </div>
              </div>
            </div>

            {/* Restart Reminder */}
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>💡 Remember:</strong> After updating `.env.local`, restart your development server:
              </p>
              <code className="text-xs bg-yellow-100 px-2 py-1 rounded mt-1 block">
                npm run dev # or yarn dev / pnpm dev
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Show database setup guide if tables don't exist */}
      {connectionStatus?.needsSetup && <DatabaseSetupGuide />}
    </div>
  )
}
