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
    params: { workspaceId, projectId },
    query: { offset, limit, title, filter }
  }) => await TasksService.taskControllerGetAll()
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
  async ({ params: { workspaceId, projectId }, createTaskDto }) =>
    await TasksService.taskControllerCreate(createTaskDto)
)
export const updateTaskFx = createEffect<
  {
    params: TaskRequestParams
    updateTaskDto: UpdateTaskDto
  },
  TaskDto,
  ApiError
>(
  async ({ params: { projectId, workspaceId, taskId }, updateTaskDto }) =>
    await TasksService.taskControllerUpdate(taskId, updateTaskDto)
)
export const removeTaskFx = createEffect<
  ProjectRequestParams,
  TaskDto,
  ApiError
>(
  async ({ projectId, workspaceId }) =>
    await TasksService.taskControllerRemove(projectId)
)

export const $projects = createStore<TaskDto[]>([])
  .on(getTasksFx.doneData, (_, tasks) => [..._, ...tasks])
  .on(createTaskFx.doneData, (_, tasks) => [..._, tasks])
  .on(removeTaskFx.doneData, (_, tasks) => [
    ..._.filter((t) => t.id !== tasks.id)
  ])
  .reset(resetTasks)

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
