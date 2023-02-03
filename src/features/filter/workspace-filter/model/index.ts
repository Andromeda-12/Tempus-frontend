import { createEvent, createStore, sample } from 'effector'
import { querySync } from 'atomic-router'
import { controls, workspacesRoute } from '@/shared/routing'

type FilterValue = 'own' | 'others' | null

const createFilter = <T>(value: T) => {
  const toggle = createEvent()
  const reset = createEvent()

  const $value = createStore(value)
  const $checked = createStore(false).reset(reset)

  sample({
    clock: toggle,
    source: $checked,
    fn: (checked) => {
      if (checked) return false
      return true
    },
    target: $checked
  })

  return {
    value: $value,
    checked: $checked,
    toggle,
    reset
  }
}

export const ownFilter = createFilter<FilterValue>('own')
export const othersFilter = createFilter<FilterValue>('others')

const resetFilter = createEvent()

export const $currentFilter = createStore<FilterValue>(null).reset(resetFilter)

const $currentFilterFromQuery = createStore<FilterValue>(null)
const setCurrentFilterFromQuery = createEvent<FilterValue>()

sample({
  clock: $currentFilter,
  target: $currentFilterFromQuery
})

sample({
  clock: $currentFilterFromQuery,
  source: $currentFilter,
  filter: (currentFilter) => currentFilter === null,
  fn: (_, currentFilterFromQuery) => currentFilterFromQuery,
  target: setCurrentFilterFromQuery
})

sample({
  clock: setCurrentFilterFromQuery,
  filter: (currentFilterFromQuery) => currentFilterFromQuery === 'own',
  target: ownFilter.toggle
})

sample({
  clock: setCurrentFilterFromQuery,
  filter: (currentFilterFromQuery) => currentFilterFromQuery === 'others',
  target: othersFilter.toggle
})

querySync({
  source: { filter: $currentFilterFromQuery },
  controls
})

const filters = [ownFilter, othersFilter]
filters.map((filter) => {
  sample({
    clock: filter.toggle,
    source: [filter.value, $currentFilter],
    fn: ([value, current]) => {
      if (value === current) return null
      return value
    },
    target: $currentFilter
  })
})

sample({
  clock: ownFilter.toggle,
  fn: () => false,
  target: othersFilter.checked
})

sample({
  clock: othersFilter.toggle,
  fn: () => false,
  target: ownFilter.checked
})

sample({
  clock: [workspacesRoute.closed],
  target: [ownFilter.reset, othersFilter.reset, resetFilter]
})
