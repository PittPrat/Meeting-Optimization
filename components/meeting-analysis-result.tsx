"use client"

import { Download, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { MeetingRecommendations } from "@/components/meeting-recommendations"

interface MeetingAnalysisResultProps {
  result: any
  onAnalyzeAnother: () => void
}

export function MeetingAnalysisResult({ result, onAnalyzeAnother }: MeetingAnalysisResultProps) {
  const { score, classification, metrics, recommendations } = result

  const getScoreColor = () => {
    if (score >= 90) return "text-green-500"
    if (score >= 70) return "text-emerald-500"
    if (score >= 40) return "text-amber-500"
    return "text-red-500"
  }

  const getProgressColor = () => {
    if (score >= 90) return "bg-green-500"
    if (score >= 70) return "bg-emerald-500"
    if (score >= 40) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Meeting Analysis Results</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Analysis of "{result.title}" on {result.date}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-muted p-6 text-center">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-muted-foreground/20">
              <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}</span>
              <span className="absolute bottom-0 text-sm font-medium">out of 100</span>
            </div>
            <h3 className="text-xl font-semibold">{classification}</h3>
            <Progress value={score} className={`h-2 w-full ${getProgressColor()}`} />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Effectiveness Breakdown</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Primary Metrics (70%)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Decisions Made</span>
                    <span className="font-medium">{metrics.decisionsScore} / 30 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Action Items Assigned</span>
                    <span className="font-medium">{metrics.actionItemsScore} / 20 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Participation Ratio</span>
                    <span className="font-medium">{metrics.participationScore} / 20 pts</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Subtotal</span>
                    <span>{metrics.primaryTotal} / 70 pts</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Process Metrics (30%)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Agenda Provided</span>
                    <span className="font-medium">{metrics.agendaScore} / 10 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Follow-up Sent</span>
                    <span className="font-medium">{metrics.followUpScore} / 10 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Duration Efficiency</span>
                    <span className="font-medium">{metrics.durationScore} / 10 pts</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Subtotal</span>
                    <span>{metrics.processTotal} / 30 pts</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {metrics.asyncPenalty !== 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-red-700">Async Modifier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-red-700">
                    <span className="text-sm">Could have been handled asynchronously</span>
                    <span className="font-medium">{metrics.asyncPenalty} pts</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <MeetingRecommendations recommendations={recommendations} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onAnalyzeAnother}>
            Analyze Another Meeting
          </Button>
          <Button>Apply Recommendations</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
