import clsx from 'clsx'
import { useUnit } from 'effector-react'
import { currentTaskModel } from '@/entities/current-task'

export const TaskDescription = ({ className }: { className?: string }) => {
  const currentTask = useUnit(currentTaskModel.$currentTask)

  return (
    <div
      className={clsx(
        'max-h-[7.5em] text-base overflow-y-auto scrollbar scrollbar-dense pr-2',
        className
      )}
    >
      {currentTask?.description || (
        <div className='opacity-60'>no description</div>
      )}
    </div>
  )
}
