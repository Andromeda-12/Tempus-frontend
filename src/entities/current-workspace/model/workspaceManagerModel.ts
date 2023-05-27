import { createEffect, createEvent, sample } from 'effector'
import { ApiError, Role, WorkspaceDto, WorkspaceService } from '@/shared/api'

type ProjectMembersParams = {
  params: {
    workspaceId: number
  }
  userId: number
}

export const removeMember = createEvent<ProjectMembersParams>()

export const removeMemberFx = createEffect<
  ProjectMembersParams,
  WorkspaceDto,
  ApiError
>(
  async ({ params: { workspaceId }, userId }) =>
    await WorkspaceService.workspaceControllerRemoveMember(workspaceId, {
      userId
    })
)
export const getInviteLinkFx = createEffect<
  { workspaceId: number },
  string,
  ApiError
>(
  async ({ workspaceId }) =>
    await WorkspaceService.workspaceControllerGetInviteUrl(workspaceId)
)
export const generateInviteLinkFx = createEffect<
  { workspaceId: number },
  string,
  ApiError
>(
  async ({ workspaceId }) =>
    await WorkspaceService.workspaceControllerGenerateInviteUrl(workspaceId)
)
export const removeInviteLinkFx = createEffect<
  { workspaceId: number },
  string,
  ApiError
>(
  async ({ workspaceId }) =>
    await WorkspaceService.workspaceControllerRemoveInviteUrl(workspaceId)
)

export const changeMemberRoleFx = createEffect<
  {
    workspaceId: number
    memberId: number
    role: Role
  },
  WorkspaceDto,
  ApiError
>(
  async ({ workspaceId, memberId, role }) =>
    await WorkspaceService.workspaceControllerChangeWorkspaceRole(workspaceId, {
      role,
      memberId
    })
)

sample({
  clock: removeMember,
  target: removeMemberFx
})
