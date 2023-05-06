import { redirect } from 'atomic-router'
import { createEvent, sample } from 'effector'
import { combineEvents } from 'patronum'
import { projectListModel } from '@/widgets/project-list'
import { notificationModel } from '@/features/notification'
import { currentWorkspaceModel } from '@/entities/current-workspace'
import { workspaceModel } from '@/entities/workspace'
import { notFoundRoute, workspaceRoute } from '@/shared/routing'

const redirectToNotFoundPage = createEvent()
const startLoadProjects = combineEvents({
  events: [
    currentWorkspaceModel.getCurrentWorkspaceFx.done,
    currentWorkspaceModel.getWorkspaceRoleFx.done
  ]
})

export const $currentWorkspace = currentWorkspaceModel.$currentWorkspace
export const $workspaceViewerRole = currentWorkspaceModel.$workspaceViewerRole
export const $isLoadingCurrentWorkspace =
  currentWorkspaceModel.getCurrentWorkspaceFx.pending

sample({
  clock: [workspaceRoute.opened],
  source: workspaceModel.$workspaces,
  fn: (workspaces, routeParamsAndQuery) => ({
    workspaces,
    param: routeParamsAndQuery.params.workspaceId
  }),
  target: currentWorkspaceModel.getCurrentWorkspaceFx
})
sample({
  clock: [workspaceRoute.opened],
  fn: (routeParamsAndQuery) => ({
    workspaceId: routeParamsAndQuery.params.workspaceId
  }),
  target: currentWorkspaceModel.getWorkspaceRoleFx
})

sample({
  clock: startLoadProjects,
  target: projectListModel.loadMoreProjects
})

sample({
  clock: workspaceRoute.closed,
  target: [projectListModel.resetProjects, projectListModel.resetOffset]
})

sample({
  clock: currentWorkspaceModel.getCurrentWorkspaceFx.doneData,
  filter: (res) => res === null,
  target: redirectToNotFoundPage
})

redirect({
  clock: redirectToNotFoundPage,
  route: notFoundRoute
})

sample({
  clock: workspaceModel.updateWorkspaceFx.doneData,
  target: currentWorkspaceModel.$currentWorkspace
})

sample({
  clock: workspaceModel.updateWorkspaceFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Update workspace error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})
