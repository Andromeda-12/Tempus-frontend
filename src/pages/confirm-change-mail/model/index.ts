import { createEffect, createStore, sample } from 'effector'
import { chainRoute } from 'atomic-router'
import { ApiError, AuthService, UserService } from '@/shared/api'
import { confirmChangeMailRoute } from '@/shared/routing'

export const $isMailLinked = createStore(false)
export const $isLoading = createStore(true)

const bindEmailFx = createEffect<string, void, ApiError>(async (token) =>
  UserService.userControllerConfirmChangeMail(token)
)
bindEmailFx.watch((e) => console.log(e))
chainRoute({
  route: confirmChangeMailRoute,
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
