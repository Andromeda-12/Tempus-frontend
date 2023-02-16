import { controls } from '@/shared/routing'
import { querySync } from 'atomic-router'
import { createEvent, restore } from 'effector'

export const setSearchWorkspaceTitle = createEvent<string | null>()

export const $searchWorkspaceTitle = restore<string | null>(
  setSearchWorkspaceTitle,
  null
)

querySync({
  source: { title: $searchWorkspaceTitle },
  controls
})
