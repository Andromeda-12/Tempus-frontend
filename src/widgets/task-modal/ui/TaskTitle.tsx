import { useUnit } from 'effector-react'
import { currentTaskModel } from '@/entities/current-task'

export const TaskTitle = () => {
  const currentTask = useUnit(currentTaskModel.$currentTask)

  return (
    <h2 className='text-xl font-bold  text-ellipsis overflow-hidden'>
      {currentTask?.title}
    </h2>
  )
}
