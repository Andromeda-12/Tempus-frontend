import { createEvent, createStore, sample } from 'effector'

type FilterValue = 'own' | 'others' | null

const createFilter = <T>(value: T) => {
  const toggle = createEvent()

  const $value = createStore(value)
  const $checked = createStore(false)

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
    toggle
  }
}

export const ownFilter = createFilter<FilterValue>('own')
export const othersFilter = createFilter<FilterValue>('others')

const filters = [ownFilter, othersFilter]

export const $currentFilter = createStore<FilterValue>(null)

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
