import { redirect } from 'atomic-router'
import { createEvent, createStore, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { workspaceModel } from '@/entities/workspace'
import { viewerModel } from '@/entities/viewer'
import { notFoundRoute, workspaceRoute } from '@/shared/routing'
import { WorkspaceDto } from '@/shared/api'

const redirectToNotFoundPage = createEvent()
const getCurrentWorkspace = createEvent<{
  workspaces: WorkspaceDto[]
  param: number
}>()

export const $currentWorkspace = createStore<WorkspaceDto | null>(null)
export const $isLoadingCurrentWorkspace =
  workspaceModel.getCurrentWorkspaceFx.pending

export const $workspaceViewerRole = createStore<
  'Owner' | 'Manager' | 'Member' | null
>(null)

sample({
  clock: [$currentWorkspace, viewerModel.$viewer],
  source: { workspace: $currentWorkspace, viewer: viewerModel.$viewer },
  fn: ({ workspace, viewer }) => {
    const currentMember = workspace?.members.find(
      (member) => member.id === viewer?.id
    )
    if (currentMember) return currentMember.role
    return null
  },
  target: $workspaceViewerRole
})

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
