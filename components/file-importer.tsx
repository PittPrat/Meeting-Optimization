"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, FileUp, LinkIcon, Loader2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { processCsvData } from "@/lib/csv-processor"
import { ImportResults } from "@/components/import-results"

export function FileImporter() {
  const [fileUrl, setFileUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUrlImport = async () => {
    if (!fileUrl) {
      setError("Please enter a valid URL")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(fileUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`)
      }

      const csvText = await response.text()
      const processedData = await processCsvData(csvText)
      setResults(processedData)
    } catch (err) {
      console.error("Error importing file:", err)
      setError(err instanceof Error ? err.message : "Failed to import file")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setError(null)

    try {
      const text = await file.text()
      const processedData = await processCsvData(text)
      setResults(processedData)
    } catch (err) {
      console.error("Error processing file:", err)
      setError(err instanceof Error ? err.message : "Failed to process file")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoImport = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const demoUrl =
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/week%202%20-%20Problem_2_-_Meeting_Usefulness_Tracker-srByCZmZhhR7THY7uLMHOGDmJ1ULle.csv"
      const response = await fetch(demoUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch demo file: ${response.statusText}`)
      }

      const csvText = await response.text()
      const processedData = await processCsvData(csvText)
      setResults(processedData)
    } catch (err) {
      console.error("Error importing demo file:", err)
      setError(err instanceof Error ? err.message : "Failed to import demo file")
    } finally {
      setIsLoading(false)
    }
  }

  if (results) {
    return <ImportResults results={results} onReset={() => setResults(null)} />
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url">Import from URL</TabsTrigger>
          <TabsTrigger value="file">Upload File</TabsTrigger>
        </TabsList>
        <TabsContent value="url" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-url">CSV File URL</Label>
            <div className="flex gap-2">
              <Input
                id="file-url"
                placeholder="https://example.com/meetings.csv"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
              />
              <Button onClick={handleUrlImport} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LinkIcon className="mr-2 h-4 w-4" />}
                Import
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="file" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload CSV File</Label>
            <div className="flex gap-2">
              <Input id="file-upload" type="file" accept=".csv" onChange={handleFileUpload} disabled={isLoading} />
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3">
          <FileUp className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mb-1 text-lg font-medium">Quick Demo</h3>
        <p className="mb-4 text-sm text-muted-foreground">Try our demo dataset to see how the analysis works</p>
        <Button onClick={handleDemoImport} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Import Demo Data
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50 p-4">
          <p className="text-red-700">{error}</p>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/">Cancel</Link>
        </Button>
        <Button disabled>
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
