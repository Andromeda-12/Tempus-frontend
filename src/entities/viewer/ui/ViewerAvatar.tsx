import { Avatar } from '@/shared/ui'
import { $viewer } from '../model'
import { useUnit } from 'effector-react'
import { getImageUrl } from '@/shared/lib'

interface ViewerAvatar {
  className?: string
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'full'
}

export const ViewerAvatar = ({ className, size }: ViewerAvatar) => {
  const viewer = useUnit($viewer)
  let fallback = 'AF'
  if (viewer) fallback = viewer?.firstName[0] + viewer?.lastName[0]
  return (
    <Avatar
      size={size}
      src={getImageUrl(viewer?.avatar)}
      // src='https://pictures.telegram-store.com/channels/anime-media/38830_2021_11_20_5_.jpg'
      fallback={fallback}
      className={className}
    />
  )
}
