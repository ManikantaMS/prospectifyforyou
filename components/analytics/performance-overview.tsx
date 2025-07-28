import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Target, MapPin, Eye, MousePointer } from "lucide-react"

export function PerformanceOverview() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "€284,750",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "vs last month",
    },
    {
      title: "Campaign ROI",
      value: "340%",
      change: "+28%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "average across all campaigns",
    },
    {
      title: "Active Campaigns",
      value: "23",
      change: "+5",
      changeType: "positive" as const,
      icon: Target,
      description: "currently running",
    },
    {
      title: "Cities Targeted",
      value: "47",
      change: "+12",
      changeType: "positive" as const,
      icon: MapPin,
      description: "across EU markets",
    },
    {
      title: "Total Impressions",
      value: "2.4M",
      change: "+18.2%",
      changeType: "positive" as const,
      icon: Eye,
      description: "this month",
    },
    {
      title: "Conversion Rate",
      value: "4.8%",
      change: "-0.3%",
      changeType: "negative" as const,
      icon: MousePointer,
      description: "vs last month",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
            <div className={`p-2 rounded-full ${metric.changeType === "positive" ? "bg-green-100" : "bg-red-100"}`}>
              <metric.icon
                className={`h-4 w-4 ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="flex items-center justify-between">
              <Badge
                variant={metric.changeType === "positive" ? "default" : "destructive"}
                className={`text-xs ${
                  metric.changeType === "positive"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100"
                }`}
              >
                {metric.changeType === "positive" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {metric.change}
              </Badge>
              <span className="text-xs text-gray-500">{metric.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
