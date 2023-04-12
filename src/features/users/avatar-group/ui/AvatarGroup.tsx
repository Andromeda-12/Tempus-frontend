import clsx from 'clsx'
import { Avatar, Tooltip } from '@/shared/ui'
import { getImageUrl } from '@/shared/lib'
import { MemberDto } from '@/shared/api'

interface AvatarGroupProps {
  className?: string
  members: MemberDto[]
}

export const AvatarGroup = ({ className, members }: AvatarGroupProps) => (
  <div className={clsx('flex -space-x-3', className)}>
    {members.map((member) => (
      <Tooltip
        key={member.id}
        text={`${member.firstName} ${member.lastName}`}
        className='relative -right-3'
      >
        <Avatar src={getImageUrl(member.avatar)} />
      </Tooltip>
    ))}
  </div>
)
