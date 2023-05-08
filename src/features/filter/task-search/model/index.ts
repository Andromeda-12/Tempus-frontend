import { querySync } from 'atomic-router'
import { debounce } from 'patronum'
import { createEvent, restore } from 'effector'
import { controls, projectRoute } from '@/shared/routing'

export const setSearchTaskTitle = createEvent<string | null>()

export const $searchTaskTitle = restore<string | null>(setSearchTaskTitle, null)

export const debouncedSearchTask = debounce({
  source: setSearchTaskTitle,
  timeout: 300
})

querySync({
  source: { title: $searchTaskTitle },
  route: projectRoute,
  controls
})
