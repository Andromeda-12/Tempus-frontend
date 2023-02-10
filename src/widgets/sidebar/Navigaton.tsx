import { ReactNode } from 'react'
import clsx from 'clsx'
import { Link } from 'atomic-router-react'
import { RouteInstance, RouteParams } from 'atomic-router'

export interface NavigationItem {
  // href?: string
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

interface NavigationProps {
  open: boolean
  items: NavigationItem[]
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

const NavigationItem = ({
  item: { icon, title, content },
  open
}: NavigationItemProps) => (
  <div
    tabIndex={0}
    className='flex items-center outline-none focus-visible:ring-4 p-3 text-base font-normal text-gray-900 hover:text-accent duration-150 rounded-2xl dark:text-white hover:bg-gray-100 dark:hover:bg-background-dark'
  >
    {icon && <div className='flex'>{icon}</div>}

    {title && (
      <span
        className={clsx('ml-3 flex-1 whitespace-nowrap', !open && 'hidden')}
      >
        {title}
      </span>
    )}

    {content && content}

    {/* <span className='inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200'>
            3
          </span> */}
  </div>
)

export const Navigation = ({ open, items }: NavigationProps) => (
  <ul className='space-y-2'>
    {items.map((item) => (
      <li key={item.title}>
        {item.route ? (
          <NavigationItemWithLink route={item.route} params={item.params || {}}>
            <NavigationItem open={open} item={item} />
          </NavigationItemWithLink>
        ) : (
          <NavigationItem open={open} item={item} />
        )}
      </li>
    ))}
  </ul>
)
