import { Swords } from 'lucide-react'

export function BattleHeader() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
        <Swords className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-4xl font-bold mb-2">Vocabulary Battle</h1>
      <p className="text-lg text-muted-foreground">
        Challenge yourself and compete with others
      </p>
    </div>
  )
}