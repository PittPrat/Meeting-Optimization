// This is a simplified implementation of the meeting analyzer
// In a real application, this would likely be an API call to a backend service

interface MeetingData {
  title: string
  date: Date
  duration: number
  meetingType: string
  functionalCategory: string
  totalParticipants: number
  activeParticipants: number
  hadAgenda: boolean
  decisionsCount: number
  actionItemsCount: number
  followUpSent: boolean
  couldBeAsync: string
  notes: string
}

interface ScoringMetrics {
  decisionsScore: number
  actionItemsScore: number
  participationScore: number
  primaryTotal: number
  agendaScore: number
  followUpScore: number
  durationScore: number
  processTotal: number
  asyncPenalty: number
}

interface Recommendation {
  title: string
  description: string
  category: string
  impact: string
}

interface AnalysisResult {
  title: string
  date: string
  score: number
  classification: string
  metrics: ScoringMetrics
  recommendations: Recommendation[]
}

export async function analyzeMeeting(data: MeetingData): Promise<AnalysisResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Calculate primary metrics (70%)
  const decisionsScore = Math.min(data.decisionsCount * 10, 30)
  const actionItemsScore = Math.min(data.actionItemsCount * 5, 20)

  // Calculate participation ratio (0-20 pts)
  const participationRatio = data.activeParticipants / data.totalParticipants
  const participationScore = Math.round(participationRatio * 20)

  const primaryTotal = decisionsScore + actionItemsScore + participationScore

  // Calculate process metrics (30%)
  const agendaScore = data.hadAgenda ? 10 : 0
  const followUpScore = data.followUpSent ? 10 : 0

  // Duration efficiency score
  // This is a simplified calculation - in a real app, you'd compare against benchmarks
  let durationScore = 5 // Default neutral score

  if (data.duration <= 30 && data.decisionsCount >= 2) {
    durationScore = 10 // Efficient meeting
  } else if (data.duration >= 90 && data.decisionsCount < 2) {
    durationScore = 0 // Inefficient meeting
  }

  const processTotal = agendaScore + followUpScore + durationScore

  // Apply async penalty if applicable
  let asyncPenalty = 0
  if (data.couldBeAsync === "yes") {
    asyncPenalty = -30
  } else if (data.couldBeAsync === "partially") {
    asyncPenalty = -15
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

  // Generate recommendations based on the analysis
  const recommendations: Recommendation[] = []

  if (!data.hadAgenda) {
    recommendations.push({
      title: "Implement Mandatory Agendas",
      description: "Require agendas for all meetings to improve focus and productivity",
      category: "Process Improvement",
      impact: "Medium",
    })
  }

  if (data.couldBeAsync === "yes") {
    recommendations.push({
      title: `Convert ${data.meetingType} to Async Updates`,
      description: `Replace this meeting with async updates to save ${data.duration} minutes per occurrence`,
      category: "Format Change",
      impact: "High",
    })
  }

  if (participationRatio < 0.5) {
    recommendations.push({
      title: "Reduce Participant Count",
      description: `Only ${data.activeParticipants} of ${data.totalParticipants} participants were active. Consider reducing attendance.`,
      category: "Attendance Optimization",
      impact: "Medium",
    })
  }

  if (data.duration > 60 && data.decisionsCount < 3) {
    recommendations.push({
      title: "Shorten Meeting Duration",
      description: `Reduce meeting time from ${data.duration} to 30 minutes with a focused agenda`,
      category: "Duration Change",
      impact: "Medium",
    })
  }

  if (!data.followUpSent) {
    recommendations.push({
      title: "Implement Follow-up Summaries",
      description: "Send follow-up summaries with action items after each meeting",
      category: "Process Improvement",
      impact: "Medium",
    })
  }

  // Format date for display
  const formattedDate = data.date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return {
    title: data.title,
    date: formattedDate,
    score,
    classification,
    metrics: {
      decisionsScore,
      actionItemsScore,
      participationScore,
      primaryTotal,
      agendaScore,
      followUpScore,
      durationScore,
      processTotal,
      asyncPenalty,
    },
    recommendations,
  }
}
