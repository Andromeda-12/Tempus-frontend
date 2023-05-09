import { createEvent, createStore, sample } from 'effector'
import { condition, interval, pending } from 'patronum'
import { currentTaskModel } from '@/entities/current-task'

const second = 1000

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
  timeout: second,
  start: startTimer,
  stop: stopTimer
})

$timer.on(setTimer, (_, time) => time)
$timer.on(tick, (time) => time + second)

sample({
  clock: currentTaskModel.$memberProgress,
  fn: (memberProgress) => {
    if (!memberProgress) return 0
    const { isRunning, trackedTime, lastTimeLineStartTime } = memberProgress
    if (isRunning)
      return (
        Date.now() - new Date(lastTimeLineStartTime).getTime() + trackedTime
      )
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
