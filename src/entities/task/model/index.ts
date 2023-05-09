import { createEffect, createEvent, createStore, sample } from 'effector'
import {
  GetRequestQuery,
  ProjectRequestParams,
  TaskRequestParams
} from '@/shared/lib'
import {
  ApiError,
  TasksService,
  TaskDto,
  CreateTaskDto,
  UpdateTaskDto
} from '@/shared/api'

export const createTask = createEvent<{
  params: {
    workspaceId: number
    projectId: number
  }
  createTaskDto: CreateTaskDto
}>()
export const updateTask = createEvent<{
  params: TaskRequestParams
  updateTaskDto: UpdateTaskDto
}>()
export const removeTask = createEvent<TaskRequestParams>()
export const resetTasks = createEvent()

export const getTasksFx = createEffect<
  {
    params: ProjectRequestParams
    query: GetRequestQuery
  },
  TaskDto[],
  ApiError
>(
  async ({
    params: { projectId, workspaceId },
    query: { offset, limit, title, filter }
  }) =>
    await TasksService.taskControllerGetAll(
      projectId,
      workspaceId,
      title,
      offset,
      limit,
      filter
    )
)
export const createTaskFx = createEffect<
  {
    params: {
      workspaceId: number
      projectId: number
    }
    createTaskDto: CreateTaskDto
  },
  TaskDto,
  ApiError
>(
  async ({ params: { projectId, workspaceId }, createTaskDto }) =>
    await TasksService.taskControllerCreate(
      projectId,
      workspaceId,
      createTaskDto
    )
)
export const updateTaskFx = createEffect<
  {
    params: TaskRequestParams
    updateTaskDto: UpdateTaskDto
  },
  TaskDto,
  ApiError
>(
  async ({ params: { taskId, projectId, workspaceId }, updateTaskDto }) =>
    await TasksService.taskControllerUpdate(
      taskId,
      projectId,
      workspaceId,
      updateTaskDto
    )
)
export const removeTaskFx = createEffect<TaskRequestParams, TaskDto, ApiError>(
  async ({ taskId, projectId, workspaceId }) =>
    await TasksService.taskControllerRemove(taskId, projectId, workspaceId)
)

export const $tasks = createStore<TaskDto[]>([])
  .on(getTasksFx.doneData, (_, tasks) => [..._, ...tasks])
  .on(createTaskFx.doneData, (_, tasks) => [..._, tasks])
  .on(removeTaskFx.doneData, (_, tasks) => [
    ..._.filter((t) => t.id !== tasks.id)
  ])
  .on(updateTaskFx.doneData, (tasks, updatedTask) => {
    const updatedTaskIndex = tasks.findIndex(
      (task) => task.id === updatedTask.id
    )
    if (updatedTaskIndex === -1) return tasks
    tasks[updatedTaskIndex] = updatedTask
    return [...tasks]
  })
  .reset(resetTasks)
export const $reversedTasks = $tasks.map((tasks) =>
  structuredClone(tasks).reverse()
)

sample({
  clock: createTask,
  target: createTaskFx
})
sample({
  clock: updateTask,
  target: updateTaskFx
})
sample({
  clock: removeTask,
  target: removeTaskFx
})
