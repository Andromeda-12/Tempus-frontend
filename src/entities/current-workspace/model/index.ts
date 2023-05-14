import { createEffect, createEvent, createStore, sample } from 'effector'
import { ApiError, Role, WorkspaceDto, WorkspaceService } from '@/shared/api'

export const resetCurrentWorkspace = createEvent()

export const getCurrentWorkspaceFx = createEffect<
  {
    workspaces: WorkspaceDto[]
    param: number
  },
  WorkspaceDto | null,
  ApiError
>(async ({ workspaces, param }) => {
  const workspaceId = Number(param)
  if (isNaN(workspaceId)) return null

  const currentWorkspace = workspaces.find(
    (workspace) => workspace.id === workspaceId
  )

  if (currentWorkspace) return currentWorkspace

  const data = await WorkspaceService.workspaceControllerFindOne(workspaceId)

  if (data) return data

  return null
})
export const getWorkspaceRoleFx = createEffect<
  { workspaceId: number },
  Role,
  ApiError
>(async ({ workspaceId }) => {
  const { role } = await WorkspaceService.workspaceControllerGetRole(
    workspaceId
  )
  return role
})

export const $currentWorkspace = createStore<WorkspaceDto | null>(null).reset(
  resetCurrentWorkspace
)
export const $workspaceViewerRole = createStore<Role | null>(null).reset(
  resetCurrentWorkspace
)
export const $members = $currentWorkspace.map((w) => w?.members)

sample({
  clock: getCurrentWorkspaceFx.doneData,
  filter: Boolean,
  target: $currentWorkspace
})
sample({
  clock: getWorkspaceRoleFx.doneData,
  target: $workspaceViewerRole
})
