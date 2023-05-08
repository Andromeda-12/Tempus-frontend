import { useUnit } from 'effector-react'
import { currentTaskModel } from '@/entities/current-task'
import { $timer } from '../model'
import { formatTime } from '../lib'

export const Timer = () => {
  const memberProgress = useUnit(currentTaskModel.$memberProgress)
  const timer = useUnit($timer)

  if (!memberProgress) return <div className='h-[1.5em] w-[70px] bg-gray-500/30 animate-fast-pulse'></div>

  return <span className='text-xl font-semibold'>{formatTime(timer)}</span>
}
