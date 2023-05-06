import { useUnit } from 'effector-react'
import { currentTaskModel } from '@/entities/current-task'
import { IconButton } from '@/shared/ui'

export const TimerButton = () => {
  const isTaskRunnign = useUnit(currentTaskModel.$isRunnign)
  const runTask = useUnit(currentTaskModel.runTask)
  const pauseTask = useUnit(currentTaskModel.pauseTask)

  let iconName = isTaskRunnign ? 'pause' : 'play'

  const handleClick = () => {
    if (isTaskRunnign) runTask()
    else pauseTask()
  }

  return <IconButton shape='rounded' icon={iconName} onClick={handleClick} />
}
