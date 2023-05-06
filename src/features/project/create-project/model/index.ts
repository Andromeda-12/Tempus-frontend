import { createEvent, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { projectModel } from '@/entities/project'
import { createModal } from '@/shared/lib'
import { CreateProjectDto } from '@/shared/api'

export const createProject = createEvent<CreateProjectDto>()

export const createProjectModal = createModal()

sample({
  clock: createProject,
  source: {
    currentWorkspace: currentWorkspaceModel.$currentWorkspace
  },
  filter: ({ currentWorkspace }) => !!currentWorkspace,
  fn: ({ currentWorkspace }, createProjectDto) => ({
    workspaceId: currentWorkspace!.id,
    createProjectDto
  }),
  target: projectModel.createProject
})

sample({
  clock: projectModel.createProjectFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Create project error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})
