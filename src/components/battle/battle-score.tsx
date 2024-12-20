import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/use-auth'
import { useAvatar } from '@/hooks/use-avatar'
import { useNickname } from '@/hooks/use-nickname'

interface BattleScoreProps {
  playerScore: number
  opponentScore: number
}

export function BattleScore({ playerScore, opponentScore }: BattleScoreProps) {
  const { user } = useAuth()
  const { getAvatarUrl } = useAvatar()
  const { nickname } = useNickname()

  return (
    <div className="flex items-center justify-center gap-8 mb-8">
      <div className="text-center">
        <Avatar className="w-16 h-16 mb-2">
          <AvatarImage src={getAvatarUrl(user?.email || 'default')} />
          <AvatarFallback>{nickname.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-2xl font-bold">{playerScore}</div>
        <div className="text-sm text-muted-foreground">{nickname}</div>
      </div>

      <div className="text-2xl font-bold text-muted-foreground">VS</div>

      <div className="text-center">
        <Avatar className="w-16 h-16 mb-2">
          <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=ai" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div className="text-2xl font-bold">{opponentScore}</div>
        <div className="text-sm text-muted-foreground">AI Opponent</div>
      </div>
    </div>
  )
}