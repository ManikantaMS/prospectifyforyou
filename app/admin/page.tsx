"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Users, CheckCircle, XCircle, Clock, AlertTriangle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface PendingUser {
  id: string
  email: string
  first_name: string
  last_name: string
  company_name: string
  industry: string
  role: string
  approved: boolean
  created_at: string
}

interface WaitlistEntry {
  id: string
  email: string
  name: string
  status: string
  created_at: string
}

export default function AdminPage() {
  const { user, loading } = useAuth()
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])
  const [allUsers, setAllUsers] = useState<PendingUser[]>([])
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [processingUserId, setProcessingUserId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  // Fetch users data
  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers()
      fetchWaitlist()
    }
  }, [user])

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true)
      
      // Fetch all users (admin can see all due to RLS policies)
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching users:', error)
        return
      }

      setAllUsers(users || [])
      setPendingUsers(users?.filter(u => !u.approved) || [])
    } catch (error) {
      console.error('Error in fetchUsers:', error)
    } finally {
      setLoadingUsers(false)
    }
  }

  const fetchWaitlist = async () => {
    try {
      const { data: waitlist, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching waitlist:', error)
        return
      }

      setWaitlistEntries(waitlist || [])
    } catch (error) {
      console.error('Error in fetchWaitlist:', error)
    }
  }

  const handleApproveUser = async (userId: string) => {
    try {
      setProcessingUserId(userId)
      
      const { error } = await supabase
        .from('users')
        .update({ approved: true })
        .eq('id', userId)

      if (error) {
        console.error('Error approving user:', error)
        alert('Failed to approve user. Please try again.')
        return
      }

      // Refresh the users list
      await fetchUsers()
      alert('User approved successfully!')
    } catch (error) {
      console.error('Error in handleApproveUser:', error)
      alert('Failed to approve user. Please try again.')
    } finally {
      setProcessingUserId(null)
    }
  }

  const handleDenyUser = async (userId: string) => {
    try {
      setProcessingUserId(userId)
      
      // For now, we'll just mark as not approved. In production, you might want to delete or flag differently
      const { error } = await supabase
        .from('users')
        .update({ approved: false })
        .eq('id', userId)

      if (error) {
        console.error('Error denying user:', error)
        alert('Failed to deny user. Please try again.')
        return
      }

      await fetchUsers()
      alert('User denied.')
    } catch (error) {
      console.error('Error in handleDenyUser:', error)
      alert('Failed to deny user. Please try again.')
    } finally {
      setProcessingUserId(null)
    }
  }

  // Show loading state while checking auth
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Show access denied if not admin
  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert className="max-w-md border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Access Denied:</strong> You need admin privileges to access this page.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
          </div>
          <p className="text-gray-600">Manage user approvals and system administration</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{pendingUsers.length}</div>
              <p className="text-xs text-gray-600">Users awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Users</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {allUsers.filter(u => u.approved).length}
              </div>
              <p className="text-xs text-gray-600">Active users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{allUsers.length}</div>
              <p className="text-xs text-gray-600">All registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Waitlist Entries</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{waitlistEntries.length}</div>
              <p className="text-xs text-gray-600">Interested prospects</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Users Table */}
        {pendingUsers.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span>Pending User Approvals</span>
              </CardTitle>
              <CardDescription>
                Users waiting for admin approval to access the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {user.first_name} {user.last_name}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {user.role}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.company_name || 'N/A'}</TableCell>
                      <TableCell>{user.industry || 'N/A'}</TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproveUser(user.id)}
                            disabled={processingUserId === user.id}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {processingUserId === user.id ? (
                              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDenyUser(user.id)}
                            disabled={processingUserId === user.id}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Deny
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* No Pending Users Message */}
        {pendingUsers.length === 0 && !loadingUsers && (
          <Alert className="mb-8 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>All caught up!</strong> No users are currently pending approval.
            </AlertDescription>
          </Alert>
        )}

        {/* Waitlist Table */}
        {waitlistEntries.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>Waitlist Entries</span>
              </CardTitle>
              <CardDescription>
                People who joined the waitlist and are interested in the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {waitlistEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <div className="font-medium">{entry.name}</div>
                      </TableCell>
                      <TableCell>{entry.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={entry.status === 'pending' ? 'secondary' : 'default'}
                          className={
                            entry.status === 'pending' 
                              ? 'bg-orange-100 text-orange-800' 
                              : entry.status === 'invited'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }
                        >
                          {entry.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(entry.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* All Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>All Users</span>
            </CardTitle>
            <CardDescription>
              Complete list of all registered users and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingUsers ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p>Loading users...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">
                          {user.first_name} {user.last_name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.company_name || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.approved ? 'default' : 'destructive'}
                          className={user.approved ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                        >
                          {user.approved ? 'Approved' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
