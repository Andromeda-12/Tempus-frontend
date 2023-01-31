import { SquareButton } from '@/shared/ui'
import { useUnit } from 'effector-react'
import { $theme, toggleTheme } from '../model'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const theme = useUnit($theme)
  const toggleThemeFn = useUnit(toggleTheme)

  return (
    <SquareButton
      className={className}
      icon={theme === 'dark' ? 'darkTheme' : 'lightTheme'}
      variant='text'
      onClick={toggleThemeFn}
    />
  )
}
