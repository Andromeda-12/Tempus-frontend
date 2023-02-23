import { SignOutButton } from '@/features/auth/sign-out'
import { SettingsPage } from '@/pages/settings'
import { settingRoute, userSettingsRoute } from '@/shared/routing'
import { Button, Popover } from '@/shared/ui'
import { Link } from 'atomic-router-react'
import { ReactNode } from 'react'

interface UsersActions {
  trigger: ReactNode
}

export const UsersActions = ({ trigger }: UsersActions) => {
  return (
    <Popover
      trigger={trigger}
      side='right'
      align='end'
      sideOffset={-10}
      className='w-32'
    >
      <Link to={settingRoute} params={{ settingSection: 'user' }}>
        <Button variant='text' className='w-full rounded-none'>
          Profile
        </Button>
      </Link>

      <SignOutButton className='w-full rounded-none' />
    </Popover>
  )
}
