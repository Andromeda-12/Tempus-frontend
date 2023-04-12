import { useUnit } from 'effector-react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import clsx from 'clsx'
import { NotificationPositions } from '../lib'
import { notificationModel, Notification } from '..'

const positions: Record<NotificationPositions, string> = {
  top: 'top-0 right-0 left-0 items-center',
  'top-right': 'top-0 right-0 items-end',
  'top-left': 'top-0 left-0 items-start',
  bottom: 'bottom-0 right-0 left-0 items-center',
  'bottom-right': 'bottom-0 right-0 items-end',
  'bottom-left': 'bottom-0 left-0 items-start'
}

export const NotificationHub = () => {
  const position = useUnit(notificationModel.$notificationsPosition)
  const notifications = useUnit(notificationModel.$notificationList)
  return (
    <TransitionGroup
      component='div'
      className={clsx(
        'px-4 py-5 flex flex-col space-y-3 w-full sm:w-fit fixed z-[1000] duration-500',
        positions[position]
      )}
    >
      {notifications.map((notification) => (
        <CSSTransition
          key={notification.id}
          timeout={500}
          classNames='fade'
        >
          <Notification notification={notification} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
