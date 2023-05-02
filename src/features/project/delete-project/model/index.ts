import { createEvent, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import { projectModel } from '@/entities/project'
import { createModal } from '@/shared/lib'
import { ProjectDto } from '@/shared/api'

export const projectDeletionConfirme = createEvent()

export const confirmModal = createModal()

sample({
  clock: confirmModal.closeModal,
  target: currentProjectModel.resetCurrentProject
})

sample({
  clock: projectDeletionConfirme,
  source: {
    currentWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject
  },
  filter: ({ currentWorkspace, currentProject }) =>
    !!currentWorkspace && !!currentProject,
  fn: ({ currentWorkspace, currentProject }) => ({
    workspaceId: currentWorkspace!.id,
    projectId: currentProject!.id
  }),
  target: projectModel.removeProject
})

sample({
  clock: projectModel.removeProjectFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Delete project error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})

sample({
  clock: projectModel.removeProjectFx.finally,
  target: confirmModal.closeModal
})
