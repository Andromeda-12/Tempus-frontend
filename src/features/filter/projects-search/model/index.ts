import { querySync } from 'atomic-router'
import { createEvent, restore } from 'effector'
import { controls } from '@/shared/routing'

export const setSearchProjectTitle = createEvent<string | null>()

export const $searchProjectTitle = restore<string | null>(
  setSearchProjectTitle,
  null
)

querySync({
  source: { title: $searchProjectTitle },
  controls
})
