"use client"

import { useState } from "react"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface MeetingResultsTableProps {
  meetings: any[]
}

export function MeetingResultsTable({ meetings }: MeetingResultsTableProps) {
  const [sortField, setSortField] = useState("score")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedMeetings = [...meetings].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    // String comparison
    const aStr = String(aValue).toLowerCase()
    const bStr = String(bValue).toLowerCase()
    return sortDirection === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr)
  })

  const filteredMeetings = sortedMeetings.filter((meeting) =>
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getScoreBadge = (score: number, classification: string) => {
    if (score >= 90) {
      return <Badge className="bg-green-500">{classification}</Badge>
    }
    if (score >= 70) {
      return <Badge className="bg-emerald-500">{classification}</Badge>
    }
    if (score >= 40) {
      return <Badge className="bg-amber-500">{classification}</Badge>
    }
    return <Badge className="bg-red-500">{classification}</Badge>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search meetings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Sort By <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleSort("title")}>Meeting Title</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("score")}>Score</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("duration")}>Duration</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("participationRatio")}>Participation Ratio</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("title")}>
                  Meeting Title <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("duration")}>
                  Duration <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("participationRatio")}>
                  Participation <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("score")}>
                  Score <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Key Issues</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMeetings.map((meeting, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{meeting.title}</TableCell>
                <TableCell>{meeting.duration} min</TableCell>
                <TableCell>{Math.round(meeting.participationRatio * 100)}%</TableCell>
                <TableCell>{meeting.score}</TableCell>
                <TableCell>{getScoreBadge(meeting.score, meeting.classification)}</TableCell>
                <TableCell>
                  {meeting.keyIssues.map((issue: string, i: number) => (
                    <Badge key={i} variant="outline" className="mr-1 mb-1">
                      {issue}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>View Recommendations</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
