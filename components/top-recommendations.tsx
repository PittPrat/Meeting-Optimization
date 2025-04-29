import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data - in a real app, this would come from your API
const topRecommendations = [
  {
    id: "r1",
    title: "Convert Weekly Standups to Async Updates",
    description: "Replace 30-minute standups with async Slack updates to save 10 hours/month",
    category: "Format Change",
    impact: "High",
  },
  {
    id: "r2",
    title: "Implement Mandatory Agendas",
    description: "Require agendas for all meetings to improve focus and productivity",
    category: "Process Improvement",
    impact: "Medium",
  },
  {
    id: "r3",
    title: "Reduce Cross-Team Sync Duration",
    description: "Shorten cross-team syncs from 60 to 30 minutes with focused agendas",
    category: "Duration Change",
    impact: "Medium",
  },
]

export function TopRecommendations() {
  return (
    <div className="space-y-4">
      {topRecommendations.map((recommendation) => (
        <Card key={recommendation.id} className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{recommendation.title}</CardTitle>
            <CardDescription>{recommendation.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                  {recommendation.category}
                </span>
                <span className="text-xs text-muted-foreground">Impact: {recommendation.impact}</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Implement <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
