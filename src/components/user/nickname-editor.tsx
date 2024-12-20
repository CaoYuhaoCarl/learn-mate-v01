import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil, Check, X } from 'lucide-react'
import { useNickname } from '@/hooks/use-nickname'

interface NicknameEditorProps {
  className?: string
}

export function NicknameEditor({ className }: NicknameEditorProps) {
  const { nickname, updateNickname } = useNickname()
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(nickname)

  const handleSave = async () => {
    if (!value.trim()) return
    await updateNickname(value.trim())
    setIsEditing(false)
  }

  const handleCancel = () => {
    setValue(nickname)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-8"
          placeholder="Enter nickname"
          maxLength={20}
          autoFocus
        />
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className="h-8 w-8 p-0"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setIsEditing(true)}
      className="w-full justify-start px-0 hover:bg-transparent"
    >
      <Pencil className="h-4 w-4 mr-2" />
      Edit Nickname
    </Button>
  )
}