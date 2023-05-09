import clsx from 'clsx'
import { useUnit } from 'effector-react'
import { ViewerAvatar } from '@/entities/viewer'
import { currentTaskModel, taskManagerModel } from '@/entities/current-task'
import { Avatar, Checkbox, Spinner, Tooltip } from '@/shared/ui'
import { formatTime, getImageUrl } from '@/shared/lib'
import { MembersInfo } from '@/shared/api'
import { $isLoadingMemberList } from '../model'

export const WorkersList = () => {
  const isLoading = useUnit($isLoadingMemberList)
  const currentTask = useUnit(currentTaskModel.$currentTask)

  if (!currentTask || currentTask.members.length === 0)
    return <div>No assigned</div>

  return (
    // <div className='border border-primary dark:border-secondary rounded-lg overflow-hidden h-full w-full flex pr-2 py-2'>

    <div className=' w-[290px] relative overflow-hidden'>
      {isLoading && (
        <div className='absolute inset-0 bg-neutral/90 z-20  flex justify-center items-center'>
          <Spinner className='!w-10 !h-10 border-4' />
        </div>
      )}

      <div className='scrollbar scrollbar-dense overflow-y-auto overflow-x-auto w-full rounded-lg h-full max-h-[200px] overflow-hidden'>
        {currentTask.members.map((member) => (
          <Member memberInfo={member} />
        ))}
      </div>
    </div>
    // {/* </div> 
  )
}

const Member = ({ memberInfo }: { memberInfo: MembersInfo }) => {
  const { member, workTime, isComplete } = memberInfo
  const { avatar, firstName, lastName } = member
  return (
    <div className='flex items-center py-1.5 text-xs md:text-sm space-x-5 w-full'>
      <div className='w-1/12'>
        <Avatar size='sm' src={getImageUrl(avatar)} />
      </div>

      <Column className='w-6/12 ' text={`${lastName} ${firstName}`} />

      <div className='w-3/12 flex justify-end'>{formatTime(workTime)}</div>

      <div className='w-2/12 flex justify-end'>
        <Checkbox checked={isComplete} />
      </div>
    </div>
  )
}

const Column = ({ className, text }: { className?: string; text: string }) => (
  <div className={clsx(className, 'w-full')}>
    <Tooltip text={text}>
      <div className='overflow-hidden text-ellipsis whitespace-nowrap h-[20px]'>
        {text}
      </div>
    </Tooltip>
  </div>
)
