import { Card, ContentContainer, Tab, Tabs } from '@/shared/ui'
import { useRouter } from 'next/router'

const tabs: Tab[] = [
  {
    title: 'General',
    value: 'general',
    content: <>General</>
  },
  {
    title: 'User',
    value: 'user',
    content: <>User</>
  },

  {
    title: 'Что то еще',
    value: 'somethingelse',
    content: <>somethingelse</>
  }
]

export const Settings = () => {

  const router = useRouter()
  const {tabTitle} = router.query
  

  return (
    <div className='h-full flex flex-col'>
      <h3 className='text-xl mb-5 text-black dark:text-color-dark'>Settings</h3>

      <Card className='flex flex-col h-full'>
        <ContentContainer className='h-full flex flex-col'>
          <Tabs defaultTab={tabTitle as string} tabs={tabs}  />
        </ContentContainer>
      </Card>
    </div>
  )
}
