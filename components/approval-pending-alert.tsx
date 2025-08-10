"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, AlertTriangle, Mail, CheckCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function ApprovalPendingAlert() {
  const { user, logout } = useAuth()

  if (!user || user.approved) {
    return null
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Account Pending Approval
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Your account is currently under review by our admin team
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>What's next?</strong> Our admin team will review your account and approve it shortly. 
              You'll receive an email notification once your account is activated.
            </AlertDescription>
          </Alert>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              Account Details Confirmed
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Company:</strong> {user.company || 'Not provided'}</p>
              <p><strong>Industry:</strong> {user.industry || 'Not provided'}</p>
              <p><strong>Role:</strong> {user.role || 'User'}</p>
            </div>
          </div>

          <Alert className="border-blue-200 bg-blue-50">
            <Mail className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Need help?</strong> If you have questions or need urgent access, 
              please contact our support team at <strong>support@prospectify.com</strong>
            </AlertDescription>
          </Alert>

          <div className="flex justify-center space-x-4 pt-4">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="px-8"
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
