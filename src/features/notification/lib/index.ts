export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export const defaultNotificationType = 'info'
export const defaultNotificationTitle = 'Notification'
export const defaultNotificationDuration = 8000

export type NotificationPositions =
  | 'top'
  | 'top-right'
  | 'top-left'
  | 'bottom'
  | 'bottom-right'
  | 'bottom-left'

export interface Notification {
  id: string
  message: string
  title?: string
  type?: NotificationType
  autoHideDuration?: number
}

export interface NotificationBody {
  message: string
  title?: string
  type?: NotificationType
  autoHideDuration?: number
}

export const createNotificationBody = ({
  type,
  title,
  message,
  autoHideDuration
}: NotificationBody): NotificationBody => ({
  type,
  title,
  message,
  autoHideDuration
})
