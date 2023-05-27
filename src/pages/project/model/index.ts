import { redirect } from 'atomic-router'
import { createEvent, sample } from 'effector'
import { combineEvents } from 'patronum'
import { taskListModel } from '@/widgets/task-list'
import { projectModel } from '@/entities/project'
import { workspaceModel } from '@/entities/workspace'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { currentProjectModel } from '@/entities/current-project'
import { notFoundRoute, projectRoute } from '@/shared/routing'

const redirectToNotFoundPage = createEvent()
const startLoadTasks = combineEvents({
  events: [
    currentWorkspaceModel.getCurrentWorkspaceFx.done,
    currentWorkspaceModel.getWorkspaceRoleFx.done,
    currentProjectModel.getCurrentProjectFx.done,
    currentProjectModel.getProjectRoleFx.finally
  ]
})

export const $currentWorkspace = currentWorkspaceModel.$currentWorkspace
export const $currentProject = currentProjectModel.$currentProject
export const $isLoadingCurrentWorkspace =
  currentWorkspaceModel.getCurrentWorkspaceFx.pending
export const $isLoadingCurrentProject =
  currentProjectModel.getCurrentProjectFx.pending

sample({
  clock: [projectRoute.opened],
  source: {
    currentWorkspace: currentWorkspaceModel.$currentWorkspace,
    workspaces: workspaceModel.$workspaces
  },
  filter: ({ currentWorkspace }) => !currentWorkspace,
  fn: ({ workspaces }, routeParamsAndQuery) => ({
    workspaces,
    param: routeParamsAndQuery.params.workspaceId
  }),
  target: currentWorkspaceModel.getCurrentWorkspaceFx
})
sample({
  clock: [projectRoute.opened],
  source: {
    projects: projectModel.$projects
  },
  fn: ({ projects }, routeParamsAndQuery) => ({
    projects,
    param: {
      workspaceId: routeParamsAndQuery.params.workspaceId,
      projectId: routeParamsAndQuery.params.projectId
    }
  }),
  target: currentProjectModel.getCurrentProjectFx
})

sample({
  clock: [projectRoute.opened],
  fn: (routeParamsAndQuery) => ({
    workspaceId: routeParamsAndQuery.params.workspaceId
  }),
  target: currentWorkspaceModel.getWorkspaceRoleFx
})
sample({
  clock: [projectRoute.opened],
  fn: (routeParamsAndQuery) => ({
    projectId: routeParamsAndQuery.params.projectId,
    workspaceId: routeParamsAndQuery.params.workspaceId
  }),
  target: currentProjectModel.getProjectRoleFx
})

sample({
  clock: startLoadTasks,
  target: taskListModel.loadMoreTasks
})

sample({
  clock: projectRoute.closed,
  target: [taskListModel.resetTasks, taskListModel.resetOffset]
})

sample({
  clock: currentWorkspaceModel.getCurrentWorkspaceFx.doneData,
  filter: (res) => res === null,
  target: redirectToNotFoundPage
})
sample({
  clock: currentProjectModel.getCurrentProjectFx.doneData,
  filter: (res) => res === null,
  target: redirectToNotFoundPage
})
sample({
  clock: currentWorkspaceModel.getCurrentWorkspaceFx.fail,
  target: redirectToNotFoundPage
})
sample({
  clock: currentProjectModel.getCurrentProjectFx.fail,
  target: redirectToNotFoundPage
})
redirect({
  clock: redirectToNotFoundPage,
  route: notFoundRoute
})
