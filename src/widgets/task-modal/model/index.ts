import { createEvent, sample } from 'effector'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import { currentTaskModel } from '@/entities/current-task'
import { createModal } from '@/shared/lib'

export const openModal = createEvent<{
  taskId: number
}>()

export const taskModal = createModal()

export const $isLoading = currentTaskModel.getCurrentTaskFx.pending

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
  target: [currentTaskModel.getCurrentTask, currentTaskModel.getMemberProgress]
})
