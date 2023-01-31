import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample
} from 'effector'
import { createGate } from 'effector-react'
import {
  ApiError,
  WorkspaceDto,
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  WorkspaceService
} from '@/shared/api'
import { GetRequestQuery } from '@/shared/lib'
import { debug, throttle } from 'patronum'

export const workspaceGate = createGate()

export const createWorkspace = createEvent<CreateWorkspaceDto>()
export const updateWorkspace = createEvent<UpdateWorkspaceDto>()
export const removeWorkspace = createEvent<number>()

export const loadMoreWorkspaces = createEvent()
const addOffset = createEvent<number>()

export const setCurrentWorkspace = createEvent<WorkspaceDto>()
export const setCurrentWorkspaceToNull = createEvent()
const resetWorkspaces = createEvent()
const setIsAllDataLoaded = createEvent<boolean>()

const getWorkspacesFx = createEffect<GetRequestQuery, WorkspaceDto[], ApiError>(
  async ({ offset, limit }) =>
    await WorkspaceService.workspaceControllerFindAll(offset, limit)
)
const createWorkspaceFx = createEffect<
  CreateWorkspaceDto,
  WorkspaceDto,
  ApiError
>(
  async (createWorkspaceDto) =>
    await WorkspaceService.workspaceControllerCreate(createWorkspaceDto)
)
const updateWorkspaceFx = createEffect<
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
const removeWorkspaceFx = createEffect<number, WorkspaceDto, ApiError>(
  async (id) => await WorkspaceService.workspaceControllerRemove(id)
)

const $limit = createStore(20)
export const $offset = createStore(0).on(
  addOffset,
  (currentOffset, addedOffset) => currentOffset + addedOffset
)
export const $isLoading = getWorkspacesFx.pending
export const $currentWorkspace = restore<WorkspaceDto>(
  setCurrentWorkspace,
  null
).reset(setCurrentWorkspaceToNull)
export const $workspaces = createStore<WorkspaceDto[]>([])
  .on(getWorkspacesFx.doneData, (_, workspaces) => [..._, ...workspaces])
  .on(createWorkspaceFx.doneData, (_, workspace) => [..._, workspace])
  .reset(resetWorkspaces)
export const $isAllDataLoaded = restore(setIsAllDataLoaded, false)

sample({
  clock: loadMoreWorkspaces,
  source: {
    offset: $offset,
    limit: $limit,
    isLoadign: $isLoading
  },
  filter: ({ isLoadign }) => !isLoadign,
  fn: ({ offset, limit }) => ({ offset, limit }),
  target: getWorkspacesFx
})

getWorkspacesFx.watch((e) => console.log(e))

sample({
  clock: workspaceGate.open,
  target: loadMoreWorkspaces
})

sample({
  clock: workspaceGate.close,
  fn: () => 0,
  target: $offset
})

sample({
  clock: workspaceGate.close,
  fn: () => false,
  target: $isAllDataLoaded
})

sample({
  clock: workspaceGate.close,
  target: resetWorkspaces
})

sample({
  clock: workspaceGate.close,
  target: setCurrentWorkspaceToNull
})

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

sample({
  clock: getWorkspacesFx.doneData,
  source: $limit,
  filter: (limit, data) => data.length < limit,
  fn: () => true,
  target: setIsAllDataLoaded
})

sample({
  clock: getWorkspacesFx.done,
  source: $limit,
  target: addOffset
})
