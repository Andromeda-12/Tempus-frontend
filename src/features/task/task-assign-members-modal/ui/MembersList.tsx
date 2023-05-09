import { MemberDto } from '@/shared/api'
import { Member } from './Member'
import { MembersListAction, checkAssigned } from '../lib'

interface MembersListProps {
  allMembers: MemberDto[]
  assignedMembers: MemberDto[]
  onChangeMemberParticipation: (action: MembersListAction) => void
}

export const MembersList = ({
  allMembers,
  assignedMembers,
  onChangeMemberParticipation
}: MembersListProps) => {
  return (
    <div className='border rounded-lg flex flex-col p-3 pr-1 h-full w-full'>
      <div className='scrollbar scrollbar-dense overflow-y-auto pr-2'>
        {allMembers.map((member) => (
          <Member
            key={member.id}
            member={member}
            isAssigned={checkAssigned(allMembers, assignedMembers)}
            onChangeMemberParticipation={onChangeMemberParticipation}
          />
        ))}
      </div>
    </div>
  )
}
