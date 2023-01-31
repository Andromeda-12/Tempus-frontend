import { createEffect, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { ResponseError } from '@/shared/lib'

export const gate = createGate<string>()

export const $email = createStore('Andromeda-12')
export const $isTokenValid = createStore(false)
export const $isLoading = createStore(true)

const checkTokenFx = createEffect<string, string, ResponseError>()

sample({
  clock: gate.state,
  target: checkTokenFx
})

sample({
  clock: checkTokenFx.doneData,
  target: $email
})

sample({
  clock: checkTokenFx.doneData,
  fn: () => true,
  target: $isTokenValid
})

sample({
  clock: checkTokenFx.finally,
  fn: () => false,
  target: $isLoading
})
