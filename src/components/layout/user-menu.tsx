import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LogOut, User } from 'lucide-react'
import { AvatarPicker } from '../user/avatar-picker'
import { NicknameEditor } from '../user/nickname-editor'
import { FragmentsDisplay } from '../fragments/fragments-display'
import { useAvatar } from '@/hooks/use-avatar'
import { useNickname } from '@/hooks/use-nickname'

interface UserMenuProps {
  user: {
    email: string
  }
  onSignOut: () => void
}

export function UserMenu({ user, onSignOut }: UserMenuProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const { avatarStyle, updateAvatarStyle, getAvatarUrl, loading } = useAvatar()
  const { nickname } = useNickname()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
        setShowAvatarPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative flex items-center gap-3" ref={menuRef}>
      <FragmentsDisplay />
      
      <Button
        variant="ghost"
        size="sm"
        className="p-0 h-9 w-9 rounded-full hover:bg-transparent relative"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Avatar className="h-9 w-9 ring-2 ring-background transition-shadow hover:ring-primary/20">
          <AvatarImage 
            src={getAvatarUrl(user.email)} 
            alt={nickname} 
          />
          <AvatarFallback className="bg-primary/10 text-primary">
            {nickname.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Button>

      {showMenu && (
        <Card className="absolute right-0 top-full mt-2 w-56 z-50">
          <div className="p-2">
            <div className="flex items-center gap-3 p-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={getAvatarUrl(user.email)} />
                <AvatarFallback>{nickname.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{nickname}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            
            <div className="border-t my-2" />
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            >
              <User className="h-4 w-4 mr-2" />
              Change Avatar
            </Button>

            <NicknameEditor />
            
            <div className="border-t my-2" />
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
              onClick={onSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </Card>
      )}

      {showAvatarPicker && showMenu && (
        <AvatarPicker
          currentStyle={avatarStyle}
          seed={user.email}
          onSelect={async (style) => {
            await updateAvatarStyle(style)
            setShowAvatarPicker(false)
          }}
          onClose={() => setShowAvatarPicker(false)}
          loading={loading}
        />
      )}
    </div>
  )
}