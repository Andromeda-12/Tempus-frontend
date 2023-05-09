import { useUnit } from 'effector-react'
import { currentTaskModel } from '@/entities/current-task'
import { IconButton } from '@/shared/ui'
import { toggleTaskState } from '../model'

interface ToggleTaskStateProps {
  disabled?: boolean
}

export const ToggleTaskState = ({ disabled }: ToggleTaskStateProps) => {
  const isTaskRunnign = useUnit(currentTaskModel.$isRunnign)
  const toggleTaskStateFn = useUnit(toggleTaskState)

  let iconName = isTaskRunnign ? 'pause' : 'play'

  return (
    <IconButton
      disabled={disabled}
      icon={iconName}
      accent={!isTaskRunnign}
      onClick={toggleTaskStateFn}
    />
  )
}
