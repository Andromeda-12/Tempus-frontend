import clsx from 'clsx'

interface DividerProps {
  className?: string
}

export const Divider = ({ className }: DividerProps) => {
  return <hr className={clsx('border-primary/30', className)} />
}
