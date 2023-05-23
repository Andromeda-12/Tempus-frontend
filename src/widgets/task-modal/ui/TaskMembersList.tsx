import clsx from 'clsx'
import { useUnit } from 'effector-react'
import { currentTaskModel } from '@/entities/current-task'
import { Avatar, Checkbox, Spinner, Tooltip } from '@/shared/ui'
import { formatTime, getImageUrl } from '@/shared/lib'
import { MembersInfo } from '@/shared/api'
import { $isLoadingMemberList } from '../model'

export const TaskMembersList = () => {
  const isLoading = useUnit($isLoadingMemberList)
  const currentTask = useUnit(currentTaskModel.$currentTask)

  if (!currentTask || currentTask.members.length === 0)
    return (
      <div className='text-sm text-color-light/60 dark:text-color-dark/60'>
        No assigned
      </div>
    )

  return (
    <div className='w-[276px] relative overflow-hidden'>
      {isLoading && (
        <div className='absolute inset-0 bg-neutral/90 z-20  flex justify-center items-center'>
          <Spinner className='!w-10 !h-10 border-4' />
        </div>
      )}

      <div className='scrollbar scrollbar-dense overflow-y-auto overflow-x-auto w-full rounded-lg h-full max-h-[200px] overflow-hidden'>
        {currentTask.members.map((memberInfo) => (
          <Member key={memberInfo.member.id} memberInfo={memberInfo} />
        ))}
      </div>
    </div>
  )
}

const Member = ({ memberInfo }: { memberInfo: MembersInfo }) => {
  const { member, workTime, isComplete } = memberInfo
  const { avatar, firstName, lastName } = member
  return (
    <div className='flex items-center py-1.5 text-xs md:text-sm w-full'>
      <div className='flex justify-center items-center mr-3'>
        <Avatar size='sm' src={getImageUrl(avatar)} />
      </div>

      <Column
        className='w-[160px] min-w-[160px] mr-2'
        text={`${lastName} ${firstName}`}
      />

      <div className='w-[40px] flex justify-end mr-3'>
        {formatTime(workTime)}
      </div>

      <div className='w-[20px] flex justify-end'>
        <Checkbox checked={isComplete} checkboxClassName='cursor-default' />
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
