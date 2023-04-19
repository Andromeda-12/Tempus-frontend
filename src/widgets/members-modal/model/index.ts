import { MemberDto } from '@/shared/api'
import { createModal } from '@/shared/lib'
import { createEvent, createStore, sample } from 'effector'

// export const memberExclude = memberModa
export const setcurrentWorkspaceMembers = createEvent<MemberDto[]>()
const resetCurrentWorkspaceMembers = createEvent()

export const membersModal = createModal()

export const $currentWorkspaceMembers = createStore<MemberDto[]>([]).reset(
  resetCurrentWorkspaceMembers
)

sample({
  clock: setcurrentWorkspaceMembers,
  target: $currentWorkspaceMembers
})

sample({
  clock: membersModal.closeModal,
  target: resetCurrentWorkspaceMembers
})
