import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MeetingAnalyzer } from "@/components/meeting-analyzer"

export const metadata: Metadata = {
  title: "Analyze Meeting - Meeting Optimization AI System",
  description: "Analyze a meeting to get effectiveness score and recommendations",
}

export default function AnalyzePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <div className="container grid items-start gap-6 pb-8 pt-6 md:gap-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Link>
                </Button>
              </div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Analyze Meeting</h1>
              <p className="text-muted-foreground">
                Enter meeting details to get an effectiveness score and recommendations
              </p>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Meeting Details</CardTitle>
              <CardDescription>Provide information about the meeting to analyze its effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <MeetingAnalyzer />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
