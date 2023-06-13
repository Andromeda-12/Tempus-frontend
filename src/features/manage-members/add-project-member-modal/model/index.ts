import { createEvent, createStore, sample } from 'effector'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import {
  currentProjectModel,
  projectManagerModel
} from '@/entities/current-project'
import { MemberDto } from '@/shared/api'
import { createModal } from '@/shared/lib'

export const assignToProject = createEvent<{ memberId: number }>()

export const $unassignedMembers = createStore<MemberDto[]>([])
export const $isLoading = projectManagerModel.addMemberFx.pending
export const manageProjectMembersModal = createModal()

sample({
  clock: assignToProject,
  source: {
    currentWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject
  },
  filter: ({ currentWorkspace, currentProject }) =>
    !!currentWorkspace && !!currentProject,
  fn: ({ currentWorkspace, currentProject }, { memberId }) => ({
    params: {
      workspaceId: currentWorkspace!.id,
      projectId: currentProject!.id
    },
    userId: memberId
  }),
  target: projectManagerModel.addMember
})

sample({
  source: {
    workspaceMembers: currentWorkspaceModel.$members,
    projectMembers: currentProjectModel.$members
  },
  filter: ({ workspaceMembers, projectMembers }) =>
    !!workspaceMembers && !!projectMembers,
  fn: ({ workspaceMembers, projectMembers }) =>
    workspaceMembers!.filter(
      (workspaceMember) =>
        !projectMembers!.some(
          (projectMember) => projectMember.id === workspaceMember.id
        )
    ),
  target: $unassignedMembers
})
