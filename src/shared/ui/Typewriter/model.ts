import { createEvent, createStore, sample } from 'effector'

export const $speed = createStore(80)
export const $text = createStore('default text')
export const $isDeleting = createStore(false)
export const $count = createStore(0)

export const setSpeed = createEvent<number>()
export const setType = createEvent<{ text: string; speed: number }>()
export const setDelete = createEvent<{ text: string; speed: number }>()
export const setCount = createEvent()

sample({
  clock: setSpeed,
  target: $speed
})
sample({
  clock: setSpeed,
  fn: () => true,
  target: $isDeleting
})

sample({
  clock: setType,
  fn: (payload) => payload.speed,
  target: $speed,
  greedy: true
})
sample({
  clock: setType,
  source: $text,
  fn: (text, payload) => payload.text.substring(0, text.length + 1),
  target: $text
})

sample({
  clock: setDelete,
  fn: (payload) => payload.speed,
  target: $speed
})
sample({
  clock: setDelete,
  source: $text,
  fn: (text, payload) => payload.text.substring(0, text.length - 1),
  target: $text
})

sample({
  clock: setCount,
  source: $count,
  fn: (count) => count + 1,
  target: $count
})
sample({
  clock: setCount,
  fn: () => false,
  target: $isDeleting
})
