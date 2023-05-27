import { createEffect, createEvent, createStore, sample } from 'effector'
import { chainRoute, redirect } from 'atomic-router'
import { notificationModel } from '@/features/notification'
import { inviteRoute, workspaceRoute } from '@/shared/routing'
import { ApiError, WorkspaceDto, WorkspaceService } from '@/shared/api'

export const checkWorkspaceInviteCodeFx = createEffect<
  {
    code: string
  },
  WorkspaceDto,
  ApiError
>(
  async ({ code }) =>
    await WorkspaceService.workspaceControllerCheckInviteUrl(code)
)

export const acceptWorkspaceInviteFx = createEffect<
  {
    code: string
  },
  WorkspaceDto,
  ApiError
>(
  async ({ code }) =>
    await WorkspaceService.workspaceControllerAcceptInvite(code)
)

export const acceptWorkspaceInvite = createEvent()
const resetModel = createEvent()

export const $invitedWorkspace = createStore<WorkspaceDto | null>(null).reset(
  resetModel
)
export const $isInviteCodeValid = createStore(false).reset(resetModel)
export const $isLoading = checkWorkspaceInviteCodeFx.pending

chainRoute({
  route: inviteRoute,
  beforeOpen: {
    effect: checkWorkspaceInviteCodeFx,
    mapParams: ({ params }) => ({
      code: params.code
    })
  }
})

sample({
  clock: inviteRoute.closed,
  target: resetModel
})

sample({
  clock: checkWorkspaceInviteCodeFx.doneData,
  target: $invitedWorkspace
})
sample({
  clock: checkWorkspaceInviteCodeFx.doneData,
  fn: () => true,
  target: $isInviteCodeValid
})

sample({
  clock: acceptWorkspaceInvite,
  source: inviteRoute.$params,
  fn: ({ code }) => ({ code }),
  target: acceptWorkspaceInviteFx
})

redirect({
  clock: acceptWorkspaceInviteFx.doneData,
  params: (workspace) => ({ workspaceId: workspace.id }),
  route: workspaceRoute
})

sample({
  clock: acceptWorkspaceInviteFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Invite error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})
