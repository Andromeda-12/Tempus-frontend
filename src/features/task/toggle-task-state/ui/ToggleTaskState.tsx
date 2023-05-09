import { useUnit } from 'effector-react'
import { currentTaskModel } from '@/entities/current-task'
import { IconButton } from '@/shared/ui'
import { $isLoading, toggleTaskState } from '../model'

interface ToggleTaskStateProps {
  disabled?: boolean
}

export const ToggleTaskState = ({ disabled }: ToggleTaskStateProps) => {
  const isTaskRunning = useUnit(currentTaskModel.$isRunning)
  const toggleTaskStateFn = useUnit(toggleTaskState)
  const isLoading = useUnit($isLoading)

  if (isLoading)
    return (
      <div className='bg-secondary/10 animate-pulse h-[40px] w-[40px] rounded-lg'></div>
    )

  let iconName = isTaskRunning ? 'pause' : 'play'

  return (
    <IconButton
      disabled={disabled}
      icon={iconName}
      accent={!isTaskRunning}
      onClick={toggleTaskStateFn}
    />
  )
}
