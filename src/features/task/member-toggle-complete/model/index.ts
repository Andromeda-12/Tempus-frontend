import { createEvent, sample } from 'effector'
import { viewerModel } from '@/entities/viewer'
import { currentTaskModel } from '@/entities/current-task'
import { currentProjectModel } from '@/entities/current-project'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { notificationModel } from '@/features/notification'

export const memberCompleteTask = createEvent()
export const memberUncompleteTask = createEvent()

sample({
  clock: memberCompleteTask,
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
  target: currentTaskModel.completeTaskFx
})

sample({
  clock: memberUncompleteTask,
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
  target: currentTaskModel.uncompleteTaskFx
})

sample({
  clock: [
    currentTaskModel.completeTaskFx.doneData,
    currentTaskModel.uncompleteTaskFx.doneData
  ],
  source: {
    currentTask: currentTaskModel.$currentTask,
    viewer: viewerModel.$viewer
  },
  filter: ({ currentTask, viewer }) =>
    !!currentTask || !!viewer,
  fn: ({ currentTask, viewer }, memberProgress) => {
    const changedMembers = structuredClone(currentTask!.members)
    const viewerIndex = changedMembers!.findIndex(
      (memberInfo) => memberInfo.member.id === viewer!.id
    )
    changedMembers[viewerIndex].workTime = memberProgress.trackedTime
    changedMembers[viewerIndex].isComplete = memberProgress.isComplete

    return {
      ...currentTask!,
      members: changedMembers
    }
  },
  target: currentTaskModel.setCurrentTask
})

sample({
  clock: [
    currentTaskModel.completeTaskFx.failData,
    currentTaskModel.uncompleteTaskFx.failData
  ],
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Task error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})
