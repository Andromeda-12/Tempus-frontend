import { useUnit } from 'effector-react'
import { currentTaskModel } from '@/entities/current-task'
import { Button } from '@/shared/ui'
import { memberCompleteTask, memberUncompleteTask } from '../model'

export const MemberToggleCompleteButton = () => {
  const memberProgress = useUnit(currentTaskModel.$memberProgress)
  const memberCompleteTaskFn = useUnit(memberCompleteTask)
  const memberUncompleteTaskFn = useUnit(memberUncompleteTask)

  if (memberProgress?.isComplete)
    return (
      <Button accent onClick={memberUncompleteTaskFn}>
        Uncomplete work
      </Button>
    )

  return (
    <Button accent onClick={memberCompleteTaskFn}>
      Complete work
    </Button>
  )
}
