interface BattleFeedbackProps {
  score: number
  spokenText?: string
}

export function BattleFeedback({ score, spokenText }: BattleFeedbackProps) {
  return (
    <div className={`p-4 rounded-lg ${
      score >= 80 ? 'bg-green-100' : 'bg-yellow-100'
    }`}>
      <p className="font-medium">
        Score: {score}%
        {score >= 80 ? ' - Excellent!' : ' - Keep practicing!'}
      </p>
      {spokenText && (
        <p className="text-sm mt-2">
          You said: "{spokenText}"
        </p>
      )}
    </div>
  )
}