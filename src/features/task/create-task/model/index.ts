import { createEvent, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import { taskModel } from '@/entities/task'
import { createModal } from '@/shared/lib'
import { CreateTaskDto } from '@/shared/api'

export const createTask = createEvent<CreateTaskDto>()

export const createTaskModal = createModal()

sample({
  clock: createTask,
  source: {
    currentWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject
  },
  filter: ({ currentWorkspace, currentProject }) =>
    !!currentWorkspace && !!currentProject,
  fn: ({ currentWorkspace, currentProject }, createTaskDto) => ({
    params: {
      workspaceId: currentWorkspace!.id,
      projectId: currentProject!.id
    },
    createTaskDto
  }),
  target: taskModel.createTask
})

sample({
  clock: taskModel.createTaskFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Create task error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})
