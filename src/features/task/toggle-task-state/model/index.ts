import { createEvent, sample } from 'effector'
import { pending } from 'patronum'
import { currentTaskModel } from '@/entities/current-task'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import { notificationModel } from '@/features/notification'

export const toggleTaskState = createEvent()
const toggleTaskStateWithValue = createEvent<{ isRunning: boolean }>()

export const $isLoading = pending({
  effects: [
    currentTaskModel.getCurrentTaskFx,
    currentTaskModel.getMemberProgressFx
  ]
})

sample({
  clock: toggleTaskState,
  source: currentTaskModel.$memberProgress,
  filter: Boolean,
  fn: ({ isRunning }) => ({ isRunning }),
  target: toggleTaskStateWithValue
})

sample({
  clock: toggleTaskStateWithValue,
  source: {
    currenWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject,
    currentTask: currentTaskModel.$currentTask
  },
  filter: (_, { isRunning }) => isRunning,
  fn: ({ currentTask, currentProject, currenWorkspace }) => ({
    taskId: currentTask!.id,
    projectId: currentProject!.id,
    workspaceId: currenWorkspace!.id
  }),
  target: currentTaskModel.pauseTaskFx
})

sample({
  clock: toggleTaskStateWithValue,
  source: {
    currenWorkspace: currentWorkspaceModel.$currentWorkspace,
    currentProject: currentProjectModel.$currentProject,
    currentTask: currentTaskModel.$currentTask
  },
  filter: (_, { isRunning }) => !isRunning,
  fn: ({ currentTask, currentProject, currenWorkspace }) => ({
    taskId: currentTask!.id,
    projectId: currentProject!.id,
    workspaceId: currenWorkspace!.id
  }),
  target: currentTaskModel.runTaskFx
})

sample({
  clock: currentTaskModel.pauseTaskFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'warning',
      title: 'Pause task error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})

