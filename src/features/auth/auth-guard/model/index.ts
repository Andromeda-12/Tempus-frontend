import { redirect } from 'atomic-router'
import {
  createEffect,
  createEvent,
  createStore,
  Effect,
  sample
} from 'effector'
import { viewerModel } from '@/entities/viewer'
import { appStarted, signinRoute, workspacesRoute } from '@/shared/routing'

export const setAuthToLSFx = createEffect(() => {
  localStorage.setItem('isAuth', 'true')
})

export const removeAuthFromLSFx = createEffect(() => {
  localStorage.removeItem('isAuth')
})

export const getAuthFromLSFx = createEffect(() => {
  const isAuth = localStorage.getItem('isAuth')
  return !!isAuth
})

export const loadViewer = createEvent()
export const goToDashboard = createEvent()
export const goToSignIn = createEvent()

export const $isAuthFromLS = createStore<boolean | null>(null)
export const $isAuthenticated = viewerModel.$viewer.map((viewer) => !!viewer)
export const $isTriedViewerLoaded = createStore(false).on(
  viewerModel.loadViewerFx.finally,
  () => true
)

sample({
  clock: setAuthToLSFx.done,
  target: loadViewer
})

sample({
  clock: setAuthToLSFx.done,
  fn: () => true,
  target: $isAuthFromLS
})

sample({
  clock: removeAuthFromLSFx.done,
  fn: () => false,
  target: $isAuthFromLS
})

sample({
  clock: loadViewer,
  target: viewerModel.loadViewerFx
})

sample({
  clock: appStarted,
  target: getAuthFromLSFx
})

sample({
  clock: getAuthFromLSFx.doneData,
  target: $isAuthFromLS
})

sample({
  clock: getAuthFromLSFx.doneData,
  filter: (isAuth) => isAuth,
  target: loadViewer
})

sample({
  clock: viewerModel.signOut,
  target: removeAuthFromLSFx
})

redirect({
  clock: goToDashboard,
  route: workspacesRoute
})

redirect({
  clock: goToSignIn,
  route: signinRoute
})
