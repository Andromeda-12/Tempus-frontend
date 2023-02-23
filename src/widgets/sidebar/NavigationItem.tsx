import { ReactNode } from 'react'
import { RouteInstance, RouteParams } from 'atomic-router'
import clsx from 'clsx'
import { Link } from 'atomic-router-react'

export interface NavigationItem {
  id?: string
  route?: RouteInstance<any>
  params?: Object
  title?: string
  icon?: ReactNode
  content?: ReactNode
}

interface NavigationItemProps {
  open: boolean
  item: NavigationItem
}

export const NavigationItem = ({ item, open }: NavigationItemProps) => {
  if (item.route)
    return (
      <NavigationItemWithLink route={item.route} params={item.params || {}}>
        <NavigationItemContainer>
          <NavigationItemContent open={open} item={item} />
        </NavigationItemContainer>
      </NavigationItemWithLink>
    )

  return (
    <NavigationItemContainer>
      <NavigationItemContent open={open} item={item} />
    </NavigationItemContainer>
  )
}

export const NavigationItemContainer = ({
  children
}: {
  children: ReactNode
}) => (
  <li
    tabIndex={0}
    className='flex items-center outline-none focus-visible:ring-4 p-3 text-base font-normal text-gray-900 hover:text-accent duration-150 rounded-2xl dark:text-white hover:bg-gray-100 dark:hover:bg-background-dark cursor-pointer'
  >
    {children}
  </li>
)

const NavigationItemContent = ({
  item: { icon, title, content },
  open
}: NavigationItemProps) => {
  return (
    <>
      {icon && <div className='flex'>{icon}</div>}

      {title && (
        <span
          className={clsx('ml-3 flex-1 whitespace-nowrap', !open && 'hidden')}
        >
          {title}
        </span>
      )}

      {content && <div className={clsx(!open && 'hidden')}>{content}</div>}
    </>
  )
}

const NavigationItemWithLink = ({
  route,
  params,
  children
}: {
  route: RouteInstance<any>
  params: RouteParams
  children: ReactNode
}) => {
  return (
    <Link to={route} params={params} className='outline-none'>
      {children}
    </Link>
  )
}
