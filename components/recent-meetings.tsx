import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data - in a real app, this would come from your API
const recentMeetings = [
  {
    id: "m1",
    title: "Q2 Planning Session",
    date: "2025-04-25",
    type: "Planning & Strategy",
    score: 92,
    classification: "Excellent",
  },
  {
    id: "m2",
    title: "Weekly Engineering Standup",
    date: "2025-04-24",
    type: "Status Updates",
    score: 58,
    classification: "Needs Improvement",
  },
  {
    id: "m3",
    title: "Product Roadmap Review",
    date: "2025-04-23",
    type: "Review & Feedback",
    score: 76,
    classification: "Good",
  },
  {
    id: "m4",
    title: "Marketing Campaign Sync",
    date: "2025-04-22",
    type: "Information Exchange",
    score: 65,
    classification: "Needs Improvement",
  },
  {
    id: "m5",
    title: "Budget Approval Meeting",
    date: "2025-04-21",
    type: "Decision Making",
    score: 88,
    classification: "Good",
  },
]

export function RecentMeetings() {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium">
                Title <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium">
                Score <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Classification</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentMeetings.map((meeting) => (
            <TableRow key={meeting.id}>
              <TableCell className="font-medium">{meeting.title}</TableCell>
              <TableCell>{meeting.date}</TableCell>
              <TableCell>{meeting.type}</TableCell>
              <TableCell>{meeting.score}</TableCell>
              <TableCell>{getScoreBadge(meeting.score, meeting.classification)}</TableCell>
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
                    <DropdownMenuItem>Export Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
