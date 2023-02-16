interface PreviewProps {
  className?: string
  preview: string
  alt: string
}

export const Preview = ({ className, preview, alt }: PreviewProps) => {
  return (
    <div className={className}>
      <img
        src={preview}
        alt={alt}
        className='h-full w-full object-cover pointer-events-none'
      />
    </div>
  )
}
