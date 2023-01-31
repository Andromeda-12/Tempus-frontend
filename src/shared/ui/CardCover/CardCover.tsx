import clsx from 'clsx'

interface CardCoverProps {
  className?: string
  cover: string
}

export const CardCover = ({ className, cover }: CardCoverProps) => {
  if (cover)
    return (
      <div
        className={clsx('h-52 bg-cover bg-center', className)}
        style={{ backgroundImage: `url(${cover})` }}
      ></div>
    )

  return (
    <div className='h-52 flex justify-center items-center text-lg text-gray-500/40 border-b border-b-background-dark'>
      No cover
    </div>
  )
}
