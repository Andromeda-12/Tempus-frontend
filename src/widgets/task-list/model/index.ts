import { createEvent, createStore, restore, sample } from 'effector'
import { taskSearchModel } from '@/features/filter/task-search'
import { taskFilterModel } from '@/features/filter/task-filter'
import { taskModel } from '@/entities/task'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import { GetRequestQuery } from '@/shared/lib'
import { PROJECTS_REQUEST_LIMIT } from '@/shared/config'

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
    filter: taskFilterModel.taskFilter.currentValue,
    searchTitle: taskSearchModel.$searchTaskTitle,
    isLoadign: $isLoading
  },
  filter: ({ isLoadign }) => !isLoadign,
  fn: ({ offset, limit, searchTitle, filter }, { projectId, workspaceId }) => ({
    params: {
      projectId,
      workspaceId
    },
    query: {
      offset,
      limit,
      title: searchTitle || undefined,
      filter
    } as GetRequestQuery
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
  clock: taskFilterModel.taskFilter.currentValue,
  target: [loadMoreTasks, resetOffset, resetTasks]
})
sample({
  clock: taskSearchModel.debouncedSearchTask,
  target: [loadMoreTasks, resetOffset, resetTasks]
})
