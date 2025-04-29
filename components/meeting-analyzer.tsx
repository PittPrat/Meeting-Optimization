"use client"

import { useState } from "react"
import { CalendarIcon, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { analyzeMeeting } from "@/lib/meeting-analyzer"
import { MeetingAnalysisResult } from "@/components/meeting-analysis-result"
import { useForm } from "react-hook-form"
import { format } from "date-fns"

const meetingTypes = [
  { value: "sprint-planning", label: "Sprint Planning" },
  { value: "cross-team-sync", label: "Cross-Team Sync" },
  { value: "budget-review", label: "Budget Review" },
  { value: "leadership-roundtable", label: "Leadership Roundtable" },
  { value: "security-briefing", label: "Security Briefing" },
  { value: "weekly-standup", label: "Weekly Standup" },
  { value: "qa-review", label: "QA Review" },
  { value: "other", label: "Other" },
]

const functionalCategories = [
  { value: "planning-strategy", label: "Planning & Strategy" },
  { value: "information-exchange", label: "Information Exchange" },
  { value: "review-feedback", label: "Review & Feedback" },
  { value: "decision-making", label: "Decision Making" },
  { value: "status-updates", label: "Status Updates" },
  { value: "analysis", label: "Analysis" },
]

export function MeetingAnalyzer() {
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const form = useForm({
    defaultValues: {
      title: "",
      date: new Date(),
      duration: 60,
      meetingType: "",
      functionalCategory: "",
      totalParticipants: 5,
      activeParticipants: 3,
      hadAgenda: false,
      decisionsCount: 0,
      actionItemsCount: 0,
      followUpSent: false,
      couldBeAsync: "no",
      notes: "",
    },
  })

  async function onSubmit(data: any) {
    setIsAnalyzing(true)

    try {
      // In a real implementation, this would call an API
      const result = await analyzeMeeting(data)
      setAnalysisResult(result)
    } catch (error) {
      console.error("Error analyzing meeting:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (analysisResult) {
    return <MeetingAnalysisResult result={analysisResult} onAnalyzeAnother={() => setAnalysisResult(null)} />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Title</FormLabel>
                <FormControl>
                  <Input placeholder="Q1 Planning Session" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Meeting Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="meetingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {meetingTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="functionalCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Functional Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {functionalCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-4">
                    <Slider
                      min={15}
                      max={180}
                      step={15}
                      defaultValue={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{field.value}</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="totalParticipants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Participants</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activeParticipants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active Participants</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Effectiveness Metrics</h3>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="hadAgenda"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Agenda Provided</FormLabel>
                    <FormDescription>Was an agenda shared before the meeting?</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="followUpSent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Follow-up Sent</FormLabel>
                    <FormDescription>Was a follow-up summary sent after the meeting?</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="decisionsCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Decisions Made</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Number of decisions made during the meeting</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="actionItemsCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action Items Assigned</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Number of action items assigned during the meeting</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="couldBeAsync"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Could this meeting have been handled asynchronously?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes, could have been an email or document</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="partially" />
                      </FormControl>
                      <FormLabel className="font-normal">Partially, some parts needed real-time discussion</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No, required real-time collaboration</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional context about the meeting..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isAnalyzing}>
          {isAnalyzing ? "Analyzing..." : "Analyze Meeting"}
        </Button>
      </form>
    </Form>
  )
}
