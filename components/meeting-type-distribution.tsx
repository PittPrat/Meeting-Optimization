"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function MeetingTypeDistribution() {
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
        "Planning & Strategy",
        "Information Exchange",
        "Review & Feedback",
        "Decision Making",
        "Status Updates",
        "Analysis",
      ],
      datasets: [
        {
          data: [25, 20, 15, 18, 12, 10],
          backgroundColor: [
            "rgba(59, 130, 246, 0.7)",
            "rgba(16, 185, 129, 0.7)",
            "rgba(245, 158, 11, 0.7)",
            "rgba(239, 68, 68, 0.7)",
            "rgba(139, 92, 246, 0.7)",
            "rgba(236, 72, 153, 0.7)",
          ],
          borderWidth: 1,
        },
      ],
    }

    // Create new chart
    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              padding: 15,
            },
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
