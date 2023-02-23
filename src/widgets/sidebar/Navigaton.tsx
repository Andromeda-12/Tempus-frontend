import { ReactNode } from 'react'
import { NavigationItem } from './NavigationItem'

interface NavigationProps {
  open: boolean
  items: NavigationItem[]
}

export const NavigationContainer = ({ children }: { children: ReactNode }) => (
  <ul className='space-y-2'>{children}</ul>
)

export const Navigation = ({ open, items }: NavigationProps) => (
  <NavigationContainer>
    {items.map((item) => (
      <NavigationItem open={open} item={item} key={item.id} />
    ))}
  </NavigationContainer>
)
