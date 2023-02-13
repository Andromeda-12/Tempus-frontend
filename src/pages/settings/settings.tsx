import { settingRoute } from '@/shared/routing'
import { Card, ContentContainer, Tab, Tabs } from '@/shared/ui'
import { useStore } from 'effector-react'
import { UserSettings } from './user-settings'

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
  const { settingSection } = useStore(settingRoute.$params)

  return (
    <div className='h-full flex flex-col py-10'>
      <h3 className='text-xl mb-5 text-black dark:text-color-dark'>Settings</h3>

      <Card className='flex flex-col h-full'>
        <ContentContainer className='h-full flex flex-col'>
          <Tabs defaultTab={settingSection as string} tabs={tabs} />
        </ContentContainer>
      </Card>
    </div>
  )
}
