"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

Chart.register(...registerables)

interface MeetingResultsChartsProps {
  results: any
}

export function MeetingResultsCharts({ results }: MeetingResultsChartsProps) {
  const scoreDistributionRef = useRef<HTMLCanvasElement>(null)
  const scoreDistributionChart = useRef<Chart | null>(null)

  const participationRatioRef = useRef<HTMLCanvasElement>(null)
  const participationRatioChart = useRef<Chart | null>(null)

  const asyncPotentialRef = useRef<HTMLCanvasElement>(null)
  const asyncPotentialChart = useRef<Chart | null>(null)

  const timeWastedRef = useRef<HTMLCanvasElement>(null)
  const timeWastedChart = useRef<Chart | null>(null)

  useEffect(() => {
    // Score Distribution Chart
    if (scoreDistributionRef.current) {
      if (scoreDistributionChart.current) {
        scoreDistributionChart.current.destroy()
      }

      const classifications = ["Excellent", "Good", "Needs Improvement", "Consider Eliminating"]
      const counts = [0, 0, 0, 0]

      results.meetings.forEach((meeting: any) => {
        if (meeting.score >= 90) counts[0]++
        else if (meeting.score >= 70) counts[1]++
        else if (meeting.score >= 40) counts[2]++
        else counts[3]++
      })

      scoreDistributionChart.current = new Chart(scoreDistributionRef.current, {
        type: "pie",
        data: {
          labels: classifications,
          datasets: [
            {
              data: counts,
              backgroundColor: [
                "rgba(16, 185, 129, 0.7)", // Excellent - Green
                "rgba(59, 130, 246, 0.7)", // Good - Blue
                "rgba(245, 158, 11, 0.7)", // Needs Improvement - Amber
                "rgba(239, 68, 68, 0.7)", // Consider Eliminating - Red
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "right",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || ""
                  const value = context.raw as number
                  const percentage = Math.round((value / results.meetings.length) * 100)
                  return `${label}: ${value} (${percentage}%)`
                },
              },
            },
          },
        },
      })
    }

    // Participation Ratio Chart
    if (participationRatioRef.current) {
      if (participationRatioChart.current) {
        participationRatioChart.current.destroy()
      }

      // Group meetings by participation ratio ranges
      const ranges = ["0-25%", "26-50%", "51-75%", "76-100%"]
      const counts = [0, 0, 0, 0]

      results.meetings.forEach((meeting: any) => {
        const ratio = meeting.participationRatio * 100
        if (ratio <= 25) counts[0]++
        else if (ratio <= 50) counts[1]++
        else if (ratio <= 75) counts[2]++
        else counts[3]++
      })

      participationRatioChart.current = new Chart(participationRatioRef.current, {
        type: "bar",
        data: {
          labels: ranges,
          datasets: [
            {
              label: "Number of Meetings",
              data: counts,
              backgroundColor: "rgba(59, 130, 246, 0.7)",
              borderColor: "rgb(59, 130, 246)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Meetings",
              },
            },
            x: {
              title: {
                display: true,
                text: "Participation Ratio",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      })
    }

    // Async Potential Chart
    if (asyncPotentialRef.current) {
      if (asyncPotentialChart.current) {
        asyncPotentialChart.current.destroy()
      }

      const asyncCategories = ["Could be async", "Partially async", "Needs real-time"]
      const counts = [0, 0, 0]

      results.meetings.forEach((meeting: any) => {
        if (meeting.couldBeAsync === "yes") counts[0]++
        else if (meeting.couldBeAsync === "partially") counts[1]++
        else counts[2]++
      })

      asyncPotentialChart.current = new Chart(asyncPotentialRef.current, {
        type: "doughnut",
        data: {
          labels: asyncCategories,
          datasets: [
            {
              data: counts,
              backgroundColor: [
                "rgba(239, 68, 68, 0.7)", // Could be async - Red
                "rgba(245, 158, 11, 0.7)", // Partially async - Amber
                "rgba(16, 185, 129, 0.7)", // Needs real-time - Green
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "right",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || ""
                  const value = context.raw as number
                  const percentage = Math.round((value / results.meetings.length) * 100)
                  return `${label}: ${value} (${percentage}%)`
                },
              },
            },
          },
        },
      })
    }

    // Time Wasted Chart
    if (timeWastedRef.current) {
      if (timeWastedChart.current) {
        timeWastedChart.current.destroy()
      }

      // Calculate time wasted by classification
      const classifications = ["Excellent", "Good", "Needs Improvement", "Consider Eliminating"]
      const timeWasted = [0, 0, 0, 0]
      const meetingCounts = [0, 0, 0, 0]

      results.meetings.forEach((meeting: any) => {
        let index = 3 // Default to "Consider Eliminating"
        if (meeting.score >= 90) index = 0
        else if (meeting.score >= 70) index = 1
        else if (meeting.score >= 40) index = 2

        // For simplicity, assume meetings below 70 score waste 50% of their time
        // and meetings below 40 score waste 80% of their time
        let wastedPercentage = 0
        if (index === 2) wastedPercentage = 0.5
        else if (index === 3) wastedPercentage = 0.8

        timeWasted[index] += meeting.duration * wastedPercentage
        meetingCounts[index]++
      })

      timeWastedChart.current = new Chart(timeWastedRef.current, {
        type: "bar",
        data: {
          labels: classifications,
          datasets: [
            {
              label: "Total Minutes Wasted",
              data: timeWasted,
              backgroundColor: [
                "rgba(16, 185, 129, 0.7)", // Excellent - Green
                "rgba(59, 130, 246, 0.7)", // Good - Blue
                "rgba(245, 158, 11, 0.7)", // Needs Improvement - Amber
                "rgba(239, 68, 68, 0.7)", // Consider Eliminating - Red
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Minutes",
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw as number
                  const index = context.dataIndex
                  const avgPerMeeting = meetingCounts[index] > 0 ? Math.round(value / meetingCounts[index]) : 0
                  return [
                    `Total Minutes Wasted: ${value}`,
                    `Meetings in Category: ${meetingCounts[index]}`,
                    `Avg. Minutes Wasted per Meeting: ${avgPerMeeting}`,
                  ]
                },
              },
            },
          },
        },
      })
    }

    return () => {
      if (scoreDistributionChart.current) scoreDistributionChart.current.destroy()
      if (participationRatioChart.current) participationRatioChart.current.destroy()
      if (asyncPotentialChart.current) asyncPotentialChart.current.destroy()
      if (timeWastedChart.current) timeWastedChart.current.destroy()
    }
  }, [results])

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Meeting Score Distribution</CardTitle>
            <CardDescription>Breakdown of meetings by effectiveness classification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <canvas ref={scoreDistributionRef} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participation Ratio</CardTitle>
            <CardDescription>Distribution of active participation in meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <canvas ref={participationRatioRef} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Async Potential</CardTitle>
            <CardDescription>Meetings that could be handled asynchronously</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <canvas ref={asyncPotentialRef} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Wasted Analysis</CardTitle>
            <CardDescription>Estimated time wasted by meeting classification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <canvas ref={timeWastedRef} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
