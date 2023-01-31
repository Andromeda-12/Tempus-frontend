import { ReactNode } from 'react'

interface BreakViewProps {
  breakLabel: string | ReactNode
  breakClassName: string
  breakLinkClassName: string
  breakHandler: () => void
  getEventListener: (cb: () => void) => object
}

export const BreakView = ({
  breakLabel,
  breakClassName,
  breakLinkClassName,
  breakHandler,
  getEventListener
}: BreakViewProps) => {
  const className = breakClassName || 'break'

  return (
    <li className={className}>
      <a
        className={breakLinkClassName}
        role='button'
        tabIndex={0}
        onKeyDown={breakHandler}
        {...getEventListener(breakHandler)}
      >
        {breakLabel}
      </a>
    </li>
  )
}
