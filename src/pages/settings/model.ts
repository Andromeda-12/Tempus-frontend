import { createEvent, sample } from 'effector'
import { redirect } from 'atomic-router'
import { settingRoute } from '@/shared/routing'

export type SettingsTabs = 'general' | 'user'

export const changeRoute = createEvent<SettingsTabs>()

const redirectToGeneralSettings = createEvent()
const redirectToUserSettings = createEvent()

sample({
  clock: changeRoute,
  filter: (tab) => tab === 'general',
  target: redirectToGeneralSettings
})

sample({
  clock: changeRoute,
  filter: (tab) => tab === 'user',
  target: redirectToUserSettings
})

redirect({
  clock: redirectToGeneralSettings,
  params: { settingSection: 'general' },
  route: settingRoute
})

redirect({
  clock: redirectToUserSettings,
  params: { settingSection: 'user' },
  route: settingRoute
})
