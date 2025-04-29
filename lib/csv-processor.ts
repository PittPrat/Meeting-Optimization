interface MeetingData {
  Meeting_Title: string
  Duration_Minutes: string
  Participants: string
  Actual_Speakers: string
  Decision_Made: string
  Agenda_Provided: string
  Follow_Up_Sent: string
  Could_Be_Async: string
}

interface ProcessedMeeting {
  title: string
  duration: number
  totalParticipants: number
  activeParticipants: number
  participationRatio: number
  decisionsCount: number
  hadAgenda: boolean
  followUpSent: boolean
  couldBeAsync: string
  score: number
  classification: string
  keyIssues: string[]
}

interface SummaryData {
  averageScore: number
  averageParticipationRatio: number
  agendaPercentage: number
  followUpPercentage: number
  averageDecisions: number
  couldBeAsyncCount: number
  timeWastedPercentage: number
  topRecommendations: string[]
}

export async function processCsvData(csvText: string) {
  // Parse CSV data
  const rows = csvText.split("\n")
  const headers = rows[0].split(",").map((header) => header.trim())

  const meetings: ProcessedMeeting[] = []

  // Process each row (skip header)
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (!row.trim()) continue // Skip empty rows

    const values = row.split(",").map((value) => value.trim())

    // Create an object with the CSV data
    const meetingData: Partial<MeetingData> = {}
    headers.forEach((header, index) => {
      if (values[index] !== undefined) {
        meetingData[header as keyof MeetingData] = values[index]
      }
    })

    // Skip rows with missing essential data
    if (!meetingData.Meeting_Title || !meetingData.Duration_Minutes) continue

    // Convert data to the format expected by the analyzer
    const processedData = {
      title: meetingData.Meeting_Title || "Untitled Meeting",
      duration: Number.parseInt(meetingData.Duration_Minutes || "60"),
      totalParticipants: Number.parseInt(meetingData.Participants || "0"),
      activeParticipants: Number.parseInt(meetingData.Actual_Speakers || "0"),
      decisionsCount: meetingData.Decision_Made?.toLowerCase() === "yes" ? 1 : 0,
      hadAgenda: meetingData.Agenda_Provided?.toLowerCase() === "yes",
      followUpSent: meetingData.Follow_Up_Sent?.toLowerCase() === "yes",
      couldBeAsync: meetingData.Could_Be_Async?.toLowerCase() === "yes" ? "yes" : "no",
      notes: "",
    }

    // Calculate participation ratio
    const participationRatio =
      processedData.totalParticipants > 0 ? processedData.activeParticipants / processedData.totalParticipants : 0

    // Analyze the meeting
    const analysisResult = await analyzeMeetingFromCsv(processedData)

    // Add to meetings array
    meetings.push({
      ...processedData,
      participationRatio,
      score: analysisResult.score,
      classification: analysisResult.classification,
      keyIssues: analysisResult.keyIssues,
    })
  }

  // Generate summary data
  const summary = generateSummary(meetings)

  return {
    meetings,
    summary,
  }
}

async function analyzeMeetingFromCsv(
  data: any,
): Promise<{ score: number; classification: string; keyIssues: string[] }> {
  // Calculate primary metrics (70%)
  const decisionsScore = data.decisionsCount > 0 ? 30 : 0
  const actionItemsScore = 0 // Not available in CSV
  const participationRatio = data.totalParticipants > 0 ? data.activeParticipants / data.totalParticipants : 0
  const participationScore = Math.round(participationRatio * 20)

  const primaryTotal = decisionsScore + actionItemsScore + participationScore

  // Calculate process metrics (30%)
  const agendaScore = data.hadAgenda ? 10 : 0
  const followUpScore = data.followUpSent ? 10 : 0
  const durationScore = 5 // Default neutral score

  const processTotal = agendaScore + followUpScore + durationScore

  // Apply async penalty if applicable
  let asyncPenalty = 0
  if (data.couldBeAsync === "yes") {
    asyncPenalty = -30
  }

  // Calculate final score
  let score = primaryTotal + processTotal + asyncPenalty
  score = Math.max(0, Math.min(100, score)) // Ensure score is between 0-100

  // Determine classification
  let classification = ""
  if (score >= 90) {
    classification = "Excellent"
  } else if (score >= 70) {
    classification = "Good"
  } else if (score >= 40) {
    classification = "Needs Improvement"
  } else {
    classification = "Consider Eliminating"
  }

  // Identify key issues
  const keyIssues: string[] = []

  if (!data.hadAgenda) {
    keyIssues.push("No Agenda")
  }

  if (!data.followUpSent) {
    keyIssues.push("No Follow-up")
  }

  if (participationRatio < 0.5) {
    keyIssues.push("Low Participation")
  }

  if (data.decisionsCount === 0) {
    keyIssues.push("No Decisions")
  }

  if (data.couldBeAsync === "yes") {
    keyIssues.push("Could Be Async")
  }

  return {
    score,
    classification,
    keyIssues,
  }
}

