import { createEvent, createStore, restore, sample } from 'effector'
import { taskSearchModel } from '@/features/filter/task-search'
import { assignTaskFilterModel } from '@/features/filter/assign-task-filter'
import { taskModel } from '@/entities/task'
import { taskManagerModel } from '@/entities/current-task'
import { currentProjectModel } from '@/entities/current-project'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { GetTasksRequestQuery } from '@/shared/lib'
import { PROJECTS_REQUEST_LIMIT } from '@/shared/config'
import { completeTaskFilterModel } from '@/features/filter/complete-task-filter'

export const loadMoreTasks = createEvent()
export const resetOffset = createEvent()
export const resetTasks = createEvent()
const loadTasks = createEvent<{ projectId: number; workspaceId: number }>()
const addOffset = createEvent<number>()
const setIsAllDataLoaded = createEvent<boolean>()

const $limit = createStore(PROJECTS_REQUEST_LIMIT)
export const $offset = createStore(0)
  .on(addOffset, (currentOffset, addedOffset) => currentOffset + addedOffset)
  .reset(resetOffset)
export const $isLoading = taskModel.getTasksFx.pending
export const $isAllDataLoaded = restore(setIsAllDataLoaded, false).reset(
  resetOffset
)

sample({
  clock: resetTasks,
  target: taskModel.resetTasks
})
sample({
  clock: loadTasks,
  source: {
    offset: $offset,
    limit: $limit,
    assignFilter: assignTaskFilterModel.taskFilter.currentValue,
    completedFilter: completeTaskFilterModel.completeTaskFilter.currentValue,
    searchTitle: taskSearchModel.$searchTaskTitle,
    isLoadign: $isLoading
  },
  filter: ({ isLoadign }) => !isLoadign,
  fn: (
    { offset, limit, searchTitle, assignFilter, completedFilter },
    { projectId, workspaceId }
  ) => ({
    params: {
      projectId,
      workspaceId
    },
    query: {
      offset,
      limit,
      title: searchTitle || undefined,
      assignFilter,
      completedFilter
    } as GetTasksRequestQuery
  }),
  target: taskModel.getTasksFx
})

sample({
  clock: loadMoreTasks,
  source: {
    currentProject: currentProjectModel.$currentProject,
    currentWorkspace: currentWorkspaceModel.$currentWorkspace
  },
  filter: ({ currentProject, currentWorkspace }) =>
    !!currentProject && !!currentWorkspace,
  fn: ({ currentProject, currentWorkspace }) => ({
    projectId: currentProject!.id,
    workspaceId: currentWorkspace!.id
  }),
  target: loadTasks
})

sample({
  clock: taskModel.getTasksFx.doneData,
  source: $limit,
  target: addOffset
})
sample({
  clock: taskModel.getTasksFx.doneData,
  source: $limit,
  filter: (limit, data) => data.length < limit,
  fn: () => true,
  target: setIsAllDataLoaded
})
sample({
  clock: taskModel.getTasksFx.failData,
  fn: () => true,
  target: setIsAllDataLoaded
})

sample({
  clock: [
    assignTaskFilterModel.taskFilter.currentValue,
    completeTaskFilterModel.completeTaskFilter.currentValue,
    taskSearchModel.debouncedSearchTask,
    taskManagerModel.completeTaskFx.doneData
  ],
  target: [loadMoreTasks, resetOffset, resetTasks]
})
