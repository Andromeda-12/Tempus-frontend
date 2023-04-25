import { createEffect, createEvent, createStore, sample } from 'effector'
import { GetRequestQuery } from '@/shared/lib'
import {
  ApiError,
  WorkspaceDto,
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  WorkspaceService
} from '@/shared/api'

export const createWorkspace = createEvent<CreateWorkspaceDto>()
export const updateWorkspace = createEvent<{
  workspaceId: number
  updateWorkspaceDto: UpdateWorkspaceDto
}>()
export const removeWorkspace = createEvent<{
  workspaceId: number
}>()

export const resetWorkspaces = createEvent()

export const getWorkspacesFx = createEffect<
  GetRequestQuery,
  WorkspaceDto[],
  ApiError
>(
  async ({ offset, limit, title, filter }) =>
    await WorkspaceService.workspaceControllerFindAll(
      offset,
      limit,
      title,
      filter
    )
)
export const createWorkspaceFx = createEffect<
  CreateWorkspaceDto,
  WorkspaceDto,
  ApiError
>(
  async (createWorkspaceDto) =>
    await WorkspaceService.workspaceControllerCreate(createWorkspaceDto)
)
export const updateWorkspaceFx = createEffect<
  {
    workspaceId: number
    updateWorkspaceDto: UpdateWorkspaceDto
  },
  WorkspaceDto,
  ApiError
>(
  async ({ workspaceId, updateWorkspaceDto }) =>
    await WorkspaceService.workspaceControllerUpdate(
      workspaceId,
      updateWorkspaceDto
    )
)
export const removeWorkspaceFx = createEffect<
  {
    workspaceId: number
  },
  WorkspaceDto,
  ApiError
>(
  async ({ workspaceId }) =>
    await WorkspaceService.workspaceControllerRemove(workspaceId)
)

export const $workspaces = createStore<WorkspaceDto[]>([])
  .on(getWorkspacesFx.doneData, (_, workspaces) => [..._, ...workspaces])
  .on(createWorkspaceFx.doneData, (_, workspace) => [..._, workspace])
  .on(removeWorkspaceFx.doneData, (_, workspace) => [
    ..._.filter((w) => w.id !== workspace.id)
  ])
  .reset(resetWorkspaces)

sample({
  clock: createWorkspace,
  target: createWorkspaceFx
})

sample({
  clock: updateWorkspace,
  target: updateWorkspaceFx
})

sample({
  clock: removeWorkspace,
  target: removeWorkspaceFx
})
