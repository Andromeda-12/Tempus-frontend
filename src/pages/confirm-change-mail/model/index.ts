import { createEffect, createStore, sample } from 'effector'
import { chainRoute } from 'atomic-router'
import { ApiError, AuthService } from '@/shared/api'
import { recoveryPasswordRoute } from '@/shared/routing'

export const $isMailLinked = createStore(false)
export const $isLoading = createStore(true)

const bindEmailFx = createEffect<string, string, ApiError>(async (token) =>
  AuthService.authControllerCheckRecoveryToken(token)
)

chainRoute({
  route: recoveryPasswordRoute,
  beforeOpen: {
    effect: bindEmailFx,
    mapParams: ({ query }) => query.token
  }
})

sample({
  clock: bindEmailFx.doneData,
  fn: () => true,
  target: $isMailLinked
})

sample({
  clock: bindEmailFx.finally,
  fn: () => false,
  target: $isLoading
})
