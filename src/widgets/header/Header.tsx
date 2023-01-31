import { useState } from 'react'
import { ThemeSwitcher } from '@/features/theme-switcher'
import { ViewerAvatar } from '@/entities/viewer'
import { Button } from '@/shared/ui'
import { BrandLogo } from '@/shared/ui'
import { HamburgerButton } from '@/shared/ui'
import { Navigation } from './Navigation'
import { HeaderSection } from './HeaderSection'
import { HeaderContainer } from './HeaderContainer'

const navigation = [
  {
    name: 'Home',
    href: '#'
  },
  {
    name: 'Company',
    href: '#'
  },
  {
    name: 'Marketplace',
    href: '#'
  },
  {
    name: 'Features',
    href: '#'
  },
  {
    name: 'Team',
    href: '#'
  },
  {
    name: 'Contact',
    href: '#'
  }
]

export const Header = () => {
  const [open, setOpen] = useState(false)
  const isAuth = true
  // const isAuth = false

  return (
    <HeaderContainer>
      <HeaderSection>
        <BrandLogo />
      </HeaderSection>

      <HeaderSection>
        <div className='flex gap-0 justify-end items-center lg:order-2 w-52'>
          <ThemeSwitcher className='mr-2' />

          {isAuth ? (
            <>
              <ViewerAvatar className='mr-2' />
              <Button variant='text'>Sign out</Button>
            </>
          ) : (
            <>
              <Button className='!px-3' variant='text'>
                Sign in
              </Button>
              <Button className='!px-3' variant='text'>
                Sign up
              </Button>
            </>
          )}

          <HamburgerButton
            className='lg:hidden'
            open={open}
            onClick={() => setOpen(!open)}
          />
        </div>
      </HeaderSection>

      <HeaderSection>
        <Navigation navigation={navigation} open={open} />
      </HeaderSection>
    </HeaderContainer>
  )
}
