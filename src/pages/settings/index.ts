export * from './settings'

import { settingRoute } from '@/shared/routing'
import { SettingsPage } from './settings'

export const Settings = {
  view: SettingsPage,
  route: settingRoute
}
