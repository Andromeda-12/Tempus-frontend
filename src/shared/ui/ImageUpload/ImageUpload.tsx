/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from 'react'
import clsx from 'clsx'
import { DropZone as DropZoneContainer } from '@/shared/lib'
import { Icon } from '../Icon'

interface ImageUploadProps {
  className?: string
  preview: string | null
  onChange?: (files: File) => void
}

export const ImageUpload = ({
  className,
  onChange,
  preview: previewProp
}: ImageUploadProps) => {
  const [isDragActive, setIsDragActive] = useState(false)
  const [preview, setPreview] = useState(previewProp || null)

  const onDragStateChange = (dragActive: boolean) => {
    setIsDragActive(dragActive)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  const triggeFileInput = () => {
    inputRef.current?.click()
  }

  const handleInputChange = (files: FileList | File[]) => {
    if (!files[0]) return
    if (files[0].type.includes('video')) return

    onChange?.(files[0])

    const preveiweURL = URL.createObjectURL(files[0])
    setPreview(preveiweURL)
  }

  return (
    <DropZoneContainer
      onClick={triggeFileInput}
      onDragStateChange={onDragStateChange}
      onFilesDrop={handleInputChange}
      className={clsx(
        'text-primary relative h-full w-full rounded-2xl group',
        'cursor-pointer bg-gray-100/60 dark:bg-secondary/5 dark:text-secondary',
        'flex items-center justify-center flex-col',
        isDragActive && 'border-dashed',
        className
      )}
    >
      <div
        className={clsx(
          'flex flex-col z-10 items-center justify-center',
          preview && 'text-black dark:text-white'
        )}
      >
        <Icon
          name='fileUpload'
          size='lg'
          className={clsx(isDragActive && 'animate-bounce')}
        />
        <p className='mt-4'>Browse File to Upload</p>
      </div>

      {preview && (
        <div
          className={clsx(
            'h-full w-full absolute inset-0 overflow-hidden z-20 group-hover:opacity-50 group-hover:z-0 duration-200 rounded-2xl',
            isDragActive && 'z-0 opacity-50'
          )}
        >
          <img
            src={preview}
            alt='cover'
            className='h-full w-full object-cover pointer-events-none'
          />
        </div>
      )}

      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        multiple
        className='hidden'
        onChange={(e) => e.target.files && handleInputChange(e.target.files)}
      />
    </DropZoneContainer>
  )
}
