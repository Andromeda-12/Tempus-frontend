import { MemberDto } from '@/shared/api'
import { Member } from './Member'
import { MembersListAction } from '../lib'

interface MembersListProps {
  allMembers: MemberDto[]
  onChangeMemberParticipation: (action: MembersListAction) => void
}

export const MembersList = ({
  allMembers,
  onChangeMemberParticipation
}: MembersListProps) => {
  return (
    <div className='border-2 dark:border-secondary/50 rounded-lg flex flex-col p-3 pr-1 h-full w-full'>
      <div className='scrollbar scrollbar-dense overflow-y-auto overflow-x-auto h-full overflow-hidden pr-2'>
        {allMembers.length === 0 && (
          <div className='text-center opacity-50'>member not found</div>
        )}
        {allMembers.map((member) => (
          <Member
            key={member.id}
            member={member}
            onChangeMemberParticipation={onChangeMemberParticipation}
          />
        ))}
      </div>
    </div>
  )
}