function generateSummary(meetings: ProcessedMeeting[]): SummaryData {
  if (meetings.length === 0) {
    return {
      averageScore: 0,
      averageParticipationRatio: 0,
      agendaPercentage: 0,
      followUpPercentage: 0,
      averageDecisions: 0,
      couldBeAsyncCount: 0,
      timeWastedPercentage: 0,
      topRecommendations: [],
    }
  }

  // Calculate averages and percentages
  const totalScore = meetings.reduce((sum, meeting) => sum + meeting.score, 0)
  const averageScore = totalScore / meetings.length

  const totalParticipationRatio = meetings.reduce((sum, meeting) => sum + meeting.participationRatio, 0)
  const averageParticipationRatio = totalParticipationRatio / meetings.length

  const meetingsWithAgenda = meetings.filter((meeting) => meeting.hadAgenda).length
  const agendaPercentage = meetingsWithAgenda / meetings.length

  const meetingsWithFollowUp = meetings.filter((meeting) => meeting.followUpSent).length
  const followUpPercentage = meetingsWithFollowUp / meetings.length

  const totalDecisions = meetings.reduce((sum, meeting) => sum + meeting.decisionsCount, 0)
  const averageDecisions = totalDecisions / meetings.length

  const couldBeAsyncCount = meetings.filter((meeting) => meeting.couldBeAsync === "yes").length

  // Estimate time wasted based on meeting scores
  // Assumption: Meetings below 70 score waste 50% of their time, below 40 waste 80%
  let totalWastedMinutes = 0
  let totalMinutes = 0

  meetings.forEach((meeting) => {
    totalMinutes += meeting.duration

    if (meeting.score < 40) {
      totalWastedMinutes += meeting.duration * 0.8
    } else if (meeting.score < 70) {
      totalWastedMinutes += meeting.duration * 0.5
    } else if (meeting.score < 90) {
      totalWastedMinutes += meeting.duration * 0.2
    }
  })

  const timeWastedPercentage = totalWastedMinutes / totalMinutes

  // Generate top recommendations based on analysis
  const topRecommendations: string[] = []

  if (agendaPercentage < 0.7) {
    topRecommendations.push("Implement mandatory agendas for all meetings to improve focus and productivity.")
  }

  if (followUpPercentage < 0.7) {
    topRecommendations.push("Ensure follow-up summaries with action items are sent after each meeting.")
  }

  if (averageParticipationRatio < 0.6) {
    topRecommendations.push("Reduce participant count in meetings to include only essential stakeholders.")
  }

  if (couldBeAsyncCount > meetings.length * 0.3) {
    topRecommendations.push(
      "Convert identified meetings to asynchronous formats (documents, emails, or recorded updates).",
    )
  }

  if (averageScore < 60) {
    topRecommendations.push("Review and potentially eliminate low-scoring meetings to reclaim productive time.")
  }

  // Add general recommendation if we don't have enough specific ones
  if (topRecommendations.length < 3) {
    topRecommendations.push("Implement a regular review process for all recurring meetings to ensure continued value.")
  }

  return {
    averageScore,
    averageParticipationRatio,
    agendaPercentage,
    followUpPercentage,
    averageDecisions,
    couldBeAsyncCount,
    timeWastedPercentage,
    topRecommendations,
  }
}
