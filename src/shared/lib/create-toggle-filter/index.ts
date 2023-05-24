import { createEvent, createStore, sample } from 'effector'

export const createToggleFilter = <T>(defaultValue: T | null = null) => {
  const changeValue = createEvent<T>()
  const $currentValue = createStore<T | null>(defaultValue).on(
    changeValue,
    (_, value) => value
  )

  return {
    currentValue: $currentValue,
    changeValue
  }
}
