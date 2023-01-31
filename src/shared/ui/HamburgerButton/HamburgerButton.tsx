import clsx from 'clsx'
import { Button } from '../Button'
import { SquareButton } from '../SquareButton'

interface HamburgerButtonProps {
  open: boolean
  onClick: () => void
  className?: string
}

export const HamburgerButton = ({
  open = false,
  onClick,
  className
}: HamburgerButtonProps) => (
  <SquareButton
    className={className}
    icon={!open ? 'hamburger' : 'close'}
    accent
    variant='text'
    onClick={onClick}
  />
)
