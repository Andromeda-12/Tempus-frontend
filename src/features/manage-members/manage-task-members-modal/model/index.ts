import { createEvent, sample } from 'effector'
import { pending } from 'patronum'
import { viewerModel } from '@/entities/viewer'
import { taskModel } from '@/entities/task'
import { currentTaskModel, taskManagerModel } from '@/entities/current-task'
import { currentProjectModel } from '@/entities/current-project'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { createModal } from '@/shared/lib'
import { manageMembersModel } from '../../manage-members-modal'
import { MembersListAction } from '../../manage-members-modal/lib'

export const manageTaskMembersModal = createModal()
export const taskChangeParticipation = createEvent<MembersListAction>()

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
  clock: taskChangeParticipation,
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
  clock: taskChangeParticipation,
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

sample({
  clock: [
    taskManagerModel.assignMemberFx.doneData,
    taskManagerModel.removeMemberFx.doneData
  ],
  target: taskModel.updateLoadedTask
})

sample({
  clock: taskManagerModel.removeMemberFx.doneData,
  source: viewerModel.$viewer,
  filter: (viewer, task) => {
    if (!viewer) return false
    const index = task.members.findIndex(
      (member) => member.member.id === viewer.id
    )
    return index === -1
  },
  target: currentTaskModel.resetMemberProgress
})
