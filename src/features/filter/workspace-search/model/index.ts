import { querySync } from 'atomic-router'
import { createEvent, restore } from 'effector'
import { controls } from '@/shared/routing'

export const setSearchWorkspaceTitle = createEvent<string | null>()

export const $searchWorkspaceTitle = restore<string | null>(
  setSearchWorkspaceTitle,
  null
)

querySync({
  source: { title: $searchWorkspaceTitle },
  controls
})
