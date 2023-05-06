import { querySync } from 'atomic-router'
import { createEvent, restore } from 'effector'
import { controls } from '@/shared/routing'
import { debounce } from 'patronum'

export const setSearchProjectTitle = createEvent<string | null>()

export const $searchProjectTitle = restore<string | null>(
  setSearchProjectTitle,
  null
)

export const debouncedSearchProject = debounce({
  source: setSearchProjectTitle,
  timeout: 300
})

querySync({
  source: { title: $searchProjectTitle },
  controls
})
