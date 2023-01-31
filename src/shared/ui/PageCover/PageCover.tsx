import clsx from 'clsx'

interface PageCoverProps {
  className?: string
  cover: string
}

export const PageCover = ({ className, cover }: PageCoverProps) => {
  if (cover)
    return (
      <div
        className={clsx(
          'h-44 md:h-64 bg-cover bg-center rounded-xl',
          className
        )}
        style={{ backgroundImage: `url(/${cover})` }}
      ></div>
    )

  return (
    <div
      className={clsx('h-44 md:h-64 bg-cover bg-center rounded-xl', className)}
      style={{ backgroundImage: `url(/photo.jpg)` }}
    ></div>
  )
}
