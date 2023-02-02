import { createEvent, createStore, restore, sample } from 'effector'
import { createGate } from 'effector-react'
import { workspaceModel } from '@/entities/workspace'

export const workspaceGate = createGate()

export const loadMoreWorkspaces = createEvent()
const addOffset = createEvent<number>()

const resetWorkspaces = createEvent()
const setIsAllDataLoaded = createEvent<boolean>()

const $limit = createStore(20)
export const $offset = createStore(0).on(
  addOffset,
  (currentOffset, addedOffset) => currentOffset + addedOffset
)
export const $isLoading = workspaceModel.getWorkspacesFx.pending

export const $isAllDataLoaded = restore(setIsAllDataLoaded, false)

sample({
  clock: resetWorkspaces,
  target: workspaceModel.resetWorkspaces
})

sample({
  clock: loadMoreWorkspaces,
  source: {
    offset: $offset,
    limit: $limit,
    isLoadign: $isLoading
  },
  filter: ({ isLoadign }) => !isLoadign,
  fn: ({ offset, limit }) => ({ offset, limit }),
  target: workspaceModel.getWorkspacesFx
})

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
  target: workspaceModel.setCurrentWorkspaceToNull
})

sample({
  clock: workspaceModel.getWorkspacesFx.doneData,
  source: $limit,
  filter: (limit, data) => data.length < limit,
  fn: () => true,
  target: setIsAllDataLoaded
})

sample({
  clock: workspaceModel.getWorkspacesFx.done,
  source: $limit,
  target: addOffset
})
