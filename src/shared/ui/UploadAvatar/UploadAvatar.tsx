import clsx from 'clsx'
import { AvatarContainer } from '../Avatar'
import { ImageUpload } from '../ImageUpload'
import { AvatarFallback } from '../Avatar/AvatarFallback'
import { useState } from 'react'

interface UploadAvatarProps {
  className?: string
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'full'
  variant?: 'circle' | 'rounded'
  fallback?: string
  preview: string | null | undefined
  onUpload: (avatar: File) => void
}

export const UploadAvatar = ({
  className,
  variant = 'circle',
  size = 'base',
  fallback = '',
  preview,
  onUpload
}: UploadAvatarProps) => {
  const [isShowFallback, setIsShowFallback] = useState(true)

  const hanldeUploadAvatar = (avatar: File) => {
    setIsShowFallback(false)
    onUpload(avatar)
  }

  return (
    <AvatarContainer
      className={clsx('group', className)}
      size={size}
      variant={variant}
    >
      {!preview && isShowFallback && (
        <AvatarFallback fallback={fallback} variant={variant} size={size} />
      )}

      <ImageUpload
        previewClassName='!rounded-full'
        className={clsx(
          'h-full w-full px-5 text-center',
          {
            ['circle']: '!rounded-full',
            ['rounded']: 'rounded'
          }[variant],
          className
        )}
        preview={preview}
        overlay={
          <>
            <div className='font-semibold text-lg opacity-0 group-hover:opacity-100 duration-200 z-10'>
              Upload your avatar
            </div>
            <div className='absolute inset-0 group-hover:bg-gray-200/80 dark:group-hover:bg-slate-600/80'></div>
          </>
        }
        onChange={hanldeUploadAvatar}
      />
    </AvatarContainer>
  )
}
