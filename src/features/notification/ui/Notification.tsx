import { useUnit } from 'effector-react'
import clsx from 'clsx'
import { Icon, IconButton } from '@/shared/ui'
import { notificationModel } from '..'
import {
  defaultNotificationDuration,
  defaultNotificationType,
  type Notification as NotificationType
} from '../lib'

interface NotificationProps {
  notification: NotificationType
}

export const Notification = ({ notification }: NotificationProps) => {
  const {
    message,
    title,
    type: notificationType,
    autoHideDuration,
    id
  } = notification
  const duration = autoHideDuration || defaultNotificationDuration
  const type = notificationType || defaultNotificationType

  const closeNotificationFn = useUnit(notificationModel.closeNotification)

  const handleCloseNotification = () => {
    closeNotificationFn(id)
  }

  return (
    <div
      className={clsx(
        'fade backdrop-blur-sm rounded-lg w-full sm:w-[350px] overflow-hidden',
        type === 'info' &&
          'text-color-light dark:text-color-dark bg-primary/70 border border-primary/20 dark:border-secondary/20',
        type === 'error' && 'text-color-dark bg-error/90 dark:bg-error/50',
        type === 'success' && 'text-color-dark bg-green-500/80',
        type === 'warning' && 'text-color-dark bg-yellow-600/70'
      )}
    >
      <div className='pt-3 pb-3.5 w-full px-4 flex items-center justify-start space-x-4'>
        <Icon name={iconName[type]} size='xl' />

        <div>
          <div className='font-semibold'>{title}</div>
          <div className='text-sm'>{message}</div>
        </div>

        <IconButton
          size='xs'
          className='text-white self-start'
          variant='text'
          icon='close'
          onClick={handleCloseNotification}
        />
      </div>

      <NotificationProgres duration={duration} />
    </div>
  )
}

const NotificationProgres = ({ duration }: { duration: number }) => (
  <div className='absolute bottom-0 left-0 h-1 w-full overflow-hidden'>
    <div
      className='progress bg-slate-300 dark:bg-secondary'
      style={{ animationDuration: `${duration}ms` }}
    ></div>
  </div>
)

const iconName = {
  info: 'exclamationCircle',
  error: 'exclamationCircle',
  success: 'checkCircle',
  warning: 'exclamationTriangle'
}
