import clsx from 'clsx'
import Link from 'next/link'

interface NavigationItem {
  name: string
  href: string
}

interface NavigationItemProps {
  item: NavigationItem
}

interface NavigationProps {
  open: boolean
  navigation: NavigationItem[]
}

const NavigationItem = ({ item }: NavigationItemProps) => (
  <li>
    <Link href={item.href}>
      <a className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'>
        {item.name}
      </a>
    </Link>
  </li>
)

export const Navigation = ({ open, navigation }: NavigationProps) => (
  <div
    className={clsx(
      'justify-between items-center w-full lg:flex lg:w-auto lg:order-1',
      !open && 'hidden'
    )}
  >
    <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
      {navigation.map((item) => (
        <NavigationItem item={item} key={item.name} />
      ))}
    </ul>
  </div>
)
