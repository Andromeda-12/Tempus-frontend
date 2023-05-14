import { createEvent, createStore, sample } from 'effector'
import { condition, interval, pending } from 'patronum'
import { currentTaskModel } from '@/entities/current-task'

const setTimer = createEvent<number>()
const startTimer = createEvent()
const stopTimer = createEvent()

export const $isLoading = pending({
  effects: [
    currentTaskModel.getCurrentTaskFx,
    currentTaskModel.getMemberProgressFx
  ]
})

export const $timer = createStore(0)
const $startTime = createStore<number | null>(null)

$timer.on(setTimer, (_, time) => time)

sample({
  clock: currentTaskModel.$memberProgress,
  filter: Boolean,
  fn: ({ trackedTime, lastTimeLineStartTime }) =>
    new Date(lastTimeLineStartTime).getTime() / 1000 - trackedTime,
  target: $startTime
})

sample({
  clock: currentTaskModel.$memberProgress,
  fn: (memberProgress) => {
    if (!memberProgress) return 0
    const { isRunning, trackedTime, lastTimeLineStartTime } = memberProgress
    if (isRunning) {
      const lastTimeLineStartTimeInSeconds = Math.floor(
        new Date(lastTimeLineStartTime).getTime() / 1000
      )
      const currentTimeInSeconds = Math.floor(Date.now() / 1000)
      return currentTimeInSeconds - lastTimeLineStartTimeInSeconds + trackedTime
    }
    return trackedTime
  },
  target: setTimer
})

const { tick } = interval({
  timeout: 1000,
  start: startTimer,
  stop: stopTimer
})

sample({
  clock: tick,
  source: $startTime,
  filter: Boolean,
  fn: (startTime) => {
    const currentTime = Date.now() / 1000
    const elapsedSeconds = Math.floor(currentTime - startTime)
    return elapsedSeconds
  },
  target: $timer
})

condition({
  source: currentTaskModel.$memberProgress,
  if: (progress) => {
    if (!progress) return false
    return progress.isRunning
  },
  then: startTimer,
  else: stopTimer
})
