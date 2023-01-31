import { v4 as uuidv4 } from 'uuid'
import { createEffect, createEvent, createStore, sample } from 'effector'
import {
  Notification,
  NotificationBody,
  NotificationPositions,
  defaultNotificationDuration,
  defaultNotificationTitle,
  defaultNotificationType
} from '../lib'

export const createNotification = createEvent<NotificationBody>()
export const closeNotification = createEvent<string>()

const addNotification = createEvent<Notification>()
const removeNotification = createEvent<string>()
export const setNotificationsPosition = createEvent<NotificationPositions>()
const awaitNotificationDurationFx = createEffect(
  async (notification: Notification) => {
    await new Promise((res) => setTimeout(res, notification.autoHideDuration))
    return notification.id
  }
)

export const $notificationList = createStore<Notification[]>([]).on(
  removeNotification,
  (notifications, id) =>
    notifications.filter((notification) => notification.id !== id)
)

export const $notificationsPosition = createStore<NotificationPositions>(
  'bottom-right'
).on(setNotificationsPosition, (_, position) => position)

sample({
  clock: createNotification,
  fn: (notificationBody) => {
    const notificationId = uuidv4()
    const notification: Notification = {
      id: notificationId,
      ...notificationBody
    }

    if (!notification.type) notification.type = defaultNotificationType
    if (!notification.title) notification.title = defaultNotificationTitle
    if (!notification.autoHideDuration)
      notification.autoHideDuration = defaultNotificationDuration

    return notification
  },
  target: [addNotification, awaitNotificationDurationFx]
})

sample({
  clock: addNotification,
  source: $notificationList,
  fn: (notifications, notification) => [...notifications, notification],
  target: $notificationList
})

sample({
  clock: awaitNotificationDurationFx.doneData,
  source: $notificationList,
  filter: (nl, id) => !!nl.find((n) => n.id === id),
  fn: (_, id) => id,
  target: removeNotification
})

sample({
  clock: closeNotification,
  target: removeNotification
})
