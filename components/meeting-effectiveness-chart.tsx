"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function MeetingEffectivenessChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Sample data - in a real app, this would come from your API
    const data = {
      labels: [
        "Sprint Planning",
        "Cross-Team Sync",
        "Budget Review",
        "Leadership Roundtable",
        "Security Briefing",
        "Weekly Standup",
        "QA Review",
      ],
      datasets: [
        {
          label: "Average Effectiveness Score",
          data: [82, 65, 78, 88, 76, 58, 72],
          backgroundColor: "rgba(59, 130, 246, 0.5)",
          borderColor: "rgb(59, 130, 246)",
          borderWidth: 1,
        },
      ],
    }

    // Create new chart
    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: "Score (0-100)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Meeting Type",
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

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={chartRef} />
    </div>
  )
}
