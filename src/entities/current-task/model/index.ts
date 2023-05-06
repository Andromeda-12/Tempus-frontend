import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample
} from 'effector'
import { TaskRequestParams } from '@/shared/lib'
import { ApiError, TaskDto, TasksService } from '@/shared/api'

export const setCurrentTask = createEvent<TaskDto | null>()
export const resetCurrentTask = createEvent()
export const getCurrentTask = createEvent<TaskRequestParams>()
export const completeTask = createEvent()
export const runTask = createEvent()
export const pauseTask = createEvent()

export const getCurrentTaskFx = createEffect<
  TaskRequestParams,
  TaskDto,
  ApiError
>(
  async ({ taskId, workspaceId, projectId }) =>
    await TasksService.taskControllerGetById(taskId, projectId, workspaceId)
)
export const getMemberProgress = createEffect<
  ProgressDto,
  ProgressDto,
  ApiError
>(async () => await TasksService.taskControllerGetMemberProgress())
export const completeTaskFx = createEffect<TaskDto, TaskDto, ApiError>()
export const runTaskFx = createEffect<TaskDto, TaskDto, ApiError>()
export const pauseTaskFx = createEffect<TaskDto, TaskDto, ApiError>()

export const $currentTask = restore<TaskDto | null>(setCurrentTask, null).reset(
  resetCurrentTask
)
export const $isRunnign = createStore(false)

sample({
  clock: getCurrentTask,
  target: getCurrentTaskFx
})
sample({
  clock: runTask,
  filter: Boolean,
  source: $currentTask,
  target: runTaskFx
})
sample({
  clock: pauseTask,
  filter: Boolean,
  source: $currentTask,
  target: pauseTaskFx
})
sample({
  clock: completeTask,
  filter: Boolean,
  source: $currentTask,
  target: completeTaskFx
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
