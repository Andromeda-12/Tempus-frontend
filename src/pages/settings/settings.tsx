import { useUnit } from 'effector-react'
import { Card, ContentContainer, Tab, Tabs } from '@/shared/ui'
import { settingRoute } from '@/shared/routing'
import { UserSettings } from './user-settings'
import { SettingsTabs, changeRoute } from './model'

const tabs: Tab[] = [
  {
    title: 'General',
    value: 'general',
    content: <>General</>
  },
  {
    title: 'User',
    value: 'user',
    content: <UserSettings />
  },

  {
    title: 'Что то еще',
    value: 'somethingelse',
    content: <>somethingelse</>
  }
]

export const SettingsPage = () => {
  const { settingSection } = useUnit(settingRoute.$params)
  const changeRouteFn = useUnit(changeRoute)

  const hanldeTabValueChange = (tab: SettingsTabs) => {
    changeRouteFn(tab)
  }

  return (
    <div className='pt-10 flex flex-col h-full'>
      <h3 className='text-xl mb-5 text-black dark:text-color-dark'>Settings</h3>

      <Tabs
        currentTab={settingSection as string}
        tabs={tabs}
        onValueChange={(value) => hanldeTabValueChange(value as SettingsTabs)}
      />
    </div>
  )
}
