import { createEffect, createEvent, restore, sample } from 'effector'
import { TaskRequestParams } from '@/shared/lib'
import { ApiError, TaskDto, TasksService } from '@/shared/api'

export const setCurrentTask = createEvent<TaskDto | null>()
export const resetCurrentTask = createEvent()

export const getCurrentTaskFx = createEffect<
  TaskRequestParams,
  TaskDto,
  ApiError
>(
  async ({ workspaceId, projectId, taskId }) =>
    await TasksService.taskControllerFindOne(taskId)
)
export const $currentTask = restore<TaskDto | null>(setCurrentTask, null).reset(
  resetCurrentTask
)

sample({
  clock: getCurrentTaskFx.doneData,
  filter: Boolean,
  target: setCurrentTask
})
