import {
  createEffect,
  createEvent,
  createStore,
  restore,
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
export const updateWorkspace = createEvent<UpdateWorkspaceDto>()
export const removeWorkspace = createEvent<number>()

export const setCurrentWorkspace = createEvent<WorkspaceDto>()
export const setCurrentWorkspaceToNull = createEvent()

export const resetWorkspaces = createEvent()

export const getWorkspacesFx = createEffect<
  GetRequestQuery,
  WorkspaceDto[],
  ApiError
>(
  async ({ offset, limit }) =>
    await WorkspaceService.workspaceControllerFindAll(offset, limit)
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

export const $currentWorkspace = restore<WorkspaceDto>(
  setCurrentWorkspace,
  null
).reset(setCurrentWorkspaceToNull)
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
  source: $currentWorkspace,
  filter: Boolean,
  fn: (currentWorkspace, updateWorkspaceDto) => ({
    id: currentWorkspace.id,
    updateWorkspaceDto
  }),
  target: updateWorkspaceFx
})

sample({
  clock: removeWorkspace,
  target: removeWorkspaceFx
})
