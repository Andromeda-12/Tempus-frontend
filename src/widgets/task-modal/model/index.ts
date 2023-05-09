import { createEvent, createStore, sample } from 'effector'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import { currentTaskModel } from '@/entities/current-task'
import { createModal } from '@/shared/lib'
import { viewerModel } from '@/entities/viewer'

export const openModal = createEvent<{
  taskId: number
}>()
const getMemberProgress = createEvent()

export const taskModal = createModal()

export const $isLoading = currentTaskModel.getCurrentTaskFx.pending
export const $isAssignedOnTask = createStore(false)

sample({
  clock: currentTaskModel.$members,
  source: viewerModel.$viewer,
  fn: (viewer, taskMembers) => {
    if (!taskMembers || !viewer) return false
    return taskMembers.some(member => member.id === viewer.id)
  },
  target: $isAssignedOnTask
})


sample({
  clock: openModal,
  target: taskModal.openModal
})

sample({
  clock: openModal,
  source: {
    currentWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject
  },
  filter: ({ currentWorkspace, currentProject }) =>
    !!currentWorkspace && !!currentProject,
  fn: ({ currentWorkspace, currentProject }, { taskId }) => ({
    workspaceId: currentWorkspace!.id,
    projectId: currentProject!.id,
    taskId
  }),
  target: currentTaskModel.getCurrentTask
})

sample({
  clock: $isAssignedOnTask,
  filter: (isAssigned) => isAssigned,
  target: getMemberProgress 
})

sample({
  clock: getMemberProgress,
  source: {
    currentWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject,
    currentTask: currentTaskModel.$currentTask
  },
  filter: ({ currentWorkspace, currentProject, currentTask }) =>
    !!currentWorkspace && !!currentProject && !!currentTask,
  fn: ({ currentWorkspace, currentProject, currentTask }) => ({
    workspaceId: currentWorkspace!.id,
    projectId: currentProject!.id,
    taskId: currentTask!.id
  }),
  target: currentTaskModel.getMemberProgress
})
