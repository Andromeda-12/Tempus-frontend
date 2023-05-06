import { useUnit } from 'effector-react'
import { currentTaskModel } from '@/entities/current-task'
import { Button } from '@/shared/ui'

export const CompleteTaskButton = () => {
  const completeTask = useUnit(currentTaskModel.completeTask)
  return (
    <Button onClick={completeTask} variant='contained' accent>
      Complete
    </Button>
  )
}
