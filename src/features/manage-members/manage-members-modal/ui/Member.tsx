import { Avatar, Checkbox } from '@/shared/ui'
import { getImageUrl } from '@/shared/lib'
import { MemberDto } from '@/shared/api'
import { MembersListAction } from '../lib'
import clsx from 'clsx'

interface MemberProps {
  member: MemberDto
  isAssigned: boolean
  onChangeMemberParticipation: (action: MembersListAction) => void
}

export const Member = ({
  member,
  isAssigned,
  onChangeMemberParticipation
}: MemberProps) => {
  const { avatar, firstName, lastName, email } = member

  const handleCheckboxChange = () => {
    onChangeMemberParticipation({
      member,
      action: isAssigned ? 'exclude' : 'assign'
    })
  }

  return (
    <div
      className={clsx(
        'flex items-center py-2 px-4 text-sm space-x-5 hover:bg-secondary dark:hover:bg-secondary/10 duration-75',
        isAssigned && 'bg-secondary/5'
      )}
    >
      <div>
        <Avatar
          src={getImageUrl(avatar)}
          fallback={`${firstName[0]}${lastName[0]}`}
        />
      </div>
      <div className='flex justify-between w-full'>
        <div>{lastName}</div>
        <div>{firstName}</div>
        <div>{email}</div>
        <Checkbox checked={isAssigned} onChange={handleCheckboxChange} />
      </div>
    </div>
  )
}
