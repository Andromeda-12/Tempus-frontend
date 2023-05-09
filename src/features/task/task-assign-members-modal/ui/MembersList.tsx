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
    <div className='border rounded-lg flex flex-col flex-1  h-[200px] pr-2 py-2'>
      <div className='scrollbar scrollbar-dense overflow-y-auto pr-1'>
        {allMembers.map((member) => (
          <Member
            member={member}
            isAssigned={checkAssigned(allMembers, assignedMembers)}
            onChangeMemberParticipation={onChangeMemberParticipation}
          />
        ))}
      </div>
    </div>
  )
}
