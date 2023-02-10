import clsx from 'clsx'
import { ThemeSwitcher } from '@/features/theme-switcher'
import { ViewerAvatar } from '@/entities/viewer'
import { HamburgerButton, Icon } from '@/shared/ui'
import { SidebarSection } from './SidebarSection'
import { SidebarContainer } from './SidebarContainer'
import { Navigation, NavigationItem } from './Navigaton'
import { settingRoute, workspacesRoute } from '@/shared/routing'

const topNavigation: NavigationItem[] = [
  {
    // route: '/',
    title: 'Tasks',
    icon: <Icon name='time' />
  },
  {
    // route: '/reports',
    title: 'Reports',
    icon: <Icon name='report' />
  },
  {
    // route: '/team',
    title: 'Team',
    icon: <Icon name='team' />
  },
  {
    route: workspacesRoute,
    title: 'Workspaces',
    icon: <Icon name='team' />
  }
]

const bottomNavigation: NavigationItem[] = [
  {
    route: settingRoute,
    params: { settingSection: 'general' },
    title: 'Settings',
    icon: <Icon name='settings' />
  },
  {
    icon: <ViewerAvatar className='relative -left-1' />,
    title: 'SomeName Some'
  }
]

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
          <Navigation open={open} items={bottomNavigation} />
        </SidebarSection>
      </div>
    </SidebarContainer>
  )
}
