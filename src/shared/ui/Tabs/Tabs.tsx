import * as TabsPrimitive from '@radix-ui/react-tabs'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { Trigger } from './Trigger'
import { ContentContainer } from '../ContentContainer'

export interface Tab {
  title: string
  value: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  currentTab: string
  onValueChange?: (value: string) => void
}

export const Tabs = ({ tabs, currentTab, onValueChange }: TabsProps) => {
  return (
    <TabsPrimitive.Root
      value={currentTab}
      className='focus:outline-none'
      onValueChange={onValueChange}
    >
      <TabsPrimitive.List className='focus:outline-none'>
        {tabs.map(({ title, value }) => (
          <Trigger key={`tab-trigger-${value}`} value={value} title={title} />
        ))}
      </TabsPrimitive.List>

      {tabs.map(({ value, content }) => (
        <TabsPrimitive.Content
          key={`tab-content-${value}`}
          value={value}
          className={clsx('rounded-b-lg outline-none')}
        >
          <ContentContainer px={false}>{content}</ContentContainer>
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}
