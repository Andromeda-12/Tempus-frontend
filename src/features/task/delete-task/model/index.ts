import { createEvent, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import { currentTaskModel } from '@/entities/current-task'
import { projectModel } from '@/entities/project'
import { createModal } from '@/shared/lib'
import { taskModel } from '@/entities/task'

export const taskDeletionConfirme = createEvent()

export const confirmModal = createModal()

sample({
  clock: confirmModal.closeModal,
  target: currentTaskModel.resetCurrentTask
})

sample({
  clock: taskDeletionConfirme,
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
  target: taskModel.removeTask
})

sample({
  clock: taskModel.removeTaskFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Delete task error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})

sample({
  clock: projectModel.removeProjectFx.finally,
  target: confirmModal.closeModal
})
