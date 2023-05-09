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

const { tick } = interval({
  timeout: 1000,
  start: startTimer,
  stop: stopTimer
})

$timer.on(setTimer, (_, time) => time)
$timer.on(tick, (time) => time + 1)

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

condition({
  source: currentTaskModel.$memberProgress,
  if: (progress) => {
    if (!progress) return false
    return progress.isRunning
  },
  then: startTimer,
  else: stopTimer
})
