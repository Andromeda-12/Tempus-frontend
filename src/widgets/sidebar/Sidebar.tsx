import clsx from 'clsx'
import { useUnit } from 'effector-react'
import { ThemeSwitcher } from '@/features/theme-switcher'
import { ViewerAvatar, viewerModel } from '@/entities/viewer'
import { HamburgerButton, Icon } from '@/shared/ui'
import { settingRoute, workspacesRoute } from '@/shared/routing'
import { SidebarSection } from './SidebarSection'
import { SidebarContainer } from './SidebarContainer'
import { Navigation, NavigationContainer } from './Navigaton'
import { NavigationItem } from './NavigationItem'
import { UsersActions } from '../users-actions'

const ViewerFullName = () => {
  const viewer = useUnit(viewerModel.$viewer)
  const fullName = `${viewer?.firstName} ${viewer?.lastName}`

  return (
    <div className='ml-1 text-sm  whitespace-nowrap overflow-hidden text-ellipsis'>
      {fullName}
    </div>
  )
}

const topNavigation: NavigationItem[] = [
  {
    id: 'task',
    title: 'Tasks',
    icon: <Icon name='time' />
  },
  {
    id: 'report',
    title: 'Reports',
    icon: <Icon name='report' />
  },
  {
    id: 'team',
    title: 'Team',
    icon: <Icon name='team' />
  },
  {
    id: 'workspaces',
    route: workspacesRoute,
    title: 'Workspaces',
    icon: <Icon name='workspaces' />
  }
]

const BottomNavigation = ({ open }: { open: boolean }) => {
  return (
    <NavigationContainer>
      <NavigationItem
        open={open}
        item={{
          icon: <Icon name='settings' />,
          route: settingRoute,
          params: { settingSection: 'general' },
          title: 'Settings'
        }}
      />

      <UsersActions
        trigger={
          <NavigationItem
            open={open}
            item={{
              icon: <ViewerAvatar className='relative -left-1' />,
              content: <ViewerFullName />
            }}
          />
        }
      />
    </NavigationContainer>
  )
}

interface SidebarProps {
  open: boolean
  onToggle: () => void
  className: string
}

export const Sidebar = ({ open, onToggle, className }: SidebarProps) => {
  return (
    <SidebarContainer className={className} open={open}>
      <div className='hidden md:flex justify-end items-center mb-2 '>
        <ThemeSwitcher className='mr-0.5' />
      </div>

      <div
        className={clsx(
          'hidden md:flex mb-4 flex-wrap justify-end h-14 md:h-auto'
        )}
      >
        <div className='justify-end hidden md:flex'>
          <HamburgerButton className='mr-0.5' open={open} onClick={onToggle} />
        </div>
      </div>

      <div className='flex flex-col h-full justify-between '>
        <SidebarSection>
          <Navigation open={open} items={topNavigation} />
        </SidebarSection>

        <SidebarSection>
          <BottomNavigation open={open} />
        </SidebarSection>
      </div>
    </SidebarContainer>
  )
}
