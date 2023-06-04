import { Avatar, Card, ContentContainer, Icon, Tooltip } from '@/shared/ui'
import { TaskDto } from '@/shared/api'
import { AvatarGroup } from '@/features/users/avatar-group'
import { ViewerAvatar } from '@/entities/viewer'
import clsx from 'clsx'
import { CompleteMark } from './CompleteMark'

interface TaskProps {
  task: TaskDto
}

function truncateString(str: string, length: number) {
  if (str.length > length) return str.substring(0, length - 3) + '...'

  return str
}

export const Task = ({ task }: TaskProps) => {
  const { title, description, members: membersInfo, isComplete } = task
  const members = membersInfo.map((memberInfo) => memberInfo.member)

  return (
    <Card withHover className='overflow-visible'>
      <ContentContainer py={false} className='py-5 flex flex-col space-y-2'>
        <div className='flex items-center space-x-3'>
          <div className='font-medium'>{title}</div>
          {isComplete && <CompleteMark />}
        </div>

        <div
          className={clsx(
            'text-sm opacity-70 h-[2.7em] text-ellipsis whitespace-normal overflow-hidden',
            !description && 'text-gray-500 dark:text-gray-400'
          )}
        >
          {description ? truncateString(description, 90) : 'no description'}
        </div>

        {members.length ? (
          <AvatarGroup members={members} />
        ) : (
          <div className='text-sm opacity-70 h-[2.7em] text-gray-500 dark:text-gray-400'>
            no assigned
          </div>
        )}
      </ContentContainer>
    </Card>
  )
}
