import clsx from 'clsx'
import { PropsWithChildren } from '@/shared/lib'

interface ContentContainer extends PropsWithChildren {
  py?: boolean
  px?: boolean
}

export const ContentContainer = ({
  children,
  className,
  py = true,
  px = true
}: ContentContainer) => (
  <div
    className={clsx(className, {
      'py-3': py,
      'px-2 sm:px-3 md:px-3 lg:px-7': px
    })}
  >
    {children}
  </div>
)
