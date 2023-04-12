import clsx from 'clsx'
import { IconButton } from '../IconButton'

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
  <IconButton
    className={clsx(className)}
    icon={!open ? 'hamburger' : 'close'}
    accent
    variant='text'
    onClick={onClick}
  />
)
