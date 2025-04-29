"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function TimeInvestmentChart() {
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
          label: "Current Hours/Month",
          data: [45, 38, 25, 30, 20, 15],
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderColor: "rgb(59, 130, 246)",
          borderWidth: 1,
        },
        {
          label: "Potential Hours/Month",
          data: [30, 20, 18, 25, 10, 12],
          backgroundColor: "rgba(16, 185, 129, 0.7)",
          borderColor: "rgb(16, 185, 129)",
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
            title: {
              display: true,
              text: "Hours per Month",
            },
          },
          x: {
            title: {
              display: true,
              text: "Meeting Category",
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              footer: (tooltipItems) => {
                const item = tooltipItems[0]
                const index = item.dataIndex
                const currentValue = data.datasets[0].data[index]
                const potentialValue = data.datasets[1].data[index]
                const savings = currentValue - potentialValue
                const percentage = Math.round((savings / currentValue) * 100)
                return `Potential Savings: ${savings} hours (${percentage}%)`
              },
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
