import { ReactNode, DragEvent, useEffect, useState } from 'react'

interface DropZoneProps {
  children: ReactNode
  className: string
  onDragStateChange?: (isDragActive: boolean) => void
  onDrag?: () => void
  onDragIn?: () => void
  onDragOut?: () => void
  onDrop?: () => void
  onClick?: () => void
  onFilesDrop?: (files: File[]) => void
}

export const DropZone = ({
  children,
  className,
  onFilesDrop,
  onDrag,
  onDrop,
  onDragIn,
  onDragOut,
  onClick,
  onDragStateChange
}: DropZoneProps) => {
  const [isDragActive, setIsDragActive] = useState(false)

  const mapFileListToArray = (files: FileList) => Array.from(files)

  const handleDragIn = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onDragIn?.()

    if (event.dataTransfer?.items && event.dataTransfer.items.length > 0) {
      setIsDragActive(true)
    }
  }

  const handleDragOut = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onDragOut?.()

    setIsDragActive(false)
  }

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    onDrag?.()
    if (!isDragActive) {
      setIsDragActive(true)
    }
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    setIsDragActive(false)
    onDrop?.()

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const files = mapFileListToArray(event.dataTransfer.files)

      onFilesDrop?.(files)
      event.dataTransfer.clearData()
    }
  }

  useEffect(() => {
    onDragStateChange?.(isDragActive)
  }, [isDragActive])

  return (
    <div
      className={className}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onDrag={(e) => e.stopPropagation()}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
