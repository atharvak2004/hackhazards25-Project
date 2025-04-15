import React from 'react'
import AIQueryBox from '../components/AIQueryBox'
function SessionFeedback() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Session AI Feedback</h2>
      <p>Feedback summary powered by Groq will appear here.</p>
      <AIQueryBox />
    </div>
  )
}

export default SessionFeedback;