import {
  createEffect,
  createEvent,
  createStore,
  sample
} from 'effector'
import {
  ApiError,
  WorkspaceDto,
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  WorkspaceService
} from '@/shared/api'
import { GetRequestQuery } from '@/shared/lib'

export const createWorkspace = createEvent<CreateWorkspaceDto>()
export const updateWorkspace = createEvent<{
  id: number
  updateWorkspaceDto: UpdateWorkspaceDto
}>()
export const removeWorkspace = createEvent<number>()

export const resetWorkspaces = createEvent()

export const getWorkspacesFx = createEffect<
  GetRequestQuery,
  WorkspaceDto[],
  ApiError
>(
  async ({ offset, limit, title, isOwned }) =>
    await WorkspaceService.workspaceControllerFindAll(
      offset,
      limit,
      title,
      isOwned
    )
)

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
    id: number
    updateWorkspaceDto: UpdateWorkspaceDto
  },
  WorkspaceDto,
  ApiError
>(
  async ({ id, updateWorkspaceDto }) =>
    await WorkspaceService.workspaceControllerUpdate(id, updateWorkspaceDto)
)
export const removeWorkspaceFx = createEffect<number, WorkspaceDto, ApiError>(
  async (id) => await WorkspaceService.workspaceControllerRemove(id)
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
