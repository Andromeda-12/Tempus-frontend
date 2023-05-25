import { createEvent, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { taskModel } from '@/entities/task'
import { currentTaskModel, taskManagerModel } from '@/entities/current-task'
import { currentProjectModel } from '@/entities/current-project'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { createModal } from '@/shared/lib'

export const taskCompleteConfirme = createEvent()

export const confirmModal = createModal()

export const $isCanComplete = currentTaskModel.$currentTask.map((task) =>
  task?.members.every((member) => member.isComplete)
)

sample({
  clock: taskCompleteConfirme,
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
  target: taskManagerModel.completeTaskFx
})

sample({
  clock: taskManagerModel.completeTaskFx.doneData,
  target: [taskModel.updateLoadedTask, currentTaskModel.setCurrentTask]
})

sample({
  clock: taskManagerModel.completeTaskFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Complete task error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})

sample({
  clock: taskManagerModel.completeTaskFx.finally,
  target: confirmModal.closeModal
})
