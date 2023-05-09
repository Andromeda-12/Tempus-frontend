import { MemberDto } from '@/shared/api'

export type MembersListAction = {
  action: 'assign' | 'exclude'
  member: MemberDto
}

export const checkAssigned = (
  allMembers: MemberDto[],
  assignedMembers: MemberDto[]
) =>
  assignedMembers.some((assignedMember) =>
    allMembers.some((member) => member.id === assignedMember.id)
  )
