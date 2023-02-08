import { createEvent, sample } from 'effector'
import { createGate } from 'effector-react'
import { createRouterControls, createRoute } from 'atomic-router'

export const appStarted = createEvent()
export const appGate = createGate()

sample({
  clock: appGate.open,
  target: appStarted
})

export const controls = createRouterControls()

export const signinRoute = createRoute()
export const signupRoute = createRoute()

export const workspacesRoute = createRoute()
export const workspaceRoute = createRoute<{ workspaceId: number }>()

export const projectRoute = createRoute()

export const settingRoute = createRoute()
export const generalSettingsRoute = createRoute()
export const userSettingsRoute = createRoute()

export const notFoundRoute = createRoute()
