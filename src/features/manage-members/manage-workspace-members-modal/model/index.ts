import { createEvent, createStore, restore, sample } from 'effector'
import { createGate } from 'effector-react'
import { debounce, pending } from 'patronum'
import {
  currentWorkspaceModel,
  workspaceManagerModel
} from '@/entities/current-workspace'
import { workspaceModel } from '@/entities/workspace'
import { createModal } from '@/shared/lib'
import { MemberDto, Role } from '@/shared/api'
import { MembersListAction } from '../lib'

export const manageWorkspaceMembersModal = createModal()
export const memberDeletionConfirmeModal = createModal()
export const removeMember = createEvent<MemberDto>()
export const confirmMemberDeletion = createEvent()
const resetModel = createEvent()

export const $isLoading = pending({
  effects: [workspaceModel.removeWorkspaceFx]
})
export const $removedMember = createStore<MemberDto | null>(null)
  .on(removeMember, (_, member) => member)
  .reset([resetModel])

sample({
  clock: manageWorkspaceMembersModal.closeModal,
  target: resetModel
})

sample({
  clock: removeMember,
  target: memberDeletionConfirmeModal.openModal
})

sample({
  clock: confirmMemberDeletion,
  source: {
    removedMember: $removedMember,
    currentWorkspace: currentWorkspaceModel.$currentWorkspace
  },
  filter: ({ removedMember, currentWorkspace }) =>
    !!removedMember && !!currentWorkspace,
  fn: ({ removedMember, currentWorkspace }) => ({
    params: {
      workspaceId: currentWorkspace!.id
    },
    userId: removedMember!.id
  }),
  target: workspaceManagerModel.removeMember
})

export const setSearchedName = createEvent<string>()
export const debouncedSearchedName = debounce({
  source: setSearchedName,
  timeout: 300
})
export const $searchedName = restore<string>(setSearchedName, '').reset(
  resetModel
)

export const workspaceChangeParticipation = createEvent<MembersListAction>()
sample({
  clock: workspaceChangeParticipation,
  filter: ({ action }) => action === 'exclude',
  fn: ({ member }) => member,
  target: removeMember
})

const $allMembers = currentWorkspaceModel.$members
export const $filteredMembers = createStore<MemberDto[] | null>([])
sample({
  source: $allMembers,
  target: $filteredMembers
})
sample({
  clock: $searchedName,
  source: $allMembers,
  filter: (members) => !!members,
  fn: (members, searchedName) => {
    if (searchedName)
      return members!.filter((member) =>
        member.firstName.toLowerCase().includes(searchedName.toLowerCase().trim())
      )
    return members
  },
  target: $filteredMembers
})

export const changeMemberRole = createEvent<{
  memberId: number
  role: Role
}>()

sample({
  clock: changeMemberRole,
  source: currentWorkspaceModel.$currentWorkspace,
  filter: (currentWorkspace) => !!currentWorkspace,
  fn: (currentWorkspace, { memberId, role }) => ({
    memberId,
    role,
    workspaceId: currentWorkspace!.id
  }),
  target: workspaceManagerModel.changeMemberRoleFx
})

sample({
  clock: workspaceManagerModel.changeMemberRoleFx.doneData,
  target: currentWorkspaceModel.$currentWorkspace
})
