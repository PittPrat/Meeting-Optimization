"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, FileDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MeetingResultsTable } from "@/components/meeting-results-table"
import { MeetingResultsCharts } from "@/components/meeting-results-charts"
import { MeetingResultsSummary } from "@/components/meeting-results-summary"

interface ImportResultsProps {
  results: any
  onReset: () => void
}

export function ImportResults({ results, onReset }: ImportResultsProps) {
  const [activeTab, setActiveTab] = useState("summary")

  const handleExport = () => {
    // Create a JSON blob and download it
    const dataStr = JSON.stringify(results, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "meeting-analysis-results.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Analysis Results</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <FileDown className="mr-2 h-4 w-4" />
                Export Results
              </Button>
            </div>
          </CardTitle>
          <CardDescription>Analysis of {results.meetings.length} meetings from imported data</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-6">
              <TabsTrigger
                value="summary"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="table"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Table View
              </TabsTrigger>
              <TabsTrigger
                value="charts"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Charts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="p-6">
              <MeetingResultsSummary results={results} />
            </TabsContent>
            <TabsContent value="table" className="p-6">
              <MeetingResultsTable meetings={results.meetings} />
            </TabsContent>
            <TabsContent value="charts" className="p-6">
              <MeetingResultsCharts results={results} />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={onReset}>
            Import Another File
          </Button>
          <Button asChild>
            <Link href="/">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
