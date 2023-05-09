import { createEffect, createEvent, restore, sample } from 'effector'
import { TaskRequestParams } from '@/shared/lib'
import {
  ApiError,
  MemberProgressDto,
  TaskDto,
  TasksService
} from '@/shared/api'

export const setCurrentTask = createEvent<TaskDto | null>()
export const setMemberProgress = createEvent<MemberProgressDto | null>()
export const setIsRunning = createEvent<boolean | null>()
export const resetCurrentTask = createEvent()
export const resetMemberProgress = createEvent()
export const getCurrentTask = createEvent<TaskRequestParams>()

export const getCurrentTaskFx = createEffect<
  TaskRequestParams,
  TaskDto,
  ApiError
>(
  async ({ taskId, workspaceId, projectId }) =>
    await TasksService.taskControllerGetById(taskId, projectId, workspaceId)
)
export const getMemberProgressFx = createEffect<
  TaskRequestParams,
  MemberProgressDto,
  ApiError
>(
  async ({ taskId, projectId, workspaceId }) =>
    await TasksService.taskControllerGetMemberProgress(
      taskId,
      projectId,
      workspaceId
    )
)
export const completeTaskFx = createEffect<
  TaskRequestParams,
  TaskDto,
  ApiError
>(
  async ({ taskId, projectId, workspaceId }) =>
    await TasksService.taskControllerCompleteTask(
      taskId,
      projectId,
      workspaceId
    )
)
export const runTaskFx = createEffect<TaskRequestParams, TaskDto, ApiError>(
  async ({ taskId, projectId, workspaceId }) =>
    await TasksService.taskControllerStarTimeLine(
      taskId,
      projectId,
      workspaceId
    )
)
export const pauseTaskFx = createEffect<TaskRequestParams, TaskDto, ApiError>(
  async ({ taskId, projectId, workspaceId }) =>
    await TasksService.taskControllerEndTimeLine(taskId, projectId, workspaceId)
)

export const $currentTask = restore<TaskDto | null>(setCurrentTask, null).reset(
  resetCurrentTask
)
export const $members = $currentTask.map((t) => t?.members.map((m) => m.member))
export const $memberProgress = restore<MemberProgressDto | null>(
  setMemberProgress,
  null
).reset(resetMemberProgress)
export const $taskCreator = $currentTask.map((task) => task?.creator)
export const $isRunning = restore<boolean | null>(setIsRunning, null).reset(
  resetCurrentTask
)

sample({
  source: {
    progress: $memberProgress,
    task: $currentTask
  },
  fn: ({ progress, task }) => {
    if (!task) return null
    if (!progress) return false
    return progress.isRunning
  },
  target: setIsRunning
})

sample({
  clock: getCurrentTask,
  target: getCurrentTaskFx
})

sample({
  clock: [
    getCurrentTaskFx.doneData,
    runTaskFx.doneData,
    pauseTaskFx.doneData,
    completeTaskFx.doneData
  ],
  filter: Boolean,
  target: setCurrentTask
})
sample({
  clock: getMemberProgressFx.doneData,
  target: setMemberProgress
})
