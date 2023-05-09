import { createModal } from '@/shared/lib'
import { createEvent, sample } from 'effector'
import { MembersListAction } from '../lib'
import { condition } from 'patronum'
import { currentTaskModel, taskManagerModel } from '@/entities/current-task'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'

export const changeMemberParticipation = createEvent<MembersListAction>()

export const taskAssignMembersModal = createModal()

sample({
  clock: changeMemberParticipation,
  source: {
    currentWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject,
    currentTask: currentTaskModel.$currentTask
  },
  filter: ({ currentWorkspace, currentProject, currentTask }, { action }) =>
    !!currentWorkspace &&
    !!currentProject &&
    !!currentTask &&
    action === 'assign',
  fn: ({ currentWorkspace, currentProject, currentTask }, { member }) => ({
    params: {
      workspaceId: currentWorkspace!.id,
      projectId: currentProject!.id,
      taskId: currentTask!.id
    },
    userId: member.id
  }),
  target: taskManagerModel.assignMember
})
sample({
  clock: changeMemberParticipation,
  source: {
    currentWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject,
    currentTask: currentTaskModel.$currentTask
  },
  filter: ({ currentWorkspace, currentProject, currentTask }, { action }) =>
    !!currentWorkspace &&
    !!currentProject &&
    !!currentTask &&
    action === 'exclude',
  fn: ({ currentWorkspace, currentProject, currentTask }, { member }) => ({
    params: {
      workspaceId: currentWorkspace!.id,
      projectId: currentProject!.id,
      taskId: currentTask!.id
    },
    userId: member.id
  }),
  target: taskManagerModel.removeMember
})
