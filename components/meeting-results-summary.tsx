import { ArrowRight, Clock, FileText, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface MeetingResultsSummaryProps {
  results: any
}

export function MeetingResultsSummary({ results }: MeetingResultsSummaryProps) {
  const { meetings, summary } = results

  // Calculate time savings potential
  const totalMeetingMinutes = meetings.reduce((total: number, meeting: any) => total + meeting.duration, 0)
  const potentialSavings = Math.round(summary.timeWastedPercentage * totalMeetingMinutes)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Meetings Analyzed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meetings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Effectiveness Score</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.averageScore.toFixed(1)}/100</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Savings Potential</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{potentialSavings} minutes</div>
            <p className="text-xs text-muted-foreground">{Math.round(potentialSavings / 60)} hours per cycle</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings That Could Be Async</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.couldBeAsyncCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((summary.couldBeAsyncCount / meetings.length) * 100)}% of all meetings
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Findings</CardTitle>
          <CardDescription>Summary of meeting effectiveness analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Meeting Effectiveness</span>
              <span className="text-sm text-muted-foreground">{summary.averageScore.toFixed(1)}/100</span>
            </div>
            <Progress value={summary.averageScore} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Participation Ratio</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(summary.averageParticipationRatio * 100)}%
              </span>
            </div>
            <Progress value={summary.averageParticipationRatio * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Meetings with Agendas</span>
              <span className="text-sm text-muted-foreground">{Math.round(summary.agendaPercentage * 100)}%</span>
            </div>
            <Progress value={summary.agendaPercentage * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Meetings with Follow-ups</span>
              <span className="text-sm text-muted-foreground">{Math.round(summary.followUpPercentage * 100)}%</span>
            </div>
            <Progress value={summary.followUpPercentage * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Decisions Made per Meeting</span>
              <span className="text-sm text-muted-foreground">{summary.averageDecisions.toFixed(1)}</span>
            </div>
            <Progress value={Math.min((summary.averageDecisions / 3) * 100, 100)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Recommendations</CardTitle>
          <CardDescription>Based on analysis of {meetings.length} meetings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-4">
            {summary.topRecommendations.map((recommendation: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  {index + 1}
                </div>
                <p>{recommendation}</p>
              </li>
            ))}
          </ul>

          <Button className="w-full mt-4">
            View Detailed Recommendations <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
