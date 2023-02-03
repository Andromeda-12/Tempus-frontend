import { redirect } from 'atomic-router'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { ApiError, WorkspaceDto, WorkspaceService } from '@/shared/api'
import { workspaceModel } from '@/entities/workspace'
import { controls, notFoundRoute, workspaceRoute } from '@/shared/routing'
import { notificationModel } from '@/features/notification'

export const workspacePageGate = createGate()

const redirectToNotFoundPage = createEvent()
const getCurrentWorkspace = createEvent<{
  workspaces: WorkspaceDto[]
  param: number
}>()

export const $currentWorkspace = createStore<WorkspaceDto | null>(null)
export const $isLoadingCurrentWorkspace =
  workspaceModel.getCurrentWorkspaceFx.pending

sample({
  clock: [workspaceRoute.opened, workspaceRoute.updated],
  source: workspaceModel.$workspaces,
  fn: (workspaces, routeParamsAndQuery) => ({
    workspaces,
    param: routeParamsAndQuery.params.workspaceId
  }),
  target: getCurrentWorkspace
})

sample({
  clock: getCurrentWorkspace,
  target: workspaceModel.getCurrentWorkspaceFx
})

sample({
  clock: workspaceModel.getCurrentWorkspaceFx.doneData,
  filter: Boolean,
  target: $currentWorkspace
})

sample({
  clock: workspaceModel.getCurrentWorkspaceFx.doneData,
  filter: (res) => res === null,
  target: redirectToNotFoundPage
})

redirect({
  clock: redirectToNotFoundPage,
  route: notFoundRoute
})

sample({
  clock: workspaceModel.updateWorkspaceFx.doneData,
  target: $currentWorkspace
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
