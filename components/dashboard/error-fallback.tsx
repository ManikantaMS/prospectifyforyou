"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          <span>Something went wrong</span>
        </CardTitle>
        <CardDescription>
          There was an error loading this component. This might be due to a network issue or missing resource.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800 font-mono">{error.message}</p>
          </div>

          <div className="flex space-x-3">
            <Button onClick={resetErrorBoundary} className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </Button>

            <Button variant="outline" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              <strong>Troubleshooting tips:</strong>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Check your internet connection</li>
              <li>Try refreshing the page</li>
              <li>Clear your browser cache</li>
              <li>Make sure all environment variables are set correctly</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
