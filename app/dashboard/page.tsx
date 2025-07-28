"use client"

import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { CustomerProfileForm } from "@/components/dashboard/customer-profile-form"
import { CityRecommendations } from "@/components/dashboard/city-recommendations"
import { DataManagementPanel } from "@/components/dashboard/data-management-panel"
import { SupabaseStatusChecker } from "@/components/dashboard/supabase-status-checker"
import { SupabaseDataProvider } from "@/components/dashboard/supabase-data-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Skeleton } from "@/components/ui/skeleton"

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px] mb-2" />
              <Skeleton className="h-3 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <SupabaseDataProvider>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardHeader />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recommendations">City Finder</TabsTrigger>
            <TabsTrigger value="data">Data Management</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <ErrorBoundary>
              <Suspense fallback={<DashboardSkeleton />}>
                <DashboardStats />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Customer Profile</CardTitle>
                      <CardDescription>
                        Define your target customer to get personalized city recommendations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <CustomerProfileForm />
                    </CardContent>
                  </Card>

                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Quick Recommendations</CardTitle>
                      <CardDescription>Top cities based on your current profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CityRecommendations limit={5} />
                    </CardContent>
                  </Card>
                </div>
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <ErrorBoundary>
              <Suspense fallback={<DashboardSkeleton />}>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="md:col-span-1">
                    <CardHeader>
                      <CardTitle>Customer Profile</CardTitle>
                      <CardDescription>Adjust your target customer profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CustomerProfileForm />
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>City Recommendations</CardTitle>
                      <CardDescription>Cities ranked by match score for your target customer</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CityRecommendations />
                    </CardContent>
                  </Card>
                </div>
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <ErrorBoundary>
              <Suspense fallback={<DashboardSkeleton />}>
                <DataManagementPanel />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-4">
            <ErrorBoundary>
              <SupabaseStatusChecker />
            </ErrorBoundary>
          </TabsContent>
        </Tabs>
      </div>
    </SupabaseDataProvider>
  )
}
