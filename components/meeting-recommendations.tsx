import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MeetingRecommendationsProps {
  recommendations: any[]
}

export function MeetingRecommendations({ recommendations }: MeetingRecommendationsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recommendations</h3>
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
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
    </div>
  )
}
