import { querySync } from 'atomic-router'
import { createEvent, createStore, sample } from 'effector'
import { controls } from '@/shared/routing'

export type FilterValue = 'own' | 'others'

export const values: FilterValue[] = ['own', 'others']

const createToggleFilter = <T>() => {
  const changeValue = createEvent<T>()
  const $currentValue = createStore<T | null>(null)

  sample({
    clock: changeValue,
    target: $currentValue
  })

  return {
    currentValue: $currentValue,
    changeValue
  }
}

export const workspaceFilter = createToggleFilter<FilterValue>()

querySync({
  source: { filter: workspaceFilter.currentValue },
  controls
})
