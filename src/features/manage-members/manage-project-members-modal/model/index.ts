import { createEvent, createStore, restore, sample } from 'effector'
import { debounce, pending } from 'patronum'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import {
  currentProjectModel,
  projectManagerModel
} from '@/entities/current-project'
import { createModal } from '@/shared/lib'
import { MemberDto, Role } from '@/shared/api'
import { MembersListAction } from '../lib'

export const manageProjectMembersModal = createModal()
export const memberDeletionConfirmeModal = createModal()
export const removeMember = createEvent<MemberDto>()
export const confirmMemberDeletion = createEvent()
const resetModel = createEvent()

export const $isLoading = pending({
  effects: [projectManagerModel.addMemberFx, projectManagerModel.removeMemberFx]
})
export const $removedMember = createStore<MemberDto | null>(null)
  .on(removeMember, (_, member) => member)
  .reset([resetModel])

sample({
  clock: manageProjectMembersModal.closeModal,
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
    currentWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject
  },
  filter: ({ removedMember, currentWorkspace, currentProject }) =>
    !!removedMember && !!currentWorkspace && !!currentProject,
  fn: ({ removedMember, currentWorkspace, currentProject }) => ({
    params: {
      workspaceId: currentWorkspace!.id,
      projectId: currentProject!.id
    },
    userId: removedMember!.id
  }),
  target: projectManagerModel.removeMember
})

export const setSearchedName = createEvent<string>()
export const debouncedSearchedName = debounce({
  source: setSearchedName,
  timeout: 300
})
export const $searchedName = restore<string>(setSearchedName, '').reset(
  resetModel
)

export const projectChangeParticipation = createEvent<MembersListAction>()
sample({
  clock: projectChangeParticipation,
  filter: ({ action }) => action === 'exclude',
  fn: ({ member }) => member,
  target: removeMember
})
sample({
  clock: projectChangeParticipation,
  filter: ({ action }) => action === 'assign',
  fn: ({ member }) => member,
  target: removeMember
})

const $projectMembers = currentProjectModel.$members
export const $filteredMembers = createStore<MemberDto[] | null>([])
sample({
  source: $projectMembers,
  target: $filteredMembers
})
sample({
  clock: $searchedName,
  source: $projectMembers,
  filter: (members) => !!members,
  fn: (members, searchedName) => {
    if (searchedName)
      return members!.filter((member) =>
        member.lastName
          .toLowerCase()
          .includes(searchedName.toLowerCase().trim())
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
  source: {
    currentWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject
  },
  filter: ({ currentWorkspace, currentProject }) =>
    !!currentWorkspace && !!currentProject,
  fn: ({ currentWorkspace, currentProject }, { memberId, role }) => ({
    memberId,
    role,
    workspaceId: currentWorkspace!.id,
    projectId: currentProject!.id
  }),
  target: projectManagerModel.changeMemberRoleFx
})

sample({
  clock: projectManagerModel.changeMemberRoleFx.doneData,
  target: currentProjectModel.$currentProject
})
