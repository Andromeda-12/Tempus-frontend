import clsx from 'clsx'
import { UserDTO } from '@/shared/api'
import { Tooltip } from '../Tooltip'
import { Avatar } from '../Avatar'

interface AvatarGroupProps {
  className: string
  users: UserDTO[]
}

export const AvatarGroup = ({ className, users }: AvatarGroupProps) => {
  return (
    <div className={clsx('flex -space-x-3', className)}>
      {users.map((user) => (
        <Tooltip key={user.id} text={`${user.firstName} ${user.lastName}`}>
          <Avatar className='ring-[2px] ring-secondary' />
          {/* src={user.avatar}  */}
        </Tooltip>
      ))}
    </div>
  )
}
