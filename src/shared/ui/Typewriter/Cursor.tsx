import clsx from 'clsx'

interface CursorProps {
  className: string
  cursor?: string
}

export const Cursor = ({ className, cursor = '|' }: CursorProps) => (
  <span className={clsx('animate-blink', className)}>{cursor}</span>
)
