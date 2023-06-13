import { Store, Event } from 'effector'
import { MemberDto } from '@/shared/api'

export type MembersListAction = {
  action: 'assign' | 'exclude'
  member: MemberDto
}

export type ModalType = {
  openModal: Event<void>
  closeModal: Event<void>
  $isOpen: Store<boolean>
}

export const checkAssigned = (
  allMembers: MemberDto[],
  assignedMembers: MemberDto[]
) =>
  assignedMembers.some((assignedMember) =>
    allMembers.some((member) => member.id === assignedMember.id)
  )
