import { createEvent, sample } from 'effector'
import { pending } from 'patronum'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import { currentTaskModel, taskManagerModel } from '@/entities/current-task'
import { createModal } from '@/shared/lib'
import { taskModel } from '@/entities/task'
import { manageMembersModel } from '../../manage-members-modal'
import { MembersListAction } from '../../manage-members-modal/lib'
import { viewerModel } from '@/entities/viewer'

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
  source: taskModel.$tasks,
  fn: (tasks, updatedTask) => {
    const updatedTaskIndex = tasks.findIndex(
      (task) => task.id === updatedTask.id
    )
    if (updatedTaskIndex === -1) return tasks
    tasks[updatedTaskIndex] = updatedTask
    return [...tasks]
  },
  target: taskModel.$tasks
})

sample({
  clock: taskManagerModel.removeMemberFx.doneData,
  source: viewerModel.$viewer,
  filter: (viewer, task) => {
    if (!viewer) return false
    const index = task.members.findIndex(member => member.member.id === viewer.id)
    return index === -1
  },
  target: currentTaskModel.resetMemberProgress
})
