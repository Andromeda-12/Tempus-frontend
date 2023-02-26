import { useStore, useUnit } from 'effector-react'
import { viewerModel } from '@/entities/viewer'
import { UploadAvatar as BaseUploadAvatar } from '@/shared/ui'
import { UpdateUserDto } from '@/shared/api'
import { getImageUrl } from '@/shared/lib'
import { uploadAvatar } from '../model'

interface UploadAvatarProps {
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'full'
}

export const UploadAvatar = ({ size }: UploadAvatarProps) => {
  const viewer = useStore(viewerModel.$viewer)
  const uploadAvatarFn = useUnit(uploadAvatar)

  const fallback = viewer!.firstName[0] + viewer!.lastName[0]

  const handleUploadAvatar = (avatarFile: File) => {
    const updateUserDto: UpdateUserDto = {
      avatarFile
    }

    uploadAvatarFn(updateUserDto)
  }

  return (
    <BaseUploadAvatar
      onUpload={handleUploadAvatar}
      preview={getImageUrl(viewer?.avatar)}
      fallback={fallback}
      size={size}
    />
  )
}
