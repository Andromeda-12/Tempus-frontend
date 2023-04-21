import clsx from 'clsx'
import { ReactNode, useRef, useState } from 'react'
import { DropZone as DropZoneContainer } from '@/shared/lib'
import { Icon } from '../Icon'
import { Preview } from './Preview'

interface ImageUploadProps {
  className?: string
  previewClassName?: string
  preview: string | null | undefined
  overlay?: ReactNode
  onChange?: (files: File) => void
}

export const ImageUpload = ({
  className,
  previewClassName,
  onChange,
  overlay,
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
        'text-primary relative w-full rounded-2xl overflow-hidden group',
        'cursor-pointer dark:text-secondary',
        'flex items-center justify-center flex-col',
        className
      )}
    >
      <div
        className={clsx(
          'h-full w-full flex flex-col z-10 items-center justify-center',
          preview && 'text-black dark:text-white'
        )}
      >
        {overlay || <DefaultOverlay isDragActive={isDragActive} />}
      </div>

      {preview && (
        <Preview
          alt='Cover'
          preview={preview}
          className={clsx(
            'h-full w-full absolute inset-0 overflow-hidden z-20 group-hover:opacity-50 group-hover:z-0 duration-200 rounded-2xl',
            previewClassName,
            isDragActive && 'z-0 opacity-50'
          )}
        />
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

const DefaultOverlay = ({ isDragActive }: { isDragActive: boolean }) => {
  return (
    <div
      className={clsx(
        'absolute inset-0 rounded-2xl duration-100 flex justify-center items-center border-2 border-primary/50 dark:border-secondary/70',
        isDragActive && 'border-dashed'
      )}
    >
      <div className='flex flex-col items-center -z-10'>
        <Icon
          name='fileUpload'
          size='lg'
          className={clsx(isDragActive && 'animate-bounce')}
        />
        <p className='mt-4'>Browse File to Upload</p>
      </div>
    </div>
  )
}
