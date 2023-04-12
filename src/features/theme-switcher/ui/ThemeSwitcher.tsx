import { useUnit } from 'effector-react'
import { IconButton } from '@/shared/ui'
import { $theme, toggleTheme } from '../model'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const theme = useUnit($theme)
  const toggleThemeFn = useUnit(toggleTheme)

  return (
    <IconButton
      className={className}
      icon={theme === 'dark' ? 'darkTheme' : 'lightTheme'}
      variant='text'
      onClick={toggleThemeFn}
    />
  )
}
