"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  Database, 
  ExternalLink, 
  Key, 
  Zap, 
  Mail, 
  BarChart3, 
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Settings
} from "lucide-react"

const integrations = [
  {
    id: "supabase",
    name: "Supabase",
    description: "Database and authentication",
    icon: Database,
    status: "connected",
    connected: true,
    config: {
      url: "https://jtlajmgmsbwjtqtphgyi.supabase.co",
      hasKey: true
    }
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Track website and campaign performance",
    icon: BarChart3,
    status: "disconnected",
    connected: false,
    config: {}
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Email marketing automation",
    icon: Mail,
    status: "disconnected",
    connected: false,
    config: {}
  },
  {
    id: "slack",
    name: "Slack",
    description: "Real-time campaign notifications",
    icon: MessageSquare,
    status: "disconnected",
    connected: false,
    config: {}
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect with 5000+ apps",
    icon: Zap,
    status: "disconnected",
    connected: false,
    config: {}
  }
]

export function IntegrationSettings() {
  const [apiSettings, setApiSettings] = useState({
    apiKeyVisible: false,
    webhooksEnabled: true,
    dataExportEnabled: true,
    thirdPartyAccess: true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
      case "disconnected":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Not Connected</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Integrations & API</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Connected Services */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Services</h3>
          <div className="space-y-4">
            {integrations.map((integration) => {
              const Icon = integration.icon
              return (
                <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">{integration.name}</h4>
                        {getStatusIcon(integration.status)}
                      </div>
                      <p className="text-sm text-gray-500">{integration.description}</p>
                      {integration.connected && integration.config.url && (
                        <p className="text-xs text-gray-400 mt-1">
                          {integration.config.url.substring(0, 30)}...
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(integration.status)}
                    {integration.connected ? (
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    ) : (
                      <Button size="sm">
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* API Configuration */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Key className="h-4 w-4 mr-2" />
            API Configuration
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex space-x-2">
                <Input
                  id="apiKey"
                  type={apiSettings.apiKeyVisible ? "text" : "password"}
                  value="pk_live_51234567890abcdef..."
                  readOnly
                  className="font-mono text-sm"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setApiSettings(prev => ({ ...prev, apiKeyVisible: !prev.apiKeyVisible }))}
                >
                  {apiSettings.apiKeyVisible ? "Hide" : "Show"}
                </Button>
                <Button variant="outline" size="sm">
                  Regenerate
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Use this key to access the Prospectify API
              </p>
            </div>

            <div>
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="webhookUrl"
                  placeholder="https://your-app.com/webhooks/prospectify"
                />
                <Button variant="outline" size="sm">
                  Test
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* API Permissions */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">API Permissions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="webhooks" className="text-sm font-medium">
                  Webhooks
                </Label>
                <p className="text-sm text-gray-500">Allow webhook notifications</p>
              </div>
              <Switch
                id="webhooks"
                checked={apiSettings.webhooksEnabled}
                onCheckedChange={(checked) => 
                  setApiSettings(prev => ({ ...prev, webhooksEnabled: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dataExport" className="text-sm font-medium">
                  Data Export
                </Label>
                <p className="text-sm text-gray-500">Allow data export via API</p>
              </div>
              <Switch
                id="dataExport"
                checked={apiSettings.dataExportEnabled}
                onCheckedChange={(checked) => 
                  setApiSettings(prev => ({ ...prev, dataExportEnabled: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="thirdParty" className="text-sm font-medium">
                  Third-party Access
                </Label>
                <p className="text-sm text-gray-500">Allow third-party app integrations</p>
              </div>
              <Switch
                id="thirdParty"
                checked={apiSettings.thirdPartyAccess}
                onCheckedChange={(checked) => 
                  setApiSettings(prev => ({ ...prev, thirdPartyAccess: checked }))
                }
              />
            </div>
          </div>
        </div>

        {/* API Documentation */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">API Documentation</h3>
              <p className="text-sm text-gray-500">
                Learn how to integrate with our API and build custom solutions
              </p>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Docs
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
