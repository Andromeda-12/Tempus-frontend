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
      <div className='flex items-center space-x-3'>
        <div>
          <Avatar src={getImageUrl(taskCreator?.avatar)} fallback={fallback} />
        </div>
        <span className='text-xs sm:text-sm'>{`${taskCreator?.lastName} ${taskCreator?.firstName} `}</span>
      </div>
    </div>
  )
}
