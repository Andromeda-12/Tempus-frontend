import { pending } from 'patronum'
import { projectModel } from '@/entities/project'
import { createEvent, createStore, restore, sample } from 'effector'
import { PROJECTS_REQUEST_LIMIT } from '@/shared/config'
import { GetRequestQuery } from '@/shared/lib'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { projectRoute } from '@/shared/routing'
import { taskModel } from '@/entities/task'

export const loadMoreTasks = createEvent()
export const resetOffset = createEvent()
export const resetTasks = createEvent()
const loadTasks = createEvent<{ workspaceId: number }>()
const addOffset = createEvent<number>()
const setIsAllDataLoaded = createEvent<boolean>()

const searchTitle = createStore('')
const $filter = createStore('all') // showHidden
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
  clock: loadMoreTasks,
  source: {
    offset: $offset,
    limit: $limit,
    filter: $filter,
    searchTitle: searchTitle,
    isLoadign: $isLoading
  },
  filter: ({ isLoadign }) => !isLoadign,
  fn: ({ offset, limit, searchTitle, filter }, { workspaceId }) => ({
    workspaceId,
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
  clock: loadMoreProjects,
  source: currentWorkspaceModel.$currentWorkspace,
  filter: Boolean,
  fn: (currentWorkspace) => ({ workspaceId: currentWorkspace.id }),
  target: loadProjects
})

sample({
  clock: [
    projectModel.getAllProjectsFx.doneData,
    projectModel.getMemberProjectsFx.doneData
  ],
  source: $limit,
  filter: (limit, data) => data.length < limit,
  fn: () => true,
  target: setIsAllDataLoaded
})
sample({
  clock: [
    projectModel.getAllProjectsFx.done,
    projectModel.getMemberProjectsFx.done
  ],
  source: $limit,
  target: addOffset
})

// sample({
//   clock: workspaceFilterModel.workspaceFilter.currentValue,
//   target: [loadMoreProjects, resetOffset, resetProjects]
// })
// const debouncedSearchWorkspace = debounce({
//     source: workspaceSearchModel.setSearchWorkspaceTitle,
//     timeout: 300,
//   });

//   sample({
//     clock: debouncedSearchWorkspace,
//     target: [loadMoreWorkspaces, resetOffset, resetWorkspaces]
//   })
