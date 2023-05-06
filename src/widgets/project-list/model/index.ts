import { debounce, pending } from 'patronum'
import { projectModel } from '@/entities/project'
import { createEvent, createStore, restore, sample } from 'effector'
import { PROJECTS_REQUEST_LIMIT } from '@/shared/config'
import { GetRequestQuery } from '@/shared/lib'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { projectSearchModel } from '@/features/filter/projects-search'

export const loadMoreProjects = createEvent()
export const resetOffset = createEvent()
export const resetProjects = createEvent()
const loadProjects = createEvent<{ workspaceId: number }>()
const addOffset = createEvent<number>()
const setIsAllDataLoaded = createEvent<boolean>()
const loadProjectsByUserRole = createEvent<{
  workspaceId: number
  query: GetRequestQuery
}>()

const $filter = createStore('all') // showHidden
const $limit = createStore(PROJECTS_REQUEST_LIMIT)
export const $offset = createStore(0)
  .on(addOffset, (currentOffset, addedOffset) => currentOffset + addedOffset)
  .reset(resetOffset)
export const $isLoading = pending({
  effects: [projectModel.getMemberProjectsFx, projectModel.getAllProjectsFx]
})
export const $isAllDataLoaded = restore(setIsAllDataLoaded, false).reset(
  resetOffset
)

sample({
  clock: resetProjects,
  target: projectModel.resetProjects
})
sample({
  clock: loadProjects,
  source: {
    offset: $offset,
    limit: $limit,
    filter: $filter,
    searchTitle: projectSearchModel.$searchProjectTitle,
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
  target: loadProjectsByUserRole
})

sample({
  clock: loadProjectsByUserRole,
  source: currentWorkspaceModel.$workspaceViewerRole,
  filter: (role) => role === 'Owner' || role === 'Manager',
  fn: (_, parametr) => ({ ...parametr }),
  target: projectModel.getAllProjectsFx
})
sample({
  clock: loadProjectsByUserRole,
  source: currentWorkspaceModel.$workspaceViewerRole,
  filter: (role) => role === 'Member',
  fn: (_, parametr) => ({ ...parametr }),
  target: projectModel.getMemberProjectsFx
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
sample({
  clock: [
    projectModel.getAllProjectsFx.fail,
    projectModel.getMemberProjectsFx.fail
  ],
  fn: () => true,
  target: setIsAllDataLoaded
})

// sample({
//   clock: workspaceFilterModel.workspaceFilter.currentValue,
//   target: [loadMoreProjects, resetOffset, resetProjects]
// })

sample({
  clock: projectSearchModel.debouncedSearchProject,
  target: [loadMoreProjects, resetOffset, resetProjects]
})
