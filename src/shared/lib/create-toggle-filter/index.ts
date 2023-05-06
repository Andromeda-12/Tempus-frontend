import { createEvent, createStore, sample } from 'effector'

export const createToggleFilter = <T>() => {
  const changeValue = createEvent<T>()
  const $currentValue = createStore<T | null>(null).on(
    changeValue,
    (_, value) => value
  )

  // sample({
  //   clock: changeValue,
  //   target: $currentValue
  // })

  return {
    currentValue: $currentValue,
    changeValue
  }
}
