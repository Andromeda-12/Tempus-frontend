import clsx from 'clsx'
import { useUnit } from 'effector-react'
import { currentTaskModel } from '@/entities/current-task'
import { Avatar } from '@/shared/ui'
import { getImageUrl } from '@/shared/lib'

export const TaskCreator = ({ className }: { className?: string }) => {
  const taskCreator = useUnit(currentTaskModel.$taskCreator)

  let fallback = ''
  if (taskCreator)
    fallback = taskCreator?.firstName[0] + taskCreator?.lastName[0]

  return (
    <div className={clsx('flex items-center', className)}>
      <span className='text-sm mr-5'>Creator</span>

      <div className='flex items-center space-x-3'>
        <Avatar src={getImageUrl(taskCreator?.avatar)} fallback={fallback} />
        <span className='text-sm'>{`${taskCreator?.lastName} ${taskCreator?.firstName} `}</span>
      </div>
    </div>
  )
}
