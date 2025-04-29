import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BarChart3, Calendar, Clock, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MeetingEffectivenessChart } from "@/components/meeting-effectiveness-chart"
import { MeetingTypeDistribution } from "@/components/meeting-type-distribution"
import { RecentMeetings } from "@/components/recent-meetings"
import { TimeInvestmentChart } from "@/components/time-investment-chart"
import { TopRecommendations } from "@/components/top-recommendations"

export const metadata: Metadata = {
  title: "Meeting Optimization AI System",
  description: "Analyze meeting effectiveness and get actionable recommendations",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <div className="container grid items-start gap-6 pb-8 pt-6 md:gap-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Meeting Optimization Dashboard</h1>
              <p className="text-muted-foreground">Analyze meeting effectiveness and get actionable recommendations</p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link href="/analyze">
                  Analyze New Meeting <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Meetings Analyzed</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Effectiveness Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68/100</div>
                <p className="text-xs text-muted-foreground">+5 points from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.5 hours</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Meetings Optimized</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Meeting Effectiveness by Type</CardTitle>
                <CardDescription>Average effectiveness scores across different meeting types</CardDescription>
              </CardHeader>
              <CardContent>
                <MeetingEffectivenessChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Meeting Type Distribution</CardTitle>
                <CardDescription>Breakdown of meetings by functional category</CardDescription>
              </CardHeader>
              <CardContent>
                <MeetingTypeDistribution />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Top Recommendations</CardTitle>
                <CardDescription>Actionable insights to improve meeting effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <TopRecommendations />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Recommendations
                </Button>
              </CardFooter>
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Time Investment Analysis</CardTitle>
                <CardDescription>Potential time savings by meeting category</CardDescription>
              </CardHeader>
              <CardContent>
                <TimeInvestmentChart />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Meetings</CardTitle>
              <CardDescription>Review and take action on recently analyzed meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentMeetings />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Meetings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
