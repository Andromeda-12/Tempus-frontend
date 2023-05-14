import { sample } from 'effector'
import { pending } from 'patronum'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import { currentTaskModel, taskManagerModel } from '@/entities/current-task'
import { createModal } from '@/shared/lib'
import { manageMembersModel } from '../../manage-members-modal'

export const manageTaskMembersModal = createModal()

sample({
  clock: manageTaskMembersModal.closeModal,
  target: manageMembersModel.resetStores
})

export const $isLoading = pending({
  effects: [taskManagerModel.assignMemberFx, taskManagerModel.removeMemberFx]
})

sample({
  clock: [
    taskManagerModel.assignMemberFx.doneData,
    taskManagerModel.removeMemberFx.doneData
  ],
  target: currentTaskModel.setCurrentTask
})

sample({
  clock: manageMembersModel.changeParticipation,
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
  clock: manageMembersModel.changeParticipation,
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
