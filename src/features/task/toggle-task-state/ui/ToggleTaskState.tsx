import { useUnit } from 'effector-react'
import { currentTaskModel } from '@/entities/current-task'
import { IconButton } from '@/shared/ui'

export const ToggleTaskState = () => {
  const isTaskRunnign = useUnit(currentTaskModel.$isRunnign)
  const toggleTaskState = useUnit(currentTaskModel.toggleTaskState)

  let iconName = isTaskRunnign ? 'pause' : 'play'

  return (
    <IconButton
      icon={iconName}
      accent={!isTaskRunnign}
      onClick={toggleTaskState}
    />
  )
}
