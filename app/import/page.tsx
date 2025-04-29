import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileImporter } from "@/components/file-importer"

export const metadata: Metadata = {
  title: "Import Meeting Data - Meeting Optimization AI System",
  description: "Import and analyze meeting data from CSV files",
}

export default function ImportPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <div className="container grid items-start gap-6 pb-8 pt-6 md:gap-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Link>
                </Button>
              </div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Import Meeting Data</h1>
              <p className="text-muted-foreground">
                Import meeting data from CSV files to analyze effectiveness and get recommendations
              </p>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Import CSV File</CardTitle>
              <CardDescription>
                Upload a CSV file with meeting data or provide a URL to analyze multiple meetings at once
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileImporter />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
