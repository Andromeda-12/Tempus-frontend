import { createEffect, createEvent, restore, sample } from 'effector'
import { condition } from 'patronum'
import { TaskRequestParams } from '@/shared/lib'
import {
  ApiError,
  MemberProgressDto,
  TaskDto,
  TasksService
} from '@/shared/api'

export const setCurrentTask = createEvent<TaskDto | null>()
export const setMemberProgress = createEvent<MemberProgressDto | null>()
export const resetCurrentTask = createEvent()
export const resetMemberProgress = createEvent()
export const getCurrentTask = createEvent<TaskRequestParams>()
export const completeTask = createEvent()
const runTask = createEvent()
const pauseTask = createEvent()
export const toggleTaskState = createEvent()
const toggleTaskStateWithValue = createEvent<{ isRunning: boolean }>()

export const getCurrentTaskFx = createEffect<
  TaskRequestParams,
  TaskDto,
  ApiError
>(
  async ({ taskId, workspaceId, projectId }) =>
    await TasksService.taskControllerGetById(taskId, projectId, workspaceId)
)
export const getMemberProgress = createEffect<
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
export const completeTaskFx = createEffect<TaskDto, TaskDto, ApiError>()
export const runTaskFx = createEffect<TaskDto, TaskDto, ApiError>()
export const pauseTaskFx = createEffect<TaskDto, TaskDto, ApiError>()

export const $currentTask = restore<TaskDto | null>(setCurrentTask, null).reset(
  resetCurrentTask
)
export const $members = $currentTask.map((t) => t?.members.map(m => m.member))
export const $memberProgress = restore<MemberProgressDto | null>(
  setMemberProgress,
  null
).reset(resetMemberProgress)
export const $taskCreator = $currentTask.map((task) => task?.creator)
export const $isRunnign = $memberProgress.map((progress) => progress?.isRunning)

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
  clock: toggleTaskState,
  source: $memberProgress,
  filter: Boolean,
  fn: ({ isRunning }) => ({ isRunning }),
  target: toggleTaskStateWithValue
})
condition({
  source: toggleTaskStateWithValue,
  if: ({ isRunning }) => isRunning,
  then: pauseTask,
  else: runTask
})
