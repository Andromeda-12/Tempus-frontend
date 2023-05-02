import { createEvent, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import { currentTaskModel } from '@/entities/current-task'
import { taskModal } from '@/entities/task'
import { createModal } from '@/shared/lib'
import { UpdateTaskDto } from '@/shared/api'

export const updateTask = createEvent<UpdateTaskDto>()

export const updateTaskModal = createModal()

sample({
  clock: updateTask,
  source: {
    currentWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject,
    currentTask: currentTaskModel.$currentTask
  },
  filter: ({ currentWorkspace, currentProject, currentTask }) =>
    !!currentWorkspace && !!currentProject && !!currentTask,
  fn: ({ currentWorkspace, currentProject, currentTask }, updateTaskDto) => ({
    params: {
      workspaceId: currentWorkspace!.id,
      projectId: currentProject!.id,
      taskId: currentTask!.id
    },
    updateTaskDto
  }),
  target: taskModal.updateTask
})

sample({
  clock: taskModal.updateTaskFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Update task error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})
