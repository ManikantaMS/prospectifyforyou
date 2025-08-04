"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { isSupabaseConfigured } from "@/lib/supabase"
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Database, 
  RefreshCw, 
  Copy, 
  Shield, 
  User,
  Settings,
  Eye,
  EyeOff 
} from "lucide-react"
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
  const [adminMode, setAdminMode] = useState(false)
  const [showSecrets, setShowSecrets] = useState(false)
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
      {/* Feature Introduction Banner */}
      <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <Settings className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>💡 Pro Tip:</strong> Use the <strong>User/Admin toggle</strong> below to switch between simple status view and detailed technical diagnostics. Perfect for both end users and system administrators!
        </AlertDescription>
      </Alert>

      {/* Admin Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Database Configuration</span>
              </CardTitle>
              <CardDescription className="text-base">
                {adminMode 
                  ? "🔧 Advanced mode: Environment variables, connection diagnostics, and technical details" 
                  : "👤 User mode: Simple connection status and clear messages"
                }
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Enhanced Admin Toggle */}
              <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-orange-50 px-4 py-2 rounded-lg border-2 border-dashed border-blue-200 hover:border-orange-300 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <User className={`h-5 w-5 transition-colors duration-300 ${!adminMode ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className={`text-sm font-bold transition-colors duration-300 ${!adminMode ? 'text-blue-600' : 'text-gray-500'}`}>
                    User View
                  </span>
                </div>
                
                <Switch
                  checked={adminMode}
                  onCheckedChange={setAdminMode}
                  className="data-[state=checked]:bg-orange-600 data-[state=unchecked]:bg-blue-400 scale-125"
                />
                
                <div className="flex items-center space-x-2">
                  <Shield className={`h-5 w-5 transition-colors duration-300 ${adminMode ? 'text-orange-600' : 'text-gray-400'}`} />
                  <span className={`text-sm font-bold transition-colors duration-300 ${adminMode ? 'text-orange-600' : 'text-gray-500'}`}>
                    Admin View
                  </span>
                </div>
              </div>
              
              {/* Mode Description */}
              <div className="text-xs text-gray-600 bg-gray-50 px-3 py-1 rounded-full border">
                {adminMode 
                  ? "🔧 Technical diagnostics & configuration details" 
                  : "👤 Simple status overview"
                }
              </div>
              
              <Button variant="outline" size="sm" onClick={handleTestConnection} disabled={checking}>
                <RefreshCw className={`h-4 w-4 mr-2 ${checking ? "animate-spin" : ""}`} />
                Test Connection
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {adminMode ? (
            <AdminInterface 
              connectionStatus={connectionStatus}
              envVars={envVars}
              showSecrets={showSecrets}
              setShowSecrets={setShowSecrets}
              copyToClipboard={copyToClipboard}
            />
          ) : (
            <UserInterface connectionStatus={connectionStatus} />
          )}
        </CardContent>
      </Card>

      {/* Show database setup guide if tables don't exist */}
      {connectionStatus?.needsSetup && <DatabaseSetupGuide />}
    </div>
  )
}

// Simplified User Interface
function UserInterface({ connectionStatus }: { connectionStatus: any }) {
  return (
    <div className="space-y-4">
      {/* Simple Status Card */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
        <div className="flex items-center space-x-4">
          {connectionStatus?.success ? (
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          ) : (
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {connectionStatus?.success ? "Database Connected" : "Database Offline"}
            </h3>
            <p className="text-gray-600">
              {connectionStatus?.success
                ? "Using live data from Supabase"
                : "Using demo data - full features available"}
            </p>
          </div>
        </div>
        <Badge
          variant={connectionStatus?.success ? "default" : "secondary"}
          className={`text-lg px-4 py-2 font-bold ${
            connectionStatus?.success 
              ? "bg-green-100 text-green-800 border-green-200" 
              : "bg-orange-100 text-orange-800 border-orange-200"
          }`}
        >
          {connectionStatus?.success ? "🟢 LIVE" : "🟡 DEMO"}
        </Badge>
      </div>

      {/* Simple Status Message */}
      {connectionStatus?.success ? (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Everything is working perfectly!</strong> Your application is connected to the live database 
            and all features are fully functional.
          </AlertDescription>
        </Alert>
      ) : connectionStatus?.needsSetup ? (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Database setup needed:</strong> Some features are running in demo mode. 
            Contact your administrator to complete the database setup.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-blue-200 bg-blue-50">
          <Database className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Demo mode active:</strong> The application is working with sample data. 
            All features are available for testing and evaluation.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

// Detailed Admin Interface
function AdminInterface({ 
  connectionStatus, 
  envVars, 
  showSecrets, 
  setShowSecrets, 
  copyToClipboard 
}: { 
  connectionStatus: any
  envVars: any
  showSecrets: boolean
  setShowSecrets: (show: boolean) => void
  copyToClipboard: (text: string) => void
}) {
  return (
    <div className="space-y-6">
      {/* Admin Warning */}
      <Alert className="border-orange-200 bg-orange-50">
        <Shield className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Admin Mode:</strong> This interface shows sensitive configuration details. 
          Only share this information with authorized personnel.
        </AlertDescription>
      </Alert>

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
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Environment Variables Status:</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSecrets(!showSecrets)}
            className="text-sm"
          >
            {showSecrets ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Values
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Values
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-3">
          {/* Supabase URL */}
          <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
            <div className="flex items-center space-x-3">
              {envVars?.supabaseUrl && envVars.supabaseUrl.includes("jtlajmgmsbwjtqtphgyi") ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <div>
                <p className="text-sm font-medium">NEXT_PUBLIC_SUPABASE_URL</p>
                <p className="text-xs text-gray-500 font-mono">
                  {showSecrets 
                    ? (envVars?.supabaseUrl || "Not set")
                    : (envVars?.supabaseUrl ? "••••••••••••••••••••" : "Not set")
                  }
                </p>
                {envVars?.supabaseUrl && !envVars.supabaseUrl.includes("jtlajmgmsbwjtqtphgyi") && (
                  <p className="text-xs text-red-600">❌ Should contain "jtlajmgmsbwjtqtphgyi"</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={
                  envVars?.supabaseUrl && envVars.supabaseUrl.includes("jtlajmgmsbwjtqtphgyi")
                    ? "default"
                    : "destructive"
                }
                className="text-xs"
              >
                {envVars?.supabaseUrl && envVars.supabaseUrl.includes("jtlajmgmsbwjtqtphgyi")
                  ? "✅ Correct"
                  : "❌ Wrong"}
              </Badge>
              {envVars?.supabaseUrl && showSecrets && (
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
                  {showSecrets 
                    ? (envVars?.supabaseAnonKey ? `${envVars.supabaseAnonKey.substring(0, 40)}...` : "Not set")
                    : (envVars?.supabaseAnonKey ? "••••••••••••••••••••" : "Not set")
                  }
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

      {/* Expected Values for jtlajmgmsbwjtqtphgyi */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Expected Values for jtlajmgmsbwjtqtphgyi:</h4>
        <div className="space-y-2 text-sm">
          <div className="font-mono text-blue-800">
            <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>
            <br />
            https://jtlajmgmsbwjtqtphgyi.supabase.co
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
  )
}
