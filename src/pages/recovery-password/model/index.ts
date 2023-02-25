import { createEffect, createStore, sample } from 'effector'
import { chainRoute } from 'atomic-router'
import { ApiError, AuthService } from '@/shared/api'
import { recoveryPasswordRoute } from '@/shared/routing'

export const $email = createStore('Andromeda-12')
export const $isTokenValid = createStore(false)
export const $isLoading = createStore(true)

const checkTokenFx = createEffect<string, string, ApiError>(async (token) =>
  AuthService.authControllerCheckRecoveryToken(token)
)

chainRoute({
  route: recoveryPasswordRoute,
  beforeOpen: {
    effect: checkTokenFx,
    mapParams: ({ query }) => query.token
  }
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
